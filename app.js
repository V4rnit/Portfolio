// ---------- Project Videos Hover ----------
const videos = [
    document.getElementById('projectVideo1'),
    document.getElementById('projectVideo2'),
    document.getElementById('projectVideo3')
];
const hoverSign = document.querySelector('.hover-sign');

videos.forEach(video => {
    video.addEventListener('mouseover', () => {
        video.play();
        hoverSign.classList.add('active');
    });
    video.addEventListener('mouseout', () => {
        video.pause();
        hoverSign.classList.remove('active');
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

