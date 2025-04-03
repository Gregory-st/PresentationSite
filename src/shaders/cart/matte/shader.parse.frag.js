export default /*glsl*/`
#define MAX_LIGHTS 3

uniform vec3 lightPositions[MAX_LIGHTS];
uniform vec3 lightColors[MAX_LIGHTS];
uniform float lightIntens[MAX_LIGHTS];
uniform vec3 baseColor;
uniform vec3 diffuseColorObject;
uniform vec3 viewPos;

varying vec3 vPosition;
`;