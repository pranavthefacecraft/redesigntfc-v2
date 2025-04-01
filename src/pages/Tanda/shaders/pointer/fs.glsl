varying vec2 vUv;

void main() {

  float d = distance(vUv, vec2(0.5)) * 2.0;
  d = smoothstep(0.4, 1.0, d);

  vec3 color = vec3(d);

  gl_FragColor = vec4(color, 1.0);

}
