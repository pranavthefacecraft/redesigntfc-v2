uniform float uTime;
uniform vec2 uResolution;
uniform sampler2D uTexture;



void main(){
    vec2 uv = gl_FragCoord.xy / uResolution;

    vec4 texColor = texture2D(uTexture, uv);
  
    gl_FragColor = vec4(texColor.rgb, 1.0);
}