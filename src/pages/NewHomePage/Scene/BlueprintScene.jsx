import React, { useRef, useLayoutEffect } from 'react'
import { useGLTF, useAnimations, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export function BluePrintScene(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/Revamp/blueprint_scene.glb')
  const { actions } = useAnimations(animations, group)

  const scroll = useScroll()

  useLayoutEffect(() => {
        const action = actions['Animation']; 
        if (action) {
          action.play();
          action.paused = true;
        }
  }, [actions]);
  
  
  useFrame(() => {
  
    const offset = scroll.offset
  
    if (actions && actions['Animation']) {
      const action = actions['Animation'];
      const duration = action.getClip().duration;
      action.time = offset * duration;
    }
    
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Cat" position={[0.968, 0, -278.261]} rotation={[0, 0.197, 0]} scale={0.011}>
          <group name="0000_pet_s_4cat_Black_60" position={[0, 0, 0.001]}>
            <group name="0000_pet_s_4cat_Black_61" position={[0, 0, 0.001]} />
          </group>
          <group name="0001_pet_s_4cat_Black_62" position={[0, 0, 0.001]}>
            <group name="0001_pet_s_4cat_Black_63" position={[0, 0, 0.001]} />
          </group>
          <group name="0002_pet_s_4cat_Black_64" position={[0, 0, 0.001]}>
            <group name="0002_pet_s_4cat_Black_65" position={[0, 0, 0.001]} />
          </group>
          <group name="0003_pet_s_4cat_Black_66" position={[0, 0, 0.001]}>
            <group name="0003_pet_s_4cat_Black_67" position={[0, 0, 0.001]} />
          </group>
          <skinnedMesh
            name="Object_7"
            geometry={nodes.Object_7.geometry}
            material={materials.cAT}
            skeleton={nodes.Object_7.skeleton}
          />
          <primitive object={nodes.GLTF_created_0_rootJoint} />
        </group>
        <mesh
          name="Road"
          castShadow
          receiveShadow
          geometry={nodes.Road.geometry}
          material={nodes.Road.material}
          position={[0, 0, 5.258]}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/Revamp/blueprint_scene.glb')
