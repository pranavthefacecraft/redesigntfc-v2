import { memo, useRef, useMemo, useLayoutEffect } from "react"
import * as THREE from 'three'
import { useGLTF, useAnimations, useScroll, useFBO, PerspectiveCamera, OrthographicCamera, useTexture } from '@react-three/drei'
import { useFrame, useThree, createPortal, extend } from '@react-three/fiber'
import { v4 as uuidv4 } from "uuid";
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'

import cubevertex from './Screen/vertex.glsl'
import cubefragment from './Screen/fragment.glsl'

import cloudvertex from './Clouds/vertex.glsl'
import cloudfragment from './Clouds/fragment.glsl'

import BicubicUpscaleMaterial from './Clouds/BicubicUpscale';
import getFullscreenTriangle from './Clouds/Utils';

import useStore from "../zustand/store";

const resolution = 2.2;
// Blue noise texture
const BLUE_NOISE_TEXTURE_URL = "https://cdn.maximeheckel.com/noises/blue-noise.png";
// Noise texture
const NOISE_TEXTURE_URL = "https://cdn.maximeheckel.com/noises/noise2.png";

extend({ BicubicUpscaleMaterial })


const Common = memo(() => {

    const group = useRef()
    const animationTargetRef = useRef([])
    const instanceMeshref = useRef()
    const portalCameraRef = useRef()
    const screenCameraRef = useRef()
    const cloudplaneRef = useRef()
    const upscalerMaterialRef = useRef()
    const screenMeshRef = useRef()
    const smoothScrollRef = useRef(0)

    const { nodes, animations } = useGLTF('/Launch/models/Rubby.glb')
    const { actions } = useAnimations(animations, group)
    const { size, viewport } = useThree();

    // Store
    const { 
      rangevalue,
      cloudsColor,
      skyColor,
      lightColor,
    } = useStore();

    const sceneA = useMemo(() => new THREE.Scene(), []);
    const sceneB = useMemo(() => new THREE.Scene(), []);
    const renderTargetA = useFBO(size.width/resolution, size.height/resolution);
    const renderTargetB = useFBO(size.width, size.height);

    // Play the animation and pause it initially
    useLayoutEffect(() => {
      const action = actions['Animation']; 
      if (action) {
        action.play();
        action.paused = true;
      }
    }, [actions]);

    // uniforms setup for cube shader
    const uniformsCube = {
      uTime: new THREE.Uniform(0.0),
      uResolution: new THREE.Uniform(new THREE.Vector2(0, 0)),
      uRenderTargetTexture: new THREE.Uniform(null),
      uLogoTexture: new THREE.Uniform(null),
      uScrollOffset: new THREE.Uniform(0.0),
    };

    // uniforms setup for cloud shader
    const uniformsCloud = {
      uTime: new THREE.Uniform(0.0),
      uResolution: new THREE.Uniform(new THREE.Vector2()),
      uNoise: new THREE.Uniform(null),
      uBlueNoise: new THREE.Uniform(null),
      uFrame: new THREE.Uniform(0),
      uCloudSpeed: new THREE.Uniform(0.0),
      uCloudsColor: new THREE.Uniform(null),
      uSkyColor: new THREE.Uniform(null),
      uLightColor: new THREE.Uniform(null),
    };

    // load textures
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
    const texture = useTexture('/Launch/images/logoatlas.png')
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.flipY = false;
    texture.minFilter = THREE.LinearMipmapLinearFilter;


    // create custom shader material
    // creating customshadermaterial
    const cubeshadermaterial = useMemo(() => new CustomShaderMaterial({
      baseMaterial: THREE.MeshStandardMaterial,
      vertexShader: cubevertex,
      fragmentShader: cubefragment,
      uniforms: uniformsCube,
      metalness: 0.0,
      roughness: 0.0,
      transparent: true
    }), [])

    // Reusable objects for matrix calculations for cube instances
    const tempMatrix = useMemo(() => new THREE.Matrix4(), []);
    const tempQuaternion = useMemo(() => new THREE.Quaternion(), []);
    const tempVector = useMemo(() => new THREE.Vector3(), []);

    // Device-specific interpolation factor
    const interpolationFactor = useMemo(() => {
        return window.innerWidth <= 768 ? 0.015 : 0.095;
    }, []);

    // Render Loop
    useFrame((state, delta) => {

      const { gl, clock, viewport, size } = state;

      const currentScroll = window.scrollY / window.innerHeight;
      
      // Smooth scroll interpolation with device-specific factor
      smoothScrollRef.current = THREE.MathUtils.lerp(smoothScrollRef.current, currentScroll, interpolationFactor);

      // Update instance cube animations
      if (actions && actions['Animation']) {
        const action = actions['Animation'];
        const duration = action.getClip().duration;
        action.time = smoothScrollRef.current * duration;
      }

      // Updating instance meshes Matrix with reusable objects
      if(instanceMeshref.current && animationTargetRef.current.length > 0){
       for(let i = 0; i < animationTargetRef.current.length; i++){
           const cube = animationTargetRef.current[i];
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

      // Update instance cube shader uniforms
      if(instanceMeshref.current){
        instanceMeshref.current.material.uniforms.uTime.value = clock.getElapsedTime();
        instanceMeshref.current.material.uniforms.uResolution.value = new THREE.Vector2(size.width * viewport.dpr, size.height * viewport.dpr);
        instanceMeshref.current.material.uniforms.uScrollOffset.value = smoothScrollRef.current;
        instanceMeshref.current.material.uniforms.uLogoTexture.value = texture;

      }

      // Update cloud shader uniforms
      if(cloudplaneRef.current){
        cloudplaneRef.current.material.uniforms.uTime.value = clock.getElapsedTime();
        cloudplaneRef.current.material.uniforms.uResolution.value = new THREE.Vector2(renderTargetA.width, renderTargetA.height);
        cloudplaneRef.current.material.uniforms.uFrame.value += 1;
        cloudplaneRef.current.material.uniforms.uNoise.value = noisetexture;
        cloudplaneRef.current.material.uniforms.uBlueNoise.value = blueNoiseTexture;
        cloudplaneRef.current.material.uniforms.uCloudSpeed.value = rangevalue;
        cloudplaneRef.current.material.uniforms.uCloudsColor.value = new THREE.Color(cloudsColor);
        cloudplaneRef.current.material.uniforms.uSkyColor.value = new THREE.Color(skyColor);
        cloudplaneRef.current.material.uniforms.uLightColor.value = new THREE.Color(lightColor);
      }

      // Render Scene A to Render Target A
      gl.setRenderTarget(renderTargetA);
      gl.render(sceneA, portalCameraRef.current);

      // Update upscaler material resolution and texture
      upscalerMaterialRef.current.uniforms.uTexture.value = renderTargetA.texture;
      screenMeshRef.current.material = upscalerMaterialRef.current;

      // Render Scene B to Render Target B
      gl.setRenderTarget(renderTargetB);
      gl.render(sceneB, screenCameraRef.current);

      // Update instance cube material texture to the upscaled texture
      if(instanceMeshref.current){
          instanceMeshref.current.material.uniforms.uRenderTargetTexture.value = renderTargetB.texture;
      }

      gl.setRenderTarget(null);

    })    


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
           <PerspectiveCamera ref={portalCameraRef} manual position={[0,0,1]} /> 
           <mesh ref={cloudplaneRef} scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1]} />
            <shaderMaterial
              key={uuidv4()}
              fragmentShader={cloudfragment}
              vertexShader={cloudvertex}
              uniforms={uniformsCloud}
              wireframe={false}
            />
           </mesh>
         </>, sceneA
        )}


        {createPortal(
         <>
           <OrthographicCamera ref={screenCameraRef} args={[-1, 1, 1, -1, 0, 1]} />
           <bicubicUpscaleMaterial ref={upscalerMaterialRef} key={uuidv4()} />
           <mesh
             ref={screenMeshRef}
             geometry={getFullscreenTriangle()}
             frustumCulled={false}
           >
             <meshBasicMaterial />
           </mesh>
         </>, sceneB
        )}


        {/* Instanced Mesh */}
        <instancedMesh 
          ref={instanceMeshref}  
          args={[null, cubeshadermaterial, cubeNames.length]}
        >
          <primitive attach="geometry" object={nodes.Cube002.geometry} />
        </instancedMesh>

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
                  ref={(el) => (animationTargetRef.current[index] = el)}
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