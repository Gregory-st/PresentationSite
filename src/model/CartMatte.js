import { MeshStandardMaterial } from "three";
import { TextureLoader } from "three";

import vertParse from '../shaders/cart/matte/shader.parse.vert';
import vertColor from '../shaders/cart/matte/shader.color.vert';
import fragParse from '../shaders/cart/matte/shader.parse.frag';
import fragColor from '../shaders/cart/matte/shader.color.frag';

export function getMaterial(lights, intensity, color, diffuseColor, camera){
    return new MeshStandardMaterial({
        onBeforeCompile: (shader) => {

            shader.uniforms.lightPositions = {value: lights.map(light => light.position)};
            shader.uniforms.lightColors = {value: lights.map(light => light.color)};
            shader.uniforms.lightIntens = {value: lights.map(light => light.intensity / intensity)};
            shader.uniforms.baseColor = {value: color};
            shader.uniforms.diffuseColorObject = {value: diffuseColor};
            shader.uniforms.viewPos = {value: camera.position};

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