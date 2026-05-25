import { navbarLinks } from "./elements.js";

navbarLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navbarLinks.forEach((nav) => {
            nav.classList.remove("active");
        });

        link.classList.add("active");
    });
});