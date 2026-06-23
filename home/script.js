/**
 * BONZER GYM - HOMEPAGE SPECIFIC JS
 * Handles page-specific components like the community gallery filtering.
 */

document.addEventListener('DOMContentLoaded', () => {
  initGalleryFilter();
});

/**
 * Handles group session gallery filtering by category tabs
 */
function initGalleryFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterButtons.length === 0 || galleryItems.length === 0) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      const filterValue = button.getAttribute('data-filter');
      
      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (filterValue === 'all' || itemCategory === filterValue) {
          // Show item
          item.style.display = 'block';
          // Force reflow and add animation class if needed
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          // Hide item with transition
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300); // match transition duration
        }
      });
    });
  });
}
