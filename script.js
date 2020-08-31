
var video = document.querySelector('video');
var progressRange = document.querySelector('.progress-range');
var progressBar = document.querySelector('.progress-bar');
var playBtn = document.getElementById('play-btn');
var volumeIcon = document.getElementById('volume-icon');

var volumeRange = document.querySelector('.volume-range');
var volumeBar = document.querySelector('.volume-bar');
var currentTime = document.querySelector('.time-elapsed');
var duration = document.querySelector('.time-duration');
var fullScreen = document.querySelector('.full-screen');

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



// Fullscreen ------------------------------- //






// Event listeners
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);

