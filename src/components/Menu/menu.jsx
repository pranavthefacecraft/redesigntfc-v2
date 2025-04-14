import './menu.css'
import { useEffect } from 'react';
import { motion, AnimatePresence, delay } from 'framer-motion';
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
    y: 0
  },
  enter: {
    y: -19.65,
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
    y: 0,
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
    x: '-43vw',
    y: '40vh',
    scaleX: 22,
    scaleY: 22,
    scaleZ: 32,
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
  front: { backgroundColor: '#6863a7', rotateX: 0, rotateY: 0, z: 45 },
  back: { backgroundColor: '#6863a7', rotateY: 180, z: -45 },
  right: { backgroundColor: '#b0addc', rotateY: 90, x: 45, z: 0 },
  left: { backgroundColor: '#6863a7', rotateY: -90, x: -45, z: 0 },
  top: { backgroundColor: '#f0f0f0', rotateX: 90, y: -45, z: 0 },
  bottom: { backgroundColor: '#6863a7', rotateX: -90, y: 45, z: 0 }
};

const CubeFace = ({ variant, isMenuActive }) => (
  <motion.div
    className="absolute w-full h-full flex items-center justify-center rounded-[0.6em]"
    style={{
      backfaceVisibility: 'visible',
      transformStyle: 'preserve-3d',
      ...faceVariants[variant]
    }}
  >
    {variant === 'right' && (
      <motion.span 
        className="title text-black text-xl font-bold pointer-events-none"
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
        className="fixed w-[90px] h-[90px] top-[4em] right-[5em] cursor-pointer"
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
        className="fixed top-0 right-0 overflow-hidden"
        variants={variants}
        animate={isMenuActive ? "open" : "closed"}
        initial="closed"
      >
        <AnimatePresence>
          {isMenuActive && (
            <>
              <Nav />
              <motion.button
                className="fixed top-[0.6em] right-[1.7em] text-[4em] bg-transparent border-none outline-none text-white cursor-pointer"
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