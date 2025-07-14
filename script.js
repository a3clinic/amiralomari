// ===== MODERN JAVASCRIPT FOR ENHANCED INTERACTIONS =====

// ===== TYPING ANIMATION =====
class TypingAnimation {
  constructor(element, phrases, options = {}) {
    this.element = element;
    this.phrases = phrases;
    this.options = {
      typeSpeed: 100,
      deleteSpeed: 50,
      pauseTime: 1500,
      cursorChar: '|',
      ...options
    };

    this.phraseIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.isPaused = false;

    this.init();
  }

  init() {
    this.type();
  }

  type() {
    if (this.isPaused) return;

    const currentPhrase = this.phrases[this.phraseIndex];
    const visibleText = currentPhrase.substring(0, this.charIndex);

    this.element.innerHTML = `${visibleText}<span class="cursor">${this.options.cursorChar}</span>`;

    if (!this.isDeleting) {
      if (this.charIndex < currentPhrase.length) {
        this.charIndex++;
        setTimeout(() => this.type(), this.options.typeSpeed);
      } else {
        // Pause before deleting
        setTimeout(() => {
          this.isDeleting = true;
          this.type();
        }, this.options.pauseTime);
      }
    } else {
      if (this.charIndex > 0) {
        this.charIndex--;
        setTimeout(() => this.type(), this.options.deleteSpeed);
      } else {
        this.isDeleting = false;
        this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
        setTimeout(() => this.type(), 300);
      }
    }
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    this.isPaused = false;
    this.type();
  }
}

// ===== TESTIMONIALS CAROUSEL =====
class TestimonialsCarousel {
  constructor(container) {
    this.container = container;
    this.slides = container.querySelectorAll('.testimonial-slide');
    this.dots = container.querySelectorAll('.dot');
    this.leftArrow = container.querySelector('.carousel-nav.left');
    this.rightArrow = container.querySelector('.carousel-nav.right');

    this.currentIndex = 0;
    this.autoSlideInterval = null;
    this.autoSlideDelay = 6000;

    this.init();
  }

  init() {
    this.bindEvents();
    this.startAutoSlide();
    this.showSlide(0);
  }

  bindEvents() {
    // Arrow navigation
    this.leftArrow?.addEventListener('click', () => {
      this.prevSlide();
      this.resetAutoSlide();
    });

    this.rightArrow?.addEventListener('click', () => {
      this.nextSlide();
      this.resetAutoSlide();
    });

    // Dot navigation
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.showSlide(index);
        this.resetAutoSlide();
      });
    });

    // Pause on hover
    this.container.addEventListener('mouseenter', () => this.pauseAutoSlide());
    this.container.addEventListener('mouseleave', () => this.startAutoSlide());

    // Keyboard navigation
    this.container.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.prevSlide();
        this.resetAutoSlide();
      } else if (e.key === 'ArrowRight') {
        this.nextSlide();
        this.resetAutoSlide();
      }
    });
  }

  showSlide(index) {
    // Update slides
    this.slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
      slide.setAttribute('aria-hidden', i !== index);
    });

    // Update dots
    this.dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
      dot.setAttribute('aria-selected', i === index);
    });

    this.currentIndex = index;
  }

  nextSlide() {
    const newIndex = (this.currentIndex + 1) % this.slides.length;
    this.showSlide(newIndex);
  }

  prevSlide() {
    const newIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.showSlide(newIndex);
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoSlideDelay);
  }

  pauseAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  resetAutoSlide() {
    this.pauseAutoSlide();
    this.startAutoSlide();
  }
}

// ===== STATS COUNTER ANIMATION =====
class StatsCounter {
  constructor() {
    this.counters = document.querySelectorAll('.count');
    this.hasStarted = false;
    this.observer = null;

    this.init();
  }

  init() {
    this.setupIntersectionObserver();
  }

  setupIntersectionObserver() {
    const options = {
      threshold: 0.5,
      rootMargin: '0px 0px -100px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.hasStarted) {
          this.hasStarted = true;
          this.animateCounters();
        }
      });
    }, options);

    const statsSection = document.getElementById('stats');
    if (statsSection) {
      this.observer.observe(statsSection);
    }
  }

  animateCounters() {
    this.counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const suffix = counter.getAttribute('data-suffix') || '';

      this.animateCounter(counter, target, suffix);
    });
  }

  animateCounter(element, target, suffix) {
    let current = 0;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      current += increment;

      if (current >= target) {
        element.textContent = target + suffix;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current) + suffix;
      }
    }, stepTime);
  }
}

// ===== SCROLL TO TOP FUNCTIONALITY =====
class ScrollToTop {
  constructor() {
    this.button = document.getElementById('scrollToTopBtn');
    this.threshold = 300;

    this.init();
  }

  init() {
    if (!this.button) return;

    this.bindEvents();
    this.handleScroll(); // Initial check
  }

