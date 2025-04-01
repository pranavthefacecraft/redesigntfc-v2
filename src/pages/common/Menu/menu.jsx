import './menu.css';
import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Nav from './Nav';
import { useMenuStore } from './store';

const variants = 
{
  open: {
    width: '100vw',
    height: '100vh',
    transition: { 
    duration: 0.87,
      ease: [0.76, 0, 0.24, 1] 
    }
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
};

const Menu = () => {
  const { isMenuActive, setIsMenuActive } = useMenuStore();
  const motionRef = useRef();

  return (
    <>
    {/* CubeButton */}
      <div 
        className={`spinner fixed z-50 cursor-pointer ${isMenuActive ? 'clicked' : ''}`}
        onClick={() => setIsMenuActive(!isMenuActive)}
      >
        <div><div className="title px-[1.0em] py-8 text-[1.2em] rounded-[5px]">MENU</div></div>
        <div></div>
        <div><div className="title px-[0.9em] py-8 text-[1.2em] rounded-[5px]">CLOSE</div></div>
        <div><div className="title px-[1.1em] py-11 text-[1.2em] rounded-[5px]"></div></div>
        <div></div>
        <div></div>
      </div>

     
      <motion.div 
        ref={motionRef}
        className="fixed top-0 right-0 overflow-hidden"
        variants={variants}
        animate={isMenuActive ? "open" : "closed"}
        initial="closed"
      >
        <AnimatePresence>
          {isMenuActive && <Nav />}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default Menu;