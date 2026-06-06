(function () {
  'use strict';

  const STORAGE_KEY = 'pf_orders';
  const MAX_REQUESTS = 25;
  const ALLOWED_FULFILLMENT = new Set(['pickup', 'delivery']);

  function cleanText(value, maxLength) {
    return String(value || '').trim().replace(/\s+/g, ' ').slice(0, maxLength);
  }

  function load() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return Array.isArray(value) ? value : [];
    } catch (error) {
      console.error('[PF Requests] Could not read request history:', error);
      return [];
    }
  }

  function write(requests) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests.slice(0, MAX_REQUESTS)));
  }

  function update(id, changes) {
    const requests = load();
    const index = requests.findIndex(request => request.id === id);
    if (index === -1) return null;
    requests[index] = { ...requests[index], ...changes };
    write(requests);
    return requests[index];
  }

  function validate(draft) {
    const customer = draft.customer || {};
    const errors = {};
    const name = cleanText(customer.name, 80);
    const contact = cleanText(customer.contact, 120);
    const fulfillment = cleanText(draft.fulfillment, 20);
    const notes = cleanText(draft.notes, 500);
    const items = Array.isArray(draft.items) ? draft.items : [];

    if (name.length < 2) errors.name = 'Enter the customer name.';
    if (contact.length < 5) errors.contact = 'Enter a phone number or email address.';
    if (!ALLOWED_FULFILLMENT.has(fulfillment)) {
      errors.fulfillment = 'Choose pickup or delivery.';
    }
    if (!items.length) errors.items = 'Add at least one available book.';

    return {
      valid: Object.keys(errors).length === 0,
      errors,
      value: {
        customer: { name, contact },
        fulfillment,
        notes,
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
      const error = new Error('Request details are incomplete.');
      error.validationErrors = result.errors;
      throw error;
    }

    const request = {
      id: createId(),
      createdAt: new Date().toISOString(),
      items: result.value.items,
      customer: result.value.customer,
      fulfillment: result.value.fulfillment,
      notes: result.value.notes,
      status: 'pending',
      totalAmount: null,
      syncStatus: 'local'
    };

    write([request, ...load().filter(item => item.id !== request.id)]);
    return request;
  }

  function format(request) {
    const items = Array.isArray(request.items) ? request.items : [];
    const customer = request.customer || request.user_details || {};
    const itemLines = items
      .map(item => `- ${item.title} by ${item.author}`)
      .join('\n');
    const fulfillment = request.fulfillment === 'delivery' ? 'Delivery' : 'Pickup';
    const notes = request.notes ? `\nNotes: ${request.notes}` : '';

    return [
      `Pages Forward book request ${request.id}`,
      '',
      `Customer: ${customer.name || 'Not provided'}`,
      `Contact: ${customer.contact || 'Not provided'}`,
      `Fulfillment: ${fulfillment}${notes}`,
      '',
      itemLines,
      '',
      'Please confirm price and availability.'
    ].join('\n');
  }

  async function copy(request) {
    const text = format(request);
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      throw new Error('Clipboard access is unavailable.');
    }
    await navigator.clipboard.writeText(text);
    return text;
  }

  async function share(request) {
    const text = format(request);
    if (navigator.share) {
      await navigator.share({
        title: `Pages Forward request ${request.id}`,
        text
      });
      return 'shared';
    }
    await copy(request);
    return 'copied';
  }

  async function sync(request) {
    try {
      const client = window.PF && window.PF.supabaseReady
        ? await window.PF.supabaseReady
        : null;
      if (!client) return update(request.id, { syncStatus: 'local' }) || request;

      const { error } = await client.from('orders').insert([{
        client_request_id: request.id,
        items: request.items,
        total_amount: null,
        status: 'pending',
        receipt_sent: false,
        user_details: request.customer,
        fulfillment_method: request.fulfillment,
        notes: request.notes || null,
        source: 'web'
      }]);

      if (error) throw error;
      return update(request.id, { syncStatus: 'synced' }) || request;
    } catch (error) {
      console.error('[PF Requests] Remote sync failed:', error);
      return update(request.id, {
        syncStatus: 'error',
        syncError: cleanText(error && error.message, 160)
      }) || request;
    }
  }

  function remove(id) {
    const remaining = load().filter(request => request.id !== id);
    write(remaining);
    return remaining;
  }

  window.PF = window.PF || {};
  window.PF.Requests = {
    copy,
    create,
    format,
    load,
    remove,
    share,
    sync,
    update,
    validate
  };
})();
