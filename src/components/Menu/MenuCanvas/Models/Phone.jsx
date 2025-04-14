import * as THREE from 'three'
import { useRef, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, ContactShadows, useVideoTexture } from '@react-three/drei'

export default function Phone(props) {
  const { nodes, materials } = useGLTF('/Menu/Models/Phonetwo.glb')
  const ref = useRef()

  const texture = useVideoTexture('/Menu/Videos/naima2.mp4')
  texture.flipY = false
  

  // Define materials
  const greyscreen = new THREE.MeshStandardMaterial({ color: '#2C2C2C' });
  const dark = new THREE.MeshStandardMaterial({ color: '#6D598E' });
  const light = new THREE.MeshStandardMaterial({ color: '#bcb4ff' });
  const button = new THREE.MeshStandardMaterial({ color: '#BDDDE4' });

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.rotation.set(0, 0.1 + Math.sin((t * 2) / 3) / 4,0)
    ref.current.position.y = (0.5 + 2 * Math.cos(t / 2)) / 2
  })


  return (
    <>
    <group {...props} ref={ref} dispose={null} scale={[3,3.3,2.5]} >
      <ambientLight intensity={3}/>
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

<ContactShadows opacity={0.1} scale={15} blur={0.9} far={20} resolution={256} color="#000000" position={[0,-6.5,0]}/>
</> 
  )
}

useGLTF.preload('/untitled.glb')
