(function attachAboutPage(global) {
  document.addEventListener("DOMContentLoaded", function onReady() {
    if (!global.OKSSite) {
      return;
    }

    global.OKSSite.setContext("Architecture");
  });
})(window);
