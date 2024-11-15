import Swup from 'swup';

export function initSwup(onContentReplaced) {
  // Create the main container transition class
  const mainContainer = document.querySelector('#swup');
  if (mainContainer) {
    mainContainer.classList.add('transition-main');
  }

  // Initialize Swup with default options
  const swup = new Swup({
    animationSelector: '[class*="transition-"]',
    elements: ['#swup'],
    cache: true,
    preload: true,
    animationClass: 'is-animating'
  });

  // Handle before content replace (exit animation)
  swup.on('willReplaceContent', () => {
    const container = document.querySelector('.transition-main');
    if (container) {
      // Kill any existing GSAP animations
      gsap.killTweensOf(container);

      // Animate out
      gsap.to(container, {
        duration: 0.4,
        opacity: 0,
        y: -20,
        ease: "power2.in",
        onComplete: () => {
          // Reset position for next animation
          gsap.set(container, { y: 20 });
        }
      });
    }
  });

  // Handle after content replace (enter animation)
  swup.on('contentReplaced', () => {
    // Execute any passed callback
    if (onContentReplaced && typeof onContentReplaced === 'function') {
      onContentReplaced();
    }

    const newContainer = document.querySelector('.transition-main');
    if (newContainer) {
      // Set initial state
      gsap.set(newContainer, { opacity: 0, y: 20 });

      // Animate in
      gsap.to(newContainer, {
        duration: 0.6,
        opacity: 1,
        y: 0,
        ease: "power2.out",
        clearProps: "all" // Clean up after animation
      });
    }

    // Re-initialize audio if needed
    if (window.initializeAudio) {
      window.initializeAudio();
    }
  });

  // Handle animation start
  swup.on('animationOutStart', () => {
    document.body.style.cursor = 'wait';
  });

  // Handle animation end
  swup.on('animationInDone', () => {
    document.body.style.cursor = 'auto';
    window.scrollTo(0, 0);
  });

  // Handle transition errors
  swup.on('transitionError', (error) => {
    console.error('Swup transition error:', error);
    const content = document.querySelector('.transition-main');
    if (content) {
      gsap.set(content, { clearProps: "all" });
    }
  });

  return swup;
}

// Helper function for custom page transitions
export function addCustomPageTransition(swupInstance, pageUrl, customAnimation) {
  if (!swupInstance) return;

  swupInstance.on('contentReplaced', () => {
    if (window.location.pathname === pageUrl && customAnimation) {
      const container = document.querySelector('.transition-main');
      if (container) {
        customAnimation(container);
      }
    }
  });
}
