import * as THREE from 'three'
import { useRef, useMemo, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import { useRubixStore } from '../../../components/Menu/store' // Assuming you'll create this store

const textureLoader = new THREE.TextureLoader();

export default function Text() {
  const { height } = useThree((state) => state.viewport)
  const { size } = useThree()
  const cameraGroup = useRef()
  const textMesh = useRef()
  const cursor = useRef({ x: 0, y: 0 })
  const initialPosition = useRef([0, -height * 0.01, 0])
  const { isRubixActive } = useRubixStore()

  useEffect(() => {
    if (!textMesh.current) return
    
    if (isRubixActive) {
      gsap.to(textMesh.current.position, {
        y: initialPosition.current[1] - height,
        duration: 1.0,
        delay: 1,
        ease: "back.in"
      })
    }
    
    if(!isRubixActive)
    {
      gsap.to(textMesh.current.position, {
        y: initialPosition.current[1],
        duration: 3,
        delay: 1,
        ease: "back.out"
      })
    }
  }, [isRubixActive, height])

  const [text] = useMemo(() => {
    const text = textureLoader.load('/Home/Images/Text.png');
    
    [text].forEach(texture => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.generateMipmaps = true;
      texture.magFilter = THREE.LinearMipMapLinearFilter
      texture.anisotropy = 256;
    });
    
    return [text];
  }, []); 

  const textmaterial = new THREE.MeshStandardMaterial({ 
    transparent: true,
    depthTest: false,
    roughness: 10,
    emissive: 0,
    map: text
  });

  useEffect(() => {
    const handleMouseMove = (event) => {
      cursor.current.x = event.clientX / size.width - 0.5
      cursor.current.y = event.clientY / size.height - 0.5
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [size.width, size.height])

  useFrame((state, delta) => {
    const parallaxX = cursor.current.x * 0.5;
    const parallaxY = -cursor.current.y * 0.5;
    
    if (cameraGroup.current) {
      cameraGroup.current.position.x += (parallaxX - cameraGroup.current.position.x) * 3 * delta;
      cameraGroup.current.position.y += (parallaxY - cameraGroup.current.position.y) * 3 * delta;
    }
  })

  return (
    <>
      <group ref={cameraGroup}>
        <mesh 
          ref={textMesh}
          material={textmaterial} 
          rotation={[-0.05, Math.PI / 3.5, -0.01]} 
          position={initialPosition.current}
        >
          <planeGeometry args={[14, 10.0]} />
        </mesh> 
      </group>
    </>  
  )
}