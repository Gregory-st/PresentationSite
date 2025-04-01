import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RenderPass, ShaderPass, EffectComposer, EffectPass, BloomEffect } from 'postprocessing'

import fragParse from '../src/shaders/cart/shader.frag.parse.js'
import fragColor from '../src/shaders/cart/shader.frag.color.js'
import vertParse from '../src/shaders/cart/shader.vert.parse.js'
import vertColor from '../src/shaders/cart/shader.vert.color.js'

const scene = new THREE.Scene()
const width = window.innerWidth
const heigth = window.innerHeight

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
        antialiasing: true
    }
);
renderer.setSize(width, heigth);
renderer.setPixelRatio(2);


const controll = new OrbitControls(camera, renderer.domElement);
controll.enableDamping = true;
controll.dampingFactor = 1;
controll.screenSpacePanning = false;
controll.minDistance = 2;
controll.maxDistance = 10;

const ambentLigth = new THREE.AmbientLight('white', 1);
const dirLigth = new THREE.DirectionalLight('white', 2);

dirLigth.position.set(0, 1, 0);

scene.add(ambentLigth);
scene.add(dirLigth);


const cartMaterial = new THREE.MeshStandardMaterial({
    onBeforeCompile: (shader) => {
        
        let patternVert = /*glsl*/`#include <uv_pars_vertex>`;
        shader.vertexShader = shader.vertexShader.replace(
            patternVert,
            patternVert + vertParse
        );
        
        patternVert = /*glsl*/`#include <uv_vertex>`;
        shader.vertexShader = shader.vertexShader.replace(
            patternVert,
            patternVert + vertColor
        );
        
        let patternFrag = /*glsl*/`#include <color_pars_fragment>`;
        shader.fragmentShader = shader.fragmentShader.replace(
            patternFrag,
            patternFrag + fragParse
        );
        patternFrag = /*glsl*/`#include <color_fragment>`;
        shader.fragmentShader = shader.fragmentShader.replace(
            patternFrag,
            patternFrag + fragColor
        );
    }
});

const loader = new GLTFLoader();
let cart;
loader.load('../models/scene.gltf', (gltf) => {
    const geometry_cart = 
    gltf.scene
        .children[0]
        .children[0]
        .geometry;
    cart = new THREE.Mesh(geometry_cart, cartMaterial);

    cart.rotation.x = getRadian(-15);
    cart.rotation.y = getRadian(25);
    cart.rotation.z = getRadian(-25);

    cart.position.x = 5;    
    cart.position.y = 0;
    cart.position.z = 0;    

    scene.add(cart); 
});

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