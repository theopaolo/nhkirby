let navbtn = document.querySelector(".nav-action")
let offnav = document.querySelector(".offscreen-nav")

navbtn.addEventListener('click', togglenav)

function togglenav() {
  console.log('clicked toggle nav');
  this.classList.toggle('nav-active')
  offnav.classList.toggle('nav-visible')
  if(offnav.classList.contains('nav-visible')){
    gsap.to(offnav, {x: 0, duration: 1})
  }
}
