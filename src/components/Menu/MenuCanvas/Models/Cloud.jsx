import * as THREE from 'three'
import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei';

const textureLoader = new THREE.TextureLoader();

export default function Cloud() {
  const { width } = useThree((state) => state.viewport)
  const cloudref = useRef()
  const shadowref = useRef()

  const [bakedTexture, shadowTexture] = useMemo(() => {
    const baked = textureLoader.load('/Menu/Images/menucloud.png');
    const shadow = textureLoader.load('/Menu/Images/Shadow.png');
    
    [baked, shadow].forEach(texture => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.RepeatWrapping;
    });
    
    return [baked, shadow];
  }, []); 

  const material = new THREE.MeshStandardMaterial({ 
    transparent: true,
    roughness: 1,
    emissive: 10,
    map: bakedTexture 
  });

  const shadowMaterial = new THREE.MeshStandardMaterial({ 
    transparent: true,
    roughness: 1,
    emissive: 0,
    opacity: 0.15,
    color: 0xffffff,
    map: shadowTexture 
  });

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    cloudref.current.rotation.set(0, 0, Math.sin(t / 2) / 10)
    cloudref.current.position.y = (0.5 + 3 * Math.cos(t / 2)) / 2

    shadowref.current.scale.x = 2 + Math.cos(t / 2) / 2
    shadowref.current.scale.y = 2 + Math.cos(t / 2) / 2
  })

  return (
    <>
      <ambientLight intensity={1} color={'#b0addc'}/>
      <ambientLight intensity={2} />
      <mesh ref={cloudref} material={material} rotation={[1,0,0]}>
        <planeGeometry args={[10, 6.5]} />
      </mesh>

      <mesh ref={shadowref} material={shadowMaterial} rotation={[-0.2,0,0]} position={[0,-5,2]}>
        <planeGeometry args={[6.5, 2.5]} />
      </mesh>  
    </>  
  )
}