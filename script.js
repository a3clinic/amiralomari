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

document.addEventListener("DOMContentLoaded", () => {
  const shareBtn = document.getElementById("shareBtn");

  if (shareBtn) {
    shareBtn.addEventListener("click", async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: document.title,
            text: "Check out this awesome website!",
            url: window.location.href
          });
        } catch (err) {
          console.error("Sharing failed:", err.message);
        }
      } else {
        // Fallback: copy URL
        navigator.clipboard.writeText(window.location.href)
          .then(() => alert("Link copied to clipboard!"))
          .catch(() => alert("Failed to copy the link."));
      }
    });
  }
});
