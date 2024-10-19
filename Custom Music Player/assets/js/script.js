const wrapper = document.querySelector(".wrapper"),
  musicImg = wrapper.querySelector(".img-area img"),
  musicName = wrapper.querySelector(".song-details .name"),
  musicArtist = wrapper.querySelector(".song-details .artist"),
  playPauseBtn = wrapper.querySelector(".play-pause"),
  prevBtn = wrapper.querySelector("#prev"),
  nextBtn = wrapper.querySelector("#next"),
  mainAudio = wrapper.querySelector("#main-audio"),
  progressArea = wrapper.querySelector(".progress-area"),
  progressBar = progressArea.querySelector(".progress-bar"),
  musicList = wrapper.querySelector(".music-list"),
  moreMusicBtn = wrapper.querySelector("#more-music"),
  closeMoreMusic = musicList.querySelector("#close"),
  repeatBtn = wrapper.querySelector("#repeat-plist"),
  ulTag = wrapper.querySelector("ul");

let musicIndex = Math.floor(Math.random() * allMusic.length);
let isMusicPaused = true;

window.addEventListener("load", () => {
  loadMusic(musicIndex);
  updatePlayingSong();
});

// Cargar detalles de la música
function loadMusic(index) {
  const song = allMusic[index];
  musicName.innerText = song.name;
  musicArtist.innerText = song.artist;
  musicImg.src = `assets/img/${song.src}.jpg`;
  mainAudio.src = `assets/songs/${song.src}.mp3`;
}

// Reproducir música
function playMusic() {
  wrapper.classList.add("paused");
  playPauseBtn.querySelector("i").innerText = "pause";
  mainAudio.play();
}

// Pausar música
function pauseMusic() {
  wrapper.classList.remove("paused");
  playPauseBtn.querySelector("i").innerText = "play_arrow";
  mainAudio.pause();
}

// Reproducir siguiente canción
function prevMusic() {
  musicIndex = (musicIndex - 1 + allMusic.length) % allMusic.length;
  loadMusic(musicIndex);
  playMusic();
  updatePlayingSong();
}

// Reproducir siguiente canción
function nextMusic() {
  musicIndex = (musicIndex + 1) % allMusic.length;
  loadMusic(musicIndex);
  playMusic();
  updatePlayingSong(); 
}

// Seleccionar una canción de la lista
function selectSong(element) {
  const selectedIndex = element.getAttribute("li-index");
  musicIndex = selectedIndex - 1;
  loadMusic(musicIndex);
  playMusic();
  updatePlayingSong(); 
}

// Evento de reproducir o pausar
playPauseBtn.addEventListener("click", () => {
  const isPlaying = wrapper.classList.contains("paused");
  isPlaying ? pauseMusic() : playMusic();
  updatePlayingSong();
});

// Eventos de botones anterior y siguiente
prevBtn.addEventListener("click", prevMusic);
nextBtn.addEventListener("click", nextMusic);

// Actualizar la barra de progreso mientras se reproduce la música
mainAudio.addEventListener("timeupdate", (e) => {
  if (mainAudio.duration) {
    const progressWidth = (e.target.currentTime / mainAudio.duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    updateCurrentTime(e.target.currentTime);
  }
});

// Actualizar tiempo actual y duración
function updateCurrentTime(currentTime) {
  const currentMin = Math.floor(currentTime / 60);
  const currentSec = Math.floor(currentTime % 60)
    .toString()
    .padStart(2, "0");
  wrapper.querySelector(".current-time").innerText = `${currentMin}:${currentSec}`;
}

mainAudio.addEventListener("loadeddata", () => {
  const totalMin = Math.floor(mainAudio.duration / 60);
  const totalSec = Math.floor(mainAudio.duration % 60)
    .toString()
    .padStart(2, "0");
  wrapper.querySelector(".max-duration").innerText = `${totalMin}:${totalSec}`;
});

// Buscar a través de la barra de progreso
progressArea.addEventListener("click", (e) => {
  const progressWidth = progressArea.clientWidth;
  const clickedOffsetX = e.offsetX;
  mainAudio.currentTime = (clickedOffsetX / progressWidth) * mainAudio.duration;
  playMusic();
  updatePlayingSong();
});

// Evento de botón de repetir/mezclar
repeatBtn.addEventListener("click", () => {
  switch (repeatBtn.innerText) {
    case "repeat":
      repeatBtn.innerText = "repeat_one";
      repeatBtn.setAttribute("title", "Song looped");
      break;
    case "repeat_one":
      repeatBtn.innerText = "shuffle";
      repeatBtn.setAttribute("title", "Playback shuffled");
      break;
    case "shuffle":
      repeatBtn.innerText = "repeat";
      repeatBtn.setAttribute("title", "Playlist looped");
      break;
  }
});

// Manejar evento de fin de canción
mainAudio.addEventListener("ended", () => {
  switch (repeatBtn.innerText) {
    case "repeat":
      nextMusic();
      break;
    case "repeat_one":
      mainAudio.currentTime = 0;
      playMusic();
      break;
    case "shuffle":
      shuffleMusic();
      break;
  }
});

// Mezclar música
function shuffleMusic() {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * allMusic.length);
  } while (randomIndex === musicIndex);
  musicIndex = randomIndex;
  loadMusic(musicIndex);
  playMusic();
  updatePlayingSong();
}

// Mostrar/ocultar lista de música
moreMusicBtn.addEventListener("click", () => {
  musicList.classList.toggle("show");
});

closeMoreMusic.addEventListener("click", () => {
  musicList.classList.remove("show");
});

// Generar lista de canciones dinámicamente
allMusic.forEach((song, index) => {
  const liTag = `
    <li li-index="${index + 1}">
      <div class="row">
        <span>${song.name}</span>
        <p>${song.artist}</p>
      </div>
      <span id="${song.src}" class="audio-duration">3:40</span>
      <audio class="${song.src}" src="songs/${song.src}.mp3"></audio>
    </li>`;
  ulTag.insertAdjacentHTML("beforeend", liTag);

  const liAudioTag = ulTag.querySelector(`.${song.src}`);
  liAudioTag.addEventListener("loadeddata", () => {
    const duration = liAudioTag.duration;
    const totalMin = Math.floor(duration / 60);
    const totalSec = Math.floor(duration % 60)
      .toString()
      .padStart(2, "0");
    const durationTag = ulTag.querySelector(`#${song.src}`);
    durationTag.innerText = `${totalMin}:${totalSec}`;
    durationTag.setAttribute("t-duration", `${totalMin}:${totalSec}`);
  });

  // Agregar evento de clic a cada elemento de la lista
  const liItem = ulTag.querySelector(`li[li-index="${index + 1}"]`);
  liItem.addEventListener("click", () => selectSong(liItem));
});

// Actualizar la canción que se está reproduciendo actualmente en la lista
function updatePlayingSong() {
  const allLiTags = ulTag.querySelectorAll("li");

// Eliminar la clase 'playing' de todos los elementos de la lista
  allLiTags.forEach((li) => {
    li.classList.remove("playing");
    const audioTag = li.querySelector(".audio-duration");
    const songDuration = audioTag.getAttribute("t-duration");
    audioTag.innerText = songDuration; 
  });

  // Agregar clase 'playing' a la canción actual
  const currentLi = ulTag.querySelector(`li[li-index="${musicIndex + 1}"]`);
  currentLi.classList.add("playing");

 // Actualizar el texto de duración a "Reproduciendo"
  const currentAudioTag = currentLi.querySelector(".audio-duration");
  currentAudioTag.innerText = "Playing";
}
