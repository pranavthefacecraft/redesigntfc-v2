import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll } from '@react-three/drei';

import { Scene } from './Scene';
import Overlay from '../UI/Overlay';
import useStore from '../zustand/store';

export default function Main() {

  return (
    <>
      <Canvas>
        <ScrollControls pages={2.5} damping={0.5}>
          <Scene />
          <Scroll  html>
            <Overlay />
          </Scroll>
        </ScrollControls>
      </Canvas>
    </>
  );
};