uniform float uTime;
uniform vec2 uResolution;
uniform sampler2D uTexture;
uniform float uScrollOffset;
uniform sampler2D uRenderTexture;

varying vec2 vUv;
varying vec3 vColor;
varying vec3 vPosition;
varying float instanceID;

float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}



float exponentialEasing(float x, float a) {              
    float epsilon = 0.00001;
    float min_param_a = 0.0 + epsilon;
    float max_param_a = 1.0 - epsilon;
    a = max(min_param_a, min(max_param_a, a));
    
    if (a < 0.5){
      // emphasis
      a = 2.0*(a);
      float y = pow(x, a);
      return y;
    } else {
      // de-emphasis
      a = 2.0*(a-0.5);
      float y = pow(x, 1.0/(1.0-a));
      return y;
    }
}

void main() {
  vec3 baseColor = vColor;
  vec2 textureuv = vUv;
  vec2 screenuv = gl_FragCoord.xy / uResolution.xy;

  float remappedScroll = remap(uScrollOffset, 0.0, 8.0, 0.0, 1.0);

  float transitionStart = 0.6;
  float transitionEnd = 0.86;
  remappedScroll = smoothstep(transitionStart, transitionEnd, remappedScroll);
  remappedScroll = exponentialEasing(remappedScroll, 0.7);

  vec4 screen = texture(uRenderTexture, screenuv);
  screen.rgb = pow(screen.rgb, vec3(3.2));
  

  float dist = length(vViewPosition);
  float fadeOpacity = smoothstep(40.0 + 200.0 * uScrollOffset, 0.0, dist);
  fadeOpacity = exponentialEasing(fadeOpacity, 0.93);

  vec2 maskVec2 = step(textureuv, vec2(1.0)) * step(vec2(0.0),textureuv );
  float mask = maskVec2.x * maskVec2.y;
  vec4 logocolor = texture(uTexture,textureuv);
  float alpha = clamp(logocolor.a * mask, 0.0, 1.0);
  baseColor = mix(baseColor, logocolor.rgb, alpha);

  

  vec3 finalColor = mix(baseColor, screen.rgb, remappedScroll);

  csm_FragColor = vec4(finalColor, fadeOpacity);

}
