uniform float uTime;
uniform vec3 uResolution;
uniform sampler2D uRenderTargetTexture;
uniform sampler2D uLogoTexture;
uniform float uScrollOffset;

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

  vec4 renderTargetColor = texture2D(uRenderTargetTexture, screenUV);
  renderTargetColor.rgb = pow(renderTargetColor.rgb, vec3(3.1));

  vec2 maskVec2 = step(textureUV, vec2(1.0)) * step(vec2(0.0), textureUV);
  float mask = maskVec2.x * maskVec2.y;
  vec4 logoColor = texture(uLogoTexture, textureUV);
  float alpha = clamp(logoColor.a * mask, 0.0, 1.0);
  baseColor = mix(baseColor, logoColor.rgb, alpha);

  float dist = length(vViewPosition) - uScrollOffset;
  float fadeOpacity = smoothstep(40.0 + 500.0 * uScrollOffset, 0.0, dist);
  fadeOpacity = exponentialEasing(fadeOpacity, 0.93);

  // Direct transition control without remapping
  float transitionStart = 0.55;
  float transitionEnd = 1.4;
  
  // Calculate transition progress directly from uScrollOffset
  float transitionProgress = clamp((uScrollOffset - transitionStart) / (transitionEnd - transitionStart), 0.0, 1.0);
  
  // Apply smoothstep for smoother edges
  transitionProgress = smoothstep(0.0, 1.0, transitionProgress);
  
  // Apply exponential easing for smooth animation
  transitionProgress = exponentialEasing(transitionProgress, 0.45);

  vec3 transitionColor = mix(baseColor, renderTargetColor.rgb, transitionProgress);

  csm_FragColor = vec4(transitionColor, opacity * fadeOpacity);
}