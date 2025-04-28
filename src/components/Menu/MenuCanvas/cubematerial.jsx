import * as THREE from 'three';

import purpletextvert from '../MenuCanvas/cubeshaders/purpletexture/vertex.glsl'
import purpletextfrag from '../MenuCanvas/cubeshaders/purpletexture/fragment.glsl'

import purplevert from '../MenuCanvas/cubeshaders/purple/vertex.glsl'
import purplefrag from '../MenuCanvas/cubeshaders/purple/fragment.glsl'



const Logotextures = [
   '/common/Logos/BHMS.png',
   '/common/Logos/HousingSearch.png',
   '/common/Logos/LaughingTree.png',
   '/common/Logos/Rafw.png',
   '/common/Logos/Solit.png',
   '/common/Logos/StudyEnglish.png',
   '/common/Logos/Tanda.png',
   '/common/Logos/Towork.png' 
];

// Memoize texture loading
const textureCache = {};
const loadTexture = (path) => {
  if (!textureCache[path]) {
    const texture = new THREE.TextureLoader().load(path);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.generateMipmaps = true;
    texture.magFilter = THREE.LinearMipMapLinearFilter;
    texture.minFilter = THREE.LinearMipMapLinearFilter;
    texture.flipY = false;
    textureCache[path] = texture;
  }
  return textureCache[path];
};

const textures = Logotextures.map(loadTexture);


export const lightpurple_house = new THREE.ShaderMaterial({
  vertexShader: purpletextvert,
  fragmentShader: purpletextfrag,
  uniforms: {
    uLogo: { value: textures[1] },
    uX: { value: 0.6 },
    uY: { value: 0.5 }, 
    uScaleX: { value: 6.5 }, 
    uScaleY: { value: 6.6 },
    uBaseColor: { value: new THREE.Color(0xb0addc) },
    uOpacity: { value: 0 } 
  },
  transparent: true
});

export const lightpurple_tree = new THREE.ShaderMaterial({
    vertexShader: purpletextvert,
    fragmentShader: purpletextfrag,
    uniforms: {
      uLogo: { value: textures[2] },
      uX: { value: 0.6 },
      uY: { value: 0.53 }, 
      uScaleX: { value: 6.3 }, 
      uScaleY: { value: 6.3 },
      uBaseColor: { value: new THREE.Color(0xb0addc) },
      uOpacity: { value: 0 }  
    },
    transparent: true
});

export const lightpurple_towork = new THREE.ShaderMaterial({
    vertexShader: purpletextvert,
    fragmentShader: purpletextfrag,
    uniforms: {
      uLogo: { value: textures[7] },
      uX: { value: 0.22 },
      uY: { value: 1.65 }, 
      uScaleX: { value: 4.2 }, 
      uScaleY: { value: 13 },
      uBaseColor: { value: new THREE.Color(0xb0addc) },
      uOpacity: { value: 0 }  
    },
    transparent: true
});

export const lightpurple_solit = new THREE.ShaderMaterial({
    vertexShader: purpletextvert,
    fragmentShader: purpletextfrag,
    uniforms: {
      uLogo: { value: textures[4] },
      uX: { value: 0.5 },
      uY: { value: 0.8 }, 
      uScaleX: { value: 6.0 }, 
      uScaleY: { value: 7.5 },
      uBaseColor: { value: new THREE.Color(0xb0addc) },
      uOpacity: { value: 0 }  
    },
    transparent: true
});

export const lightpurple_study = new THREE.ShaderMaterial({
    vertexShader: purpletextvert,
    fragmentShader: purpletextfrag,
    uniforms: {
      uLogo: { value: textures[5] },
      uX: { value: 0.25 },
      uY: { value: 0.9 }, 
      uScaleX: { value: 4.4 }, 
      uScaleY: { value: 9.0 },
      uBaseColor: { value: new THREE.Color(0xb0addc) },
      uOpacity: { value: 0 }  
    },
    transparent: true
});

