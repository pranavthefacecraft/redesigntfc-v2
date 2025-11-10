

import React, { useRef, useLayoutEffect } from 'react'
import { useGLTF, PerspectiveCamera, useAnimations, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export function Camera(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/Revamp/Camera.glb')
  const { actions } = useAnimations(animations, group)

  const scroll = useScroll()


  useLayoutEffect(() => {
      const action = actions['Action']; 
      if (action) {
        action.play();
        action.paused = true;
      }
  }, [actions]);

  useFrame(() => {
       
      const scrollOffset = scroll.offset
      
      // Update camera animation
      if (actions && actions['Action']) {
        const action = actions['Action'];
        const duration = action.getClip().duration;
        // Map the scroll progress to animation time
        action.time = scrollOffset * duration * 0.9;
      }
  });



  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <PerspectiveCamera
          name="Camera"
          makeDefault={false}
          far={100}
          near={0.1}
          fov={37.299}
          position={[0, 2.674, 54.829]}
          rotation={[-0.17, 0.017, 0.005]}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/Revamp/Camera.glb')
