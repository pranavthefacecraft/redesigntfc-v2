import './menu.css'
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Nav from './Nav';
import { useMenuStore, useCubeStore, useButtonStore } from './store';

const variants = {
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

const text = {
  initial: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1
  },
  enter: {
    y: window.innerWidth <= 1536 ? -12.5 : -14.4,
    x: window.innerWidth <= 1536 ? 2.1 : 2.0,
    scale: window.innerWidth <= 1536 ? 1.15 : 1.1,
    opacity: 0.15,
    transition: {
      delay : 0.5,
      duration: 0.68, 
      ease: [.215,.61,.355,1],
      opacity: { duration: 1.35 }
    }
  },
  exit: {
    opacity: 1,
    scale: 1,
    y: 0,
    x: 0,
    transition: {
      delay : 0.5,
      duration: 0.5,
      ease: [.215,.61,.355,1],
      opacity: { duration: 1.35 }
    }
  }
}


const perspective = {
  initial: {
    opacity: 0,
    rotateX: 90,
    translateY: 80,
  },
  enter: {
    opacity: 1,
    rotateX: 0,
    translateY: 0,
    transition: {
      duration: 0.68, 
      ease: [.215,.61,.355,1],
      opacity: { duration: 0.35 }
    }
  },
  exit: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [.215,.61,.355,1]
    }
  }
}

const cubeVariants = {
  initial: {
    rotateX: -25,
    rotateY: -45,
    scaleX: 1,
    scaleY: 1,
    scaleZ: 1
  },
  clicked: {
    rotateX: 0,
    rotateY: -90,
    x: '-47vw',
    y: '40vh',
    scaleX: window.innerWidth < 1536 ? 23 : 28,
    scaleY: window.innerWidth < 1536 ? 23 : 28,
    scaleZ: window.innerWidth < 1536 ? 23 : 28,
    transition: {
      duration: 3,
      ease: [0.83, 0, 0.17, 1]
    }
  },
  unclicked: {
    rotateX: -25,
    rotateY: -45,
    scaleX: 1,
    scaleY: 1,
    scaleZ: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 3.0,
      ease: [0.83, 0, 0.17, 1]
    }
  }
};

const faceVariants = {
  front: { backgroundColor: '#6863a7', rotateX: 0, rotateY: 0, z: 35 },
  back: { backgroundColor: '#6863a7', rotateY: 180, z: -35 },
  right: { backgroundColor: '#B8B5DF', rotateY: 90, x: 35, z: 0 },
  left: { backgroundColor: '#6863a7', rotateY: -90, x: -35, z: 0 },
  top: { backgroundColor: '#f0f0f0', rotateX: 90, y: -35, z: 0 },
  bottom: { backgroundColor: '#6863a7', rotateX: -90, y: 35, z: 0 }
};

const CubeFace = ({ variant, isMenuActive }) => (
  <motion.div
    className="absolute w-full h-full flex items-center justify-center rounded-[0.5em] select-none"
    style={{
      backfaceVisibility: 'visible',
      transformStyle: 'preserve-3d',
      ...faceVariants[variant]
    }}
  >
    {variant === 'right' && (
      <motion.span 
        className="menutext title text-black text-md font-bold select-none"
        variants={text}
        animate={isMenuActive ? "enter" : "exit"}
      >
        MENU
      </motion.span>
    )}
  </motion.div>
);


const Menu = () => {
  const { isMenuActive, setIsMenuActive } = useMenuStore();
  const { isCubeActive, setIsCubeActive } = useCubeStore();
  const { isButtonActive, setIsButtonActive } = useButtonStore();

  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    
    if (isCubeActive && !isMenuActive) {
      const menuTimer = setTimeout(() => {
        setIsMenuActive(true);
      }, 2000);

      const buttonTimer = setTimeout(() => {
        setIsButtonActive(true);
      }, 3000);

     
      return () => {
        clearTimeout(menuTimer);
        clearTimeout(buttonTimer);
      };
    }
  }, [isCubeActive, isMenuActive]); 

  const handleClick = () => {
    
    setIsButtonActive(false);

    setTimeout(() => {
      setIsMenuActive(false);
    }, 1000);

    setTimeout(() => {
      setIsCubeActive(false);
    }, 2000);
   

  };

  return (
    <>
      <motion.div
        className="fixed w-[70px] h-[70px] 2xl:top-[2.0em] 2xl:right-[2.5em] cursor-pointer select-none"
        style={{ transformStyle: 'preserve-3d' }}
        variants={cubeVariants}
        initial="initial"
        animate={isCubeActive ? "clicked" : "unclicked"}
        onClick={() => !isCubeActive && setIsCubeActive(true)}
      >
        <CubeFace variant="front"/>
        <CubeFace variant="back" />
        <CubeFace variant="right" isMenuActive={isMenuActive} />
        <CubeFace variant="left" />
        <CubeFace variant="top" />
        <CubeFace variant="bottom" />
      </motion.div>

      <motion.div 
        className="fixed top-0 right-0 overflow-hidden select-none"
        variants={variants}
        animate={isMenuActive ? "open" : "closed"}
        initial="closed"
      >
        <AnimatePresence>
          {isMenuActive && (
            <>
              <Nav />
              <motion.button
                className="crossbutton fixed top-[0.6em] right-[1.7em] text-[4em] bg-transparent border-none outline-none text-white cursor-pointer select-none"
                variants={perspective}
                initial="initial"
                animate="enter"
                exit="exit"
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClick}
              >
                ×
              </motion.button>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default Menu;