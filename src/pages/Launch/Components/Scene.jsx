import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';

import { Raymarching } from './RayMarchClouds';
import ScreenMesh from './ScreenMesh';



const Scene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 6] }} dpr={[1, 2]}>
      <Suspense fallback={null}>
        <Raymarching />
      </Suspense>
    </Canvas>
  );
};


export default Scene;