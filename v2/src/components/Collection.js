// PagesForward — Collection Modal (Cart/Collection drawer)
// Matches ref: centered modal, "My Collection" title, close X, items list, empty state

import { api } from '../utils/api.js';
import { getBookCover, formatPrice, bus } from '../utils/helpers.js';
import { showToast } from './Toast.js';
import { navigate } from '../utils/router.js';
import { icons } from '../utils/icons.js';

let isOpen = false;

export function initCollection() {
  // Create modal overlay
  const overlay = document.createElement('div');
  overlay.className = 'collection-modal__overlay';
  overlay.id = 'collection-overlay';
  overlay.innerHTML = `
    <div class="collection-modal">
      <div class="collection-modal__header">
        <span class="collection-modal__title">My Collection</span>
        <button class="collection-modal__close" id="collection-close" aria-label="Close">${icons.x}</button>
      </div>
      <div class="collection-modal__body" id="collection-body">
        <p class="collection-modal__empty">You haven't added any books</p>
        <button class="collection-modal__cta" id="collection-add-cta">ADD BOOKS</button>
      </div>
      <div class="collection-modal__footer" id="collection-footer" style="display:none;">
        <span class="collection-modal__total" id="collection-total"></span>
        <button class="btn btn--primary" id="collection-checkout">Checkout</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  // Toggle
  bus.on('toggle-collection', () => {
    isOpen = !isOpen;
    toggle(isOpen);
  });

  bus.on('cart-updated', () => {
    if (isOpen) refreshCart();
  });

  // Close
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) { isOpen = false; toggle(false); }
  });
  document.getElementById('collection-close').addEventListener('click', () => {
    isOpen = false;
    toggle(false);
  });

  // Add Books CTA
  document.getElementById('collection-add-cta')?.addEventListener('click', () => {
    isOpen = false;
    toggle(false);
    navigate('/');
  });

  // Checkout
  document.getElementById('collection-checkout')?.addEventListener('click', () => {
    isOpen = false;
    toggle(false);
    navigate('/checkout');
  });
}

function toggle(open) {
  const overlay = document.getElementById('collection-overlay');
  if (open) {
    overlay.classList.add('open');
    refreshCart();
  } else {
    overlay.classList.remove('open');
  }
}

async function refreshCart() {
  const body = document.getElementById('collection-body');
  const footer = document.getElementById('collection-footer');
  if (!body) return;

  try {
    const data = await api.getCart();
    const items = data.items || data.cart || [];

    if (items.length === 0) {
      body.innerHTML = `
        <p class="collection-modal__empty">You haven't added any books</p>
        <button class="collection-modal__cta" id="collection-add-cta-2">ADD BOOKS</button>
      `;
      document.getElementById('collection-add-cta-2')?.addEventListener('click', () => {
        isOpen = false;
        toggle(false);
        navigate('/');
      });
      footer.style.display = 'none';
    } else {
      body.innerHTML = items.map(item => {
        const cover = item.book ? getBookCover(item.book) : '';
        const title = item.book?.title || item.bookId;
        const price = item.format === 'ebook' ? (item.book?.ebookPrice || 0) : (item.book?.physicalPrice || 0);
        return `
          <div class="collection-item">
            <img class="collection-item__cover" src="${cover}" alt="${title}" />
            <div class="collection-item__info">
              <div class="collection-item__title">${title}</div>
              <div class="collection-item__meta">${item.format} · Qty: ${item.quantity || 1}</div>
            </div>
            <span class="collection-item__price">${formatPrice(price)}</span>
            <button class="collection-item__remove" data-book="${item.bookId}" data-format="${item.format}" title="Remove">${icons.trash}</button>
          </div>
        `;
      }).join('');

      body.style.padding = '0';
      body.style.textAlign = 'left';

      // Remove handlers
      body.querySelectorAll('.collection-item__remove').forEach(btn => {
        btn.addEventListener('click', async () => {
          try {
            await api.removeFromCart(btn.dataset.book, btn.dataset.format);
            bus.emit('cart-updated');
            refreshCart();
            showToast('Removed from collection');
          } catch (e) {
            showToast('Failed to remove');
          }
        });
      });

      // Total
      const total = items.reduce((sum, i) => {
        const p = i.format === 'ebook' ? (i.book?.ebookPrice || 0) : (i.book?.physicalPrice || 0);
        return sum + p * (i.quantity || 1);
      }, 0);
      document.getElementById('collection-total').textContent = `Total: ${formatPrice(total)}`;
      footer.style.display = 'flex';
    }
  } catch (e) {
    body.innerHTML = `<p class="collection-modal__empty">Could not load collection</p>`;
    footer.style.display = 'none';
  }
}
