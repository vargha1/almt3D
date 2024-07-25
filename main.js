import * as T from "three";
import gsap from "gsap";
import { CSS3DObject, CSS3DRenderer, OrbitControls } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { TextGeometry } from "three/examples/jsm/Addons.js";
import { FontLoader } from "three/examples/jsm/Addons.js";
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';;
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { Reflector } from "three/examples/jsm/Addons.js";
import { TextureLoader } from "three";
import { VideoTexture } from "three";

document.getElementById("video").play()
const video = new VideoTexture(document.getElementById("video"))
var isFinished = false
const audio = document.getElementById("audio");

var click = new Audio('Sounds/click.mp3');
var whoosh = new Audio("Sounds/whoosh.mp3")
var ding = new Audio("Sounds/ding.mp3")
var bloop = new Audio("Sounds/bloop.mp3")
const scene = new T.Scene();
const scene2 = new T.Scene();
const camera = new T.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1400)
const loader = new GLTFLoader().setPath("./New4/");
const loader2 = new FontLoader()
const renderer = new T.WebGLRenderer({ antialias: true });
const renderer2 = new CSS3DRenderer();
renderer2.setSize(window.innerWidth, window.innerHeight)
const div = document.createElement('div')
div.style.width = "1024px"
div.style.height = "1240px"
div.innerHTML = `<iframe src="https://safahanbattery.ir/" frameborder="0" style="backface-visibility: hidden; width:100%; height:100%;"></iframe>`
const css3DObject = new CSS3DObject(div)
css3DObject.scale.set(0.0295, 0.0317, 1)
css3DObject.position.set(-12.2, 138, -23)
css3DObject.lookAt(172, 200, -22)
css3DObject.updateMatrixWorld()
scene2.add(css3DObject)
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
// renderer2.domElement.classList.add("absolute")
// renderer2.domElement.style.pointerEvents = "none";
// renderer2.domElement.classList.add("top-0")
// renderer2.domElement.classList.add("z-[4]")
// renderer2.domElement.classList.add("w-[1000px]")
// renderer2.domElement.classList.add("h-[500px]")
// document.getElementById('canvasHolder').appendChild(renderer2.domElement);

camera.position.set(-35, 45, -40)

document.addEventListener("DOMContentLoaded", () => {
  window.start = () => {
    audio.setAttribute('src', "CityCrowd.mp3")
    audio.play()
    document.querySelector("#startSection").classList.add("hidden")
    gsap.to(camera.position, {
      x: -18,
      y: 5,
      z: 45,
      duration: 1.4,
      ease: "none",
      onUpdate: function () {
        controls.target = new T.Vector3(0, 13, 0)
        controls.update()
      },
    },)
    document.getElementById("canvasHolder").appendChild(renderer.domElement);
    click.play()
    whoosh.play()
    window.setTimeout(() => { ding.play() }, 1000)

  }
})

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

