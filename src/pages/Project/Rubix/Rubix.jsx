import React, { useRef, useEffect } from 'react'
import { useGLTF, PerspectiveCamera, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import useTooltipStore from '../../ComingSoon/TooltipStore'

export function Rubix(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/Project/Models/Demo.glb')
  const { actions } = useAnimations(animations, group)
  
  // Add smooth animation state
  const animationState = useRef({
    currentTime: 0,
    targetTime: 0,
    smoothness: 0.08 // Lower = smoother but slower response
  })
  
  useEffect(() => {
    // Get the first animation action (or specify by name if you know it)
    const animationNames = Object.keys(actions)
    if (animationNames.length > 0) {
      const action = actions[animationNames[0]]
      if (action) {
        action.play()
        action.paused = true // Start paused, we'll control it with scroll
      }
    }
  }, [actions])

  useFrame(() => {
    // Get scroll position (0 to 1)
    const scrollY = window.pageYOffset || document.documentElement.scrollTop
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const scrollProgress = Math.min(scrollY / maxScroll, 1)

    // Apply scroll progress to animation with smoothing
    const animationNames = Object.keys(actions)
    if (animationNames.length > 0) {
      const action = actions[animationNames[0]]
      if (action && action.getClip()) {
        const duration = action.getClip().duration
        
        // Calculate target time based on scroll
        animationState.current.targetTime = scrollProgress * duration
        
        // Smooth interpolation towards target
        animationState.current.currentTime += 
          (animationState.current.targetTime - animationState.current.currentTime) * 
          animationState.current.smoothness
        
        // Apply the smoothed time to the animation
        action.time = animationState.current.currentTime
      }
    }
  })

  const setTooltipVisible = useTooltipStore(s => s.setTooltipVisible)
  const setForceHide = useTooltipStore(s => s.setForceHide)

  const handleRubixClick = () => {
    setTooltipVisible(false)
    setForceHide(true)
  }

  const handleRubixMouseLeave = () => {
    setForceHide(false)
  }

  return (
    <group ref={group} {...props} dispose={null} onClick={handleRubixClick} onMouseLeave={handleRubixMouseLeave}>
      <group name="Scene">
        <directionalLight
          name="Light"
          intensity={60}
          decay={2}
          position={[7.433, 6.502, -9.398]}
          rotation={[-2.568, 0.701, 2.2]}>
          <group position={[0, 0, -1]} />
        </directionalLight>
        <PerspectiveCamera
          name="Camera"
          makeDefault={true}
          far={100}
          near={0.1}
          fov={22.895}
          position={[9.5, 9.981, 9.2]}
          rotation={[-0.693, 0.671, 0.477]}
        />
        <mesh
          name="CenteredCube"
          castShadow
          receiveShadow
          geometry={nodes.CenteredCube.geometry}
          material={materials.Material}
          position={[0, 0.514, 0]}
          scale={0.5}
        />
        <mesh
          name="CenteredCube001"
          castShadow
          receiveShadow
          geometry={nodes.CenteredCube001.geometry}
          material={materials.Material}
          position={[-1.01, 0.514, 0]}
          scale={0.5}
        />
        <mesh
          name="CenteredCube002"
          castShadow
          receiveShadow
          geometry={nodes.CenteredCube002.geometry}
          material={materials.Material}
          position={[-2.02, 0.514, 0]}
          scale={0.5}
        />
        <mesh
          name="CenteredCube003"
          castShadow
          receiveShadow
          geometry={nodes.CenteredCube003.geometry}
          material={materials.Material}
          position={[0, 0.514, -1.01]}
          scale={0.5}
        />
        <mesh
          name="CenteredCube004"
          castShadow
          receiveShadow
          geometry={nodes.CenteredCube004.geometry}
          material={materials.Material}
          position={[-1.01, 0.514, -1.01]}
          scale={0.5}
        />
        <mesh
          name="CenteredCube005"
          castShadow
          receiveShadow
          geometry={nodes.CenteredCube005.geometry}
          material={materials.Material}
          position={[-2.02, 0.514, -1.01]}
          scale={0.5}
        />
        <mesh
          name="CenteredCube006"
          castShadow
          receiveShadow
          geometry={nodes.CenteredCube006.geometry}
          material={materials.Material}
          position={[0, 0.514, -2.02]}
          scale={0.5}
        />
        <mesh
          name="CenteredCube007"
          castShadow
          receiveShadow
          geometry={nodes.CenteredCube007.geometry}
          material={materials.Material}
          position={[-1.01, 0.514, -2.02]}
          scale={0.5}
        />
        <mesh
          name="CenteredCube008"
          castShadow
          receiveShadow
          geometry={nodes.CenteredCube008.geometry}
          material={materials.Material}
          position={[-2.02, 0.514, -2.02]}
          scale={0.5}
        />
        <mesh
          name="CenteredCube009"
          castShadow
          receiveShadow
          geometry={nodes.CenteredCube009.geometry}
          material={materials.Material}
          position={[0, 1.524, 0]}
          scale={0.5}
        />
        <mesh
          name="CenteredCube010"
          castShadow
          receiveShadow
          geometry={nodes.CenteredCube010.geometry}
          material={materials.Material}
          position={[-1.01, 1.524, 0]}
          scale={0.5}
        />
        <mesh
          name="CenteredCube011"
          castShadow
          receiveShadow
          geometry={nodes.CenteredCube011.geometry}
          material={materials.Material}
          position={[-2.02, 1.524, 0]}
          scale={0.5}
        />
        <mesh
          name="CenteredCube012"
          castShadow
          receiveShadow
          geometry={nodes.CenteredCube012.geometry}
          material={materials.Material}
          position={[0, 1.524, -1.01]}
          scale={0.5}
        />
        <mesh
          name="CenteredCube013"
          castShadow
          receiveShadow
          geometry={nodes.CenteredCube013.geometry}
          material={materials.Material}
          position={[-1.01, 1.524, -1.01]}
          scale={0.5}
        />
        <mesh
          name="CenteredCube014"
          castShadow
          receiveShadow
          geometry={nodes.CenteredCube014.geometry}
          material={materials.Material}
          position={[-2.02, 1.524, -1.01]}
          scale={0.5}
        />
        <mesh
          name="CenteredCube015"
          castShadow
          receiveShadow
          geometry={nodes.CenteredCube015.geometry}
          material={materials.Material}
          position={[0, 1.524, -2.02]}
          scale={0.5}
        />
        <mesh
          name="CenteredCube016"
          castShadow
          receiveShadow
          geometry={nodes.CenteredCube016.geometry}
          material={materials.Material}
          position={[-1.01, 1.524, -2.02]}
          scale={0.5}
        />
        <mesh
          name="CenteredCube017"
          castShadow
          receiveShadow
          geometry={nodes.CenteredCube017.geometry}
          material={materials.Material}
          position={[-2.02, 1.524, -2.02]}
          scale={0.5}
        />
        <mesh
          name="CenteredCube018"
          castShadow
          receiveShadow
          geometry={nodes.CenteredCube018.geometry}
          material={materials.Material}
          position={[0, 2.534, 0]}
          scale={0.5}
        />
        <mesh
          name="CenteredCube019"
          castShadow
          receiveShadow
          geometry={nodes.CenteredCube019.geometry}
          material={materials.Material}
          position={[-1.01, 2.534, 0]}
          scale={0.5}
        />
        <mesh
          name="CenteredCube020"
          castShadow
          receiveShadow
          geometry={nodes.CenteredCube020.geometry}
          material={materials.Material}
          position={[-2.02, 2.534, 0]}
          scale={0.5}
        />
        <mesh
          name="CenteredCube021"
          castShadow
          receiveShadow
          geometry={nodes.CenteredCube021.geometry}
          material={materials.Material}
          position={[0, 2.534, -1.01]}
          scale={0.5}
        />
        <mesh
          name="CenteredCube022"
          castShadow
          receiveShadow
          geometry={nodes.CenteredCube022.geometry}
          material={materials.Material}
          position={[-1.01, 2.534, -1.01]}
          scale={0.5}
        />
        <mesh
          name="CenteredCube023"
          castShadow
          receiveShadow
          geometry={nodes.CenteredCube023.geometry}
          material={materials.Material}
          position={[-2.02, 2.534, -1.01]}
          scale={0.5}
        />
        <mesh
          name="CenteredCube024"
          castShadow
          receiveShadow
          geometry={nodes.CenteredCube024.geometry}
          material={materials.Material}
          position={[0, 2.534, -2.02]}
          scale={0.5}
        />
        <mesh
          name="CenteredCube025"
          castShadow
          receiveShadow
          geometry={nodes.CenteredCube025.geometry}
          material={materials.Material}
          position={[-1.01, 2.534, -2.02]}
          scale={0.5}
        />
        <mesh
          name="CenteredCube026"
          castShadow
          receiveShadow
          geometry={nodes.CenteredCube026.geometry}
          material={materials.Material}
          position={[-2.02, 2.534, -2.02]}
          scale={0.5}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/Project/Models/Demo.glb')
