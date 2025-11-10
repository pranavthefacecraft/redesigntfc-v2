import React, { useRef, useLayoutEffect } from 'react'
import { useGLTF, PerspectiveCamera, useAnimations, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export function BluePrintCamera(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/Revamp/blueprint_camera.glb')
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
        <PerspectiveCamera
          name="Camera"
          makeDefault={true}
          far={1000}
          near={0.1}
          fov={22.895}
          position={[0, 1.585, -283.033]}
          rotation={[-3.001, -0.184, 3.129]}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/Revamp/blueprint_camera.glb')
