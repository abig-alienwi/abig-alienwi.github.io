/* =========================
   PLAYLIST
========================= */

const songs = [

    {
        title: "Out of my league",
        artist: "Fitz and The Tantrums",
        file: "Out of my league.mp3"
    },

    {
        title: "Love wins all",
        artist: "IU",
        file: "Love wins all.mp3"
    },

    {
        title: "Glue Song (ft. Clairo)",
        artist: "beabadoobee, Clairo",
        file: "Glue song.mp3"
    },

    {
        title: "Risk It All",
        artist: "Bruno Mars",
        file: "Risk it all.mp3"
    },

    {
        title: "A Night to Remember",
        artist: "Laufey & beabadoobee",
        file: "A Night to Remember.mp3"
    },

    {
        title: "Valentine",
        artist: "Laufey",
        file: "Valentine.mp3"
    },

    {
        title: "Only",
        artist: "LEEHI",
        file: "Only.mp3"
    }
];


/* =========================
   VARIABLES
========================= */

let currentSong = 0;

let isPlaying = false;


/* =========================
   ELEMENTOS
========================= */

const audio = document.getElementById("audio");

const playButton =
    document.getElementById("playButton");

const currentSongElement =
    document.getElementById("currentSong");

const currentArtistElement =
    document.getElementById("currentArtist");

const progressBar =
    document.querySelector(".progress-bar");

const progressContainer =
    document.querySelector(".progress");


/* =========================
   CARGAR CANCIÓN
========================= */

function loadSong(index) {

    currentSong = index;

    const song = songs[currentSong];

    currentSongElement.textContent =
        song.title;

    currentArtistElement.textContent =
        song.artist;

    audio.src = song.file;

    audio.load();

    updateActiveSong();

    if (progressBar) {
        progressBar.style.width = "0%";
    }

}


/* =========================
   REPRODUCIR CANCIÓN
========================= */

function playSong(index) {

    loadSong(index);

    audio.play()
        .then(() => {

            isPlaying = true;

            updatePlayButton();

        })
        .catch((error) => {

            console.error(
                "No se pudo reproducir el MP3:",
                error
            );

            alert(
                "No se pudo reproducir la canción. Revisa que el MP3 esté dentro de la carpeta music ♡"
            );

        });

}


/* =========================
   PLAY / PAUSE
========================= */

function togglePlay() {

    if (!audio.src) {

        loadSong(currentSong);

    }


    if (isPlaying) {

        audio.pause();

    } else {

        audio.play()
            .then(() => {

                isPlaying = true;

                updatePlayButton();

            })
            .catch((error) => {

                console.error(error);

                alert(
                    "No se pudo reproducir el MP3 ♡"
                );

            });

    }

}


/* =========================
   BOTÓN PLAY
========================= */

function updatePlayButton() {

    if (!playButton) return;

    if (isPlaying) {

        playButton.textContent = "❚❚";

    } else {

        playButton.textContent = "▶";

    }

}


/* =========================
   SIGUIENTE
========================= */

function nextSong() {

    currentSong++;

    if (currentSong >= songs.length) {

        currentSong = 0;

    }

    playSong(currentSong);

}


/* =========================
   ANTERIOR
========================= */

function previousSong() {

    if (audio.currentTime > 3) {

        audio.currentTime = 0;

        return;

    }

    currentSong--;

    if (currentSong < 0) {

        currentSong = songs.length - 1;

    }

    playSong(currentSong);

}


/* =========================
   CANCIÓN TERMINADA
========================= */

audio.addEventListener(
    "ended",
    function () {

        nextSong();

    }
);


/* =========================
   PLAY
========================= */

audio.addEventListener(
    "play",
    function () {

        isPlaying = true;

        updatePlayButton();

    }
);


/* =========================
   PAUSE
========================= */

audio.addEventListener(
    "pause",
    function () {

        isPlaying = false;

        updatePlayButton();

    }
);


/* =========================
   BARRA DE PROGRESO
========================= */

audio.addEventListener(
    "timeupdate",
    function () {

        if (!audio.duration) return;

        const percentage =
            (audio.currentTime /
             audio.duration) * 100;

        if (progressBar) {

            progressBar.style.width =
                percentage + "%";

        }

        updateTime();

    }
);


/* =========================
   DURACIÓN
========================= */

audio.addEventListener(
    "loadedmetadata",
    function () {

        updateTime();

    }
);


/* =========================
   HACER CLIC EN LA BARRA
========================= */

if (progressContainer) {

    progressContainer.addEventListener(
        "click",
        function (event) {

            if (!audio.duration) return;

            const width =
                progressContainer.clientWidth;

            const clickX =
                event.offsetX;

            audio.currentTime =
                (clickX / width) *
                audio.duration;

        }
    );

}


/* =========================
   TIEMPO
========================= */

function updateTime() {

    const currentTime =
        document.getElementById(
            "currentTime"
        );

    const duration =
        document.getElementById(
            "duration"
        );


    if (currentTime) {

        currentTime.textContent =
            formatTime(audio.currentTime);

    }


    if (
        duration &&
        audio.duration
    ) {

        duration.textContent =
            formatTime(audio.duration);

    }

}


/* =========================
   FORMATO DEL TIEMPO
========================= */

function formatTime(seconds) {

    if (
        !seconds ||
        isNaN(seconds)
    ) {

        return "0:00";

    }

    const minutes =
        Math.floor(seconds / 60);

    const remainingSeconds =
        Math.floor(seconds % 60);

    return (
        minutes +
        ":" +
        remainingSeconds
            .toString()
            .padStart(2, "0")
    );

}


/* =========================
   CANCIÓN ACTIVA
========================= */

function updateActiveSong() {

    const songElements =
        document.querySelectorAll(".song");

    songElements.forEach(
        (songElement, index) => {

            songElement.classList.toggle(
                "active",
                index === currentSong
            );

        }
    );

}


/* =========================
   BOTÓN DE LA PORTADA
========================= */

function scrollToPlaylist() {

    const playlist =
        document.getElementById(
            "playlist"
        );

    if (playlist) {

        playlist.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* =========================
   INICIAR
========================= */

loadSong(0);

updatePlayButton();