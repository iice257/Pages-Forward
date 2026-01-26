/* ═══════════════════════════════════════════════════════════════
   PAGES FORWARD — Filter System
   Nested filter component with Sort/Filter toggle
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const FilterSystem = {
    // Filter state
    state: {
      activeFilters: {
        category: [],      // Can select up to 2
        length: null,      // Single select
        popularity: null,  // Bucket: renowned, moderate, niche
        availability: false // Toggle
      },
      sortMode: false,     // false = filter (remove), true = sort (reorder)
      expanded: false,
      activeLevel: 1       // 1 = main menu, 2 = sub-menu
    },

    // Configuration
    config: {
      categories: [
        "Romance", "Sci-Fi", "Fantasy", "Mystery", "Thriller", "Horror",
        "Historical", "Literary Fiction", "Business", "Self-Help",
        "Biography", "Science", "History", "Philosophy", "Health",
        "Mental Health", "Religion / Spirituality"
      ],
      lengths: ["Short", "Medium", "Long"],
      popularity: ["Renowned", "Moderate", "Niche"],
      maxCategories: 2
    },

    // Initialize the filter UI
    init(containerSelector) {
      this.container = document.querySelector(containerSelector);
      if (!this.container) {
        console.error('[PF Filters] Container not found:', containerSelector);
        return;
      }
      this.render();
      this.bindEvents();
    },

    // Render the filter rail
    render() {
      this.container.innerHTML = `
        <div class="filter-rail" id="filterRail">
          <div class="filter-pill-trigger" id="filterPillTrigger">
            <div class="filter-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"/>
              </svg>
            </div>
            <span class="filter-rail-text" id="filterRailText">Filter</span>
          </div>
          <div class="filter-menu" id="filterMenu">
            <div class="filter-level filter-l1" id="filterL1"></div>
            <div class="filter-level filter-l2" id="filterL2"></div>
          </div>
        </div>
      `;

      this.rail = this.container.querySelector('#filterRail');
      this.trigger = this.container.querySelector('#filterPillTrigger');
      this.railText = this.container.querySelector('#filterRailText');
      this.menu = this.container.querySelector('#filterMenu');
      this.l1 = this.container.querySelector('#filterL1');
      this.l2 = this.container.querySelector('#filterL2');

      this.renderL1();
    },

    // Render Level 1 menu (main filter options)
    renderL1() {
      this.l1.innerHTML = `
        <div class="filter-toggle-group">
          <button class="filter-toggle-btn ${!this.state.sortMode ? 'active' : ''}" data-mode="filter">FILTER</button>
          <button class="filter-toggle-btn ${this.state.sortMode ? 'active' : ''}" data-mode="sort">SORT</button>
        </div>
        <button class="filter-option-btn" data-filter="category">Category</button>
        <button class="filter-option-btn" data-filter="length">Length</button>
        <button class="filter-option-btn" data-filter="popularity">Popularity</button>
        <button class="filter-option-btn availability-btn ${this.state.activeFilters.availability ? 'active' : ''}" data-filter="availability">
          Available Books
        </button>
        <button class="filter-clear-btn" id="filterClearBtn">Clear</button>
      `;
    },

    // Render Level 2 menu (sub-options)
    renderL2(filterType) {
      let options = [];
      let currentValue = null;

      switch (filterType) {
        case 'category':
          options = this.config.categories;
          currentValue = this.state.activeFilters.category;
          break;
        case 'length':
          options = this.config.lengths;
          currentValue = this.state.activeFilters.length;
          break;
        case 'popularity':
          options = this.config.popularity;
          currentValue = this.state.activeFilters.popularity;
          break;
      }

      this.l2.innerHTML = `
        <button class="filter-back-btn" id="filterBackBtn">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15,18 9,12 15,6"/>
          </svg>
        </button>
        <div class="filter-options-scroll" id="filterOptionsScroll">
          ${options.map(opt => {
        const isActive = Array.isArray(currentValue)
          ? currentValue.includes(opt)
          : currentValue === opt;
        return `<button class="filter-option-btn ${isActive ? 'active' : ''}" data-option="${opt}">${opt}</button>`;
      }).join('')}
        </div>
      `;

      // Add scroll arrow if needed
      const scroll = this.l2.querySelector('#filterOptionsScroll');
      if (options.length > 5) {
        const arrow = document.createElement('button');
        arrow.className = 'filter-scroll-arrow';
        arrow.innerHTML = '→';
        arrow.onclick = () => scroll.scrollBy({ left: 100, behavior: 'smooth' });
        this.l2.appendChild(arrow);
      }
    },

    // Bind event listeners
    bindEvents() {
      // Main pill trigger (icon + text)
      this.trigger.addEventListener('click', () => {
        // If expanded, collapse. If collapsed, expand.
        this.toggleExpand();
      });

      // Delegate clicks within menu
      this.menu.addEventListener('click', (e) => {
        const target = e.target.closest('button');
        if (!target) return;

        // Mode toggle
        if (target.dataset.mode) {
          this.state.sortMode = target.dataset.mode === 'sort';
          this.renderL1();
          this.onFilterChange();
          return;
        }

        // Filter type selection
        if (target.dataset.filter) {
          const filterType = target.dataset.filter;

          // Availability is a direct toggle
          if (filterType === 'availability') {
            this.state.activeFilters.availability = !this.state.activeFilters.availability;
            this.renderL1();
            this.updateRailLabel();
            this.onFilterChange();
            return;
          }

          // Show L2 for other filters
          this.showL2(filterType);
          return;
        }

        // Option selection in L2
        if (target.dataset.option) {
          this.selectOption(target.dataset.option);
          return;
        }

        // Back button
        if (target.id === 'filterBackBtn') {
          this.showL1();
          return;
        }

        // Clear button
        if (target.id === 'filterClearBtn') {
          this.clearFilters();
          return;
        }
      });

      // Click outside to close
      document.addEventListener('click', (e) => {
        if (this.state.expanded && !this.container.contains(e.target)) {
          this.collapse();
        }
      });
    },

    // Toggle expand/collapse
    toggleExpand() {
      if (this.state.expanded) {
        this.collapse();
      } else {
        this.expand();
      }
    },

    expand() {
      this.state.expanded = true;
      this.rail.classList.add('expanded');
      this.rail.classList.remove('has-sel');
      this.showL1();
    },

    collapse() {
      this.state.expanded = false;
      this.rail.classList.remove('expanded');
      this.l1.style.display = 'none';
      this.l2.style.display = 'none';
      this.updateRailLabel();
    },

    // Show/hide menu levels
    showL1() {
      this.state.activeLevel = 1;
      this.l1.style.display = 'flex';
      this.l2.style.display = 'none';
      this.currentFilterType = null;
    },

    showL2(filterType) {
      this.state.activeLevel = 2;
      this.currentFilterType = filterType;
      this.renderL2(filterType);
      this.l1.style.display = 'none';
      this.l2.style.display = 'flex';
    },

    // Select an option
    selectOption(option) {
      const filterType = this.currentFilterType;

      if (filterType === 'category') {
        const cats = this.state.activeFilters.category;
        const idx = cats.indexOf(option);

        if (idx > -1) {
          // Deselect
          cats.splice(idx, 1);
        } else if (cats.length < this.config.maxCategories) {
          // Select (max 2)
          cats.push(option);
        } else {
          // FIFO - remove oldest, add new
          cats.shift();
          cats.push(option);
        }
      } else if (filterType === 'length') {
        this.state.activeFilters.length =
          this.state.activeFilters.length === option ? null : option;
      } else if (filterType === 'popularity') {
        this.state.activeFilters.popularity =
          this.state.activeFilters.popularity === option ? null : option;
      }

      this.renderL2(filterType);
      this.updateRailLabel();
      this.onFilterChange();
    },

    // Clear all filters
    clearFilters() {
      this.state.activeFilters = {
        category: [],
        length: null,
        popularity: null,
        availability: false
      };
      this.state.sortMode = false;
      this.renderL1();
      this.collapse();
      this.onFilterChange();
    },

    // Update the rail label when collapsed
    updateRailLabel() {
      if (this.hasActiveFilters()) {
        const labelText = this.getActiveLabel();
        // Inner HTML to style the prefix differently
        this.railText.innerHTML = `<span class="filter-prefix">FILTER</span><span class="filter-values">${labelText}</span>`;
        this.rail.classList.add('has-sel');
      } else {
        this.railText.innerHTML = 'Filter';
        this.rail.classList.remove('has-sel');
      }
    },

    // Get active filter label text
    getActiveLabel() {
      const parts = [];
      const f = this.state.activeFilters;

      // Simplification: We might want just the values or "Category: Value"
      // Based on screenshot: "POPULARITY: RENOWNED"
      if (f.category.length) parts.push(`CATEGORY: ${f.category.join(', ').toUpperCase()}`);
      if (f.length) parts.push(`LENGTH: ${f.length.toUpperCase()}`);
      if (f.popularity) parts.push(`POPULARITY: ${f.popularity.toUpperCase()}`);
      if (f.availability) parts.push('AVAILABLE BOOKS');

      return parts.join(' • ');
    },

    // Check if any filters are active
    hasActiveFilters() {
      const f = this.state.activeFilters;
      return f.category.length > 0 || f.length || f.popularity || f.availability;
    },

    // ═══════════════════════════════════════════════════════════
    // FILTER / SORT LOGIC
    // ═══════════════════════════════════════════════════════════

    /**
     * Apply filters to books array
     * @param {Array} books - Array of book objects
     * @returns {Array} Filtered/sorted books
     */
    apply(books) {
      if (!this.hasActiveFilters()) {
        return books;
      }

      const f = this.state.activeFilters;

      // Calculate match score for each book
      const scored = books.map(book => {
        let score = 0;
        let matches = true;

        // Category filter
        if (f.category.length > 0) {
          const bookCat = book.tags?.category;
          const bookType = book.tags?.type;
          const catMatch = f.category.some(c => c === bookCat || c === bookType);

          if (catMatch) {
            score += 2;
          } else if (!this.state.sortMode) {
            matches = false;
          }
        }

        // Length filter
        if (f.length) {
          if (book.length === f.length) {
            score += 1;
          } else if (!this.state.sortMode) {
            matches = false;
          }
        }

        // Popularity filter
        if (f.popularity) {
          const avgPop = (book.popularity?.author + book.popularity?.book) / 2;
          let bucket = 'Niche';
          if (avgPop >= 0.8) bucket = 'Renowned';
          else if (avgPop >= 0.5) bucket = 'Moderate';

          if (bucket === f.popularity) {
            score += 1;
          } else if (!this.state.sortMode) {
            matches = false;
          }
        }

        // Availability filter
        if (f.availability) {
          if (book.status === 'available') {
            score += 1;
          } else if (!this.state.sortMode) {
            matches = false;
          }
        }

        return { book, score, matches };
      });

      // Filter or sort based on mode
      if (this.state.sortMode) {
        // Sort mode - prioritize matches
        return scored
          .sort((a, b) => b.score - a.score)
          .map(item => item.book);
      } else {
        // Filter mode - remove non-matches
        return scored
          .filter(item => item.matches)
          .map(item => item.book);
      }
    },

    // Callback for filter changes
    onFilterChange() {
      if (typeof this.onChange === 'function') {
        this.onChange(this.state);
      }
    },

    // Set change callback
    setOnChange(callback) {
      this.onChange = callback;
    }
  };

  // Export
  window.PF = window.PF || {};
  window.PF.Filters = FilterSystem;

})();
