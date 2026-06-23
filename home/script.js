/**
 * BONZER GYM - HOMEPAGE SPECIFIC JS
 * Handles gallery multi-category filtering and reviews auto-carousel.
 */

document.addEventListener('DOMContentLoaded', () => {
  initGalleryFilter();
  initReviewsCarousel();
});

/**
 * Handles group session gallery filtering by category tabs
 * Supports items with multiple space-separated categories (e.g. data-category="gym facility")
 */
function initGalleryFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterButtons.length === 0 || galleryItems.length === 0) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category') || '';
        const matches = filterValue === 'all' || itemCategory.split(' ').includes(filterValue);

        if (matches) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 30);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.92)';
          setTimeout(() => { item.style.display = 'none'; }, 280);
        }
      });
    });
  });
}

/**
 * Reviews auto-scrolling carousel
 */
function initReviewsCarousel() {
  const track = document.getElementById('reviewsTrack');
  const prevBtn = document.getElementById('reviewsPrev');
  const nextBtn = document.getElementById('reviewsNext');

  if (!track) return;

  let autoScrollInterval;
  const scrollAmount = () => {
    const card = track.querySelector('.review-card');
    if (!card) return 320;
    return card.offsetWidth + 24; // card width + gap
  };

  function scrollNext() {
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (track.scrollLeft >= maxScroll - 10) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
    }
  }

  function scrollPrev() {
    if (track.scrollLeft <= 10) {
      track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    }
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { clearInterval(autoScrollInterval); scrollNext(); startAuto(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { clearInterval(autoScrollInterval); scrollPrev(); startAuto(); });

  function startAuto() {
    autoScrollInterval = setInterval(scrollNext, 4000);
  }

  startAuto();

  // Pause on hover
  track.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
  track.addEventListener('mouseleave', startAuto);
}
