import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function importModelUrl(url, index){
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();

        loader.load(url, 
            (gltf) => {
                const object = gltf.scene
                .children[0]
                .children[index];
                resolve(object);
            },
            undefined,
            (error) => {
                reject(error);
            });
        });
}