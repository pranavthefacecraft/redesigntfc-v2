import { motion } from "framer-motion";

const perspective = {
    initial: {
      opacity: 0,
      translateY: 0,
    },
    enter: {
      opacity: 1,
      translateY: 0,
      transition: {
        duration: 1, 
        ease: [.215,.61,.355,1],
        opacity: { duration: 0.35 }
      }
    }
}

const Logo = () => {
  return (
    <motion.div
    className="fixed 2xl:top-[1.5em] 2xl:left-[1.5em] pointer-events-none select-none"
    variants={perspective}
    initial="initial"
    animate="enter"
    transition={{ delay: 0.2, duration: 1.0 }}
    >
    <img src='/Menu/Images/Whitelogo.png' alt="Logo" className="2xl:h-10 w-auto" />
    </motion.div>
  );
};

export default Logo;