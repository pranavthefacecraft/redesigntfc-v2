import '../menu.css'
import { useState } from 'react';


const Cube = () => {

  const [isActive, setIsActive] = useState(false)

  return (
    <>
     <div class='container w-full absolute flex justify-center items-center min-h-screen bg-black'>
       <div class='cube-container w-[300px] h-[300px] perspective-[600px]'>   
         <div class='cube absolute w-[100%] h-[100%] flex justify-center items-center'>
           <div class='face front absolute h-[300px] w-[300px] flex justify-center items-center bg-white/50 border-3 border-white'></div>
           <div class='face back absolute h-[300px] w-[300px] flex justify-center items-center bg-white/50 border-3 border-white'></div>
           <div class='face top absolute h-[300px] w-[300px] flex justify-center items-center bg-white/50 border-3 border-white'></div>
           <div class='face bottom absolute h-[300px] w-[300px] flex justify-center items-center bg-white/50 border-3 border-white'></div>
           <div class='face left absolute h-[300px] w-[300px] flex justify-center items-center bg-white/50 border-3 border-white'></div>
           <div class='face right absolute h-[300px] w-[300px] flex justify-center items-center bg-white/50 border-3 border-white'></div>
         </div>
       </div>
     </div>
    </>
  );
};

export default Cube;