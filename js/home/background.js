const homeScale = document.querySelector(".home-scale");

let mouseX = 0;
let mouseY = 0;

let currentX = 0;
let currentY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX / window.innerWidth - 0.5;
    mouseY = e.clientY / window.innerHeight - 0.5;
});

function animateBackground() {

    currentX += (mouseX - currentX) * 0.04;
    currentY += (mouseY - currentY) * 0.04;

    const moveX = currentX * 16;
    const moveY = currentY * 16;

    if (homeScale) {

        homeScale.style.backgroundPosition =
            `${50 + moveX * 0.15}% ${50 + moveY * 0.15}%`;

    }

    requestAnimationFrame(animateBackground);
}

animateBackground();