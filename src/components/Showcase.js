// PagesForward — Showcase Component (main carousel page)
// Split-screen: cover left, details right, thumbnail strip bottom, nav arrows

import { api } from '../utils/api.js';
import { getBookCover, formatPrice, bus } from '../utils/helpers.js';
import { showToast } from './Toast.js';
import { icons } from '../utils/icons.js';

let books = [];
let currentIndex = 0;
let container = null;

export async function renderShowcase(el) {
  container = el;
  el.innerHTML = `<div class="showcase" id="showcase-main">
    <div class="showcase__cover-side">
      <img class="showcase__cover-img skeleton" id="sc-cover" alt="" />
    </div>
    <div class="showcase__detail-side" id="sc-detail"></div>
    <button class="showcase__nav-arrow showcase__nav-arrow--prev" id="sc-prev" aria-label="Previous">${icons.chevronLeft}</button>
    <button class="showcase__nav-arrow showcase__nav-arrow--next" id="sc-next" aria-label="Next">${icons.chevronRight}</button>
  </div>
  <div class="thumbnail-strip" id="sc-thumbs"></div>`;

  try {
    const data = await api.getBooks();
    books = data.books || data;
    if (books.length > 0) {
      renderCurrent();
      renderThumbnails();
    }
  } catch (e) {
    console.error('Failed to load books:', e);
    el.querySelector('.showcase__detail-side').innerHTML =
      `<p style="color:var(--color-text-muted)">Could not load books. Is the server running?</p>`;
  }

  // Event listeners
  document.getElementById('sc-prev')?.addEventListener('click', () => goTo(currentIndex - 1));
  document.getElementById('sc-next')?.addEventListener('click', () => goTo(currentIndex + 1));

  // Keyboard nav
  function onKey(e) {
    if (e.key === 'ArrowLeft') goTo(currentIndex - 1);
    if (e.key === 'ArrowRight') goTo(currentIndex + 1);
  }
  document.addEventListener('keydown', onKey);

  return () => {
    document.removeEventListener('keydown', onKey);
  };
}

function goTo(index) {
  if (index < 0 || index >= books.length) return;

  const cover = document.getElementById('sc-cover');
  const detail = document.getElementById('sc-detail');

  // Fade out
  cover?.classList.add('fade-out');
  detail?.classList.add('fade-out');

  setTimeout(() => {
    currentIndex = index;
    renderCurrent();
    updateThumbnailActive();

    // Fade in
    cover?.classList.remove('fade-out');
    detail?.classList.remove('fade-out');
  }, 300);
}

function renderCurrent() {
  const book = books[currentIndex];
  if (!book) return;

  // Track selected format per book
  if (!book._selectedFormat) {
    book._selectedFormat = book.formats?.includes('ebook') ? 'ebook' : 'physical';
  }

  const cover = document.getElementById('sc-cover');
  if (cover) {
    cover.src = getBookCover(book);
    cover.alt = book.title;
    cover.classList.remove('skeleton');
  }

  const detail = document.getElementById('sc-detail');
  if (detail) {
    const genreTag = book.genre ? `<span class="showcase__tag">${book.genre.toUpperCase()}</span>` : '';
    const readLength = book.pages > 400 ? 'LONG READ' : book.pages > 250 ? 'MEDIUM READ' : 'SHORT READ';
    const tagPills = (book.tags || [])
      .map(t => `<span class="showcase__tag">${t.replace('-', ' ').toUpperCase()}</span>`)
      .join('');
    const price = book._selectedFormat === 'ebook' ? book.ebookPrice : book.physicalPrice;

    detail.innerHTML = `
      <div class="showcase__badge">AVAILABLE</div>
      <div class="showcase__title-row">
        <h1 class="showcase__title">${book.title}</h1>
        <button class="showcase__add-btn" data-id="${book.id}">ADD</button>
      </div>
      <div class="showcase__subtitle">${book.description.split('.')[0]}.</div>
      <p class="showcase__desc">${book.description}</p>
      <div class="showcase__meta-line" style="font-size:0.72rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--color-text-muted);margin-bottom:var(--space-md);">
        ${book.genre} · ${readLength}
      </div>
      <div class="showcase__tags">
        ${genreTag}${tagPills}
      </div>

      ${book.formats?.length > 1 ? `
        <div class="detail-format-tabs" id="sc-format-tabs">
          ${book.formats.map(f => `
            <button class="detail-format-tab ${f === book._selectedFormat ? 'active' : ''}" data-format="${f}">
              ${f === 'physical' ? icons.bookOpen : icons.tablet}
              <span>${f === 'physical' ? 'Physical' : 'Ebook'}</span>
            </button>
          `).join('')}
        </div>
      ` : ''}

      <div class="showcase__author-block">
        <div class="showcase__author-name">${book.author}</div>
        <div class="showcase__author-stat" id="sc-price-line">${formatPrice(price)} · ${book._selectedFormat.toUpperCase()}</div>
      </div>

      ${book.formats?.includes('ebook') ? `
        <button class="detail-read-btn" id="sc-read-btn">${icons.eye} Read Preview</button>
      ` : ''}
    `;

    // Format tab switching
    document.querySelectorAll('#sc-format-tabs .detail-format-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        book._selectedFormat = tab.dataset.format;
        document.querySelectorAll('#sc-format-tabs .detail-format-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const p = book._selectedFormat === 'ebook' ? book.ebookPrice : book.physicalPrice;
        document.getElementById('sc-price-line').textContent = `${formatPrice(p)} · ${book._selectedFormat.toUpperCase()}`;
      });
    });

    // Add to cart — uses selected format
    detail.querySelector('.showcase__add-btn')?.addEventListener('click', async () => {
      try {
        await api.addToCart(book.id, book._selectedFormat);
        bus.emit('cart-updated');
        showToast(`Added "${book.title}" (${book._selectedFormat}) to collection`);
      } catch (e) {
        showToast('Failed to add to cart');
      }
    });

    // Read preview
    document.getElementById('sc-read-btn')?.addEventListener('click', () => {
      bus.emit('open-reader', book);
    });
  }
}

function renderThumbnails() {
  const strip = document.getElementById('sc-thumbs');
  if (!strip) return;

  strip.innerHTML = books.map((book, i) => `
    <button class="thumbnail-strip__item ${i === currentIndex ? 'active' : ''}" data-index="${i}">
      <img class="thumbnail-strip__img" src="${getBookCover(book)}" alt="${book.title}" />
      <span class="thumbnail-strip__label">${book.title}</span>
    </button>
  `).join('');

  strip.addEventListener('click', (e) => {
    const item = e.target.closest('.thumbnail-strip__item');
    if (item) goTo(parseInt(item.dataset.index));
  });
}

function updateThumbnailActive() {
  const strip = document.getElementById('sc-thumbs');
  if (!strip) return;
  strip.querySelectorAll('.thumbnail-strip__item').forEach((el, i) => {
    el.classList.toggle('active', i === currentIndex);
  });

  // Scroll active into view
  const active = strip.querySelector('.thumbnail-strip__item.active');
  if (active) active.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
}
