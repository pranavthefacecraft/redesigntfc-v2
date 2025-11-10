import React, { useRef } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

export function Entity(props) {
  const { nodes, materials } = useGLTF('/Revamp/Scene.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        name="Path"
        castShadow
        receiveShadow
        geometry={nodes.Path.geometry}
        position={[0, 0, -24.735]}
        scale={[0.002, 1, 1]}
      >
      <meshToonMaterial
        color='black'
        shininess={400.0}
      />
      </mesh>  
      <pointLight
        name="Light"
        intensity={54.413}
        decay={2}
        position={[11.079, 5.904, 22.803]}
        rotation={[-1.839, 0.602, 1.932]}
      />
      <pointLight
        name="Light001"
        intensity={54.413}
        decay={2}
        position={[-14.13, 5.904, -8.008]}
        rotation={[-1.839, 0.602, 1.932]}
      />
      <pointLight
        name="Light002"
        intensity={54.413}
        decay={2}
        position={[15.514, 5.904, -37.652]}
        rotation={[-1.839, 0.602, 1.932]}
      />
    </group>
  )
}

useGLTF.preload('/Revamp/Scene.glb')
