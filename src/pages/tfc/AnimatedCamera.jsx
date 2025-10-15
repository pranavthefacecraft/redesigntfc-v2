import { useRef, useLayoutEffect, useEffect } from "react"
import { useGLTF, useAnimations, PerspectiveCamera, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import { usePlay } from "./Contexts/Play";

export default function Camera() {
  const group = useRef()
  const lastScrollOffset = useRef(0)
  const { animations } = useGLTF('/Launch/models/Cam.glb')
  const { actions } = useAnimations(animations, group)
  const scroll = useScroll()
  const { end } = usePlay();

  useLayoutEffect(() => {
    const action = actions['Action']; 
    if (action) {
      action.play();
      action.paused = true;
    }
  }, [actions]);


  useFrame(() => {

    const scrollOffset = scroll.offset;
    if (actions && actions['Action']) {
        const action = actions['Action'];
        const duration = action.getClip().duration;
        if (end && lastScrollOffset.current !== scrollOffset) {
          action.time = duration;
          lastScrollOffset.current = scrollOffset;
        } else if (!end) {
          action.time = scrollOffset * duration;
          lastScrollOffset.current = scrollOffset;
        }
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