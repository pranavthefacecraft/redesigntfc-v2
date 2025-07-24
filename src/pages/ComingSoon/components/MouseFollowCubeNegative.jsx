import React, { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useSpring, animated } from '@react-spring/three'

const MouseFollowCubeNegative = ({ geometry, material, basePosition, rotation, scale }) => {
  const mousePosition = useRef({ x: 0, y: 0 })
  
  // Fast animated position using react-spring
  const [{ position }, api] = useSpring(() => ({
    position: basePosition,
    config: { 
      tension: 250,
      friction: 45,
      mass: 0.3
    }
  }))

  useEffect(() => {
    const handleMouseMove = (event) => {
      // Convert mouse to normalized coordinates (-1 to 1)
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1
      
      mousePosition.current = { x: mouseX, y: mouseY }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(() => {
    // Calculate new position with subtle movement
    // Only negative X and negative Z movement as requested
    const offsetX = Math.min(0, mousePosition.current.x * 0.08) // Only negative X
    const offsetZ = Math.min(0, mousePosition.current.y * 0.08) // Only negative Z
    
    const newPosition = [
      basePosition[0] + offsetX,
      basePosition[1], // Y stays constant
      basePosition[2] + offsetZ
    ]

    // Update spring animation
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

export default MouseFollowCubeNegative