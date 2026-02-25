// PagesForward — Catalog / Full List View
// Grid view with filter bar (Category, Length, Popularity, Available, Search)

import { api } from '../utils/api.js';
import { getBookCover, formatPrice, debounce, bus } from '../utils/helpers.js';
import { navigate } from '../utils/router.js';
import { showToast } from './Toast.js';
import { icons } from '../utils/icons.js';

const GENRES = ['Fiction', 'Sci-Fi', 'Fantasy', 'Mystery', 'Romance', 'Non-Fiction', 'Self-Help', 'Biography', 'History', 'Horror'];
const LENGTHS = [
  { label: 'Short', max: 250 },
  { label: 'Medium', min: 250, max: 400 },
  { label: 'Long', min: 400 }
];
const POPULARITY = ['Bestseller', 'Award-Winner', 'New Release', 'Niche'];

export async function renderCatalog(el) {
  let filters = { genre: null, length: null, popularity: null, available: false, search: '', sort: null };
  let allBooks = [];
  let openDropdown = null;

  el.innerHTML = `
    <div class="filter-bar" id="filter-bar">
      <button class="filter-bar__icon" id="filter-icon" title="Filter">${icons.filter}</button>
      <div class="filter-bar__toggle-group">
        <button class="filter-bar__toggle active" id="filter-mode">FILTER</button>
        <button class="filter-bar__toggle" id="sort-mode">SORT</button>
      </div>
      <div class="filter-bar__options" id="filter-options">
        <div class="filter-bar__option" data-filter="genre" style="position:relative;">Category
          <div class="filter-dropdown" id="dd-genre">
            ${GENRES.map(g => `<div class="filter-dropdown__item" data-value="${g}">${g}</div>`).join('')}
          </div>
        </div>
        <div class="filter-bar__option" data-filter="length" style="position:relative;">Length
          <div class="filter-dropdown" id="dd-length">
            ${LENGTHS.map(l => `<div class="filter-dropdown__item" data-value="${l.label}">${l.label}</div>`).join('')}
          </div>
        </div>
        <div class="filter-bar__option" data-filter="popularity" style="position:relative;">Popularity
          <div class="filter-dropdown" id="dd-popularity">
            ${POPULARITY.map(p => `<div class="filter-dropdown__item" data-value="${p.toLowerCase()}">${p}</div>`).join('')}
          </div>
        </div>
        <div class="filter-bar__option" data-filter="available">Available Books</div>
        <button class="filter-bar__clear" id="filter-clear">CLEAR</button>
      </div>
      <div class="filter-bar__search" id="filter-search">
        <span class="filter-bar__search-icon">${icons.search}</span>
        <input type="text" placeholder="Search..." id="search-input" />
      </div>
    </div>
    <div id="active-filters-row" style="padding:0 var(--space-xl);"></div>
    <div class="book-grid" id="book-grid"></div>
  `;

  // Sort options dropdown
  const sortOptions = `
    <div class="filter-bar__option" data-sort="title">Title A–Z</div>
    <div class="filter-bar__option" data-sort="price-asc">Price: Low → High</div>
    <div class="filter-bar__option" data-sort="price-desc">Price: High → Low</div>
    <div class="filter-bar__option" data-sort="rating">Top Rated</div>
    <div class="filter-bar__option" data-sort="year">Newest</div>
  `;

  const filterOpts = document.getElementById('filter-options').innerHTML;

  // Toggle FILTER / SORT mode
  document.getElementById('filter-mode').addEventListener('click', () => {
    document.getElementById('filter-mode').classList.add('active');
    document.getElementById('sort-mode').classList.remove('active');
    document.getElementById('filter-options').innerHTML = filterOpts;
    attachFilterListeners();
    syncActiveStates();
  });
  document.getElementById('sort-mode').addEventListener('click', () => {
    document.getElementById('sort-mode').classList.add('active');
    document.getElementById('filter-mode').classList.remove('active');
    document.getElementById('filter-options').innerHTML = sortOptions;
    attachSortListeners();
  });

  // Load books
  try {
    const data = await api.getBooks();
    allBooks = data.books || data;
    renderGrid();
  } catch (e) {
    document.getElementById('book-grid').innerHTML =
      '<p style="padding:2rem;color:var(--color-text-muted);text-align:center;">Could not load books. Is the server running?</p>';
  }

  // Search
  document.getElementById('search-input').addEventListener('input', debounce((e) => {
    filters.search = e.target.value;
    renderGrid();
  }, 250));

  attachFilterListeners();

  function attachFilterListeners() {
    // Category dropdown toggle
    document.querySelectorAll('.filter-bar__option[data-filter]').forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        const filterType = opt.dataset.filter;

        // Available Books is a toggle, no dropdown
        if (filterType === 'available') {
          filters.available = !filters.available;
          opt.classList.toggle('active', filters.available);
          renderGrid();
          return;
        }

        const dd = document.getElementById(`dd-${filterType}`);
        if (!dd) return;

        // Toggle dropdown
        if (openDropdown && openDropdown !== dd) openDropdown.classList.remove('open');
        dd.classList.toggle('open');
        openDropdown = dd.classList.contains('open') ? dd : null;
      });
    });

    // Dropdown item selections
    document.querySelectorAll('.filter-dropdown__item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const dd = item.closest('.filter-dropdown');
        const filterType = item.closest('.filter-bar__option').dataset.filter;
        const value = item.dataset.value;

        // Toggle selection
        if (filters[filterType] === value) {
          filters[filterType] = null;
          item.classList.remove('selected');
        } else {
          dd.querySelectorAll('.filter-dropdown__item').forEach(i => i.classList.remove('selected'));
          item.classList.add('selected');
          filters[filterType] = value;
        }

        dd.classList.remove('open');
        openDropdown = null;
        syncActiveStates();
        renderGrid();
      });
    });

    // Clear
    document.getElementById('filter-clear')?.addEventListener('click', () => {
      filters = { genre: null, length: null, popularity: null, available: false, search: '', sort: null };
      document.getElementById('search-input').value = '';
      document.querySelectorAll('.filter-bar__option').forEach(o => o.classList.remove('active'));
      document.querySelectorAll('.filter-dropdown__item').forEach(i => i.classList.remove('selected'));
      renderGrid();
    });

    // Close dropdown on outside click
    document.addEventListener('click', () => {
      if (openDropdown) { openDropdown.classList.remove('open'); openDropdown = null; }
    });
  }

  function attachSortListeners() {
    document.querySelectorAll('.filter-bar__option[data-sort]').forEach(opt => {
      opt.addEventListener('click', () => {
        document.querySelectorAll('.filter-bar__option[data-sort]').forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        filters.sort = opt.dataset.sort;
        renderGrid();
      });
    });
  }

  function syncActiveStates() {
    document.querySelectorAll('.filter-bar__option[data-filter]').forEach(opt => {
      const f = opt.dataset.filter;
      if (f === 'available') {
        opt.classList.toggle('active', filters.available);
      } else {
        opt.classList.toggle('active', filters[f] !== null);
      }
    });
  }

  function applyFilters() {
    let filtered = [...allBooks];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(b =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        (b.genre || '').toLowerCase().includes(q)
      );
    }

    if (filters.genre) {
      filtered = filtered.filter(b => b.genre === filters.genre);
    }

    if (filters.length) {
      const len = LENGTHS.find(l => l.label === filters.length);
      if (len) {
        filtered = filtered.filter(b => {
          if (len.min && len.max) return b.pages >= len.min && b.pages < len.max;
          if (len.max) return b.pages < len.max;
          if (len.min) return b.pages >= len.min;
          return true;
        });
      }
    }

    if (filters.popularity) {
      const tag = filters.popularity.toLowerCase();
      filtered = filtered.filter(b => (b.tags || []).includes(tag));
    }

    if (filters.available) {
      filtered = filtered.filter(b => b.formats && b.formats.length > 0);
    }

    // Sort
    if (filters.sort) {
      switch (filters.sort) {
        case 'title':
          filtered.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'price-asc':
          filtered.sort((a, b) => a.physicalPrice - b.physicalPrice);
          break;
        case 'price-desc':
          filtered.sort((a, b) => b.physicalPrice - a.physicalPrice);
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'year':
          filtered.sort((a, b) => b.year - a.year);
          break;
      }
    }

    return filtered;
  }

  function renderGrid() {
    const grid = document.getElementById('book-grid');
    const filtered = applyFilters();

    // Active filters pill
    const activeRow = document.getElementById('active-filters-row');
    const activeFilters = [];
    if (filters.genre) activeFilters.push(`CATEGORY: ${filters.genre.toUpperCase()}`);
    if (filters.length) activeFilters.push(`LENGTH: ${filters.length.toUpperCase()}`);
    if (filters.popularity) activeFilters.push(`POPULARITY: ${filters.popularity.toUpperCase()}`);
    if (filters.available) activeFilters.push('AVAILABLE BOOKS');

    if (activeFilters.length > 0) {
      activeRow.innerHTML = `<div class="active-filters">${activeFilters.join(' · ')}</div>`;
    } else {
      activeRow.innerHTML = '';
    }

    if (filtered.length === 0) {
      grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--color-text-muted);padding:3rem;">No books match your filters</p>';
      return;
    }

    grid.innerHTML = filtered.map(book => `
      <div class="book-card" data-id="${book.id}">
        <img class="book-card__cover" src="${getBookCover(book)}" alt="${book.title}" loading="lazy" />
        <div class="book-card__title">${book.title}</div>
        <div class="book-card__author">${book.author}</div>
        <div class="book-card__price">${formatPrice(book.physicalPrice)}</div>
      </div>
    `).join('');

    // Click to detail
    grid.querySelectorAll('.book-card').forEach(card => {
      card.addEventListener('click', () => navigate(`/book/${card.dataset.id}`));
    });
  }
}
