(function () {
  'use strict';

  const config = window.PF_CONFIG && window.PF_CONFIG.supabase
    ? window.PF_CONFIG.supabase
    : {};

  function loadSdk() {
    if (window.supabase && window.supabase.createClient) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-pf-supabase-sdk]');
      if (existing) {
        existing.addEventListener('load', resolve, { once: true });
        existing.addEventListener('error', reject, { once: true });
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
      script.async = true;
      script.dataset.pfSupabaseSdk = 'true';
      script.addEventListener('load', resolve, { once: true });
      script.addEventListener(
        'error',
        () => reject(new Error('Supabase SDK failed to load.')),
        { once: true }
      );
      document.head.appendChild(script);
    });
  }

  async function initialize() {
    if (!config.url || !config.publishableKey) return null;
    await loadSdk();
    const client = window.supabase.createClient(config.url, config.publishableKey);
    window.PF.supabase = client;
    return client;
  }

  window.PF = window.PF || {};
  window.PF.supabase = null;
  window.PF.supabaseReady = initialize().catch(error => {
    console.error('[PF Supabase] Initialization failed:', error);
    return null;
  });
})();
