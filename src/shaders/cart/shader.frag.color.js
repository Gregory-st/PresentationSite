export default /*glsl*/`
ColorStop[3] colors = ColorStop[](
    ColorStop(vec3(0.88, 0.73, 0.98), 0.0),
    ColorStop(vec3(0.25, 0.92, 0.64), 0.5),
    ColorStop(vec3(0.49, 0.32, 0.95), 1.7)
);


vec2 rotate = getRotate(0.0, 45.0);
vec2 position = vec2(0.5, 0.0);
float factor = (vPosition.z * rotate.y + position.y) + (vPosition.y * rotate.x + position.x);
vec3 finalColor;

vec2 pos = vPosition.zy / 3.0;
pos.x += 0.5;
pos.y += 0.5;
vec4 texture = texture2D(uTexture, pos);
float ligthing = 1.0;
texture = vec4(texture.rgb * ligthing, texture.a);

ColorRamp(colors, factor, finalColor);

finalColor = mix(finalColor.rgb, texture.rgb, texture.a);

    vec3 ambient = vec3(0.0);
    vec3 diffuse = vec3(0.0);
    vec3 specular = vec3(0.0);
    
    // Базовый ambient-эффект (можно оставить общий для всех источников)
    ambient = 0.1 * finalColor;
    
    vec3 norm = normalize(vNormal);
    vec3 viewDir = normalize(viewPos - vPosition);
    
    // Суммируем вклад каждого источника
    for (int i = 0; i < COUNT_LIGHTS; i++) {
        vec3 lightDir = normalize(lightPos[i] - vPosition);
        
        // Диффузное освещение
        float diff = max(dot(norm, lightDir), 0.0);
        diffuse += diff * lightColor[i] * lightIntens[i];
        
        // Спекулярное освещение (модель Блинна-Фонга)
        vec3 halfDir = normalize(lightDir + viewDir);
        float spec = pow(max(dot(norm, halfDir), 0.0), shininess);
        specular += spec * lightColor[i];
    }
    
    vec3 result = (ambient + diffuse + specular) * finalColor;

diffuseColor = vec4(result, 1);

`;