import './HomePage.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, useEffect } from 'react';

import Elements from './Elements/Elements';
import { useProjectsStore, useServiceStore, useAboutStore } from '../../components/Menu/store';


const canvasVariants = {

  hidden: {
    opacity: 0,
    duration: 0.75
  },
  show: {
    opacity: 1,
    duration: 0.95
  }
  
}

const HomePage = () => {

  const projecttooltipRef = useRef()
  const servicetooltipRef = useRef()
  const abouttooltipRef = useRef()
  const { isProjectsHovered } = useProjectsStore()
  const { isServiceHovered } = useServiceStore()
  const { isAboutHovered } = useAboutStore()

  useEffect(() => {
    if (!projecttooltipRef.current || !servicetooltipRef.current || !abouttooltipRef.current) return;

    let mouseX = 0,
        mouseY = 0;
    let tooltipX = 0,
        tooltipY = 0;
    const speed = 0.2;

    const handleMouseMove = e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    };

    const animateCursor = () => {
        tooltipX += (mouseX - tooltipX) * speed * 0.8;
        tooltipY += (mouseY - tooltipY) * speed * 0.8;

        projecttooltipRef.current.style.transform = `translate(${tooltipX - 185}px, ${tooltipY - 34}px)`;
        servicetooltipRef.current.style.transform = `translate(${tooltipX + 30}px, ${tooltipY - 34}px)`;
        abouttooltipRef.current.style.transform = `translate(${tooltipX - 75}px, ${tooltipY - 90}px)`;
    };

    let rafId;
    const tick = () => {
      animateCursor();
      rafId = requestAnimationFrame(tick);
    };
    tick();

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <AnimatePresence>

      <div className="fixed select-none z-[20]"
       ref={projecttooltipRef}
       style={{
        opacity: isProjectsHovered ? 1 : 0 ,
        transition: 'opacity 0.3s ease',
      }}
       > 
          <div className="brands">
              <div className="tooltip-text">
                PROJECTS
              </div>
          </div>
      </div>

      <div className="fixed select-none z-[20]"
      ref={servicetooltipRef}
       style={{
        opacity: isServiceHovered ? 1: 0,
        transition: 'opacity 0.3s ease',
      }}
       > 
          <div className="brands">
              <div className="tooltip-text">
                SERVICES
              </div>
          </div>
      </div>

      <div className="fixed select-none z-[20]"
      ref={abouttooltipRef}
       style={{
        opacity: isAboutHovered ? 1: 0,
        transition: 'opacity 0.3s ease',
      }}
       > 
          <div className="brands">
              <div className="tooltip-text">
                ABOUT US
              </div>
          </div>
      </div>

      <div className="fixed select-none z-[20]"
       style={{
        opacity: 0,
        transition: 'opacity 0.3s ease',
      }}
       > 
          <div className="brands">
              <div className="tooltip-text">
                ABOUT US
              </div>
          </div>
      </div>

      <motion.div
        className='fixed bg-transparent overflow-hidden h-screen w-full z-[10]'
        variants={canvasVariants}
        initial="hidden"
        animate="show"
      >
        <Suspense fallback={null}>
          <Canvas 
           eventPrefix="client"
           orthographic
           camera={{ zoom: 50, near: 0.001, position: [60, 20, 50] }}
           dpr={[2, 3]}
           >

            {/* <ambientLight intensity={1.0} color={'#b0addc'}/> */}
            <ambientLight intensity={2.1}/> 
            <Suspense fallback={null}>
           
              <Elements/>
           
            </Suspense>
          </Canvas> 
        </Suspense>
      </motion.div> 
    </AnimatePresence>    
  );
};

export default HomePage;