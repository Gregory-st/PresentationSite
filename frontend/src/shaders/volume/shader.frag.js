export default /*glsl*/`
uniform vec3 uEdgeColor;
uniform vec3 uBaseColor;
uniform float uFadePower;
uniform float uFadeDistance;

varying vec3 vNormal;
varying vec3 vViewDir;
varying vec3 vPosition;

void main() {
    // Рассчитываем "rim effect"
    float rim = 1.0 - abs(dot(normalize(vNormal), normalize(vViewDir)));
    rim = smoothstep(0.0, uFadeDistance, rim);
    
    // Смешиваем цвета
    vec3 color = mix(uBaseColor, uEdgeColor, pow(rim, uFadePower));
    
    // Плавное исчезновение
    float alpha = pow(rim, uFadePower);
    alpha = mix(alpha, rim, vPosition.y);
    
    gl_FragColor = vec4(color, alpha);
}
`;