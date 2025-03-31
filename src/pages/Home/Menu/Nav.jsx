import './menu.css'
import { Link } from 'react-router-dom';
import { links, footerLinks } from './data';
import { motion } from 'framer-motion';


const perspective = {
  initial: {
    opacity: 0,
    rotateX: 90,
    translateY: 80,
  },
  enter: (i) => ({
    opacity: 1,
    rotateX: 0,
    translateY: 0,
    transition: {
      duration: 0.65, 
      delay: 0.7 + (i * 0.1), 
      ease: [.215,.61,.355,1],
      opacity: { duration: 0.35 }
    }
  }),
  exit: (i) => ({
    opacity: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.05,
      ease: [.215,.61,.355,1]
    }
  })
}

const slideIn = {
  initial: {
      opacity: 0,
      y: 20
  },
  enter: (i) => ({
      opacity: 1,
      y: 0,
      transition: { 
          duration: 0.5,
          delay: 0.75 + (i * 0.1), 
          ease: [.215,.61,.355,1]
      }
  }),
  exit: {
      opacity: 0,
      transition: { duration: 0.5, type: "tween", ease: "easeInOut"}
  }
}

const Nav = () => {

  return (

     <div className="flex flex-col justify-between h-[100%] pt-[25px] pr-[40px] pb-[0px] pl-[360px] box-border">

          <div className="flex flex-col text-black text-[6.7em] decoration-none">
            {links.map((link, i) => {
              return (
                <div key={`b_${i}`} className="title">
                  <motion.div
                    custom={i}
                    variants={perspective}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                  >
                    <Link to={link.href} className='hover:text-[#BF1735] duration-300 ease-out'>
                      {link.title}
                    </Link>
                  </motion.div> 
                </div>       
              )
            })}
          </div>
           
    <motion.div className="flex flex-row">
            {
                footerLinks.map( (link, i) => {
                    const { title, href } = link;
                    return (
                        <motion.a 
                            className='footertext text-[0.8em] text-black decoration-none whitespace-nowrap ml-4 pointer-events-none'
                            variants={slideIn}
                            custom={i} 
                            initial="initial"
                            animate="enter"
                            exit="exit"
                            key={`f_${i}`}
                        >
                            {title}
                        </motion.a>
                    )
                })
            }
    </motion.div>

    </div> 
  );
};

export default Nav; 