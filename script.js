
var player = document.querySelector('.player');
var video = document.querySelector('video');
var progressRange = document.querySelector('.progress-range');
var progressBar = document.querySelector('.progress-bar');
var playBtn = document.getElementById('play-btn');
var volumeIcon = document.getElementById('volume-icon');
var volumeRange = document.querySelector('.volume-range');
var volumeBar = document.querySelector('.volume-bar');
var currentTime = document.querySelector('.time-elapsed');
var duration = document.querySelector('.time-duration');
var fullscreenBtn = document.querySelector('.full-screen');
var speed = document.querySelector('.player-speed');


// Play & Pause ----------------------------------- //

function showPlayIcon() {
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
}

function togglePlay(){
    if (video.paused) {
        video.play();
        playBtn.classList.replace('fa-play', 'fa-pause');
    }
    else {
        video.pause();
        showPlayIcon();
    }
}

// On video end, show playbuttton
video.addEventListener('ended', showPlayIcon);


// Progress Bar ---------------------------------- //

// Calculate display dime format
function displayTime(time) {
    const minutes = Math.floor(time/60);
    var seconds = Math.floor(time) % 60;
    //console.log(seconds);
    seconds = (seconds>9) ? seconds : `0${seconds}`;
    //console.log(minutes + ":" + seconds);
    return `${minutes}:${seconds}`;
}



// Update progress bar as video plays
function updateProgress() {
    //console.log('currenTime', video.currentTime, 'duration', video.duration);
    progressBar.style.width = `${(video.currentTime/video.duration)*100}%`;
    currentTime.textContent = `${displayTime(video.currentTime)} /`;
    duration.textContent = `${displayTime(video.duration)}`;
}

//click to seek within the video
function setProgress(e) {
    const newTime = e.offsetX / progressRange.offsetWidth;
    console.log(newTime);
    progressBar.style.width = `${newTime * 100}%`;
    video.currentTime = newTime * video.duration;
    
}



// Volume Controls --------------------------- //

let lastVolume = 1;




function changeVolume(e) {
    let volume = e.offsetX/volumeRange.offsetWidth;

    //rounding volume up or down
    if (volume < 0.1){
        volume = 0;
    }
    if (volume > 0.9) {
        volume = 1;
    }
    volumeBar.style.width = `${volume*100}%`;
    video.volume = volume;
    //console.log(volume);

    //change volume icon depending on volume
    // so remove all css from volume icon
    volumeIcon.className = "";
    // now we'll add back an icon depending on volume level
    if (volume > .7) {
        volumeIcon.classList.add("fas", "fa-volume-up");
    } else if (volume < .7 && volume > 0){
        volumeIcon.classList.add("fas", "fa-volume-down");
    } else if (volume === 0) {
        volumeIcon.classList.add("fas", "fa-volume-off");
    }

    lastVolume = volume;
}

//Mute/unmute
function toggleMute() {

    volumeIcon.className = "";

    if (video.volume) {
        lastVolume = video.volume;
        video.volume = 0;
        volumeBar.style.width = 0;
        volumeIcon.classList.add("fas", "fa-volume-mute");
        volumeIcon.setAttribute("title", "Unmute");
    } else {
        video.volume = lastVolume;
        volumeBar.style.width = `${lastVolume*100}%`;
        if(lastVolume>.7){
            volumeIcon.classList.add("fas", "fa-volume-up");
        }
        else if (lastVolume < .7 && lastVolume > 0){
            volumeIcon.classList.add("fas", "fa-volume-down");
        }
        volumeIcon.setAttribute("title", "Mute");
    }
}



// Change Playback Speed -------------------- //

function changeSpeed() {
    console.log('video playback rate', video.playbackRate);
    console.log('selected value', speed.value);

    video.playbackRate = speed.value;
}


// Fullscreen ------------------------------- //


/* View in fullscreen */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }

    video.classList.add('video-fullscreen');
  }
  
  /* Close fullscreen */
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
      document.msExitFullscreen();
    }

    video.classList.remove('video-fullscreen');
  }


let fullscreen = false;

//toggle fullscreen
function toggleFullscreen() {
    if(!fullscreen) {
        openFullscreen(player);
    } 
    else {
        closeFullscreen();
    }

    fullscreen = !fullscreen;
}


// Event listeners
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change', changeSpeed);
fullscreenBtn.addEventListener('click', toggleFullscreen);
