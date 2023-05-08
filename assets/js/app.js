import * as THREE from 'three'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'
import Swup from 'swup';

const gsap = window.gsap;
const swup = new Swup();

const raycaster = new THREE.Raycaster();

function initScripts() {
  if (document.querySelector('.bio')) {

    let bio = document.querySelector(".bio")
    let parcour = document.querySelector(".parcour")

    bio.addEventListener("mouseenter", ()=> {
      if(bio.classList.contains("darkbg")) {
        bio.classList.remove('darkbg')
        // bio.classList.remove("blight-shadow")

        parcour.classList.add("darkbg")
        // parcour.classList.add("light-shadow")
      } else {
        bio.classList.add('darkbg')
        // bio.classList.add('blight-shadow')

        parcour.classList.remove("darkbg")
        // parcour.classList.remove("light-shadow")
      }
    })

    parcour.addEventListener("mouseenter", ()=> {
      if(parcour.classList.contains("darkbg")) {
        parcour.classList.remove("darkbg")
        // parcour.classList.remove("light-shadow")

        bio.classList.add('darkbg')
        // bio.classList.add('blight-shadow')
      } else {
        parcour.classList.add("darkbg")
        // parcour.classList.add("light-shadow")

        bio.classList.remove('darkbg')
        // bio.classList.remove("blight-shadow")
      }
    })

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

  }
}
initScripts();

swup.on('contentReplaced', initScripts);

import { DstColorFactor, Raycaster } from 'three';

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Overlay
 */
const overlayGeometry = new THREE.PlaneBufferGeometry(2, 2, 1, 1)
const overlayMaterial = new THREE.ShaderMaterial({
  transparent: true,
  uniforms:
  {
    uAlpha: { value: 1}
  },
  vertexShader:
  `
    void main()
    {
      gl_Position = vec4(position, 1.0);
    }
  `
  ,
  fragmentShader:
    `
      uniform float uAlpha;
      void main()
      {
        gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
      }
    `
})

const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
scene.add(overlay)
/**
 * Loader
 */
const loadingBarElement = document.querySelector('.loading-bar')
const loadingPercent = document.querySelector(".loadpercent")

/**
 * Texture
 */
const loadingManager = new THREE.LoadingManager(
  // Loaded
  () =>
  {
    gsap.delayedCall(0.5,()=>{
      gsap.to(overlayMaterial.uniforms.uAlpha,{duration:3, value: 0})
      loadingBarElement.classList.add('ended')
      loadingPercent.classList.add('ended')

      loadingBarElement.style.transform = ''
    })
  },

// Progress
(url, itemsLoaded, itemsTotal) => {
  const progressRatio = itemsLoaded / itemsTotal;
  loadingBarElement.style.transform = `scaleX( ${progressRatio} )`
  loadingPercent.innerHTML = Math.round(progressRatio * 100) + "%"
})

const textureLoader = new THREE.TextureLoader(loadingManager)

// Get vertical images
let imgVerticales = document.querySelectorAll(".imgverticales span")
let imgHorizontales = document.querySelectorAll(".imghorizontales span")

let verticales = []
let horizontales = []


for( let imgSrc of imgVerticales){
  verticales.push(imgSrc.dataset.imgurl)
}

for( let imgSrc of imgHorizontales){
  horizontales.push(imgSrc.dataset.imgurl)
}


/**
 * Create Objects
 */
let planeGeometry = new THREE.PlaneGeometry(3, 2);
let planeGeoVerti = new THREE.PlaneGeometry(3, 4);

let phi = 0
let theta = 0
let goldNum = 1.618033988749895
let myVideos = document.querySelectorAll('.video')
const imggroup = new THREE.Group();
const imgObjects = []

function fiboSphere(imgLght, iter, mesh, size) {
  theta = 2 * Math.PI * iter / goldNum
  phi = Math.acos(1-2 * (iter + 0.5)/imgLght)
  let positionSphere = new THREE.Spherical(size, phi, theta)

  mesh.position.setFromSpherical(positionSphere);
  mesh.lookAt(mesh.position.clone().setLength(3));

  // add mesh to a THREE.Group to be able to rotate and move the group
  imggroup.add(mesh);
}

function imgSphere(imgHorizon){
  let imgLght = imgHorizon.length + 1
  let i = 0

  for(let image of imgHorizon){
    // Load images as texture
    let imgText = textureLoader.load(image)
    imgText.generateMipmaps = false

    // Create planeMaterial and map images texture
    let planeMaterial = new THREE.MeshBasicMaterial({ map: imgText })
    planeMaterial.transparent =  false
    planeMaterial.side = THREE.DoubleSide
    imgText.wrapS = THREE.RepeatWrapping;
    imgText.repeat.x = - 1;

    let planeMesh  = new THREE.Mesh(planeGeometry, planeMaterial);

    // Create sphere using finonacci
    i += 1
    fiboSphere(imgLght, i, planeMesh, 10)

    // Add planes to imgObjects array for the rayCaster
    imgObjects.push(planeMesh)
  }

  scene.add(imggroup)
}

