import * as THREE from 'three';
import vert from './Shader/vertex.glsl';
import frag from './Shader/fragment.glsl';
import { useEffect } from 'react'
import gsap from 'gsap'
import useComingSoonStore from '../../ComingSoonStore';

const Logotextures = [
   '/Comingsoon/Images/logoatlas.png'
];

// Enhanced texture cache with error handling and loading states
const textureCache = new Map();
const textureLoadingPromises = new Map();

const loadTexture = (path) => {
  // Return cached texture immediately if available
  if (textureCache.has(path)) {
    return textureCache.get(path);
  }

  // Return existing loading promise if texture is being loaded
  if (textureLoadingPromises.has(path)) {
    return textureLoadingPromises.get(path);
  }

  // Create new loading promise
  const loadingPromise = new Promise((resolve, reject) => {
    const loader = new THREE.TextureLoader();
    
    loader.load(
      path,
      (texture) => {
        // Optimize texture settings
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        texture.colorSpace = THREE.SRGBColorSpace;
        
        // Fix: Use correct filter types
        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.flipY = false;
        
        // Enable mipmaps for better performance at distance
        texture.generateMipmaps = true;
        texture.needsUpdate = true;
        
        // Cache the loaded texture
        textureCache.set(path, texture);
        textureLoadingPromises.delete(path);
        
        resolve(texture);
      },
      (progress) => {
        // Optional: Handle loading progress
        console.log(`Loading texture ${path}: ${(progress.loaded / progress.total * 100)}%`);
      },
      (error) => {
        console.error(`Failed to load texture: ${path}`, error);
        textureLoadingPromises.delete(path);
        
        // Create fallback texture
        const fallbackTexture = new THREE.DataTexture(
          new Uint8Array([255, 255, 255, 255]), 1, 1, THREE.RGBAFormat
        );
        fallbackTexture.needsUpdate = true;
        textureCache.set(path, fallbackTexture);
        
        resolve(fallbackTexture);
      }
    );
  });

  textureLoadingPromises.set(path, loadingPromise);
  return loadingPromise;
};

// Load textures asynchronously
const texturePromises = Logotextures.map(loadTexture);

// Create material factory function for better memory management
let materialInstance = null;

export const createShaderMaterial = async () => {
  // Return cached material if available
  if (materialInstance) {
    return materialInstance;
  }

  try {
    // Wait for all textures to load
    const loadedTextures = await Promise.all(texturePromises);
    
    materialInstance = new THREE.ShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      vertexColors: true,
      uniforms: {
        uLogo: { value: loadedTextures[0] },
        uOpacity: { value: 1.0 }
      },
      transparent: true,
      side: THREE.DoubleSide, // Add if needed
      depthWrite: true,
      depthTest: true
    });

    return materialInstance;
  } catch (error) {
    console.error('Failed to create shader material:', error);
    
    // Return basic material as fallback
    return new THREE.MeshBasicMaterial({ 
      color: 0xffffff, 
      transparent: true,
      opacity: 1 
    });
  }
};

// Synchronous version for immediate use (with fallback)
export const shadercubie = new THREE.ShaderMaterial({
  vertexShader: vert,
  fragmentShader: frag,
  vertexColors: true,
  uniforms: {
    uLogo: { value: null }, // Will be updated when texture loads
    uOpacity: { value: 2.0 }
  },
  transparent: true,
  side: THREE.DoubleSide,
  depthWrite: true,
  depthTest: true
});

// Duplicate material: maincubie
export const maincubie = new THREE.ShaderMaterial({
  vertexShader: vert,
  fragmentShader: frag,
  vertexColors: true,
  uniforms: {
    uLogo: { value: null }, // Will be updated when texture loads
    uOpacity: { value: 2.0 }
  },
  transparent: true,
  side: THREE.DoubleSide,
  depthWrite: true,
  depthTest: true
});

// Update both materials when textures are loaded
Promise.all(texturePromises).then((loadedTextures) => {
  if (shadercubie.uniforms.uLogo) {
    shadercubie.uniforms.uLogo.value = loadedTextures[0];
    shadercubie.needsUpdate = true;
  }
  if (maincubie.uniforms.uLogo) {
    maincubie.uniforms.uLogo.value = loadedTextures[0];
    maincubie.needsUpdate = true;
  }
}).catch((error) => {
  console.error('Failed to load textures for shadercubie/maincubie:', error);
});

// Cleanup function for memory management
export const disposeMaterial = () => {
  if (materialInstance) {
    materialInstance.dispose();
    materialInstance = null;
  }
  
  shadercubie.dispose();
  maincubie.dispose();
  
  // Dispose cached textures
  textureCache.forEach((texture) => {
    if (texture.dispose) {
      texture.dispose();
    }
  });
  textureCache.clear();
  textureLoadingPromises.clear();
};

// Preload textures function
export const preloadTextures = () => {
  return Promise.all(texturePromises);
};

// Animate opacity when triggered
export function useMaterialFade() {
  const isMaterialFadeActive = useComingSoonStore(s => s.isMaterialFadeActive)
  useEffect(() => {
   
    if (isMaterialFadeActive) {
     
      gsap.to(shadercubie.uniforms.uOpacity, {
        value: 0.0,
        duration: 1,
        delay: 0.1, // Optional delay
        ease: 'power2.inOut',
        
      })
      // gsap.to(maincubie.uniforms.uOpacity, {
      //   value: 0.0,
      //   duration: 1,
      //   ease: 'power2.inOut',
      //   onUpdate: () => {
      //     console.log('maincubie uOpacity:', maincubie.uniforms.uOpacity.value)
      //   },
      //   onComplete: () => {
      //     console.log('maincubie opacity animation complete:', maincubie.uniforms.uOpacity.value)
      //   }
      // })
    }
  }, [isMaterialFadeActive])
}

