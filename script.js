const typingElement = document.getElementById("typing-text");
const phrases = [
  "Coding Developer & Technology Specialist",
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
