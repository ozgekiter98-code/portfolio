(function attachContactPage(global) {
  document.addEventListener("DOMContentLoaded", function onReady() {
    if (!global.OKSSite) {
      return;
    }

    global.OKSSite.setAccent("145, 126, 107");
    global.OKSSite.setContext("Digital");
  });
})(window);
