// PagesForward — Book Detail Page
// Showcase-style split-screen layout matching the home page, with full actions

import { api } from '../utils/api.js';
import { getBookCover, formatPrice, renderStars, bus } from '../utils/helpers.js';
import { navigate } from '../utils/router.js';
import { showToast } from './Toast.js';
import { icons } from '../utils/icons.js';

export async function renderBookDetail(el, params) {
  const { id } = params;
  let selectedFormat = 'physical';

  el.innerHTML = `
    <div class="showcase" style="position:relative;">
      <div class="showcase__cover-side">
        <div class="skeleton" style="width:320px;height:480px;border-radius:var(--radius-md);"></div>
      </div>
      <div class="showcase__detail-side">
        <p style="color:var(--color-text-muted);">Loading...</p>
      </div>
    </div>`;

  try {
    const data = await api.getBook(id);
    const book = data.book || data;
    if (!book) throw new Error('Book not found');
    selectedFormat = book.formats?.includes('ebook') ? 'ebook' : 'physical';
    renderDetail(book);
  } catch (e) {
    el.innerHTML = `
      <div class="showcase" style="align-items:center;justify-content:center;text-align:center;">
        <div>
          <h2>Book not found</h2>
          <p style="color:var(--color-text-muted);margin:1rem 0;">The book you're looking for doesn't exist.</p>
          <button class="btn btn--outline" onclick="location.hash='#/'">Go Home</button>
        </div>
      </div>`;
  }

  function renderDetail(book) {
    const price = selectedFormat === 'ebook' ? book.ebookPrice : book.physicalPrice;
    const readLength = book.pages > 400 ? 'LONG READ' : book.pages > 250 ? 'MEDIUM READ' : 'SHORT READ';
    const genreTag = book.genre ? `<span class="showcase__tag">${book.genre.toUpperCase()}</span>` : '';
    const tagPills = (book.tags || [])
      .map(t => `<span class="showcase__tag">${t.replace('-', ' ').toUpperCase()}</span>`)
      .join('');

    el.innerHTML = `
      <div class="showcase" style="position:relative;">
        <button class="detail-back-btn" id="detail-back" aria-label="Go back">${icons.arrowLeft}</button>
        <div class="showcase__cover-side">
          <img class="showcase__cover-img" src="${getBookCover(book)}" alt="${book.title}" />
        </div>
        <div class="showcase__detail-side" id="detail-side">
          <div class="showcase__badge">AVAILABLE</div>
          <div class="showcase__title-row">
            <h1 class="showcase__title">${book.title}</h1>
            <button class="showcase__add-btn" id="detail-add">ADD</button>
          </div>
          <div class="showcase__subtitle">${book.description.split('.')[0]}.</div>
          <p class="showcase__desc">${book.description}</p>

          <div class="showcase__meta-line" style="font-size:0.72rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--color-text-muted);margin-bottom:var(--space-md);">
            ${book.genre} · ${readLength} · ${book.pages} pages · ${book.year} · ${renderStars(book.rating)} ${book.rating}
          </div>

          <div class="showcase__tags">
            ${genreTag}${tagPills}
          </div>

          ${book.formats?.length > 1 ? `
            <div class="detail-format-tabs" id="format-tabs">
              ${book.formats.map(f => `
                <button class="detail-format-tab ${f === selectedFormat ? 'active' : ''}" data-format="${f}">
                  ${f === 'physical' ? icons.bookOpen : icons.tablet}
                  <span>${f === 'physical' ? 'Physical' : 'Ebook'}</span>
                </button>
              `).join('')}
            </div>
          ` : ''}

          <div class="showcase__author-block">
            <div class="showcase__author-name">${book.author}</div>
            <div class="showcase__author-stat" id="detail-price-line">${formatPrice(price)} · ${selectedFormat.toUpperCase()}</div>
          </div>

          ${book.formats?.includes('ebook') ? `
            <button class="detail-read-btn" id="detail-read">${icons.eye} Read Preview</button>
          ` : ''}
        </div>
      </div>
    `;

    // Back button
    document.getElementById('detail-back')?.addEventListener('click', () => history.back());

    // Format tabs
    document.querySelectorAll('#format-tabs .detail-format-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        selectedFormat = tab.dataset.format;
        document.querySelectorAll('#format-tabs .detail-format-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const p = selectedFormat === 'ebook' ? book.ebookPrice : book.physicalPrice;
        document.getElementById('detail-price-line').textContent = `${formatPrice(p)} · ${selectedFormat.toUpperCase()}`;
      });
    });

    // Add to cart
    document.getElementById('detail-add')?.addEventListener('click', async () => {
      try {
        await api.addToCart(book.id, selectedFormat);
        bus.emit('cart-updated');
        showToast(`Added "${book.title}" (${selectedFormat}) to collection`);
      } catch (e) {
        showToast('Failed to add');
      }
    });

    // Read preview
    document.getElementById('detail-read')?.addEventListener('click', () => {
      bus.emit('open-reader', book);
    });
  }
}
