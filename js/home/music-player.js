const audio = document.getElementById("music-audio");
const titleEl = document.getElementById("music-title");
const artistEl = document.getElementById("music-artist");
const timeEl = document.getElementById("music-time");
const progress = document.getElementById("music-progress");
const progressBar = document.getElementById("music-progress-bar");
const playToggle = document.getElementById("play-toggle");
const prevBtn = document.getElementById("prev-song");
const nextBtn = document.getElementById("next-song");

const MUSIC_JSON_PATH = "../data/music.json";

let playlist = [];
let currentIndex = 0;
let isPlaying = false;

async function loadPlaylist() {
    try {
        const response = await fetch(MUSIC_JSON_PATH);

        if (!response.ok) {
            throw new Error(`Failed to load music.json: ${response.status}`);
        }

        playlist = await response.json();

        if (!Array.isArray(playlist) || playlist.length === 0) {
            throw new Error("music.json is empty or invalid.");
        }
        
        currentIndex = 0;
        loadSong(currentIndex);
    } 
    
    catch (error) {
        console.error("Failed to load playlist:", error);
        titleEl.textContent = "No music loaded";
        artistEl.textContent = "Check data/music.json";
        timeEl.textContent = "00:00:00 / 00:00:00";
    }
}

function formatTime(seconds) {
    if (!Number.isFinite(seconds)) {
        return "00:00:00";
    }

    const hr = Math.floor(seconds / 3600);
    const min = Math.floor((seconds % 3600) / 60);
    const sec = Math.floor(seconds % 60);

    return [
        hr.toString().padStart(2, "0"),
        min.toString().padStart(2, "0"),
        sec.toString().padStart(2, "0")
    ].join(":");
}

function loadSong(index) {
    const song = playlist[index];

    if (!song) return;

    titleEl.textContent = song.title || "Unknown Title";
    artistEl.textContent = song.artist || "Unknown Artist";

    audio.src = song.src;
    audio.load();

    progressBar.style.width = "0%";
    timeEl.textContent = "00:00:00 / 00:00:00";

    isPlaying = false;
    playToggle.innerHTML = `<i class="fa-solid fa-play"></i>`;

    if (window.applySiteVolume) window.applySiteVolume();
}

async function playSong() {

    if (!playlist.length) return;

    try {
        await audio.play();
        isPlaying = true;
        playToggle.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    } catch (error) {
        console.error("Audio play failed:", error);
    }
}

function pauseSong() {
    audio.pause();
    isPlaying = false;
    playToggle.innerHTML = `<i class="fa-solid fa-play"></i>`;
}

function togglePlay() {
    isPlaying ? pauseSong() : playSong();
}

function nextSong() {
    currentIndex = (currentIndex + 1) % playlist.length;
    loadSong(currentIndex);
    playSong();
}

function prevSong() {
    currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentIndex);
    playSong();
}

function updateProgress() {
    if (!audio.duration) return;

    const percent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${percent}%`;
    timeEl.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
}

function seekMusic(event) {
    if (!audio.duration) return;

    const rect = progress.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percent = clickX / rect.width;

    audio.currentTime = percent * audio.duration;
}

if (audio && titleEl && artistEl && timeEl && progress && progressBar && playToggle && prevBtn && nextBtn) {

    playToggle.addEventListener("click", togglePlay);
    nextBtn.addEventListener("click", nextSong);
    prevBtn.addEventListener("click", prevSong);
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateProgress);
    audio.addEventListener("ended", nextSong);
    progress.addEventListener("click", seekMusic);

    loadPlaylist();
}