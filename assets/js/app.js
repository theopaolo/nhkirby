// Imports
import * as THREE from "three";
import { initScripts } from "./scriptManager";
import { initSwup } from "./swupManager";
import { initMouseHandler } from "./modules/mouseHandler.js";
// import { initLightboxHandler } from './modules/lightboxHandler.js';
import { initLightboxHandlers } from "./modules/videoLightboxHandler.js";

import { initControls } from "./modules/controlsManager.js";
import { initializeStarrySky } from "./starrySky.js";
import { handleFullScreen } from "./modules/handleFullscreen.js";

const starsCanvas = document.getElementById("starry-sky");
initializeStarrySky(starsCanvas);
let audioInitialized = false;

// Constants
const gsap = window.gsap;
const DEFAULT_TARGET = new THREE.Vector3(0, 0, 0);
const INITIAL_CAMERA_POSITION = { x: 55, y: 0, z: 0 };
const INITIAL_CAMERA_ROTATION = { x: 0, y: 0, z: 0 };
const GOLDEN_NUM = 1.618033988749895;

// Scene Setup
const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();
scene.background = null;

const camera = initCamera();
scene.add(camera);

// Geometry and Materials
const PLANE_GEOMETRY_HORIZONTAL = new THREE.PlaneGeometry(3, 2);
const PLANE_GEOMETRY_VERTICAL = new THREE.PlaneGeometry(3, 4);

const SHARED_MATERIAL = new THREE.MeshBasicMaterial({
  transparent: false,
  side: THREE.DoubleSide,
});

// Groups and Arrays
const IMG_GROUP = new THREE.Group();
const IMG_OBJECTS = [];
const videoMeshes = [];

// DOM Elements
const DOM_VERTICALS_IMAGES = document.querySelectorAll(".imgverticales span");
const DOM_HORIZONTALES_IMAGES = document.querySelectorAll(
  ".imghorizontales span",
);
const DOM_VIDEOS = document.querySelectorAll(".video-sphere");
const verticales = [];
const horizontales = [];
DOM_VERTICALS_IMAGES.forEach((imgSrc) =>
  verticales.push(imgSrc.dataset.imgurl),
);
DOM_HORIZONTALES_IMAGES.forEach((imgSrc) =>
  horizontales.push(imgSrc.dataset.imgurl),
);

// Initialization Functions
function initCamera() {
  const cam = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.05,
    1000,
  );
  cam.position.set(
    INITIAL_CAMERA_POSITION.x,
    INITIAL_CAMERA_POSITION.y,
    INITIAL_CAMERA_POSITION.z,
  );
  cam.rotation.set(
    INITIAL_CAMERA_ROTATION.x,
    INITIAL_CAMERA_ROTATION.y,
    INITIAL_CAMERA_ROTATION.z,
  );
  return cam;
}

