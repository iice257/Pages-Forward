// PagesForward — Header Component
// "PAGES FORWARD" left, theme toggle + "FULL LIST" pill + collection icon right

import { bus } from '../utils/helpers.js';
import { navigate } from '../utils/router.js';
import { icons } from '../utils/icons.js';

export function initHeader() {
  const header = document.getElementById('header');

  // Detect saved theme
  const savedTheme = localStorage.getItem('pf-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  header.innerHTML = `
    <a href="#/" class="header__logo">Pages Forward</a>
    <div class="header__actions">
      <button class="header__icon-btn" id="theme-toggle" title="Toggle dark mode"
        aria-label="Toggle dark mode">
        ${savedTheme === 'dark' ? icons.sun : icons.moon}
      </button>
      <button class="header__fulllist-btn" id="fulllist-btn">Full List</button>
      <button class="header__icon-btn" id="collection-btn" title="My Collection"
        aria-label="My Collection">${icons.bookmark}</button>
    </div>
  `;

  // Theme toggle
  document.getElementById('theme-toggle').addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('pf-theme', next);
    document.getElementById('theme-toggle').innerHTML = next === 'dark' ? icons.sun : icons.moon;
  });

  // Full List toggle
  document.getElementById('fulllist-btn').addEventListener('click', () => {
    const hash = window.location.hash;
    if (hash === '#/catalog') {
      navigate('/');
    } else {
      navigate('/catalog');
    }
  });

  // Update active state on hash change
  function updateFullListState() {
    const btn = document.getElementById('fulllist-btn');
    if (btn) {
      btn.classList.toggle('active', window.location.hash === '#/catalog');
    }
  }
  window.addEventListener('hashchange', updateFullListState);
  updateFullListState();

  // Collection modal toggle
  document.getElementById('collection-btn').addEventListener('click', () => {
    bus.emit('toggle-collection');
  });
}
