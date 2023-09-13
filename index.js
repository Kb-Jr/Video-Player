const player = document.querySelector('.player');
const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');
const speed = document.querySelector('.player-speed');

const showPlayIcon = () => {
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
};

// Toggle between Play and Pause
const togglePlay = () => {
    if (video.paused){
        video.play();
        playBtn.classList.replace('fa-play', 'fa-pause');
        playBtn.setAttribute('title', 'Pause');
    }
    else {
        video.pause();
        showPlayIcon();
        
    }

};


// Time elapsed / duration
const displayTime = (time) => {
    const minutes = Math.floor(time/60);
    let seconds= Math.floor(time % 60);
    if (seconds < 10 ){
        seconds=`0${seconds}`;
    }
    return`${minutes}:${seconds}`

};


// Update Progress Bar
const updateProgress = () => {
    progressBar.style.width = `${(video.currentTime / video.duration) *100}%`;
    currentTime.textContent = `${displayTime(video.currentTime)} /`;
    duration.textContent = `${displayTime(video.duration)}`;
};


// set Progress Bar
const setProgress = (e) => {
    const newTime = e.offsetX / progressRange.offsetWidth;
    progressBar.style.width = `${(newTime * 100)}%`;
    video.currentTime = newTime * video.duration;
};

let lastVolume = 1;


// Toggle Volume and appearance
const changeVolume = (e) => {
    let volume = e.offsetX / volumeRange.offsetWidth;

    if (volume < 0.1){
        volume = 0;
    }
    if (volume > 0.9){
        volume = 1;
    }

    volumeBar.style.width = `${volume * 100}%`;
    video.volume =  volume;

    volumeIcon.className = '';
    if (volume > 0.5){
        volumeIcon.classList.add('fa-solid', 'fa-volume-high');
    }
    else if (volume < 0.5 && volume > 0){
        volumeIcon.classList.add('fa-solid','fa-volume-low');
    }
    else if (volume === 0){
        volumeIcon.classList.add('fa-solid','fa-volume-off');
    }

    lastVolume = volume;
};

// Mute and Unmute

const toggleMute = () => {
    volumeIcon.className = '';
    if (video.volume){
        lastVolume = video.volume;
        video.volume = 0;
        volumeBar.style.width = 0;
        volumeIcon.classList.add('fa-solid', 'fa-volume-xmark');
        volumeIcon.setAttribute('title', 'Unmute');
    }

    else{
        video.volume = lastVolume;
        volumeBar.style.width = `${lastVolume * 100}%`;

        if (lastVolume > 0.5){
            volumeIcon.classList.add('fa-solid', 'fa-volume-high');
        }
        else if (lastVolume < 0.5 && lastVolume > 0){
            volumeIcon.classList.add('fa-solid','fa-volume-low');
        }

        volumeIcon.setAttribute('title', 'Mute');

    }

};

// Set Play Back rate
const changeSpeed = () => {
    video.playbackRate = speed.value;
};

// const resetPlayspeed = () => {
//     video.playbackRate = 1;

// };

/* View in fullscreen */
const openFullscreen = (elem) => {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }

    video.classList.add('video-fullscreen');
    
  };
  
  /* Close fullscreen */
  const closeFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }

    video.classList.remove('video-fullscreen');

  };


let fullscreen = false;

//Toggle Fullscreen
const toggleFullscreen = () => {
    if (!fullscreen){
        openFullscreen(player);
    }

    else {
        closeFullscreen();
    }

    fullscreen = !fullscreen;
    
};


// Event listeners
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('ended', showPlayIcon);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change', changeSpeed);
// video.addEventListener('ended', resetPlayspeed);
fullscreenBtn
.addEventListener('click', toggleFullscreen);