loader.load("dake03.gltf", function (gltf) {
  var mesh = gltf.scene;
  mesh.position.set(0, 1, 0);
  const planeGeo = new T.PlaneGeometry(250, 250)
  const reflector = new Reflector(planeGeo, {
    clipBias: 0.003,
    textureWidth: window.innerWidth * window.devicePixelRatio,
    textureHeight: window.innerHeight * window.devicePixelRatio,
    color: 0x777777
  });

  const transparentMaterial = new T.MeshStandardMaterial({
    color: 0x777777,
    transparent: true,
    opacity: 0.97
  });
  const transparentPlane = new T.Mesh(geometry, transparentMaterial);
  transparentPlane.position.y = 1.02;  // Slightly above the reflective surface
  // scene.add(transparentPlane);
  console.log(mesh);
  reflector.position.y = 0
  reflector.rotation.x = - Math.PI / 2;
  scene.add(reflector);
  // mesh.children[0].children[0].traverseVisible((obj) => {
  //   obj.layers.set(0)
  // })
  const object1 = mesh.children[0].children[0].getObjectByName("D10PIV")
  const object2 = mesh.children[0].children[0].getObjectByName("D09PIV")
  const object3 = mesh.children[0].children[0].getObjectByName("D05PIV")
  const object4 = mesh.children[0].children[0].getObjectByName("D06PIV")
  const object5 = mesh.children[0].children[0].getObjectByName("D07PIV")
  mesh.children[0].children[0].getObjectByName("M_Dake13").position.y = 0.01;
  mesh.children[0].children[0].getObjectByName("M_Dake13").material.transparent = true;
  mesh.children[0].children[0].getObjectByName("M_Dake13").material.opacity = 0.90;
  mesh.children[0].children[0].getObjectByName("M_Dake990PIV").position.y = 0.05
  // object1.material = [
  //   new T.MeshStandardMaterial({ color: 0xffffff }),
  //   new T.MeshStandardMaterial({ color: 0xffffff }),
  //   new T.MeshStandardMaterial({ color: 0xffffff }),
  //   new T.MeshStandardMaterial({ color: 0xffffff }),
  //   new T.MeshStandardMaterial({ map: new TextureLoader().load("images/vendingMachineMenu.png") }),
  //   new T.MeshStandardMaterial({ color: 0xffffff }),
  // ]
  // console.log(object1);

  if (object1) {
    new TextureLoader().load("images/vendingMachineMenu.png", (texture) => {
      // تنظیمات تکسچر
      texture.encoding = T.sRGBEncoding;
      texture.flipY = false;  // ممکن است نیاز باشد این را تغییر دهید

      // تنظیم wrapping و filtering
      texture.wrapS = texture.wrapT = T.ClampToEdgeWrapping;
      texture.minFilter = T.LinearFilter;
      texture.magFilter = T.LinearFilter;
      texture.repeat.set(7, 5);
      texture.wrapS = 1000;
      texture.wrapT = 1000;
      texture.offset.set(-0.03, 0.02);
      // texture.rotation = 0;
      // ایجاد متریال جدید
      const material = new T.MeshStandardMaterial({
        map: texture,
      });

      // اعمال متریال به آبجکت
      object1.material = material;
      object1.material.needsUpdate = true;
      // بررسی UV mapping
      if (!object1.geometry.attributes.uv) {
        console.warn("No UV mapping found on the object. Texture may not display correctly.");
      } else {
        // اگر نیاز به تنظیم UV باشد، می‌توانید اینجا انجام دهید
        // object1.geometry.attributes.uv.needsUpdate = true;
      }

      // درخواست رندر مجدد صحنه (اگر نیاز است)
      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
    });
  }
  if (object2) {
    new TextureLoader().load("images/BSOD.png", (texture) => {
      // تنظیمات تکسچر
      texture.encoding = T.sRGBEncoding;
      texture.flipY = false;  // ممکن است نیاز باشد این را تغییر دهید

      // تنظیم wrapping و filtering
      texture.wrapS = texture.wrapT = T.ClampToEdgeWrapping;
      texture.minFilter = T.LinearFilter;
      texture.magFilter = T.LinearFilter;
      texture.repeat.set(15, 10);
      texture.wrapS = 1000;
      texture.wrapT = 1000;
      texture.offset.set(0.35, -0.05);
      // texture.rotation = 0;
      // ایجاد متریال جدید
      const material2 = new T.MeshStandardMaterial({
        map: texture,
      });

      // اعمال متریال به آبجکت
      object2.material = material2;
      object2.material.needsUpdate = true;
      object2.material.toneMapped = true;
      // بررسی UV mapping
      if (!object2.geometry.attributes.uv) {
        console.warn("No UV mapping found on the object. Texture may not display correctly.");
      } else {
        // اگر نیاز به تنظیم UV باشد، می‌توانید اینجا انجام دهید
        // object2.geometry.attributes.uv.needsUpdate = true;
      }

      // درخواست رندر مجدد صحنه (اگر نیاز است)
      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
    });
  }
  if (object3) {
    // اعمال متریال به آبجکت
    object3.material = new T.MeshStandardMaterial({ map: video });
    object3.material.map.repeat.set(20, 15);
    object3.material.map.wrapS = 1000;
    object3.material.map.wrapT = 1002;
    // object3.material.needsUpdate = true;
    object3.material.toneMapped = false;
    // بررسی UV mapping
    if (!object3.geometry.attributes.uv) {
      console.warn("No UV mapping found on the object. Texture may not display correctly.");
    } else {
      // اگر نیاز به تنظیم UV باشد، می‌توانید اینجا انجام دهید
      // object3.geometry.attributes.uv.needsUpdate = true;
    }

    // درخواست رندر مجدد صحنه (اگر نیاز است)
  }
  if (object4) {
    // اعمال متریال به آبجکت
    object4.material = new T.MeshStandardMaterial({ map: video });
    object4.material.map.repeat.set(20, 15);
    object4.material.map.wrapS = 1000;
    object4.material.map.wrapT = 1002;
    // object4.material.needsUpdate = true;
    object4.material.toneMapped = false;
    // بررسی UV mapping
    if (!object4.geometry.attributes.uv) {
      console.warn("No UV mapping found on the object. Texture may not display correctly.");
    } else {
      // اگر نیاز به تنظیم UV باشد، می‌توانید اینجا انجام دهید
      // object4.geometry.attributes.uv.needsUpdate = true;
    }

    // درخواست رندر مجدد صحنه (اگر نیاز است)
  }
  if (object5) {
    // اعمال متریال به آبجکت
    object5.material = new T.MeshStandardMaterial({ map: video });
    object5.material.map.repeat.set(20, 15);
    object5.material.map.wrapS = 1000;
    object5.material.map.wrapT = 1002;
    // object5.material.needsUpdate = true;
    object5.material.toneMapped = false;
    // بررسی UV mapping
    if (!object5.geometry.attributes.uv) {
      console.warn("No UV mapping found on the object. Texture may not display correctly.");
    } else {
      // اگر نیاز به تنظیم UV باشد، می‌توانید اینجا انجام دهید
      // object5.geometry.attributes.uv.needsUpdate = true;
    }

    // درخواست رندر مجدد صحنه (اگر نیاز است)
  }
  if (object5) {
    // اعمال متریال به آبجکت
    object5.material = new T.MeshStandardMaterial({ map: video });
    object5.material.map.repeat.set(20, 15);
    object5.material.map.wrapS = 1000;
    object5.material.map.wrapT = 1002;
    // object5.material.needsUpdate = true;
    object5.material.toneMapped = false;
    // بررسی UV mapping
    if (!object5.geometry.attributes.uv) {
      console.warn("No UV mapping found on the object. Texture may not display correctly.");
    } else {
      // اگر نیاز به تنظیم UV باشد، می‌توانید اینجا انجام دهید
      // object5.geometry.attributes.uv.needsUpdate = true;
    }

    // درخواست رندر مجدد صحنه (اگر نیاز است)
  }

  scene.add(mesh)
})

