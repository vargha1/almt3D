import * as T from "three";
import gsap from "gsap";
import HelvetikerFont from "three/examples/fonts/helvetiker_regular.typeface.json";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { TextGeometry } from "three/examples/jsm/Addons.js";
import { FontLoader } from "three/examples/jsm/Addons.js";

const scene = new T.Scene();
const camera = new T.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.aspect = window.innerWidth / window.innerHeight
camera.updateProjectionMatrix()
const loader = new GLTFLoader().setPath("./New/");
const loader2 = new FontLoader()
const renderer = new T.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvasHolder').appendChild(renderer.domElement);

var font = loader2.parse(HelvetikerFont)
const geo = new TextGeometry("My name is Vargha\nand i am a frontend web\ndeveloper", {
  font: font,
  size: 0.3,
  depth: 0.1,
  curveSegments: 12,
})

const textMesh = new T.Mesh(geo, new T.MeshPhongMaterial({ color: 0xffffff }))
textMesh.position.set(-1.3, 4.5, -7)
scene.add(textMesh)

// var fired = false;
// const clickHandler = (el, evt, fn) => el.addEventListener(evt, (e) => {
//   if (!fired) fn(e);
//   fired = true;
// })

// clickHandler(
//   renderer.domElement,
//   'click', () => {
//     renderer.domElement.classList.add('transition-all')
//     renderer.domElement.classList.add('duration-500')
//     document.getElementById('startingText').classList.add('hidden')
//     document.getElementById('header').classList.remove('hidden')
//     document.querySelector("main").classList.add('bottom-0')
//     document.querySelector("main").classList.remove('top-1/2')
//     document.querySelector("main").classList.remove('-translate-y-1/2')
//     renderer.setSize(window.innerWidth, window.innerHeight - 152)
//     renderer.setPixelRatio(window.devicePixelRatio)
//     document.getElementById('canvasHolder').classList.add('w-full')
//     document.getElementById('canvasHolder').classList.remove('w-1/2')
//     controls.autoRotate = false;
//     controls.update()
//     camera.position.set(-12, 8, 0)
//   }
// )

const controls = new OrbitControls(camera, renderer.domElement)
// controls.enablePan = false
// controls.minPolarAngle = 1;
// controls.maxPolarAngle = 1.2;
controls.minDistance = 1;
controls.maxDistance = 100;
controls.update()

const positions = [
  {
    x: 0,
    y: 1,
    z: 3,
    duration: 2,
    ease: "none",
    onUpdate: function () {
      controls.target = new T.Vector3(0, 3, 4.5)
      controls.update()
    },
  },
  {
    x: 0,
    y: 4,
    z: -1.3,
    duration: 2,
    ease: "none",
    onUpdate: function () {
      controls.target = new T.Vector3(3, 4, -1.3)
      controls.update()
    },
  },
  {
    x: 0,
    y: 3.5,
    z: -4,
    duration: 2,
    ease: "none",
    onUpdate: function () {
      controls.target = new T.Vector3(0, 4, -5)
      controls.update()
    },
  },
]

camera.position.set(-12, 8, 12)
controls.target = new T.Vector3(0,4,12)

document.querySelectorAll('button').forEach((btn, key) => {
  btn.addEventListener('click', () => {
    if (key != 3) {
      gsap.to(camera.position, positions[key])
    } else {
      gsap.to(camera.position, {
        x: -12,
        y: 8,
        z: 0,
        duration: 2,
        ease: "none",
        onUpdate: function () {
          controls.target = new T.Vector3(0, 0, 0)
          controls.update()
        },
      })
      // fired = false;
      // document.querySelector("main").classList.remove('bottom-0')
      // document.querySelector("main").classList.add('top-1/2')
      // document.querySelector("main").classList.add('-translate-y-1/2')
      // renderer.setSize(400, 300)
      // renderer.setPixelRatio(window.devicePixelRatio)
      // document.getElementById('canvasHolder').classList.remove('w-full')
      // document.getElementById('canvasHolder').classList.add('w-1/2')
      // controls.reset()
      // controls.autoRotate = true;
      // controls.update()
    }
  })
})

