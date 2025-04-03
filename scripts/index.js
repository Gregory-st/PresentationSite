import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RenderPass, EffectComposer, EffectPass, BloomEffect } from 'postprocessing'
import * as CART from '../src/model/Cart.js';
import * as CARTM from '../src/model/CartMatte.js';

const scene = new THREE.Scene()
const width = window.innerWidth
const heigth = window.innerHeight

scene.background = new THREE.Color(
    0.0, 
    0.0, 
    0.004
);

const camera = new THREE.PerspectiveCamera(
    75,
    width/heigth,
    0.1,
    100
);
camera.position.z = 8;

const canvas = document.querySelector("canvas.threejs");

const renderer = new THREE.WebGLRenderer(
    {
        canvas: canvas,
        antialias: true
    }
);
renderer.setSize(width, heigth);
renderer.setPixelRatio(2);
renderer.setClearColor('white', 1);

const controll = new OrbitControls(camera, renderer.domElement);
controll.enableDamping = true;
controll.dampingFactor = 1;
controll.screenSpacePanning = false;
controll.minDistance = 2;
controll.maxDistance = 10;

//const ambentLigth = new THREE.AmbientLight('white', 1);
let ligths = [
    new THREE.SpotLight(0xe1bbfb, 300, 10, 90),
    new THREE.SpotLight('blue', 200, 15, 5),
    new THREE.SpotLight('white', 300, 15, 5),
    //new THREE.PointLight('white', 1)
];

ligths[0].position.set(0, 0, 5);

ligths[1].position.set(0, 8, 2);
ligths[1].target.position.set(8, 5, -2);
ligths[2].position.set(0, 8, 2);
ligths[2].target.position.set(-8, 5, -2);
//ligths[3].position.set(-5, 5, 1);

//scene.add(ambentLigth);
ligths.forEach(ligth => {
    scene.add(ligth);
    scene.add(ligth.target);
});

const geometry = await CART.getGeometry('../models/scene.gltf');

let materials1 = [
    CART.getMaterial('../src/texture/company.png', ligths, 500.0, camera),
    CART.getMaterial('../src/texture/logo.png',    ligths, 500.0, camera),
    CART.getMaterial('../src/texture/logo.png',    ligths, 500.0, camera)
];
const color = new THREE.Color(0x221358);
const diffuseColor = new THREE.Color(0xfff);
let materials2 = [
    CARTM.getMaterial(ligths, 1500.0, color, diffuseColor, camera),
    CARTM.getMaterial(ligths, 1500.0, color, diffuseColor, camera),
    CARTM.getMaterial(ligths, 1500.0, color, diffuseColor, camera)
];

for(let i = 0; i < materials1.length; i++) {
    let mesh = new THREE.Mesh(geometry, materials1[i]);
    mesh.rotation.x = getRadian(-15 + (10 * i));
    mesh.rotation.y = getRadian(25 - (10 * i));
    mesh.rotation.z = getRadian(-25 - (10 * i));

    mesh.position.x = 5 + i;    
    mesh.position.y = materials1.length - i - 2;
    mesh.position.z = 0;  

    scene.add(mesh);
}


for(let i = 0; i < materials2.length; i++){
    let mesh = new THREE.Mesh(geometry, materials2[i]);
    mesh.rotation.x = getRadian(15 - (10 * i));
    mesh.rotation.y = getRadian(-25 + (10 * i));
    mesh.rotation.z = getRadian(25 + (10 * i));

    mesh.position.x = -5 - i;    
    mesh.position.y = materials2.length - i - 2;
    mesh.position.z = 0;  

    scene.add(mesh);
}

const composer = new EffectComposer(renderer);

composer.addPass(new RenderPass(scene, camera));
composer.addPass(new EffectPass(camera, new BloomEffect()));

function animate(){
    requestAnimationFrame(animate);
    
    //renderer.render(scene, camera);
    //renderer.clear();
    composer.render();
}

animate();

function getRadian(ange){
    return Math.PI / 180 * ange;
}