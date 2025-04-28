import * as THREE from 'three'
import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useVideoTexture } from '@react-three/drei'
import gsap from 'gsap'
import { useClickStore, useRubixStore, useServiceStore } from '../../../components/Menu/store'

const textureLoader = new THREE.TextureLoader();

export default function Island() {

  const { nodes, materials } = useGLTF('/Menu/Models/catisland.glb')
  const ref = useRef()
  const { clickCount } = useClickStore()
  const { isRubixActive, setIsRubixActive } = useRubixStore()
  const { isServiceHovered, setIsServiceHovered } = useServiceStore()
  const { camera } = useThree()


  useEffect(() => {

    if (isRubixActive) 
    {
    
    const targetPosition = new THREE.Vector3(60, 21, 40)
      
    gsap.to(camera.position, {
        x: targetPosition.x,
        y: targetPosition.y,
        z: targetPosition.z,
        duration: 1.5,
        delay: 0.5,
        ease: "back.inOut"
    })

    gsap.to(camera, {
        zoom: 200,
        duration: 1.5,
        delay: 0.5,
        ease: 'power2.inOut',
        onUpdate: () => camera.updateProjectionMatrix(),
    })
    } 

    if(!isRubixActive)
    {

    gsap.to(camera.position, {
      x: 60,
      y: 20,
      z: 50,
      duration: 2.0,
      delay: 1.5,
      ease: "back.inOut"
    })

    }
      
  }, [isRubixActive, camera])

  const texture = useVideoTexture('/Menu/Videos/tvscreen.mp4', {
    autoplay: true,
    loop: true,
    muted: true,
    start: true,
  })
  texture.flipY = false

  // Define materials
  const table = new THREE.MeshBasicMaterial({ color: '#A6AEBF' });

  const material = useMemo(() => {
    const bakedTexture_brands = textureLoader.load('/Menu/Images/Island.jpg');
    bakedTexture_brands.flipY = false;
    bakedTexture_brands.colorSpace = THREE.SRGBColorSpace;
    return new THREE.MeshStandardMaterial({ map: bakedTexture_brands, emissive: 10 });
  }, []); 

  useEffect(() => {
    if (clickCount === 1) {
      gsap.to(ref.current.position, {
        x: 2.0,
        y: 0,
        z: -8.50,
        duration: 2.0,
        ease: "back.out"
      })

      gsap.to(ref.current.scale, {
        x: 0.9,
        y: 0.9,
        z: 0.9,
        duration: 2.2,
        ease: "power3.out"
      })
    }
  }, [clickCount])

  // Hover animation handlers
  const handlePointerEnter = () => {
    gsap.to(ref.current.scale, {
      x: 1.2,
      y: 1.2,
      z: 1.2,
      duration: 1.0,
      ease: "power2.out"
    })
    setIsServiceHovered(true)
  }

  const handlePointerLeave = () => {
    gsap.to(ref.current.scale, {
      x: 1.0,
      y: 1.0,
      z: 1.0,
      duration: 1.0,
      ease: "power2.out"
    })
    setIsServiceHovered(false)
  }

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.position.y = 1.4 + ( 0.15 * Math.cos((t * 2) / 2)) / 2
  })

  return (
    <>
      <group dispose={null}
       ref={ref}
       scale={0}
       rotation={[0.01,1.0,0.0]}
       position={[0,0,0]}
       onPointerEnter={handlePointerEnter}
       onPointerLeave={handlePointerLeave}
      //  onClick={() => {setIsRubixActive(true)}}
      //  onPointerMissed={() => {setIsRubixActive(false)}}
       
      >
      <directionalLight intensity={1.0} position={[5,5,5]} color={'#b0addc'}/>
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
        <ambientLight intensity={0.1} /> 
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

    </>  
  )
}

useGLTF.preload('/Menu/Models/catisland.glb')