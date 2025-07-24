import React, { useRef } from 'react'
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei'


export function AnimatedScene(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/Comingsoon/Models/SceneAnimation.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <pointLight
          name="Light"
          intensity={80}
          decay={2}
          position={[5.952, 8.701, -5.023]}
          rotation={[-1.839, 0.602, 1.932]}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/Comingsoon/Models/SceneAnimation.glb')
