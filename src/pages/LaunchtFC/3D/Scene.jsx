import { Center } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import useStore from "../zustand/store";
import Camera from "./Camera";
import Common from "./Common";



export const Scene = () => {
  
  // const scroll = useScroll();
  const lastScroll = useRef(0);

  const { setHasScroll, setEnd } = useStore();

  useFrame((_state, delta) => {

    const scrollY = window.scrollY / window.innerHeight;


    if (lastScroll.current <= 0 && scrollY > 0) {

      setHasScroll(true);
    }

    if(scrollY >= 5.0 ){
      setEnd(true);
    }
    else{
      setEnd(false);
    }

    lastScroll.current = scrollY;

  });

  return useMemo(
    () => (
      <>
        <Center>
          <Camera />
          <Common />
        </Center>
      </>
    ),
    []
  );
};
