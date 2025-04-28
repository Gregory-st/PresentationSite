import * as THREE from 'three';
import { gsap } from 'gsap';
import { BufferGeometryUtils } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();
const canvas = document.querySelector("canvas.threejs");
let width = canvas.clientWidth;  
let heigth = canvas.clientHeight;

const camera = new THREE.PerspectiveCamera(
    6,
    window.innerWidth / window.innerHeight,
    0.1,
    800
);
const renderer = new THREE.WebGLRenderer(
    {
        canvas: canvas,
        alpha: true,
        antialias: true,
        logarithmicDepthBuffer: true
    }
);
camera.position.set(150, 200, 400);
camera.lookAt(scene.position);
scene.add(camera);
renderer.setSize(width, heigth);
renderer.setPixelRatio(Math.max(1, window.devicePixelRatio));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

window.addEventListener('resize', () => {
    width = canvas.clientWidth;
    heigth = canvas.clientHeight;
    renderer.setSize(width, heigth);
    camera.aspect = width / heigth;
    camera.updateProjectionMatrix();
});

function getPath(radius, fineness, reverse) {
    const c = radius * 0.55191502449;
    const curvePath = new THREE.CurvePath();
    curvePath.curves.push(
      new THREE.CubicBezierCurve(
        new THREE.Vector2(0, radius), new THREE.Vector2(c, radius),
        new THREE.Vector2(radius, c), new THREE.Vector2(radius, 0)
      ),
      new THREE.CubicBezierCurve(
        new THREE.Vector2(radius, 0), new THREE.Vector2(radius, -c),
        new THREE.Vector2(c, -radius), new THREE.Vector2(0, -radius)
      ),
      new THREE.CubicBezierCurve(
        new THREE.Vector2(0, -radius), new THREE.Vector2(-c, -radius),
        new THREE.Vector2(-radius, -c), new THREE.Vector2(-radius, 0)
      ),
      new THREE.CubicBezierCurve(
        new THREE.Vector2(-radius, 0), new THREE.Vector2(-radius, c),
        new THREE.Vector2(-c, radius), new THREE.Vector2(0, radius)
      )
    );
    const points = curvePath.getPoints(fineness);
    return reverse ? points.reverse() : points;
  }

  function createShape(innerRadius, outerRadius, fineness) {
    const outer = getPath(outerRadius, fineness, false);
    const shape = new THREE.Shape(outer);
    const inner = getPath(innerRadius, fineness, true);
    shape.holes.push(new THREE.Path(inner));
    return shape;
  }

  function createTubeGeometry(radius, thickness, amount) {
    const shape = createShape(radius - thickness, radius, amount);
    const extrusion = {
      amount: amount,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.2,
      bevelSegments: 5
    };
    const geo = new THREE.ExtrudeGeometry(shape, extrusion);
    geo.normalizeNormals();
    geo.center();
    geo.computeVertexNormals();
    // корректировка нормалей для внутренней стороны
    geo.attributes.normal.array.forEach(face => {
      if (face.materialIndex === 1) {
        face.vertexNormals.forEach(n => { n.z = 0; n.normalize(); });
      }
    });
    geo.rotateX(Math.PI * 0.5);
    geo.rotateZ(Math.PI);
    geo.scale(1, 4, 1);
    return geo;
  }

const sideLength = 10;
const radius = 6;
const thickness = 2;
const offset = 0.3;
const tubeGeo = createTubeGeometry(radius, thickness, 15);

const materials = [
    new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 1.0, metalness: 0.0, flatShading: true, side: THREE.DoubleSide }),
    new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.6, metalness: 0.0, flatShading: true, side: THREE.DoubleSide })
];

const matrix = [];
for(let x = 0; x < sideLength; x++) {
    matrix[x] = [];
    for(let y = 0; y < sideLength; y++) {
        const t = tubeGeo.clone();
        const mesh = new THREE.Mesh(t, materials);
        let coord = -1;
        coord *= (sideLength / 2 * (radius + offset) * 2);
        mesh.position.set(coord + x * (radius + offset) * 2, 0, coord + y * (radius + offset) * 2 + 15);
        scene.add(mesh);
        matrix[x][y] = mesh;
    }
}

const ambient = new THREE.AmbientLight(0xffffff, 0.03);
scene.add(ambient);

const sun = new THREE.SpotLight(0xffffff, 40, 100, Math.PI, 2, 1);
sun.position.set(0, 50, 0);
scene.add(sun);

const lightGroups = [];
const countSphere = 5;
for (let i = 0; i < countSphere; i++) {
  const group = new THREE.Group();
  const pt = new THREE.PointLight(0xAA2EFF, 6, 6, 1.0);
  group.add(pt);
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(2, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xAA2EFF })
  );
  group.add(mesh);
  group.position.set(0, -5, 0);
  scene.add(group);
  lightGroups.push([group, 
    gsap.timeline({
      repeat: -1,
      repeatDelay: 0,
      defaults: {
        ease: 'power1.inOut',
        duration: 1
      }
    })
  ]);
}

const replace = (radius + offset) * 2;
const ramp = [-3, 3];
lightGroups.forEach(group => animateGroup(group));
function animateGroup(group) {
  group[1].delay(THREE.MathUtils.randFloat(0, 0.5));
  group[1].set(group[0].position, {
    x: THREE.MathUtils.randInt(ramp[0], ramp[1]) * replace,
    z: THREE.MathUtils.randInt(ramp[0], ramp[1]) * replace
  })
  .to(group[0].position, {
    y: 18,
    onStart: () => {
      gsap.to(group[0].children[0], {
        itencity: 50,
        distance: 50,
        delay: 0.3,
        duration: 0.7,
        ease: 'power1.inOut',
        repeat: 0
      })
    }
  })
  .to(group[0].position, {
    y: -10,
    onStart: () => {
      gsap.to(group[0].children[0], {
        itencity: 6,
        distance: 6,
        duration: 0.5,
        ease: 'power1.inOut',
        repeat: 0
      })
    },
    onComplete: () => {
      animateGroup(group);
    }
  })
}

function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();