export default /*glsl*/`
varying vec2 vUv;
struct ColorStop{
	vec3 color;
	float position;
};

#define ColorRamp(colors, factor, finalColor) {\
	int index = 0;\
	for(int i = 0; i < colors.length() - 1; i++) {\
		bool isBetween = colors[i].position <= factor;\
		index = isBetween ? i : index;\
	}\
	ColorStop currentColor = colors[index];\
	ColorStop nextColor = colors[index + 1];\
	float range = nextColor.position - currentColor.position;\
	float lerpFactor = (factor - currentColor.position) / range;\
	finalColor = mix(currentColor.color, nextColor.color, lerpFactor);\
}\

float getRadian(float ange){
	return PI / 180.0 * ange;
}

vec2 getRotate(float angeX, float angeY) {
	
	float radX = getRadian(angeX);
	float radY = getRadian(angeY);

	return vec2(cos(radX), sin(radY));
}

void main() {
    ColorStop[3] colors = ColorStop[](
        ColorStop(vec3(0.88, 0.73, 0.98), 0.0),
        ColorStop(vec3(0.25, 0.92, 0.64), 0.5),
        ColorStop(vec3(0.49, 0.32, 0.95), 1.0)
    );
    
    vec2 rotate = getRotate(45.0, 15.0);
    float factor = vUv.x * rotate.x + vUv.y * rotate.y;
    vec3 finalColor;
    
    ColorRamp(colors, factor, finalColor);
    
    finalColor = vec4(finalColor);

    gl_FragColor = vec4( finalColor, 1.0 );
}
`;