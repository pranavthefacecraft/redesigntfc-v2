import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { useServicesStore } from '../../store';
import { Suspense } from 'react';

import Phone from '../Models/Phone'

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

const ServicesCanvas = () => {
  
   const { isServicesActive } = useServicesStore()

  return (
  <AnimatePresence>

    <motion.div
      className='fixed top-[7em] right-[15em]  bg-transparent overflow-hidden h-[70vh] w-[40vw] pointer-events-none'
      variants={canvasVariants}
      initial="hidden"
      animate={ isServicesActive ? "show" : "hidden" }
    >
        <Suspense fallback={null}>
        <Canvas eventPrefix="client" camera={{ position: [0, 5, 20], fov: 40 }}
         shadows
         gl={{ antialias: true }}
         dpr={[1, 2]}
         style={{ background: null }}
        >

          <Suspense fallback={null}>

           <Phone/>
          
          </Suspense>

        </Canvas>
        </Suspense>

    </motion.div> 

  </AnimatePresence>    
  );
};

export default ServicesCanvas;