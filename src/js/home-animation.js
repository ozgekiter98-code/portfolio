(function attachHomeAnimation() {
  function getTheme() {
    return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  }

  function buildAnimationDocument() {
    return [
      "<!doctype html>",
      '<html lang="en">',
      "<head>",
      '<meta charset="utf-8" />',
      '<meta name="viewport" content="width=device-width, initial-scale=1" />',
      "<style>",
      ":root {",
      "  --canvas-bg: #f5f2ef;",
      "  --shape-primary: #efd07b;",
      "  --shape-secondary: #775487;",
      "}",
      "* { box-sizing: border-box; }",
      "html, body { margin: 0; width: 100%; height: 100%; overflow: hidden; background: transparent; }",
      "body { font-family: -apple-system, BlinkMacSystemFont, 'SF Mono', monospace; }",
      "#app-window { position: relative; width: 100vw; height: 100vh; overflow: hidden; border-radius: 12px; background: #1a1a1a; }",
      ".chrome { position: absolute; inset: 0 0 auto; height: 40px; z-index: 20; display: flex; align-items: center; gap: 8px; padding: 0 16px; background: #2b2f32; border-bottom: 1px solid #1a1d1f; }",
      ".light { width: 13px; height: 13px; border-radius: 50%; }",
      ".red { background: #f46e5a; } .yellow { background: #fdc960; } .green { background: #6eb360; }",
      ".chrome-title { position: absolute; left: 50%; transform: translateX(-50%); color: #8a8f94; font: 500 12px/1 -apple-system, BlinkMacSystemFont, sans-serif; letter-spacing: .3px; }",
      ".cursor { position: absolute; left: 55%; top: 52%; z-index: 30; width: 34px; height: 34px; transform-origin: 20% 16%; filter: drop-shadow(0 2px 4px rgba(0,0,0,.55)); transition: left .62s cubic-bezier(.22,1,.36,1), top .62s cubic-bezier(.22,1,.36,1), transform .2s ease; }",
      ".cursor::before { content: ''; position: absolute; left: 2px; top: 0; width: 0; height: 0; border-left: 9px solid #fff; border-top: 23px solid #fff; border-right: 9px solid transparent; border-bottom: 8px solid transparent; transform: skew(-8deg); }",
      ".cursor::after { content: ''; position: absolute; left: 16px; top: 20px; width: 9px; height: 14px; border-radius: 2px; background: #fff; transform: rotate(-28deg); }",
      ".cursor.is-clicking { transform: scale(.72); }",
      ".scene { position: absolute; inset: 40px 0 0; opacity: 0; transform: translateY(18px); pointer-events: none; transition: opacity .42s ease, transform .42s ease; }",
      ".scene.is-active { opacity: 1; transform: translateY(0); pointer-events: auto; }",
      ".scene.is-leaving { opacity: 0; transform: translateY(-18px); }",
      ".ps { display: flex; background: #2c2f31; }",
      ".ps-tools, .vs-activity { width: 48px; flex: 0 0 auto; display: flex; flex-direction: column; align-items: center; gap: 6px; padding-top: 14px; background: #3d4042; border-right: 1px solid #292b2d; }",
      ".tool { width: 30px; height: 30px; border-radius: 5px; background: #4b4f52; position: relative; }",
      ".tool.is-active { background: #1473e6; }",
      ".tool::before, .tool::after { content: ''; position: absolute; inset: 9px; border: 2px solid rgba(255,255,255,.55); border-radius: 2px; }",
      ".tool:nth-child(2n)::before { border-radius: 50%; }",
      ".ps-canvas, .ae-preview { flex: 1; display: flex; align-items: center; justify-content: center; overflow: hidden; background: #404346; }",
      ".artboard { position: relative; overflow: hidden; width: min(52vw, 300px); height: min(61vh, 360px); background: var(--canvas-bg); border-radius: 2px; }",
      ".circle { position: absolute; width: 52%; aspect-ratio: 1; border-radius: 50%; background: var(--shape-primary); left: 24%; bottom: 8%; }",
      ".rect { position: absolute; width: 24%; height: 43%; border-radius: 6px; background: var(--shape-secondary); right: 9%; top: 8%; }",
      ".handle { position: absolute; width: 7px; height: 7px; background: #fff; border: 1px solid #1473e6; }",
      ".ps-panels, .ae-right, .bl-right { width: 28%; max-width: 170px; min-width: 118px; background: #3d4042; border-left: 1px solid #292b2d; color: #9ea2a5; }",
      ".panel-title { height: 34px; display: flex; align-items: center; padding: 0 12px; font: 11px/1 -apple-system, BlinkMacSystemFont, sans-serif; background: #353839; border-bottom: 1px solid #292b2d; }",
      ".layer { display: flex; align-items: center; gap: 7px; height: 28px; margin: 10px; padding: 0 8px; border-radius: 4px; background: #494d50; font: 10px/1 -apple-system, BlinkMacSystemFont, sans-serif; }",
      ".layer.is-selected { color: #fff; background: #1473e6; }",
      ".thumb { width: 20px; height: 20px; border-radius: 3px; background: var(--shape-primary); }",
      ".ae { display: grid; grid-template-rows: 1fr 200px; background: #2b2e30; }",
      ".ae-main { display: grid; grid-template-columns: minmax(120px, 200px) 1fr minmax(105px, 130px); min-height: 0; }",
      ".ae-left { background: #343739; border-right: 1px solid #222426; color: #9ea3a8; font: 10px/1 -apple-system, BlinkMacSystemFont, sans-serif; }",
      ".ae-tab { height: 30px; display: flex; align-items: center; padding: 0 12px; color: #c9cdd0; background: #2f3235; }",
      ".ae-item { height: 26px; display: flex; align-items: center; gap: 7px; padding: 0 10px; border-bottom: 1px solid #2d3033; }",
      ".ae-item.is-selected { color: #fff; background: #1473e6; }",
      ".ae-preview .artboard { width: min(38vw, 230px); height: min(28vh, 170px); }",
      ".ae-timeline, .bl-timeline { position: relative; background: #252729; border-top: 1px solid #1e2022; overflow: hidden; }",
      ".ticks { display: flex; gap: 0; height: 26px; margin-left: 21%; color: #555a5e; font: 8px/1 'SF Mono', monospace; }",
      ".tick { flex: 1; border-left: 1px solid #454a4e; padding: 12px 0 0 2px; }",
      ".track { position: relative; height: 28px; border-top: 1px solid #1e2022; }",
      ".clip { position: absolute; top: 5px; height: 18px; border-radius: 3px; background: #7269c7; }",
      ".playhead { position: absolute; top: 26px; bottom: 0; left: 31%; width: 1px; background: #5f90e3; }",
      ".bl { display: grid; grid-template-rows: 26px 1fr 100px; background: #1d1d1d; }",
      ".bl-menu { display: flex; align-items: center; gap: 14px; padding: 0 10px; color: #9a9ea2; background: #262626; font: 11px/1 -apple-system, BlinkMacSystemFont, sans-serif; }",
      ".bl-menu span:first-child { color: #d4803b; }",
      ".bl-main { display: grid; grid-template-columns: 36px 1fr minmax(120px, 170px); min-height: 0; }",
      ".bl-tools { display: flex; flex-direction: column; align-items: center; gap: 4px; padding-top: 8px; background: #252525; }",
      ".bl-tool { width: 26px; height: 26px; border-radius: 4px; background: #383838; }",
      ".bl-viewport { position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; background: #3d3d3d; background-image: linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px); background-size: 30px 30px; perspective: 480px; }",
      ".cube { position: relative; width: 110px; height: 110px; transform-style: preserve-3d; transform: rotateX(-28deg) rotateY(38deg); animation: floatCube 5s ease-in-out infinite; }",
      ".face { position: absolute; inset: 0; border: 1px solid rgba(255,255,255,.18); background: rgba(130,130,130,.55); }",
      ".front { transform: translateZ(55px); } .back { transform: rotateY(180deg) translateZ(55px); } .right { transform: rotateY(90deg) translateZ(55px); } .left { transform: rotateY(-90deg) translateZ(55px); } .top { transform: rotateX(90deg) translateZ(55px); } .bottom { transform: rotateX(-90deg) translateZ(55px); }",
      ".bl-label { position: absolute; top: 8px; left: 10px; color: rgba(255,255,255,.45); font: 10px/1 -apple-system, BlinkMacSystemFont, sans-serif; }",
      ".prop { height: 24px; display: flex; align-items: center; justify-content: space-between; padding: 0 10px; color: #888; border-bottom: 1px solid #1e1e1e; font: 10px/1 'SF Mono', monospace; }",
      ".vs { display: grid; grid-template-columns: 46px minmax(120px, 180px) 1fr; grid-template-rows: 1fr 26px; background: #1e1e1e; color: #d4d4d4; }",
      ".vs-activity { grid-row: 1 / 3; width: 46px; background: #333; }",
      ".vs-explorer { background: #252526; border-right: 1px solid #1e1e1e; font: 11px/1 -apple-system, BlinkMacSystemFont, sans-serif; }",
      ".vs-header { height: 34px; display: flex; align-items: center; padding: 0 14px; color: #bbb; letter-spacing: .8px; text-transform: uppercase; }",
      ".file { height: 22px; display: flex; align-items: center; padding-left: 24px; color: #9a9ea2; }",
      ".file.is-active { color: #cdd0d4; background: #37373d; }",
      ".vs-editor { overflow: hidden; }",
      ".vs-tabs { height: 34px; display: flex; align-items: end; background: #2d2d2d; }",
      ".vs-tab { height: 30px; padding: 8px 14px 0; color: #cdd0d4; background: #1e1e1e; border-top: 1px solid #007acc; font: 12px/1 -apple-system, BlinkMacSystemFont, sans-serif; }",
      ".code-row { display: flex; height: 19px; font: 12px/19px 'SF Mono', monospace; white-space: nowrap; }",
      ".ln { width: 44px; padding-right: 10px; text-align: right; color: #858585; border-right: 1px solid #252526; }",
      ".code { padding-left: 14px; }",
      ".kw { color: #569cd6; } .fn { color: #dcdcaa; } .st { color: #ce9178; } .cm { color: #6a9955; } .va { color: #9cdcfe; }",
      ".vs-status { grid-column: 2 / 4; display: flex; align-items: center; gap: 14px; padding: 0 14px; color: rgba(255,255,255,.9); background: #007acc; font: 11px/1 -apple-system, BlinkMacSystemFont, sans-serif; }",
      "@keyframes floatCube { 0%,100% { transform: rotateX(-28deg) rotateY(38deg) translateY(0); } 50% { transform: rotateX(-22deg) rotateY(54deg) translateY(-8px); } }",
      "@media (prefers-reduced-motion: reduce) { .scene, .cursor { transition-duration: .01ms !important; } .cube { animation: none; } }",
      "</style>",
      "</head>",
      "<body>",
      '<div id="app-window">',
      '<div class="chrome"><span class="light red"></span><span class="light yellow"></span><span class="light green"></span><span class="chrome-title" id="chromeTitle">Untitled-1.psd</span></div>',
      '<div class="cursor" id="cursor"></div>',
      '<section class="scene ps is-active" data-title="Untitled-1.psd" data-cursor-left="55%" data-cursor-top="52%">',
      '<div class="ps-tools"><span class="tool is-active"></span><span class="tool"></span><span class="tool"></span><span class="tool"></span><span class="tool"></span><span class="tool"></span><span class="tool"></span></div>',
      '<div class="ps-canvas"><div class="artboard"><span class="circle"></span><span class="rect"></span><span class="handle" style="top:24px;left:24px"></span><span class="handle" style="top:24px;right:24px"></span><span class="handle" style="bottom:24px;left:24px"></span><span class="handle" style="bottom:24px;right:24px"></span></div></div>',
      '<aside class="ps-panels"><div class="panel-title">Layers</div><div class="layer is-selected"><span class="thumb"></span>Circle</div><div class="layer"><span class="thumb" style="background:var(--shape-secondary)"></span>Rect</div><div class="layer"><span class="thumb" style="background:var(--canvas-bg)"></span>Background</div><div class="panel-title" style="margin-top:auto">Color</div></aside>',
      "</section>",
      '<section class="scene ae" data-title="Composition.aep" data-cursor-left="52%" data-cursor-top="35%">',
      '<div class="ae-main"><aside class="ae-left"><div class="ae-tab">Project</div><div class="ae-item is-selected">Composition 1</div><div class="ae-item">Circle Layer</div><div class="ae-item">Rect Layer</div><div class="ae-item">Background</div></aside><div class="ae-preview"><div class="artboard"><span class="circle"></span><span class="rect"></span></div></div><aside class="ae-right"><div class="panel-title">Effects</div><div class="prop"><span>Blur</span><span>0.0</span></div><div class="prop"><span>Opacity</span><span>100%</span></div><div class="prop"><span>Scale</span><span>1.0</span></div><div class="prop"><span>Rotate</span><span>0deg</span></div></aside></div>',
      '<div class="ae-timeline"><div class="ticks"><span class="tick">0s</span><span class="tick">1s</span><span class="tick">2s</span><span class="tick">3s</span><span class="tick">4s</span></div><span class="playhead"></span><div class="track"><span class="clip" style="left:20%;width:60%"></span></div><div class="track"><span class="clip" style="left:16%;width:42%;background:#523d95"></span></div><div class="track"><span class="clip" style="left:24%;width:70%;background:#895dbf"></span></div></div>',
      "</section>",
      '<section class="scene bl" data-title="scene.blend" data-cursor-left="48%" data-cursor-top="45%">',
      '<div class="bl-menu"><span>File</span><span>Edit</span><span>Render</span><span>Window</span><span>Help</span></div><div class="bl-main"><div class="bl-tools"><span class="bl-tool"></span><span class="bl-tool"></span><span class="bl-tool"></span></div><div class="bl-viewport"><span class="bl-label">Perspective | Solid</span><div class="cube"><span class="face front"></span><span class="face back"></span><span class="face right"></span><span class="face left"></span><span class="face top"></span><span class="face bottom"></span></div></div><aside class="bl-right"><div class="panel-title">Transform</div><div class="prop"><span>X</span><span>0.000</span></div><div class="prop"><span>Y</span><span>0.000</span></div><div class="prop"><span>Z</span><span>0.000</span></div><div class="panel-title">Scale</div><div class="prop"><span>All</span><span>1.000</span></div></aside></div><div class="bl-timeline"><span class="playhead"></span><div class="track"><span class="clip" style="left:10%;width:48%;background:#d4803b"></span></div><div class="track"><span class="clip" style="left:18%;width:68%;background:#4a4a7a"></span></div></div>',
      "</section>",
      '<section class="scene vs" data-title="main.ts - MyProject" data-cursor-left="72%" data-cursor-top="42%">',
      '<div class="vs-activity"><span class="tool is-active"></span><span class="tool"></span><span class="tool"></span></div><aside class="vs-explorer"><div class="vs-header">Explorer</div><div class="file">src</div><div class="file is-active">main.ts</div><div class="file">utils.ts</div><div class="file">types.ts</div><div class="file">index.css</div></aside><div class="vs-editor"><div class="vs-tabs"><span class="vs-tab">main.ts</span></div><div class="code-row"><span class="ln">1</span><span class="code"><span class="kw">import</span> <span class="va">gsap</span> <span class="kw">from</span> <span class="st">\'gsap\'</span></span></div><div class="code-row"><span class="ln">2</span><span class="code"><span class="kw">const</span> scenes = [<span class="st">\'ps\'</span>, <span class="st">\'ae\'</span>, <span class="st">\'bl\'</span>, <span class="st">\'vs\'</span>]</span></div><div class="code-row"><span class="ln">3</span><span class="code">&nbsp;</span></div><div class="code-row"><span class="ln">4</span><span class="code"><span class="cm">// Animate transition between panels</span></span></div><div class="code-row"><span class="ln">5</span><span class="code"><span class="kw">function</span> <span class="fn">transition</span>(from, to) {</span></div><div class="code-row"><span class="ln">6</span><span class="code">&nbsp; return timeline.to(from).from(to)</span></div><div class="code-row"><span class="ln">7</span><span class="code">}</span></div></div><div class="vs-status"><span>main</span><span>TypeScript 5.3</span><span style="margin-left:auto">Prettier</span></div>',
      "</section>",
      "</div>",
      "<script>",
      "(function(){",
      "const scenes=[...document.querySelectorAll('.scene')];",
      "const cursor=document.getElementById('cursor');",
      "const title=document.getElementById('chromeTitle');",
      "let index=0;",
      "function moveCursor(scene){ cursor.style.left=scene.dataset.cursorLeft; cursor.style.top=scene.dataset.cursorTop; }",
      "function go(){",
      " const current=scenes[index];",
      " const nextIndex=(index+1)%scenes.length;",
      " const next=scenes[nextIndex];",
      " cursor.style.left=nextIndex%2?'55%':'45%'; cursor.style.top='3%';",
      " cursor.classList.add('is-clicking');",
      " setTimeout(()=>cursor.classList.remove('is-clicking'),130);",
      " setTimeout(()=>{ current.classList.add('is-leaving'); current.classList.remove('is-active'); title.textContent=next.dataset.title; next.classList.add('is-active'); next.classList.remove('is-leaving'); index=nextIndex; moveCursor(next); },420);",
      " setTimeout(()=>current.classList.remove('is-leaving'),900);",
      "}",
      "moveCursor(scenes[0]);",
      "setInterval(go,4500);",
      "})();",
      "</script>",
      "</body>",
      "</html>"
    ].join("");
  }

  function cleanAnimationFrame(frame) {
    if (!frame) {
      return;
    }

    let doc;
    try {
      doc = frame.contentDocument;
    } catch (_error) {
      return;
    }

    if (!doc || !doc.documentElement) {
      return;
    }

    const isDark = getTheme() === "dark";
    doc.documentElement.style.setProperty("--canvas-bg", isDark ? "#242126" : "#f5f2ef");
    doc.documentElement.style.setProperty("--shape-primary", isDark ? "#7f72b8" : "#efd07b");
    doc.documentElement.style.setProperty("--shape-secondary", isDark ? "#b47a8f" : "#775487");
  }

  document.addEventListener("DOMContentLoaded", function onReady() {
    const frame = document.querySelector(".home-intro-animation-frame");

    if (!frame) {
      return;
    }

    frame.addEventListener("load", function onFrameLoad() {
      cleanAnimationFrame(frame);
    });

    frame.srcdoc = buildAnimationDocument();

    if (window.OKSTheme && window.OKSTheme.onChange) {
      window.OKSTheme.onChange(function onThemeChange() {
        cleanAnimationFrame(frame);
      });
    }
  });
})();
