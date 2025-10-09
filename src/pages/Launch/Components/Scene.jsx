import { useTexture, useFBO, OrthographicCamera } from "@react-three/drei";
import { Canvas, useFrame, useThree, createPortal, extend } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef, Suspense } from "react";
import * as THREE from "three";
import { v4 as uuidv4 } from "uuid";

import BicubicUpscaleMaterial from './Clouds/bicubic';
import getFullscreenTriangle from './Clouds/Utils';
import vertexShader from "./Clouds/vertexShader.glsl";
import fragmentShader from "./Clouds/fragmentShader.glsl";
import cubeVertex from './cubevertex.glsl'
import cubeFragment from './cubeFragment.glsl'

extend({ BicubicUpscaleMaterial });

const DPR = 0.5;
// Blue noise texture
const BLUE_NOISE_TEXTURE_URL = "https://cdn.maximeheckel.com/noises/blue-noise.png";
// Noise texture
const NOISE_TEXTURE_URL = "https://cdn.maximeheckel.com/noises/noise2.png";

const Raymarching = () => {
  const mesh = useRef();
  const screenMesh = useRef();
  const screenCamera = useRef();
  const planeMesh = useRef();
  const upscalerMaterialRef = useRef();
  const { size, viewport } = useThree();

  const magicScene = new THREE.Scene();
  const newScene = new THREE.Scene();

  const {
    resolution,
  } = useControls({
    resolution: {
      value: 2,
      options: {
        "1x": 1,
        "0.5x": 2,
        "0.25x": 4,
        "0.125x": 8,
      },
    },
  });

  const renderTargetA = useFBO(
    window.innerWidth / resolution,
    window.innerHeight / resolution
  );

  const renderTargetB = useFBO(
    size.width,
    size.height
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
  };

  const planeuniforms = {
    uTexture: new THREE.Uniform(null),
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

    gl.setRenderTarget(renderTargetA);
    gl.render(magicScene, camera);

    upscalerMaterialRef.current.uniforms.uTexture.value = renderTargetA.texture;
    screenMesh.current.material = upscalerMaterialRef.current;

    gl.setRenderTarget(renderTargetB);
    gl.render(newScene, screenCamera.current);

    planeMesh.current.material.uniforms.uTexture.value = renderTargetB.texture;

    gl.setRenderTarget(null);
  });

  return (
    <>
      {createPortal(
        <>
        <OrthographicCamera ref={screenCamera} args={[-1, 1, 1, -1, 0, 1]} />
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
        <bicubicUpscaleMaterial ref={upscalerMaterialRef} key={uuidv4()} />
        <mesh
          ref={screenMesh}
          geometry={getFullscreenTriangle()}
          frustumCulled={false}
        >
          <meshBasicMaterial />
        </mesh>
        </>, newScene
     )}


      <mesh ref={planeMesh} scale={[viewport.width, viewport.height, 1]} position={[0, 0, 0]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial
          key={uuidv4()}
          fragmentShader={cubeFragment}
          vertexShader={cubeVertex}
          uniforms={planeuniforms}
          wireframe={false}
        />
      </mesh>



    </>
  );
};

const Scene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 6] }} dpr={[1, 2]} className="canvas w-full h-full fixed top-0 left-0">
      <Suspense fallback={null}>
        <Raymarching />
      </Suspense>
    </Canvas>
  );
};


export default Scene;
