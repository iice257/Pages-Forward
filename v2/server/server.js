import express from 'express';
import cors from 'cors';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { JSONFilePreset } from 'lowdb/node';
import { readFileSync, existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const EBOOKS_DIR = join(__dirname, 'ebooks');

// --- Initialize DB ---
const defaultData = JSON.parse(readFileSync(join(__dirname, 'db-seed.json'), 'utf-8'));
const db = await JSONFilePreset(join(__dirname, 'db.json'), defaultData);

// Seed on first run
if (!db.data.books || db.data.books.length === 0) {
  db.data = defaultData;
  await db.write();
}

const app = express();
app.use(cors());
app.use(express.json());

// --- API: Books ---
app.get('/api/books', async (req, res) => {
  await db.read();
  let books = [...db.data.books];

  // Search
  const q = req.query.q?.toLowerCase();
  if (q) {
    books = books.filter(b =>
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.description.toLowerCase().includes(q)
    );
  }

  // Genre filter
  if (req.query.genre) {
    const genres = req.query.genre.split(',');
    books = books.filter(b => genres.includes(b.genre));
  }

  // Format filter
  if (req.query.format) {
    const fmt = req.query.format;
    if (fmt === 'physical') books = books.filter(b => b.formats.includes('physical'));
    else if (fmt === 'ebook') books = books.filter(b => b.formats.includes('ebook'));
  }

  // Price range
  if (req.query.minPrice) books = books.filter(b => b.physicalPrice >= parseFloat(req.query.minPrice));
  if (req.query.maxPrice) books = books.filter(b => b.physicalPrice <= parseFloat(req.query.maxPrice));

  // Rating
  if (req.query.minRating) books = books.filter(b => b.rating >= parseFloat(req.query.minRating));

  // Tags
  if (req.query.tags) {
    const tags = req.query.tags.split(',');
    books = books.filter(b => tags.some(t => b.tags.includes(t)));
  }

  // Sort
  const sort = req.query.sort || 'title-asc';
  switch (sort) {
    case 'price-asc': books.sort((a, b) => a.physicalPrice - b.physicalPrice); break;
    case 'price-desc': books.sort((a, b) => b.physicalPrice - a.physicalPrice); break;
    case 'rating': books.sort((a, b) => b.rating - a.rating); break;
    case 'title-asc': books.sort((a, b) => a.title.localeCompare(b.title)); break;
    case 'title-desc': books.sort((a, b) => b.title.localeCompare(a.title)); break;
    case 'newest': books.sort((a, b) => b.year - a.year); break;
    case 'bestseller': books.sort((a, b) => (b.tags.includes('bestseller') ? 1 : 0) - (a.tags.includes('bestseller') ? 1 : 0)); break;
  }

  res.json({ books, total: books.length });
});

app.get('/api/books/:id', async (req, res) => {
  await db.read();
  const book = db.data.books.find(b => b.id === req.params.id);
  if (!book) return res.status(404).json({ error: 'Book not found' });

  // Get recommendations (same genre, different book)
  const recs = db.data.books
    .filter(b => b.genre === book.genre && b.id !== book.id)
    .slice(0, 4);

  res.json({ book, recommendations: recs });
});

// --- API: Cart ---
app.get('/api/cart', async (req, res) => {
  await db.read();
  const cart = db.data.cart || [];
  // Enrich cart with book data
  const enriched = cart.map(item => {
    const book = db.data.books.find(b => b.id === item.bookId);
    return { ...item, book };
  }).filter(item => item.book);
  res.json({ items: enriched });
});

app.post('/api/cart', async (req, res) => {
  const { bookId, format, quantity = 1 } = req.body;
  if (!bookId || !format) return res.status(400).json({ error: 'bookId and format required' });

  await db.read();
  if (!db.data.cart) db.data.cart = [];

  const existing = db.data.cart.find(i => i.bookId === bookId && i.format === format);
  if (existing) {
    existing.quantity += quantity;
  } else {
    db.data.cart.push({ bookId, format, quantity });
  }
  await db.write();

  res.json({ success: true, cart: db.data.cart });
});

app.put('/api/cart/:bookId', async (req, res) => {
  const { format, quantity } = req.body;
  await db.read();
  if (!db.data.cart) db.data.cart = [];

  const item = db.data.cart.find(i => i.bookId === req.params.bookId && i.format === format);
  if (!item) return res.status(404).json({ error: 'Item not in cart' });

  if (quantity <= 0) {
    db.data.cart = db.data.cart.filter(i => !(i.bookId === req.params.bookId && i.format === format));
  } else {
    item.quantity = quantity;
  }
  await db.write();
  res.json({ success: true, cart: db.data.cart });
});

app.delete('/api/cart/:bookId/:format', async (req, res) => {
  await db.read();
  if (!db.data.cart) db.data.cart = [];
  db.data.cart = db.data.cart.filter(i => !(i.bookId === req.params.bookId && i.format === req.params.format));
  await db.write();
  res.json({ success: true, cart: db.data.cart });
});

app.delete('/api/cart', async (req, res) => {
  await db.read();
  db.data.cart = [];
  await db.write();
  res.json({ success: true });
});

// --- API: Checkout ---
app.post('/api/checkout', async (req, res) => {
  const { shippingInfo } = req.body;
  await db.read();

  const cart = db.data.cart || [];
  if (cart.length === 0) return res.status(400).json({ error: 'Cart is empty' });

  if (!db.data.purchases) db.data.purchases = [];

  const purchase = {
    id: 'order-' + Date.now(),
    date: new Date().toISOString(),
    items: cart.map(item => {
      const book = db.data.books.find(b => b.id === item.bookId);
      const price = item.format === 'ebook' ? book.ebookPrice : book.physicalPrice;
      return { ...item, price, title: book.title };
    }),
    shippingInfo: shippingInfo || null,
    status: 'confirmed'
  };

  db.data.purchases.push(purchase);
  db.data.cart = [];
  await db.write();

  res.json({ success: true, order: purchase });
});

// --- API: Library (purchased items) ---
app.get('/api/library', async (req, res) => {
  await db.read();
  const purchases = db.data.purchases || [];
  const libraryItems = [];

  purchases.forEach(order => {
    order.items.forEach(item => {
      const book = db.data.books.find(b => b.id === item.bookId);
      if (book) {
        libraryItems.push({
          bookId: item.bookId,
          format: item.format,
          purchaseDate: order.date,
          orderId: order.id,
          book
        });
      }
    });
  });

  res.json({ items: libraryItems });
});

// --- API: Ebook Download ---
app.get('/api/ebooks/:id/download', async (req, res) => {
  await db.read();
  const book = db.data.books.find(b => b.id === req.params.id);
  if (!book) return res.status(404).json({ error: 'Book not found' });

  // Check if purchased
  const purchases = db.data.purchases || [];
  const purchased = purchases.some(order =>
    order.items.some(item => item.bookId === req.params.id && item.format === 'ebook')
  );
  if (!purchased) return res.status(403).json({ error: 'Book not purchased' });

  const filePath = join(EBOOKS_DIR, book.ebookFile || `${book.id}.pdf`);
  if (!existsSync(filePath)) {
    return res.status(404).json({ error: 'Ebook file not found' });
  }

  res.download(filePath, `${book.title}.pdf`);
});

// --- API: Ebook Read (serve PDF for in-browser reading) ---
app.get('/api/ebooks/:id/read', async (req, res) => {
  await db.read();
  const book = db.data.books.find(b => b.id === req.params.id);
  if (!book) return res.status(404).json({ error: 'Book not found' });

  const purchases = db.data.purchases || [];
  const purchased = purchases.some(order =>
    order.items.some(item => item.bookId === req.params.id && item.format === 'ebook')
  );
  if (!purchased) return res.status(403).json({ error: 'Book not purchased' });

  const filePath = join(EBOOKS_DIR, book.ebookFile || `${book.id}.pdf`);
  if (!existsSync(filePath)) {
    return res.status(404).json({ error: 'Ebook file not found' });
  }

  res.setHeader('Content-Type', 'application/pdf');
  res.sendFile(filePath);
});

// --- Static ebooks (for PDF.js) ---
app.use('/ebooks', express.static(EBOOKS_DIR));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`📚 PagesForward API running on http://localhost:${PORT}`);
});