// Creage a sphere of image the the array of Horizontales imgs
imgSphere(horizontales)


function vertiSphere(imgVerti){
  let imgLght = imgVerti.length + 1
  let i = 0

  for(let image of imgVerti){
    // Load images as texture
    let imgText = textureLoader.load(image)
    imgText.generateMipmaps = false
    imgText.wrapS = THREE.RepeatWrapping;
    imgText.repeat.x = - 1;

    // Create planeMaterial and map images texture
    let planeMaterial = new THREE.MeshBasicMaterial({ map: imgText })
    planeMaterial.transparent =  false
    planeMaterial.side = THREE.DoubleSide
    let planeMesh  = new THREE.Mesh(planeGeoVerti, planeMaterial);

    // Create sphere using finonacci
    i += 1
    fiboSphere(imgLght, i, planeMesh, 12)

    // Add planes to imgObjects array for the rayCaster
    imgObjects.push(planeMesh)
  }

  scene.add(imggroup)
}
vertiSphere(verticales)

/*
* Video Sphere
*/
function vidSphere(elArr){
  let y = 0
  let imgLght = elArr.length

  for(let vid of elArr){
    vid.play();
    let vidTexture = new THREE.VideoTexture(vid)
    // Create planeMaterial and map images texture
    let planeMaterial = new THREE.MeshBasicMaterial({ map: vidTexture })
    planeMaterial.side = THREE.DoubleSide
    let planeMesh  = new THREE.Mesh(planeGeometry, planeMaterial);

    y += 1

    // Create sphere using fibonacci
    fiboSphere(imgLght, y, planeMesh, 6)
  }
}
// vidSphere(myVideos)


/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    fovDistances()
})

/**
 * Raycaster
*/
// const raycaster = new THREE.Raycaster();

/**
 * Mouse
*/
const mouse = new THREE.Vector2()


/**
* LIGHTBOX
**/
window.addEventListener('mousemove', (event) => {
  mouse.x = event.clientX / sizes.width * 2 - 1;
  mouse.y = - (event.clientY / sizes.height * 2 - 1);
})

let tl = gsap.timeline();
let lightbox = document.querySelector('.lightbox')
let imgOpen = false

// Handle the lightbox
canvas.addEventListener("touchstart", tapHandler);
let tapedTwice = false;

function tapHandler(event) {
  if(!tapedTwice) {
      tapedTwice = true;
      setTimeout( function() { tapedTwice = false; }, 300 );
      return false;
  }
  event.preventDefault();
  //action on double tap goes below
  if(currentIntersect) {
    for(let i = 0; i < imgObjects.length; i++){
     if(currentIntersect.object === imgObjects[i]) {
       let imgurl = imgObjects[i].material.map.source.data.currentSrc
       createImg(imgurl)
     }
    }
    imgOpen = true
   }
   if(currentIntersect) {
    console.log("taped twice");
    } else {
      removeImage()
      console.log("tap should close img");
    }
}


canvas.addEventListener('dblclick', (event) => {
  if(currentIntersect) {
   for(let i = 0; i < imgObjects.length; i++){
    if(currentIntersect.object === imgObjects[i]) {
      let imgurl = imgObjects[i].material.map.source.data.currentSrc
      createImg(imgurl)
    }
   }
   imgOpen = true
  }
})

// Broken, need to fix when click outside of image
//canvas.addEventListener('click', (event) => {
//   if(! "ontouchstart" in document.documentElement) {
//   if(currentIntersect) {
//     console.log("clicked");
//   } else {
//     removeImage()
//     console.log("should close img");
//   }
//   }
// })


let imgbox = null
let imgcreated = false

function createImg(url) {

  if(imgcreated === false){
    let newimg = document.createElement('img');
    newimg.src = url;
    newimg.classList.add("imagebox", "img-active")
    lightbox.appendChild(newimg);
    imgbox = document.querySelector(".imagebox")
    imgcreated = true

    // image transition
    tl
      .to(".lightbox", { opacity: 1, zIndex:999, duration: 0.5, })
      .from(".imagebox", { opacity: 0,  zIndex:0, duration: 0, })

    imgbox.addEventListener('click', (event) => {
        removeImage()
      })
    } else {
      removeImage()
    }

}

function removeImage() {
  if(imgcreated === true){
    currentIntersect = null
    tl.to(".lightbox", { opacity: 0, duration: 1, zIndex:0, })
    setTimeout(() => {
      imgbox.remove()
      console.log("erase img");
      imgcreated = false
      imgOpen = false
    }, 1000);
  }
}

