import * as THREE from 'three'
import { useRef, useMemo, Suspense } from 'react'
import { useThree, useFrame } from '@react-three/fiber'

import Text from './Text';
import HomePhone from '../3Delements/HomePhone';
import HomeCube from '../3Delements/Homecube';
import Island from '../3Delements/HomeIsland';


import gsap from 'gsap';
import { ScrollTrigger } from "gsap/all";


gsap.registerPlugin(ScrollTrigger);
const textureLoader = new THREE.TextureLoader();


export default function Elements() {
  const { width, height } = useThree((state) => state.viewport)
    
  const cloudtoprightref = useRef()
  const cloudtopleftref = useRef()
  const cloudtoprightcornerref = useRef()

  const [cloudright, cloudleft ] = useMemo(() => {

    const cloudright = textureLoader.load('/Menu/Images/cloudtwo_new.png');
    const cloudleft = textureLoader.load('/Menu/Images/cloudone.png');
    
    
    [cloudright, cloudleft].forEach(texture => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.RepeatWrapping;
    });
    
    return [cloudright, cloudleft];

  }, []);


  const cloudrightmaterial = new THREE.MeshStandardMaterial({ 
    transparent: true,
    depthTest: false,
    roughness: 1,
    emissive: 10,
    map: cloudright
  });

  const cloudtoprightmaterial = new THREE.MeshStandardMaterial({ 
    transparent: true,
    depthTest: false,
    roughness: 1,
    emissive: 10,
    opacity: 0.5,
    map: cloudright
  });

  const cloudleftmaterial = new THREE.MeshStandardMaterial({ 
    transparent: true,
    depthTest: false,
    opacity: 0.8,
    roughness: 1,
    emissive: 10,
    map: cloudleft
  });


  useFrame((state) => {
    
    const t = state.clock.getElapsedTime()

    cloudtoprightref.current.position.y = ( height * 0.1 + 0.3 * Math.cos(t / 2)  ) / 1
    cloudtopleftref.current.position.y =  ( -height * 0.01 - 0.2 * Math.cos(t / 2)) / 1
    // cloudtoprightcornerref.current.position.y =  ( height * 0.6 - 0.2 * Math.cos(t / 2)) / 1

  })



  return (
    <>

    <Text/>
 

    {/* Cloudright */}
    <mesh ref={cloudtoprightref} material={cloudrightmaterial} rotation={[0,Math.PI / 3.5,0.05]} position={[width * 0.9,0,1]}>
      <planeGeometry args={[9.0, 5.3]} />
    </mesh>
    {/* Cloudleft */}
    <mesh ref={cloudtopleftref} material={cloudleftmaterial} rotation={[0,Math.PI / 3.5,0]} position={[-width * 0.63,0,-1]}>
      <planeGeometry args={[3.7, 1.85]} />
    </mesh>
    {/* Cloudtopright */}
    {/* <mesh ref={cloudtoprightcornerref} material={cloudtoprightmaterial} rotation={[0,Math.PI / 3.5,0]} position={[width * 0.35,0,-1]}>
      <planeGeometry args={[3.1, 1.85]} />
    </mesh> */}

    <Suspense fallback={null}>

    <HomePhone/>
    <HomeCube/>
    <Island/>

    </Suspense>

   

    </>  
  )
}