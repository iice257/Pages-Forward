(function () {
  'use strict';

  window.PF_CONFIG = window.PF_CONFIG || {
    store: {
      bankName: 'Set bank name in js/config.js',
      accountName: 'Pages Forward',
      accountNumber: '0000000000',
      whatsappNumber: '',
      currency: 'NGN'
    },
    supabase: {
      url: '',
      publishableKey: '',
      useRemoteCatalog: false,
      receiptBucket: 'purchase-receipts'
    }
  };
})();
