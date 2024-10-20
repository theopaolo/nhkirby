let navbtn = document.querySelectorAll(".nav-toggler");
let offnav = document.querySelector(".main-nav");

navbtn.forEach((btn) => {
  btn.addEventListener("click", togglenav);
});

function togglenav() {
  this.classList.toggle('nav-active');

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
    gsap.to(offnav, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        offnav.style.display = 'none';
      }
    });
  }
});
