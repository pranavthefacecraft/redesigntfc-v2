import * as THREE from 'three'
import { useRef, useEffect} from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useVideoTexture } from '@react-three/drei'

import gsap from 'gsap';
import { ScrollTrigger } from "gsap/all";
import { useClickStore, useAboutStore } from '../../../components/Menu/store';


gsap.registerPlugin(ScrollTrigger)
export default function HomePhone() {
  const { nodes } = useGLTF('/Menu/Models/Phonetwo.glb')
  const ref = useRef()
  const { clickCount } = useClickStore() 
  const { isAboutHovered, setIsAboutHovered } = useAboutStore()

  const texture = useVideoTexture('/Menu/Videos/naima2.mp4')
  texture.flipY = false
  

  // Define materials
  const greyscreen = new THREE.MeshStandardMaterial({ color: '#2C2C2C' });
  const dark = new THREE.MeshStandardMaterial({ color: '#7A73D1' });
  const light = new THREE.MeshStandardMaterial({ color: '#7A73D1' });
  const button = new THREE.MeshStandardMaterial({ color: '#ffffff' });

  useEffect(() => {
    if (clickCount === 2) {
      
      // Animate to current position
      gsap.to(ref.current.position, {
        x: -0.8,
        y: 3.5,
        z: 0,
        duration: 2.0,
        ease: "back.out"
      })

      gsap.to(ref.current.scale, {
        x: 1.8,
        y: 1.6,
        z: 1.9,
        duration: 2.2,
        ease: "power3.out"
      })
    }
  }, [clickCount])

  // useFrame((state) => {
  //   const t = state.clock.getElapsedTime()
  //   ref.current.position.y = (8.0 + 0.3 * Math.cos(t / 2)) / 2
  // })

  // Hover animation handlers
  const handlePointerEnter = () => {
    gsap.to(ref.current.rotation, {
      y: 1.5,
      x: -1.0,
      z: 0.9,
      duration: 1.0,
      ease: "back.out"
    })

    gsap.to(ref.current.position, {
      y: 3.9,
      duration: 1.0,
      ease: "back.out"
    })

    setIsAboutHovered(true)
  }

  const handlePointerLeave = () => {
    gsap.to(ref.current.rotation, {
      y: 1.2,
      x: -1.0,
      z: 0.9,
      duration: 1.0,
      ease: "power2.out"
    })

    gsap.to(ref.current.position, {
      y: 3.5,
      duration: 1.0,
      ease: "back.out"
    })
    setIsAboutHovered(false)
  }


  return (
    <>
    <group
    ref={ref}
    scale={[0]}
    position={[0,0,0]}
    rotation={[-1.0,1.2,0.9]}
    onPointerEnter={handlePointerEnter}
    onPointerLeave={handlePointerLeave}
    >
      {/* <ambientLight intensity={3}/> */}
      <mesh
        name="Plane"
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
      >
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      <mesh
        name="Phone_MetalRim_0_1"
        castShadow
        receiveShadow
        geometry={nodes.Phone_MetalRim_0_1.geometry}
        material={button}
      />
      <mesh
        name="Phone_MetalRim_0_2"
        castShadow
        receiveShadow
        geometry={nodes.Phone_MetalRim_0_2.geometry}
        material={dark}
      />
      <mesh
        name="Phone_MetalRim_0_3"
        castShadow
        receiveShadow
        geometry={nodes.Phone_MetalRim_0_3.geometry}
        material={light}
      />
    </group>

</> 
  )
}

useGLTF.preload('/untitled.glb')
