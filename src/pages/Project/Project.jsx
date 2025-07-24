import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { Canvas } from '@react-three/fiber';
import { Rubix } from './Rubix/Rubix';

const Project = () => {
  // Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis();
    
    lenis.on('scroll', (e) => {
      // You can add scroll event handlers here if needed
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="project-page">
      {/* Fixed Canvas */}
      <Canvas
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw', 
          height: '100vh',
          zIndex: 1
        }}
      >
        <Rubix />
      </Canvas>
      
      {/* Scrollable Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Spacer sections to create scroll space */}
        <div style={{ height: '100vh', backgroundColor: 'transparent' }}></div>
        <div style={{ height: '100vh', backgroundColor: 'transparent' }}></div>
        <div style={{ height: '100vh', backgroundColor: 'transparent' }}></div>
        <div style={{ height: '100vh', backgroundColor: 'transparent' }}></div>
        <div style={{ height: '100vh', backgroundColor: 'transparent' }}></div>
      </div>
    </div>
  );
};

export default Project;