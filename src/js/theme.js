(function attachTheme(global) {
  const storageKey = "oks-theme";
  const listeners = [];

  function normalize(theme) {
    return String(theme).toLowerCase() === "dark" ? "dark" : "light";
  }

  function getStoredTheme() {
    try {
      return normalize(localStorage.getItem(storageKey));
    } catch (_error) {
      return "light";
    }
  }

  function notify(theme) {
    listeners.forEach(function eachListener(listener) {
      listener(theme);
    });
  }

  function applyTheme(theme) {
    const value = normalize(theme);
    document.documentElement.dataset.theme = value;
    document.body.dataset.theme = value;

    try {
      localStorage.setItem(storageKey, value);
    } catch (_error) {
      // Ignore storage failures.
    }

    const toggle = document.getElementById("themeToggle");
    if (toggle) {
      toggle.setAttribute("aria-pressed", String(value === "dark"));
    }

    notify(value);
    return value;
  }

  function init() {
    if (document.body.dataset.themeReady === "true") {
      return;
    }

    document.body.dataset.themeReady = "true";
    applyTheme(getStoredTheme());

    const toggle = document.getElementById("themeToggle");
    if (toggle) {
      toggle.addEventListener("click", function onToggle() {
        const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        applyTheme(next);
      });
    }
  }

  global.OKSTheme = {
    apply: applyTheme,
    get: function getTheme() {
      return normalize(document.documentElement.dataset.theme || "light");
    },
    init: init,
    onChange: function onChange(listener) {
      if (typeof listener !== "function") {
        return function noop() {};
      }

      listeners.push(listener);
      return function unsubscribe() {
        const index = listeners.indexOf(listener);
        if (index >= 0) {
          listeners.splice(index, 1);
        }
      };
    }
  };
})(window);
