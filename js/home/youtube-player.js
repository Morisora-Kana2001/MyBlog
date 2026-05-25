const youtubeTitle = document.getElementById("youtube-title");
const youtubeChannel = document.getElementById("youtube-channel");
const searchInput = document.getElementById("youtube-search-input");
const searchBtn = document.getElementById("youtube-search-btn");
const resultsBox = document.getElementById("youtube-results");

const WORKER_URL = "https://youtube-api.b0942002.workers.dev/search";

let youtubePlayer = null;
let pendingVideo = null;

const defaultVideo = {
    id: "AAsRtnbDs-0",
    title: "Hoshimachi Suisei - Stellar Stellar",
    channel: "YouTube"
};

/* =========================
   Load YouTube IFrame API
========================= */

function loadYouTubeIframeAPI() {
    if (window.YT && window.YT.Player) {
        createPlayer();
        return;
    }

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";

    const firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode.insertBefore(tag, firstScript);

    window.onYouTubeIframeAPIReady = createPlayer;
}

/* =========================
   Create Player
========================= */

function createPlayer() {
    youtubePlayer = new YT.Player("youtube-player", {
        width: "100%",
        height: "100%",
        videoId: defaultVideo.id,

        playerVars: {
            autoplay: 0,
            controls: 1,
            rel: 0,
            modestbranding: 1,
            playsinline: 1
        },

        events: {
            onReady: () => {
                setVideoInfo(defaultVideo);

                if (pendingVideo) {
                    loadYoutubeVideo(pendingVideo);
                    pendingVideo = null;
                }
            },

            onError: handlePlayerError
        }
    });
}

/* =========================
   Video Control
========================= */

function setVideoInfo(video) {
    youtubeTitle.textContent = video.title;
    youtubeChannel.textContent = video.channel;
}

function loadYoutubeVideo(video) {
    if (!youtubePlayer || !youtubePlayer.loadVideoById) {
        pendingVideo = video;
        return;
    }

    youtubePlayer.loadVideoById(video.id);
    setVideoInfo(video);
    resultsBox.classList.remove("show");
}

/* =========================
   API Search
========================= */

async function searchYoutube(query) {
    const response = await fetch(
        `${WORKER_URL}?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
        throw new Error(`Worker search error: ${response.status}`);
    }

    return await response.json();
}

/* =========================
   Render Results
========================= */

function renderResults(results) {
    resultsBox.innerHTML = "";

    if (results.length === 0) {
        resultsBox.innerHTML = `
            <div class="youtube-result-empty">
                找不到可嵌入播放的影片
            </div>
        `;
        resultsBox.classList.add("show");
        return;
    }

    results.forEach((video) => {
        const item = document.createElement("div");
        item.className = "youtube-result-item";

        item.innerHTML = `
            <img src="${video.thumbnail}" alt="">
            <div>
                <h4>${video.title}</h4>
                <p>${video.channel}</p>
            </div>
        `;

        item.addEventListener("click", () => {
            loadYoutubeVideo(video);
        });

        resultsBox.appendChild(item);
    });

    resultsBox.classList.add("show");
}

/* =========================
   Search Handler
========================= */

async function handleSearch() {
    const query = searchInput.value.trim();

    if (!query) {
        resultsBox.classList.remove("show");
        return;
    }

    resultsBox.innerHTML = `
        <div class="youtube-result-empty">
            Searching...
        </div>
    `;
    resultsBox.classList.add("show");

    try {
        const results = await searchYoutube(query);
        renderResults(results);
    } catch (error) {
        console.error(error);

        resultsBox.innerHTML = `
            <div class="youtube-result-empty">
                Search failed. Check API key or quota.
            </div>
        `;
        resultsBox.classList.add("show");
    }
}

/* =========================
   Error Handler
========================= */

function handlePlayerError(event) {
    console.warn("YouTube player error:", event.data);

    youtubeTitle.textContent = "這部影片無法嵌入播放";
    youtubeChannel.textContent = "請換一部影片或在 YouTube 上觀看";
}

/* =========================
   Events
========================= */

searchBtn.addEventListener("click", handleSearch);

searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        handleSearch();
    }
});

loadYouTubeIframeAPI();