import * as T from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { EffectComposer } from "three/examples/jsm/Addons.js";
import { UnrealBloomPass } from "three/examples/jsm/Addons.js";
import { RenderPass } from "three/examples/jsm/Addons.js";
import { OutputPass } from "three/examples/jsm/Addons.js";

const scene = new T.Scene();
const camera = new T.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const loader = new GLTFLoader().setPath("./New/");
const renderer = new T.WebGLRenderer();
const renderScene = new RenderPass(scene, camera);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
camera.aspect = 400/300+0.5;
camera.updateProjectionMatrix();
renderer.toneMapping = T.ReinhardToneMapping;
renderer.domElement.style.border = "#314252 solid 2px"
renderer.domElement.style.width = '400px'
renderer.domElement.style.height = '300px'
const outputPass = new OutputPass();
const finalComposer = new EffectComposer(renderer);
const bloomPass = new UnrealBloomPass(new T.Vector2(window.innerWidth, window.innerHeight), 2, 0.4, 0.2);
bloomPass.threshold = 0;
bloomPass.strength = 2;
bloomPass.radius = 5;
finalComposer.addPass(renderScene)
finalComposer.addPass(outputPass)
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement)
controls.rotateSpeed = 0.33;
controls.minPolarAngle = 1.12;
controls.maxPolarAngle = 1.12;
controls.minDistance = 8;
controls.maxDistance = 20;
controls.update()

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

camera.position.set(-10,3,0)
camera.lookAt(new T.Vector3(0,3,0))

function animate() {
  renderer.render(scene, camera);
  finalComposer.render()
  controls.update()
}
renderer.setAnimationLoop(animate)