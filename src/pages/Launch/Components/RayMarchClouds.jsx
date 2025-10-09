import { useTexture, useFBO, OrthographicCamera, PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree, createPortal, extend } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef, Suspense, memo } from "react";
import * as THREE from "three";
import { v4 as uuidv4 } from "uuid";

import BicubicUpscaleMaterial from './Shaders/Clouds/Bicubic';
import getFullscreenTriangle from './Shaders/Clouds/FullScreen';
import vertexShader from "./Shaders/Clouds/cloudvert.glsl";
import fragmentShader from "./Shaders/Clouds/cloudfrag.glsl";

extend({ BicubicUpscaleMaterial });

// Blue noise texture
const BLUE_NOISE_TEXTURE_URL = "/Launch/images/blue-noise.png";
// Noise texture
const NOISE_TEXTURE_URL = "/Launch/images/noise2.png";

export const Raymarching = memo(() => {

  const { size, viewport } = useThree();

  const originalPlane = useRef();
  const portalCamera = useRef();


  // Load textures
  const blueNoiseTexture = useTexture(BLUE_NOISE_TEXTURE_URL);
  blueNoiseTexture.wrapS = THREE.RepeatWrapping;
  blueNoiseTexture.wrapT = THREE.RepeatWrapping;
  blueNoiseTexture.minFilter = THREE.NearestMipmapLinearFilter;
  blueNoiseTexture.magFilter = THREE.NearestMipmapLinearFilter;

  const noisetexture = useTexture(NOISE_TEXTURE_URL);
  noisetexture.wrapS = THREE.RepeatWrapping;
  noisetexture.wrapT = THREE.RepeatWrapping;
  noisetexture.minFilter = THREE.NearestMipmapLinearFilter;
  noisetexture.magFilter = THREE.NearestMipmapLinearFilter




  // Uniform setup
  const uniforms = {
    uTime: new THREE.Uniform(0.0),
    uResolution: new THREE.Uniform(new THREE.Vector2()),
    uNoise: new THREE.Uniform(null),
    uBlueNoise: new THREE.Uniform(null),
    uFrame: new THREE.Uniform(0),
  };



  useFrame((state) => {
    const { gl, clock, camera } = state;

    // Update uniforms for clouds
    originalPlane.current.material.uniforms.uTime.value = clock.getElapsedTime();
    originalPlane.current.material.uniforms.uResolution.value = new THREE.Vector2(
      size.width,
      size.height
    );

    originalPlane.current.material.uniforms.uBlueNoise.value = blueNoiseTexture;
    originalPlane.current.material.uniforms.uNoise.value = noisetexture;
    originalPlane.current.material.uniforms.uFrame.value += 1;

  });


  return (
    <>
    <PerspectiveCamera ref={portalCamera} manual position={[0, 0, 1]} />
    <mesh ref={originalPlane} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        key={uuidv4()}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </mesh>

    </>
  )
})
