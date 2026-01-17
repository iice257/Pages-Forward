/* ═══════════════════════════════════════════════════════════════
   PAGES FORWARD — Search System
   Matches title, author, description, tags
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const SearchSystem = {
    query: '',
    debounceTimer: null,

    // Initialize search
    init(inputSelector) {
      this.input = document.querySelector(inputSelector);
      if (!this.input) {
        console.error('[PF Search] Input not found:', inputSelector);
        return;
      }
      this.bindEvents();
    },

    // Bind input events
    bindEvents() {
      this.input.addEventListener('input', (e) => {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => {
          this.query = e.target.value.trim().toLowerCase();
          this.onSearchChange();
        }, 150);
      });

      this.input.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.clear();
        }
      });
    },

    // Clear search
    clear() {
      this.query = '';
      this.input.value = '';
      this.onSearchChange();
    },

    /**
     * Search books
     * @param {Array} books - Array of book objects
     * @returns {Array} Matching books with scores
     */
    search(books) {
      if (!this.query || this.query.length < 2) {
        return books;
      }

      const query = this.query;
      const queryWords = query.split(/\s+/);

      // Normalize query for special cases
      const normalizedQuery = query
        .replace('nonfiction', 'non-fiction')
        .replace('non fiction', 'non-fiction')
        .replace('scifi', 'sci-fi')
        .replace('sci fi', 'sci-fi');

      const results = books.map(book => {
        let score = 0;

        // Title match (highest priority)
        const title = book.title?.toLowerCase() || '';
        if (title.includes(query)) {
          score += 10;
          if (title.startsWith(query)) score += 5;
        }

        // Author match
        const author = book.author?.toLowerCase() || '';
        if (author.includes(query)) {
          score += 8;
        }

        // Tag matches
        const type = book.tags?.type?.toLowerCase() || '';
        const category = book.tags?.category?.toLowerCase() || '';
        const niche = book.tags?.niche?.toLowerCase() || '';

        // Exact type match (Fiction / Non-fiction)
        if (normalizedQuery === type ||
          (normalizedQuery === 'fiction' && type === 'fiction') ||
          (normalizedQuery === 'non-fiction' && type === 'non-fiction')) {
          score += 6;
        }

        // Category match
        if (category.includes(query)) {
          score += 5;
        }

        // Niche match
        if (niche.includes(query)) {
          score += 4;
        }

        // Length match
        const length = book.length?.toLowerCase() || '';
        if (length === query ||
          (query === 'short' && length === 'short') ||
          (query === 'medium' && length === 'medium') ||
          (query === 'long' && length === 'long')) {
          score += 3;
        }

        // Description match (lower priority)
        const description = book.description?.toLowerCase() || '';
        if (description.includes(query)) {
          score += 2;
        }

        // Subtitle match
        const subtitle = book.subtitle?.toLowerCase() || '';
        if (subtitle.includes(query)) {
          score += 2;
        }

        // Multi-word matching
        if (queryWords.length > 1) {
          const fullText = `${title} ${author} ${category} ${niche} ${description}`;
          const allMatch = queryWords.every(word => fullText.includes(word));
          if (allMatch) score += 3;
        }

        return { book, score };
      });

      // Filter and sort by score
      return results
        .filter(r => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(r => r.book);
    },

    // Callback for search changes
    onSearchChange() {
      if (typeof this.onChange === 'function') {
        this.onChange(this.query);
      }
    },

    // Set change callback
    setOnChange(callback) {
      this.onChange = callback;
    },

    // Get current query
    getQuery() {
      return this.query;
    },

    // Check if search is active
    isActive() {
      return this.query.length >= 2;
    }
  };

  // Export
  window.PF = window.PF || {};
  window.PF.Search = SearchSystem;

})();
