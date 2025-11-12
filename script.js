const texts = [
  "Aspiring Software Engineer",
  "Student",
  "Teaching Assistant",
  "Leetcode Enthusiast"
];

let count = 0;      // current text index
let index = 0;      // current letter index
let typingSpeed = 150;
let erasingSpeed = 100;
let pauseTime = 1500; // time to wait before erasing

function typeWriter() {
    const currentText = texts[count];
    document.getElementById('typewriter').textContent = currentText.slice(0, index + 1);
    index++;

    if (index === currentText.length) {
        // Finished typing, wait then start erasing
        setTimeout(eraseWriter, pauseTime);
    } else {
        setTimeout(typeWriter, typingSpeed);
    }
}

function eraseWriter() {
    const currentText = texts[count];
    document.getElementById('typewriter').textContent = currentText.slice(0, index - 1);
    index--;

    if (index === 0) {
        // Finished erasing, move to next text
        count = (count + 1) % texts.length; // loop endlessly
        setTimeout(typeWriter, 300);
    } else {
        setTimeout(eraseWriter, erasingSpeed);
    }
}

// Start the loop
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(typeWriter, 500); // small delay before starting
});
