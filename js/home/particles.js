const petals = ["✦", "❀", "✿"];

/* =========================
   Sparkle
========================= */

function createSparkle() {

    const sparkle = document.createElement("div");

    sparkle.className = "sparkle";

    sparkle.style.left =
        Math.random() * window.innerWidth + "px";

    sparkle.style.top =
        Math.random() * window.innerHeight + "px";

    sparkle.style.animationDuration =
        4 + Math.random() * 5 + "s";

    document.body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 9000);

}

/* =========================
   Petal
========================= */

function createPetal() {

    const petal = document.createElement("div");

    petal.className = "petal";

    petal.innerText =
        petals[Math.floor(Math.random() * petals.length)];

    const startX =
        Math.random() * window.innerWidth;

    const drift =
        (Math.random() - 0.5) * 220 + "px";

    const size =
        Math.random() * 16 + 10;

    const duration =
        Math.random() * 8 + 8;

    petal.style.left = startX + "px";

    petal.style.fontSize = size + "px";

    petal.style.animationDuration =
        duration + "s";

    petal.style.setProperty("--petal-x", drift);

    document.body.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, duration * 1000);

}

/* =========================
   Dust
========================= */

function createDust() {

    const dust = document.createElement("div");

    dust.className = "dust";

    const size =
        Math.random() * 3 + 1;

    dust.style.width = size + "px";
    dust.style.height = size + "px";

    dust.style.left =
        Math.random() * window.innerWidth + "px";

    dust.style.top =
        Math.random() * window.innerHeight + "px";

    dust.style.animationDuration =
        6 + Math.random() * 10 + "s";

    document.body.appendChild(dust);

    setTimeout(() => {
        dust.remove();
    }, 15000);

}

/* =========================
   Star
========================= */

function createStar() {

    const star = document.createElement("div");

    star.className = "star";

    const size =
        Math.random() * 3 + 2;

    star.style.width = size + "px";
    star.style.height = size + "px";

    star.style.left =
        Math.random() * window.innerWidth + "px";

    star.style.top =
        Math.random() * (window.innerHeight * 0.5) + "px";

    document.body.appendChild(star);

    setTimeout(() => {
        star.remove();
    }, 5000);

}

/* =========================
   Ambient Light
========================= */

const ambient = document.createElement("div");

ambient.className = "ambient-light";

document.body.appendChild(ambient);

document.addEventListener("mousemove", (e) => {

    ambient.style.left =
        e.clientX + "px";

    ambient.style.top =
        e.clientY + "px";

});

/* =========================
   Intervals
========================= */

setInterval(createSparkle, 900);

setInterval(createPetal, 900);

setInterval(createDust, 280);

setInterval(createStar, 700);
