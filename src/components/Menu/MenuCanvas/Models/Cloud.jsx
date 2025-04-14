import * as THREE from 'three'
import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'

const textureLoader = new THREE.TextureLoader();

export default function Cloud() {
  const { width } = useThree((state) => state.viewport)
  const cloudref = useRef()
  const shadowref = useRef()
  const cubeoneref = useRef()
  const cubetworef = useRef()
  const cubethreeref = useRef()

  const [bakedTexture, shadowTexture, cubeone, cubetwo ] = useMemo(() => {
    const baked = textureLoader.load('/Menu/Images/cloudtwo.png');
    const shadow = textureLoader.load('/Menu/Images/Shadow.png');
    const cubeone = textureLoader.load('/Menu/Images/cubeone.png');
    const cubetwo = textureLoader.load('/Menu/Images/cubetwo.png');
    
    
    [baked, shadow, cubeone, cubetwo ].forEach(texture => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.RepeatWrapping;
    });
    
    return [baked, shadow, cubeone, cubetwo ];
  }, []); 

  const material = new THREE.MeshStandardMaterial({ 
    transparent: true,
    depthTest: false,
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

  const cubeonematerial = new THREE.MeshStandardMaterial({ 
    transparent: true,
    depthTest: false,
    roughness: 1,
    emissive: 0,
    opacity: 0.7,
    color: 0xffffff,
    map: cubeone
  });

  const cubetwomaterial = new THREE.MeshStandardMaterial({ 
    transparent: true,
    depthTest: false,
    roughness: 1,
    emissive: 0,
    opacity: 0.9,
    color: 0xffffff,
    map: cubetwo
  });

  

  useFrame((state) => {

    const t = state.clock.getElapsedTime()

    cloudref.current.rotation.set(0, 0, Math.sin(t / 2) / 10)
    cloudref.current.position.y = (0.5 + 0.5 * Math.cos(t / 2)) / 1

    shadowref.current.scale.x = 2 + Math.cos(t / 2) / 2
    shadowref.current.scale.y = 2 + Math.cos(t / 2) / 2

    cubeoneref.current.position.y = (1.3 + 0.9 * Math.cos(t / 2)) / 1
    cubeoneref.current.rotation.set(0, 0, 0.3 + Math.sin(t / 1.2) / 4)

    cubetworef.current.position.y = ( 3.1 + 0.9 * Math.cos(t / 2)) / 1
    cubetworef.current.position.x = ( 0.5 + 0.2 * Math.cos(t / 2)) / 1
    cubetworef.current.rotation.set(0, 0, Math.sin(t / 1.2) / 4)

    cubethreeref.current.position.y = ( 0.5 * Math.sin(t / 2)) / 1
    cubethreeref.current.position.x = ( 2.7 + 0.5 * Math.sin(t / 2)) / 1
    cubethreeref.current.rotation.set(0, 0, Math.sin(t / 1.2) / 4)

  })

  return (
    <>
      <ambientLight intensity={1} color={'#b0addc'}/>
      <ambientLight intensity={2} />
      <mesh ref={cloudref} material={material} rotation={[1,0,0]}>
        <planeGeometry args={[9, 6.0]} />
      </mesh>

      <mesh ref={shadowref} material={shadowMaterial} rotation={[-0.2,0,0]} position={[0,-5,2]}>
        <planeGeometry args={[5.5, 2.5]} />
      </mesh>  

      <mesh ref={cubeoneref} material={cubeonematerial} rotation={[0,0,0.3]} position={[-4.5,0,-1.5]}>
        <planeGeometry args={[0.6, 0.55]} />
      </mesh>  

      <mesh ref={cubetworef} material={cubetwomaterial} rotation={[0,0,0.3]} position={[0,0,-1.5]}>
        <planeGeometry args={[1.3, 1.3]} />
      </mesh>  

      <mesh ref={cubethreeref} material={cubetwomaterial} rotation={[0,0,0.3]} position={[2.7,0,1.5]}>
        <planeGeometry args={[1.6, 1.6]} />
      </mesh>  

    </>  
  )
}