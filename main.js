import * as T from "three";
import gsap from "gsap";
import { CSS3DObject, CSS3DRenderer, OrbitControls, Reflector, TextGeometry, FontLoader, Font } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';;
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { TextureLoader } from "three";
import { VideoTexture } from "three";
import HelvetikerFont from "three/examples/fonts/helvetiker_regular.typeface.json";

const fontLoader = new FontLoader()
const font = fontLoader.parse(HelvetikerFont)
const textGeometry = new TextGeometry('BACK', {
  font: font,
  size: 0.4,
  depth: 0.2,
});
textGeometry.computeBoundingBox();
const textMat = new T.MeshStandardMaterial({ color: 0xffff00 })
const textMesh = new T.Mesh(textGeometry, textMat)
textMesh.name = "back2"
textMesh.rotateY(30.34)
textMesh.rotateX(31.8)
textMesh.rotateZ(0.2)

document.getElementById("video").play()
const video = new VideoTexture(document.getElementById("video"))
const audio = document.getElementById("audio");
let imgTextureLoader;

var click = new Audio('Sounds/click.mp3');
var whoosh = new Audio("Sounds/whoosh.mp3")
var ding = new Audio("Sounds/ding.mp3")
var bloop = new Audio("Sounds/bloop.mp3")
const darkMaterial = new T.MeshBasicMaterial({ color: 'black' });
const materials = {};
const scene = new T.Scene();
const scene2 = new T.Scene();
const camera = new T.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000)
const loader = new GLTFLoader().setPath("./New4/");
const loader2 = new TextureLoader()

const renderer = new T.WebGLRenderer({ antialias: true, alpha: true });
const renderer2 = new CSS3DRenderer();
renderer2.setSize(window.innerWidth, window.innerHeight)
const div = document.createElement('div')
div.style.width = "1920px"
div.style.height = "800px"
div.innerHTML = `<iframe src="form.html" frameborder="0" style="backface-visibility: hidden; width:100%; height:100%;"></iframe>`
const blackDiv = document.createElement('div')
blackDiv.style.width = "1920px"
blackDiv.style.height = "800px"
blackDiv.classList.add("bg-black")
const css3DObject = new CSS3DObject(div)
const css3DObject2 = new CSS3DObject(blackDiv)
css3DObject.scale.set(0.00470, 0.00505, 1)
css3DObject.position.set(-8, 26.25, -3.7)
css3DObject.lookAt(-172, 16.3, 0)
css3DObject.updateMatrixWorld()
css3DObject2.scale.set(0.00470, 0.00505, 1)
css3DObject2.position.set(-7.7, 26.25, -3.7)
css3DObject2.lookAt(-172, 16.3, 0)
css3DObject2.updateMatrixWorld()
// if (detectDeviceType() == "Mobile") {
//   div.style.width = "2060px"
//   div.style.height = "800px"
//   blackDiv.style.width = "2060px"
//   blackDiv.style.height = "800px"
//   css3DObject.position.set(-8, 26.25, -1)
//   css3DObject.position.set(-7.7, 26.25, -1)
// }
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
// renderer.toneMapping = T.CineonToneMapping
// renderer.toneMappingExposure = 1.5
// renderer.outputColorSpace = T.SRGBColorSpace
renderer.domElement.classList.add("absolute")
renderer2.domElement.classList.add("z-[4]")
renderer2.domElement.classList.add("absolute")
renderer2.domElement.style.pointerEvents = "none";
renderer2.domElement.classList.add("top-0")
renderer2.domElement.classList.add("w-[1000px]")
renderer2.domElement.classList.add("h-[500px]")
renderer2.setSize(window.innerWidth, window.innerHeight)

camera.position.set(-35, 45, -60)

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
    document.getElementById('canvasHolder').appendChild(renderer2.domElement);
    click.play()
    whoosh.play()
    window.setTimeout(() => { ding.play() }, 1000)


    // window.setInterval(() => {
    //   scene.traverseVisible(obj => {
    //     if (obj.name == "rain") {
    //       gsap.to(obj.position, {
    //         y: 0,
    //         duration: 2,
    //         ease: "none",
    //       })
    //     }
    //   })
    //   scene.traverseVisible(obj => {
    //     if (obj.name == "rain") {
    //       const [y] = Array(1).fill().map(() => T.MathUtils.randFloatSpread(45))
    //       obj.position.y = 40 + y
    //     }
    //   })
    // }, 2005);
  }
})

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer2.setSize(window.innerWidth, window.innerHeight);
  bloomComposer.setSize(window.innerWidth, window.innerHeight);
});

