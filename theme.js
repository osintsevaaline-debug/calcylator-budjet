(function (global) {
  const THEME_KEY = "familyBudgetTheme";
  const LEGACY_KEY = "landingTheme";

  function getTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "dark" || saved === "light") {
      return saved;
    }

    const legacy = localStorage.getItem(LEGACY_KEY);
    if (legacy === "dark" || legacy === "light") {
      localStorage.setItem(THEME_KEY, legacy);
      localStorage.removeItem(LEGACY_KEY);
      return legacy;
    }

    return "light";
  }

  function applyTheme(theme) {
    const nextTheme = theme === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", nextTheme);

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", nextTheme === "dark" ? "#0c0618" : "#7c3aed");
    }

    return nextTheme;
  }

  function syncToggleButton(theme) {
    const button = document.getElementById("themeToggle");
    if (!button) return;

    const isDark = theme === "dark";
    button.textContent = isDark ? "☀️" : "🌙";
    button.setAttribute("aria-label", isDark ? "Включить светлую тему" : "Включить тёмную тему");
    button.setAttribute("aria-pressed", String(isDark));
  }

  function setTheme(theme) {
    const nextTheme = applyTheme(theme);
    localStorage.setItem(THEME_KEY, nextTheme);
    syncToggleButton(nextTheme);
    return nextTheme;
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    return setTheme(currentTheme === "dark" ? "light" : "dark");
  }

  function applySavedTheme() {
    return applyTheme(getTheme());
  }

  function initTheme(options) {
    const theme = applySavedTheme();
    if (options && options.toggle) {
      syncToggleButton(theme);
    }
  }

  function bootToggle() {
    const button = document.getElementById("themeToggle");
    if (!button) return;

    button.addEventListener("click", function () {
      toggleTheme();
    });
  }

  global.FamilyBudgetTheme = {
    THEME_KEY,
    getTheme,
    applyTheme,
    setTheme,
    toggleTheme,
    applySavedTheme,
    initTheme,
    bootToggle
  };
})(window);
