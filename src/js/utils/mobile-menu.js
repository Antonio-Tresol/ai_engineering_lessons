/**
 * Initializes mobile menu toggle functionality
 * @param {string} toggleSelector - Selector for toggle button (default: '.mobile-menu-toggle')
 * @param {string} menuSelector - Selector for menu element (default: '.mobile-menu')
 */
export function initMobileMenu(toggleSelector = '.mobile-menu-toggle', menuSelector = '.mobile-menu') {
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
