(function () {
  'use strict';

  const STORAGE_KEY = 'pf_purchases';
  const LEGACY_STORAGE_KEY = 'pf_orders';
  const MAX_PURCHASES = 25;
  const MAX_RECEIPT_BYTES = 5 * 1024 * 1024;
  const ALLOWED_RECEIPT_TYPES = new Set([
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/webp'
  ]);

  function cleanText(value, maxLength) {
    return String(value || '').trim().replace(/\s+/g, ' ').slice(0, maxLength);
  }

  function loadRaw(key) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || '[]');
      return Array.isArray(value) ? value : [];
    } catch (error) {
      console.error('[PF Purchases] Could not read local history:', error);
      return [];
    }
  }

  function normalize(purchase) {
    const customer = purchase.customer || purchase.user_details || {};
    return {
      ...purchase,
      items: Array.isArray(purchase.items) ? purchase.items : [],
      customer: {
        phone: cleanText(customer.phone || customer.contact, 40),
        address: cleanText(customer.address || purchase.delivery_address, 300)
      },
      status: purchase.status || 'paid_pending_confirmation',
      receipt: purchase.receipt || {
        name: purchase.receipt_name || '',
        path: purchase.receipt_path || '',
        type: purchase.receipt_type || '',
        size: purchase.receipt_size || null
      },
      syncStatus: purchase.syncStatus || 'local'
    };
  }

  function load() {
    return [...loadRaw(STORAGE_KEY), ...loadRaw(LEGACY_STORAGE_KEY)]
      .map(normalize)
      .filter((purchase, index, all) =>
        all.findIndex(item => item.id === purchase.id) === index
      )
      .slice(0, MAX_PURCHASES);
  }

  function write(purchases) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(purchases.slice(0, MAX_PURCHASES).map(normalize))
    );
  }

  function update(id, changes) {
    const purchases = load();
    const index = purchases.findIndex(purchase => purchase.id === id);
    if (index === -1) return null;
    purchases[index] = normalize({ ...purchases[index], ...changes });
    write(purchases);
    return purchases[index];
  }

  function validateReceipt(file) {
    if (!file) return 'Upload the transfer receipt.';
    if (file.size > MAX_RECEIPT_BYTES) return 'Receipt must be 5 MB or smaller.';
    if (!ALLOWED_RECEIPT_TYPES.has(file.type)) {
      return 'Receipt must be a PDF, JPG, PNG, or WebP file.';
    }
    return '';
  }

  function validate(draft) {
    const customer = draft.customer || {};
    const errors = {};
    const phone = cleanText(customer.phone, 40);
    const address = cleanText(customer.address, 300);
    const items = Array.isArray(draft.items) ? draft.items : [];
    const receiptFile = draft.receiptFile || null;
    const receiptError = validateReceipt(receiptFile);

    if (phone.length < 7) errors.phone = 'Enter a phone number we can use to contact you.';
    if (address.length < 8) errors.address = 'Enter the delivery address.';
    if (receiptError) errors.receipt = receiptError;
    if (!items.length) errors.items = 'Add at least one available book to cart.';

    return {
      valid: Object.keys(errors).length === 0,
      errors,
      value: {
        customer: { phone, address },
        receiptFile,
        items: items.slice(0, 20).map(item => ({
          id: String(item.id),
          title: cleanText(item.title, 180),
          author: cleanText(item.author, 120),
          price: item.price !== null && item.price !== '' && Number.isFinite(Number(item.price))
            ? Number(item.price)
            : null
        }))
      }
    };
  }

  function createId() {
    const date = new Date();
    const stamp = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, '0'),
      String(date.getDate()).padStart(2, '0')
    ].join('');
    const bytes = new Uint8Array(3);
    if (window.crypto && window.crypto.getRandomValues) {
      window.crypto.getRandomValues(bytes);
    } else {
      bytes.forEach((_, index) => { bytes[index] = Math.floor(Math.random() * 256); });
    }
    const suffix = Array.from(bytes, value => value.toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase();
    return `PF-${stamp}-${suffix}`;
  }

  function create(draft) {
    const result = validate(draft);
    if (!result.valid) {
      const error = new Error('Purchase details are incomplete.');
      error.validationErrors = result.errors;
      throw error;
    }

    const receipt = result.value.receiptFile;
    const purchase = normalize({
      id: createId(),
      createdAt: new Date().toISOString(),
      items: result.value.items,
      customer: result.value.customer,
      status: 'paid_pending_confirmation',
      totalAmount: null,
      receipt: {
        name: cleanText(receipt.name, 180),
        type: receipt.type,
        size: receipt.size,
        path: ''
      },
      syncStatus: 'local'
    });

    write([purchase, ...load().filter(item => item.id !== purchase.id)]);
    return purchase;
  }

  function format(purchase) {
    const items = Array.isArray(purchase.items) ? purchase.items : [];
    const customer = purchase.customer || purchase.user_details || {};
    const itemLines = items
      .map(item => `- ${item.title} by ${item.author}`)
      .join('\n');
    const receiptName = purchase.receipt && purchase.receipt.name
      ? purchase.receipt.name
      : 'Uploaded in storefront';

    return [
      `Pages Forward purchase ${purchase.id}`,
      '',
      `Phone: ${customer.phone || customer.contact || 'Not provided'}`,
      `Address: ${customer.address || purchase.delivery_address || 'Not provided'}`,
      `Receipt: ${receiptName}`,
      '',
      itemLines,
      '',
      'Please confirm this purchase and delivery details.'
    ].join('\n');
  }

  async function copy(purchase) {
    const text = format(purchase);
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      throw new Error('Clipboard access is unavailable.');
    }
    await navigator.clipboard.writeText(text);
    return text;
  }

  function getWhatsAppUrl(purchase) {
    const config = window.PF_CONFIG && window.PF_CONFIG.store ? window.PF_CONFIG.store : {};
    const digits = String(config.whatsappNumber || '').replace(/\D/g, '');
    const text = encodeURIComponent(format(purchase));
    return digits ? `https://wa.me/${digits}?text=${text}` : `https://wa.me/?text=${text}`;
  }

  async function share(purchase) {
    const text = format(purchase);
    if (navigator.share) {
      await navigator.share({
        title: `Pages Forward purchase ${purchase.id}`,
        text
      });
      return 'shared';
    }
    await copy(purchase);
    return 'copied';
  }

  function getReceiptPath(purchase, file) {
    const extension = String(file.name || 'receipt')
      .split('.')
      .pop()
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '') || 'bin';
    return `${purchase.id}/${Date.now()}-receipt.${extension}`;
  }

  async function uploadReceipt(client, purchase, file) {
    const config = window.PF_CONFIG && window.PF_CONFIG.supabase ? window.PF_CONFIG.supabase : {};
    const bucket = config.receiptBucket || 'purchase-receipts';
    const path = getReceiptPath(purchase, file);
    const { error } = await client.storage.from(bucket).upload(path, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type
    });
    if (error) throw error;
    return `${bucket}/${path}`;
  }

  async function sync(purchase, receiptFile) {
    try {
      const client = window.PF && window.PF.supabaseReady
        ? await window.PF.supabaseReady
        : null;
      if (!client) return update(purchase.id, { syncStatus: 'local' }) || purchase;

      let receiptPath = purchase.receipt && purchase.receipt.path ? purchase.receipt.path : '';
      if (receiptFile && !receiptPath) {
        receiptPath = await uploadReceipt(client, purchase, receiptFile);
        purchase = update(purchase.id, {
          receipt: { ...purchase.receipt, path: receiptPath }
        }) || purchase;
      }

      const { error } = await client.from('orders').insert([{
        client_request_id: purchase.id,
        items: purchase.items,
        total_amount: null,
        status: 'paid_pending_confirmation',
        receipt_sent: true,
        receipt_path: receiptPath || null,
        receipt_name: purchase.receipt.name || null,
        receipt_type: purchase.receipt.type || null,
        receipt_size: purchase.receipt.size || null,
        user_details: {
          phone: purchase.customer.phone,
          address: purchase.customer.address
        },
        fulfillment_method: 'delivery',
        delivery_address: purchase.customer.address,
        contact_phone: purchase.customer.phone,
        source: 'web'
      }]);

      if (error) throw error;
      return update(purchase.id, { syncStatus: 'synced' }) || purchase;
    } catch (error) {
      console.error('[PF Purchases] Remote sync failed:', error);
      return update(purchase.id, {
        syncStatus: 'error',
        syncError: cleanText(error && error.message, 160)
      }) || purchase;
    }
  }

  function remove(id) {
    const remaining = load().filter(purchase => purchase.id !== id);
    write(remaining);
    return remaining;
  }

  window.PF = window.PF || {};
  window.PF.Purchases = {
    copy,
    create,
    format,
    getWhatsAppUrl,
    load,
    remove,
    share,
    sync,
    update,
    validate
  };
})();
