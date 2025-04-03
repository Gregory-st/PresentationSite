export default /*glsl*/`
vec3 normal2 = normalize(vNormal);
vec3 finalColor = baseColor;

for(int i = 0; i < MAX_LIGHTS; i++) {
    vec3 ligthDir = normalize(lightPositions[i] - vPosition);

    float diff = max(dot(normal2, ligthDir), 0.0);
    
    vec3 halfDir = normalize(ligthDir + viewPos);
    float spec = max(dot(normal2, halfDir), 0.0);
    finalColor += diffuseColorObject * lightColors[i] * lightIntens[i] * diff * spec;
}

diffuseColor = vec4(finalColor, 1);
`;