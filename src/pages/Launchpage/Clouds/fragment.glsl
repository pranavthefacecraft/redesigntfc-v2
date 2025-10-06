uniform float uTime;
uniform vec2 uResolution;
uniform sampler2D uBlueNoise;
uniform sampler2D uNoise;
uniform int uFrame;

uniform float uScrollOffset;
uniform float uCloudSpeed;
uniform vec3 uCloudsColor;
uniform vec3 uSkyColor;
uniform vec3 uLightColor;

#define MAX_STEPS 40

vec3 repeat(vec3 p, float c) {
  return vec3(
    mod(p.x, c) - 0.5 * c,
    p.y,
    mod(p.z, c) - 0.5 * c
  );
}

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


float sdSphere(vec3 p, float radius) {
  return length(p) - radius;
}

float noise( in vec3 x ) {
  vec3 p = floor(x);
  vec3 f = fract(x);
  f = f*f*(3.0-2.0*f);

  vec2 uv = (p.xy+vec2(37.0,239.0)*p.z) + f.xy;
  vec2 tex = textureLod(uNoise,(uv+0.5)/256.0,0.0).yx;

  return mix(tex.x, tex.y, f.z) * 2.0 - 1.0;
}

float fbm(vec3 p) {
  vec3 q = p - (uTime * uCloudSpeed) * vec3(1.0, -0.1, -1.0);
  float g = noise(q);

  float f = 0.0;
  float scale = 0.5;
  float factor = 2.02;

  for (int i = 0; i < 6; i++) {
      f += scale * noise(q);
      q *= factor;
      factor += 0.21;
      scale *= 0.5;
  }

  return f;
}

float scene(vec3 p) {
  
  // vec3 s = repeat(p - vec3(0.0, 0.0, 5.0), 4.0);
  float plane = p.y + 0.0;


  float f = fbm(p);

  return -plane + f;
}

const vec3 SUN_POSITION = vec3(1.0, 0.0, 0.0);
const float MARCH_SIZE = 0.09;

vec4 raymarch(vec3 rayOrigin, vec3 rayDirection, float offset) {
  float depth = 0.0;
  depth += MARCH_SIZE * offset;
  vec3 p = rayOrigin + depth * rayDirection;
  vec3 sunDirection = normalize(SUN_POSITION);

  vec4 res = vec4(0.0);

  for (int i = 0; i < MAX_STEPS; i++) {
    float density = scene(p);

    // We only draw the density if it's greater than 0
    if (density > 0.0) {
      // Directional derivative
      // For fast diffuse lighting
      float diffuse = clamp((scene(p) - scene(p + 0.3 * sunDirection))/0.3, 0.0, 1.0 );
      vec3 lin = vec3(0.60,0.60,0.75) * 1.1 + 0.8 * vec3(1.0,0.6,0.3) * diffuse;
      vec4 color = vec4(mix( pow(uCloudsColor, vec3(1.0/2.2)), vec3(0.902, 0.7608, 0.8667), density), density );
      color.rgb *= lin;
      color.rgb *= color.a;
      res += color*(1.0-res.a);
    }

    depth += MARCH_SIZE;
    p = rayOrigin + depth * rayDirection;
  }

  return res;
}

void main() {
  vec2 uv = gl_FragCoord.xy/uResolution.xy;
  uv -= 0.5;
  uv.x *= uResolution.x / uResolution.y;

  float d = length(vec2(uv.x - 1.3, uv.y + 0.5));

  vec2 uvGradient = gl_FragCoord.xy/uResolution.xy;
  uvGradient -= 0.8;



  // Ray Origin - camera
  vec3 ro = vec3(0.0, 0.0, 5.0);
  // Ray Direction
  vec3 rd = normalize(vec3(uv, -1.0));
  
  vec3 color = vec3(0.0);

  // Sun and Sky
  vec3 sunDirection = normalize(SUN_POSITION);
  vec3 glaresunDirection = normalize(vec3(1.0, 1.0, 0.0));
  float sun = clamp(dot(sunDirection, rd), 0.0, 1.0);
  // float glare = clamp(dot(glaresunDirection, rd), 0.0, 1.0);

  float glare = length(vec3(0.1,0.1,0.1));
  // Base sky color - clamp uSkyColor values to avoid extremes
  vec3 clampedSkyColor = clamp(uSkyColor, vec3(0.0), vec3(0.8));
  color = pow(clampedSkyColor, vec3(1.0/2.2));
  // Add vertical gradient
  color -= 0.4 * vec3(0.90,0.75,0.90) * uvGradient.y;
  // // Add sun color to sky
 

  float blueNoise = texture2D(uBlueNoise, gl_FragCoord.xy / 1024.0).r;
  float offset = fract(blueNoise + float(uFrame%32) / sqrt(0.5));

  // Cloud
  vec4 res = raymarch(ro, rd, offset);
  color = color * (1.0 - res.a) + res.rgb;  

  float t = 1.0 - smoothstep(0.0, 1.4, abs(0.1-d));

  // Clamp light color and ensure positive values
  vec3 clampedLightColor = clamp(uLightColor, vec3(0.0), vec3(1.0));
  color += 0.6 * pow(clampedLightColor, vec3(1.0/2.2)) * pow(t, 2.0);

  // Ensure no negative values in final color
  color = max(color, vec3(0.0));

  gl_FragColor = vec4(color, 1.0);
}