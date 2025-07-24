import * as THREE from 'three';

import vert from './Shaders/vertex.glsl'
import frag from './Shaders/fragment.glsl'

const Logotextures = [
   '/About/Images/Packed.png'
];

// Memoize texture loading
const textureCache = {};
const loadTexture = (path) => {
  if (!textureCache[path]) {
    const texture = new THREE.TextureLoader().load(path);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.magFilter = THREE.LinearMipMapLinearFilter;
    texture.minFilter = THREE.LinearMipMapLinearFilter;
    texture.flipY = false;
    textureCache[path] = texture;
  }
  return textureCache[path];
};

const textures = Logotextures.map(loadTexture);


export const shader = new THREE.ShaderMaterial({
  vertexShader: vert,
  fragmentShader: frag,
  vertexColors: true,
  uniforms: {
    uLogo: { value: textures[0] },
    uOpacity: { value: 2.0 } 
  },
  transparent: true
});

