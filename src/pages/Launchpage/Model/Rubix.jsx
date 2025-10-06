import React, { useRef, useEffect, useMemo, memo } from 'react'
import * as THREE from 'three'
import { useGLTF, useAnimations, useTexture} from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'

import CustomShaderMaterial from 'three-custom-shader-material/vanilla'

import useStore from '../contexts/store'

import cubevertex from '../cubeshader/vertex.glsl'
import cubefragment from '../cubeshader/fragment.glsl'


const Common = memo(function Common() {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/Launch/models/Rubby.glb')
  const { actions, names } = useAnimations(animations, group)
  const { size, viewport } = useThree()

  const { cloudsTexture, scrollOffset } = useStore()

  const glbcubesref = useRef([])
  const instanceMeshref = useRef()

  const texture = useTexture('/Launch/images/logoatlas.png', (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      texture.flipY = false;
      texture.minFilter = THREE.LinearMipmapLinearFilter; // Use mipmaps for better quality
      texture.generateMipmaps = true; // Disable if not needed
  });

  // Animation on scroll
  useEffect(() => {
      if (actions && actions['Animation']) {
        actions['Animation'].play()
        actions['Animation'].paused = true 
      }

      actions['Animation'].time = scrollOffset;

  }, [actions, scrollOffset])

  // Memoize cube uniforms
  const cubeuniforms = useMemo(() => ({
    uTime: new THREE.Uniform(0.0),
    uResolution: new THREE.Uniform(new THREE.Vector2(0,0)),
    uScrollOffset: new THREE.Uniform(0.0),
    uTexture: new THREE.Uniform(texture),
    uRenderTexture: new THREE.Uniform(null),
  }), []);

  // creating customshadermaterial
  const cubeshadermaterial = useMemo(() => new CustomShaderMaterial({
    baseMaterial: THREE.MeshStandardMaterial,
    vertexShader: cubevertex,
    fragmentShader: cubefragment,
    uniforms: cubeuniforms,

    metalness: 0.0,
    roughness: 0.0,
    transparent: true
  }), [])


  // Reusable objects for matrix calculations
  const tempMatrix = useMemo(() => new THREE.Matrix4(), []);
  const tempQuaternion = useMemo(() => new THREE.Quaternion(), []);
  const tempVector = useMemo(() => new THREE.Vector3(), []);
  
  // Render-Loop
  useFrame((state) => {
    const { clock, gl } = state;

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

    // instance mesh uniforms update
    if(cubeshadermaterial){
        cubeshadermaterial.uniforms.uTime.value = clock.getElapsedTime();
        cubeshadermaterial.uniforms.uScrollOffset.value = scrollOffset;
        cubeshadermaterial.uniforms.uResolution.value = new THREE.Vector2(size.width * viewport.dpr, size.height * viewport.dpr);
        if(cloudsTexture !== null){
            cubeshadermaterial.uniforms.uRenderTexture.value = cloudsTexture;
        }
    }
    // Log draw calls
    // console.log('Draw Calls:', gl.info.render.calls);
    
  });

  const cubeNames = useMemo(() => 
  Object.keys(nodes)
    .filter((k) => k.startsWith('Cube'))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true })),
  [nodes]
  )

  return (
    <>

    <instancedMesh ref={instanceMeshref} material={cubeshadermaterial} args={[null, null, nodes.Scene.children.length]}>  
      <primitive attach="geometry"  object={nodes.Cube002.geometry} />
    </instancedMesh>

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
