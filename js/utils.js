
// Scroll Animation Utility
/**
 * Initializes scroll-triggered animations using IntersectionObserver
 * @param {string} selector - CSS selector for elements to animate (default: '.animated')
 * @param {Object} options - IntersectionObserver options
 * @returns {IntersectionObserver|null} The observer instance
 */
function initScrollAnimation(selector = '.animated', options = {}) {
  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '0px'
  };
  
  const observerOptions = { ...defaultOptions, ...options };
  const elements = document.querySelectorAll(selector);
  
  if (!elements.length) {
    console.warn(`[ScrollAnimation] No elements found matching selector: ${selector}`);
    return null;
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, observerOptions);
  
  elements.forEach(el => observer.observe(el));
  
  return observer;
}

/**
 * Cleans up scroll animation observer
 * @param {IntersectionObserver} observer
 */
function destroyScrollAnimation(observer) {
  if (observer) {
    observer.disconnect();
  }
}


// Nav Observer Utility
/**
 * Observes sections and updates navigation active states
 * @param {string} navSelector - Selector for nav links (default: '.nav-link')
 * @param {string} sectionSelector - Selector for sections to observe
 * @returns {IntersectionObserver|null}
 */
function initNavObserver(navSelector = '.nav-link', sectionSelector = 'section[id]') {
  const navLinks = document.querySelectorAll(navSelector);
  const sections = document.querySelectorAll(sectionSelector);
  
  if (!navLinks.length || !sections.length) {
    console.warn('[NavObserver] Navigation links or sections not found');
    return null;
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        // Update active states
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${id}`) {
            link.classList.add('active', 'text-blue-400');
            link.classList.remove('text-gray-300');
            link.setAttribute('aria-current', 'true');
          } else {
            link.classList.remove('active', 'text-blue-400');
            link.classList.add('text-gray-300');
            link.removeAttribute('aria-current');
          }
        });
      }
    });
  }, {
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
  });
  
  sections.forEach(section => observer.observe(section));
  
  return observer;
}


// Mobile Menu Utility
/**
 * Initializes mobile menu toggle functionality
 * @param {string} toggleSelector - Selector for toggle button (default: '.mobile-menu-toggle')
 * @param {string} menuSelector - Selector for menu element (default: '.mobile-menu')
 */
function initMobileMenu(toggleSelector = '.mobile-menu-toggle', menuSelector = '.mobile-menu') {
  const toggle = document.querySelector(toggleSelector);
  const menu = document.querySelector(menuSelector);
  
  if (!toggle || !menu) {
    console.warn('[MobileMenu] Toggle button or menu not found');
    return;
  }
  
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.contains('hidden');
    
    if (isOpen) {
      menu.classList.remove('hidden');
      toggle.setAttribute('aria-expanded', 'true');
    } else {
      menu.classList.add('hidden');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.add('hidden');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
  
  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.classList.contains('hidden')) {
      menu.classList.add('hidden');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}


// Main Initialization




// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Scroll animations
  initScrollAnimation('.animated');
  
  // Navigation observer
  initNavObserver('.nav-link', 'section[id]');
  
  // Mobile menu (if exists)
  initMobileMenu('.mobile-menu-toggle', '.mobile-menu');
});

