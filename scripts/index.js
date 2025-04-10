import * as THREE from 'three';
import * as CART from '../src/model/Cart.js';
import * as CARTM from '../src/model/CartMatte.js';

import volumeShaderVert from '../src/shaders/volume/shader.vert.js';
import volumeShaderFrag from '../src/shaders/volume/shader.frag.js';

const scene = new THREE.Scene();
const width = window.innerWidth - 20;
const heigth = window.innerHeight;

let targetPositionCenter = new THREE.Vector3();
let targetRotateCenter = new THREE.Vector3();
let targetPositionSide = new THREE.Vector3();
let targetRotateSide = new THREE.Vector3();

let stepAnimatePosition = new THREE.Vector3();
let stepAnimateRotate = new THREE.Vector3();

scene.background = new THREE.Color(
    0.0, 
    0.0, 
    0.0
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
renderer.setPixelRatio(Math.max(2, window.devicePixelRatio));
renderer.setClearColor('white', 1);

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

const geometry = await CART.getGeometry('../models/scene.gltf')
const geometryLigthArea = await CART.getGeometry('../models/AreaLigth.gltf');
const meshArea = new THREE.Mesh(
    geometryLigthArea,
    new THREE.MeshBasicMaterial({
        color: 0xE1BBFB
    })
);

meshArea.position.set(0, -2, 2);
meshArea.scale.set(3, 1, 3);
meshArea.rotation.x = getRadian(-10);

scene.add(meshArea);

let materials1 = [
    CART.getMaterial('../src/texture/company.png', ligths, 3.5, camera),
    CART.getMaterial('../src/texture/logo.png',    ligths, 3.5, camera),
    CART.getMaterial('../src/texture/logo.png',    ligths, 3.5, camera)
];
const color = new THREE.Color(0x221358);
const diffuseColor = new THREE.Color(0xfff);
let materials2 = [
    CARTM.getMaterial('../src/texture/company.png', ligths, 15.0, color, diffuseColor, camera),
    CARTM.getMaterial('../src/texture/logo.png',    ligths, 15.0, color, diffuseColor, camera),
    CARTM.getMaterial('../src/texture/logo.png',    ligths, 15.0, color, diffuseColor, camera),
    CARTM.getMaterial('../src/texture/logo.png',    ligths, 15.0, color, diffuseColor, camera),
];

const meshIcoSphere = new THREE.Mesh(
    new THREE.IcosahedronGeometry(2, 32),
    new THREE.MeshStandardMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.2
    })
);
meshIcoSphere.position.set(0, -5, 0);
meshIcoSphere.scale.set(4, 1, 3);
scene.add(meshIcoSphere);

for(let i = 0; i < materials1.length; i++) {
    let mesh = new THREE.Mesh(geometry, materials1[i]);
    mesh.rotation.x = getRadian(-15 + (10 * i));
    mesh.rotation.y = getRadian(25 - (10 * i));
    mesh.rotation.z = getRadian(-25 - (10 * i));
    mesh.name = 'card1' + i;

    mesh.position.x = 5 + i;    
    mesh.position.y = materials1.length - i - 2;
    mesh.position.z = 0;  

    scene.add(mesh);
}

let lastmesh;
for(let i = 0; i < materials2.length; i++){
    let mesh = new THREE.Mesh(geometry, materials2[i]);
    mesh.rotation.x = getRadian(15 - (10 * i));
    mesh.rotation.y = getRadian(-25 + (10 * i));
    mesh.rotation.z = getRadian(25 + (10 * i));
    mesh.name = 'card2' + i;

    mesh.position.x = -5 - i;    
    mesh.position.y = materials2.length - i - 3;
    mesh.position.z = 0;  

    scene.add(mesh);
    lastmesh = mesh;
}

lastmesh.position.set(0, -1, 0);
lastmesh.rotation.x = getRadian(-30);
lastmesh.rotation.y = getRadian(70);
lastmesh.rotation.z = getRadian(0);
lastmesh.name = 'center';

targetPositionCenter.x = 0;
targetPositionCenter.y = -1;
targetPositionCenter.z = 0;

targetRotateCenter.x = -30;
targetRotateCenter.y = 70;
targetRotateCenter.z = 0;

const edgeColor = new THREE.Color(0x000000); // Цвет краёв
const baseColor = new THREE.Color(0xE1BBFB); // Основной цвет
const fadePower = 0.5; // Сила растушёвки
const fadeDistance = 0.5; // Ширина области размытия
const volume = new THREE.Mesh(
    new THREE.CylinderGeometry(8, 4, 25, 32, 32, true),
    new THREE.ShaderMaterial({
        //color: 'white'
        vertexShader: volumeShaderVert,
        fragmentShader: volumeShaderFrag,
        uniforms: {
            uEdgeColor: { value: edgeColor },
            uBaseColor: { value: baseColor },
            uFadePower: { value: fadePower },
            uFadeDistance: { value: fadeDistance }
        },
        transparent: true,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        opacity: 0.1
    })
);

