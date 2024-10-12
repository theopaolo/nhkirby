const gsap = window.gsap;

function clearLightbox() {
  // Remove any existing image or video in the lightbox
  const existingImage = document.querySelector(".imagebox");
  const existingVideo = document.querySelector(".videobox");

  if (existingImage) {
    existingImage.remove();
  }

  if (existingVideo) {
    existingVideo.pause();
    existingVideo.remove();
  }
}

// Image lightbox handler
export function initLightboxHandler(
  lightbox,
  imgObjects,
  canvas,
  getCurrentIntersect,
) {
  let imgbox = null;
  let imgcreated = false;
  let tl = gsap.timeline();

  function createImg(url) {
    clearLightbox(); // Clear any existing images or videos

    const newimg = document.createElement("img");
    newimg.src = url;
    newimg.classList.add("imagebox", "img-active");
    lightbox.appendChild(newimg);
    imgbox = document.querySelector(".imagebox");
    imgcreated = true;

    tl.to(".lightbox", { opacity: 1, zIndex: 999, duration: 0.5 }).from(
      ".imagebox",
      { opacity: 0, zIndex: 0, duration: 0 },
    );

    imgbox.addEventListener("click", removeImage);
  }

  function removeImage() {
    if (imgcreated) {
      tl.to(".lightbox", { opacity: 0, duration: 1, zIndex: 0 });
      setTimeout(() => {
        imgbox.remove();
        imgcreated = false;
      }, 1000);
    }
  }

  const handleTap = (event) => {
    event.preventDefault();
    const currentIntersect = getCurrentIntersect();
    if (currentIntersect) {
      for (const imgObject of imgObjects) {
        if (currentIntersect.object === imgObject) {
          createImg(imgObject.material.map.source.data.currentSrc);
          break;
        }
      }
    } else {
      removeImage();
    }
  };

  const handleDoubleClick = () => {
    const currentIntersect = getCurrentIntersect();
    if (currentIntersect) {
      for (const imgObject of imgObjects) {
        if (currentIntersect.object === imgObject) {
          createImg(imgObject.material.map.source.data.currentSrc);
          break;
        }
      }
    }
  };

  canvas.addEventListener("touchstart", handleTap);
  canvas.addEventListener("dblclick", handleDoubleClick);
}

// Video lightbox handler
export function initVideoLightboxHandler(
  lightbox,
  videoMeshes,
  DOM_VIDEOS,
  canvas,
  getCurrentIntersect,
) {
  let videobox = null;
  let videocreated = false;
  let tl = gsap.timeline();

  function createVideo(url) {
    clearLightbox(); // Clear any existing images or videos

    const newVideo = document.createElement("video");
    newVideo.src = url;
    newVideo.muted = true;
    newVideo.setAttribute("autoplay", "autoplay");
    newVideo.setAttribute("loop", "loop");
    newVideo.classList.add("videobox", "video-active");
    lightbox.appendChild(newVideo);
    videobox = document.querySelector(".videobox");
    videocreated = true;

    tl.to(".lightbox", { opacity: 1, zIndex: 999, duration: 0.5 }).from(
      ".videobox",
      { opacity: 0, zIndex: 0, duration: 0 },
    );

    videobox.addEventListener("click", removeVideo);
  }

  function removeVideo() {
    if (videocreated) {
      tl.to(".lightbox", { opacity: 0, duration: 1, zIndex: 0 });
      setTimeout(() => {
        videobox.pause();
        videobox.remove();
        videocreated = false;
      }, 1000);
    }
  }

  const handleTap = (event) => {
    event.preventDefault();
    const currentIntersect = getCurrentIntersect();
    if (currentIntersect) {
      for (let i = 0; i < videoMeshes.length; i++) {
        if (currentIntersect.object === videoMeshes[i]) {
          const videoSrc = DOM_VIDEOS[i].currentSrc;
          createVideo(videoSrc);
          break;
        }
      }
    } else {
      removeVideo();
    }
  };

  const handleDoubleClick = () => {
    const currentIntersect = getCurrentIntersect();
    if (currentIntersect) {
      for (let i = 0; i < videoMeshes.length; i++) {
        if (currentIntersect.object === videoMeshes[i]) {
          const videoSrc = DOM_VIDEOS[i].currentSrc;
          createVideo(videoSrc);
          break;
        }
      }
    }
  };

  canvas.addEventListener("touchstart", handleTap);
  canvas.addEventListener("dblclick", handleDoubleClick);
}

// Unified handler for both images and videos
export function initLightboxHandlers(
  lightbox,
  imgObjects,
  videoMeshes,
  DOM_VIDEOS,
  canvas,
  getCurrentIntersect,
) {
  canvas.addEventListener("touchstart", (event) => {
    event.preventDefault();
    const currentIntersect = getCurrentIntersect();

    if (currentIntersect) {
      for (const imgObject of imgObjects) {
        if (currentIntersect.object === imgObject) {
          initLightboxHandler(
            lightbox,
            imgObjects,
            canvas,
            getCurrentIntersect,
          );
          return;
        }
      }

      for (let i = 0; i < videoMeshes.length; i++) {
        if (currentIntersect.object === videoMeshes[i]) {
          initVideoLightboxHandler(
            lightbox,
            videoMeshes,
            DOM_VIDEOS,
            canvas,
            getCurrentIntersect,
          );
          return;
        }
      }
    }
  });

  canvas.addEventListener("dblclick", (event) => {
    event.preventDefault();
    const currentIntersect = getCurrentIntersect();

    if (currentIntersect) {
      for (const imgObject of imgObjects) {
        if (currentIntersect.object === imgObject) {
          initLightboxHandler(
            lightbox,
            imgObjects,
            canvas,
            getCurrentIntersect,
          );
          return;
        }
      }

      for (let i = 0; i < videoMeshes.length; i++) {
        if (currentIntersect.object === videoMeshes[i]) {
          initVideoLightboxHandler(
            lightbox,
            videoMeshes,
            DOM_VIDEOS,
            canvas,
            getCurrentIntersect,
          );
          return;
        }
      }
    }
  });
}
