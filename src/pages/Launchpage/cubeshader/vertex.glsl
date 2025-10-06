varying vec2 vUv;
varying vec3 vColor;
varying vec3 vPosition;
varying float instanceID;

uniform float uTime;

attribute vec3 color;
attribute vec2 uv1; // black
attribute vec2 uv2; // grey
attribute vec2 uv3; // c with grey
attribute vec2 texcoord_4; // no texture
attribute vec2 texcoord_5; // t
attribute vec2 texcoord_6; // no texture
attribute vec2 texcoord_7; // 


void main() {
  
  vViewPosition = position;
  vColor = color;
  vNormal = normal;
  vPosition = (modelMatrix * vec4(position, 1.0)).xyz;

  // Switch between UV maps based on instance ID
  int instanceCase = int(gl_InstanceID);

  
  switch(instanceCase) {
    case 2:
      vUv = uv;
      break;
    case 18:
      vUv = texcoord_5;
      break;
    case 9:
      vUv = texcoord_6;
      break; 
    case 14:
      vUv = texcoord_7;
      break;     
    case 1:
    case 5:
      vUv = vec2(uv.x + 0.5, uv.y + 0.0);
      break;
    case 4:
    case 8:
      vUv = vec2(uv.x + 0.0, uv.y + 0.25);
      break;
    case 0:
      vUv = uv3;
      break;  
    default:
      vUv = texcoord_4;
      break;
  }

  instanceID = float(gl_InstanceID);


}
