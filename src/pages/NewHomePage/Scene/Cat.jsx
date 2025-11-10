import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Cat(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/Revamp/cattie.glb')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null} scale={0.05} position={[0,0,-10]}>
      <group name="Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, -Math.PI]} scale={0.114}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="GLTF_created_0">
                <group name="0000_pet_s_4cat_Black_60">
                  <group name="0000_pet_s_4cat_Black_61" />
                </group>
                <group name="0001_pet_s_4cat_Black_62">
                  <group name="0001_pet_s_4cat_Black_63" />
                </group>
                <group name="0002_pet_s_4cat_Black_64">
                  <group name="0002_pet_s_4cat_Black_65" />
                </group>
                <group name="0003_pet_s_4cat_Black_66">
                  <group name="0003_pet_s_4cat_Black_67" />
                </group>
                <skinnedMesh
                  name="Object_7"
                  geometry={nodes.Object_7.geometry}
                  skeleton={nodes.Object_7.skeleton}
                >
                    <meshBasicMaterial color={'white'}/>
                    </skinnedMesh>
                <primitive object={nodes.GLTF_created_0_rootJoint} />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/Revamp/cattie.glb')
