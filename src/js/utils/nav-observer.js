/**
 * Observes sections and updates navigation active states
 * @param {string} navSelector - Selector for nav links (default: '.nav-link')
 * @param {string} sectionSelector - Selector for sections to observe
 * @returns {IntersectionObserver|null}
 */
export function initNavObserver(navSelector = '.nav-link', sectionSelector = 'section[id]') {
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
