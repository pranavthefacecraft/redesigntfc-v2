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
      return window.innerWidth <= 768 ? 0.015 : 0.085;
  }, []);

  useLayoutEffect(() => {
    const action = actions['Action']; 
    if (action) {
      action.play();
      action.paused = true;
    }
  }, [actions]);

  useFrame(() => {
    // Calculate normalized scroll progress (0 to 1) for the full 600vh
    const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const currentScroll = Math.min(window.scrollY / totalScrollHeight, 1);
          
    // Smooth scroll interpolation
    smoothScrollRef.current = THREE.MathUtils.lerp(smoothScrollRef.current, currentScroll, interpolationFactor);

    // Update camera animation
    if (actions && actions['Action']) {
      const action = actions['Action'];
      const duration = action.getClip().duration;
      // Map the scroll progress to animation time
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