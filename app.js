// ---------- Project Videos Hover ----------
const videos = [
    document.getElementById('projectVideo1'),
    document.getElementById('projectVideo2'),
    document.getElementById('projectVideo3')
];

videos.forEach(video => {
    const hoverSign = video.parentElement.querySelector('.hover-sign'); // get hover-sign for this video
    
    video.addEventListener('mouseenter', () => {
        video.muted = true; // required for autoplay
        video.play();
        if (hoverSign) hoverSign.classList.add('active');
    });

    video.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0; // optional: reset to start
        if (hoverSign) hoverSign.classList.remove('active');
    });
});


// ---------- Sidebar Toggle ----------
const sideBar = document.querySelector('.sidebar');
const menu = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');

menu.addEventListener('click', () => {
    sideBar.classList.add('open-sidebar');
    sideBar.classList.remove('close-sidebar');
});

closeIcon.addEventListener('click', () => {
    sideBar.classList.remove('open-sidebar');
    sideBar.classList.add('close-sidebar');
});

