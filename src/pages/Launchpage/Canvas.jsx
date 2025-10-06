import { Canvas } from "@react-three/fiber";
import { Experience } from "./Experience";
import { memo } from "react";


export const Scene = memo(() => {

  
  return (
      <Canvas frameloop="demand" performance={{ min: 0.5 }} dpr={[1,2]} gl={{ antialias: true }} resize={{ debounce: 200 }}>
        <Experience />
      </Canvas>
  );
});