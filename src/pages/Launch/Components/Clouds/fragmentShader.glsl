uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uBlueNoiseResolution; 
uniform sampler2D uBlueNoise;
uniform sampler2D uNoise;
uniform int uFrame;

#define MAX_STEPS 60

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
  vec3 q = p - uTime * 0.5 * vec3(1.0, -0.2, -1.0);
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
  float distance = sdSphere(p, 1.2);

  float plane = p.y + 0.0;

  float f = fbm(p);

  return -plane + f;
}

const vec3 SUN_POSITION = vec3(1.0, 0.0, 0.0);
const float MARCH_SIZE = 0.08;

vec4 raymarch(vec3 rayOrigin, vec3 rayDirection, float offset) {
  float depth = 0.0;
  // Better offset application
  depth += MARCH_SIZE * offset * 2.0; // Scale offset appropriately
  vec3 p = rayOrigin + depth * rayDirection;
  vec3 sunDirection = normalize(SUN_POSITION);

  vec4 res = vec4(0.0);
  float accumulatedDensity = 0.0;

  for (int i = 0; i < MAX_STEPS; i++) {
    float density = scene(p);

    if (density > 0.0 && accumulatedDensity < 0.95) {
      // Directional derivative for diffuse lighting
      float diffuse = clamp((scene(p) - scene(p + 0.3 * sunDirection)) / 0.3, 0.0, 1.0);
      vec3 lin = vec3(0.60, 0.60, 0.75) * 1.1 + 0.8 * vec3(1.0, 0.6, 0.3) * diffuse;
      vec4 color = vec4(mix(vec3(1.0), vec3(0.8863), density), density);
      color.rgb *= lin;
      color.rgb *= color.a;
      res += color * (1.0 - res.a);
      accumulatedDensity += density * 0.1;
    }

    depth += MARCH_SIZE;
    p = rayOrigin + depth * rayDirection;
    
    // Early exit if too far or fully opaque
    if (depth > 20.0 || res.a > 0.95) break;
  }

  return res;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / min(uResolution.x, uResolution.y);

  // Ray setup
  vec3 ro = vec3(0.0, 0.0, 5.0);
  vec3 rd = normalize(vec3(uv, -1.0));
  
  // Sky background
  vec3 sunDirection = normalize(SUN_POSITION);
  float sun = clamp(dot(sunDirection, rd), 0.0, 1.0);
  vec3 color = vec3(0.7, 0.7, 0.90);
  color -= 0.8 * vec3(0.90, 0.75, 0.90) * rd.y;
  color += 0.5 * vec3(1.0, 0.5, 0.3) * pow(sun, 10.0);

  // Improved blue noise sampling
  vec2 blueNoiseUV = gl_FragCoord.xy / uBlueNoiseResolution;
  float blueNoise = texture2D(uBlueNoise, blueNoiseUV).r;
  
  // Better temporal offset - uses prime numbers for better distribution
  float temporalOffset = float(uFrame % 128) / 128.0;
  float offset = fract(blueNoise * 1.618034 + temporalOffset);

  // Cloud rendering
  vec4 res = raymarch(ro, rd, offset);
  
  // Better blending
  color = mix(color, res.rgb, res.a);

  gl_FragColor = vec4(color, 1.0);
}