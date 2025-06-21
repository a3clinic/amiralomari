const typingElement = document.getElementById("typing-text");
const phrases = [
  "AI Developer & Technology Specialistt",
  "Turning Ideas into Reality with Code & AII"
];

let i = 0;
let j = 0;
let isDeleting = false;
let isEnd = false;

function loop() {
  const fullText = phrases[i];
  let displayText = fullText.substring(0, j);
  
  typingElement.innerHTML = displayText + '<span class="cursor">|</span>';

  if (!isDeleting && j < fullText.length) {
    j++;
  } else if (isDeleting && j > 0) {
    j--;
  }

  if (j === fullText.length) {
    isEnd = true;
    isDeleting = true;
  }

  if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % phrases.length;
  }

  const speed = isEnd ? 1200 : isDeleting ? 50 : 100;
  isEnd = false;
  setTimeout(loop, speed);
}

loop();
