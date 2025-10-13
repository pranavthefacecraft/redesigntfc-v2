import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll } from '@react-three/drei';

import { Scene } from './Scene';
import Overlay from '../UI/Overlay';
import useStore from '../zustand/store';

export default function Main() {

  const { play } = useStore();

  return (
    <>
      <Canvas>
          <Scene />
      </Canvas>
    </>
  );
};