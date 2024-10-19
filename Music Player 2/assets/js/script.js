const mod = document.querySelector('#mode');

mod.addEventListener('click', () => {
    document.querySelector('.phone').classList.toggle('dark');
    document.querySelector('.bi-brightness-high-fill').classList.toggle('bi-moon');
}); 

// Selección de elementos DOM
const playPauseBtn = document.getElementById('play-pause');
const playIcon = document.getElementById('play-icon');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const totalDurationEl = document.getElementById('total-duration');

// Creación de un objeto de audio
const audio = new Audio('assets/songs/music-1.mp3'); // Cambia esta ruta a la ubicación correcta de tu archivo de audio

// Variables de control
let isPlaying = false;

// Función para formatear el tiempo en minutos y segundos
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Actualización del tiempo y progreso
function updateProgress() {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    if (!isNaN(audio.duration)) {
        totalDurationEl.textContent = formatTime(audio.duration);
    }
}

// Manejar la reproducción/pausa
playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playIcon.classList.replace('fa-pause', 'fa-play');
    } else {
        audio.play();
        playIcon.classList.replace('fa-play', 'fa-pause');
    }
    isPlaying = !isPlaying;
});

// Actualizar la barra de progreso en tiempo real
audio.addEventListener('timeupdate', updateProgress);

// Permitir arrastrar la barra de progreso
progressBar.addEventListener('input', () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

// Actualizar la duración total al cargar el audio
audio.addEventListener('loadedmetadata', () => {
    totalDurationEl.textContent = formatTime(audio.duration);
});
