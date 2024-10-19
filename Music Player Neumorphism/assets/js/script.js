const audio = document.getElementById("audio");
const playPause = document.getElementById("play");
const progressBar = document.getElementById("progress-bar");
const currentTimeDisplay = document.getElementById("current-time");
const totalTimeDisplay = document.getElementById("total-time");

playPause.addEventListener("click", () => {
  if (audio.paused || audio.ended) {
    playPause.querySelector(".pause-btn").classList.toggle("hide");
    playPause.querySelector(".play-btn").classList.toggle("hide");
    audio.play();
  } else {
    audio.pause();
    playPause.querySelector(".pause-btn").classList.toggle("hide");
    playPause.querySelector(".play-btn").classList.toggle("hide");
  }
});

// Actualiza la barra de progreso y el tiempo de reproducción actual
audio.addEventListener("timeupdate", () => {
  const currentTime = audio.currentTime;
  const duration = audio.duration;

  // Actualiza el valor de la barra de progreso
  const progressPercent = (currentTime / duration) * 100;
  progressBar.value = progressPercent;

  // Muestra el tiempo actual y la duración total
  currentTimeDisplay.textContent = formatTime(currentTime);
  totalTimeDisplay.textContent = formatTime(duration);
});

// Formatea el tiempo en minutos y segundos
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// Permite saltar a diferentes partes de la canción haciendo clic en la barra de progreso
progressBar.addEventListener("input", () => {
  const duration = audio.duration;
  const seekTime = (progressBar.value / 100) * duration;
  audio.currentTime = seekTime;
});
