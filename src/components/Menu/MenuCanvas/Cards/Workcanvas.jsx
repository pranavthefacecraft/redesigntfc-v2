import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { useWorkStore } from '../../store';
import { Suspense } from 'react';

import Cube from '../Models/Cube';

const canvasVariants = {
  hidden: {
    opacity: 0,
    y: '-100vh',
    x: '-50vw',
    transition: { duration: 0.55, delay: 0.1, ease: [0.76, 0, 0.24, 1] }
  },
  show: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 0.95, 
      delay: 0.3, 
      ease: [.215,.61,.355,1],
      opacity: { duration: 0.35 }
    }
  }
}

const WorkCanvas = () => {
  
   const { isWorkActive } = useWorkStore()

  return (
  <AnimatePresence>

    <motion.div
      className='fixed 2xl:right-[13em] bg-transparent overflow-hidden h-[100vh] w-[45vw] pointer-events-none select-none'
      variants={canvasVariants}
      initial="hidden"
      animate={ isWorkActive ? "show" : "hidden" }
    >
        <Suspense fallback={null}>
        <Canvas eventPrefix="client"
         orthographic
         camera={{ zoom: 70, near: 10, position: [60, 20, 50] }}
         dpr={[2.0,2.5]}
         >

          <Suspense fallback={null}>

          <Cube/>
          
          </Suspense>

        </Canvas>
        </Suspense>

    </motion.div> 

  </AnimatePresence>    
  );
};

export default WorkCanvas;