volume.position.y = 0;
volume.position.z = 0;
volume.rotation.y = getRadian(90);
scene.add(volume);


const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let obj = null;

function onMouseClick(event) {
    if(obj !== null) return;

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    obj = intersects
                    .filter(i => i.object.name.length > 0)
                    .map(i => i.object)
                    .at(0);
    
    targetPositionSide.x = obj.position.x;
    targetPositionSide.y = obj.position.y;
    targetPositionSide.z = obj.position.z + 1;
    
    targetRotateSide.x = getAnge(obj.rotation.x);
    targetRotateSide.y = getAnge(obj.rotation.y);
    targetRotateSide.z = getAnge(obj.rotation.z);

    stepAnimatePosition.x = getStep(targetPositionCenter.x, targetPositionSide.x, 1) * 2;
    stepAnimatePosition.y = getStep(targetPositionCenter.y, targetPositionSide.y, 1) * 2;
    stepAnimatePosition.z = getStep(targetPositionCenter.z, targetPositionSide.z, 1) * 2;
    
    stepAnimateRotate.x = getStep(targetRotateCenter.x, targetRotateSide.x, 0);
    stepAnimateRotate.y = getStep(targetRotateCenter.y, targetRotateSide.y, 0);
    stepAnimateRotate.z = getStep(targetRotateCenter.z, targetRotateSide.z, 0);
}
window.addEventListener('click', onMouseClick);

let an = 0;
let isEnd = 0;
function animate(){
    requestAnimationFrame(animate);
    
    if(canvas.clientWidth != window.innerWidth || canvas.clientHeight != window.innerHeight) {
        renderer.setSize(window.innerWidth - 20, window.innerHeight);
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    //composer.render();
    renderer.render(scene, camera);
    if(obj === null) return;
    
    if(Math.abs(obj.position.x.toFixed(1)) != targetPositionCenter.x.toFixed(1)){
        lastmesh.position.x -= stepAnimatePosition.x;
        obj.position.x += stepAnimatePosition.x;
    }
    else{
        stepAnimatePosition.x = 0;
        if(isEnd === 0)
            isEnd += 1;
    }
    
    if(obj.position.y.toFixed(1) != targetPositionCenter.y.toFixed(1)){
        lastmesh.position.y -= stepAnimatePosition.y;
        obj.position.y += stepAnimatePosition.y;
    }
    else{
        stepAnimatePosition.y = 0;
        if(isEnd === 1)
            isEnd += 1;
    }

    if(Math.abs(obj.position.z.toFixed(1)) != targetPositionCenter.z.toFixed(1)){
         lastmesh.position.z -= stepAnimatePosition.z;
         obj.position.z += stepAnimatePosition.z;
    }
    else{
        stepAnimatePosition.z = 0;
        if(isEnd === 2)
            isEnd += 1;
    }

    an = getAnge(obj.rotation.x);
    an = Math.round(an);
    if(an != targetRotateCenter.x){
        obj.rotation.x += getRadian(stepAnimateRotate.x);
        lastmesh.rotation.x -= getRadian(stepAnimateRotate.x);
    }
    else{
        if(isEnd === 3)
            isEnd += 1;
    }

    an = getAnge(obj.rotation.y);
    an = Math.round(an);
    if(an != targetRotateCenter.y){
        obj.rotation.y += getRadian(stepAnimateRotate.y);
        lastmesh.rotation.y -= getRadian(stepAnimateRotate.y);
    }
    else{
        if(isEnd === 4)
            isEnd += 1;
    }

    an = getAnge(obj.rotation.z);
    an = Math.round(an);
    if(an != targetRotateCenter.z){
        obj.rotation.z += getRadian(stepAnimateRotate.z);
        lastmesh.rotation.z -= getRadian(stepAnimateRotate.z);
    }
    else{
        if(isEnd === 5)
            isEnd += 1;
    }

    if(isEnd === 6){
        lastmesh = obj;
        obj = null;
        isEnd = 0;
        console.log(isEnd);
    }
}

animate();

function getRadian(ange){
    return Math.PI * ange / 180;
}
function getAnge(rad){
    return 180 * rad / Math.PI;
}
function getStep(targetCenter, targetSide, countStep){
    let step = targetCenter - targetSide;
    if(step === 0) return 0;
    step /= Math.abs(step);
    step *= Math.pow(0.1, countStep);
    return step;
}
function needResizeRendererToDisplay(render) {
    const wid = window.innerWidth;
    const heig = window.innerHeight;
    const needResize = canvas.width !== wid || canvas.heigth !== heig;
    if(needResize) {
        render.setSize(wid, heig, false);
    }
    return needResize;
}