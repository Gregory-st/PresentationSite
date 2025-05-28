export default /*glsl*/`

varying vec3 vPosition;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vFragPos;

void main() {
    vec4 WorldPosition = modelMatrix * vec4(position, 1.0);
    vFragPos = WorldPosition.xyz;
    vNormal = normalize(normalMatrix * normal);
    vUv = uv;
    vPosition = position;

    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;