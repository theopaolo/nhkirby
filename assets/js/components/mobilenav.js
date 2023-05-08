// Extend the HTMLElement class to create the web component
class MobileNav extends HTMLElement {
  constructor () {
    let seriestrad = 'séries'
    let abouttrad = 'à propos'
    const lang = sessionStorage.getItem('lang')

    if (lang === 'en') {
      seriestrad = "series"
      abouttrad = "about"
    }

    super();
    this.innerHTML =`
      <button class="nav-action">+</button>
      <nav class="offscreen-nav">
        <div class="navwrap">
          <span class="nav-name"><a href="./index.html">Nicolas Hermann</a></span>
          <div class="flex dir-column">
            <span class='mb-3'>${seriestrad}</span>
            <a class="mb-1" href="lookout.html">Look out</a>
            <a class="mb-1" href="salviadivinorum.html">Salvia Divinorum</a>
            <a class="mb-1" href="laniakea.html">Laniakea</a>
            <a class="mb-1" href="mark.html">Mark</a>
            <a class="mb-1" href="distortion.html">Distortion</a>
          </div>
          <a class="nav-about" href="./about.html">${abouttrad}</a>
        </div>
      </nav>
    `;
  }
  connectedCallback () {
    // Navigation script
      let offnav = document.querySelector(".offscreen-nav")

      this.addEventListener('click', togglenav)

      function togglenav()  {

      if(document.getElementById("about")) {
        document.getElementById("about").classList.toggle('no-scroll')
      }

      this.classList.toggle('nav-active')

      offnav.classList.toggle('nav-visible')

      if(offnav.classList.contains('nav-visible')){
        gsap.to(offnav, {x: 0, duration: 1})
      }

    }
  }
}

// Define the new web component
if ('customElements' in window) {
  customElements.define('mobile-nav', MobileNav);
}