loader.load("dake03.gltf", function VR(gltf) {
  var mesh = gltf.scene;
  console.log(mesh);
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

  imgTextureLoader = () => loader2.load("./images/form.png", function (texture) {
    texture.flipY = true;
    texture.wrapS = 1000
    texture.wrapT = 1000
    texture.repeat.set(13, 7)
    texture.offset.set(0, 0.75)
    mesh.children[0].children[0].getObjectByName("D03PIV").material.map = texture;
  })

  mesh.children[0].children[0].getObjectByName("M_Dake6PIV").layers.toggle(BLOOM_SCENE)
  mesh.children[0].children[0].getObjectByName("M_Dake16PIV").layers.toggle(BLOOM_SCENE)
  mesh.children[0].children[0].getObjectByName("M_Dake15PIV").layers.toggle(BLOOM_SCENE)
  mesh.children[0].children[0].getObjectByName("M_Dake12PIV").layers.toggle(BLOOM_SCENE)
  mesh.children[0].children[0].getObjectByName("M_Dake984PIV").layers.toggle(BLOOM_SCENE)
  mesh.children[0].children[0].getObjectByName("M_Dake991PIV").layers.toggle(BLOOM_SCENE)
  mesh.children[0].children[0].getObjectByName("M_Dake1005PIV").layers.toggle(BLOOM_SCENE)
  mesh.children[0].children[0].getObjectByName("M_Dake1031PIV").layers.toggle(BLOOM_SCENE)
  scene.add(mesh)
  loading()
})

loader.setPath("./mars/")

// loader.load("scene.gltf", function (gltf) {
//   const mesh = gltf.scene;
//   mesh.position.set(-25, 70, 25)
//   scene.add(mesh)
// })

const cube = new T.Mesh(new T.BoxGeometry(1.5, 1, 0.1), new T.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0 }))
cube.position.set(13.3, 4.9, -0.8)
cube.lookAt(0, 5, -25)
cube.name = "back"
scene.add(cube)

const BLOOM_SCENE = 1;
const bloomLayer = new T.Layers();
bloomLayer.set(BLOOM_SCENE);

const renderScene = new RenderPass(scene, camera);
const outputPass = new OutputPass();

const bloomPass = new UnrealBloomPass(new T.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
bloomPass.threshold = 0
bloomPass.strength = 0.5
bloomPass.radius = 0.2

const bloomComposer = new EffectComposer(renderer);
bloomComposer.renderToScreen = false;
bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);

const mixPass = new ShaderPass(
  new T.ShaderMaterial({
    uniforms: {
      baseTexture: { value: null },
      bloomTexture: { value: bloomComposer.renderTarget2.texture }
    },
    vertexShader: document.getElementById('vertexshader').textContent,
    fragmentShader: document.getElementById('fragmentshader').textContent,
  }), 'baseTexture'
);
mixPass.needsSwap = true;

const finalComposer = new EffectComposer(renderer);
finalComposer.addPass(renderScene);
finalComposer.addPass(mixPass);
finalComposer.addPass(outputPass);

const controls = new OrbitControls(camera, renderer.domElement)
controls.enablePan = false
controls.minPolarAngle = 1.1;
controls.maxPolarAngle = 1.73;
controls.minDistance = 0;
controls.maxDistance = 60;
controls.rotateSpeed = 0.5;
controls.update()

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
const spl1 = new T.SpotLight(0xffff00, 10000, 85, Math.PI + 0.1, 10, 1.8)
const spl2 = new T.SpotLight(0xff00ff, 10000, 85, Math.PI + 0.1, 10, 1.8)
const spl3 = new T.SpotLight(0xffff00, 10000, 85, Math.PI + 0.1, 10, 1.8)
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

