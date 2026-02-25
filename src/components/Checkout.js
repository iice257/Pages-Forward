// PagesForward — Checkout Page

import { api } from '../utils/api.js';
import { formatPrice, bus } from '../utils/helpers.js';
import { navigate } from '../utils/router.js';
import { showToast } from './Toast.js';
import { icons } from '../utils/icons.js';

export async function renderCheckout(el) {
  let items = [];
  let total = 0;

  el.innerHTML = `<div class="checkout"><div class="checkout__title">Checkout</div><p style="text-align:center;color:var(--color-text-muted);">Loading your collection...</p></div>`;

  try {
    const data = await api.getCart();
    items = data.items || data.cart || [];
    total = items.reduce((s, i) => {
      const p = i.format === 'ebook' ? (i.book?.ebookPrice || 0) : (i.book?.physicalPrice || 0);
      return s + p * (i.quantity || 1);
    }, 0);

    if (items.length === 0) {
      el.innerHTML = `
        <div class="checkout" style="text-align:center;padding-top:4rem;">
          <h2 class="checkout__title">Your collection is empty</h2>
          <p style="color:var(--color-text-muted);margin-bottom:var(--space-lg);">Add some books first!</p>
          <button class="btn btn--primary" id="co-browse">Browse Books</button>
        </div>`;
      document.getElementById('co-browse')?.addEventListener('click', () => navigate('/'));
      return;
    }

    renderForm();
  } catch (e) {
    el.innerHTML = `<div class="checkout" style="text-align:center;"><p>Could not load cart.</p></div>`;
  }

  function renderForm() {
    const hasPhysical = items.some(i => i.format === 'physical');

    el.innerHTML = `
      <div class="checkout">
        <h1 class="checkout__title">Checkout</h1>

        <div class="checkout__section">
          <h3 class="checkout__section-title">Order Summary</h3>
          ${items.map(i => `
            <div class="checkout__summary-item">
              <span>${i.book?.title || i.bookId} <small style="color:var(--color-text-muted)">(${i.format})</small></span>
              <span>${formatPrice(((i.format === 'ebook' ? i.book?.ebookPrice : i.book?.physicalPrice) || 0) * (i.quantity || 1))}</span>
            </div>
          `).join('')}
          <div class="checkout__summary-total">
            <span>Total</span>
            <span>${formatPrice(total)}</span>
          </div>
        </div>

        ${hasPhysical ? `
          <form id="checkout-form">
            <div class="checkout__section">
              <h3 class="checkout__section-title">Shipping Information</h3>
              <div class="form-group">
                <label for="co-name">Full Name</label>
                <input id="co-name" type="text" required placeholder="John Doe" />
              </div>
              <div class="form-group">
                <label for="co-email">Email</label>
                <input id="co-email" type="email" required placeholder="john@example.com" />
              </div>
              <div class="form-group">
                <label for="co-address">Address</label>
                <input id="co-address" type="text" required placeholder="123 Main St" />
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="co-city">City</label>
                  <input id="co-city" type="text" required placeholder="New York" />
                </div>
                <div class="form-group">
                  <label for="co-zip">ZIP Code</label>
                  <input id="co-zip" type="text" required placeholder="10001" />
                </div>
              </div>
            </div>

            <div class="checkout__section">
              <h3 class="checkout__section-title">Payment</h3>
              <div class="form-group">
                <label for="co-card">Card Number</label>
                <input id="co-card" type="text" required placeholder="4242 4242 4242 4242" maxlength="19" />
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="co-exp">Expiry</label>
                  <input id="co-exp" type="text" required placeholder="MM/YY" maxlength="5" />
                </div>
                <div class="form-group">
                  <label for="co-cvc">CVC</label>
                  <input id="co-cvc" type="text" required placeholder="123" maxlength="4" />
                </div>
              </div>
            </div>

            <button type="submit" class="btn btn--primary" style="width:100%;">Complete Purchase — ${formatPrice(total)}</button>
          </form>
        ` : `
          <div style="text-align:center;margin-top:var(--space-xl);">
            <p style="color:var(--color-text-secondary);margin-bottom:var(--space-lg);">All items are digital — no shipping needed!</p>
            <button class="btn btn--primary" id="co-digital-pay" style="width:100%;">Complete Purchase — ${formatPrice(total)}</button>
          </div>
        `}
      </div>
    `;

    // Form submission
    const form = document.getElementById('checkout-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await processCheckout({
          name: document.getElementById('co-name').value,
          email: document.getElementById('co-email').value,
          address: document.getElementById('co-address').value,
          city: document.getElementById('co-city').value,
          zip: document.getElementById('co-zip').value,
        });
      });
    }

    // Digital-only purchase
    document.getElementById('co-digital-pay')?.addEventListener('click', () => processCheckout({}));
  }

  async function processCheckout(shippingInfo) {
    try {
      await api.checkout(shippingInfo);
      bus.emit('cart-updated');
      showToast('Purchase complete!');
      renderSuccess();
    } catch (e) {
      showToast('Checkout failed — please try again');
    }
  }

  function renderSuccess() {
    el.innerHTML = `
      <div class="checkout__success">
        <div class="checkout__success-icon">${icons.check}</div>
        <h2>Purchase Complete!</h2>
        <p style="color:var(--color-text-secondary);margin-bottom:var(--space-xl);">Your books are ready in your library.</p>
        <div style="display:flex;gap:var(--space-md);justify-content:center;">
          <button class="btn btn--primary" id="co-library">Go to Library</button>
          <button class="btn btn--outline" id="co-home">Continue Browsing</button>
        </div>
      </div>
    `;
    document.getElementById('co-library')?.addEventListener('click', () => navigate('/library'));
    document.getElementById('co-home')?.addEventListener('click', () => navigate('/'));
  }
}
