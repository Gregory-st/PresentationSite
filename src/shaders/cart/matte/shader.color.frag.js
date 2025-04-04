export default /*glsl*/`
vec3 normal2 = normalize(vNormal);
vec3 finalColor = baseColor;

vec2 pos = vPosition.zy / 3.0;
pos.x += 0.5;
pos.y += 0.5;
vec4 texture = texture2D(uTexture, pos);
float ligthing = 0.3;
texture = vec4(texture.rgb * ligthing, texture.a);

finalColor = mix(finalColor.rgb, texture.rgb, texture.a);

for(int i = 0; i < MAX_LIGHTS; i++) {
    vec3 ligthDir = normalize(lightPositions[i] - vPosition);
    
    float diff = max(dot(normal2, ligthDir), 0.0);
    
    vec3 halfDir = normalize(ligthDir + viewPos);
    float spec = max(dot(normal2, halfDir), 0.0);
    finalColor += diffuseColorObject * lightColors[i] * lightIntens[i] * diff * spec;
}


diffuseColor = vec4(finalColor, 1);
`;