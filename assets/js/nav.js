let navbtn = document.querySelectorAll(".nav-toggler");
let offnav = document.querySelector(".main-nav");
const counter = document.querySelector('.counter');
const mainnavname = document.querySelector('.main-nav-name');

navbtn.forEach((btn) => {
  btn.addEventListener("click", togglenav);
});

function togglenav() {
  this.classList.toggle('nav-active');

  if (counter) {
    counter.classList.toggle('counter-hide');
  }

  if (offnav.classList.contains('nav-visible')) {
    gsap.to(offnav, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        offnav.classList.remove('nav-visible');
        offnav.style.display = 'none';
      }
    });
  } else {
    offnav.style.display = 'block';
    gsap.to(offnav, {
      opacity: 1,
      duration: 0.5,
      onStart: () => {
        offnav.classList.add('nav-visible');
      }
    });
  }
}

offnav.addEventListener('click', (e) => {
  if (e.target.classList.contains('nav-visible')) {
    offnav.classList.remove('nav-visible');
    if (counter) {
      counter.classList.remove('counter-hide');
    }
    gsap.to(offnav, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        offnav.style.display = 'none';
      }
    });
  }
});

if (mainnavname) {
  mainnavname.addEventListener('click', () => {
    if (offnav.classList.contains('nav-visible')) {
      offnav.classList.remove('nav-visible');
      if (counter) {
        counter.classList.remove('counter-hide');
      }
      gsap.to(offnav, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          offnav.style.display = 'none';
        }
      });
    }
  });
}
