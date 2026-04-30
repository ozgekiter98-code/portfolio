(function attachHomeAnimation() {
  function getTheme() {
    return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
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

    if (!doc || !doc.head) {
      return;
    }

    let style = doc.getElementById("oks-home-animation-cleanup");
    if (!style) {
      style = doc.createElement("style");
      style.id = "oks-home-animation-cleanup";
      doc.head.appendChild(style);
    }

    const isDark = getTheme() === "dark";
    const canvasBackground = isDark ? "#242126" : "#f5f2ef";
    const shapePrimary = isDark ? "#7f72b8" : "#efd07b";
    const shapeSecondary = isDark ? "#b47a8f" : "#775487";

    style.textContent = [
      "html, body {",
      "  background: transparent !important;",
      "}",
      "body {",
      "  display: block !important;",
      "  width: 100vw !important;",
      "  height: 100vh !important;",
      "  min-height: 0 !important;",
      "  overflow: hidden !important;",
      "}",
      "#app-window {",
      "  background: #1a1a1a !important;",
      "  box-shadow: none !important;",
      "  width: 100vw !important;",
      "  height: 100vh !important;",
      "  margin: 0 !important;",
      "  transform: none !important;",
      "}",
      "#ps-canvas-inner,",
      "#ae-canvas-inner {",
      "  background: " + canvasBackground + " !important;",
      "}",
      ".ps-circle,",
      ".ae-circle {",
      "  background: " + shapePrimary + " !important;",
      "}",
      ".ps-rect,",
      ".ae-rect {",
      "  background: " + shapeSecondary + " !important;",
      "}",
      "#next-btn,",
      "#scene-dots {",
      "  display: none !important;",
      "}"
    ].join("\n");
  }

  document.addEventListener("DOMContentLoaded", function onReady() {
    const frame = document.querySelector(".home-intro-animation-frame");

    if (!frame) {
      return;
    }

    frame.addEventListener("load", function onFrameLoad() {
      cleanAnimationFrame(frame);
    });

    if (window.OKSTheme && window.OKSTheme.onChange) {
      window.OKSTheme.onChange(function onThemeChange() {
        cleanAnimationFrame(frame);
      });
    }

    cleanAnimationFrame(frame);
  });
})();
