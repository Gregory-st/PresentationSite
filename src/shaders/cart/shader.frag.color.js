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

diffuseColor = vec4(finalColor, 1);

`;