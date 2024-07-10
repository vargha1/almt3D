import * as T from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new T.Scene();
const camera = new T.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const loader = new GLTFLoader().setPath("./New/");
const renderer = new T.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(400, 300);
document.getElementById('canvasHolder').appendChild(renderer.domElement);
renderer.domElement.classList.add('transition-all')
renderer.domElement.classList.add('duration-500')

const controls = new OrbitControls(camera, renderer.domElement)
controls.rotateSpeed = 0.33;
controls.autoRotate = true
controls.enablePan = false
controls.minPolarAngle = 1.12;
controls.maxPolarAngle = 1.12;
controls.minDistance = 1;
controls.maxDistance = 2000;
controls.update()

var fired = false;
const clickHandler = (el, evt, fn) => el.addEventListener(evt, (e) => {
  if (!fired) fn(e);
  fired = true;
})

clickHandler(
  renderer.domElement,
  'click', () => {
    document.getElementById('startingText').classList.add('hidden')
    document.getElementById('header').classList.remove('hidden')
    document.querySelector("main").classList.add('bottom-0')
    document.querySelector("main").classList.remove('top-1/2')
    document.querySelector("main").classList.remove('-translate-y-1/2')
    renderer.setSize(window.innerWidth, window.innerHeight - 152)
    renderer.setPixelRatio(window.devicePixelRatio)
    document.getElementById('canvasHolder').classList.add('w-full')
    document.getElementById('canvasHolder').classList.remove('w-1/2')
    controls.autoRotate = false;
    controls.update()
    camera.position.set(-12, 8, 0)
  }
)

const positions = [
  {
    x: 0,
    y: 2.5,
    z: 3
  },
  {
    x: 0,
    y: 50,
    z: 0
  },
  {
    x: 0,
    y: 20,
    z: 0
  },
]

document.querySelectorAll('button').forEach((btn, key) => {
  btn.addEventListener('click', () => {
    camera.position.set(positions[key].x, positions[key].y, positions[key].z);
    camera.updateProjectionMatrix()
    controls.target.set(positions[key].x, positions[key].y + 1, positions[key].z + 1)
    controls.update()
  })
})

loader.load("scene.gltf", function (gltf) {
  const mesh = gltf.scene;
  mesh.position.set(0, 0, 0)
  scene.add(mesh)
})

// const geometry = new T.BoxGeometry(200, 20, 350);
// const material = new T.MeshPhongMaterial({ color: 0x28282B });
// const baseCube = new T.Mesh(geometry, material);
// baseCube.receiveShadow = true
// scene.add(baseCube)
// camera.position.set(180, 90, 230)
// controls.update()
// const geometry2 = new T.BoxGeometry(180, 10, 330);
// const cube2 = new T.Mesh(geometry2, material);
// scene.add(cube2)

const ambientLight = new T.AmbientLight(0xffffff)
scene.add(ambientLight)
// const pl1 = new T.PointLight(0xffff, 9000);
// pl1.position.set(0, 20, 80)
// pl1.castShadow = true
// scene.add(pl1);
const pl2 = new T.PointLight(0xffffff, 5000);
pl2.position.set(0, -50, 0)
pl2.castShadow = true
scene.add(pl2);
const pl3 = new T.PointLight(0xffffff, 5000);
pl3.position.set(80, 10, 0)
pl3.castShadow = true
scene.add(pl3);
const pl4 = new T.PointLight(0xffffff, 5000);
pl4.position.set(0, 10, -80)
pl4.castShadow = true
scene.add(pl4);
const pl5 = new T.PointLight(0xffffff, 5000);
pl5.position.set(-80, 10, 0)
pl5.castShadow = true
scene.add(pl5);
const pl6 = new T.PointLight(0xffff, 100);
pl6.position.set(4, 7.5, 5.5)
pl6.castShadow = true
scene.add(pl6);
// const dl1 = new T.DirectionalLight(0xffffff, 0.5)
// dl1.castShadow = true
// camera.add(dl1)
// scene.add(camera)
const dl2 = new T.DirectionalLight(0xffffff, 2)
dl2.position.set(0, 50, 0)
dl2.castShadow = true
scene.add(dl2)

camera.position.set(-12, 8, 0)

function animate() {
  renderer.render(scene, camera);
  controls.update()
}
renderer.setAnimationLoop(animate)