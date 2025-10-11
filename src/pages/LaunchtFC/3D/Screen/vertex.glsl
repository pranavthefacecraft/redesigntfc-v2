varying vec2 vUv;
varying vec3 vColor;

attribute vec3 color;
attribute vec2 uv1; 
attribute vec2 uv2; 
attribute vec2 uv3; 
attribute vec2 texcoord_4; 
attribute vec2 texcoord_5; 
attribute vec2 texcoord_6; 
attribute vec2 texcoord_7; 


void main() {
  vUv = uv;
  vColor = color;

  vec4 instancePosition = instanceMatrix * vec4(position, 1.0);
  vec4 modelPosition = modelMatrix * instancePosition;
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  vViewPosition = viewPosition.xyz;

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

  gl_Position = projectedPosition;
}
