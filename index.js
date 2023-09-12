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


const showPlayIcon = () => {
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
};


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

const displayTime = (time) => {
    const minutes = Math.floor(time/60);
    let seconds= Math.floor(time % 60);
    if (seconds < 10 ){
        seconds=`0${seconds}`;
    }
    return`${minutes}:${seconds}`

}

const updateProgress = () => {
    progressBar.style.width = `${(video.currentTime / video.duration) *100}%`;
    currentTime.textContent = `${displayTime(video.currentTime)} /`;
    duration.textContent = `${displayTime(video.duration)}`;
}

const setProgress = (e) => {
    const newTime = e.offsetX / progressRange.offsetWidth;
    progressBar.style.width = `${(newTime * 100)}%`;
    video.currentTime = newTime * video.duration;
}

// Event listeners
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('ended', showPlayIcon);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress)

