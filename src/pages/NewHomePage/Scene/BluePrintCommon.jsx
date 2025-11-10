import { useScroll, useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useLayoutEffect } from "react";
import * as THREE from "three";

import { BluePrintCamera } from "./BlueprintCamera";
import { BluePrintScene } from "./BlueprintScene";
import { Scenetwo } from "./Scenetwo";


export default function BluePrintCommon() {

  return (
    <>
      <BluePrintCamera/>
      {/* <BluePrintScene/> */}
      <Scenetwo/>
    </> 
 
  )
}