window.addEventListener('pointerdown', onMouseDown)

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
    console.log(intersections[0].object);
    if (intersections[0].object.name == "foodsPIV") {
      click.play()
      whoosh.play()
      gsap.to(camera.position, {
        x: 17.6,
        y: 5.7,
        z: 3.57,
        duration: 1.4,
        ease: "none",
        onUpdate: function () {
          controls.target = new T.Vector3(3, 6.5, -17)
          controls.update()
        },
      })
      controls.enabled = false;
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
    if (intersections[0].object.name == "back") {
      click.play()
      whoosh.play()
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
      })
      controls.enabled = true;
    }
    if (intersections[0].object.name == "franchisingPIV") {
      if (detectDeviceType() == "Desktop") {
        click.play()
        whoosh.play()
        // css3DObject.scale(0.00470, 0.00505, 1)
        // css3DObject2.scale(0.00470, 0.00505, 1)
        textMesh.position.set(-8, 29, -8.6);
        scene.add(textMesh);
        gsap.to(camera.position, {
          x: -15.3,
          y: 26.3,
          z: -3.7,
          duration: 1.4,
          ease: "none",
          onUpdate: function () {
            controls.target = new T.Vector3(0, 26.3, -3.7)
            controls.update()
          },
        })
        window.setTimeout(() => {
          scene.children[scene.children.length - 2].children[0].children[0].getObjectByName("D03PIV").material.map = null;
          scene.add(css3DObject)
          scene.add(css3DObject2)
        }, 300)
        controls.enabled = false;
      } else {

        click.play()
        whoosh.play()
        textMesh.position.set(-8, 29, -8.6);
        scene.add(textMesh);
        gsap.to(camera.position, {
          x: -21.3,
          y: 26.3,
          z: -3.7,
          duration: 1.4,
          ease: "none",
          onUpdate: function () {
            controls.target = new T.Vector3(0, 26.3, -3.7)
            controls.update()
          },
        })
        window.setTimeout(() => {
          scene.children[scene.children.length - 2].children[0].children[0].getObjectByName("D03PIV").material.map = null;
          scene.add(css3DObject)
          scene.add(css3DObject2)
        }, 300)
        controls.enabled = true;
      }
    }
    if (intersections[0].object.name == "back2") {
      click.play()
      whoosh.play()
      scene.remove(textMesh);
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
      })
      window.setTimeout(() => {
        loader2.load("./images/form.png", function (texture) {
          texture.flipY = true;
          texture.wrapS = 1000
          texture.wrapT = 1000
          texture.repeat.set(13, 7)
          texture.offset.set(0, 0.75)
          scene.children[scene.children.length - 1].children[0].children[0].getObjectByName("D03PIV").material.map = texture;
        })
        scene.remove(css3DObject)
        scene.remove(css3DObject2)
      }, 300)
      controls.enabled = true;
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

document.getElementById("loadingScreen").classList.add("z-[20]");
document.getElementById("loadingScreen").innerHTML = `<img src="images/loading.gif" class="w-auto h-[200px]">`
function loading() {
  document.getElementById("loadingScreen").classList.add("hidden")
}

function detectDeviceType() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    console.log("Mobile");
    return "Mobile";
  } else return "Desktop"
}

function darkenNonBloomed(obj) {
  if (obj.isMesh && bloomLayer.test(obj.layers) === false) {
    materials[obj.uuid] = obj.material;
    obj.material = darkMaterial;
  }
}

function restoreMaterial(obj) {
  if (materials[obj.uuid]) {
    obj.material = materials[obj.uuid];
    delete materials[obj.uuid];
  }
}

function addStars() {
  const geometry = new T.SphereGeometry(0.15, 0.15, 0.15);
  const mat = new T.MeshStandardMaterial({ color: 0xffffff })
  const starsMesh = new T.Mesh(geometry, mat)
  starsMesh.name = "rain";

  const [x, z] = Array(2).fill().map(() => T.MathUtils.randFloatSpread(400))
  const [y] = Array(1).fill().map(() => T.MathUtils.randFloatSpread(45))

  starsMesh.position.set(x, 60 + y, z);
  scene.add(starsMesh);
}

Array(1200).fill().forEach(addStars)

scene.traverseVisible(obj => {
  if (obj.name == "rain") {
    const [y] = Array(1).fill().map(() => T.MathUtils.randFloatSpread(8))
    obj.position.y = 60 + y
  }
})


function animate() {
  // console.log(scene.children)
  requestAnimationFrame(animate);
  // const spin = scene.children[scene.children.length - 1].children[0].getObjectByName("SA_Obj29PIV")
  // spin.rotateOnAxis(new T.Vector3(1,0,0) , 1)
  controls.update()
  renderer2.render(scene, camera)
  // camera.layers.set(0);
  // baseComposer.render();

  // // Render bloom only for the objects on layer 1
  // camera.layers.set(1);
  // bloomComposer.render();
  // camera.layers.set(0); // Reset to render all layers

  // // Combine the base scene and the bloom
  // finalComposer.passes[0].uniforms.baseTexture.value = baseComposer.renderTarget2.texture;
  // renderer.setRenderTarget(null);
  // renderer.clear();
  // finalComposer.render();

  // renderer.render(scene, camera)
  // renderer2.render(scene2, camera)

  // renderer.setRenderTarget(composer.renderTarget2);
  // renderer.render(bloomScene, camera);
  // renderer.setRenderTarget(null);

  // composer.render()

  scene.traverse(darkenNonBloomed);

  bloomComposer.render();
  scene.traverse(restoreMaterial);
  finalComposer.render();
  // camera.updateProjectionMatrix()
}
animate()