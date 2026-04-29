(function attachSite(global) {
  const BACKGROUND_CELL_SIZE = 40;
  const ACCENT_STORAGE_KEY = "oks-accent-config";
  const DEFAULT_ACCENT_CONFIG = {
    defaultAccentByTheme: {
      light: "255, 216, 92",
      dark: "156, 138, 214"
    },
    projectAccentBySlug: {
      istinara: "137, 158, 61",
      "classic-stripes": "110, 150, 185",
      wrapchat: "130, 74, 232"
    },
    wrapchatLogoAccentHex: "#7642dc"
  };
  const ACCENT_CONTROL_DEFS = [
    { key: "default-light", label: "Default Light", type: "rgb", theme: "light" },
    { key: "default-dark", label: "Default Dark", type: "rgb", theme: "dark" }
  ];
  const accentConfig = loadAccentConfig();
  let requestedAccent = null;

  function createWrapchatLogoDataUri(accentHex) {
    const svg = [
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 920.06 789.46">',
      '<path fill="#fff" d="M855.01 260.96c-.35.07-.69.26-1.28.91-3.44-5.95-8.4-10.73-14.61-14.88-38.47-25.72-97.2-19.92-138.63-.99-18.54 8.56-36.27 17.79-51.15 31.64l-32 29.79 78.06 62.39 37.07 28.98 85.92 62.44c11.3 8.21 21.03 16.81 28.86 28.14 14.37 20.79 15.87 45.88 4.12 68.14l-18.71 35.43-55.3 101.05-20.81 37.76c-.72-.16-1.28.16-1.84 1.21.56-6.53 1.96-13.23.92-20.21-3.61-24.34-21.63-38.42-41.46-51.38-21.43-14.01-42.07-27.57-62.53-43.27l-52.55-40.33-85.37-69.16-53.98-44.79-45.45 38.13c-52.78 44.28-105.95 86.82-161.16 127.73l-12.14 8.2-46.09 30.72c-23.42 15.61-37.73 42.94-27.01 68.66l-29.61-51.93-51.98-94.64-17.66-33.35c-8.14-15.37-10.28-33.11-4.73-49.72 10.68-31.94 39.11-46.71 64.99-65.78l60.81-44.81 57.18-44.75 55.59-44.83-15.9-15.02c-18.08-17.08-37.43-32.2-59.72-42.99-25.01-12.1-51.09-19.32-79.32-19.65-22.97-.27-45.2 3.53-64.49 15.47-6.55 4.06-12.63 9.12-16.64 15.92-.82 1.49-2.11-.51-1.08-1.54 4.82-15.22 11.24-29.61 18.45-44.46 10.19-20.99 19.52-41.53 31-61.77 16.5-29.09 45.79-58.28 73.66-77.1 54.67-36.92 118.26-27.55 174.71 1.91 22.62 12.15 41.53 28.06 60.16 45.65l36.56 34.52 52.43-48.77c38.6-35.91 99.55-61.25 152.79-56.8 26.68 2.23 50.57 11.57 72.35 27.45 19.68 14.35 36.63 30.89 52.02 49.72 8.76 10.72 15.36 21.86 21.76 34.22 13.2 25.52 25.33 50.72 36.64 76.98l7.15 19.76Z"/>',
      '<path fill="' + accentHex + '" d="m189.72 397.03-16.04-11.63-45.4-33.32-29.88-21.02c-10.24-7.2-19.78-14.3-27.75-24.21s-12.94-23.09-9.14-35.1l3.84-12.12c-1.04 1.03.25 3.03 1.08 1.54 4.01-6.8 10.09-11.86 16.64-15.92 19.29-11.94 41.52-15.75 64.49-15.47 28.23.34 54.3 7.55 79.32 19.65 22.29 10.79 41.65 25.91 59.72 42.99l15.9 15.02-55.59 44.83-57.18 44.75Z"/>',
      '<path fill="' + accentHex + '" d="m855.01 260.96 1.56 5.7c5.41 13.86 2.3 28.8-7.32 40.32-9.12 10.92-20.17 18.69-31.82 27.16l-86.12 62.57 1.17 2.09-37.07-28.98-78.06-62.39 32-29.79c14.88-13.85 32.61-23.08 51.15-31.64 41.42-18.93 100.16-24.73 138.63.99 6.21 4.15 11.17 8.92 14.61 14.88.59-.64.93-.84 1.28-.91Z"/>',
      '<path fill="' + accentHex + '" d="M756.56 731.77c-5.33 9.67-12.03 18.93-22.07 25.31-26.3 16.68-66.29 12.34-96.93 2.78-36.93-11.52-67.88-33.93-96.19-60.33l-81.19-75.74-46.06 42.44-42.71 40.32c-39.47 38.42-107.56 70.83-162.86 59.27-17.09-3.57-34.2-13.06-40.66-28.55-10.72-25.72 3.58-53.05 27.01-68.66l46.09-30.72 12.14-8.2c55.21-40.91 108.38-83.45 161.16-127.73l45.45-38.13 53.98 44.79 85.37 69.16 52.55 40.33c20.46 15.7 41.1 29.26 62.53 43.27 19.83 12.96 37.85 27.04 41.46 51.38 1.04 6.98-.36 13.68-.92 20.21.57-1.05 1.13-1.37 1.84-1.21Z"/>',
      "</svg>"
    ].join("");

    return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
  }

  function cloneAccentConfig(config) {
    return {
      defaultAccentByTheme: Object.assign({}, config.defaultAccentByTheme),
      projectAccentBySlug: Object.assign({}, config.projectAccentBySlug),
      wrapchatLogoAccentHex: config.wrapchatLogoAccentHex
    };
  }

  function loadAccentConfig() {
    const fallback = cloneAccentConfig(DEFAULT_ACCENT_CONFIG);

    try {
      const rawValue = localStorage.getItem(ACCENT_STORAGE_KEY);
      if (!rawValue) {
        return fallback;
      }

      const parsed = JSON.parse(rawValue);
      return {
        defaultAccentByTheme: Object.assign({}, fallback.defaultAccentByTheme, parsed.defaultAccentByTheme),
        projectAccentBySlug: fallback.projectAccentBySlug,
        wrapchatLogoAccentHex: fallback.wrapchatLogoAccentHex
      };
    } catch (_error) {
      return fallback;
    }
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function rgbStringToHex(rgbString) {
    const channels = String(rgbString || "")
      .split(",")
      .map(function toChannel(part) {
        return clamp(Number.parseInt(part.trim(), 10) || 0, 0, 255);
      });

    return (
      "#" +
      channels
        .slice(0, 3)
        .map(function toHex(channel) {
          return channel.toString(16).padStart(2, "0");
        })
        .join("")
    );
  }

  function hexToRgbString(hexString) {
    const normalized = String(hexString || "").trim().replace(/^#/, "");
    const expanded = normalized.length === 3
      ? normalized
          .split("")
          .map(function expand(char) {
            return char + char;
          })
          .join("")
      : normalized;

    if (!/^[0-9a-fA-F]{6}$/.test(expanded)) {
      return "0, 0, 0";
    }

    return [
      Number.parseInt(expanded.slice(0, 2), 16),
      Number.parseInt(expanded.slice(2, 4), 16),
      Number.parseInt(expanded.slice(4, 6), 16)
    ].join(", ");
  }

  function saveAccentConfig() {
    try {
      localStorage.setItem(
        ACCENT_STORAGE_KEY,
        JSON.stringify({
          defaultAccentByTheme: accentConfig.defaultAccentByTheme
        })
      );
    } catch (_error) {
      // Ignore storage failures.
    }
  }

  function resetAccentConfig() {
    const freshConfig = cloneAccentConfig(DEFAULT_ACCENT_CONFIG);
    accentConfig.defaultAccentByTheme = freshConfig.defaultAccentByTheme;
    accentConfig.projectAccentBySlug = freshConfig.projectAccentBySlug;
    accentConfig.wrapchatLogoAccentHex = freshConfig.wrapchatLogoAccentHex;
    saveAccentConfig();
  }

  function getWrapchatProject() {
    return {
      slug: "wrapchat",
      title: "WrapChat",
      heroImage: "../assets/projects/Wrapchat/WrapchatLogo.svg",
      logo: createWrapchatLogoDataUri(accentConfig.wrapchatLogoAccentHex)
    };
  }

  function getRootNumber(propertyName, fallback) {
    const rawValue = window.getComputedStyle(document.documentElement).getPropertyValue(propertyName).trim();
    const parsed = Number.parseFloat(rawValue);

    if (Number.isFinite(parsed) && rawValue.indexOf("clamp(") !== 0 && rawValue.indexOf("calc(") !== 0) {
      return parsed;
    }

    const probe = document.createElement("div");
    probe.style.position = "absolute";
    probe.style.visibility = "hidden";
    probe.style.pointerEvents = "none";
    probe.style.width = "var(" + propertyName + ")";
    document.body.appendChild(probe);

    const measuredValue = probe.getBoundingClientRect().width;
    probe.remove();

    return Number.isFinite(measuredValue) && measuredValue > 0 ? measuredValue : fallback;
  }

  function getLayoutGridSize() {
    return BACKGROUND_CELL_SIZE;
  }

  function snapToGrid(value, cellSize) {
    return Math.max(cellSize, Math.floor(value / cellSize) * cellSize);
  }

  function snapToNearestGrid(value, cellSize) {
    return Math.max(cellSize, Math.round(value / cellSize) * cellSize);
  }

  function getViewportPreset() {
    const aspectRatio = window.innerWidth / Math.max(window.innerHeight, 1);

    if (window.innerWidth <= 760 || aspectRatio < 0.95) {
      return {
        contentMaxWidth: 475,
        panelWidth: 425,
        panelHeight: 450,
        heroHeight: 550,
        pageGap: 25,
        navPillMinWidth: 150,
        projectPillMinWidth: 225
      };
    }

    // Mirror CSS: clamp(5rem, 9vw, 7rem) at 16px base
    const headerPx = clamp(window.innerWidth * 0.09, 80, 112);
    // Budget for hero + gap: total below header minus padding-top (headerPx/2) and project-strip (~128px)
    const budgetForHeroAndGap = window.innerHeight - headerPx - (headerPx * 0.5) - 128;

    if (aspectRatio < 1.55) {
      const idealHero = 550;
      const idealGap = 25;
      const heroHeight = Math.max(360, Math.min(idealHero, budgetForHeroAndGap - idealGap));
      const pageGap = Math.max(12, Math.min(idealGap, budgetForHeroAndGap - heroHeight));
      return {
        contentMaxWidth: 1200,
        panelWidth: 925,
        panelHeight: Math.max(300, Math.min(450, heroHeight - 40)),
        heroHeight: heroHeight,
        pageGap: pageGap,
        navPillMinWidth: 125,
        projectPillMinWidth: 225
      };
    }

    const idealHero = 600;
    const idealGap = 50;
    const heroHeight = Math.max(360, Math.min(idealHero, budgetForHeroAndGap - idealGap));
    const pageGap = Math.max(12, Math.min(idealGap, budgetForHeroAndGap - heroHeight));
    return {
      contentMaxWidth: 1450,
      panelWidth: 1075,
      panelHeight: Math.max(300, Math.min(475, heroHeight - 40)),
      heroHeight: heroHeight,
      pageGap: pageGap,
      navPillMinWidth: 125,
      projectPillMinWidth: 250
    };
  }

  function syncGridMetrics() {
    const cellSize = getLayoutGridSize();
    const preset = getViewportPreset();
    const pagePadding = getRootNumber("--page-padding", 16);
    const availableWidth = Math.max(cellSize, window.innerWidth - pagePadding * 2);
    const contentWidth = snapToGrid(Math.min(availableWidth, preset.contentMaxWidth), cellSize);
    const panelWidth = snapToGrid(Math.min(contentWidth, preset.panelWidth), cellSize);
    const panelHeight = snapToGrid(preset.panelHeight, 8);
    const heroHeight = snapToGrid(preset.heroHeight, 8);
    const navPillMinWidth = snapToNearestGrid(preset.navPillMinWidth, cellSize);
    const projectPillMinWidth = snapToNearestGrid(preset.projectPillMinWidth, cellSize);
    const pageHomeGap = snapToGrid(preset.pageGap, 8);

    document.documentElement.style.setProperty("--layout-grid-size-live", cellSize + "px");
    document.documentElement.style.setProperty("--content-width-live", contentWidth + "px");
    document.documentElement.style.setProperty("--hero-height-live", heroHeight + "px");
    document.documentElement.style.setProperty("--panel-width-live", panelWidth + "px");
    document.documentElement.style.setProperty("--panel-height-live", panelHeight + "px");
    document.documentElement.style.setProperty("--panel-height-mobile-live", panelHeight + "px");
    document.documentElement.style.setProperty("--nav-pill-min-width-live", navPillMinWidth + "px");
    document.documentElement.style.setProperty("--project-pill-min-width-live", projectPillMinWidth + "px");
    document.documentElement.style.setProperty("--project-pill-min-width-mobile-live", projectPillMinWidth + "px");
    document.documentElement.style.setProperty("--page-home-gap-live", pageHomeGap + "px");
  }

  function setContext(value) {
    const context = value || document.body.dataset.context || "Digital";
    document.body.dataset.context = context;

    const contextNode = document.getElementById("navContext");
    if (contextNode) {
      contextNode.textContent = context;
    }
  }

  function getDefaultAccent() {
    const theme = global.OKSTheme && global.OKSTheme.get ? global.OKSTheme.get() : document.documentElement.dataset.theme;
    return accentConfig.defaultAccentByTheme[theme] || accentConfig.defaultAccentByTheme.light;
  }

  function getEffectiveAccent(rgbString) {
    const theme = global.OKSTheme && global.OKSTheme.get ? global.OKSTheme.get() : document.documentElement.dataset.theme;

    if (theme === "dark") {
      return getDefaultAccent();
    }

    return rgbString || getDefaultAccent();
  }

  function applyAccent(rgbString) {
    const accent = getEffectiveAccent(rgbString);
    document.documentElement.style.setProperty("--accent-rgb", accent);

    if (global.OKSBackground && global.OKSBackground.setAccent) {
      global.OKSBackground.setAccent(accent);
    }
  }

  function setAccent(rgbString) {
    requestedAccent = rgbString || null;
    applyAccent(requestedAccent);
  }

  function setIdleCursor(enabled) {
    if (global.OKSBackground && global.OKSBackground.setIdleCursor) {
      global.OKSBackground.setIdleCursor(enabled);
    }
  }

  function initNavigation() {
    const currentPage = document.body.dataset.page;
    document.querySelectorAll(".nav-link[data-route]").forEach(function markCurrent(link) {
      link.classList.toggle("is-current", link.dataset.route === currentPage);
    });
  }

  function syncProjectData() {
    const store = global.OKS_PORTFOLIO_DATA;
    const wrapchatProject = getWrapchatProject();

    if (!store || !Array.isArray(store.projects)) {
      return;
    }

    let legacySlug = null;
    const projects = store.projects.map(function normalizeProject(project, index) {
      const isWrapchat = project.slug === "wrapchat" || project.slug === "linpile" || project.title === "Linpile";

      if (!isWrapchat) {
        return Object.assign({}, project, {
          accentRgb: accentConfig.projectAccentBySlug[project.slug] || project.accentRgb,
          index: index,
          href: "./project.html?slug=" + encodeURIComponent(project.slug)
        });
      }

      if (project.slug !== "wrapchat") {
        legacySlug = project.slug;
      }

      return Object.assign({}, project, wrapchatProject, {
        accentRgb: accentConfig.projectAccentBySlug.wrapchat || project.accentRgb,
        index: index,
        href: "./project.html?slug=" + encodeURIComponent(wrapchatProject.slug)
      });
    });

    const projectBySlug = Object.fromEntries(
      projects.map(function toEntry(project) {
        return [project.slug, project];
      })
    );

    if (legacySlug && !projectBySlug[legacySlug]) {
      projectBySlug[legacySlug] = projectBySlug[wrapchatProject.slug];
    }

    store.projects = projects;
    store.projectBySlug = projectBySlug;
  }

  function syncAccentSystem() {
    syncProjectData();
    if (global.OKSBackground && global.OKSBackground.setIdleCursorPalette) {
      global.OKSBackground.setIdleCursorPalette(accentConfig.defaultAccentByTheme);
    }
    applyAccent(requestedAccent);
    document.dispatchEvent(new CustomEvent("oks:project-data-change"));
  }

  function getControlValue(definition) {
    if (definition.theme) {
      return rgbStringToHex(accentConfig.defaultAccentByTheme[definition.theme]);
    }

    return rgbStringToHex(accentConfig.projectAccentBySlug[definition.slug]);
  }

  function setControlValue(definition, value) {
    if (definition.theme) {
      accentConfig.defaultAccentByTheme[definition.theme] = hexToRgbString(value);
      return;
    }

    accentConfig.projectAccentBySlug[definition.slug] = hexToRgbString(value);
  }

  function createAccentLab() {
    if (!document.body) {
      return;
    }

    let toggleButton = document.getElementById("accentLabToggle");
    if (!toggleButton) {
      toggleButton = document.createElement("button");
      toggleButton.className = "accent-lab-toggle";
      toggleButton.id = "accentLabToggle";
      toggleButton.type = "button";
      toggleButton.textContent = "Accent Lab";
      document.body.appendChild(toggleButton);
    }

    const panel = document.createElement("aside");
    panel.className = "accent-lab";
    panel.id = "accentLabPanel";
    panel.innerHTML =
      '<div class="accent-lab-body">' +
      '  <div class="accent-lab-head">' +
      '    <p class="accent-lab-title">Accent Lab</p>' +
      '    <button class="accent-lab-close" id="accentLabClose" type="button" aria-label="Close Accent Lab">Close</button>' +
      "  </div>" +
      '  <p class="accent-lab-copy">Pick the default shader colors for light and dark mode.</p>' +
      '  <div class="accent-lab-grid" id="accentLabGrid"></div>' +
      '  <button class="accent-lab-reset" id="accentLabReset" type="button">Reset Colors</button>' +
      "</div>";

    document.body.appendChild(panel);

    const grid = document.getElementById("accentLabGrid");
    const resetButton = document.getElementById("accentLabReset");
    const closeButton = document.getElementById("accentLabClose");

    function setOpen(nextOpen) {
      panel.classList.toggle("is-open", nextOpen);
      if (toggleButton) {
        toggleButton.setAttribute("aria-expanded", String(nextOpen));
      }
      if (nextOpen) {
        document.dispatchEvent(new CustomEvent("oks:accent-lab-open"));
      }
    }

    if (toggleButton) {
      toggleButton.setAttribute("aria-expanded", "false");
      toggleButton.setAttribute("aria-controls", "accentLabPanel");
      toggleButton.addEventListener("click", function onToggle() {
        setOpen(!panel.classList.contains("is-open"));
      });
    }

    if (closeButton) {
      closeButton.addEventListener("click", function onClose() {
        setOpen(false);
      });
    }

    ACCENT_CONTROL_DEFS.forEach(function createControl(definition) {
      const label = document.createElement("label");
      label.className = "accent-lab-field";
      label.innerHTML =
        '<span class="accent-lab-label">' +
        definition.label +
        "</span>" +
        '<input class="accent-lab-input" type="color" value="' +
        getControlValue(definition) +
        '" />';

      const input = label.querySelector("input");
      input.addEventListener("input", function onInput(event) {
        setControlValue(definition, event.currentTarget.value);
        saveAccentConfig();
        syncAccentSystem();
      });

      grid.appendChild(label);
    });

    resetButton.addEventListener("click", function onReset() {
      resetAccentConfig();
      panel.querySelectorAll(".accent-lab-input").forEach(function updateInput(input, index) {
        input.value = getControlValue(ACCENT_CONTROL_DEFS[index]);
      });
      syncAccentSystem();
    });

    document.addEventListener("click", function onDocumentClick(event) {
      if (!panel.classList.contains("is-open")) {
        return;
      }

      if (panel.contains(event.target) || (toggleButton && toggleButton.contains(event.target))) {
        return;
      }

      setOpen(false);
    });
  }

  function initScrollHeader() {
    const headerWrap = document.querySelector(".header-wrap");
    if (!headerWrap) {
      return;
    }

    const COLLAPSE_THRESHOLD = 84;
    const EXPAND_THRESHOLD = 28;
    const DIRECTION_BUFFER = 26;
    const MIN_SCROLLABLE_DISTANCE = 120;
    let ticking = false;
    let lastScrollY = window.scrollY;
    let directionalTravel = 0;
    let isScrolled = false;

    function setScrolled(nextState) {
      if (isScrolled === nextState) {
        return;
      }

      isScrolled = nextState;
      headerWrap.classList.toggle("is-scrolled", nextState);
    }

    function isPageScrollable() {
      return document.documentElement.scrollHeight - window.innerHeight > MIN_SCROLLABLE_DISTANCE;
    }

    function update() {
      const scrollable = isPageScrollable();
      const currentScrollY = Math.max(0, window.scrollY);
      const delta = currentScrollY - lastScrollY;

      headerWrap.classList.toggle("has-scroll", scrollable);

      if (!scrollable) {
        directionalTravel = 0;
        lastScrollY = currentScrollY;
        setScrolled(false);
        ticking = false;
        return;
      }

      if (Math.abs(delta) >= 1) {
        if ((directionalTravel >= 0 && delta >= 0) || (directionalTravel <= 0 && delta <= 0)) {
          directionalTravel += delta;
        } else {
          directionalTravel = delta;
        }
      }

      if (!isScrolled && currentScrollY > COLLAPSE_THRESHOLD && directionalTravel > DIRECTION_BUFFER) {
        setScrolled(true);
      } else if (isScrolled && currentScrollY < EXPAND_THRESHOLD) {
        setScrolled(false);
      }

      lastScrollY = currentScrollY;
      ticking = false;
    }

    window.addEventListener("scroll", function onScrollHeader() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    window.addEventListener("resize", function onResizeHeader() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    update();
  }

  function initHamburger() {
    var hamburger = document.getElementById("navHamburger");
    var nav = document.getElementById("siteNav");

    if (!hamburger || !nav) {
      return;
    }

    function setNavOpen(open) {
      nav.classList.toggle("is-open", open);
      hamburger.setAttribute("aria-expanded", String(open));
    }

    hamburger.addEventListener("click", function onHamburgerClick() {
      setNavOpen(!nav.classList.contains("is-open"));
    });

    nav.querySelectorAll("a").forEach(function bindNavLink(link) {
      link.addEventListener("click", function onNavLinkClick() {
        setNavOpen(false);
      });
    });

    document.addEventListener("click", function onDocClick(event) {
      if (!nav.classList.contains("is-open")) {
        return;
      }
      if (nav.contains(event.target) || hamburger.contains(event.target)) {
        return;
      }
      setNavOpen(false);
    });

    document.addEventListener("keydown", function onKeyDown(event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        setNavOpen(false);
        hamburger.focus();
      }
    });

    window.addEventListener("scroll", function onScroll() {
      if (nav.classList.contains("is-open")) {
        setNavOpen(false);
      }
    }, { passive: true });
  }

  function init() {
    if (document.body.dataset.siteReady === "true") {
      return;
    }

    document.body.dataset.siteReady = "true";
    global.OKSTheme.init();
    setIdleCursor(["home", "works", "approach", "about", "contact"].includes(document.body.dataset.page));
    syncGridMetrics();
    global.OKSBackground.init();
    syncAccentSystem();
    initNavigation();
    initScrollHeader();
    initHamburger();
    setContext();
    if (global.OKSTheme && global.OKSTheme.onChange) {
      global.OKSTheme.onChange(function syncAccentForTheme() {
        applyAccent(requestedAccent);
      });
    }
    createAccentLab();
    window.addEventListener("resize", syncGridMetrics, { passive: true });
  }

  global.OKSSite = {
    init: init,
    getDefaultAccent: getDefaultAccent,
    setAccent: setAccent,
    setContext: setContext,
    setIdleCursor: setIdleCursor
  };

  document.addEventListener("DOMContentLoaded", init);
})(window);
