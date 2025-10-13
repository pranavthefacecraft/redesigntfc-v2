import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll } from '@react-three/drei';

import { Scene } from './Scene';
import Overlay from '../UI/Overlay';
import useStore from '../zustand/store';

export default function Main() {

  const { play } = useStore();

  return (
    <>
      <Canvas performance={{ min: 0.5 }} dpr={[1,2]} gl={{ antialias: true }} resize={{ debounce: 200 }}>
          <Scene />
      </Canvas>
    </>
  );
};