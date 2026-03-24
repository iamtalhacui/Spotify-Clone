let songIndex = 0;
let isShuffled = false;
let isRepeating = false;

let prevBtn = document.querySelector(".prevBtn");
let nextBtn = document.querySelector(".nextBtn");
let playBtn = document.querySelector("#playBtn");
let progressBar = document.querySelector("#progress-bar");
let footerVolume = document.querySelector("#footer-volume");
let audioBars = document.querySelector("#gif");
let btns = document.querySelectorAll(".btn");
let rows = document.querySelectorAll(".div");
let shuffleBtn = document.querySelector("#shuffleBtn");
let repeatBtn = document.querySelector("#repeatBtn");
let npTitle = document.querySelector("#np-title");
let npCover = document.querySelector("#np-cover");
let footerTitle = document.querySelector("#footer-title");
let footerArtist = document.querySelector("#footer-artist");
let footerCover = document.querySelector("#footer-cover");
let currentTimeBar = document.querySelector("#current-time-bar");
let totalTimeBar = document.querySelector("#total-time-bar");

let songs = [
    { songName: "Warriyo - Mortals", artist: "NCS Release", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Cielo", artist: "Huma Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "DEAF KEV - Invincible", artist: "NCS Release", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Different Heaven & EHIDE", artist: "My Heart", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Janji - Heroes Tonight", artist: "feat. Johnning", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Rabba", artist: "Salam-e-Ishq", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Sakhiyaan", artist: "Salam-e-Ishq", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Bhula Dena", artist: "Salam-e-Ishq", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Tumhari Kasam", artist: "Salam-e-Ishq", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "Salam-e-Ishq", artist: "Title Track", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" }
];

let audioElement = new Audio();
audioElement.volume = 0.8;

function formatTime(sec) {
    if (isNaN(sec)) return "0:00";
    let m = Math.floor(sec / 60);
    let s = Math.floor(sec % 60);
    return m + ":" + (s < 10 ? "0" + s : s);
}

function updateSongUI(index) {
    let song = songs[index];
    npTitle.textContent = song.songName;
    npCover.src = song.coverPath;
    footerTitle.textContent = song.songName;
    footerArtist.textContent = song.artist;
    footerCover.src = song.coverPath;

    rows.forEach((row, i) => {
        row.classList.toggle("active", i === index);
    });

    btns.forEach((btn, i) => {
        btn.classList.remove("fa-circle-pause");
        btn.classList.add("fa-circle-play");
        if (i === index) {
            btn.classList.remove("fa-circle-play");
            btn.classList.add("fa-circle-pause");
        }
    });
}

function playSong(index) {
    songIndex = index;
    audioElement.src = songs[index].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    updateSongUI(index);
    setPlayingState(true);
}

function setPlayingState(playing) {
    if (playing) {
        playBtn.classList.remove("fa-play");
        playBtn.classList.add("fa-pause");
        audioBars.classList.add("active");
    } else {
        playBtn.classList.remove("fa-pause");
        playBtn.classList.add("fa-play");
        audioBars.classList.remove("active");
    }
}

playBtn.addEventListener("click", () => {
    if (audioElement.paused) {
        if (!audioElement.src || audioElement.src === window.location.href) {
            playSong(songIndex);
        } else {
            audioElement.play();
            setPlayingState(true);
            updateSongUI(songIndex);
        }
    } else {
        audioElement.pause();
        setPlayingState(false);
    }
});

audioElement.addEventListener("timeupdate", () => {
    let progress = (audioElement.currentTime / audioElement.duration) * 100 || 0;
    progressBar.value = progress;
    currentTimeBar.textContent = formatTime(audioElement.currentTime);
});

audioElement.addEventListener("loadedmetadata", () => {
    totalTimeBar.textContent = formatTime(audioElement.duration);
});

audioElement.addEventListener("ended", () => {
    if (isRepeating) {
        audioElement.currentTime = 0;
        audioElement.play();
        return;
    }
    if (isShuffled) {
        let rand;
        do { rand = Math.floor(Math.random() * songs.length); } while (rand === songIndex);
        playSong(rand);
    } else {
        let next = songIndex < songs.length - 1 ? songIndex + 1 : 0;
        playSong(next);
    }
});

progressBar.addEventListener("input", () => {
    audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
});

footerVolume.addEventListener("input", () => {
    audioElement.volume = footerVolume.value / 100;
});

btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.stopPropagation();
        let clickedIndex = parseInt(e.currentTarget.id);
        if (songIndex === clickedIndex && !audioElement.paused) {
            audioElement.pause();
            setPlayingState(false);
            btn.classList.remove("fa-circle-pause");
            btn.classList.add("fa-circle-play");
        } else {
            playSong(clickedIndex);
        }
    });
});

rows.forEach((row) => {
    row.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn")) return;
        let index = parseInt(row.dataset.index);
        if (songIndex === index && !audioElement.paused) {
            audioElement.pause();
            setPlayingState(false);
        } else {
            playSong(index);
        }
    });
});

prevBtn.addEventListener("click", () => {
    if (audioElement.currentTime > 3) {
        audioElement.currentTime = 0;
        return;
    }
    let prev = songIndex > 0 ? songIndex - 1 : songs.length - 1;
    playSong(prev);
});

nextBtn.addEventListener("click", () => {
    let next;
    if (isShuffled) {
        do { next = Math.floor(Math.random() * songs.length); } while (next === songIndex);
    } else {
        next = songIndex < songs.length - 1 ? songIndex + 1 : 0;
    }
    playSong(next);
});

shuffleBtn.addEventListener("click", () => {
    isShuffled = !isShuffled;
    shuffleBtn.classList.toggle("active", isShuffled);
});

repeatBtn.addEventListener("click", () => {
    isRepeating = !isRepeating;
    repeatBtn.classList.toggle("active", isRepeating);
});
