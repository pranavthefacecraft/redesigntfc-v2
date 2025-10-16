import { useTexture, useFBO, OrthographicCamera, PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree, createPortal, extend } from "@react-three/fiber";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";
import { v4 as uuidv4 } from "uuid";

import BicubicUpscaleMaterial from './Components/Shaders/Clouds/BicubicUpscale';
import getFullscreenTriangle from './Components/Shaders/Clouds/Utils';
import vertexShader from "./Components/Shaders/Clouds/vertex.glsl";
import fragmentShader from "./Components/Shaders/Clouds/fragment.glsl";

import { usePlay } from "./Contexts/Play";

extend({ BicubicUpscaleMaterial });

const resolution = 2.3;
// Blue noise texture
const BLUE_NOISE_TEXTURE_URL = "https://cdn.maximeheckel.com/noises/blue-noise.png";
// Noise texture
const NOISE_TEXTURE_URL = "https://cdn.maximeheckel.com/noises/noise2.png";

export default function Raymarching() {
  const mesh = useRef();
  const screenMesh = useRef();
  const screenCamera = useRef();
  const cloudsCamera = useRef();
  const upscalerMaterialRef = useRef();
  const { size, viewport } = useThree();

  const { 
        cloudsColor,
        skyColor,
        lightColor,
        rangevalue,
        setRenderTarget
    } = usePlay();

  const magicScene = useMemo(() => new THREE.Scene(), []);
  const upscaleScene = useMemo(() => new THREE.Scene(), []);

  const renderTargetA = useFBO(
    size.width / resolution,
    size.height / resolution
  );

  const renderTargetB = useFBO(
    size.width * viewport.dpr,
    size.height * viewport.dpr
  );

  const blueNoiseTexture = useTexture(BLUE_NOISE_TEXTURE_URL);
  blueNoiseTexture.wrapS = THREE.RepeatWrapping;
  blueNoiseTexture.wrapT = THREE.RepeatWrapping;

  blueNoiseTexture.minFilter = THREE.NearestMipmapLinearFilter;
  blueNoiseTexture.magFilter = THREE.NearestMipmapLinearFilter;

  const noisetexture = useTexture(NOISE_TEXTURE_URL);
  noisetexture.wrapS = THREE.RepeatWrapping;
  noisetexture.wrapT = THREE.RepeatWrapping;

  noisetexture.minFilter = THREE.NearestMipmapLinearFilter;
  noisetexture.magFilter = THREE.NearestMipmapLinearFilter;

  const uniforms = {
    uTime: new THREE.Uniform(0.0),
    uResolution: new THREE.Uniform(new THREE.Vector2()),
    uNoise: new THREE.Uniform(null),
    uBlueNoise: new THREE.Uniform(null),
    uFrame: new THREE.Uniform(0),
    uCloudColor: { value: new THREE.Color(cloudsColor) },
    uSkyColor: { value: new THREE.Color(skyColor) },
    uLightColor: { value: new THREE.Color(lightColor) },
    uCloudSpeed: new THREE.Uniform(rangevalue)
  };

  useFrame((state) => {
    const { gl, clock, camera } = state;
    mesh.current.material.uniforms.uTime.value = clock.getElapsedTime();
    mesh.current.material.uniforms.uResolution.value = new THREE.Vector2(
      renderTargetA.width,
      renderTargetA.height
    );
    mesh.current.material.uniforms.uBlueNoise.value = blueNoiseTexture;
    mesh.current.material.uniforms.uNoise.value = noisetexture;
    mesh.current.material.uniforms.uFrame.value += 1;
    mesh.current.material.uniforms.uCloudColor.value.set(cloudsColor);
    mesh.current.material.uniforms.uSkyColor.value.set(skyColor);
    mesh.current.material.uniforms.uLightColor.value.set(lightColor);
    mesh.current.material.uniforms.uCloudSpeed.value = rangevalue;

    gl.setRenderTarget(renderTargetA);
    gl.render(magicScene, cloudsCamera.current);

    upscalerMaterialRef.current.uniforms.uTexture.value = renderTargetA.texture;
    screenMesh.current.material = upscalerMaterialRef.current;

    gl.setRenderTarget(renderTargetB);
    gl.render(upscaleScene, screenCamera.current);

    setRenderTarget(renderTargetB);
    
    gl.setRenderTarget(null);
  });

  return (
    <>
    <Suspense fallback={null}>
      {createPortal(
        <>
        <PerspectiveCamera ref={cloudsCamera} manual position={[0, 0, 1]} />
        <mesh ref={mesh} scale={[viewport.width, viewport.height, 1]}>
          <planeGeometry args={[1, 1]} />
          <shaderMaterial
            key={uuidv4()}
            fragmentShader={fragmentShader}
            vertexShader={vertexShader}
            uniforms={uniforms}
            wireframe={false}
          />
        </mesh>
        </>,
        magicScene
      )}

      {createPortal(
        <>
         <OrthographicCamera ref={screenCamera} args={[-1, 1, 1, -1, 0, 1]} />
         <bicubicUpscaleMaterial ref={upscalerMaterialRef} key={uuidv4()} />
         <mesh
           ref={screenMesh}
           geometry={getFullscreenTriangle()}
           frustumCulled={false}
         >
           <meshBasicMaterial />
         </mesh>
        </>,
        upscaleScene
      )}
    </Suspense>
    </>
    );
};


