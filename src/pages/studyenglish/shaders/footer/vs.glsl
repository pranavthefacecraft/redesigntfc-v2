uniform float uGap;
uniform float uProgress;

attribute float aOffset;
attribute float aEven;

void main() {

  vec3 p = vec3(position.x * uGap, 0.0, position.z * uGap + (aOffset * uGap * 0.5));

  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(p, 1.2);

  gl_PointSize = uGap * (0.4 + aEven * 0.3) * uProgress;

}
