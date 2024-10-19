const wrapper = document.querySelector(".wrapper"),
  musicImg = document.querySelector("img"),
  musicName = document.querySelector(".name"),
  musicArtist = document.querySelector(".artist"),
  playPauseBtn = document.querySelector(".play-pause"),
  prevBtn = document.querySelector("#prev"),
  nextBtn = document.querySelector("#next"),
  mainAudio = document.querySelector("#main-audio"),
  progressArea = document.querySelector(".progress-area"),
  progressBar = document.querySelector(".progress-bar");

let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);
let isMusicPaused = true;

// Cargar canción inicial
window.addEventListener("load", () => {
  loadMusic(musicIndex);
});

// Función para cargar la música
function loadMusic(indexNumb) {
  musicName.innerText = allMusic[indexNumb - 1].name;
  musicArtist.innerText = allMusic[indexNumb - 1].artist;
  musicImg.src = `assets/img/${allMusic[indexNumb - 1].src}.jpg`;
  mainAudio.src = `assets/songs/${allMusic[indexNumb - 1].src}.mp3`;
}

// Reproducir música
function playMusic() {
  wrapper.classList.add("paused");
  musicImg.classList.add('rotate');
  playPauseBtn.innerHTML = `<i class="fi fi-sr-pause"></i>`;
  mainAudio.play();
}

// Pausar música
function pauseMusic() {
  wrapper.classList.remove("paused");
  musicImg.classList.remove('rotate');
  playPauseBtn.innerHTML = ` <i class="fi fi-sr-play play"></i>`;
  mainAudio.pause();
}

// Canción anterior
function prevMusic() {
  musicIndex--;
  if (musicIndex < 1) {
    musicIndex = allMusic.length;
  }
  loadMusic(musicIndex);
  playMusic();
}

// Siguiente canción
function nextMusic() {
  musicIndex++;
  if (musicIndex > allMusic.length) {
    musicIndex = 1;
  }
  loadMusic(musicIndex);
  playMusic();
}

// Evento para botón de reproducción/pausa
playPauseBtn.addEventListener("click", () => {
  const isMusicPlaying = wrapper.classList.contains("paused");
  isMusicPlaying ? pauseMusic() : playMusic();
});

// Evento para botones anterior y siguiente
prevBtn.addEventListener("click", prevMusic);
nextBtn.addEventListener("click", nextMusic);

// Actualización de la barra de progreso y tiempos
mainAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  if (!isNaN(duration)) {
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    // Tiempo actual y duración
    let musicCurrentTime = wrapper.querySelector(".current-time"),
        musicDuration = wrapper.querySelector(".max-duration");

    // Actualizar el tiempo total solo una vez
    if (!musicDuration.innerText) {
      let totalMin = Math.floor(duration / 60);
      let totalSec = Math.floor(duration % 60);
      if (totalSec < 10) totalSec = `0${totalSec}`;
      musicDuration.innerText = `${totalMin}:${totalSec}`;
    }

    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) currentSec = `0${currentSec}`;
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
  }
});

// Actualizar la posición de la música en la barra de progreso
progressArea.addEventListener("click", (e) => {
  let progressWidth = progressArea.clientWidth;
  let clickedOffsetX = e.offsetX;
  let songDuration = mainAudio.duration;
  if (!isNaN(songDuration)) {
    mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    playMusic();
  }
});

// Cuando la música termina, pasar a la siguiente
mainAudio.addEventListener("ended", nextMusic);
