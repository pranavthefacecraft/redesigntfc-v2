uniform sampler2D uAlpha;

void main() {

  vec3 color = vec3(0.0);
  float alpha = texture2D(uAlpha, gl_PointCoord).r;

  gl_FragColor = vec4(color, alpha);
  // gl_FragColor = vec4(color, 1.0);

}