var bloomPass = new UnrealBloomPass(new T.Vector2(window.innerWidth, window.innerHeight), 1, 0.4, 0);
bloomPass.threshold = 0;
bloomPass.strength = 0.1;
bloomPass.radius = 0.4;

const renderScene = new RenderPass(scene, camera);
// Composer for rendering the scene with bloom
const baseComposer = new EffectComposer(renderer);
baseComposer.renderToScreen = false;
baseComposer.addPass(renderScene);

const bloomComposer = new EffectComposer(renderer);
bloomComposer.renderToScreen = false;
bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);

// Final composer for rendering the full scene
const finalComposer = new EffectComposer(renderer);

const finalPass = new ShaderPass(new T.ShaderMaterial({
  uniforms: {
    baseTexture: { value: null },
    bloomTexture: { value: bloomComposer.renderTarget2.texture }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D baseTexture;
    uniform sampler2D bloomTexture;
    varying vec2 vUv;
    void main() {
      vec4 base = texture2D(baseTexture, vUv);
      vec4 bloom = texture2D(bloomTexture, vUv);
      gl_FragColor = base + bloom;
    }
  `
}));
finalPass.needsSwap = true;
// finalComposer.addPass(finalPass);

// var font = loader2.parse(HelvetikerFont)
// const geo = new TextGeometry("My name is Vargha\nand i am a frontend web\ndeveloper", {
//   font: font,
//   size: 0.3,
//   depth: 0.1,
//   curveSegments: 12,
// })

// const textMesh = new T.Mesh(geo, new T.MeshPhongMaterial({ color: 0xffffff }))
// textMesh.position.set(-1.3, 4.5, -7)
// scene.add(textMesh)

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
controls.minPolarAngle = 1.15;
controls.maxPolarAngle = 1.7;
controls.minDistance = 15;
controls.maxDistance = 80;
controls.rotateSpeed = 0.5;
controls.update()

// document.querySelectorAll('button').forEach((btn, key) => {
//   btn.addEventListener('click', () => {
//     if (key != 3) {
//       gsap.to(camera.position, positions[key])
//     } else {
//       gsap.to(camera.position, {
//         x: -12,
//         y: 8,
//         z: 0,
//         duration: 2,
//         ease: "none",
//         onUpdate: function () {
//           controls.target = new T.Vector3(0, 0, 0)
//           controls.update()
//         },
//       })
//       // fired = false;
//       // document.querySelector("main").classList.remove('bottom-0')
//       // document.querySelector("main").classList.add('top-1/2')
//       // document.querySelector("main").classList.add('-translate-y-1/2')
//       // renderer.setSize(400, 300)
//       // renderer.setPixelRatio(window.devicePixelRatio)
//       // document.getElementById('canvasHolder').classList.remove('w-full')
//       // document.getElementById('canvasHolder').classList.add('w-1/2')
//       // controls.reset()
//       // controls.autoRotate = true;
//       // controls.update()
//     }
//   })
// })

const geometry = new T.BoxGeometry(5, 5, 5);
const material = new T.MeshStandardMaterial({ color: 0xffff00 });
const baseCube = new T.Mesh(geometry, material);
baseCube.receiveShadow = true
baseCube.position.set(15, 5, 10)
// baseCube.name = "start"
// addBloomObj(baseCube)

const geo2 = new T.BoxGeometry(1, 1, 1)
const material2 = new T.MeshStandardMaterial({ color: 0xffffff });
let firstLayer = [{ name: "next", color: 0x000000 }, { name: "previous", color: 0x000000 }, { name: "", color: 0x000000 }, { name: "", color: 0x000000 }]
let secondLayer = [{ name: "start", color: 0x00FF00 }, { name: "stop", color: 0xFF0000 }, { name: "forward", color: 0x00FFFF }, { name: "rewind", color: 0xFFA500 }]

for (let i = 0; i < 2; i++) {
  let space = 0.3
  for (let j = 0; j < 4; j++) {
    let cube = new T.Mesh(geo2, material2);
    cube = new T.Mesh(geo2, cube.material.clone())
    cube.position.set(0, 5, j + 27 + space)
    cube.name = firstLayer[j].name
    cube.material.color.set(firstLayer[j].color)
    space += 0.3
    if (i >= 1) {
      cube.position.set(0, 7.2, j + 27 + space - 0.3)
      cube.name = secondLayer[j].name
      cube.material.color.set(secondLayer[j].color)
    }
    // scene.add(cube)
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
bigCube.position.set(0, 5, 29.25)
bigCube2.position.set(0, 5, 29.25)
// scene.add(bigCube)
// scene.add(bigCube2)
// scene2.add(bigCube)
// scene2.add(bigCube2)

const ambientLight = new T.AmbientLight(0xffffff, 0.2)
// scene.add(ambientLight)
// const pl1 = new T.PointLight(0xffff, 9000);
// pl1.position.set(0, 20, 80)
// pl1.castShadow = true
// scene.add(pl1);
const spl1 = new T.SpotLight(0xffff00, 15000, 85, Math.PI + 0.1, 10, 1.8)
const spl2 = new T.SpotLight(0xff00ff, 15000, 85, Math.PI + 0.1, 10, 1.8)
const spl3 = new T.SpotLight(0xffff00, 15000, 85, Math.PI + 0.1, 10, 1.8)
spl1.position.set(25, 65, 10)
spl1.target.position.set(25, -2, 10)
spl2.position.set(15, 65, -15)
spl2.target.position.set(15, -2, -15)
spl3.position.set(1, 65, 7)
spl3.target.position.set(1, -2, 7)
scene.add(spl1);
scene.add(spl2);
scene.add(spl3);

// // const pl2Helper = new T.PointLightHelper(pl2, 1);
// scene.add(pl2Helper)
const pl3 = new T.PointLight(0xffff00, 1000);
pl3.position.set(-20, 18, 0)
pl3.castShadow = true
scene.add(pl3);
// const pl4 = new T.PointLight(0xffffff, 5000);
// pl4.position.set(0, 10, -80)
// pl4.castShadow = true
// scene.add(pl4);
// const pl5 = new T.PointLight(0xffffff, 5000);
// pl5.position.set(-80, 10, 0)
// pl5.castShadow = true
// scene.add(pl5);
// const pl6 = new T.PointLight(0xffff, 100);
// pl6.position.set(4, 7.5, 5.5)
// pl6.castShadow = true
// scene.add(pl6);
const dl1 = new T.DirectionalLight(0xffffff, 1.5)
dl1.castShadow = true
camera.add(dl1)
scene.add(camera)
// const dl2 = new T.DirectionalLight(0xffffff, 10)
// dl2.position.set(0, 25, 0)
// dl2.castShadow = true
// scene.add(dl2)

const raycaster = new T.Raycaster()
// const raycaster2 = new T.Raycaster()

window.addEventListener('click', onMouseDown)
// window.addEventListener('click', onMouseDown2)

function onMouseDown(event) {
  camera.updateProjectionMatrix()
  controls.update()
  const coords = new T.Vector2(
    (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
    -((event.clientY / renderer.domElement.clientHeight) * 2 - 1),
  )
  raycaster.setFromCamera(coords, camera)

  let intersections = raycaster.intersectObjects(scene.children, true);
  if (intersections.length > 0) {
    console.log(intersections[0].object)
    if (intersections[0].object.name == "foodsPIV") {
      click.play()
      whoosh.play()
      gsap.to(camera.position, {
        x: 17.6,
        y: 7.2,
        z: 3.57,
        duration: 1.4,
        ease: "none",
        onUpdate: function () {
          controls.target = new T.Vector3(3, 8, -17)
          controls.update()
        },
      })
    }
    if (intersections[0].object.name == "aboutPIV") {
      click.play()
      whoosh.play()
      gsap.to(camera.position, {
        x: 28,
        y: 40,
        z: 30,
        duration: 1.4,
        ease: "none",
        onUpdate: function () {
          controls.target = new T.Vector3(0, 3, 0)
          controls.update()
        },
      })
    }
  }
  camera.updateProjectionMatrix()
  controls.update()
}

// camera.layers.enable(0);
// camera.layers.set(0);
// maskPass1.enabled = false;
// bloomPass.enabled = false;
// maskPass2.enabled = true;
// bloomComposer.render();

function loading() {
  document.getElementById("loadingScreen").classList.remove("hidden");
  document.getElementById("loadingScreen").classList.add("z-[20]");
  document.getElementById("loadingScreen").innerHTML = `<img src="images/loading.gif" class="w-auto h-[200px]">`
  setTimeout(() => {
    document.getElementById("loadingScreen").classList.add("hidden");
  }, 8000)

}
loading()

function animate() {
  requestAnimationFrame(animate);


  // camera.layers.set(0);
  // baseComposer.render();

  // // Render bloom only for the objects on layer 1
  // camera.layers.set(1);
  // bloomComposer.render();
  // camera.layers.set(0); // reset to render all layers

  // // Combine the base scene and the bloom
  // finalComposer.passes[0].uniforms.baseTexture.value = baseComposer.renderTarget2.texture;
  // renderer.setRenderTarget(null);
  // renderer.clear();
  // finalComposer.render();
  renderer.render(scene, camera)
  // camera.updateProjectionMatrix()
  controls.update()
}
animate()