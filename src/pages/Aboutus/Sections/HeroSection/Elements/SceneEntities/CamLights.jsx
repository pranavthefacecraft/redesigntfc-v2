import React, { useRef } from 'react'
import { useGLTF, PerspectiveCamera, shaderMaterial } from '@react-three/drei'

export function Cameralights(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/About/Models/Cameralight.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ground.geometry}
        scale={100}
      >
         <shadowMaterial transparent opacity={0.1} />
      </mesh>  
      <directionalLight
        name="Light"
        intensity={6830}
        castShadow
        decay={2}
        position={[10.433, 50.904, -10.398]}
        rotation={[-5.113, 0.382, 2.497]}
      />
      <PerspectiveCamera
        name="Camera"
        makeDefault={true}
        far={100}
        near={0.1}
        fov={20.895}
        position={[12.207, 11.575, 11.314]}
        rotation={[-0.704, 0.701, 0.501]}
      />
    </group>
  )
}

useGLTF.preload('/About/Models/Cameralight.glb')
