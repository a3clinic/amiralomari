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
const counters = document.querySelectorAll('.count');
let started = false;

function animateCounts() {
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = Math.ceil(target / 100);

      if (count < target) {
        counter.innerText = count + increment;
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });
}

// Trigger when in view
function checkScroll() {
  const statsSection = document.getElementById('stats');
  const rect = statsSection.getBoundingClientRect();

  if (!started && rect.top <= window.innerHeight && rect.bottom >= 0) {
    started = true;
    animateCounts();
  }
}

window.addEventListener('scroll', checkScroll);
