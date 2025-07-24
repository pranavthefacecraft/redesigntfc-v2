import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useSpring, animated } from '@react-spring/three'

const MouseFollowCubePosYNegX = ({ geometry, material, basePosition, rotation, scale }) => {
  const mousePosition = useRef({ x: 0, y: 0 })
  const [{ position }, api] = useSpring(() => ({
    position: basePosition,
    config: { tension: 250, friction: 40, mass: 0.3 }
  }))

  useEffect(() => {
    const handleMouseMove = (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1
      mousePosition.current = { x: mouseX, y: mouseY }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(() => {
    // Positive Y, Negative X
    const offsetY = Math.max(0, mousePosition.current.y * 0.05)
    const offsetX = Math.min(0, mousePosition.current.x * 0.05)
    const newPosition = [
      basePosition[0] ,
      basePosition[1] + offsetY,
      basePosition[2]
    ]
    api.start({ position: newPosition })
  })

  return (
    <animated.mesh
      castShadow
      receiveShadow
      geometry={geometry}
      material={material}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  )
}

export default MouseFollowCubePosYNegX