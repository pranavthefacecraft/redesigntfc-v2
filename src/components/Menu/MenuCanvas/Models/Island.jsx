import * as THREE from 'three'
import { useRef, useMemo, Suspense, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useVideoTexture } from '@react-three/drei'

const textureLoader = new THREE.TextureLoader();

export default function Island() {
  const { nodes, materials } = useGLTF('/Menu/Models/catisland.glb')
  const ref = useRef()
  const shadowref = useRef()

  const texture = useVideoTexture('/Menu/Videos/tvscreen.mp4', {
    autoplay: true,
    loop: true,
    muted: true,
    start: true,
  })
  texture.flipY = false

  // Define materials
  const table = new THREE.MeshStandardMaterial({ color: '#f5bab7' });

  const material = useMemo(() => {
    const bakedTexture_brands = textureLoader.load('/Menu/Images/Island.jpg');
    bakedTexture_brands.flipY = false;
    bakedTexture_brands.colorSpace = THREE.SRGBColorSpace;
    return new THREE.MeshStandardMaterial({ map: bakedTexture_brands, emissive: 10 });
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
    ref.current.position.y =  0.35 + ( 0.5 * Math.cos((t * 2) / 2)) / 2
    shadowref.current.scale.x = 1.3 + Math.cos((t * 2) / 2) / 2
    shadowref.current.scale.y = 1.5 + Math.cos((t * 2) / 2) / 2
  })

  return (
    <>
      <ambientLight intensity={2.4}/>
      <directionalLight intensity={1.2} position={[5,5,5]}/>
      <group dispose={null} ref={ref} scale={1.4} rotation={[0.07,0.05,0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Island_big.geometry}
          material={material}
          position={[0.395, 0.663, -0.484]}
          rotation={[0, 0.562, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Body.geometry}
          material={materials['Body.002']}
          position={[0.242, 0.151, 0.073]}
          rotation={[0, 1.408, 0]}
          scale={0.707}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['����������8_beliy_mat_0'].geometry}
          material={table}
          position={[0.442, 1.215, -1.909]}
          rotation={[-Math.PI / 2, 0, -0.547]}
          scale={[0.063, 0.346, 0.36]}
        />
        <group
          position={[1.822, 1.461, -1.095]}
          rotation={[Math.PI, -1.024, Math.PI]}
          scale={[0.082, 0.039, 0.082]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pCylinder14_Mat4_0_1.geometry}
            material={materials['Mat.4']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pCylinder14_Mat4_0_2.geometry}
            material={materials['Mat.1']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pCylinder14_Mat4_0_3.geometry}
            material={materials['Mat.3']}
          />
        </group>
        <group
          position={[0.641, 0.864, -1.788]}
          rotation={[-Math.PI / 2, 0, -0.547]}
          scale={[0.015, 0.346, 0.209]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['����������22_Mat3_0_1'].geometry}
            material={materials['Mat.3']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['����������22_Mat3_0_2'].geometry}
            material={materials['material.001']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['����������22_Mat3_0_3'].geometry}
            material={materials['Mat.4']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['����������22_Mat3_0_4'].geometry}
            material={materials['Mat.5']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['����������22_Mat3_0_5'].geometry}
            material={materials.pCube31__0}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['����������22_Mat3_0_6'].geometry}
            material={materials['Mat.2']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['����������22_Mat3_0_7'].geometry}
            material={materials['Mat.1']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['����������22_Mat3_0_8'].geometry}
            material={materials.beliy_mat}
          />
        </group>
        <group
          position={[1.315, 1.434, -1.377]}
          rotation={[0, 1.024, -Math.PI / 2]}
          scale={[0.023, 0.167, 0.577]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['����������27_Mat1_0_1'].geometry}
            material={materials['Mat.1']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['����������27_Mat1_0_2'].geometry}
            material={materials['Mat.5']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['����������27_Mat1_0_3'].geometry}
            material={materials.beliy_mat}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['����������27_Mat1_0_4'].geometry}
            material={materials['Mat.8']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['����������27_Mat1_0_5'].geometry}
            material={materials['Mat.9']}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['����������1_Mat6_0'].geometry}
          material={materials['Mat.6']}
          position={[1.294, 2.487, -1.376]}
          rotation={[-Math.PI, -1.024, -Math.PI / 2]}
          scale={[1.742, 0.09, 3.012]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['����������1_Mat7_0'].geometry}
          position={[1.294, 2.487, -1.376]}
          rotation={[-Math.PI, -1.024, -Math.PI / 2]}
          scale={[1.742, 0.09, 3.012]}
        >
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      </group>

      <mesh ref={shadowref} material={shadowMaterial} rotation={[-0.5,0,0]} position={[0.6,-6.2,1.5]}>
        <planeGeometry args={[5.5, 1.3]} />
      </mesh>  
    </>  
  )
}

useGLTF.preload('/Menu/Models/catisland.glb')