const gsap = window.gsap;
console.log('serie gspa', gsap)
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

// Next/previous keys controls
window.addEventListener("keydown", function(event) {
  if (event.defaultPrevented) {
    return; // Do nothing if event already handled
  }

  switch(event.code) {

    case "ArrowLeft":
      // Handle "turn left"
      plusSlides(-1)
      break;

    case "ArrowRight":
      // Handle "turn right"
      plusSlides(1)
      break;
  }

  // Consume the event so it doesn't get handled twice
  event.preventDefault();
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
const closeBtn = document.createElement('button');
closeBtn.innerHTML = '&times;';
closeBtn.className = 'lb-close';
lighterbox.appendChild(closeBtn);

// Function to open the lighterbox
function openLighterbox(imgSrc, imgAlt) {
  lighterbox.style.display = 'block';
  lighterboxImg.src = imgSrc;

  // Reset the opacity before animating
  console.log("lighterbox", lighterbox)
  gsap.set(lighterbox, { opacity: 0 });

  // Animate the lighterbox fading in
  gsap.to(lighterbox, {
    duration: 0.5,
    opacity: 1,
    ease: "power2.inOut"
  });
}

// Function to close the lighterbox
function closeLighterbox() {
  // Animate the lighterbox fading out
  gsap.to(lighterbox, {
    duration: 0.5,
    opacity: 0,
    ease: "power2.inOut",
    onComplete: () => {
      lighterbox.style.display = 'none';
    }
  });
}
// Add click event listeners to all gallery images
const allImgs = document.querySelectorAll(".gallery img");
allImgs.forEach(img => {
  img.addEventListener('click', function() {
    openLighterbox(this.src);
  });
});

// Close the lighterbox when clicking the close button
closeBtn.addEventListener('click', closeLighterbox);

// Close the lighterbox when clicking outside the image
lighterbox.addEventListener('click', function(e) {
  if (e.target === this) {
    closeLighterbox();
  }
});

// Add keyboard support (Esc to close)
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeLighterbox();
  }
});
