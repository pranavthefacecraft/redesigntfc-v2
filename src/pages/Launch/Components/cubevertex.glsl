varying vec2 vUv;

void main() {
  vUv = uv;
  
  vec4 instancePosition = instanceMatrix * vec4(position, 1.0);
  
  vec4 mvPosition = modelViewMatrix * instancePosition;
  gl_Position = projectionMatrix * mvPosition;
}
