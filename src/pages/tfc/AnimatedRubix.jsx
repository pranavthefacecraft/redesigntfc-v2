import { useRef, useLayoutEffect, useMemo } from "react"
import * as THREE from 'three'
import { useGLTF, useAnimations, useScroll, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'

import { usePlay } from "./Contexts/Play";
import cubevertex from './Components/Shaders/Screen/vertex.glsl'
import cubefragment from './Components/Shaders/Screen/fragment.glsl'


export default function Rubix() {
    const group = useRef()
    const animationTargetRef = useRef([])
    const instanceMeshref = useRef()
    const lastScrollOffset = useRef(0)
    const { nodes, animations } = useGLTF('/Launch/models/Rubby.glb')
    const { actions } = useAnimations(animations, group)
    const scroll = useScroll()
    const { size, viewport } = useThree();
    const { end, renderTarget } = usePlay()

    useLayoutEffect(() => {
        const action = actions['Animation']; 
        if (action) {
            action.play();
            action.paused = true;
        }
    }, [actions]);

    const texture = useTexture('/Launch/images/logoatlas.png');
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.flipY = false;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearMipmapLinearFilter;


    const uniforms = useMemo(() => ({
      uTime: new THREE.Uniform(0.0),
      uResolution: new THREE.Uniform(new THREE.Vector2(0,0)),
      uScrollOffset: new THREE.Uniform(0.0),
      uTexture: new THREE.Uniform(null),
      uRenderTexture: new THREE.Uniform(null),
    }), []);

    // creating customshadermaterial
    const cubeshadermaterial = useMemo(() => new CustomShaderMaterial({
      baseMaterial: THREE.MeshStandardMaterial,
      vertexShader: cubevertex,
      fragmentShader: cubefragment,
      uniforms: uniforms,
  
      metalness: 0.0,
      roughness: 0.0,
      transparent: true
    }), [])

    const tempMatrix = useMemo(() => new THREE.Matrix4(), []);
    const tempQuaternion = useMemo(() => new THREE.Quaternion(), []);
    const tempVector = useMemo(() => new THREE.Vector3(), []);

    const cubeNames = useMemo(() => 
     Object.keys(nodes)
      .filter((k) => k.startsWith('Cube'))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true })),
     [nodes]
    )
    
    // Render Loop
    useFrame((state, delta) => {

        const { clock } = state;
        const scrollOffset = scroll.offset;
  
        if (actions && actions['Animation']) {
            const action = actions['Animation'];
            const duration = action.getClip().duration;
            if (end && lastScrollOffset.current !== scrollOffset) {
              action.time = duration;
              lastScrollOffset.current = scrollOffset;
            } else if (!end) {
              action.time = scrollOffset * duration;
              lastScrollOffset.current = scrollOffset;
            }
        }

        if (instanceMeshref.current && animationTargetRef.current.length > 0) {
            for (let i = 0; i < animationTargetRef.current.length; i++) {
                const cube = animationTargetRef.current[i];
                if (!cube) continue;
                
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

        // Update uniforms
        instanceMeshref.current.material.uniforms.uTime.value = clock.getElapsedTime();
        instanceMeshref.current.material.uniforms.uResolution.value.set(size.width * viewport.dpr, size.height * viewport.dpr);
        // Use the same scroll logic for shader as we do for animation
        instanceMeshref.current.material.uniforms.uScrollOffset.value = end ? 1.0 : scroll.offset;
        instanceMeshref.current.material.uniforms.uTexture.value = texture;

        if (renderTarget) {
          instanceMeshref.current.material.uniforms.uRenderTexture.value = renderTarget.texture;
        }

    });

    return (
        <>
            {/* Instanced Mesh */}
            <instancedMesh 
              ref={instanceMeshref}  
              args={[null, cubeshadermaterial, cubeNames.length]}
            >
              <primitive attach="geometry" object={nodes.Cube002.geometry} />
            </instancedMesh>

            {/* Animation Targets */}
            <group ref={group} dispose={null}>
              <group name="Scene">
                {cubeNames.map((name, index) => {
                  const node = nodes[name];
                  if (!node) return null;
                  return (
                   <mesh
                    key={name}
                    name={name}
                    visible={false}
                    ref={(el) => {
                        if (el) {
                            animationTargetRef.current[index] = el;
                        }
                    }}
                    geometry={node.geometry}
                    position={node.position ?? [0, 0, 0]}
                    rotation={node.rotation ?? [0, 0, 0]}
                    scale={node.scale ?? 0.7}
                   />
                  );
                })}
              </group>
            </group>
        </>
    );
}

useGLTF.preload('/Launch/models/Rubby.glb')