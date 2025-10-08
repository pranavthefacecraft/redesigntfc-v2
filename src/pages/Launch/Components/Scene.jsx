import { Canvas } from "@react-three/fiber"
import { memo } from "react"
import { ScrollControls, Center } from "@react-three/drei"
import Common from "./Common"
import Camera from "./Camera"


const Scene = memo(function Scene() {
    return (
    <Canvas className="w-screen h-screen fixed top-0 left-0 overflow-hidden" >
     <color attach="background" args={["#ffffff"]} />
     <ScrollControls pages={2.0} damping={0.5} distance={1.5}>
       <Center>
         <Common />
         <Camera />
       </Center>
     </ScrollControls>
    </Canvas>
    )
});

export default Scene;