/**
  Camera
  Base camera
**/
let fov = 45;

function fovDistances() {
  if(window.innerWidth < 768){
    fov = 55;
  } else {
    fov = 45;
  }
} fovDistances()

const camera = new THREE.PerspectiveCamera( fov, window.innerWidth / window.innerHeight, 0.05, 1000 );
camera.position.set(50,0,0);

scene.add(camera)
scene.background = new THREE.Color(0x0d0d0d);

/**
 * Controls
 */
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true // le smooth des mouvements
// controls.dampingFactor = 0.05;
// controls.enablePan = false
// controls.enableZoom = true

// // controls.zoomSpeed = 1.2
// controls.maxDistance = 1000
// controls.update()

/**
 * TrackBall Controls
 */
  const trackballcontrols = new TrackballControls(camera, canvas)

  trackballcontrols.staticMoving = false
  trackballcontrols.dynamicDampingFactor = 0.05;
  trackballcontrols.rotateSpeed = 0.2;

  trackballcontrols.noPan = true

  trackballcontrols.zoomSpeed = 0.5;

  trackballcontrols.maxDistance = 100
  trackballcontrols.minDistance = 0

  trackballcontrols.update()

  // if(window.innerWidth < 600) {
  //   trackballcontrols.rotateSpeed = 0.1;
  //   trackballcontrols.zoomSpeed = 0.1;
  // }
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * Animate
 */
const clock = new THREE.Clock()
let currentIntersect = null
let expbtn = document.querySelectorAll('.expbtn')

for(let i = 0; i < expbtn.length; i++){
  expbtn[i].addEventListener("click", resetcamera)
}

function resetcamera(){
  trackballcontrols.reset()
}





const plusicon = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="14" viewBox="0 0 14 14">
  <defs>
    <clipPath id="clip-Curseur_">
      <rect width="14" height="14"/>
    </clipPath>
  </defs>
  <g id="Curseur_" data-name="Curseur +" clip-path="url(#clip-Curseur_)">
    <g id="Union_1" data-name="Union 1" transform="translate(-19470 -18693)">
      <path d="M 19478.001953125 18705.25 L 19477.751953125 18705.25 L 19476.25 18705.25 L 19476 18705.25 L 19476 18705 L 19476 18701.001953125 L 19472.001953125 18701.001953125 L 19471.751953125 18701.001953125 L 19471.751953125 18700.751953125 L 19471.751953125 18699.25 L 19471.751953125 18699 L 19472.001953125 18699 L 19476 18699 L 19476 18695.001953125 L 19476 18694.751953125 L 19476.25 18694.751953125 L 19477.751953125 18694.751953125 L 19478.001953125 18694.751953125 L 19478.001953125 18695.001953125 L 19478.001953125 18699 L 19482 18699 L 19482.25 18699 L 19482.25 18699.25 L 19482.25 18700.751953125 L 19482.25 18701.001953125 L 19482 18701.001953125 L 19478.001953125 18701.001953125 L 19478.001953125 18705 L 19478.001953125 18705.25 Z" stroke="none"/>
      <path d="M 19477.751953125 18705 L 19477.751953125 18700.751953125 L 19482 18700.751953125 L 19482 18699.25 L 19477.751953125 18699.25 L 19477.751953125 18695.001953125 L 19476.25 18695.001953125 L 19476.25 18699.25 L 19472.001953125 18699.25 L 19472.001953125 18700.751953125 L 19476.25 18700.751953125 L 19476.25 18705 L 19477.751953125 18705 M 19478.251953125 18705.5 L 19475.75 18705.5 L 19475.75 18701.251953125 L 19471.501953125 18701.251953125 L 19471.501953125 18698.75 L 19475.75 18698.75 L 19475.75 18694.501953125 L 19478.251953125 18694.501953125 L 19478.251953125 18698.75 L 19482.5 18698.75 L 19482.5 18701.251953125 L 19478.251953125 18701.251953125 L 19478.251953125 18705.5 Z" stroke="none" fill="#fff"/>
    </g>
  </g>
</svg>
`;
const plusblob = new Blob([plusicon], {type: 'image/svg+xml'});
const iconplus = URL.createObjectURL(plusblob);

const tick = () =>
{
    imggroup.rotation.y -= 0.0002;

    // Cas a ray
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(imgObjects)

    if(intersects.length)
    {
        if(!currentIntersect)
        currentIntersect = intersects[0]
        document.body.style.cursor = "url(" + iconplus + "), auto";
        console.log("not internsect");
    }
    else
    {
        if(currentIntersect)
        document.body.style.cursor = "grab";
        currentIntersect = null
    }

    // Update controls
    // controls.update()
    trackballcontrols.update()
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
