(function attachBackground(global) {
  const PIXEL_CELL_SIZE = 40;
  const DEFAULT_IDLE_CURSOR_RGB = {
    light: "255, 216, 92",
    dark: "156, 138, 214"
  };
  const state = {
    accentRgb: "255, 216, 92",
    idleCursor: false,
    idleCursorRgbByTheme: Object.assign({}, DEFAULT_IDLE_CURSOR_RGB),
    cleanup: null,
    refresh: null
  };

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function rgbStringTo01Triplet(rgbString) {
    const parts = String(rgbString || "")
      .split(",")
      .map(function toNumber(part) {
        return clamp(Number(part.trim()) || 0, 0, 255) / 255;
      });

    return [
      parts[0] || 0,
      parts[1] || 0,
      parts[2] || 0
    ];
  }

  function getThemePreset(theme) {
    const isIdleCursor = state.idleCursor;

    if (theme === "dark") {
      const darkCursor = isIdleCursor
        ? rgbStringTo01Triplet(state.idleCursorRgbByTheme.dark)
        : rgbStringTo01Triplet(state.accentRgb).map(function soften(channel) {
            return channel * 0.55 + 0.15;
          });

      return {
        metaball: [0.168, 0.098, 0.318],
        cursor: darkCursor,
        base: [0.086, 0.039, 0.133]
      };
    }

    return {
      metaball: [1, 1, 1],
      cursor: isIdleCursor
        ? rgbStringTo01Triplet(state.idleCursorRgbByTheme.light)
        : rgbStringTo01Triplet(state.accentRgb),
      base: [0.961, 0.953, 0.929]
    };
  }

  function initMetaballs(options) {
    const canvasId = options && options.canvasId ? options.canvasId : "bgCanvas";
    const settings = Object.assign(
      {
        speed: 0.1,
        balls: 25,
        cursorSize: 0.8,
        smooth: 0.06,
        animSize: 10,
        clump: 0.9
      },
      options && options.settings ? options.settings : {}
    );

    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      return function noop() {};
    }

    const gl = canvas.getContext("webgl2", { alpha: true, premultipliedAlpha: false });
    if (!gl) {
      return function noop() {};
    }

    const vertSrc =
      "#version 300 es\n" +
      "precision highp float;\n" +
      "layout(location=0) in vec2 position;\n" +
      "void main(){ gl_Position = vec4(position, 0.0, 1.0); }";

    const fragSrc =
      "#version 300 es\n" +
      "precision highp float;\n" +
      "uniform vec3  iResolution;\n" +
      "uniform float iTime;\n" +
      "uniform vec3  iMouse;\n" +
      "uniform vec3  iColor;\n" +
      "uniform vec3  iCursorColor;\n" +
      "uniform vec3  iBaseColor;\n" +
      "uniform float iAnimationSize;\n" +
      "uniform int   iBallCount;\n" +
      "uniform float iCursorBallSize;\n" +
      "uniform vec3  iMetaBalls[50];\n" +
      "uniform float iClumpFactor;\n" +
      "out vec4 outColor;\n" +
      "float getMetaBallValue(vec2 c, float r, vec2 p){\n" +
      "  vec2 d = p - c;\n" +
      "  float dist2 = dot(d,d);\n" +
      "  return (r*r) / max(dist2, 0.00006);\n" +
      "}\n" +
      "void main(){\n" +
      "  vec2 fc = gl_FragCoord.xy;\n" +
      "  float scale = iAnimationSize / iResolution.y;\n" +
      "  vec2 coord  = (fc - iResolution.xy * 0.5) * scale;\n" +
      "  vec2 mouseW = (iMouse.xy - iResolution.xy * 0.5) * scale;\n" +
      "  float m1 = 0.0;\n" +
      "  for(int i=0;i<50;i++){\n" +
      "    if(i >= iBallCount) break;\n" +
      "    m1 += getMetaBallValue(iMetaBalls[i].xy, iMetaBalls[i].z, coord);\n" +
      "  }\n" +
      "  float m2 = getMetaBallValue(mouseW, iCursorBallSize, coord);\n" +
      "  float total = m1 + m2;\n" +
      "  float w = max(min(1.0, fwidth(total)), 0.0002);\n" +
      "  float f = smoothstep(-1.0, 1.0, (total - 1.3) / w);\n" +
      "  vec3 cFinal = vec3(0.0);\n" +
      "  if(total > 0.0){\n" +
      "    float a1 = m1 / total;\n" +
      "    float a2 = m2 / total;\n" +
      "    cFinal = iColor * a1 + iCursorColor * a2;\n" +
      "  }\n" +
      "  vec3 col = mix(iBaseColor, cFinal, f);\n" +
      "  outColor = vec4(col, 1.0);\n" +
      "}";

    function compile(type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(shader) || "Shader compile failed");
      }

      return shader;
    }

    const program = gl.createProgram();
    const vertexShader = compile(gl.VERTEX_SHADER, vertSrc);
    const fragmentShader = compile(gl.FRAGMENT_SHADER, fragSrc);

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) || "Program link failed");
    }

    gl.useProgram(program);

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, "iResolution");
    const uTime = gl.getUniformLocation(program, "iTime");
    const uMouse = gl.getUniformLocation(program, "iMouse");
    const uColor = gl.getUniformLocation(program, "iColor");
    const uCursorColor = gl.getUniformLocation(program, "iCursorColor");
    const uBaseColor = gl.getUniformLocation(program, "iBaseColor");
    const uAnimationSize = gl.getUniformLocation(program, "iAnimationSize");
    const uBallCount = gl.getUniformLocation(program, "iBallCount");
    const uCursorBallSize = gl.getUniformLocation(program, "iCursorBallSize");
    const uMetaBalls = gl.getUniformLocation(program, "iMetaBalls");
    const uClumpFactor = gl.getUniformLocation(program, "iClumpFactor");

    function applyThemeUniforms() {
      const theme = global.OKSTheme && global.OKSTheme.get ? global.OKSTheme.get() : "light";
      const preset = getThemePreset(theme);

      gl.useProgram(program);
      gl.uniform3f(uColor, preset.metaball[0], preset.metaball[1], preset.metaball[2]);
      gl.uniform3f(uCursorColor, preset.cursor[0], preset.cursor[1], preset.cursor[2]);
      gl.uniform3f(uBaseColor, preset.base[0], preset.base[1], preset.base[2]);
    }

    gl.uniform1f(uAnimationSize, settings.animSize);
    gl.uniform1i(uBallCount, Math.min(50, settings.balls | 0));
    gl.uniform1f(uCursorBallSize, settings.cursorSize);
    gl.uniform1f(uClumpFactor, settings.clump);

    state.refresh = applyThemeUniforms;
    applyThemeUniforms();
    const unsubscribeTheme =
      global.OKSTheme && global.OKSTheme.onChange ? global.OKSTheme.onChange(applyThemeUniforms) : function noop() {};

    const fract = function fract(x) {
      return x - Math.floor(x);
    };

    function hash31(n) {
      const x = fract(n * 0.1031);
      const y = fract(n * 0.11369);
      const z = fract(n * 0.13787);
      const d = x + y + z + 19.19;

      return [
        fract((x + d) * z),
        fract((y + d) * x),
        fract((z + d) * y)
      ];
    }

    function hash33(v) {
      const x = fract(v[0] * 0.1031);
      const y = fract(v[1] * 0.11369);
      const z = fract(v[2] * 0.13787);
      const d = x + y + z + 19.19;

      return [
        fract((x + d) * z),
        fract((y + d) * x),
        fract((z + d) * y)
      ];
    }

    const maxBalls = 50;
    const ballParams = new Array(maxBalls).fill(0).map(function buildBall(_item, index) {
      const seed = index + 1;
      const h1 = hash31(seed);
      const h2 = hash33(h1);

      return {
        st: h1[0] * (Math.PI * 2),
        dtFactor: 0.1 * Math.PI + h1[1] * (0.3 * Math.PI),
        baseScale: 5 + h1[1] * 5,
        toggle: Math.floor(h2[0] * 2),
        radius: 0.5 + h2[2] * 1.5
      };
    });

    const metaBallData = new Float32Array(maxBalls * 3);
    const pointer = { inside: false, x: 0, y: 0 };
    const mouse = { x: 0, y: 0 };

    function resize() {
      const width = Math.max(1, Math.ceil(window.innerWidth / PIXEL_CELL_SIZE));
      const height = Math.max(1, Math.ceil(window.innerHeight / PIXEL_CELL_SIZE));
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
      gl.uniform3f(uResolution, width, height, 0);
    }

    function onPointerMove(event) {
      const rect = canvas.getBoundingClientRect();
      const localX = event.clientX - rect.left;
      const localY = event.clientY - rect.top;
      pointer.x = (localX / rect.width) * canvas.width;
      pointer.y = (1 - localY / rect.height) * canvas.height;
      pointer.inside = true;
    }

    function onPointerLeave() {
      pointer.inside = false;
    }

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    window.addEventListener("blur", onPointerLeave);

    resize();

    const start = performance.now();
    let animationFrame = 0;

    function tick(now) {
      const time = (now - start) * 0.001;
      const ballCount = Math.min(maxBalls, settings.balls | 0);

      for (let index = 0; index < ballCount; index += 1) {
        const params = ballParams[index];
        const delta = time * settings.speed * params.dtFactor;
        const theta = params.st + delta;
        const x = Math.cos(theta);
        const y = Math.sin(theta + delta * params.toggle);

        metaBallData[index * 3] = x * params.baseScale * settings.clump;
        metaBallData[index * 3 + 1] = y * params.baseScale * settings.clump;
        metaBallData[index * 3 + 2] = params.radius;
      }

      for (let index = ballCount; index < maxBalls; index += 1) {
        metaBallData[index * 3] = 0;
        metaBallData[index * 3 + 1] = 0;
        metaBallData[index * 3 + 2] = 0;
      }

      let targetX;
      let targetY;

      if (pointer.inside) {
        targetX = pointer.x;
        targetY = pointer.y;
      } else {
        const centerX = canvas.width * 0.5;
        const centerY = canvas.height * 0.5;
        const radiusX = canvas.width * 0.15;
        const radiusY = canvas.height * 0.15;
        targetX = centerX + Math.cos(time * settings.speed) * radiusX;
        targetY = centerY + Math.sin(time * settings.speed) * radiusY;
      }

      mouse.x += (targetX - mouse.x) * settings.smooth;
      mouse.y += (targetY - mouse.y) * settings.smooth;

      gl.useProgram(program);
      gl.bindVertexArray(vao);
      gl.uniform1f(uTime, time);
      gl.uniform3f(uMouse, mouse.x, mouse.y, 0);
      gl.uniform3fv(uMetaBalls, metaBallData);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      animationFrame = window.requestAnimationFrame(tick);
    }

    animationFrame = window.requestAnimationFrame(tick);

    return function cleanup() {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("blur", onPointerLeave);
      unsubscribeTheme();
      state.refresh = null;
    };
  }

  global.OKSBackground = {
    init: function init() {
      if (state.cleanup) {
        return;
      }

      state.cleanup = initMetaballs({
        canvasId: "bgCanvas"
      });
    },
    setAccent: function setAccent(rgbString) {
      state.accentRgb = rgbString || state.accentRgb;
      if (state.refresh) {
        state.refresh();
      }
    },
    setIdleCursor: function setIdleCursor(enabled) {
      state.idleCursor = Boolean(enabled);
      if (state.refresh) {
        state.refresh();
      }
    },
    setIdleCursorPalette: function setIdleCursorPalette(palette) {
      state.idleCursorRgbByTheme = Object.assign({}, state.idleCursorRgbByTheme, palette || {});
      if (state.refresh) {
        state.refresh();
      }
    }
  };
})(window);
