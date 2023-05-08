let phi = 0
let theta = 0
let goldNum = 1.618033988749895

export default function fibosphere(imgLght, iter, mesh, size) {
  theta = 2 * Math.PI * iter / goldNum
  phi = Math.acos(1-2 * (iter + 0.5)/imgLght)
  let positionSphere = new THREE.Spherical(size, phi, theta)

  mesh.position.setFromSpherical(positionSphere);
  mesh.lookAt(mesh.position.clone().setLength(3));

  // add mesh to a THREE.Group to be able to rotate and move the group
  imgGroup.add(mesh);
}