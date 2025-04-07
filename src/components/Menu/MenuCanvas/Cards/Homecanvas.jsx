import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { useMenuStore, useAgencyStore, useServicesStore, useWorkStore, useContactStore } from '../../store';
import { Suspense } from 'react';

import Cloud from '../Models/Cloud';


const canvasVariants = {
  hidden: {
    opacity: 0,
    y: '100vh',
    x: '50vw',
    transition: { duration: 0.75, delay: 0.1, ease: [0.76, 0, 0.24, 1] }
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

const HomeCanvas = () => {
  const { isMenuActive } = useMenuStore();
  const { isAgencyActive } = useAgencyStore();
  const { isServicesActive } = useServicesStore();
  const { isWorkActive } = useWorkStore();
  const { isContactusActive } = useContactStore();

  
  const shouldShow = isMenuActive && 
                    !isAgencyActive && 
                    !isServicesActive && 
                    !isWorkActive && 
                    !isContactusActive;

  return (
    <AnimatePresence>
      <motion.div
        className='fixed top-[7em] right-[15em]  bg-transparent overflow-hidden h-[70vh] w-[40vw] pointer-events-none'
        variants={canvasVariants}
        initial="hidden"
        animate={shouldShow ? "show" : "hidden"}
      >
        <Suspense fallback={null}>
          <Canvas eventPrefix="client" camera={{ position: [0, 5, 20], fov: 40 }}>
            <Suspense fallback={null}>
              <Cloud/>
            </Suspense>
          </Canvas>
        </Suspense>
      </motion.div> 
    </AnimatePresence>    
  );
};

export default HomeCanvas;