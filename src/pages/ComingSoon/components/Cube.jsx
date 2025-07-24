import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

import { shadercubie } from './Material/Material'


export function RubixCubie(props) {
  const { nodes, materials } = useGLTF('/Comingsoon/Models/Comingsoon.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        name="Cube"
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={shadercubie}
        position={[0, 0.7, 0]}
        scale={0.7}
      />
    </group>
  )
}

useGLTF.preload('/Comingsoon/Models/Comingsoon.glb')
