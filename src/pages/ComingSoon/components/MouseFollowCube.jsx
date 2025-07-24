import React, { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useSpring, animated } from '@react-spring/three'

const MouseFollowCube = ({ geometry, material, basePosition, rotation, scale }) => {
  const mousePosition = useRef({ x: 0, y: 0 })
  
  // Even faster animated position using react-spring
  const [{ position }, api] = useSpring(() => ({
    position: basePosition,
    config: { 
      tension: 250, // Increased from 180
      friction: 40,  // Decreased from 60
      mass: 0.3      // Decreased from 0.5
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
    // Only positive X and positive Z movement as requested
    const offsetX = Math.max(0, mousePosition.current.x * 0.5) // Only positive X
    const offsetZ = Math.max(0, mousePosition.current.y * 0.5) // Only positive Z
    
    const newPosition = [
      basePosition[0] + offsetX,
      basePosition[1] - 0.01, // Y stays constant
      basePosition[2] + 0
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

export default MouseFollowCube