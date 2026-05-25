/* =========================
   Loading
========================= */
const icons = document.querySelectorAll(".icon");
const loading = document.getElementById("loading");
const flash = document.getElementById("flash");
const background = document.querySelector(".background");
const card = document.querySelector(".card");

let i = 0;

// 先隱藏主畫面
background.style.opacity = 0;
card.style.opacity = 0;

background.style.transition = "opacity 1.2s ease";
card.style.transition = "opacity 1.2s ease";

const loadingAnim = setInterval(() => {
    icons.forEach(el => el.classList.remove("active"));
    icons[i].classList.add("active");

    i++;

    if (i >= icons.length) {
        clearInterval(loadingAnim);

        flash.style.opacity = 1;

        setTimeout(() => {
            loading.style.display = "none";

            background.style.opacity = 1;
            card.style.opacity = 1;

            flash.style.opacity = 0;
        }, 600);
    }
}, 300);