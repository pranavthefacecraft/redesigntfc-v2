import * as THREE from "three"
import { useRef, useLayoutEffect, useMemo } from "react"
import { useGLTF, useAnimations, PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function Camera() {
  const group = useRef()
  const smoothScrollRef = useRef(0)
  const { animations } = useGLTF('/Launch/models/Cam.glb')
  const { actions } = useAnimations(animations, group)

  // Device-specific interpolation factor
  const interpolationFactor = useMemo(() => {
      return window.innerWidth <= 768 ? 0.015 : 0.095;
  }, []);

  useLayoutEffect(() => {
    const action = actions['Action']; 
    if (action) {
      action.play();
      action.paused = true;
    }
  }, [actions]);

  useFrame(() => {

    const currentScroll = window.scrollY / window.innerHeight;
          
    // Smooth scroll interpolation
    smoothScrollRef.current = THREE.MathUtils.lerp(smoothScrollRef.current, currentScroll, interpolationFactor);
    // Update instance cube animations
    if (actions && actions['Action']) {
      const action = actions['Action'];
      const duration = action.getClip().duration;
      action.time = smoothScrollRef.current * duration;
    }


  });
  
  return (
    <>
    <group ref={group} dispose={null}>
        <group name="Scene">
          <PerspectiveCamera
            name="Camera001"
            makeDefault={true}
            far={1000}
            near={0.1}
            fov={20.895}
            position={[1.844, 26.81, 1.562]}
            rotation={[-1.491, 0.079, 0.779]}
          />
        </group>
    </group>
    </>
  )
};

useGLTF.preload('/Launch/models/Cam.glb')