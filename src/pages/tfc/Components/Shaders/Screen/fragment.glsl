uniform float uTime;
uniform vec2 uResolution;
uniform float uScrollOffset;
uniform sampler2D uTexture;
uniform sampler2D uRenderTexture;

varying vec2 vUv;
varying vec3 vColor;

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
  vec2 textureUV = vUv;
  vec2 screenUV = gl_FragCoord.xy / uResolution.xy;

  vec3 baseColor = vec3(0.0);
  baseColor = vColor;

  vec4 renderTargetColor = texture(uRenderTexture, screenUV);
  renderTargetColor.rgb = pow(renderTargetColor.rgb, vec3(3.1));

  vec2 maskVec2 = step(textureUV, vec2(1.0)) * step(vec2(0.0), textureUV);
  float mask = maskVec2.x * maskVec2.y;
  vec4 logoColor = texture(uTexture, textureUV);
  float alpha = clamp(logoColor.a * mask, 0.0, 1.0);
  baseColor = mix(baseColor, logoColor.rgb, alpha);

  float dist = length(vViewPosition) - uScrollOffset;
  float fadeOpacity = smoothstep(40.0 + 500.0 * uScrollOffset, 0.0, dist);
  fadeOpacity = exponentialEasing(fadeOpacity, 0.93);

  float transitionStart = 0.66;
  float transitionEnd = 1.005;
  float transitionProgress = smoothstep(transitionStart, transitionEnd, uScrollOffset);
  transitionProgress = exponentialEasing(transitionProgress, 0.23);


  vec3 transitionColor = mix(baseColor, renderTargetColor.rgb, transitionProgress);

  csm_FragColor = vec4( transitionColor, fadeOpacity );
}