import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RenderPass, EffectComposer, EffectPass, BloomEffect } from 'postprocessing'
import * as CART from '../src/model/Cart.js';
import * as CARTM from '../src/model/CartMatte.js';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';

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

let ligths = [
    new THREE.RectAreaLight(0xE1BBFB, 3, 8, 8),
    new THREE.RectAreaLight(0xFFFFFF, 2, 5, 5),
    new THREE.PointLight(0x6140B9, 10),
    new THREE.PointLight(0xB668EC, 5)
];

ligths[0].position.set(0, -3, 2);
ligths[0].rotation.x = getRadian(90);


ligths[1].position.set( 0, 5, 2);
ligths[1].rotation.x = getRadian(-45);
ligths[1].rotation.y = getRadian(0);
ligths[1].rotation.z = getRadian(0);

ligths[2].position.set( 6, 0, 2);
ligths[3].position.set( -6, 0, 2);

ligths.forEach(ligth => {
    scene.add(ligth);
    if(ligth.target != undefined)
        scene.add(ligth.target);
});
/*ligths.forEach(i => {
    let helper;
    switch(i.type){
        case 'SpotLight':
            helper = new THREE.SpotLightHelper(i);
        break;
        case 'PointLight':
            helper = new THREE.PointLightHelper(i);
        break;
        case 'DirectionalLight':
            helper = new THREE.DirectionalLightHelper(i);
        break;
        case 'RectAreaLight':
            helper = new RectAreaLightHelper(i);
        break;
    }
    scene.add(helper);
});*/

const geometry = await CART.getGeometry('../models/scene.gltf')
const geometryLigthArea = await CART.getGeometry('../models/AreaLigth.gltf');
const meshArea = new THREE.Mesh(
    geometryLigthArea,
    new THREE.MeshStandardMaterial({
        color: 0xE1BBFB,
        emissive: 0xE1BBFB,
        emissiveIntensity: 1.0
    })
);

meshArea.position.set(0, -2, 2);
meshArea.scale.set(2, 2, 2);

scene.add(meshArea);

let materials1 = [
    CART.getMaterial('../src/texture/company.png', ligths, 2.0, camera),
    CART.getMaterial('../src/texture/logo.png',    ligths, 2.0, camera),
    CART.getMaterial('../src/texture/logo.png',    ligths, 2.0, camera)
];
const color = new THREE.Color(0x221358);
const diffuseColor = new THREE.Color(0xfff);
let materials2 = [
    CARTM.getMaterial('../src/texture/company.png', ligths, 15.0, color, diffuseColor, camera),
    CARTM.getMaterial('../src/texture/logo.png',    ligths, 15.0, color, diffuseColor, camera),
    CARTM.getMaterial('../src/texture/logo.png',    ligths, 15.0, color, diffuseColor, camera)
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

let an = 0;
function animate(){
    requestAnimationFrame(animate);
    
    an += 1;
    if(an === 360) an = 0;

    //renderer.render(scene, camera);
    composer.render();
}

animate();

function getRadian(ange){
    return Math.PI / 180 * ange;
}