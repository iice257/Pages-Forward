// PagesForward — Helpers & Utilities

export function formatPrice(price) {
  return '$' + price.toFixed(2);
}

export function debounce(fn, ms = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

export function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

// Returns the best cover image URL for a book
// Uses real cover URL if available, falls back to generated SVG
export function getBookCover(book) {
  if (book.coverUrl) return book.coverUrl;
  return generateCoverSVG(book);
}

export function generateCoverSVG(book) {
  const bg = book.coverColor || '#1a1a2e';
  const accent = book.coverAccent || '#d4a574';

  return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300" width="200" height="300">
      <defs>
        <linearGradient id="bg-${book.id}" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stop-color="${bg}"/>
          <stop offset="100%" stop-color="${adjustColor(bg, -20)}"/>
        </linearGradient>
        <linearGradient id="ac-${book.id}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${accent}"/>
          <stop offset="100%" stop-color="${adjustColor(accent, -30)}"/>
        </linearGradient>
      </defs>
      <rect width="200" height="300" rx="4" fill="url(#bg-${book.id})"/>
      <rect x="12" y="12" width="176" height="276" rx="2" fill="none" stroke="${accent}" stroke-opacity="0.15" stroke-width="0.5"/>
      <rect x="16" y="50" width="60" height="3" rx="1.5" fill="url(#ac-${book.id})" opacity="0.8"/>
      <text x="100" y="115" text-anchor="middle" fill="${isLight(bg) ? '#1a1a1a' : '#f0ede6'}" font-family="Georgia,serif" font-size="16" font-weight="bold">
        ${wrapText(book.title, 14).map((line, i) => `<tspan x="100" dy="${i === 0 ? 0 : 20}">${escapeXml(line)}</tspan>`).join('')}
      </text>
      <line x1="70" y1="${135 + wrapText(book.title, 14).length * 10}" x2="130" y2="${135 + wrapText(book.title, 14).length * 10}" stroke="${accent}" stroke-width="1" opacity="0.4"/>
      <text x="100" y="${165 + wrapText(book.title, 14).length * 10}" text-anchor="middle" fill="${isLight(bg) ? '#555' : '#a8a5b8'}" font-family="sans-serif" font-size="11">
        ${escapeXml(book.author)}
      </text>
      <circle cx="100" cy="255" r="8" fill="none" stroke="${accent}" stroke-width="0.8" opacity="0.3"/>
      <circle cx="100" cy="255" r="3" fill="${accent}" opacity="0.4"/>
    </svg>
  `)}`;
}

function adjustColor(hex, amount) {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const num = parseInt(hex, 16);
  let r = Math.min(255, Math.max(0, (num >> 16) + amount));
  let g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
  let b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
}

function isLight(hex) {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 150;
}

function wrapText(text, maxChars) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const word of words) {
    if ((line + ' ' + word).trim().length > maxChars) {
      if (line) lines.push(line);
      line = word;
    } else {
      line = (line + ' ' + word).trim();
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 3); // Max 3 lines
}

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Simple event emitter for state changes
export class EventBus {
  constructor() { this.listeners = {}; }
  on(event, fn) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(fn);
    return () => this.off(event, fn);
  }
  off(event, fn) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter(f => f !== fn);
  }
  emit(event, data) {
    (this.listeners[event] || []).forEach(fn => fn(data));
  }
}

export const bus = new EventBus();
