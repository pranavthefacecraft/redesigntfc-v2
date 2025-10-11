import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';

import Scene from './Scene';

export default function Main() {
    return (
        <Canvas className='w-full h-full' gl={{ antialias: true, dpr: [1, 2] }} >

            <ScrollControls pages={2.5} damping={0.5}>  
              <Scene />
            </ScrollControls>

        </Canvas>
    );
}
