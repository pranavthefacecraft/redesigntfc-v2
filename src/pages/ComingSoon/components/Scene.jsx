
import React, { useRef } from 'react'
import { useGLTF, PerspectiveCamera } from '@react-three/drei'

export function Scene(props) {
  const { nodes, materials } = useGLTF('/Comingsoon/Models/Scene.glb')
  return (
    <group {...props} dispose={null}>
      <PerspectiveCamera
        name="Camera"
        makeDefault={true}
        far={100}
        near={0.1}
        fov={12.895}
        position={[31.56, 20.697, 29.738]}
        rotation={[-0.627, 0.71, 0.441]}
      />
      <pointLight
        name="Light"
        intensity={50}
        decay={2}
        position={[4.076, 5.904, -1.005]}
        rotation={[-1.839, 0.602, 1.932]}
      />
    </group>
  )
}

useGLTF.preload('/Comingsoon/Models/Scene.glb')
