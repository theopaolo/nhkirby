let playbtn = document.querySelector('.soundbtn');
let audioElement = document.querySelector('audio'); // Corrected spelling
let audioPlaying = false;

function saveAudioTime() {
  console.log('save time"')
    localStorage.setItem('audioTime', audioElement.currentTime);
}

function loadAudioTime() {
    let savedTime = localStorage.getItem('audioTime');
    if (savedTime !== null) {
        audioElement.currentTime = parseFloat(savedTime);
    }
}

function savePlayState() {
    localStorage.setItem('audioPlaying', audioPlaying);
}

function loadPlayState() {
    let savedState = localStorage.getItem('audioPlaying');
    return savedState === 'true';
}

function playPauseAudio() {
  console.log('playp')
    if (audioPlaying) {
        audioElement.pause();
        audioPlaying = false;
        playbtn.classList.remove("active");
    } else {
        audioElement.play();
        audioPlaying = true;
        playbtn.classList.add("active");
    }
    savePlayState();
    console.log("ispaused", audioElement.paused);
}

audioElement.pause(); // Corrected variable name
playbtn.addEventListener("click", playPauseAudio);
setInterval(saveAudioTime, 1000);

document.addEventListener('DOMContentLoaded', function() {
    loadAudioTime();
    audioPlaying = loadPlayState();
    if (audioPlaying) {
        audioElement.play().catch(e => console.error("Audio playback failed:", e));
        playbtn.classList.add("active");
    } else {
        audioElement.pause();
        playbtn.classList.remove("active");
    }
});

window.addEventListener('beforeunload', function() {
    saveAudioTime();
    savePlayState();
});

let introp = document.querySelector('.introduction');

function hideIntro(){
    gsap.to(".introduction", {
        opacity: 0, display:"none", duration: 1
    });
}

let btnintro = document.querySelectorAll('.btnintro');

btnintro.forEach(function(btn){
    btn.addEventListener("click", introClick);
});

let langfr = document.querySelector('.fr');
let langen = document.querySelector('.en');

langfr.addEventListener('mouseleave', function(event){
    gsap.to(".fr", {
        opacity: 0, duration: 0
    });
    gsap.to(".en", {
        opacity: 1, duration: 0
    });
});

langen.addEventListener('mouseleave', function(event){
    gsap.to(".fr", {
        opacity: 1, duration: 0
    });
    gsap.to(".en", {
        opacity: 0, duration: 0
    });
});
