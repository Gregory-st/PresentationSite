export default /*glsl*/`
#define MAX_LIGHTS 4

uniform vec3 lightPositions[MAX_LIGHTS];
uniform vec3 lightColors[MAX_LIGHTS];
uniform float lightIntens[MAX_LIGHTS];
uniform vec3 baseColor;
uniform vec3 diffuseColorObject;
uniform vec3 viewPos;
uniform sampler2D uTexture;

varying vec3 vPosition;
`;