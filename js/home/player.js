import { playerCard, playerControls } from "./elements.js";

/* =========================
   Player Card Breathing Glow
========================= */

let glowStrength = 0;
let glowDirection = 1;

function animatePlayerGlow() {
    if (!playerCard) return;

    glowStrength += glowDirection * 0.15;

    if (glowStrength >= 12) {
        glowDirection = -1;
    }

    if (glowStrength <= 2) {
        glowDirection = 1;
    }

    playerCard.style.boxShadow = `
        0 22px 70px rgba(5, 8, 30, 0.65),
        0 0 ${glowStrength}px rgba(214, 160, 255, 0.28)
    `;

    requestAnimationFrame(animatePlayerGlow);
}

animatePlayerGlow();

/* =========================
   Fake Audio Visualizer
   暫時保留，但不影響進度條
========================= */

if (playerControls) {
    const visualizer = document.createElement("div");

    visualizer.className = "visualizer";

    for (let i = 0; i < 24; i++) {
        const bar = document.createElement("span");
        bar.style.animationDelay = `${i * 0.08}s`;
        visualizer.appendChild(bar);
    }

    playerControls.parentElement.appendChild(visualizer);
}