export const darkpurple_house = new THREE.ShaderMaterial({
    vertexShader: purpletextvert,
    fragmentShader: purpletextfrag,
    uniforms: {
      uLogo: { value: textures[1] },
      uX: { value: 0.6 },
      uY: { value: 2.7 }, 
      uScaleX: { value: 6.5 }, 
      uScaleY: { value: 6.6 },
      uBaseColor: { value: new THREE.Color(0x6863a7) },
      uOpacity: { value: 0 }  
    },
    transparent: true
});

export const darkpurple_tree = new THREE.ShaderMaterial({
    vertexShader: purpletextvert,
    fragmentShader: purpletextfrag,
    uniforms: {
      uLogo: { value: textures[2] },
      uX: { value: 0.5 },
      uY: { value: 2.6 }, 
      uScaleX: { value: 6.1 }, 
      uScaleY: { value: 6.1 },
      uBaseColor: { value: new THREE.Color(0x6863a7) },
      uOpacity: { value: 0 }  
    },
    transparent: true
});

export const darkpurple_rafw = new THREE.ShaderMaterial({
    vertexShader: purpletextvert,
    fragmentShader: purpletextfrag,
    uniforms: {
      uLogo: { value: textures[3] },
      uX: { value: 1.7 },
      uY: { value: 2.6 }, 
      uScaleX: { value: 13.0 }, 
      uScaleY: { value: 6.2 },
      uBaseColor: { value: new THREE.Color(0x6863a7) },
      uOpacity: { value: 0 }  
    },
    transparent: true
});

export const darkpurple_solit = new THREE.ShaderMaterial({
    vertexShader: purpletextvert,
    fragmentShader: purpletextfrag,
    uniforms: {
      uLogo: { value: textures[4] },
      uX: { value: 0.5 },
      uY: { value: 3.4 }, 
      uScaleX: { value: 6.0 }, 
      uScaleY: { value: 7.7 },
      uBaseColor: { value: new THREE.Color(0x6863a7) },
      uOpacity: { value: 0 }  
    },
    transparent: true
});

export const darkpurple_towork = new THREE.ShaderMaterial({
    vertexShader: purpletextvert,
    fragmentShader: purpletextfrag,
    uniforms: {
      uLogo: { value: textures[7] },
      uX: { value: 0.19 },
      uY: { value: 5.9 }, 
      uScaleX: { value: 4.2 }, 
      uScaleY: { value: 13 },
      uBaseColor: { value: new THREE.Color(0x6863a7) },
      uOpacity: { value: 0 }  
    },
    transparent: true
});


export const purplelight = new THREE.ShaderMaterial({
    vertexShader: purplevert,
    fragmentShader: purplefrag,
    uniforms: {
      uBaseColor: { value: new THREE.Color(0xb0addc) },
      uOpacity: { value: 0 }  
    },
    transparent: true
});

export const purpledark = new THREE.ShaderMaterial({
    vertexShader: purplevert,
    fragmentShader: purplefrag,
    uniforms: {
      uBaseColor: { value: new THREE.Color(0x6863a7) },
      uOpacity: { value: 0 }  
    },
    transparent: true
  });



// Basic Materials
export const white = new THREE.MeshBasicMaterial({ color: 'white', depthWrite: true, opacity: 0, transparent: true });
export const lightpurplebasic = new THREE.MeshBasicMaterial({ color: '#b1acf5' });
export const greyish = new THREE.MeshBasicMaterial({ color: '#222222' });


// Naima Materials
export const head = new THREE.MeshBasicMaterial({ color: '#EEB5A3' });
export const skin = new THREE.MeshToonMaterial({ color: '#EEB5A3' });
export const hairs = new THREE.MeshToonMaterial({ color: '#1F1E1D' });
export const TOP_SHIRT = new THREE.MeshToonMaterial({ color: '#9E5A5A' });
export const JACKET = new THREE.MeshToonMaterial({ color: '#1E1E1E' });
export const LIPS  = new THREE.MeshToonMaterial({ color: '#6A2006' });

