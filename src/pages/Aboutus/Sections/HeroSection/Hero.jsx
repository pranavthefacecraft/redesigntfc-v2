import { memo, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Center, OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";

// Elements import
import Cube from "./Elements/Rubix/Cube";
import { Cameralights } from "./Elements/SceneEntities/CamLights";


const Hero = () => {
  const [canvasError, setCanvasError] = useState(false);

  const handleCanvasError = (error) => {
    console.warn('Canvas error:', error);
    setCanvasError(true);
  };

  if (canvasError) {
    return (
      <div className="canvas w-screen h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-white text-center">
          <h3 className="text-xl mb-2">3D Content Unavailable</h3>
          <p className="text-gray-300">Your device may not support WebGL</p>
        </div>
      </div>
    );
  }

  return (
    <>

    <div className="canvas w-screen h-screen">

        <Canvas 
        powerPreference="high-performance"
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: true
        }}
        shadows={true}
        dpr={[2, 3]}
        frameloop="demand"
        onError={handleCanvasError}
        >
          
          <Center>

            <Cameralights/> 
            <Cube/>

          </Center>

        </Canvas>     

    </div>
      
    </>
  );
};

export default memo(Hero)