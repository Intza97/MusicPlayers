let btn = document.querySelectorAll('.song #play_btn');
let song = document.querySelectorAll('#music');

/*parte del reproductor de música emergente*/
let p_m_player = document.querySelector('.popup_music_player');
let down_player = document.querySelector('#down_player');
let current_track_name = document.querySelector('#current_track_name');
let current_singer_name = document.querySelector('#current_singer_name');
let song_img = document.querySelector('.song_img');

/*parte de controles*/
let play_pause_btn = document.querySelector('#play_pause_btn');
let slider = document.querySelector('#slider');
let forward_btn = document.querySelector('#forward_btn');
let backward_btn = document.querySelector('#backward_btn');

/*duración de las canciones*/
let current_duration = document.querySelector('.controlls .progress_part #current_duration');
let total_duration = document.querySelector('.controlls .progress_part #total_duration');

/*parte del reproductor de música pequeño*/
let s_m_player = document.querySelector('.small_music_player');
let playing_img = document.querySelector('.playing_img');
let wave_animation = document.querySelector('.wave_animation');
let up_player = document.querySelector('#up_player');
let song_name = document.querySelector('#song_name');
let artist_name = document.querySelector('#artist_name');

/*valores por defecto*/
let is_song_played = false;
let song_status = false;
let index_no = 0;

btn.forEach((button, index) => {
  button.addEventListener('click', function () {
    s_m_player.style.transform = 'translateY(0px)';
    
    if (index !== index_no) {
      song_status = false;
    }
    
    index_no = index;
    song[index].currentTime = 0;

    song_status ? pause_song() : play_song();
  });
});

/*pausar canción*/
function pause_song() {
  song[index_no].pause();
  song_status = false;
  clearInterval(update_interval);
  wave_animation.style.opacity = '0';
  play_pause_btn.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}

/*Esta función se actualizará cada 1s*/
function update_second() {
  let position = 0;

  if (!isNaN(song[index_no].duration)) {
    position = song[index_no].currentTime * (100 / song[index_no].duration);
    slider.value = position;
  }

  let durationMinutes = Math.floor(song[index_no].duration / 60);
  let durationSeconds = Math.floor(song[index_no].duration - durationMinutes * 60);
  total_duration.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' + durationSeconds : durationSeconds}`;

  let curr_minutes = Math.floor(song[index_no].currentTime / 60);
  let curr_seconds = Math.floor(song[index_no].currentTime - curr_minutes * 60);
  current_duration.textContent = `${curr_minutes}:${curr_seconds < 10 ? '0' + curr_seconds : curr_seconds}`;

  if (song[index_no].ended) {
    clearInterval(update_interval);
    wave_animation.style.opacity = '0';
    play_pause_btn.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
  }
}

/* Mostrar reproductor de música emergente */
up_player.addEventListener('click', function () {
  p_m_player.style.transform = 'translateY(0%)';
});

/* Ocultar reproductor de música emergente */
down_player.addEventListener('click', function () {
  p_m_player.style.transform = 'translateY(110%)';
});

/* Reproduce o pausa la canción dentro del reproductor de música emergente */
play_pause_btn.addEventListener('click', function () {
  song_status ? pause_song() : play_song();
});

/* Cambia la posición del control deslizante */
function change_duration() {
  let slider_position = song[index_no].duration * (slider.value / 100);
  song[index_no].currentTime = slider_position;
}

/* Reproducir canción */
function play_song() {
  song[index_no].play();

  if (is_song_played) {
    document.querySelector(".active_song").pause();
    document.querySelector(".active_song").classList.remove("active_song");
  } else {
    is_song_played = true;
  }

  song[index_no].classList.add("active_song");
  song_status = true;
  setInterval(update_second, 1000);
  wave_animation.style.opacity = '1';
  p_m_player.style.transform = 'translateY(0%)';

  song_img.innerHTML = `<img src="${All_song[index_no].img}" />`;
  playing_img.innerHTML = `<img src="${All_song[index_no].img}" />`;
  song_name.innerHTML = All_song[index_no].name;
  artist_name.innerHTML = All_song[index_no].singer;
  current_track_name.innerHTML = All_song[index_no].name;
  current_singer_name.innerHTML = All_song[index_no].singer;
  play_pause_btn.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}

/* Siguiente canción */
forward_btn.addEventListener('click', function () {
  index_no = (index_no + 1) % All_song.length;
  song[index_no].currentTime = 0;
  play_song();
});

/* Canción anterior */
backward_btn.addEventListener('click', function () {
  index_no = index_no === 0 ? All_song.length - 1 : index_no - 1;
  song[index_no].currentTime = 0;
  play_song();
});
