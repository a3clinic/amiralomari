const typingElement = document.getElementById("typing-text");
const phrases = [
  "AI Developer & Technology Specialist",
  "Turning Ideas into Reality with Code & AI"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentPhrase = phrases[phraseIndex];
  const visibleText = currentPhrase.substring(0, charIndex);

  typingElement.innerHTML = visibleText + '<span class="cursor">|</span>';

  if (!isDeleting) {
    if (charIndex < currentPhrase.length) {
      charIndex++;
      setTimeout(type, 100);
    } else {
      // Pause before deleting
      setTimeout(() => {
        isDeleting = true;
        type();
      }, 1500);
    }
  } else {
    if (charIndex > 0) {
      charIndex--;
      setTimeout(type, 50);
    } else {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, 300);
    }
  }
}

type();

const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
  scrollToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

let currentIndex = 0;
const slides = document.querySelectorAll(".testimonial-slide");
const dots = document.querySelectorAll(".carousel-dots span");
const leftArrow = document.querySelector(".carousel-nav.left");
const rightArrow = document.querySelector(".carousel-nav.right");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
    dots[i].classList.toggle("active", i === index);
  });
  currentIndex = index;
}

function nextSlide() {
  let newIndex = (currentIndex + 1) % slides.length;
  showSlide(newIndex);
}

function prevSlide() {
  let newIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(newIndex);
}

// Auto play
let autoSlide = setInterval(nextSlide, 6000);

// Dot click
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    showSlide(i);
    resetInterval();
  });
});

// Arrow click
rightArrow.addEventListener("click", () => {
  nextSlide();
  resetInterval();
});

leftArrow.addEventListener("click", () => {
  prevSlide();
  resetInterval();
});

// Reset autoplay timer
function resetInterval() {
  clearInterval(autoSlide);
  autoSlide = setInterval(nextSlide, 6000);
}

// Start with the first slide
showSlide(currentIndex);

// Count-up animation
// Count-up animation with suffix support
const counters = document.querySelectorAll('.count');
let started = false;

function animateCounts() {
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const suffix = counter.getAttribute('data-suffix') || '';
    let count = 0;

    const duration = 2000; // Slower: total animation time in ms
    const steps = 100; // Number of steps
    const increment = target / steps;
    const stepTime = duration / steps;

    const interval = setInterval(() => {
      count += increment;
      if (count >= target) {
        counter.innerText = target + suffix;
        clearInterval(interval);
      } else {
        counter.innerText = Math.floor(count) + suffix;
      }
    }, stepTime);
  });
}

function checkScroll() {
  const statsSection = document.getElementById('stats');
  const rect = statsSection.getBoundingClientRect();

  if (!started && rect.top <= window.innerHeight && rect.bottom >= 0) {
    started = true;
    animateCounts();
  }
}

window.addEventListener('scroll', checkScroll);

// Scroll to top on page load if URL has no hash
window.addEventListener('load', () => {
  if (!window.location.hash) {
    window.scrollTo(0, 0);
  }
});

// Remove hash from URL after scroll to section
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });

      // Remove hash from URL without reload
      history.pushState("", document.title, window.location.pathname + window.location.search);
    }
  });
});
