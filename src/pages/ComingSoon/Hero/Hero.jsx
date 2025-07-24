import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center } from '@react-three/drei';
import * as THREE from 'three';
import LoadingScreen from '../LoadingScreen';

import { RubixCubie } from '../components/Cube';
import { Scene } from '../components/Scene';
import { Camera } from '../components/Camera';
import { AnimatedScene } from '../components/SceneAnimated';
import { Rubix } from '../components/Rubix';
import useMouseStore from '../components/useMouseStore';

// Canvas error handler
const CanvasErrorHandler = ({ children, onError }) => {
  const canvasRef = useRef();

  useEffect(() => {
    const handleContextLost = (event) => {
      event.preventDefault();
      console.warn('WebGL context lost, attempting recovery...');
      onError('Context lost');
    };

    const handleContextRestored = () => {
      console.log('WebGL context restored');
    };

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('webglcontextlost', handleContextLost);
      canvas.addEventListener('webglcontextrestored', handleContextRestored);

      return () => {
        canvas.removeEventListener('webglcontextlost', handleContextLost);
        canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      };
    }
  }, [onError]);

  return <div ref={canvasRef} className="w-full h-full">{children}</div>;
};

// Main Hero component
const Hero = () => {
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const canvasRef = React.useRef();
  const contextRef = React.useRef();

  // Loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 5 seconds
    return () => clearTimeout(timer);
  }, []);

  // WebGL context management
  useEffect(() => {
    let mounted = true;

    const handleError = (errorType) => {
      if (mounted) {
        setError(errorType);
        
        // Attempt recovery after delay
        setTimeout(() => {
          if (mounted) {
            setError(null);
          }
        }, 10000);
      }
    };

    return () => {
      mounted = false;
      
      // Force cleanup WebGL context
      if (contextRef.current) {
        try {
          const extension = contextRef.current.getExtension('WEBGL_lose_context');
          if (extension) {
            extension.loseContext();
          }
        } catch (e) {
          console.warn('Could not force WebGL context cleanup:', e);
        }
      }
    };
  }, []);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <div className="relative w-full h-screen overflow-hidden">
        <CanvasErrorHandler onError={setError}>
          <Canvas
            ref={canvasRef}
            style={{
              width: '100%',
              height: '100%',
            }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
              preserveDrawingBuffer: false,
            }}
            shadows
            onCreated={({ gl }) => {
              contextRef.current = gl;
              gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
              gl.setClearColor('#000000', 0);
              gl.outputEncoding = THREE.sRGBEncoding;
              gl.toneMapping = THREE.ACESFilmicToneMapping;
            }}
            dpr={[2, 3]}
          >
            <Center>
              <Rubix />
              <Camera />
            </Center>
          </Canvas>
        </CanvasErrorHandler>
        {error && (
          <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            {/* Error overlay */}
          </div>
        )}
      </div>
    </>
  );
};

export default Hero;