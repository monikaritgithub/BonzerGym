/**
 * BONZER GYM - SHARED JAVASCRIPT
 * Handles global functionality like mobile navbar toggling, active page state, and scroll reveal animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initActiveNavLink();
  initScrollReveal();
});

/**
 * Initializes the hamburger menu click event handlers
 */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('show');
    
    // Toggle body scroll when menu is open
    if (navMenu.classList.contains('show')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  // Close mobile menu when clicking outside of it
  document.addEventListener('click', (event) => {
    if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('show');
      document.body.style.overflow = '';
    }
  });

  // Reset menu layout on screen resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('show');
      document.body.style.overflow = '';
    }
  });
}

/**
 * Automatically sets the active state on the navigation link that matches the current URL path.
 */
function initActiveNavLink() {
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPath = window.location.pathname;

  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    
    // Check if current URL path contains/ends with link's href
    if (currentPath.endsWith('/') && linkHref.includes('index.html') && !linkHref.includes('/about/') && !linkHref.includes('/membership/') && !linkHref.includes('/services/') && !linkHref.includes('/contact/')) {
      link.classList.add('active');
    } else if (linkHref !== '#' && currentPath.includes(linkHref.replace('../', ''))) {
      link.classList.add('active');
    } else if (currentPath.includes('index.html') && linkHref === 'index.html') {
      link.classList.add('active');
    }
  });
}

/**
 * Sets up scroll reveal animations using Intersection Observer
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  if (revealElements.length === 0) return;

  const observerOptions = {
    root: null, // viewport
    threshold: 0.1, // trigger when 10% of element is visible
    rootMargin: '0px 0px -50px 0px' // adjust trigger zone slightly above bottom edge
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Stop observing once animation triggers to keep layout stable
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(element => {
    observer.observe(element);
  });
}
