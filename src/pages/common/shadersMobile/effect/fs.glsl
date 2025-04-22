uniform sampler2D uMaskTexture;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  
  vec4 mask = texture2D(uMaskTexture, uv);

  vec4 medium = inputColor * 0.9;
  vec4 light = inputColor * 0.2;

  float aspect = resolution.x / resolution.y;
  vec2 uv0 = uv;
  uv0.x *= aspect;

  float yScale = 3.0;
  uv0.y *= yScale;

  float d = distance(uv0, vec2(aspect * 0.6, yScale * 0.5)) * 0.4;
  d = smoothstep(0.1, 0.9, d);
  vec4 center = vec4(vec3(d), 1.0);

  vec4 stage1 = mix(outputColor, light, d);
  // outputColor = mix(outputColor, inputColor, mask.r);
  vec4 stage2 = mix(stage1, medium, 1.0 - mask.r);

  outputColor = stage2;
  

}
