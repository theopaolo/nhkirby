const gsap = window.gsap;
let nextBtn = document.querySelector('.next')
let prevBtn = document.querySelector('.prev')
let slides = document.querySelectorAll(".slides")

let slidesCount = slides.length
let slidesIndex = 1

// Counter
let allimgcount = document.querySelector(".allcount")
let firstall = document.querySelector(".firstall")
let currentimgcount = document.querySelector(".currentcount")
let twoimgs = document.querySelectorAll(".two-img")
let isLightboxOpen = false;
if(window.innerWidth < 768) {
  if(twoimgs.length > 0) {
    twoimgs.forEach( function(el) {
      el.parentNode.removeChild(el);
    })
  }
}

showSlides(slidesIndex);

window.addEventListener("load", nameCountHeight)
window.addEventListener('resize', nameCountHeight)

function scrollTop() {
  window.scrollTo(0, 0);
}

function nameCountHeight() {
  let overlay = document.querySelector('.overlay')
  overlay.style.opacity = 0
  setTimeout(() => {overlay.style.display = "none"}, 1000)

  if(window.innerWidth < 745){
    document.body.classList.add('firstSlide')
    console.log(slidesIndex);
    if(slidesIndex > 1) {
      document.body.classList.remove('firstSlide')
    }
    if(slidesIndex === 2) {
      scrollTop()
    }
  } else {
    document.body.classList.remove('firstSlide')
  }
}

window.addEventListener("keydown", function(event) {
  if (event.defaultPrevented) {
    return;
  }

  if (isLightboxOpen) {
    switch(event.code) {
      case "ArrowLeft":
        navigateLightbox(-1);
        break;
      case "ArrowRight":
        navigateLightbox(1);
        break;
      case "Escape":
        closeLighterbox();
        break;
    }
    event.preventDefault();
  } else {
    switch(event.code) {
      case "ArrowLeft":
        plusSlides(-1);
        break;
      case "ArrowRight":
        plusSlides(1);
        break;
    }
    event.preventDefault();
  }
}, true);

// Next/previous controls
function plusSlides(n) {
  showSlides(slidesIndex += n);
  nameCountHeight()
}

allimgcount.innerHTML = slidesCount


  if(firstall) {
    firstall.innerHTML = slidesCount
  }

function showSlides(n) {
  slidesIndex = getValidSlideIndex(n);
  let i;
  if (n > slidesCount) {slidesIndex = 1}
  if (n < 1) {slidesIndex = slidesCount}

  for (i = 0; i < slidesCount; i++) {
    slides[i].style.display = "none";
  }

  if(slides[slidesIndex-1].classList.contains('center')) {
    slides[slidesIndex-1].style.display = "flex";
  } else {
    slides[slidesIndex-1].style.display = "grid";
  }
  currentimgcount.innerHTML = slidesIndex

  if (isLightboxOpen) {
    updateLightboxImage(slidesIndex);
  }
}

function updateLightboxImage(slideIndex) {
  const images = document.querySelectorAll('.gallery img');
  const imageIndex = slideIndex - 2; // Adjust for 0-based index and skipping first slide

  if (imageIndex >= 0 && imageIndex < images.length) {
    lighterboxImg.src = images[imageIndex].src;
    lighterboxImg.dataset.currentImg = imageIndex;
  }
}

prevBtn.addEventListener('click', ()=>{
  showSlides(slidesIndex += -1)
  nameCountHeight()
})

nextBtn.addEventListener('click', ()=>{
  showSlides(slidesIndex += 1)
  nameCountHeight()
})

const controls = `
<div class="plyr__controls">
    <button type="button" class="plyr__control" data-plyr="fullscreen">
      FULLSCREEN
    </button>

    <div class="plyr_duration_times">
      <div class="plyr__time plyr__time--current" aria-label="Current time">00:00</div>
      <div class="plyr__time plyr__time--duration" aria-label="Duration">00:00</div>
    </div>

    <div class="plyr__volume">
        <input data-plyr="volume" type="range" min="0" max="1" step="0.05" value="1" autocomplete="off" aria-label="Volume">
    </div>

    <div class="plyr__progress">
      <input data-plyr="seek" type="range" min="0" max="100" step="0.01" value="0" aria-label="Seek">
      <progress class="plyr__progress__buffer" min="0" max="100" value="0">% buffered</progress>
      <span role="tooltip" class="plyr__tooltip">00:00</span>
    </div>
</div>

<button type="button" class="plyr__control plyr__control--overlaid" data-plyr="play" aria-pressed="false" aria-label="Play"><svg aria-hidden="true" focusable="false"><use xlink:href="#plyr-play"></use></svg><span class="plyr__sr-only">Play</span></button>
`;

