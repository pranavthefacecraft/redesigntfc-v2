import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'
import { useFrame } from '@react-three/fiber'
import { shadercubie, maincubie, useMaterialFade } from './Material/Material'
import MouseFollowCube from './MouseFollowCube'
import MouseFollowCubeNegative from './MouseFollowCubeNegative'
import MouseFollowCubePosZNegY from './MouseFollowCubePosZNegY'
import MouseFollowCubePosYNegX from './MouseFollowCubePosYNegX'
import useSceneAnimationStore from './useSceneAnimationStore'
import useComingSoonStore from '../ComingSoonStore' // <-- make sure this is imported
import Cube022Cloud from './Cube022Cloud'
import useTooltipStore from '../TooltipStore' // <-- import your tooltip store

export function Rubix(props) {
  useMaterialFade(); 
  const { nodes, materials } = useGLTF('/Comingsoon/Models/Rubix.glb')
  const mousePosition = useRef({ x: 0 })
  const setPlayCameraAnimation = useSceneAnimationStore((s) => s.setPlayCameraAnimation)
  const cameraAnimationFinished = useComingSoonStore((s) => s.cameraAnimationFinished)
  const setTooltipVisible = useTooltipStore((s) => s.setTooltipVisible) // <-- get setter

  // Group floating animation (stopped if cameraAnimationFinished)
  const { groupPosition } = useSpring({
    groupPosition: cameraAnimationFinished ? [0, 0, 0] : [-0.4, 0, 0.1],
    to: async (next, cancel) => {
      if (cameraAnimationFinished) {
        cancel();
        return;
      }
      while (true) {
        await next({ groupPosition: [0, -0.2, 0] })
        await next({ groupPosition: [0, 0, 0] })
      }
    },
    config: { 
      duration: 4000,
      tension: 60,
      friction: 80
    },
    immediate: cameraAnimationFinished // snap to position if finished
  })

  // Group mouse follow rotation
  const [{ groupRotation }, rotationApi] = useSpring(() => ({
    groupRotation: [0, 0, 0],
    config: { 
      tension: 30,
      friction: 50,
      mass: 0.4
    }
  }))

  // Floating animation for Cube014
  const { position, rotation: floatRotation } = useSpring({
    from: { 
      position: [-1.06, 5.26, -1.465],
      rotation: [-0.144, -0.063, -0.222]
    },
    to: async (next) => {
      while (true) {
        await next({ 
          position: [-1.06, 5.46, -1.465],
          rotation: [-0.144, -0.053, -0.222]
        })
        await next({ 
          position: [-1.06, 5.26, -1.465],
          rotation: [-0.144, -0.063, -0.222]
        })
      }
    },
    config: { 
      duration: 3000,
      tension: 80,
      friction: 60
    }
  })

  // Mouse-follow Y rotation for Cube014
  const [{ mouseYRotation }, mouseYRotationApi] = useSpring(() => ({
    mouseYRotation: 0,
    config: { tension: 40, friction: 90 }
  }))

  useEffect(() => {
    const handleMouseMove = (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mousePosition.current = { x: mouseX }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(() => {
    // Calculate Y rotation based on mouse X position - increased range for more vigorous effect
    const rotationY = mousePosition.current.x * 0.05

    // Update group rotation
    rotationApi.start({ 
      groupRotation: [0.05, rotationY, -0.05] 
    })

    // More vigorous Y rotation for Cube014 based on mouse X
    mouseYRotationApi.start({
      mouseYRotation: mousePosition.current.x * 0.6 // Increased from 0.2 to 0.6
    })
  })

  // Hide tooltip when camera animation starts
  useEffect(() => {
    if (cameraAnimationFinished) {
      setTooltipVisible(false);
    }
  }, [cameraAnimationFinished, setTooltipVisible]);

  // Track if pointer events should be active
  const pointerEventsActive = !cameraAnimationFinished;

  return (
    <animated.group
      onClick={pointerEventsActive ? () => setPlayCameraAnimation(true) : undefined}
      dispose={null}
      position={groupPosition}
      rotation={groupRotation}
      // Remove pointer events and tooltip when cameraAnimationFinished is true
      onPointerOver={pointerEventsActive ? (e) => { e.stopPropagation(); setTooltipVisible(true); } : undefined}
      onPointerOut={pointerEventsActive ? (e) => { e.stopPropagation(); setTooltipVisible(false); } : undefined}
    >
      <mesh
        name="Cube"
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={shadercubie}
        position={[-0.194, 0.552, 0.024]}
        rotation={[0, -0.019, -0.111]}
        scale={0.7}
      />
      <mesh
        name="Cube001"
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={shadercubie}
        position={[-0.037, 1.963, 0.027]}
        rotation={[0, -0.019, -0.111]}
        scale={0.7}
      />
      <mesh
        name="Cube002"
        castShadow
        receiveShadow
        geometry={nodes.Cube002.geometry}
        material={shadercubie}
        position={[0.12, 3.374, 0.03]}
        rotation={[0, -0.019, -0.111]}
        scale={0.7}
      />
      
      <mesh
        name="Cube004"
        castShadow
        receiveShadow
        geometry={nodes.Cube004.geometry}
        material={shadercubie}
        position={[-0.009, 1.963, -1.393]}
        rotation={[0, -0.019, -0.111]}
        scale={0.7}
      />
      <mesh
        name="Cube005"
        castShadow
        receiveShadow
        geometry={nodes.Cube005.geometry}
        material={shadercubie}
        position={[0.148, 3.374, -1.389]}
        rotation={[0, -0.019, -0.111]}
        scale={0.7}
      />
      <mesh
        name="Cube006"
        castShadow
        receiveShadow
        geometry={nodes.Cube006.geometry}
        material={shadercubie}
        position={[-0.138, 0.552, -2.815]}
        rotation={[0, -0.019, -0.111]}
        scale={0.7}
      />

      {/* Mouse follow cube - positive X and Z */}
      <MouseFollowCube 
        geometry={nodes.Cube007.geometry}
        material={shadercubie}
        basePosition={[0.358, 1.926, -3.079]}
        rotation={[0, -0.019, -0.111]}
        scale={0.7}
      />
      
      <mesh
        name="Cube008"
        castShadow
        receiveShadow
        geometry={nodes.Cube008.geometry}
        material={shadercubie}
        position={[0.176, 3.374, -2.809]}
        rotation={[0, -0.019, -0.111]}
        scale={0.7}
      />
      <mesh
        name="Cube009"
        castShadow
        receiveShadow
        geometry={nodes.Cube009.geometry}
        material={shadercubie}
        position={[-1.605, 0.709, -0.003]}
        rotation={[0, -0.019, -0.111]}
        scale={0.7}
      />
      <mesh
        name="Cube010"
        castShadow
        receiveShadow
        geometry={nodes.Cube010.geometry}
        material={shadercubie}
        position={[-1.448, 2.12, 0]}
        rotation={[0, -0.019, -0.111]}
        scale={0.7}
      />
     
      <mesh
        name="Cube012"
        castShadow
        receiveShadow
        geometry={nodes.Cube012.geometry}
        material={shadercubie}
        position={[-1.577, 0.709, -1.423]}
        rotation={[0, -0.019, -0.111]}
        scale={0.7}
      />
      <mesh
        name="Cube013"
        castShadow
        receiveShadow
        geometry={nodes.Cube013.geometry}
        material={shadercubie}
        position={[-1.42, 2.12, -1.42]}
        rotation={[0, -0.019, -0.111]}
        scale={0.7}
      />
      
      
      {/* Floating + mouse-follow rotation cube */}
      <animated.mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube014.geometry}
        material={shadercubie}
        position={position}
        // Combine floating rotation with mouse-follow Y rotation
        rotation={floatRotation.to((x, y, z) => [
          x,
          y + mouseYRotation.get(),
          z
        ])}
        scale={0.7}
      />

      <mesh
        name="Cube015"
        castShadow
        receiveShadow
        geometry={nodes.Cube015.geometry}
        material={shadercubie}
        position={[-1.549, 0.709, -2.843]}
        rotation={[0, -0.019, -0.111]}
        scale={0.7}
      />
      <mesh
        name="Cube016"
        castShadow
        receiveShadow
        geometry={nodes.Cube016.geometry}
        material={shadercubie}
        position={[-1.392, 2.12, -2.84]}
        rotation={[0, -0.019, -0.111]}
        scale={0.7}
      />
      <mesh
        name="Cube017"
        castShadow
        receiveShadow
        geometry={nodes.Cube017.geometry}
        material={shadercubie}
        position={[-1.235, 3.531, -2.837]}
        rotation={[0, -0.019, -0.111]}
        scale={0.7}
      />
      <mesh
        name="Cube018"
        castShadow
        receiveShadow
        geometry={nodes.Cube018.geometry}
        material={shadercubie}
        position={[-3.016, 0.866, -0.031]}
        rotation={[0, -0.019, -0.111]}
        scale={0.7}
      />

      <MouseFollowCubeNegative 
        geometry={nodes.Cube019.geometry}
        material={shadercubie}
        basePosition={[-3.21, 2.315, 0.289]}
        rotation={[0, -0.019, -0.111]}
        scale={0.7}
      />
      
      <mesh
        name="Cube020"
        castShadow
        receiveShadow
        geometry={nodes.Cube020.geometry}
        material={shadercubie}
        position={[-2.702, 3.688, -0.025]}
        rotation={[0, -0.019, -0.111]}
        scale={0.7}
      />
      <mesh
        name="Cube021"
        castShadow
        receiveShadow
        geometry={nodes.Cube021.geometry}
        material={shadercubie}
        position={[-2.988, 0.866, -1.451]} 
        rotation={[0, -0.019, -0.111]}
        scale={0.7}
      />
      
      <mesh
        name="Cube023"
        castShadow
        receiveShadow
        geometry={nodes.Cube023.geometry}
        material={shadercubie}
        position={[-2.674, 3.688, -1.444]}
        rotation={[0, -0.019, -0.111]}
        scale={0.7}
      />
      <mesh
        name="Cube024"
        castShadow
        receiveShadow
        geometry={nodes.Cube024.geometry}
        material={shadercubie}
        position={[-2.96, 0.866, -2.87]}
        rotation={[0, -0.019, -0.111]}
        scale={0.7}
      />
      <mesh
        name="Cube025"
        castShadow
        receiveShadow
        geometry={nodes.Cube025.geometry}
        material={shadercubie}
        position={[-2.803, 2.277, -2.867]}
        rotation={[0, -0.019, -0.111]}
        scale={0.7}
      />
      <mesh
        name="Cube026"
        castShadow
        receiveShadow
        geometry={nodes.Cube026.geometry}
        material={shadercubie}
        position={[-2.646, 3.688, -2.864]}
        rotation={[0, -0.019, -0.111]}
        scale={0.7}
      />

      <MouseFollowCubePosZNegY
        geometry={nodes.Cube003.geometry}
        material={shadercubie}
        basePosition={[-0.053, 0.247, -1.393]}
        rotation={[0, -0.019, -0.111]}
        scale={0.7}
      />

      <MouseFollowCubePosYNegX
        geometry={nodes.Cube011.geometry}
        material={shadercubie}
        basePosition={[-1.271, 3.742, 0.003]}
        rotation={[0, -0.019, -0.111]}
        scale={0.7}
      />

      <Cube022Cloud
        geometry={nodes.Cube022.geometry}
        material={maincubie}
      />
    </animated.group>
  )
}

useGLTF.preload('/Comingsoon/Models/Rubix.glb')
