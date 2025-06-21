const typingElement = document.getElementById("typing-text");
const phrases = [
  "AI Developer & Technology Specialist",
  "Turning Ideas into Reality with Code & AI"
];

let i = 0;
let j = 0;
let isDeleting = false;
let isEnd = false;

function loop() {
  typingElement.innerHTML = phrases[i].substring(0, j) + '<span class="cursor">|</span>';

  if (!isDeleting && j < phrases[i].length) {
    j++;
  } else if (isDeleting && j > 0) {
    j--;
  }

  if (j === phrases[i].length) {
    isEnd = true;
    isDeleting = true;
  }

  if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % phrases.length;
  }

  const typingSpeed = isEnd ? 1200 : isDeleting ? 50 : 100;
  isEnd = false;
  setTimeout(loop, typingSpeed);
}

loop();
