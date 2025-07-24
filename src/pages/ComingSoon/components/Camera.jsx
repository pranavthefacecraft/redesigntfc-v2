import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useGLTF, PerspectiveCamera, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import useSceneAnimationStore from './useSceneAnimationStore'
import useComingSoonStore from '../ComingSoonStore'
import gsap from 'gsap'

export function Camera(props) {
  const group = useRef()
  const cameraRef = useRef()
  const { animations } = useGLTF('/Comingsoon/Models/Camera.glb')
  const { actions, mixer } = useAnimations(animations, group)
  const playCameraAnimation = useSceneAnimationStore((s) => s.playCameraAnimation)
  const setPlayCameraAnimation = useSceneAnimationStore((s) => s.setPlayCameraAnimation)
  const triggerImageTransition = useComingSoonStore((s) => s.triggerImageTransition)
  const triggerMaterialFade = useComingSoonStore((s) => s.triggerMaterialFade)
  const setCameraAnimationFinished = useComingSoonStore((s) => s.setCameraAnimationFinished)

  // Zustand lookAt and fov state
  const cameraLookAt = useComingSoonStore((s) => s.cameraLookAt)
  const setCameraLookAt = useComingSoonStore((s) => s.setCameraLookAt)
  const cameraFov = useComingSoonStore((s) => s.cameraFov)
  const setCameraFov = useComingSoonStore((s) => s.setCameraFov)
  const lookAtRef = useRef([...cameraLookAt])
  const fovRef = useRef({ value: cameraFov }) // <-- wrap in object

  // Animate lookAt and FOV with GSAP and persist to store
  useEffect(() => {
    if (playCameraAnimation) {
      gsap.to(lookAtRef.current, {
        duration: 2,
        0: 0,
        1: 0,
        2: 0,
        ease: 'sine.inOut',
        onUpdate: () => {
          setCameraLookAt([...lookAtRef.current])
        }
      })
      gsap.to(fovRef.current, {
        duration: 2,
        delay: 1, // Optional delay
        value: 14, // animate FOV from current to 15
        ease: 'power4.inOut',
        onUpdate: () => {
          setCameraFov(fovRef.current.value)
        }
      })
    }
  }, [playCameraAnimation, setCameraLookAt, setCameraFov])

  // Update camera lookAt and FOV every frame
  useFrame(() => {
    if (cameraRef.current) {
      cameraRef.current.lookAt(
        cameraLookAt[0],
        cameraLookAt[1],
        cameraLookAt[2]
      )
      cameraRef.current.fov = cameraFov
      cameraRef.current.updateProjectionMatrix()
    }
  })

  useEffect(() => {
    if (playCameraAnimation && actions && Object.keys(actions).length > 0) {
      Object.values(actions).forEach((action) => {
        action.reset()
        action.timeScale = 0.5
        action.fadeIn(0.2).play()
      })
      const firstAction = Object.values(actions)[0]
      if (firstAction) {
        firstAction.setLoop(THREE.LoopOnce, 0)
        firstAction.clampWhenFinished = true
        firstAction.enabled = true
        firstAction.fadeIn(0.2).play()

        const onFinished = () => {
          setPlayCameraAnimation(false)
          setCameraAnimationFinished(true)
          triggerImageTransition()
          triggerMaterialFade()
          mixer.removeEventListener('finished', onFinished)
        }
        mixer.addEventListener('finished', onFinished)
      }
    }
  }, [playCameraAnimation])

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
    >
      <group name="Scene">
        <PerspectiveCamera
          ref={cameraRef}
          name="Camera"
          makeDefault={true}
          far={10000}
          near={0.01}
          fov={cameraFov}
          position={[12.371, 11.189, 11.316]}
          rotation={[-0.616, 0.727, 0.441]}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/Comingsoon/Models/Camera.glb')
