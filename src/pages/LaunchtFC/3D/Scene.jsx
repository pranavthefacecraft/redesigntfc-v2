import { memo } from "react";

import Camera from "./Camera";
import Common from "./Common";

const Scene = memo(() => {
  return (
   <>
    <Camera />
    <Common />
    <ambientLight/>
   </>   
  );
});

export default Scene;



