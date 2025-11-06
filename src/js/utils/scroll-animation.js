/**
 * Initializes scroll-triggered animations using IntersectionObserver
 * @param {string} selector - CSS selector for elements to animate (default: '.animated')
 * @param {Object} options - IntersectionObserver options
 * @returns {IntersectionObserver|null} The observer instance
 */
export function initScrollAnimation(selector = '.animated', options = {}) {
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
export function destroyScrollAnimation(observer) {
  if (observer) {
    observer.disconnect();
  }
}
