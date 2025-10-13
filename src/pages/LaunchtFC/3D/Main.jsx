import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Scene } from './Scene';
import useStore from '../zustand/store';

export default function Main() {

  const { play } = useStore();

  return (
    <>
      <Canvas dpr={[1,2]} gl={{ antialias: true }} >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
      </Canvas>
    </>
  );
};