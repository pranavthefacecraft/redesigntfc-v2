import * as THREE from 'three'
import { useRef, Suspense } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF, ContactShadows, RenderTexture, Html } from '@react-three/drei'

import PhoneScreen from './PhoneScreen'



export default function Phone() {
  const { nodes, materials } = useGLTF('/Menu/Models/Phone.glb')
  const { width } = useThree((state) => state.viewport)
  const ref = useRef()

  // Define materials
  const greyscreen = new THREE.MeshStandardMaterial({ color: '#2C2C2C' });
  const dark = new THREE.MeshStandardMaterial({ color: '#6D598E' });
  const light = new THREE.MeshStandardMaterial({ color: '#bcb4ff' });
  const button = new THREE.MeshStandardMaterial({ color: '#BDDDE4' });
    

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.rotation.set(0, Math.sin((t * 2) / 3) / 4,0)
    ref.current.position.y = (0.5 + 2 * Math.cos(t / 2)) / 2
  })

  return (
    <>
    <ambientLight intensity={3}/>
    <ambientLight intensity={2} color={'#efb8b7'}/>
    <group ref={ref} dispose={null} scale={4}>
      <group
        name="Phone_MetalRim_0"
        position={[5.582, -2.098, 29.532]}
        rotation={[-1.216, 0.337, -0.122]}>
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
      <mesh
        name="Phone_PhoneGlass_0"
        castShadow
        receiveShadow
        geometry={nodes.Phone_PhoneGlass_0.geometry}
        position={[5.582, -2.098, 29.532]}
        rotation={[-1.216, 0.337, -0.122]}
        material={greyscreen}
      >
       
        </mesh>

    </group>

    <ContactShadows opacity={0.1} scale={15} blur={0.9} far={20} resolution={256} color="#000000" position={[0,-6.5,0]}/>
  </>  
  )
}

useGLTF.preload('/Menu/Models/Phone.glb')
