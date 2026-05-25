const statusBox = document.getElementById("status-box");
const statusMenu = document.getElementById("status-menu");
const statusText = document.getElementById("status-text");
const statusIcon = document.getElementById("status-state-icon");

const statuses = {
    online: "../assets/icons/status/online.png",
    offline: "../assets/icons/status/offline.png",
    sleep: "../assets/icons/status/sleep.png",
    relax: "../assets/icons/status/relax.png",
    working: "../assets/icons/status/working.png"
};

function setStatus(status) {
    if (!statuses[status]) return;

    statusText.textContent = status;
    statusIcon.src = statuses[status];
    statusIcon.alt = status;

    statusMenu.classList.remove("show");
}

statusBox.addEventListener("click", (event) => {
    event.stopPropagation();
    statusMenu.classList.toggle("show");
});

statusMenu.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", (event) => {
        event.stopPropagation();
        setStatus(button.dataset.status);
    });
});

document.addEventListener("click", () => {
    statusMenu.classList.remove("show");
});

setStatus("online");