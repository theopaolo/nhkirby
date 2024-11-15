const gsap = window.gsap;
let nextBtns = document.querySelectorAll(".next");
let prevBtns = document.querySelectorAll(".prev");
let slides = document.querySelectorAll(".slides");

let slidesCount = slides.length;
let slidesIndex = 1;
let isLightboxOpen = false;

// Counter
let allimgcount = document.querySelector(".allcount");
let firstall = document.querySelector(".firstall");
let currentimgcount = document.querySelector(".currentcount");

// let twoimgs = document.querySelectorAll(".two-img");
// if (window.innerWidth < 768) {
//   if (twoimgs.length > 0) {
//     twoimgs.forEach(function (el) {
//       el.parentNode.removeChild(el);
//     });
//   }
// }

// const imageCount = imageSlides.length;

allimgcount.innerHTML = slidesCount;
if (firstall) {
  firstall.innerHTML = slidesCount;
}

// Helper function to get slide type
function isImageSlide(slide) {
  return !slide.classList.contains("intro-text");
}

// Crée un mapping entre les indices de slides et les indices d'images
function createImageMapping() {
  const mapping = new Map();
  let imageIndex = 0;

  slides.forEach((slide, slideIndex) => {
    if (isImageSlide(slide)) {
      mapping.set(`image-${imageIndex}`, slideIndex);
      mapping.set(slideIndex, imageIndex);
      imageIndex++;
    }
  });

  return { mapping, totalImages: imageIndex };
}

const { mapping: slideMapping, totalImages } = createImageMapping();



window.addEventListener("load", nameCountHeight);
window.addEventListener("resize", nameCountHeight);

function scrollTop() {
  window.scrollTo(0, 0);
}

function nameCountHeight() {
  if (window.innerWidth < 745) {
    if (slidesIndex === slidesCount) {
      document.body.classList.add("firstSlide");
    } else {
      document.body.classList.remove("firstSlide");
    }
  } else {
    document.body.classList.remove("firstSlide");
    scrollTop();
  }
}

window.addEventListener(
  "keydown",
  function (event) {
    if (event.defaultPrevented) {
      return;
    }

    if (isLightboxOpen) {
      switch (event.code) {
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
      switch (event.code) {
        case "ArrowLeft":
          plusSlides(-1);
          break;
        case "ArrowRight":
          plusSlides(1);
          break;
      }
      event.preventDefault();
    }
  },
  true,
);

showSlides(slidesIndex);


// Next/previous controls
function plusSlides(n) {
  showSlides((slidesIndex += n));
  nameCountHeight();
}

allimgcount.innerHTML = slidesCount;

if (firstall) {
  firstall.innerHTML = slidesCount;
}

function showSlides(n) {
  let i;
  if (n > slidesCount) {
    slidesIndex = 1;
  }
  if (n < 1) {
    slidesIndex = slidesCount;
  }

  // Cache toutes les slides
  for (i = 0; i < slidesCount; i++) {
    slides[i].style.display = "none";
  }

  // Affiche la slide courante
  slidesIndex = getValidSlideIndex(n);
  const currentSlide = slides[slidesIndex - 1];

  if (currentSlide.classList.contains("center")) {
    currentSlide.style.display = "flex";
  } else {
    currentSlide.style.display = "grid";
  }

  // Met à jour le compteur avec le numéro de slide actuel (texte inclus)
  currentimgcount.innerHTML = slidesIndex;

  // Si la lightbox est ouverte et qu'on arrive sur une slide de texte,
  // on passe à la prochaine slide d'image
  if (isLightboxOpen && !isImageSlide(currentSlide)) {
    const nextImageSlide = findNextImageSlide(slidesIndex);
    showSlides(nextImageSlide);
    return;
  }

  // Met à jour la lightbox si elle est ouverte
  if (isLightboxOpen && isImageSlide(currentSlide)) {
    updateLightboxImage(slidesIndex);
  }
}

function findNextImageSlide(currentIndex) {
  let index = currentIndex;
  while (index <= slidesCount) {
    if (isImageSlide(slides[index - 1])) {
      return index;
    }
    index++;
    if (index > slidesCount) index = 1;
  }
  return currentIndex;
}

function updateLightboxImage(slideIndex) {
  const currentSlide = slides[slideIndex - 1];
  if (isImageSlide(currentSlide)) {
    const img = currentSlide.querySelector("img");
    if (img) {
      lighterboxImg.src = img.src;
      const imageIndex = slideMapping.get(slideIndex - 1);
      lighterboxImg.dataset.currentImg = imageIndex;
    }
  }
}

// Event listeners for navigation
prevBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    showSlides(slidesIndex - 1);
    nameCountHeight();
  });
});

nextBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    showSlides(slidesIndex + 1);
    nameCountHeight();
  });
});


// LightboxCode

const lighterboxHTML = `
  <div id="lighterbox" class="lighterbox">
    <img class="lighterbox-content" id="lighterbox-img">
  </div>
`;

// Add the lighterbox HTML to the body
document.body.insertAdjacentHTML("beforeend", lighterboxHTML);

// Get references to the lighterbox elements
const lighterbox = document.getElementById("lighterbox");
const lighterboxImg = document.getElementById("lighterbox-img");
const isBackgroundLight = document.querySelector(".slides .bg-light");

function openLighterbox(imgElement) {
  lighterbox.style.display = "block";
  lighterboxImg.src = imgElement.src;
  const imageIndex = parseInt(imgElement.dataset.index);
  lighterboxImg.dataset.currentImg = imageIndex;
  isLightboxOpen = true;
  lighterbox.classList.add(isBackgroundLight ? "bg-light" : "bg-dark");

  // Trouve la slide correspondante et l'affiche
  const mainSlideIndex = slideMapping.get(`image-${imageIndex}`);
  showSlides(mainSlideIndex + 1);

  gsap.set(lighterbox, { opacity: 0 });
  gsap.to(lighterbox, {
    duration: 0.5,
    opacity: 1,
    ease: "power2.inOut",
  });
}

function navigateLightbox(direction) {
  let currentImageIndex = parseInt(lighterboxImg.dataset.currentImg);
  let newImageIndex = currentImageIndex + direction;

  // Gestion du cycle des images
  if (newImageIndex < 0) newImageIndex = totalImages - 1;
  if (newImageIndex >= totalImages) newImageIndex = 0;

  // Trouve la slide correspondante
  const newSlideIndex = slideMapping.get(`image-${newImageIndex}`);
  lighterboxImg.dataset.currentImg = newImageIndex;
  showSlides(newSlideIndex + 1);
}

// Function to close the lighterbox
function closeLighterbox() {
  gsap.to(lighterbox, {
    duration: 0.5,
    opacity: 0,
    ease: "power2.inOut",
    onComplete: () => {
      lighterbox.style.display = "none";
      isLightboxOpen = false;
      showSlides(slidesIndex);
    },
  });
}


function getValidSlideIndex(index) {
  if (index < 1) return slidesCount;
  if (index > slidesCount) return 1;
  return index;
}

// Add click event listeners to all gallery images
const allImgs = document.querySelectorAll(".gallery img");
allImgs.forEach((img, index) => {
  img.dataset.index = index;
  img.addEventListener("click", function () {
    if (lighterbox.style.display === "block") {
      closeLighterbox();
    } else {
      openLighterbox(this);
    }
  });
});

// Close the lighterbox when clicking the Lightbox
lighterboxImg.addEventListener("click", function (e) {
  closeLighterbox();
});

// Add keyboard support (Esc to close)
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeLighterbox();
  }
});

// FULLSCREEN, VIDEO AND AUDIO
import { handleFullScreen } from "./modules/handleFullscreen.js";
const FULLSCREEN_BUTTON = document.querySelector(".fullscreenbtn");

if (FULLSCREEN_BUTTON) {
  FULLSCREEN_BUTTON.addEventListener("click", () =>
    handleFullScreen(FULLSCREEN_BUTTON),
  );
}

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

document.addEventListener("DOMContentLoaded", () => {
  const players = Array.from(document.querySelectorAll(".video-player")).map(
    (p) => new Plyr(p, { controls }),
  );
});

let playbtn = document.querySelector(".soundbtn");
let audioElement = document.querySelector("audio"); // Corrected spelling
let audioPlaying = false;

function saveAudioTime() {
  localStorage.setItem("audioTime", audioElement.currentTime);
}

function loadAudioTime() {
  let savedTime = localStorage.getItem("audioTime");
  if (savedTime !== null) {
    audioElement.currentTime = parseFloat(savedTime);
  }
}

function savePlayState() {
  localStorage.setItem("audioPlaying", audioPlaying);
}

function loadPlayState() {
  let savedState = localStorage.getItem("audioPlaying");
  return savedState === "true";
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

audioElement.pause();

setInterval(saveAudioTime, 1000);

document.addEventListener("DOMContentLoaded", function () {
  if(!playbtn){
    return
  }
  playbtn.addEventListener("click", playPauseAudio);
  loadAudioTime();
  audioPlaying = loadPlayState();
  if (audioPlaying) {
    audioElement
      .play()
      .catch((e) => console.error("Audio playback failed:", e));
    playbtn.classList.add("active");
  } else {
    audioElement.pause();
    playbtn.classList.remove("active");
  }
});

window.addEventListener("beforeunload", function () {
  saveAudioTime();
  savePlayState();
});
