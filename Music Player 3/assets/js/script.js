let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume= document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');

let timer;
let autoplay = 0;
let index_no = 0;
let Playing_song = false;

// Crear un elemento de audio
let track = document.createElement('audio');

// Lista de todas las canciones
let All_song = [
   {
     name: "Mood",
     path: "assets/songs/music1.mp3",
     img: "assets/img/music1.jpg",
     singer: "lost. & Pop Mage"
   },
   {
     name: "Halo",
     path: "assets/songs/music2.mp3",
     img: "assets/img/music2.jpg",
     singer: "Hannah Gracelynn, lost., Pop Mage"
   },
   {
     name: "abcdefu",
     path: "assets/songs/music3.mp3",
     img: "assets/img/music3.jpg",
     singer: "Honeyfox, lost., Pop Mage"
   },
   {
     name: "Memories",
     path: "assets/songs/music4.mp3",
     img: "assets/img/music4.jpg",
     singer: "Benlon, Pop Mage"
   },
   {
     name: "Attention",
     path: "assets/songs/music5.mp3",
     img: "assets/img/music5.jpg",
     singer: "Harley Bird, lost. & Pop Mage"
   }
];

// Cargar la pista
function load_track(index_no){
	clearInterval(timer);
	reset_slider();

	track.src = All_song[index_no].path;
	title.innerHTML = All_song[index_no].name;	
	track_image.src = All_song[index_no].img;
    artist.innerHTML = All_song[index_no].singer;
    track.load();

	timer = setInterval(range_slider, 1000);
	total.innerHTML = All_song.length;
	present.innerHTML = index_no + 1;
}

load_track(index_no);

// Función para silenciar el sonido
function mute_sound(){
	track.volume = 0;
	volume.value = 0;
	volume_show.innerHTML = 0;
}

// Comprobar si la canción está en reproducción o no
function justplay(){
 	if(!Playing_song){
 		playsong();
 	} else {
 		pausesong();
 	}
}

// Reiniciar el deslizador de la canción
function reset_slider(){
 	slider.value = 0;
}

// Reproducir canción
function playsong(){
  track.play();
  Playing_song = true;
  play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}

// Pausar canción
function pausesong(){
	track.pause();
	Playing_song = false;
	play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}

// Siguiente canción
function next_song(){
	if(index_no < All_song.length - 1){
		index_no += 1;
		load_track(index_no);
		playsong();
	} else {
		index_no = 0;
		load_track(index_no);
		playsong();
	}
}

// Canción anterior
function previous_song(){
	if(index_no > 0){
		index_no -= 1;
		load_track(index_no);
		playsong();
	} else {
		index_no = All_song.length - 1; 
		load_track(index_no);
		playsong();
	}
}

// Cambiar volumen
function volume_change(){
	volume_show.innerHTML = recent_volume.value;
	track.volume = recent_volume.value / 100;
}

// Cambiar posición del deslizador 
function change_duration(){
	let slider_position = track.duration * (slider.value / 100);
	track.currentTime = slider_position;
}

// Función de reproducción automática
function autoplay_switch(){
	if (autoplay === 1){
       autoplay = 0;
       auto_play.style.background = "rgba(255,255,255,0.2)";
	} else {
       autoplay = 1;
       auto_play.style.background = "#148F77";
	}
}

function range_slider(){
	let position = 0;
	if(!isNaN(track.duration)){
		position = track.currentTime * (100 / track.duration);
		slider.value = position;
	}
	if(track.ended){
		play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
		if(autoplay === 1){
			index_no = (index_no + 1) % All_song.length;
			load_track(index_no);
			playsong();
		}
	}
}