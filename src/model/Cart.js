import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshStandardMaterial } from "three";
import { TextureLoader } from "three";
import { Mesh } from "three";

import fragParse from '../shaders/cart/shader.frag.parse.js'
import fragColor from '../shaders/cart/shader.frag.color.js'
import vertParse from '../shaders/cart/shader.vert.parse.js'
import vertColor from '../shaders/cart/shader.vert.color.js'

export function getMesh(urlModel, urlTexture) {
    const material = getMaterial(urlTexture);
    return getGeometry(urlModel).then(geometry => {
        return new Mesh(geometry, material);
    });
}

export function getGeometry(urlModel) {
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();

        loader.load(urlModel, 
            (gltf) => {
                const object = gltf.scene
                            .children[0]
                            .children[0]
                            .geometry;
                resolve(object);
            },
            undefined,
            (error) => {
                reject(error);
            });
        });
}

export function getMaterial(urlTexture) {
    const loader = new TextureLoader();
    const texture = loader.load(urlTexture);
    return new MeshStandardMaterial({
        onBeforeCompile: (shader) => {

            shader.uniforms.uTexture = {value: texture };

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
}