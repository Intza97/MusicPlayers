let All_song = [
  {
    name: "Dákiti",
    path: "assets/songs/music1.mp3",
    img: "assets/img/music1.jpg",
    singer: "Bad Bunny, Jhay Cortez"
  },
  {
    name: "Tusa",
    path: "assets/songs/music2.mp3",
    img: "assets/img/music2.jpg",
    singer: "KAROL G, Nicki Minaj"
  },
  {
    name: "Se Preparó",
    path: "assets/songs/music3.mp3",
    img: "assets/img/music3.jpg",
    singer: "Ozuna"
  },
  {
    name: "Despacito",
    path: "assets/songs/music4.mp3",
    img: "assets/img/music4.jpg",
    singer: "Luis Fonsi, Daddy Yankee"
  },
  {
    name: "Es Un Secreto",
    path: "assets/songs/music5.mp3",
    img: "assets/img/music5.jpg",
    singer: "Plan B"
  },
  {
    name: "Hawái",
    path: "assets/songs/music6.mp3",
    img: "assets/img/music6.jpg",
    singer: "Maluma"
  }
];

/*pistas*/
let tracks = document.querySelector('.tracks');

//creando una lista o generando HTML
for (let i = 0; i < All_song.length; i++) {

  let Html = ` <div class="song">
      <div class="img">
      <img src="${All_song[i].img}"/>
      </div>
      <div class="more">
      <audio src="${All_song[i].path}" id="music"></audio>
      <div class="song_info">
         <p id="title">${All_song[i].name}</p>
         <p>${All_song[i].singer}</p>
      </div>
      <button id="play_btn"><i class="fa fa-angle-right" aria-hidden="true"></i></button>
      </div>
    </div>`;

  tracks.insertAdjacentHTML("beforeend", Html);
};