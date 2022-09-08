
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
        console.log("ispaused",audioElment.paused);
      } else {
        audioElment.play()
        audioPlaying = true;
        playbtn.classList.add("active")
        console.log("ispaused",audioElment.paused);
      }
    }

    let introp = document.querySelector('.introduction')

    function hideIntro(){
      gsap.to(".introduction", {
        opacity: 0, display:"none", duration: 1
      })
    }

   let btnintro = document.querySelectorAll('.btnintro');

    btnintro.forEach(function(btn){
      btn.addEventListener("click", introClick)
    })

    let langfr =  document.querySelector('.fr')
    let langen =  document.querySelector('.en')

    langfr.addEventListener('mouseleave', function(event){
      gsap.to(".fr", {
        opacity: 0, duration: 0
      })
      gsap.to(".en", {
        opacity: 1, duration: 0
      })
    });

    langen.addEventListener('mouseleave', function(event){
      gsap.to(".fr", {
        opacity: 1, duration: 0
      })
      gsap.to(".en", {
        opacity: 0, duration: 0
      })
    });