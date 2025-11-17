// ---------- Mobile Video Disable ----------
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (isMobile) {
    // Stop all videos on mobile to prevent play button overlay
    document.querySelectorAll("video").forEach(video => {
        video.pause();
        video.removeAttribute("autoplay");
        video.removeAttribute("loop");
        video.style.display = "none"; // hide video to prevent play button overlay
    });
} else {

    // ---------- Project Videos Hover (Desktop Only) ----------
    const videos = [
        document.getElementById('projectVideo1'),
        document.getElementById('projectVideo2'),
        document.getElementById('projectVideo3')
    ];

    videos.forEach(video => {
        if (!video) return;

        const hoverSign = video.parentElement.querySelector('.hover-sign');

        video.addEventListener('mouseenter', () => {
            video.muted = true;
            video.play();
            if (hoverSign) hoverSign.classList.add('active');
        });

        video.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
            if (hoverSign) hoverSign.classList.remove('active');
        });
    });
}


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