document.addEventListener('DOMContentLoaded', () => {
  const players = Array.from(document.querySelectorAll('.video-player')).map((p) => new Plyr(p, {controls}));
});


const lighterboxHTML = `
  <div id="lighterbox" class="lighterbox">
    <img class="lighterbox-content" id="lighterbox-img">
  </div>
`;

// Add the lighterbox HTML to the body
document.body.insertAdjacentHTML('beforeend', lighterboxHTML);

// Get references to the lighterbox elements
const lighterbox = document.getElementById('lighterbox');
const lighterboxImg = document.getElementById('lighterbox-img');

// Create close button
// Function to open the lighterbox
function openLighterbox(imgElement) {
  lighterbox.style.display = 'block';
  lighterboxImg.src = imgElement.src;
  lighterboxImg.dataset.currentImg = imgElement.dataset.index;
  isLightboxOpen = true;

  // Synchronize main slides with lightbox
  showSlides(parseInt(imgElement.dataset.index) + 2); // +2 to account for 1-based index and skipping first slide

  gsap.set(lighterbox, { opacity: 0 });
  gsap.to(lighterbox, {
    duration: 0.5,
    opacity: 1,
    ease: "power2.inOut"
  });
}

function navigateLightbox(direction) {
  const images = document.querySelectorAll('.gallery img');
  let newIndex = parseInt(lighterboxImg.dataset.currentImg) + direction;

  if (newIndex < 0) newIndex = images.length - 1;
  if (newIndex >= images.length) newIndex = 0;

  lighterboxImg.src = images[newIndex].src;
  lighterboxImg.dataset.currentImg = newIndex;

  let newSlideIndex = newIndex + 2; // +2 because slidesIndex is 1-based and we're skipping the first slide
  if (newSlideIndex > slidesCount) newSlideIndex = 2; // Wrap to the second slide (first image slide)

  // Update main slides
  showSlides(newSlideIndex);
}

// Function to close the lighterbox
function closeLighterbox() {
  gsap.to(lighterbox, {
    duration: 0.5,
    opacity: 0,
    ease: "power2.inOut",
    onComplete: () => {
      lighterbox.style.display = 'none';
      isLightboxOpen = false;

      // Ensure we're showing the correct slide in the main slideshow
      let currentImageIndex = parseInt(lighterboxImg.dataset.currentImg);
      let correctSlideIndex = currentImageIndex + 2; // +2 to account for 1-based index and text slide
      showSlides(correctSlideIndex);
    }
  });
}


function getValidSlideIndex(index) {
  if (index < 1) return slidesCount;
  if (index > slidesCount) return 2; // Skip to the second slide (first image slide)
  return index;
}

// Add click event listeners to all gallery images
const allImgs = document.querySelectorAll(".gallery img");
allImgs.forEach((img,index) => {
  img.dataset.index = index;
  img.addEventListener('click', function() {
    if (lighterbox.style.display === 'block') {
      closeLighterbox();
    } else {
      openLighterbox(this);
    }
  });
});

// Close the lighterbox when clicking the Lightbox
lighterboxImg.addEventListener('click', function(e) {
  closeLighterbox();
});


// Add keyboard support (Esc to close)
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeLighterbox();
  }
});

function loadAudioTime() {
  let savedTime = localStorage.getItem('audioTime');
  if (savedTime !== null) {
      audioElement.currentTime = parseFloat(savedTime);
  }
}

let playbtn = document.querySelector('.soundbtn');
let audioElement = document.querySelector('audio'); // Corrected spelling
let audioPlaying = false;

function saveAudioTime() {
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
