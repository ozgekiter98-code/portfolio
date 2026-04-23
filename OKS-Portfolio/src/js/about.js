(function attachAboutPage(global) {
  document.addEventListener("DOMContentLoaded", function onReady() {
    if (!global.OKSSite) {
      return;
    }

    global.OKSSite.setAccent("159, 123, 94");
    global.OKSSite.setContext("Architecture");
  });
})(window);
