import * as THREE from 'three'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'


export const Lights = () => {

    const lightRef = useRef()



    // useFrame((state, delta) => {

    //     const { clock } = state
    //     const time = clock.getElapsedTime()

    //     if(lightRef) {

    //         lightRef.current.position.x = 5 * Math.sin(time)
    //         lightRef.current.position.z = 5 * Math.cos(time)
    //         lightRef.current.position.y = 5
            
    //     }



    // })


    return (
      <>
        <directionalLight ref={lightRef} intensity={4.5} position={[10,10,10]}/>

        <mesh>
         <sphereGeometry args={[500,500]}/>
         <meshBasicMaterial side={THREE.BackSide} color={'pink'}/>
        </mesh>
      </>
    )
}