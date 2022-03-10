const typingBox = document.querySelector('.header__typing');
let sentenceIndex = 0;
let textIndex = 0;
let oldTime = 0;
const speed = 50; // Bigger value = slower typing animation
let activeDOMelement = typingBox;

const text = ["Hi! My name is Radek", "I'm passionate about all things JavaScript", "I work hard, I care about writing clean code and I genuinely love to learn", "I'm currently looking for the right oportunity to work in an environment that will help me progress into a full-stack role"];

const typing = newTime => {

  if (newTime - oldTime > speed) {
    if (sentenceIndex === text[textIndex].length) {
      if (textIndex === text.length - 1) return;
      return setTimeout(() => {
        typingBox.textContent = '';
        textIndex++;
        sentenceIndex = 0;
        requestAnimationFrame(typing)
      }, 2000); // Wait between typing new sentence
    } else if (sentenceIndex === 0) {
      const p = document.createElement('p');
      typingBox.appendChild(p);
      activeDOMelement = p;
    }
    oldTime = newTime;
    const letter = text[textIndex].charAt(sentenceIndex);
    activeDOMelement.textContent += letter;
    sentenceIndex++;
  }
  requestAnimationFrame(typing);
}

typing();