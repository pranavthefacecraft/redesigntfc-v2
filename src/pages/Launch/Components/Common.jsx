import * as THREE from "three"
import { memo, useRef, useMemo, useLayoutEffect } from "react"
import { useGLTF, useAnimations, useScroll, useFBO, useTexture, PerspectiveCamera } from "@react-three/drei";
import { useThree, useFrame, extend, createPortal } from "@react-three/fiber";
import { v4 as uuidv4 } from "uuid";
import { useControls } from "leva";

import BicubicUpscaleMaterial from './Clouds/bicubic';
import getFullscreenTriangle from './Clouds/Utils';
import vertexShader from "./Clouds/vertexShader.glsl";
import fragmentShader from "./Clouds/fragmentShader.glsl";
import cubeVertex from './cubevertex.glsl'
import cubeFragment from './cubeFragment.glsl'

extend({ BicubicUpscaleMaterial });

const DPR = 0.5;
// Blue noise texture
const BLUE_NOISE_TEXTURE_URL = "/Launch/images/blue-noise.png";
// Noise texture
const NOISE_TEXTURE_URL = "/Launch/images/noise2.png";


const Common = memo(function Common() {
  const group = useRef()
  const glbcubesref = useRef([])
  const instanceMeshref = useRef()
  const cubematerialRef = useRef()

  const cloudPlane = useRef()
  const screenMesh = useRef()
  const screenCamera = useRef()
  const upscalerMaterialRef = useRef()

  const { nodes, materials, animations } = useGLTF('/Launch/models/Rubby.glb')
  const { actions } = useAnimations(animations, group)

  const { size, viewport } = useThree();
  const scroll = useScroll()

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

  // Scene and RenderTargets
  const magicScene = useMemo(() => new THREE.Scene(), []);
  const finalScene = useMemo(() => new THREE.Scene(), []);
  const renderTargetA = useFBO(
    size.width / resolution,
    size.height / resolution
  );
  const renderTargetB = useFBO(
    size.width,
    size.height
  );

  // Texture Setup
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
  
  // Unifroms clouds
  const uniforms = {
      uTime: new THREE.Uniform(0.0),
      uResolution: new THREE.Uniform(new THREE.Vector2()),
      uNoise: new THREE.Uniform(null),
      uBlueNoise: new THREE.Uniform(null),
      uFrame: new THREE.Uniform(0),
  };
  
  const uniformsCube = {
      uTime: { value: 0.0 },
      uResolution: { value: new THREE.Vector2(0, 0) },
      uTexture: { value: null },
  };

  useLayoutEffect(() => {
      const action = actions['Animation']; 
      if (action) {
        action.play();
        action.paused = true;
      }
  }, [actions]);


  // Reusable objects for matrix calculations
  const tempMatrix = useMemo(() => new THREE.Matrix4(), []);
  const tempQuaternion = useMemo(() => new THREE.Quaternion(), []);
  const tempVector = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    const { gl, clock, viewport, size } = state;

    // Update clouds uniforms
    cloudPlane.current.material.uniforms.uTime.value = clock.getElapsedTime();
    cloudPlane.current.material.uniforms.uResolution.value = new THREE.Vector2(
      renderTargetA.width,
      renderTargetA.height
    );
    cloudPlane.current.material.uniforms.uBlueNoise.value = blueNoiseTexture;
    cloudPlane.current.material.uniforms.uNoise.value = noisetexture;
    cloudPlane.current.material.uniforms.uFrame.value += 1;


    // Update cube uniforms
    if(instanceMeshref.current){
    instanceMeshref.current.material.uniforms.uTime.value = clock.getElapsedTime();
    instanceMeshref.current.material.uniforms.uResolution.value = new THREE.Vector2(
      size.width * viewport.dpr,
      size.height * viewport.dpr
    );
    }    

    const scrollOffset = scroll.offset; // Get the current scroll offset (0 to 1)
    if (actions && actions['Animation']) {
      const action = actions['Animation'];
      const duration = action.getClip().duration;
      action.time = scrollOffset * duration;
    }

    // Updating instance meshes Matrix with reusable objects
    if(instanceMeshref.current && glbcubesref.current.length > 0){
     for(let i = 0; i < glbcubesref.current.length; i++){
         const cube = glbcubesref.current[i];
         tempMatrix.compose(
             cube.position,
             tempQuaternion.setFromEuler(cube.rotation),
             tempVector.set(
                 cube.scale?.x ?? 0.7,
                 cube.scale?.y ?? 0.7,
                 cube.scale?.z ?? 0.7
             )
         );
         instanceMeshref.current.setMatrixAt(i, tempMatrix);
     }
     instanceMeshref.current.instanceMatrix.needsUpdate = true;
    }

    // First render pass - Clouds to renderTargetA
    gl.setRenderTarget(renderTargetA);
    gl.render(magicScene, screenCamera.current);

    // Update upscaler with first render target result
    upscalerMaterialRef.current.uniforms.uTexture.value = renderTargetA.texture;
    screenMesh.current.material = upscalerMaterialRef.current;

    // Second render pass - Upscaled result to renderTargetB
    gl.setRenderTarget(renderTargetB);
    gl.render(finalScene, screenCamera.current);

    // Update instanced mesh material with the final texture
    if (instanceMeshref.current && instanceMeshref.current.material) {
      instanceMeshref.current.material.uniforms.uTexture.value = renderTargetA.texture;
      instanceMeshref.current.material.uniforms.uTime.value = clock.getElapsedTime();
      instanceMeshref.current.material.uniforms.uResolution.value.set(
        size.width * viewport.dpr,
        size.height * viewport.dpr  
      );
      instanceMeshref.current.material.needsUpdate = true;
    }

    gl.setRenderTarget(null);

  });


  const cubeNames = useMemo(() => 
   Object.keys(nodes)
    .filter((k) => k.startsWith('Cube'))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true })),
  [nodes]
  )

  return (
    <>
    {createPortal(
      <>  
      <PerspectiveCamera ref={screenCamera} manual position={[0, 0, 1]} />
      {createPortal(
        <mesh ref={cloudPlane} scale={[viewport.width, viewport.height, 1]}>
          <planeGeometry args={[1, 1]} />
          <shaderMaterial
            key={uuidv4()}
            fragmentShader={fragmentShader}
            vertexShader={vertexShader}
            uniforms={uniforms}
            wireframe={false}
          />
        </mesh>,
        magicScene
      )}
      <bicubicUpscaleMaterial ref={upscalerMaterialRef} key={uuidv4()} />
      <mesh
        ref={screenMesh}
        geometry={getFullscreenTriangle()}
        frustumCulled={false}
      >
        <meshBasicMaterial />
      </mesh>
      </>, finalScene
    )}

    {/* Instanced Mesh */}
    {nodes && nodes.Scene && (
      <instancedMesh 
        ref={instanceMeshref}  
        args={[null, null, cubeNames.length]}
      >
        <shaderMaterial
         ref={cubematerialRef}
         vertexShader={cubeVertex} 
         fragmentShader={cubeFragment} 
         uniforms={uniformsCube} 
        />  
        <primitive attach="geometry" object={nodes.Cube002.geometry} />
      </instancedMesh>
    )}

    {/* AnimationTargets */}
    <group ref={group} dispose={null}>
      <group name="Scene">
        {cubeNames.map((name, index) => {
          const node = nodes[name];
          return (
            <mesh
              key={name}
              name={name}
              visible={false}
              ref={(el) => (glbcubesref.current[index] = el)}
              geometry={node.geometry}
              position={node.position ?? undefined}
              rotation={node.rotation ?? undefined}
              scale={node.scale ?? 0.7}
            />
          );
        })}
      </group>
    </group>
    
    </>
  )
});

export default Common;
useGLTF.preload('/Launch/models/Rubby.glb')