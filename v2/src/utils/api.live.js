// PagesForward — API Client
const API_BASE = '/api';

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  };
  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }
  const res = await fetch(url, config);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

export const api = {
  // Books
  getBooks: (params = {}) => {
    const qs = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') qs.set(k, v);
    });
    const query = qs.toString();
    return request(`/books${query ? '?' + query : ''}`);
  },
  getBook: (id) => request(`/books/${id}`),

  // Cart
  getCart: () => request('/cart'),
  addToCart: (bookId, format, quantity = 1) =>
    request('/cart', { method: 'POST', body: { bookId, format, quantity } }),
  updateCartItem: (bookId, format, quantity) =>
    request(`/cart/${bookId}`, { method: 'PUT', body: { format, quantity } }),
  removeFromCart: (bookId, format) =>
    request(`/cart/${bookId}/${format}`, { method: 'DELETE' }),
  clearCart: () => request('/cart', { method: 'DELETE' }),

  // Checkout
  checkout: (shippingInfo) =>
    request('/checkout', { method: 'POST', body: { shippingInfo } }),

  // Library
  getLibrary: () => request('/library'),

  // Ebook
  getEbookReadUrl: (id) => `${API_BASE}/ebooks/${id}/read`,
  getEbookDownloadUrl: (id) => `${API_BASE}/ebooks/${id}/download`,
};
