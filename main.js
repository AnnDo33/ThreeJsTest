import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Configuration de la scène et de la caméra
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 2, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // Activer les ombres
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// Ajout de contrôles pour la caméra
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Lumières
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
pointLight.castShadow = true; // Permettre à la lumière de projeter des ombres
scene.add(pointLight);

// Création d'une sphère
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x0077ff });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(0, 0, 0);
sphere.castShadow = true; // Permettre à la sphère de projeter des ombres
sphere.receiveShadow = true; // Permettre à la sphère de recevoir des ombres
scene.add(sphere);

// Création d'un cube violet
const cubeGeometry = new THREE.BoxGeometry(1.5, 1, 1.5);
const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xcb1bac });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(-3, 0, 0);
cube.castShadow = true; // Permettre au cube de projeter des ombres
cube.receiveShadow = true; // Permettre au cube de recevoir des ombres
scene.add(cube);

// Ajout d'un plan pour recevoir les ombres
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -1;
plane.receiveShadow = true; // Permettre au plan de recevoir des ombres
scene.add(plane);

// Fonction d'animation
function animate() {
  controls.update();
  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

// Redimensionner le rendu en cas de changement de taille de fenêtre
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
