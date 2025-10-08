import { memo, useRef, useLayoutEffect } from "react"
import { useGLTF, useAnimations, useScroll, PerspectiveCamera } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";


const Camera = memo(function Camera() {
  const group = useRef()
  const { nodes, animations } = useGLTF('/Launch/models/Cam.glb')
  const { actions, names } = useAnimations(animations, group)
  
  const { size, viewport } = useThree()
  const scroll = useScroll()

  useLayoutEffect(() => {
    const action = actions['Action']; 
    if (action) {
      action.play();
      action.paused = true;
    }
  }, [actions]);

  useFrame(() => {

    const scrollOffset = scroll.offset; // Get the current scroll offset (0 to 1)
    if (actions && actions['Action']) {
      const action = actions['Action'];
      const duration = action.getClip().duration;
      action.time = scrollOffset * duration;
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
});

export default Camera;
useGLTF.preload('/Launch/models/Cam.glb')