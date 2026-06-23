/**
 * BONZER GYM - MEMBERSHIP PAGE SPECIFIC JS
 * Handles dynamic plan pricing updates for the Basic Plan selector.
 */

document.addEventListener('DOMContentLoaded', () => {
  initBasicPlanSelector();
});

/**
 * Manages active states and pricing updates for Basic Plan selector tabs
 */
function initBasicPlanSelector() {
  const durationBtns = document.querySelectorAll('.duration-btn');
  const priceDisplay = document.getElementById('basicPrice');
  const periodDisplay = document.getElementById('basicPeriod');
  const ctaLink = document.getElementById('basicCta');

  if (durationBtns.length === 0 || !priceDisplay || !ctaLink) return;

  durationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active states
      durationBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const duration = btn.getAttribute('data-duration');
      let price = '2500';
      let period = '/ month';
      let waText = 'Hi BonzerGym, I would like to join the Basic Plan for 1 Month (₹2500). Please let me know the timing and slot availability!';

      if (duration === '3m') {
        price = '7000';
        period = '/ 3 months';
        waText = 'Hi BonzerGym, I would like to join the Basic Plan for 3 Months (₹7000). Please let me know the timing and slot availability!';
      } else if (duration === '1y') {
        price = '24000';
        period = '/ 1 year';
        waText = 'Hi BonzerGym, I would like to join the Basic Plan for 1 Year (₹24000). Please let me know the timing and slot availability!';
      }

      // Update text displays
      priceDisplay.textContent = `₹${price}`;
      if (periodDisplay) {
        periodDisplay.textContent = period;
      }

      // Update WhatsApp link destination
      const encodedMsg = encodeURIComponent(waText);
      ctaLink.setAttribute('href', `https://wa.me/9779856038995?text=${encodedMsg}`);
    });
  });
}
