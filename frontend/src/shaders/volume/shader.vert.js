export default /*glsl*/`
varying vec3 vNormal;
varying vec3 vViewDir;
varying vec3 vPosition;

void main() {
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(mvPosition.xyz);
    gl_Position = projectionMatrix * mvPosition;
}
`;