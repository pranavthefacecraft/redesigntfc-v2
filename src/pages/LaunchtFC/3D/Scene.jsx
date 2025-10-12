import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import useStore from "../zustand/store";
import Camera from "./Camera";
import Common from "./Common";



export const Scene = () => {
  
  const scroll = useScroll();
  const lastScroll = useRef(0);

  const { setHasScroll, setEnd } = useStore();

  useFrame((_state, delta) => {
    
    if (lastScroll.current <= 0 && scroll.offset > 0) {
      setHasScroll(true);
    }

    if(scroll.offset >= 0.99 ){
      setEnd(true);
    }
    else{
      setEnd(false);
    }

  });

  return useMemo(
    () => (
      <>
        <Camera />
        <Common />
      </>
    ),
    []
  );
};
