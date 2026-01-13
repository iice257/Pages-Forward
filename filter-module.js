
export const FilterModule = {
  state: {
    sortMode: false,
    activeFilters: {
      category: [],
      length: null,
      popularity: null,
      availability: false
    },
    searchQuery: ''
  },
  config: {
    maxCategories: 2,
    lengthMap: {
      'Short': b => (150 + b.description.length * 2) < 200,
      'Medium': b => { const l = 150 + b.description.length * 2; return l >= 200 && l < 400; },
      'Long': b => (150 + b.description.length * 2) >= 400
    },
    popMap: {
      'Renowned': b => b.popularity && (b.popularity.author >= 0.9 || b.popularity.book >= 0.9),
      'Moderate': b => b.popularity && ((b.popularity.author >= 0.7 && b.popularity.author < 0.9) || (b.popularity.book >= 0.7 && b.popularity.book < 0.9)),
      'Niche': b => b.popularity && (b.popularity.author < 0.7 && b.popularity.book < 0.7)
    }
  },
  toggleSortMode() {
    this.state.sortMode = !this.state.sortMode;
    return this.state.sortMode;
  },
  setFilter(type, value) {
    if (type === 'category') {
      const idx = this.state.activeFilters.category.indexOf(value);
      if (idx > -1) {
        this.state.activeFilters.category.splice(idx, 1);
      } else {
        if (this.state.activeFilters.category.length >= this.config.maxCategories) {
          this.state.activeFilters.category.shift();
        }
        this.state.activeFilters.category.push(value);
      }
    } else if (type === 'availability') {
      this.state.activeFilters.availability = !this.state.activeFilters.availability;
    } else {
      this.state.activeFilters[type] = this.state.activeFilters[type] === value ? null : value;
    }
  },
  setSearch(query) {
    this.state.searchQuery = query.toLowerCase().trim();
  },
  clearFilters() {
    this.state.activeFilters = { category: [], length: null, popularity: null, availability: false };
    this.state.searchQuery = '';
    this.state.sortMode = false;
  },
  process(books) {
    let result = [...books];
    if (this.state.searchQuery) {
      const q = this.state.searchQuery;
      result = result.filter(b =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        (b.tags && (
          b.tags.type.toLowerCase().includes(q) ||
          b.tags.category.toLowerCase().includes(q) ||
          b.tags.niche.toLowerCase().includes(q)
        ))
      );
    }
    const checkCat = (b) => {
      if (!this.state.activeFilters.category.length) return true;
      return this.state.activeFilters.category.every(cat => {
        if (!b.tags) return false;
        if (cat === 'Fiction' || cat === 'Non-fiction') return b.tags.type === cat;
        return b.tags.category === cat;
      });
    };
    const checkLen = (b) => !this.state.activeFilters.length || this.config.lengthMap[this.state.activeFilters.length](b);
    const checkPop = (b) => !this.state.activeFilters.popularity || this.config.popMap[this.state.activeFilters.popularity](b);
    const checkAvail = (b) => !this.state.activeFilters.availability || b.status === 'available';

    if (this.state.sortMode) {
      result.forEach(b => {
        let score = 0;
        if (checkCat(b)) score += 10;
        if (checkLen(b)) score += 5;
        if (checkPop(b)) score += 5;
        if (checkAvail(b)) score += 5;
        b._tempScore = score;
      });
      result.sort((a, b) => {
        if (b._tempScore !== a._tempScore) return b._tempScore - a._tempScore;
        return a.title.localeCompare(b.title);
      });
    } else {
      result = result.filter(b => checkCat(b) && checkLen(b) && checkPop(b) && checkAvail(b));
      result.sort((a, b) => a.title.localeCompare(b.title));
    }
    return result;
  },
  getActiveLabel() {
    const cats = this.state.activeFilters.category;
    if (cats.length) return `Category — ${cats.join(', ')}`;
    if (this.state.activeFilters.length) return `Length — ${this.state.activeFilters.length}`;
    if (this.state.activeFilters.popularity) return `Popularity — ${this.state.activeFilters.popularity}`;
    if (this.state.activeFilters.availability) return `Availability — Available`;
    return 'Filter';
  }
};
