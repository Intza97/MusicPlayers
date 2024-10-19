const title = document.querySelector('.title');
const prev = document.querySelector('.prev');
const playPause = document.querySelector('.playPause');
const next = document.querySelector('.next');
const audio = document.querySelector('audio');

const songList = [
    {
        path: "assets/songs/music1.mp3",
        songName: "Bohemian Rhapsody - Queen",
    },
    {
        path: "assets/songs/music2.mp3",
        songName: "Billie Jean - Michael Jackson",
    },
    {
        path: "assets/songs/music3.mp3",
        songName: "Imagine - John Lennon",
    },
    {
        path: "assets/songs/music4.mp3",
        songName: "I Will Always Love You - Whitney Houston",
    }
];

let song_Playing = false;

function playSong() {
    song_Playing = true;
    audio.play();
    playPause.classList.add('active');
    playPause.innerHTML = '<ion-icon name="pause-outline"></ion-icon>';
}

function pauseSong() {
    song_Playing = false;
    audio.pause();
    playPause.classList.remove('active');
    playPause.innerHTML = '<ion-icon name="play-outline"></ion-icon>';
}

playPause.addEventListener("click", () => (song_Playing ? pauseSong() : playSong()));

function loadSong(song) {
    title.textContent = song.songName;
    audio.src = song.path;
}

let i = 0;
loadSong(songList[i]);

function prevSong() {
    i--;
    if (i < 0) {
        i = songList.length - 1;
    }
    loadSong(songList[i]);
    playSong();
}

prev.addEventListener("click", prevSong);

function nextSong() {
    i++;
    if (i > songList.length - 1) {
        i = 0;
    }
    loadSong(songList[i]);
    playSong();
}

next.addEventListener("click", nextSong);