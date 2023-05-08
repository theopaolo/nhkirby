import * as THREE from 'three'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'
const gsap = window.gsap;

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Get vertical images
let imgVerticales = document.querySelectorAll(".imgverticales span")
let verticales = []

for( let imgSrc of imgVerticales){
  verticales.push(imgSrc.dataset.imgurl)
}

//Create planes Objects
let planeGeoHoriz = new THREE.PlaneGeometry(3, 2);
let planeGeoVerti = new THREE.PlaneGeometry(3, 4);

let phi = 0
let theta = 0
let goldNum = 1.618033988749895

let myVideos = document.querySelectorAll('.video')
const imgGroup = new THREE.Group();
const imgObjects = []

function fiboSphere(imgLght, iter, mesh, size) {
  theta = 2 * Math.PI * iter / goldNum
  phi = Math.acos(1-2 * (iter + 0.5)/imgLght)
  let positionSphere = new THREE.Spherical(size, phi, theta)

  mesh.position.setFromSpherical(positionSphere);
  mesh.lookAt(mesh.position.clone().setLength(3));

  // add mesh to a THREE.Group to be able to rotate and move the group
  imgGroup.add(mesh);
}

const loadingManager = new THREE.LoadingManager(
// Loaded
() => {
  gsap.delayedCall(0.5,()=>{
    gsap.to(overlayMaterial.uniforms.uAlpha,{duration:3, value: 0})
    loadingBarElement.classList.add('ended')
    loadingBarElement.style.transform = ''
})},
// Progress
(itemsLoaded, itemsTotal) => {
  const progressRatio = itemsLoaded / itemsTotal;
  console.log(itemsLoaded)
  loadingBarElement.style.transform = `scaleX( ${progressRatio} )`
})

const textureLoader = new THREE.TextureLoader(loadingManager)

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
  // Add group of images to the scene
  scene.add(imgGroup)
}

vertiSphere(verticales)

// Overlay
const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)

const overlayMaterial = new THREE.ShaderMaterial({
  transparent: true,
  uniforms: { uAlpha: { value: 1} },
  vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`,
  fragmentShader: `uniform float uAlpha;
  void main() { gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha); }`
})

const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
scene.add(overlay)

// Loader
const loadingBarElement = document.querySelector('.loading-bar')

//Sizes
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
})

// Raycaster
const raycaster = new THREE.Raycaster();

// Mouse
const mouse = new THREE.Vector2()

// LIGHTBOX
window.addEventListener('mousemove', (event) => {
  mouse.x = event.clientX / sizes.width * 2 - 1;
  mouse.y = - (event.clientY / sizes.height * 2 - 1);
})

let tl = gsap.timeline();
let lightbox = document.querySelector('.lightbox')
let imgOpen = false

window.addEventListener('dblclick', (event) => {
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

window.addEventListener('click', (event) => {
  if(currentIntersect) {
    console.log("clicked");
  } else {
    removeImage()
    console.log("should close img");
  }
})


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
      .to(".lightbox", { opacity: 1, duration: 0.5, })
      .from(".imagebox", { opacity: 0, duration: 0, })

    imgbox.addEventListener('click', (event) => {
        removeImage()
      })
    } else {
      removeImage()
    }

}

function removeImage() {
  if(imgcreated === true){
    tl.to(".lightbox", { opacity: 0, duration: 1, })
    setTimeout(() => {
      imgbox.remove()
      console.log("erase img");
      imgcreated = false
      imgOpen = false
    }, 1000);
  }
}

// Camera Base camera

var fov = 45;
const camera = new THREE.PerspectiveCamera( fov, window.innerWidth / window.innerHeight, 0.05, 1000 );
camera.position.set(38,0,0);

scene.add(camera)
scene.background = new THREE.Color(0x0d0d0d);

// TrackBall Controls

  const trackballcontrols = new TrackballControls(camera, canvas)

  trackballcontrols.staticMoving = false
  trackballcontrols.dynamicDampingFactor = 0.05;
  trackballcontrols.rotateSpeed = 0.2;

  trackballcontrols.noPan = true

  trackballcontrols.zoomSpeed = 0.5;

  trackballcontrols.maxDistance = 100
  trackballcontrols.minDistance = 0

  trackballcontrols.update()


// Renderer

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


// Animate

const clock = new THREE.Clock()
let currentIntersect = null
let expbtn = document.querySelectorAll('.expbtn')

for(let i = 0; i < expbtn.length; i++){
  expbtn[i].addEventListener("click", resetcamera)
}

function resetcamera(){

  gsap.to(camera.position, {
    x: 30,
    y: 0,
    z: 0,
    duration: 1,
    onUpdate: function(){
       trackballcontrols.reset()
    }
  })
  console.log("rotation");
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
  imgGroup.rotation.y -= 0.0002;

    // Cas a ray
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(imgObjects)

    if(intersects.length)
    {
        if(!currentIntersect)
        currentIntersect = intersects[0]
        document.body.style.cursor = "url(" + iconplus + "), auto";
    }
    else
    {
        if(currentIntersect)
        document.body.style.cursor = "default";
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
