// lightboxHandler.js
const gsap = window.gsap;

export function initLightboxHandler(lightbox, imgObjects, canvas, getCurrentIntersect) {
    let imgbox = null;
    let imgcreated = false;
    let tl = gsap.timeline();

    function createImg(url) {
        if (imgcreated === false) {
            const newimg = document.createElement('img');
            newimg.src = url;
            newimg.classList.add("imagebox", "img-active");
            lightbox.appendChild(newimg);
            imgbox = document.querySelector(".imagebox");
            imgcreated = true;

            tl.to(".lightbox", { opacity: 1, zIndex: 999, duration: 0.5 })
              .from(".imagebox", { opacity: 0, zIndex: 0, duration: 0 });

            imgbox.addEventListener('click', removeImage);
        } else {
            removeImage();
        }
    }

    function removeImage() {
        if (imgcreated === true) {
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
    canvas.addEventListener('dblclick', handleDoubleClick);
}