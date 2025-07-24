import React, { useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'
import useComingSoonStore from '../ComingSoonStore'

export default function Cube022Cloud({ geometry, material, startPosition = [-2.831, 2.277, -1.447] }) {
  const cameraAnimationFinished = useComingSoonStore((s) => s.cameraAnimationFinished)
  const setCube022CloudGsapTriggered = useComingSoonStore(s => s.setCube022CloudGsapTriggered);
  const meshRef = useRef()
  const [startAnim, setStartAnim] = useState(false)
  const { camera } = useThree()

  // Fix camera near/far if needed to avoid clipping
  useEffect(() => {
    if (camera) {
      camera.near = 0.01
      camera.far = 10000
      camera.updateProjectionMatrix()
    }
  }, [camera])

  // Trigger animation 2s after cameraAnimationFinished becomes true
  useEffect(() => {
    let timeout
    if (cameraAnimationFinished) {
      timeout = setTimeout(() => setStartAnim(true), 2000)
    } else {
      setStartAnim(false)
    }
    return () => clearTimeout(timeout)
  }, [cameraAnimationFinished])

  // GSAP animation
  useEffect(() => {
    if (!startAnim || !meshRef.current) return

    // Start GSAP animations
    gsap.to(meshRef.current.position, {
      z: '+=10',
      x: '+=2',
      y: '+=10',
      duration: 25,
      ease: 'sine.inOut',
    })

    gsap.to(meshRef.current.position, {
      y: '+=0.5',
      duration: 8.0,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })

    gsap.to(meshRef.current.rotation, {
      y: '+=1',
      x: '+=0.5',
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })

    gsap.to(meshRef.current.scale, {
      x: 0,
      y: 0,
      z: 0,
      duration: 12,
      ease: 'power1.inOut'
    })

    // Set store variable to true after 5 seconds
    const timeout = setTimeout(() => {
      setCube022CloudGsapTriggered(true)
    }, 5000)

    return () => clearTimeout(timeout)
  }, [startAnim, setCube022CloudGsapTriggered])

  // Set initial position/scale/rotation on mount and reset if needed
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.position.set(...startPosition)
      meshRef.current.scale.set(0.7, 0.7, 0.7)
      meshRef.current.rotation.set(0, -0.019, -0.111)
    }
  }, [startAnim, startPosition])

  return (
    <mesh
      ref={meshRef}
      name="Cube022"
      castShadow
      receiveShadow
      geometry={geometry}
      material={material}
    />
  )
}