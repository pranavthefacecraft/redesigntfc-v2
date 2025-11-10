import * as THREE from 'three'
import { ScrollControls, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import Common from './Common'
import BluePrintCommon from './BluePrintCommon'
import { Lights } from './Lights'

export const WebGPU = () => {
    return (
      <Canvas
       shadows
       dpr={window.devicePixelRatio}
       gl={{
          antialias: true,
       }}
       >
        <ScrollControls pages={15} damping={0.8} maxSpeed={Infinity}>
          <BluePrintCommon/>
          {/* <Common/> */}
          <Lights/>
        </ScrollControls>
      </Canvas>
    )
}