import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'

export default function Island() {
  return (
    <>
      <Model rotation={[0.3, Math.PI / 1.6, 0]} />
    </> 
  )
}

function Model(props) {
  const ref = useRef()
  const { width } = useThree((state) => state.viewport)

  

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.rotation.set(Math.cos(t / 4) / 8, Math.sin(t / 3) / 4, 0.15 + Math.sin(t / 2) / 8)
    ref.current.position.y = (0.5 + Math.cos(t / 2)) / 7
  })

  return (
    <group ref={ref}>
      <ambientLight intensity={0.7} />
      <spotLight intensity={1.5} angle={0.1} penumbra={1} position={[10, 15, -5]} castShadow />
      <mesh receiveShadow castShadow scale={0.5}>
        <torusGeometry />
        <meshToonMaterial color={'tomato'} />
      </mesh>
    </group>
  )
}