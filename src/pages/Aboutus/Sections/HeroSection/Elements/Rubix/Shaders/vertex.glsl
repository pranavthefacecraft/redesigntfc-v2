
varying vec2 vUv;
varying vec3 vColor;
varying float vInstanceId;


void main()
{
  
  vUv = uv;
  vColor = color;
  vInstanceId = float(gl_InstanceID);
  vec4 modelViewPosition = modelViewMatrix * instanceMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * modelViewPosition; 
  
}