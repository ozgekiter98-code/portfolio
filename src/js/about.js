(function attachAboutPage(global) {
  document.addEventListener("DOMContentLoaded", function onReady() {
    if (!global.OKSSite) {
      return;
    }

    global.OKSSite.setContext("Architecture");

    var portrait = document.querySelector(".about-portrait img");
    if (portrait && global.OKSTheme) {
      function syncPortrait(theme) {
        portrait.src = theme === "dark"
          ? "../assets/shared/picture-of-me-dark.png"
          : "../assets/shared/picture-of-me.png";
      }
      syncPortrait(global.OKSTheme.get());
      global.OKSTheme.onChange(syncPortrait);
    }
  });
})(window);
