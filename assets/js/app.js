// Imports
import * as THREE from 'three';
import Swup from 'swup';
import { initScripts } from './scriptManager';
import { initSwup } from './swupManager';
import { initMouseHandler } from './modules/mouseHandler.js';
// import { initLightboxHandler } from './modules/lightboxHandler.js';
import { initLightboxHandlers } from './modules/videoLightboxHandler.js';

import { initControls } from './modules/controlsManager.js';
import { initializeStarrySky } from './starrySky.js';

const starsCanvas = document.getElementById('starry-sky');
initializeStarrySky(starsCanvas);
// Constants
const gsap = window.gsap;
const INITIAL_CAMERA_POSITION = { x: 55, y: 0, z: 0 };
const INITIAL_CAMERA_ROTATION = { x: 0, y: 0, z: 0 };
const GOLDEN_NUM = 1.618033988749895;

// Scene Setup
const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();
scene.background = null;

const camera = initCamera();
scene.add(camera);

// Geometry and Materials
const PLANE_GEOMETRY_HORIZONTAL = new THREE.PlaneGeometry(3, 2);
const PLANE_GEOMETRY_VERTICAL = new THREE.PlaneGeometry(3, 4);
const SHARED_MATERIAL = new THREE.MeshBasicMaterial({ transparent: false, side: THREE.DoubleSide });

// Groups and Arrays
const IMG_GROUP = new THREE.Group();
const IMG_OBJECTS = [];
const videoMeshes = [];

// DOM Elements
const DOM_VERTICALS_IMAGES = document.querySelectorAll(".imgverticales span");
const DOM_HORIZONTALES_IMAGES = document.querySelectorAll(".imghorizontales span");
const DOM_VIDEOS = document.querySelectorAll('.video-sphere');
const verticales = [];
const horizontales = [];
DOM_VERTICALS_IMAGES.forEach(imgSrc => verticales.push(imgSrc.dataset.imgurl));
DOM_HORIZONTALES_IMAGES.forEach(imgSrc => horizontales.push(imgSrc.dataset.imgurl));

// Initialization Functions
function initCamera() {
    const cam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.05, 1000);
    cam.position.set(INITIAL_CAMERA_POSITION.x, INITIAL_CAMERA_POSITION.y, INITIAL_CAMERA_POSITION.z);
    return cam;
}

function initRenderer(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true }); // Enable alpha for transparency
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  return renderer;
}

function initOverlay() {
    const geometry = new THREE.PlaneBufferGeometry(2, 2, 1, 1);
    const material = new THREE.ShaderMaterial({
        transparent: true,
        uniforms: { uAlpha: { value: 1 } },
        vertexShader: `
            void main() {
                gl_Position = vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float uAlpha;
            void main() {
                gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
            }
        `,
    });
    return new THREE.Mesh(geometry, material);
}

// Loading Functions
const loadingPercent = document.querySelector('.loadpercent');

async function initLoading() {
    await loadAssets();
    removeOverlay();
}

const loadAssets = () => {
    return new Promise((resolve) => {
        const loadingManager = new THREE.LoadingManager(() => {
            gsap.delayedCall(0.5, () => {
                loadingPercent.classList.add('ended');
                resolve();
            });
        }, updateLoadingProgress);

        const textureLoader = new THREE.TextureLoader(loadingManager);
        createSphere(horizontales, PLANE_GEOMETRY_HORIZONTAL, textureLoader, 10);
        createSphere(verticales, PLANE_GEOMETRY_VERTICAL, textureLoader, 12);
    });
};

function updateLoadingProgress(url, itemsLoaded, itemsTotal) {
    const progressRatio = itemsLoaded / itemsTotal;
    loadingPercent.innerHTML = `${Math.round(progressRatio * 100)}%`;
}

// Geometry Creation Functions
function createSphere(imageArray, geometry, textureLoader, size) {
    let i = 0;

    for(let image of imageArray){
        let imgText = textureLoader.load(image);
        imgText.generateMipmaps = false;
        imgText.wrapS = THREE.RepeatWrapping;
        imgText.repeat.x = - 1;

        let planeMaterial = new THREE.MeshBasicMaterial({ map: imgText });
        planeMaterial.transparent = false;
        planeMaterial.side = THREE.DoubleSide;
        let planeMesh = new THREE.Mesh(geometry, planeMaterial);

        i += 1;
        fiboSphere(imageArray.length + 1, i, planeMesh, size);

        IMG_OBJECTS.push(planeMesh);
    }

    scene.add(IMG_GROUP);
}

function fiboSphere(imgLght, iter, mesh, size) {
    const theta = 2 * Math.PI * iter / GOLDEN_NUM;
    const phi = Math.acos(1-2 * (iter + 0.5)/imgLght);
    let positionSphere = new THREE.Spherical(size, phi, theta);
    mesh.position.setFromSpherical(positionSphere);
    mesh.lookAt(mesh.position.clone().setLength(3));
    IMG_GROUP.add(mesh);
}

