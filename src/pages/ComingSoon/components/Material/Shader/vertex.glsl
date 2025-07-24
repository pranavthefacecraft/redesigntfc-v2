

varying vec2 vUv;
varying vec2 vUvtwo;
varying vec2 vUvthree;
varying vec2 vUvfour;
varying vec2 vUvfive;
varying vec2 vUvsix;
varying vec2 vUvseven;


varying vec3 vColor;

attribute vec2 uv1;
attribute vec2 uv2;
attribute vec2 uv3;
attribute vec2 texcoord_4;
attribute vec2 texcoord_5;
attribute vec2 texcoord_6;






void main()
{
  
  vUv = uv;
  vUvtwo = uv1;
  vUvthree = uv2;
  vUvfour = uv3;
  vUvfive = texcoord_4;
  vUvsix = texcoord_5;
  vUvseven = texcoord_6;
  vColor = color * 0.9;
  vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * modelViewPosition; 
  
}