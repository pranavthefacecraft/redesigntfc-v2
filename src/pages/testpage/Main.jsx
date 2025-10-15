import './Main.css'
import { ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";
import { usePlay } from "./Contexts/Play";
import Overlay from './Overlay';


function Main() {
  const { play, end } = usePlay();

  return (
    <>
      <Canvas 
        gl={{ antialias: true }} 
        dpr={[1, 2]} 
        className="canvas max-w-[1920px] h-full mx-auto"
      >
          <ScrollControls
            pages={ play && !end ? 8 : 0 }
            damping={0.5}
            style={{
              top: "10px",
              left: "0px",
              bottom: "10px",
              right: "10px",
              width: "auto",
              height: "auto",
              animation: "fadeIn 2.4s ease-in-out 1.2s forwards",
              opacity: 0,
            }}
          >
            <Scene />
          </ScrollControls> 
        </Canvas>
      <Overlay />
    </>
  );
}

export default Main;
