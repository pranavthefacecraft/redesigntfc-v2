import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Curve(props) {
  const { nodes } = useGLTF('/Comingsoon/Models/Curve.glb')

  // Find the actual curve object in nodes (inspect nodes in console if unsure)
  // Replace 'BezierCurve' with the actual name if different
  const curve = nodes.BezierCurve || nodes['BézierCurve'] || Object.values(nodes).find(n => n.type === 'Line')

  return (
    <group {...props} dispose={null}>
      {curve && <primitive object={curve} />}
    </group>
  )
}

useGLTF.preload('/Comingsoon/Models/Curve.glb')