function initRenderer(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
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
const loadingPercent = document.querySelector(".loadpercent");

async function initLoading() {
  await loadAssets();
  removeOverlay();
}

const loadAssets = () => {
  return new Promise((resolve) => {
    const loadingManager = new THREE.LoadingManager(() => {
      gsap.delayedCall(0.5, () => {
        loadingPercent.classList.add("ended");
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

  for (let image of imageArray) {
    let imgText = textureLoader.load(image);
    imgText.generateMipmaps = false;
    imgText.wrapS = THREE.RepeatWrapping;
    imgText.repeat.x = -1;

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
  const theta = (2 * Math.PI * iter) / GOLDEN_NUM;
  const phi = Math.acos(1 - (2 * (iter + 0.5)) / imgLght);
  let positionSphere = new THREE.Spherical(size, phi, theta);
  mesh.position.setFromSpherical(positionSphere);
  mesh.lookAt(mesh.position.clone().setLength(3));
  IMG_GROUP.add(mesh);
}

// Video Sphere Function (Commented Out)
function vidSphere(videoArray) {
  let y = 0;
  let videoLght = videoArray.length;

  for (let video of videoArray) {
    video.play(); // Start playing the video
    let vidTexture = new THREE.VideoTexture(video); // Create video texture
    let planeMaterial = new THREE.MeshBasicMaterial({ map: vidTexture });
    planeMaterial.side = THREE.DoubleSide;
    let planeMesh = new THREE.Mesh(PLANE_GEOMETRY_HORIZONTAL, planeMaterial); // Create a mesh for the video

    y += 1;
    fiboSphere(videoLght, y, planeMesh, 6); // Position the video mesh in the scene

    videoMeshes.push(planeMesh); // Add the planeMesh to the videoMeshes array
  }

  scene.add(...videoMeshes); // Add the video meshes to the scene
}

vidSphere(DOM_VIDEOS);

// Add this at the top with your other constants

function handleExploreButtonClick() {

  // Get current control values
  const startTarget = trackballControls.target.clone();

  const tl = gsap.timeline();

  tl.to(camera.position, {
    x: INITIAL_CAMERA_POSITION.x,
    y: INITIAL_CAMERA_POSITION.y,
    z: INITIAL_CAMERA_POSITION.z,
    duration: 2,
    ease: "power3.inOut"
  })
  .to(camera.rotation, {
    x: INITIAL_CAMERA_ROTATION.x,
    y: INITIAL_CAMERA_ROTATION.y,
    z: INITIAL_CAMERA_ROTATION.z,
    duration: 2,
    ease: "power3.inOut"
  }, "<")
  .to(IMG_GROUP.rotation, {
    x: 0,
    y: 0,
    z: 0,
    duration: 2,
    ease: "power3.inOut"
  }, "<")
  // Animate camera up vector
  .to(camera.up, {
    x: 0,
    y: 1,
    z: 0,
    duration: 2,
    ease: "power3.inOut",
    onUpdate: () => {
      camera.updateProjectionMatrix();
    }
  }, "<")
  // Animate trackball target
  .to(startTarget, {
    x: DEFAULT_TARGET.x,
    y: DEFAULT_TARGET.y,
    z: DEFAULT_TARGET.z,
    duration: 2,
    ease: "power3.inOut",
    onUpdate: () => {
      trackballControls.target.copy(startTarget);
      trackballControls.update();
    },
    onComplete: () => {
      // Final adjustments to ensure perfect alignment
      camera.up.set(0, 1, 0);
      trackballControls.target.copy(DEFAULT_TARGET);
      trackballControls.update();

      console.log("Reset complete. New state:", {
        cameraPos: camera.position.clone(),
        cameraRot: camera.rotation.clone(),
        sphereRot: {
          x: IMG_GROUP.rotation.x,
          y: IMG_GROUP.rotation.y,
          z: IMG_GROUP.rotation.z
        },
        trackballTarget: trackballControls.target.clone(),
        cameraUp: camera.up.clone()
      });
    }
  }, "<");
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

// AUDIO
const PLAY_BUTTON = document.querySelector(".soundbtn");
const AUDIO = document.querySelector("audio");
let audioContext;
let sourceNode;
let gainNode;

async function initializeAudio() {
  if (AUDIO && PLAY_BUTTON && !audioInitialized) {
    await setupWebAudio();
    loadAudioState();
    PLAY_BUTTON.addEventListener("click", handlePlayButton);
    audioInitialized = true;
  } else if (audioInitialized) {
    loadAudioState();
  }
}

async function setupWebAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    // Resume audio context - this is crucial for some browsers
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }
  }
  if (!sourceNode) {
    sourceNode = audioContext.createMediaElementSource(AUDIO);
    gainNode = audioContext.createGain();
    sourceNode.connect(gainNode);
    gainNode.connect(audioContext.destination);
  }
}
function fadeAudioOut(duration = 0.5) {
  return new Promise((resolve) => {
    if (gainNode) {
      const currentTime = audioContext.currentTime;
      gainNode.gain.setValueAtTime(gainNode.gain.value, currentTime);
      gainNode.gain.linearRampToValueAtTime(0, currentTime + duration);
      setTimeout(resolve, duration * 1000);
    } else {
      resolve();
    }
  });
}

function fadeAudioIn(duration = 0.5) {
  if (gainNode) {
    const currentTime = audioContext.currentTime;
    gainNode.gain.setValueAtTime(0, currentTime);
    gainNode.gain.linearRampToValueAtTime(1, currentTime + duration);
  }
}

function saveAudioTime() {
  if (AUDIO) {
    localStorage.setItem("audioTime", AUDIO.currentTime);
  }
}

function savePlayState() {
  localStorage.setItem("audioPlaying", audioPlaying);
}

function loadPlayState() {
  let savedState = localStorage.getItem("audioPlaying");
  return savedState === "true";
}

function loadAudioTime() {
  let savedTime = localStorage.getItem("audioTime");
  if (savedTime !== null && AUDIO) {
    AUDIO.currentTime = parseFloat(savedTime);
  }
}

async function loadAudioState(hasEntered) {
  loadAudioTime();
  audioPlaying = loadPlayState();

  if (hasEntered && audioPlaying && AUDIO && PLAY_BUTTON) {
    PLAY_BUTTON.classList.add("active");
    try {
      await AUDIO.play();
      fadeAudioIn();
    } catch (error) {
      console.error("Failed to play audio:", error);
      audioPlaying = false;
      PLAY_BUTTON.classList.remove("active");
      savePlayState();
    }
  } else if (AUDIO && PLAY_BUTTON) {
    AUDIO.pause();
    PLAY_BUTTON.classList.remove("active");
  }
}

async function handleIntroButtonClick(e) {
  sessionStorage.setItem("entered", "true");
  hideIntro();
  zoomIn();
  loadAudioTime();

   // Initialize audio only after user interaction
   try {
    await initializeAudio();
    loadAudioTime();

    if (AUDIO && PLAY_BUTTON) {
      PLAY_BUTTON.classList.add("active");
      await AUDIO.play();
      fadeAudioIn();
      audioPlaying = true;
      savePlayState();
    }
  } catch (error) {
    console.error("Failed to initialize/play audio:", error);
    audioPlaying = false;
    if (PLAY_BUTTON) {
      PLAY_BUTTON.classList.remove("active");
    }
    savePlayState();
  }
}

async function handlePlayButton() {
  if (AUDIO) {
    if (!AUDIO.paused) {
      await fadeAudioOut();
      AUDIO.pause();
      PLAY_BUTTON.classList.remove("active");
      audioPlaying = false;
    } else {
      try {
        await AUDIO.play();
        fadeAudioIn();
        PLAY_BUTTON.classList.add("active");
        audioPlaying = true;
      } catch (error) {
        console.error("Failed to play audio:", error);
        audioPlaying = false;
      }
    }
    savePlayState();
  }
}

function checkIntroState() {
  const hasEntered = sessionStorage.getItem("entered") === "true";
  const introElement = document.querySelector(".introduction");
  if (hasEntered && introElement) {
    introElement.classList.add("d-none");
    initializeAudio().then(() => loadAudioState(hasEntered));
  } else {
    gsap.to(".introduction", { opacity: 1, display: "flex", duration: 0.3 });
  }
}

// Initialize audio on page load
document.addEventListener("DOMContentLoaded", () => {
  checkIntroState();
});

// Save audio time periodically
setInterval(saveAudioTime, 1000);

// Save audio state before page unload
window.addEventListener("beforeunload", function () {
  saveAudioTime();
  savePlayState();
});

PLAY_BUTTON.addEventListener("click", handlePlayButton);

// Animation Functions
function hideIntro() {
  gsap.to(".introduction", {
    opacity: 0,
    display: "none",
    duration: 0.3,
    onComplete: () => {
      document.querySelector(".introduction").classList.add("d-none");
    },
  });
}

function zoomIn() {
  gsap
    .timeline()
    .fromTo(
      camera.position,
      { x: 15, y: -20, z: 10 },
      { ...INITIAL_CAMERA_POSITION, duration: 4, ease: "power3.inOut" },
    );
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
const { updateIntersect, getCurrentIntersect } = initMouseHandler(
  canvas,
  camera,
  IMG_OBJECTS,
  videoMeshes,
);

// Initialize lightbox handler
const lightbox = document.querySelector(".lightbox");
// initLightboxHandler(lightbox, IMG_OBJECTS, canvas, getCurrentIntersect);
// Example in your main app:
initLightboxHandlers(
  lightbox,
  IMG_OBJECTS,
  videoMeshes,
  DOM_VIDEOS,
  canvas,
  getCurrentIntersect,
);

const renderer = initRenderer(canvas);

initSwup(() => {
  initScripts();
});

// Event Listeners

const EXPLORE_BUTTON = document.querySelector(".expbtn");
const INTRO_BUTTONS = document.querySelectorAll(".btnintro");
const FULLSCREEN_BUTTON = document.querySelector(".fullscreenbtn");

EXPLORE_BUTTON.addEventListener("click", handleExploreButtonClick);

INTRO_BUTTONS.forEach((btn) =>
  btn.addEventListener("click", handleIntroButtonClick),
);

if (FULLSCREEN_BUTTON) {
  FULLSCREEN_BUTTON.addEventListener("click", () =>
    handleFullScreen(FULLSCREEN_BUTTON),
  );
}

// Event listeners
window.addEventListener("resize", handleWindowResizeRAF);
document.addEventListener("fullscreenchange", handleWindowResizeRAF);
document.addEventListener("webkitfullscreenchange", handleWindowResizeRAF);
document.addEventListener("mozfullscreenchange", handleWindowResizeRAF);
document.addEventListener("MSFullscreenChange", handleWindowResizeRAF);

initLoading();
tick();
