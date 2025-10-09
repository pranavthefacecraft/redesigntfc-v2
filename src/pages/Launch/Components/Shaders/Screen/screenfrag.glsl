uniform float uTime;
uniform vec2 uResolution;
uniform sampler2D uTexture;

varying vec2 vUv;

void main() {

    vec2 screenuv = gl_FragCoord.xy/uResolution.xy;
    vec4 screenTexture = texture2D(uTexture, screenuv);






    gl_FragColor = vec4(screenTexture.rgb, 1.0);
}