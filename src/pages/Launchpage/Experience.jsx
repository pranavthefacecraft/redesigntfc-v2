import { Center } from "@react-three/drei";
import { useMemo} from "react";

import { Camera } from "./Model/Camera";
import Common from "./Model/Rubix";
import Clouds from "./Model/Clouds";



export const Experience = () => {

  return useMemo(
    () => (
      <>
      <Center>
        {/* <Camera />
        <Common />
        <Clouds /> */}
      </Center>  
      </>
    ),
    []
  );
};