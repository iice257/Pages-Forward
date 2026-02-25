// PagesForward — Library Page (purchased books)

import { api } from '../utils/api.js';
import { getBookCover, formatPrice, bus } from '../utils/helpers.js';
import { navigate } from '../utils/router.js';

export async function renderLibrary(el) {
  el.innerHTML = `
    <div class="library">
      <h1 class="library__title">My Library</h1>
      <div class="library__grid" id="library-grid">
        <p style="color:var(--color-text-muted);">Loading...</p>
      </div>
    </div>`;

  try {
    const data = await api.getLibrary();
    const purchases = data.purchases || data || [];

    const grid = document.getElementById('library-grid');

    if (purchases.length === 0) {
      grid.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:3rem;">
          <p style="color:var(--color-text-muted);margin-bottom:var(--space-lg);">Your library is empty. Purchase some books to see them here!</p>
          <button class="btn btn--primary" id="lib-browse">Browse Books</button>
        </div>`;
      document.getElementById('lib-browse')?.addEventListener('click', () => navigate('/'));
      return;
    }

    grid.innerHTML = purchases.map(item => {
      const book = item.book || item;
      const cover = getBookCover(book);
      const isEbook = item.format === 'ebook';

      return `
        <div class="library-card">
          <img class="library-card__cover" src="${cover}" alt="${book.title}" />
          <div class="library-card__body">
            <div class="library-card__title">${book.title}</div>
            <div class="library-card__format">${item.format}</div>
            <div class="library-card__actions">
              ${isEbook ? `
                <button class="btn btn--primary" style="font-size:0.65rem;padding:0.4rem 0.8rem;" data-read="${book.id}">Read Now</button>
                <a href="${api.getEbookDownloadUrl(book.id)}" class="btn btn--outline" style="font-size:0.65rem;padding:0.4rem 0.8rem;" download>Download</a>
              ` : `
                <button class="btn btn--outline" style="font-size:0.65rem;padding:0.4rem 0.8rem;" disabled>Track Shipment</button>
              `}
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Read handlers
    grid.querySelectorAll('[data-read]').forEach(btn => {
      btn.addEventListener('click', async () => {
        try {
          const book = await api.getBook(btn.dataset.read);
          bus.emit('open-reader', book);
        } catch (e) {
          console.error('Failed to load book for reading:', e);
        }
      });
    });
  } catch (e) {
    document.getElementById('library-grid').innerHTML =
      '<p style="color:var(--color-text-muted);text-align:center;">Could not load library.</p>';
  }
}