loader.load("scene.gltf", function (gltf) {
  const mesh = gltf.scene;
  mesh.position.set(0, 0, 0)
  scene.add(mesh)
})

const geometry = new T.BoxGeometry(50, 5, 50);
const material = new T.MeshStandardMaterial({ color: 0x000000 });
const baseCube = new T.Mesh(geometry, material);
baseCube.receiveShadow = true
baseCube.position.set(0, -2, 0)
// baseCube.name = "start"
// scene.add(baseCube)

const geo2 = new T.BoxGeometry(1, 1, 1)
const material2 = new T.MeshStandardMaterial({ color: 0xffffff });
let firstLayer = [{ name: "next", color: 0x000000 }, { name: "previous", color: 0x000000 }, { name: "", color: 0x000000 }, { name: "", color: 0x000000 }]
let secondLayer = [{ name: "start", color: 0x00FF00 }, { name: "stop", color: 0xFF0000 }, { name: "forward", color: 0x00FFFF }, { name: "rewind", color: 0xFFA500 }]
let cubesGroup = new T.Group();

for (let i = 0; i < 2; i++) {
  let space = 0.3
  for (let j = 0; j < 4; j++) {
    let cube = new T.Mesh(geo2, material2);
    cube = new T.Mesh(geo2, cube.material.clone())
    cube.position.set(0, 1, j + 12 + space)
    cube.name = firstLayer[j].name
    cube.material.color.set(firstLayer[j].color)
    space += 0.3
    if (i >= 1) {
      cube.position.set(0, 2.2, j + 12 + space - 0.3)
      cube.name = secondLayer[j].name
      cube.material.color.set(secondLayer[j].color)
    }
    cubesGroup.add(cube)
    scene.add(cubesGroup)
  }
}

const videoTexture = new T.VideoTexture(document.getElementById("video"))
videoTexture.needsUpdate = true;
const material3 = new T.MeshStandardMaterial({ color: 0xffffff, map: videoTexture, side: T.FrontSide, toneMapped: false });
material3.needsUpdate = true;
const geo3 = new T.BoxGeometry(1, 4, 4.9)
const geo4 = new T.BoxGeometry(0.8, 4.3, 5.2)
const bigCube = new T.Mesh(geo3, [
  new T.MeshStandardMaterial({ color: 0xffffff }),
  material3,
  new T.MeshStandardMaterial({ color: 0xffffff }),
  new T.MeshStandardMaterial({ color: 0xffffff }),
  new T.MeshStandardMaterial({ color: 0xffffff }),
  new T.MeshStandardMaterial({ color: 0xffffff }),
]);

const bigCube2 = new T.Mesh(geo4, material);
bigCube.position.set(0, 5, 14.25)
bigCube2.position.set(0, 5, 14.25)
scene.add(bigCube)
scene.add(bigCube2)

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
// const dl2 = new T.DirectionalLight(0xffffff, 2)
// dl2.position.set(0, 50, 0)
// dl2.castShadow = true
// scene.add(dl2)

const raycaster = new T.Raycaster()

window.addEventListener('mousemove', onMouseDown)

console.log(scene.children)
function onMouseDown(event) {
  camera.updateProjectionMatrix()
  controls.update()
  const coords = new T.Vector2(
    (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
    -((event.clientY / renderer.domElement.clientHeight) * 2 + 1),
  )
  raycaster.setFromCamera(coords, camera)

  let intersections = raycaster.intersectObjects(scene.children, true);
  if (intersections.length > 0) {
    if (intersections[0].object.name == "start") {
      document.getElementById("video").play();
      console.log("played");
    }
    console.log(intersections[0].object.geometry.parameters)
  }
  camera.updateProjectionMatrix()
  controls.update()
}


function animate() {
  renderer.render(scene, camera);
  camera.updateProjectionMatrix()
  controls.update()
}
renderer.setAnimationLoop(animate)