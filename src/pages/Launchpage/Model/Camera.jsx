import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, PerspectiveCamera, useAnimations, useScroll } from '@react-three/drei'
import useStore from '../contexts/store'

export const Camera = (props) => {
  const group = useRef()
  let scrollY = window.scrollY;
  const currentScroll = useRef(0);
  const { nodes, materials, animations } = useGLTF('/Launch/models/Cam.glb')
  const { actions, names } = useAnimations(animations, group)

  const { setScrollOffset } = useStore();
  
  
  useEffect(() => {
    if (actions && actions['Action']) {
      actions['Action'].play()
      actions['Action'].paused = true 
    }

    const handleScroll = () => {    
        scrollY = window.scrollY / window.innerHeight;
        currentScroll.current = scrollY;
        actions['Action'].time = currentScroll.current
        setScrollOffset(scrollY);
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [actions])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <PerspectiveCamera
          name="Camera001"
          makeDefault={true}
          far={1000}
          near={0.1}
          fov={20.895}
          position={[1.844, 26.81, 1.562]}
          rotation={[-1.491, 0.079, 0.779]}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/Launch/models/Cam.glb')
