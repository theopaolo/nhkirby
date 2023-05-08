let playbtn = document.querySelector('.soundbtn')
let audioElment = document.querySelector('audio')
let audioPlaying = false;

audioElment.pause();
playbtn.addEventListener("click", playPauseAudio)

function playPauseAudio(){
  if(audioPlaying)
  {
    audioElment.pause()
    audioPlaying = false;
    playbtn.classList.remove("active")
  } else {
    audioElment.play()
    audioPlaying = true;
    playbtn.classList.add("active")
  }
}

// IntroScripts
let introp = document.querySelector('.introduction')
let btnintro = document.querySelectorAll('.btnintro');
let langfr =  document.querySelector('.fr')
let langen =  document.querySelector('.en')

langfr.addEventListener('mouseleave', function(event){
  gsap.set(".fr", { opacity: 0 })
  gsap.set(".en", { opacity: 1 })
});

langen.addEventListener('mouseleave', function(event){
  gsap.set(".fr", { opacity: 1 })
  gsap.set(".en", { opacity: 0 })
});

btnintro.forEach(function(btn, index){
  btn.addEventListener("click", introClick)
})

function introClick() {
  sessionStorage.setItem("entersite", true)
  introp.classList.add("d-none");
  setTimeout(navTranlater(), 500);
}

for(let button of btnintro) {
  button.addEventListener("click", function(){
    sessionStorage.setItem("lang", this.dataset.lang)
    if(sessionStorage.getItem("lang") === "en"){
      document.querySelector('.abouttrans').innerHTML = "about"
      document.querySelector('.seriestrans').innerHTML = "series"
    } else {
      document.querySelector('.abouttrans').innerHTML = "à propos"
      document.querySelector('.seriestrans').innerHTML = "séries"
    }
  })
}

const abouttrans = document.querySelector('.abouttrans');
const seriestrans = document.querySelector('.seriestrans');

function navTranlater(){
  if(sessionStorage.getItem("lang") === "en"){
    abouttrans.innerHTML = "about"
    seriestrans.innerHTML = "series"
  } else {
    abouttrans.innerHTML = "à propos"
    seriestrans.innerHTML = "séries"
  }
}

window.addEventListener("DOMContentLoaded", function(){
  if(sessionStorage.getItem("entersite") == "true"){
    introp.classList.add("d-none");
  }
})
