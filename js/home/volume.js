const muteToggle = document.getElementById("mute-toggle");
const volumeSlider = document.getElementById("site-volume-slider");

let siteVolume = 0.7;
let previousVolume = 0.7;
let isMuted = false;

function getMediaElements() {
    return document.querySelectorAll("audio, video");
}

function applySiteVolume() {
    getMediaElements().forEach((media) => {
        media.volume = isMuted ? 0 : siteVolume;
        media.muted = isMuted;
    });

    muteToggle.classList.toggle("is-muted", isMuted);
}

if (muteToggle && volumeSlider) {
    volumeSlider.value = siteVolume;

    muteToggle.addEventListener("click", () => {
        isMuted = !isMuted;

        if (isMuted) {
            previousVolume = siteVolume;
            volumeSlider.value = 0;
        } else {
            siteVolume = previousVolume || 0.7;
            volumeSlider.value = siteVolume;
        }

        applySiteVolume();
    });

    volumeSlider.addEventListener("input", () => {
        siteVolume = Number(volumeSlider.value);

        isMuted = siteVolume === 0;

        if (!isMuted) {
            previousVolume = siteVolume;
        }

        applySiteVolume();
    });

    applySiteVolume();
}

window.applySiteVolume = applySiteVolume;