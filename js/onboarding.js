/* ═══════════════════════════════════════════════════════════════
   PAGES FORWARD — Onboarding
   First-load flow with persistence
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const Onboarding = {
    // Check if onboarding is needed
    async check() {
      await window.PF.State.init();

      if (window.PF.State.isOnboardingComplete()) {
        // Already completed, redirect to forward
        this.redirect();
        return false;
      }

      return true;
    },

    // Show the onboarding screen
    show() {
      const container = document.getElementById('onboardingContainer');
      if (!container) return;

      container.innerHTML = `
        <div class="onboarding-content animate-fade-in">
          <svg width="0" height="0" style="position:absolute">
            <defs>
              <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#DFBD69;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#F9ECA5;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#B88A44;stop-opacity:1" />
              </linearGradient>
            </defs>
          </svg>
          <div class="onboarding-huge">Pages Forward</div>
          <div class="onboarding-sub"><span class="onboarding-gold">Gifting</span> Season</div>
          <svg class="onboarding-icon" viewBox="0 0 24 24" stroke="url(#gold-grad)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="8" width="18" height="4" rx="1" />
            <path d="M12 8v13" />
            <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
            <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
          </svg>
          <p style="font-family:var(--fb);font-size:1rem;color:var(--stone);margin-top:1rem;font-style:italic">Once you move on, there is no going back.</p>
          <button class="onboarding-btn" id="onboardingBtn">I Understand</button>
        </div>
      `;

      // Bind the button
      document.getElementById('onboardingBtn').addEventListener('click', () => {
        this.complete();
      });
    },

    // Complete onboarding and redirect
    async complete() {
      const container = document.getElementById('onboardingContainer');
      const content = container.querySelector('.onboarding-content');

      // Fade out animation
      content.style.opacity = '0';
      content.style.transition = 'opacity 0.5s ease';

      setTimeout(async () => {
        await window.PF.State.completeOnboarding();
        this.redirect();
      }, 500);
    },

    // Redirect to main experience
    redirect() {
      window.location.href = 'forward.html';
    }
  };

  // Export
  window.PF = window.PF || {};
  window.PF.Onboarding = Onboarding;

})();
