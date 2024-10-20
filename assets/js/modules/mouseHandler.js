import * as THREE from "three";

export function initMouseHandler(canvas, camera, imgObjects, videoObjects) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let currentIntersect = null;

  // SVG cursor for the "plus" icon
  const plusIcon = `
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

  const plusBlob = new Blob([plusIcon], { type: "image/svg+xml" });
  const iconPlusUrl = URL.createObjectURL(plusBlob);

  // Update the mouse position
  const handleMouseMove = (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };

  // Update raycasting based on the current mouse position
  const updateIntersect = () => {
    raycaster.setFromCamera(mouse, camera);

    // Combine both image and video objects for raycasting
    const allObjects = [...imgObjects, ...videoObjects];
    const intersects = raycaster.intersectObjects(allObjects);

    if (intersects.length) {
      currentIntersect = intersects[0];
      document.body.style.cursor = `url('${iconPlusUrl}'), auto`;
    } else {
      currentIntersect = null;
      document.body.style.cursor = "grab";
    }
  };

  window.addEventListener("mousemove", handleMouseMove);

  return {
    updateIntersect,
    getCurrentIntersect: () => currentIntersect, // Return the current intersected object, if any
  };
}
