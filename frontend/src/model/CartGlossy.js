import vertShader from '../shaders/cart/default/shader.vert.glsl.js';
import fragShader from '../shaders/cart/default/shader.frag.glsl.js';
import { ShaderMaterial } from "three";
import { TextureLoader } from "three";

export function getMaterial(urlTexture, intensity, ligths) {
    const loader = new TextureLoader();
    return new ShaderMaterial({
            uniforms: {
                viewPos: { value: camera.position },
                lightPos: { value: ligths.map(ligth => ligth.position) },
                lightColor: { value: ligths.map(ligth => ligth.color) },
                lightIntens: {value: ligths.map(ligths => ligths.intensity / intensity) },
                shininess: { value: 100.0 },
                uTexture: { value: loader.load(urlTexture) }
            },
            vertexShader: vertShader,
            fragmentShader: fragShader
        });
}