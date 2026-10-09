// PagesForward — Ebook Reader (PDF.js overlay)

import { api } from '../utils/api.js';
import { bus } from '../utils/helpers.js';

let pdfDoc = null;
let currentPage = 1;
let totalPages = 0;
let rendering = false;

export function initReader() {
  // Create reader overlay
  const overlay = document.createElement('div');
  overlay.className = 'reader-overlay';
  overlay.id = 'reader-overlay';
  overlay.innerHTML = `
    <div class="reader-toolbar">
      <span class="reader-toolbar__title" id="reader-title"></span>
      <span class="reader-toolbar__info" id="reader-info"></span>
      <button class="reader-toolbar__close" id="reader-close" aria-label="Close reader">✕</button>
    </div>
    <div class="reader-progress"><div class="reader-progress__bar" id="reader-progress"></div></div>
    <div class="reader-canvas-wrap" id="reader-canvas-wrap">
      <div class="reader-loading" id="reader-loading">
        <div class="reader-loading__spinner"></div>
        <span>Loading book...</span>
      </div>
    </div>
    <div class="reader-nav">
      <button class="reader-nav__btn" id="reader-prev" aria-label="Previous page">‹</button>
      <span class="reader-nav__info" id="reader-page-info">—</span>
      <button class="reader-nav__btn" id="reader-next" aria-label="Next page">›</button>
    </div>
  `;
  document.body.appendChild(overlay);

  // Events
  document.getElementById('reader-close').addEventListener('click', closeReader);
  document.getElementById('reader-prev').addEventListener('click', () => goToPage(currentPage - 1));
  document.getElementById('reader-next').addEventListener('click', () => goToPage(currentPage + 1));

  // Keyboard
  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape') closeReader();
    if (e.key === 'ArrowLeft') goToPage(currentPage - 1);
    if (e.key === 'ArrowRight') goToPage(currentPage + 1);
  });

  // Listen for open events
  bus.on('open-reader', openReader);
}

async function openReader(book) {
  const overlay = document.getElementById('reader-overlay');
  const titleEl = document.getElementById('reader-title');
  const loading = document.getElementById('reader-loading');
  const canvasWrap = document.getElementById('reader-canvas-wrap');

  titleEl.textContent = book.title;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Show loading
  loading.style.display = 'flex';
  canvasWrap.querySelectorAll('canvas').forEach(c => c.remove());

  try {
    // Dynamic import pdf.js
    const pdfjsLib = await import('pdfjs-dist');
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

    const url = api.getEbookReadUrl(book.id);
    pdfDoc = await pdfjsLib.getDocument(url).promise;
    totalPages = pdfDoc.numPages;
    currentPage = 1;

    loading.style.display = 'none';
    await renderPage(currentPage);
  } catch (e) {
    loading.innerHTML = `<span style="color:#ef4444;">Could not load ebook. Make sure the PDF file exists on the server.</span>`;
    console.error('Reader error:', e);
  }
}

function closeReader() {
  document.getElementById('reader-overlay').classList.remove('open');
  document.body.style.overflow = '';
  pdfDoc = null;
}

async function renderPage(num) {
  if (!pdfDoc || rendering) return;
  rendering = true;

  try {
    const page = await pdfDoc.getPage(num);
    const viewport = page.getViewport({ scale: 1.5 });

    const canvasWrap = document.getElementById('reader-canvas-wrap');
    canvasWrap.querySelectorAll('canvas').forEach(c => c.remove());

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    canvasWrap.appendChild(canvas);

    await page.render({ canvasContext: ctx, viewport }).promise;

    // Update UI
    currentPage = num;
    document.getElementById('reader-page-info').textContent = `${num} / ${totalPages}`;
    document.getElementById('reader-info').textContent = `Page ${num} of ${totalPages}`;
    document.getElementById('reader-progress').style.width = `${(num / totalPages) * 100}%`;
    document.getElementById('reader-prev').disabled = num <= 1;
    document.getElementById('reader-next').disabled = num >= totalPages;
  } catch (e) {
    console.error('Render page error:', e);
  }

  rendering = false;
}

async function goToPage(num) {
  if (num < 1 || num > totalPages) return;
  await renderPage(num);
}
