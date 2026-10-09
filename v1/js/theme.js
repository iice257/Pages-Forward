(function () {
  'use strict';

  const STORAGE_KEY = 'pf_theme';

  function getTarget() {
    return document.body || document.documentElement;
  }

  function apply(theme) {
    const nextTheme = theme === 'dark' ? 'dark' : 'light';
    getTarget().setAttribute('data-theme', nextTheme);
    localStorage.setItem(STORAGE_KEY, nextTheme);
    return nextTheme;
  }

  function init(toggle) {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    const preferredTheme = window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

    apply(savedTheme || preferredTheme);

    if (toggle) {
      toggle.addEventListener('click', () => {
        const current = getTarget().getAttribute('data-theme');
        apply(current === 'dark' ? 'light' : 'dark');
      });
    }
  }

  window.PF = window.PF || {};
  window.PF.Theme = { apply, init };
})();
