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
          <div class="onboarding-logo">
            <span class="onboarding-title">PAGES<br>FORWARD</span>
            <span class="onboarding-arrow">→</span>
          </div>
          <p class="onboarding-subtext">Once you move on, there's no going back.</p>
          <button class="onboarding-btn" id="onboardingBtn">I UNDERSTAND</button>
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
