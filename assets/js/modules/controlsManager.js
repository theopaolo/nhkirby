// trackballControls.js
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';

export function initControls(camera, canvas) {
    const controls = new TrackballControls(camera, canvas);

    controls.staticMoving = false;
    controls.dynamicDampingFactor = 0.05;
    controls.rotateSpeed = 0.2;
    controls.noPan = true;
    controls.zoomSpeed = 0.5;
    controls.maxDistance = 100;
    controls.minDistance = 0;

    controls.update();

    return controls;
}