  bindEvents() {
    window.addEventListener('scroll', () => this.handleScroll());
    this.button.addEventListener('click', () => this.scrollToTop());
  }

  handleScroll() {
    const shouldShow = window.scrollY > this.threshold;
    this.button.style.display = shouldShow ? 'flex' : 'none';

    // Add smooth opacity transition
    if (shouldShow) {
      this.button.style.opacity = '1';
      this.button.style.transform = 'translateY(0)';
    } else {
      this.button.style.opacity = '0';
      this.button.style.transform = 'translateY(10px)';
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}

// ===== SMOOTH NAVIGATION =====
class SmoothNavigation {
  constructor() {
    this.navLinks = document.querySelectorAll('a[href^="#"]');
    this.init();
  }

  init() {
    this.bindEvents();
    this.handlePageLoad();
  }

  bindEvents() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => this.handleNavClick(e));
    });
  }

  handleNavClick(e) {
    const href = e.currentTarget.getAttribute('href');
    const target = document.querySelector(href);

    if (target) {
      e.preventDefault();

      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      // Update URL without reload
      history.pushState(null, null, window.location.pathname + window.location.search);

      // Update active nav state
      this.updateActiveNav(href);
    }
  }

  updateActiveNav(activeHref) {
    this.navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === activeHref);
    });
  }

  handlePageLoad() {
    // Force scroll to top on page load
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    // Remove hash from URL
    if (window.location.hash) {
      history.replaceState(null, null, window.location.pathname + window.location.search);
    }
  }
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
class AnimationObserver {
  constructor() {
    this.elements = document.querySelectorAll('.fade-in');
    this.init();
  }

  init() {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    this.elements.forEach(element => {
      observer.observe(element);
    });
  }
}

// ===== NAVBAR SCROLL EFFECT =====
class NavbarScrollEffect {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.lastScrollY = window.scrollY;
    this.init();
  }

  init() {
    if (!this.navbar) return;

    window.addEventListener('scroll', () => this.handleScroll());
  }

  handleScroll() {
    const currentScrollY = window.scrollY;

    // Add/remove scrolled class for styling
    if (currentScrollY > 50) {
      this.navbar.classList.add('scrolled');
    } else {
      this.navbar.classList.remove('scrolled');
    }

    this.lastScrollY = currentScrollY;
  }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.optimizeImages();
    this.preloadCriticalResources();
  }

  optimizeImages() {
    // Add loading="lazy" to images that don't have it
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
      if (!img.closest('.hero-section')) { // Don't lazy load hero images
        img.setAttribute('loading', 'lazy');
      }
    });
  }

  preloadCriticalResources() {
    // Preload critical images
    const criticalImages = [
      'https://i.ibb.co/vvQDL33Q/cropped-circle-image.png'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
class AccessibilityEnhancer {
  constructor() {
    this.init();
  }

  init() {
    this.setupKeyboardNavigation();
    this.setupFocusManagement();
    this.setupReducedMotion();
  }

  setupKeyboardNavigation() {
    // Add keyboard support for interactive elements
    const interactiveElements = document.querySelectorAll('.project-card, .stat-card');

    interactiveElements.forEach(element => {
      element.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          element.click();
        }
      });
    });
  }

  setupFocusManagement() {
    // Improve focus visibility
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });
  }

  setupReducedMotion() {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (prefersReducedMotion.matches) {
      document.body.classList.add('reduced-motion');
    }

    prefersReducedMotion.addEventListener('change', (e) => {
      if (e.matches) {
        document.body.classList.add('reduced-motion');
      } else {
        document.body.classList.remove('reduced-motion');
      }
    });
  }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  // Initialize typing animation
  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    const phrases = [
      'AI Developer & Technology Specialist',
      'Turning Ideas into Reality with Code & AI'
    ];
    new TypingAnimation(typingElement, phrases);
  }

  // Initialize testimonials carousel
  const testimonialsContainer = document.querySelector('.testimonials-carousel');
  if (testimonialsContainer) {
    new TestimonialsCarousel(testimonialsContainer);
  }

  // Initialize stats counter
  new StatsCounter();

  // Initialize scroll to top
  new ScrollToTop();

  // Initialize smooth navigation
  new SmoothNavigation();

  // Initialize animation observer
  new AnimationObserver();

  // Initialize navbar scroll effect
  new NavbarScrollEffect();

  // Initialize performance optimizations
  new PerformanceOptimizer();

  // Initialize accessibility enhancements
  new AccessibilityEnhancer();
});

// ===== UTILITY FUNCTIONS =====
const Utils = {
  // Debounce function for performance
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function for scroll events
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Check if element is in viewport
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.body.scrollHeight;documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
};

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
  console.error('JavaScript error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
});

// ===== EXPORT FOR TESTING (if needed) =====
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    TypingAnimation,
    TestimonialsCarousel,
    StatsCounter,
    ScrollToTop,
    SmoothNavigation,
    Utils
  };
}
