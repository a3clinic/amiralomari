// Typing animation
const typingElement = document.getElementById("typing-text");
const phrases = [
  "AI Developer & Technology Specialist",
  "Building Smart Digital Experiences",
  "Full-Stack Automation & Web Dev",
  "Crafting AI Solutions with Impact"
];

let i = 0;
let j = 0;
let isDeleting = false;
let currentPhrase = [];

function loop() {
  typingElement.innerHTML = currentPhrase.join("") + '<span class="cursor">|</span>';

  if (!isDeleting && j <= phrases[i].length) {
    currentPhrase.push(phrases[i][j]);
    j++;
  }

  if (isDeleting && j > 0) {
    currentPhrase.pop();
    j--;
  }

  if (j === phrases[i].length) {
    isDeleting = true;
    setTimeout(loop, 1000);
    return;
  }

  if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % phrases.length;
  }

  setTimeout(loop, isDeleting ? 50 : 100);
}

loop();

// Smooth scroll fix
document.querySelectorAll('.sidebar a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 20,
        behavior: 'smooth'
      });
    }
  });
});
