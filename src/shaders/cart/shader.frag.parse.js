export default /* glsl */`
varying vec2 vUv;
varying vec3 vPosition;
uniform sampler2D uTexture;

#define COUNT_LIGHTS 3

uniform vec3 viewPos;
uniform vec3 lightPos[COUNT_LIGHTS];
uniform vec3 lightColor[COUNT_LIGHTS];
uniform float shininess;
uniform float lightIntens[COUNT_LIGHTS];

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
`;