// Task:
// - Add the functionality to play, pause and stop the jingling bells (bells.mp3).

// Stretch goals:
// - Add volume controls.
// - Allow the user to select different sounds.

const playBtn = document.getElementById("play-btn");
const pauseBtn = document.getElementById("pause-btn");
const stopBtn = document.getElementById("stop-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

const greeting = document.getElementById("greeting");
const trackDetailsDisplay = document.getElementById("song-details");

const volumeSlider = document.getElementById("volume-slider");

const volumeDisplay = document.getElementById("volume-display");
const volumeDisplayIcon = document.getElementById("volume-display-icon");
const muteBtn = document.getElementById("mute-icon");

const audio = document.getElementById('audio');

const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');

const currentPlayingTime = document.getElementById('current-time');
const totalTime = document.getElementById('total-time');


// Check Mute State
let muteState = 'unmute';
// Check if Playing
let isPlaying = false;
// Set Current Song to First Song in the Array
let currentTrackIndex = 0;

// Display Volume Value at the Start
volumeDisplay.textContent = volumeSlider.value;

// Setup for the Playlist
// Add any audioTracks, name should be equal to Audio file name
const audioTracks = [
  {
    name: 'christmas-01',
    displayName: 'Christmas 2',
    artist: 'Amusicmedia',
  },
  {
    name: 'christmas-02',
    displayName: 'Amazing Grace of Christmas',
    artist: 'Oleksii Kaplunskyi',
  },
  {
    name: 'christmas-03',
    displayName: 'Jingle Bells',
    artist: 'Oleksii Kaplunskyi',
  },
  {
    name: 'christmas-04',
    displayName: 'Christmas Cinematic Dream Piano',
    artist: 'Oleksii Kaplunskyi',
  },
  {
    name: 'christmas-05',
    displayName: 'Jingle Bells 3',
    artist: 'Kevin MacLeod',
  }
]

// Play Current Track
function playTrack() {
  hideElement();
  isPlaying = true;
  audio.play();
  trackDetailsDisplay.textContent = `${audioTracks[currentTrackIndex].displayName} by ${audioTracks[currentTrackIndex].artist}`;
}

// Pause Current Track
function pauseTrack() {
  hideElement();
  isPlaying = false;
  audio.pause();
}

// Stop Current Track
function stopTrack() {
  // Check if playing to avoid Play/Pause Button Switching
  if (isPlaying) {
    hideElement();
  }
  isPlaying = false;
  progress.style.width = 0;
  audio.pause();
  audio.currentTime = 0;
  currentPlayingTime.textContent = '00:00';
}

// Play Previous Audio Track
function prevSong() {
  currentTrackIndex--;
  if (currentTrackIndex < 0) {
    currentTrackIndex = audioTracks.length - 1;
  }
  loadAudio(audioTracks[currentTrackIndex]);
  if (isPlaying) {
    hideElement();
    playTrack();
  }
  progress.style.width = '0%';
  currentPlayingTime.textContent = '00:00';
  totalTime.textContent = '00:00';
}

// Play Next Audio Track
function nextSong() {
  currentTrackIndex++;
  if (currentTrackIndex > audioTracks.length - 1) {
    currentTrackIndex = 0;
  }
  loadAudio(audioTracks[currentTrackIndex]);
  if (isPlaying) {
    hideElement();
    playTrack();
  }
  progress.style.width = '0%';
  currentPlayingTime.textContent = '00:00';
  totalTime.textContent = '00:00';
}

// Hide Play/Pause Button
function hideElement() {
  playBtn.classList.toggle("hide-element");
  pauseBtn.classList.toggle("hide-element");
}

// Mute Audio
function muteTrack () {
  if (muteState === 'unmute') {
    volumeDisplayIcon.textContent = 'volume_off';
    audio.muted = true;
    muteState = 'mute';
  } else {
    volumeDisplayIcon.textContent = 'volume_up';
    audio.muted = false;
    muteState = 'unmute';
  }
}

// Volume Slider
function volSlider(e) {
  const value = e.target.value;
  volumeDisplay.textContent = value;
  audio.volume = value / 100;
  changeVolumeIcon(e);
}

// Different Stat icons depending on volume
function changeVolumeIcon(e) {
  if (e.target.value <= 0) {
    volumeDisplayIcon.textContent = 'volume_mute';
  } else if (e.target.value > 0 && e.target.value < 50) {
    volumeDisplayIcon.textContent = 'volume_down';
  } else {
    volumeDisplayIcon.textContent = 'volume_up';
  }
}

// Audio Track Progress bar
function updateProgressBar(e) {
  if (isPlaying) {
    // Destructre 
    const { duration, currentTime } = e.srcElement;

    // Update Progressbar
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Update Current Duration for the Track Being Played
    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);

    // Add a preceeding 0 if the minutes or seconds are less than 10
    if (currentMinutes < 10) {
      currentMinutes = `0${currentMinutes}`;
    }

    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }

    currentPlayingTime.textContent = `${currentMinutes}:${currentSeconds}`;

    // Update Total Duration for the Track Being Played
    let durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);

    if (durationMinutes < 10) {
      durationMinutes = `0${durationMinutes}`;
    }

    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    
    if (durationSeconds) {
      totalTime.textContent = `${durationMinutes}:${durationSeconds}`;
    }
  }
}

function loadAudio(audioTracks) {
  trackDetailsDisplay.textContent = `${audioTracks.displayName} by ${audioTracks.artist}`;
  audio.src = `music/${audioTracks.name}.mp3`;
}



function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = audio;

  audio.currentTime = (clickX / width) * duration;
}


function changeColor() {
  greeting.style.color = generateColors();
  trackDetailsDisplay.style.color = generateColors();
}

// Change Greeting Message color (generated randomly) every two seconds
setInterval(changeColor, 2000);

// Generate Random Color for the message
function generateColors() {
  const colors = [
    '#E91E63',
    '#8E24AA',
    '#880E4F',
    '#2196F3',
    '#00796B',
    '#6200EA',
    '#0277BD',
    '#FB8C00',
    '#512DA8',
    '#0D47A1',
    '#E65100',
    '#757575',
    '#DD2C00',
    '#455A64',
    '#1B5E20',
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  return randomColor;
}

// Render a Random Background Image
function renderBGImage() {
  const clientID = "709538-8c543d4983ce23314eb672abd";
  const url = `https://pixabay.com/api/?key=${clientID}&q=christmas&image_type=photo&orientation=horizontal`;

  fetch(url)
    .then((response) => response.json())
    .then((jsonData) => {
      let randomImage = 0;
      if (jsonData.totalHits <= 20) {
        randomImage = Math.floor(Math.random() * jsonData.totalHits);
      } else {
        randomImage = Math.floor(Math.random() * 20);
      }
      document.body.style.backgroundImage = `url(${jsonData.hits[randomImage].largeImageURL})`;
    })
    .catch((error) => {
      console.log(error);
      document.body.style.backgroundImage = "url('images/christmas_bg.jpg')";
    })
}

// Event listners
playBtn.addEventListener("click", playTrack);
pauseBtn.addEventListener("click", pauseTrack);
stopBtn.addEventListener("click", stopTrack);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
volumeSlider.addEventListener('input', volSlider);
muteBtn.addEventListener("click", muteTrack);
audio.addEventListener('timeupdate', updateProgressBar);
// Detect end of an audio being played and trigger the next audio track
audio.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgressBar);


// Change Background Image after 10 secs.
setInterval(renderBGImage, 10000);