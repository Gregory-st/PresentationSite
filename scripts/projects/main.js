import * as THREE from 'three';
import { gsap } from 'gsap';
import { BufferGeometryUtils } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();
const canvas = document.querySelector("canvas.threejs");
const width = canvas.clientWidth;  
const heigth = canvas.clientHeight;

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
      bevelThickness: 5,
      bevelSize: 0.2,
      bevelSegments: 1
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
for (let i = 0; i < 3; i++) {
  const group = new THREE.Group();
  const pt = new THREE.PointLight(0xf82c91, 4.0, 6, 1.0);
  group.add(pt);
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(2, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xf82c91 })
  );
  group.add(mesh);
  group.position.set(0, -5, 0);
  scene.add(group);
  lightGroups.push(group);
}

const mainTl = new gsap.timeline({
    repeat: -1,         // бесконечный повтор
    defaults: { ease: "none" } // дефолтный easing
});
lightGroups.forEach(group => animateGroup(group));
function animateGroup(group) {
  const tl = gsap.timeline({
    repeat: -1,         // бесконечный повтор
    yoyo: true,         // реверс при каждом повторе
    defaults: { ease: "none" } // дефолтный easing
  });
  tl.set(group.position, {
    x: THREE.MathUtils.randInt(-2, 2) * 12.4 + 6.2,
    z: THREE.MathUtils.randInt(-2, 2) * 12.4 + 6.2
  })
  .to(group.position, 2, { y: 18, ease: 'bounce.inOut' })
  .to(group.children[0], 1.2, { intensity: 4.0, distance: 18, ease: 'bounce.inOut' }, '-=1.2');
  tl.paused(true);
  mainTl.to(tl, 1.2, { 
    progress: 1, 
    ease: 'bounce.inOut', 
    onComplete: () => animateGroup(group), 
    delay: THREE.MathUtils.randFloat(0, 0.8) }, 
    mainTl.time()
);
}

function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();