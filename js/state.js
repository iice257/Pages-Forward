/* ═══════════════════════════════════════════════════════════════
   PAGES FORWARD — State Management
   Forward-only logic enforced at state level
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const STORAGE_KEY = 'pagesforward_state';
  const DB_NAME = 'PagesForwardDB';
  const DB_VERSION = 1;
  const STORE_NAME = 'state';

  // Default state
  const defaultState = {
    onboardingComplete: false,
    currentIndex: 0,
    collection: [],      // Book IDs that were accepted
    dismissed: [],       // Book IDs that were dismissed (permanently excluded)
    readingStatus: {},   // { bookId: "to-read" | "in-progress" | "complete" }
    darkMode: false,
    lastUpdated: null,
    uuid: null
  };

  // Generate anonymous UUID
  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  // State Manager
  const StateManager = {
    state: { ...defaultState },

    // Initialize state from storage
    async init() {
      try {
        // Try IndexedDB first
        const dbState = await this.loadFromIndexedDB();
        if (dbState) {
          this.state = this.mergeState(dbState);
        } else {
          // Fall back to localStorage
          const lsState = this.loadFromLocalStorage();
          if (lsState) {
            this.state = this.mergeState(lsState);
          }
        }

        // Ensure UUID exists
        if (!this.state.uuid) {
          this.state.uuid = generateUUID();
        }

        // Sync to both stores
        await this.save();

        console.log('[PF State] Initialized:', this.state);
        return this.state;
      } catch (error) {
        console.error('[PF State] Init error:', error);
        return this.state;
      }
    },

    // Merge loaded state with defaults
    mergeState(loaded) {
      return {
        ...defaultState,
        ...loaded,
        collection: loaded.collection || [],
        dismissed: loaded.dismissed || [],
        readingStatus: loaded.readingStatus || {}
      };
    },

    // Save state to both stores
    async save() {
      this.state.lastUpdated = new Date().toISOString();
      this.saveToLocalStorage();
      await this.saveToIndexedDB();
    },

    // localStorage operations
    loadFromLocalStorage() {
      try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : null;
      } catch (error) {
        console.error('[PF State] localStorage load error:', error);
        return null;
      }
    },

    saveToLocalStorage() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      } catch (error) {
        console.error('[PF State] localStorage save error:', error);
      }
    },

    // IndexedDB operations
    openDB() {
      return new Promise((resolve, reject) => {
        if (!window.indexedDB) {
          reject(new Error('IndexedDB not supported'));
          return;
        }

        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);

        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME, { keyPath: 'id' });
          }
        };
      });
    },

    async loadFromIndexedDB() {
      try {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
          const transaction = db.transaction(STORE_NAME, 'readonly');
          const store = transaction.objectStore(STORE_NAME);
          const request = store.get('main');

          request.onsuccess = () => resolve(request.result?.data || null);
          request.onerror = () => reject(request.error);
        });
      } catch (error) {
        console.error('[PF State] IndexedDB load error:', error);
        return null;
      }
    },

    async saveToIndexedDB() {
      try {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
          const transaction = db.transaction(STORE_NAME, 'readwrite');
          const store = transaction.objectStore(STORE_NAME);
          const request = store.put({ id: 'main', data: this.state });

          request.onsuccess = () => resolve();
          request.onerror = () => reject(request.error);
        });
      } catch (error) {
        console.error('[PF State] IndexedDB save error:', error);
      }
    },

    // ═══════════════════════════════════════════════════════════
    // FORWARD-ONLY LOGIC
    // ═══════════════════════════════════════════════════════════

    /**
     * Remove a book from collection (moves to dismissed)
     * @param {number} bookId 
     */
    async removeFromCollection(bookId) {
        const idx = this.state.collection.indexOf(bookId);
        if (idx > -1) {
            this.state.collection.splice(idx, 1);
            if (!this.state.dismissed.includes(bookId)) {
                this.state.dismissed.push(bookId);
            }
            delete this.state.readingStatus[bookId];
            await this.save();
            console.log('[PF State] Removed from collection:', bookId);
            return true;
        }
        return false;
    },

    /**
     * Accept a book - adds to collection, permanently removes from pool
     * @param {number} bookId 
     */
    async acceptBook(bookId) {
      if (this.state.dismissed.includes(bookId)) {
        console.warn('[PF State] Cannot accept dismissed book:', bookId);
        return false;
      }

      if (!this.state.collection.includes(bookId)) {
        this.state.collection.push(bookId);
        this.state.readingStatus[bookId] = 'to-read';
        this.state.currentIndex++;
        await this.save();
        console.log('[PF State] Accepted book:', bookId);
        return true;
      }
      return false;
    },

    /**
     * Dismiss a book - permanently excluded, can never return
     * @param {number} bookId 
     */
    async dismissBook(bookId) {
      if (this.state.collection.includes(bookId)) {
        console.warn('[PF State] Cannot dismiss collected book:', bookId);
        return false;
      }

      if (!this.state.dismissed.includes(bookId)) {
        this.state.dismissed.push(bookId);
        this.state.currentIndex++;
        await this.save();
        console.log('[PF State] Dismissed book:', bookId);
        return true;
      }
      return false;
    },

    /**
     * Get available books (not collected, not dismissed)
     * @param {Array} allBooks - Full book data array
     * @returns {Array} Books that can still be shown
     */
    getAvailableBooks(allBooks) {
      const excluded = new Set([...this.state.collection, ...this.state.dismissed]);
      return allBooks.filter(book => !excluded.has(book.id));
    },

    /**
     * Get collected books
     * @param {Array} allBooks - Full book data array
     * @returns {Array} Books in collection
     */
    getCollectionBooks(allBooks) {
      return allBooks.filter(book => this.state.collection.includes(book.id));
    },

    /**
     * Check if a book is excluded (collected or dismissed)
     * @param {number} bookId 
     * @returns {boolean}
     */
    isExcluded(bookId) {
      return this.state.collection.includes(bookId) || this.state.dismissed.includes(bookId);
    },

    /**
     * Update reading status for a collected book
     * @param {number} bookId 
     * @param {string} status - "to-read" | "in-progress" | "complete"
     */
    async updateReadingStatus(bookId, status) {
      if (this.state.collection.includes(bookId)) {
        this.state.readingStatus[bookId] = status;
        await this.save();
        return true;
      }
      return false;
    },

    // ═══════════════════════════════════════════════════════════
    // ONBOARDING
    // ═══════════════════════════════════════════════════════════

    async completeOnboarding() {
      this.state.onboardingComplete = true;
      await this.save();
    },

    isOnboardingComplete() {
      return this.state.onboardingComplete;
    },

    // ═══════════════════════════════════════════════════════════
    // DARK MODE
    // ═══════════════════════════════════════════════════════════

    async toggleDarkMode() {
      this.state.darkMode = !this.state.darkMode;
      await this.save();
      this.applyDarkMode();
      return this.state.darkMode;
    },

    applyDarkMode() {
      if (this.state.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },

    // ═══════════════════════════════════════════════════════════
    // STATS
    // ═══════════════════════════════════════════════════════════

    getStats(totalBooks) {
      return {
        total: totalBooks,
        collected: this.state.collection.length,
        dismissed: this.state.dismissed.length,
        remaining: totalBooks - this.state.collection.length - this.state.dismissed.length,
        progress: Math.round(((this.state.collection.length + this.state.dismissed.length) / totalBooks) * 100)
      };
    },

    // Reset state (for testing)
    async reset() {
      this.state = { ...defaultState, uuid: this.state.uuid };
      await this.save();
      console.log('[PF State] Reset complete');
    }
  };

  // Export
  window.PF = window.PF || {};
  window.PF.State = StateManager;

})();
