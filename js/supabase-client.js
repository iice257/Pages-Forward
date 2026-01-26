
(function () {
  'use strict';

  // Supabase Configuration
  const SUPABASE_URL = 'https://wzxfyikhamojmsykbyqj.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6eGZ5aWtoYW1vam1zeWtieXFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2NDI4OTcsImV4cCI6MjA4NDIxODg5N30.8h2ltzqQN4Dvx1S-68K2rsK0xX7WvDI840Jz0MuIdYo';

  // Initialize Supabase
  const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // Export globally
  window.PF = window.PF || {};
  window.PF.supabase = supabase;

  console.log('[PF Supabase] Initialized');
})();
