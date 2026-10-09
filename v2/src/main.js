// PagesForward — Main Entry Point

import './styles/index.css';
import './styles/components.css';
import './styles/pages.css';
import './styles/reader.css';

import { route, initRouter } from './utils/router.js';
import { initHeader } from './components/Header.js';
import { initCollection } from './components/Collection.js';
import { initReader } from './components/Reader.js';
import { renderShowcase } from './components/Showcase.js';
import { renderCatalog } from './components/Catalog.js';
import { renderBookDetail } from './components/BookDetail.js';
import { renderCheckout } from './components/Checkout.js';
import { renderLibrary } from './components/Library.js';

// Initialize global components
initHeader();
initCollection();
initReader();

// Routes
route('/', (el) => renderShowcase(el));
route('/catalog', (el) => renderCatalog(el));
route('/book/:id', (el, params) => renderBookDetail(el, params));
route('/checkout', (el) => renderCheckout(el));
route('/library', (el) => renderLibrary(el));

// Start router
initRouter();
