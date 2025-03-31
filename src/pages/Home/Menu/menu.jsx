import './menu.css'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Nav from './Nav';

import Cube from './Cube/Cube';

const variants = {
  open: {
    width: 1800,
    height: 850,
    transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] }
  },
  closed: {
    width: 100,
    height: 100,
    transition: { 
      duration: 0.85, 
      delay: 0.5,
      ease: [0.76, 0, 0.24, 1] 
    }
  }
}


const Menu = () => {
  const [isActive, setIsActive] = useState(false)

  return (
    <div className='Header fixed bg-white right-[50px] top-[50px]'>
      {/* Menu */}
      <motion.div 
        className="menu h-[850px] w-[1800px] rounded-[5px]"
        variants={variants}
        animate={isActive ? "open" : "closed"}
        initial="closed"
      >
        <AnimatePresence>
          {isActive 
          && 
          <Nav/>
          }
        </AnimatePresence>  
      </motion.div>

      {/* <Cube/> */}
      
      {/* Button */}
      <div 
        onClick={() => {setIsActive(!isActive)}} 
        className="Button absolute top-0 right-0 h-[100px] w-[100px] bg-black rounded-[5px] cursor-pointer"
      ></div>
    </div>
  );
};

export default Menu;