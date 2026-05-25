/* =========================
   Loading
========================= */
const flash = document.getElementById("flash");
const loading = document.getElementById("loading");
const icons = document.querySelectorAll(".icon");

let i = 0;

/* =========================
   Icon Animation
========================= */

if (flash && loading && icons.length > 0) {
    const loadingAnim = setInterval(() => {
        icons.forEach((el) => el.classList.remove("active"));

        icons[i].classList.add("active");

        i++;

        if (i >= icons.length) {
            clearInterval(loadingAnim);

            flash.style.opacity = "1";

            setTimeout(() => {
                loading.style.display = "none";
                flash.style.opacity = "0";

                setTimeout(() => {
                    loading.remove();
                    flash.remove();
                }, 900);
            }, 600);
        }
    }, 300);
}