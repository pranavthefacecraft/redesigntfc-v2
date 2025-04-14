import * as THREE from 'three'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'

const textureLoader = new THREE.TextureLoader();

export default function Contact() {

  const planeref = useRef()
  const facebookref = useRef()
  const instaref = useRef()
  const youtuberef = useRef()
  const shadowref = useRef()

  const [ plane, shadow, facebook, instagram, youtube ] = useMemo(() => {
    const plane = textureLoader.load('/Menu/Images/airplane.png');
    const shadow = textureLoader.load('/Menu/Images/Shadow.png');
    const facebook = textureLoader.load('/Menu/Images/Fb.png');
    const instagram = textureLoader.load('/Menu/Images/Insta.png');
    const youtube = textureLoader.load('/Menu/Images/Youtube.png');
    
    
    [ plane, shadow, facebook, instagram, youtube ].forEach(texture => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.RepeatWrapping;
    });
    
    return [ plane, shadow, facebook, instagram, youtube ];
  }, []); 

  const airplane = new THREE.MeshStandardMaterial({ 
    transparent: true,
    depthTest: false,
    roughness: 1,
    map: plane
  });

  const facebookmat = new THREE.MeshStandardMaterial({ 
    transparent: true,
    depthTest: false,
    roughness: 1,
    opacity: 1,
    map: facebook 
  });

  const instamat = new THREE.MeshStandardMaterial({ 
    transparent: true,
    depthTest: false,
    roughness: 1,
    metalness: 0.1,
    opacity: 0.8,
    map: instagram
  });

  const youtubemat = new THREE.MeshStandardMaterial({ 
    transparent: true,
    depthTest: false,
    roughness: 1,
    metalness: 0.1,
    opacity: 0.8,
    map: youtube
  });

  const shadowmat = new THREE.MeshStandardMaterial({ 
    transparent: true,
    roughness: 1,
    emissive: 10,
    opacity: 0.15,
    color: 0xffffff,
    map: shadow
  });

  

  useFrame((state) => {

    const t = state.clock.getElapsedTime()

    planeref.current.rotation.set( Math.sin(t / 2) / 10, 0,0)
    planeref.current.position.y = (0.0 - 0.15 * Math.cos((t * 2) / 2)) / 1
    planeref.current.position.x = (- 0.2 * Math.cos(t / 2)) / 1

    facebookref.current.position.y = (2.6 + 0.1 * Math.cos((t * 2) / 2)) / 1
    facebookref.current.position.x = (2.3 + 0.2 * Math.cos(t / 2)) / 1

    instaref.current.position.y = (4.0 + 0.2 * Math.cos((t * 2) / 2)) / 1
    instaref.current.position.x = (4.3 + 0.2 * Math.cos(t / 2)) / 1

    youtuberef.current.position.y = (2.0 + 0.3 * Math.cos((t * 2) / 2)) / 1
    youtuberef.current.position.x = (5.3 + 0.2 * Math.cos(t / 2)) / 1

    shadowref.current.scale.x = 2.3 + Math.cos(t / 2) / 8
    shadowref.current.scale.y = 2.3 + Math.cos(t / 2) / 8

  })

  return (
    <>
     
      <ambientLight intensity={2.1} />

      <mesh ref={planeref} material={airplane} rotation={[-0.07,0,-0.1]}>
        <planeGeometry args={[7.8, 6.0]} />
      </mesh>

      <mesh ref={facebookref} material={facebookmat} rotation={[-0.2,0,0]} position={[0,1,-1]}>
        <planeGeometry args={[2.6,2.6]} />
      </mesh> 

      <mesh ref={instaref} material={instamat} rotation={[-0.2,0,0]} position={[0,1,-1]}>
        <planeGeometry args={[1.3,1.3]} />
      </mesh>  

      <mesh ref={youtuberef} material={youtubemat} rotation={[-0.2,0,0]} position={[0,1,-1]}>
        <planeGeometry args={[1.5,1.5]} />
      </mesh>  
 
      <mesh ref={shadowref} material={shadowmat} rotation={[-0.2,0,0]} position={[0,-5,2]}>
        <planeGeometry args={[5.5, 2.5]} />
      </mesh>  

      
    </>  
  )
}