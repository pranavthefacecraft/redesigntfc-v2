import * as THREE from 'three'
import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF, ContactShadows } from '@react-three/drei'


const textureLoader = new THREE.TextureLoader();

export default function Island() {
  const { nodes, materials } = useGLTF('/Menu/Models/Island.glb')
  const { width } = useThree((state) => state.viewport)
  const ref = useRef()
  const shadowref = useRef()

  
  const material = useMemo(() => {
    const bakedTexture_brands = textureLoader.load('/Menu/Images/Island.jpg');
    bakedTexture_brands.flipY = false;
    bakedTexture_brands.colorSpace = THREE.SRGBColorSpace;
    return new THREE.MeshStandardMaterial({ map: bakedTexture_brands });
  }, []); 

  const shadowMaterial = useMemo(() => {
    const shadowtexture = textureLoader.load('/Menu/Images/Shadow.png');
    shadowtexture.colorSpace = THREE.SRGBColorSpace;
    shadowtexture.wrapS = THREE.ClampToEdgeWrapping;
    shadowtexture.wrapT = THREE.RepeatWrapping;
    return new THREE.MeshStandardMaterial({
      transparent: true,
      roughness: 1,
      emissive: 10,
      opacity: 0.15,
      color: 0xffffff,
      map: shadowtexture 
  });
  }, []); 


  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.position.y = (1.5 + Math.cos((t * 2) / 2)) / 2

    shadowref.current.scale.x = 1.4 + Math.cos((t * 2) / 2) / 2
    shadowref.current.scale.y = 1.5 + Math.cos((t * 2) / 2) / 2
  })

  return (
    <>
      <ambientLight intensity={2.5}/>
      <ambientLight intensity={2.0} color={'#efb8b7'}/>
      <group dispose={null} ref={ref} scale={1.9} rotation={[0.1,0,0]}>
        <mesh
          name="Island_big"
          castShadow
          receiveShadow
          geometry={nodes.Island_big.geometry}
          material={material}
          position={[0.395, 0.663, -0.484]}
          rotation={[0, 0.318, 0]}
        />
        <mesh
          name="Body"
          castShadow
          receiveShadow
          geometry={nodes.Body.geometry}
          material={materials['Body.002']}
          position={[0.6, 0.05, 0.1]}
          rotation={[0, 1.42, 0]}
          scale={1.0}
        />
      
      </group>

      <mesh ref={shadowref} material={shadowMaterial} rotation={[-0.5,0,0]} position={[0.7,-6,1.5]}>
        <planeGeometry args={[5.5, 1.5]} />
      </mesh>  

   
    </>  
  )
}


useGLTF.preload('/Menu/Models/Island.glb')