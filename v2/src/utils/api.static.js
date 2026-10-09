// Serverless demo of server/server.js: same endpoints and response shapes, no backend.
// Catalog comes from the seed file; cart and purchases live in localStorage.
import seed from '../../server/db-seed.json';

const KEY = 'pf_v2_demo';
const books = seed.books;

const load = () => {
  try {
    return { cart: [], purchases: [], ...JSON.parse(localStorage.getItem(KEY) || '{}') };
  } catch {
    return { cart: [], purchases: [] };
  }
};
const save = (state) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Storage blocked: the demo still works for the current page view.
  }
};
const bookOf = (id) => books.find((b) => b.id === id);
const enrich = (cart) => cart.map((item) => ({ ...item, book: bookOf(item.bookId) })).filter((item) => item.book);

const sorters = {
  'price-asc': (a, b) => a.physicalPrice - b.physicalPrice,
  'price-desc': (a, b) => b.physicalPrice - a.physicalPrice,
  rating: (a, b) => b.rating - a.rating,
  'title-asc': (a, b) => a.title.localeCompare(b.title),
  'title-desc': (a, b) => b.title.localeCompare(a.title),
  newest: (a, b) => b.year - a.year,
  bestseller: (a, b) => Number(b.tags.includes('bestseller')) - Number(a.tags.includes('bestseller')),
};

export const api = {
  async getBooks(params = {}) {
    let list = [...books];
    const q = params.q?.toLowerCase();
    if (q) list = list.filter((b) => [b.title, b.author, b.description].some((s) => s.toLowerCase().includes(q)));
    if (params.genre) {
      const genres = String(params.genre).split(',');
      list = list.filter((b) => genres.includes(b.genre));
    }
    if (params.format === 'physical' || params.format === 'ebook') list = list.filter((b) => b.formats.includes(params.format));
    if (params.minPrice) list = list.filter((b) => b.physicalPrice >= parseFloat(params.minPrice));
    if (params.maxPrice) list = list.filter((b) => b.physicalPrice <= parseFloat(params.maxPrice));
    if (params.minRating) list = list.filter((b) => b.rating >= parseFloat(params.minRating));
    if (params.tags) {
      const tags = String(params.tags).split(',');
      list = list.filter((b) => tags.some((t) => b.tags.includes(t)));
    }
    list.sort(sorters[params.sort || 'title-asc'] || sorters['title-asc']);
    return { books: list, total: list.length };
  },
  async getBook(id) {
    const book = bookOf(id);
    if (!book) throw new Error('Book not found');
    return { book, recommendations: books.filter((b) => b.genre === book.genre && b.id !== book.id).slice(0, 4) };
  },

  async getCart() {
    return { items: enrich(load().cart) };
  },
  async addToCart(bookId, format, quantity = 1) {
    const state = load();
    const existing = state.cart.find((i) => i.bookId === bookId && i.format === format);
    if (existing) existing.quantity += quantity;
    else state.cart.push({ bookId, format, quantity });
    save(state);
    return { success: true, cart: state.cart };
  },
  async updateCartItem(bookId, format, quantity) {
    const state = load();
    const item = state.cart.find((i) => i.bookId === bookId && i.format === format);
    if (!item) throw new Error('Item not in cart');
    if (quantity <= 0) state.cart = state.cart.filter((i) => i !== item);
    else item.quantity = quantity;
    save(state);
    return { success: true, cart: state.cart };
  },
  async removeFromCart(bookId, format) {
    const state = load();
    state.cart = state.cart.filter((i) => !(i.bookId === bookId && i.format === format));
    save(state);
    return { success: true, cart: state.cart };
  },
  async clearCart() {
    const state = load();
    state.cart = [];
    save(state);
    return { success: true };
  },

  async checkout(shippingInfo) {
    const state = load();
    if (state.cart.length === 0) throw new Error('Cart is empty');
    const order = {
      id: 'order-' + Date.now(),
      date: new Date().toISOString(),
      items: state.cart.map((item) => {
        const book = bookOf(item.bookId);
        return { ...item, price: item.format === 'ebook' ? book.ebookPrice : book.physicalPrice, title: book.title };
      }),
      shippingInfo: shippingInfo || null,
      status: 'confirmed',
    };
    state.purchases.push(order);
    state.cart = [];
    save(state);
    return { success: true, order };
  },

  async getLibrary() {
    const items = [];
    for (const order of load().purchases) {
      for (const item of order.items) {
        const book = bookOf(item.bookId);
        if (book) items.push({ bookId: item.bookId, format: item.format, purchaseDate: order.date, orderId: order.id, book });
      }
    }
    return { items };
  },

  // The demo ships no ebook files, so the reader has nothing to open.
  getEbookReadUrl: (id) => `${import.meta.env.BASE_URL}ebooks/${id}.pdf`,
  getEbookDownloadUrl: (id) => `${import.meta.env.BASE_URL}ebooks/${id}.pdf`,
};
