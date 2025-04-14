import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { useAgencyStore } from '../../store';
import { Suspense } from 'react';

import Island from '../Models/Island';

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

const AgencyCanvas = () => {
  
   const { isAgencyActive } = useAgencyStore()

  return (
  <AnimatePresence>

    <motion.div
      className='fixed right-[15em]  bg-transparent overflow-hidden h-[100vh] w-[40vw] pointer-events-none'
      variants={canvasVariants}
      initial="hidden"
      animate={isAgencyActive ? "show" : "hidden"}
    >
        <Suspense fallback={null}>
          
        <Canvas eventPrefix="client" camera={{ position: [0, 3, 20], fov: 40 }}
         shadows
         gl={{ antialias: true }}
         dpr={[2.0,3.0]}
         style={{ background: null }}
        >


          <Suspense fallback={null}>

           <Island/>
          
          </Suspense>

        </Canvas>
        </Suspense>

    </motion.div> 

  </AnimatePresence>    
  );
};

export default AgencyCanvas;