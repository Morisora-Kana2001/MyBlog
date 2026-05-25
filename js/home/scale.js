/*
import { homePage, homeScale } from "./elements.js";

const DESIGN_WIDTH = 1720;
const DESIGN_HEIGHT = 980;

function resizeHomePage() {
    if (!homePage || !homeScale) return;

    const scaleX = window.innerWidth / DESIGN_WIDTH;
    const scaleY = window.innerHeight / DESIGN_HEIGHT;

    const scale = Math.min(scaleX, scaleY, 1);

    homePage.style.transform = `scale(${scale})`;

    homeScale.style.width = "100vw";
    homeScale.style.height = "100vh";
}

window.addEventListener("resize", resizeHomePage);
window.addEventListener("load", resizeHomePage);

resizeHomePage();
*/