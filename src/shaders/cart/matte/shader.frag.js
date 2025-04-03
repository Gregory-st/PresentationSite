export default /*glsl*/`
#define MAX_LIGHTS 3

uniform vec3 lightPositions[MAX_LIGHTS];
uniform vec3 lightColors[MAX_LIGHTS];
uniform vec3 diffuseColor;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

void main() {

    vec3 normal = normalize(vNormal);
    vec3 finalColor = vec3(0.5, 0.0, 0.5);

    for(int i = 0; i < MAX_LIGHTS; i++) {
        vec3 ligthDir = normalize(lightPositions[i] - vPosition);
        float diff = max(dot(normal, ligthDir), 0.0);
        finalColor += diffuseColor * lightColors[i] * diff;
    }
    
    gl_FragColor = vec4(finalColor, 1.0);
}
`;