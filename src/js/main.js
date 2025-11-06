import { initScrollAnimation } from './utils/scroll-animation.js';
import { initNavObserver } from './utils/nav-observer.js';
import { initMobileMenu } from './utils/mobile-menu.js';

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Scroll animations
  initScrollAnimation('.animated');
  
  // Navigation observer
  initNavObserver('.nav-link', 'section[id]');
  
  // Mobile menu (if exists)
  initMobileMenu('.mobile-menu-toggle', '.mobile-menu');
});
