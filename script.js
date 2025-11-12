// Typewriter
const texts = ["Aspiring Software Engineer", "Student", "Teaching Assistant", "Leetcode Enthusiast"];
let count = 0, index = 0, typingSpeed = 150, erasingSpeed = 100, pauseTime = 1500;

function typeWriter() {
    const currentText = texts[count];
    document.getElementById('typewriter').textContent = currentText.slice(0, index + 1);
    index++;
    if(index === currentText.length) setTimeout(eraseWriter, pauseTime);
    else setTimeout(typeWriter, typingSpeed);
}

function eraseWriter() {
    const currentText = texts[count];
    document.getElementById('typewriter').textContent = currentText.slice(0, index - 1);
    index--;
    if(index === 0) { count = (count + 1) % texts.length; setTimeout(typeWriter, 300); }
    else setTimeout(eraseWriter, erasingSpeed);
}

// Smooth page transitions
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('.page-content').classList.add('visible');
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if(href && !href.startsWith('#')) {
                e.preventDefault();
                document.querySelector('.page-content').classList.remove('visible');
                setTimeout(() => { window.location.href = href; }, 400);
            }
        });
    });
    setTimeout(typeWriter, 500);
});
