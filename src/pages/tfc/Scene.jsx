import { useScroll, Center } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { usePlay } from "./Contexts/Play";

import Camera from "./AnimatedCamera";
import Rubix from "./AnimatedRubix";
import Raymarching from "./Clouds";


export const Scene = () => {
  
  const scroll = useScroll();
  const lastScroll = useRef(0);
  

  const { play, setHasScroll, end, setEnd } = usePlay();

  useFrame((_state, delta) => {

    lastScroll.current = scroll.offset;
    
    if ( scroll.offset > 0 ) {
      setHasScroll(true);
    }

    if (lastScroll.current >= 0.99 && !end) {
     setEnd(true);
    }

  });

  return useMemo(
    () => (
      <>
        <Center>
          <Camera />
          <Rubix />
          <Raymarching />
        </Center>
      </>
    ),
    []
  );
};
