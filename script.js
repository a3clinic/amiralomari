// Typing animation
const typingElement = document.getElementById("typing-text");
const phrases = [
  "AI Developer & Technology Specialist",
  "Turning Ideas into Reality with Code & AI"
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
    setTimeout(loop, 1200);
    return;
  }

  if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % phrases.length;
  }

  setTimeout(loop, isDeleting ? 50 : 100);
}

loop();