// Video Sphere Function (Commented Out)
function vidSphere(videoArray){
    let y = 0;
    let videoLght = videoArray.length;

    for(let video of videoArray){
        video.play();  // Start playing the video
        let vidTexture = new THREE.VideoTexture(video);  // Create video texture
        let planeMaterial = new THREE.MeshBasicMaterial({ map: vidTexture });
        planeMaterial.side = THREE.DoubleSide;
        let planeMesh = new THREE.Mesh(PLANE_GEOMETRY_HORIZONTAL, planeMaterial);  // Create a mesh for the video

        y += 1;
        fiboSphere(videoLght, y, planeMesh, 6);  // Position the video mesh in the scene

        videoMeshes.push(planeMesh);  // Add the planeMesh to the videoMeshes array
    }

    scene.add(...videoMeshes);  // Add the video meshes to the scene
}

vidSphere(DOM_VIDEOS);

// Event Handlers
function handleExploreButtonClick() {
    const tl = gsap.timeline();
    tl.fromTo(
        camera.position, { x: 350, y: 250, z: 0 },
        INITIAL_CAMERA_POSITION, { duration: 2, ease: "power3.inOut" }
    )
    .fromTo(
        camera.rotation, camera.rotation,
        INITIAL_CAMERA_ROTATION, { duration: 2, ease: "power3.inOut" },
        "-=2");
    trackballControls.reset();
}

// Optimized resize function using rAF
let resizeRequested = false;

function handleWindowResize() {
    const sizes = { width: window.innerWidth, height: window.innerHeight };
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

function handleWindowResizeRAF() {
    if (!resizeRequested) {
        resizeRequested = true;
        requestAnimationFrame(() => {
            handleWindowResize();
            resizeRequested = false;
        });
    }
}

function handleIntroButtonClick(event) {
    hideIntro();
    zoomIn();

    if (AUDIO) {
      PLAY_BUTTON.classList.add("active");
      AUDIO.play().catch((error) => {
            console.error("Failed to play audio:", error);
        });
    }
}

function handlePlayButton() {
  if (!AUDIO.paused) {
    PLAY_BUTTON.classList.remove("active");
    AUDIO.pause();
  } else {
    AUDIO.play();
    PLAY_BUTTON.classList.add("active");
  }
}

function handleFullScreen() {
  if (!document.fullscreenElement) {
    FULLSCREEN_BUTTON.classList.add('active')
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
      document.documentElement.msRequestFullscreen();
    }
  } else {
    FULLSCREEN_BUTTON.classList.remove('active')
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
      document.msExitFullscreen();
    }
  }
  setTimeout(handleWindowResizeRAF, 100);
}

// Animation Functions
function hideIntro() {
  gsap.to(".introduction", {
      opacity: 0,
      display: "none",
      duration: 0.3,
      onComplete: () => {
          document.querySelector('.introduction').classList.add("d-none");
      }
  });
}

const randomRange = (min, max) => Math.random() * (max - min) + min;

function zoomIn() {
    const randomPos = () => randomRange(0, 5);
    gsap.timeline()
        .fromTo(camera.position, { x: 15, y: -20, z: 10 }, { x: 55, y: 0, z: 0, duration: 4, ease: "power3.inOut" });
        // .to(camera.position, { x: 55, y: 0, z: 0, duration: 2, ease: "power3.inOut" });
}

function removeOverlay() {
    gsap.to(overlay.material.uniforms.uAlpha, { duration: 3, value: 0 });
}

function tick() {
    updateIntersect();
    IMG_GROUP.rotation.y -= 0.0002;
    trackballControls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
}

// Main Execution
const overlay = initOverlay();
scene.add(overlay);

const trackballControls = initControls(camera, canvas);
const { updateIntersect, getCurrentIntersect } = initMouseHandler(canvas, camera, IMG_OBJECTS, videoMeshes);

// Initialize lightbox handler
const lightbox = document.querySelector('.lightbox');
// initLightboxHandler(lightbox, IMG_OBJECTS, canvas, getCurrentIntersect);
// Example in your main app:
initLightboxHandlers(lightbox, IMG_OBJECTS, videoMeshes, DOM_VIDEOS, canvas, getCurrentIntersect);

const renderer = initRenderer(canvas);

initSwup(() => {
    initScripts();
});

// Event Listeners
const PLAY_BUTTON = document.querySelector('.soundbtn');
const AUDIO = document.querySelector('audio');
const EXPLORE_BUTTON = document.querySelector('.expbtn');
const INTRO_BUTTONS = document.querySelectorAll('.btnintro');
const FULLSCREEN_BUTTON = document.querySelector('.fullscreenbtn');

EXPLORE_BUTTON.addEventListener("click", handleExploreButtonClick);
INTRO_BUTTONS.forEach(btn => btn.addEventListener("click", handleIntroButtonClick));
PLAY_BUTTON.addEventListener("click", handlePlayButton);

if (FULLSCREEN_BUTTON) {
  FULLSCREEN_BUTTON.addEventListener('click', handleFullScreen);
}

// Event listeners
window.addEventListener('resize', handleWindowResizeRAF);
document.addEventListener('fullscreenchange', handleWindowResizeRAF);
document.addEventListener('webkitfullscreenchange', handleWindowResizeRAF);
document.addEventListener('mozfullscreenchange', handleWindowResizeRAF);
document.addEventListener('MSFullscreenChange', handleWindowResizeRAF);

initLoading();
tick();
