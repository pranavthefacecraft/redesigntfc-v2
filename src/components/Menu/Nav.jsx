import './menu.css'
import { Link } from 'react-router-dom';
import { links, footerLinks, socialIcons } from './data';
import { motion } from 'framer-motion';
import { 
  useHomeStore, 
  useAgencyStore, 
  useContactStore, 
  useServicesStore, 
  useWorkStore 
} from './store';


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
      duration: 0.68, 
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
      opacity: 0.65,
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
  
  const { setIsHomeActive } = useHomeStore();
  const { setIsAgencyActive } = useAgencyStore();
  const { setIsServicesActive } = useServicesStore();
  const { setIsWorkActive } = useWorkStore();
  const { setIsContactusActive } = useContactStore();

  
  const storeSetters = [
    setIsHomeActive,
    setIsAgencyActive,
    setIsServicesActive,
    setIsWorkActive,
    setIsContactusActive
  ];

  const handleMouseEnter = (i) => {
  
    storeSetters.forEach(setter => setter(false));
    
   
    if (i >= 0 && i < storeSetters.length) {
      storeSetters[i](true);
    }
  };

  const handleMouseLeave = () => {
 
    storeSetters.forEach(setter => setter(false));
   
  };

  return (
    <div className="flex flex-col justify-between h-[100vh] pt-[90px] pr-[40px] pb-[50px] pl-[420px] box-border z-[50]">

      <div className="flex flex-col text-white text-[6.0em] decoration-none">
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
                <Link 
                  to={link.href} 
                  className='hover:text-[#efb8b7] duration-300 ease-out'
                  onMouseEnter={() => handleMouseEnter(i)}
                  onMouseLeave={handleMouseLeave}
                >
                  {link.title}
                </Link>
              </motion.div> 
            </div>       
          )
        })}
      </div>
           
      <div className="flex flex-row gap-[55em]">

        <motion.div className="flex flex-row">
          {footerLinks.map((link, i) => {
            const { title, href } = link;
            return (
              <motion.a 
                className='footertext text-[0.8em] text-[#151515] decoration-none whitespace-nowrap ml-4 pointer-events-none'
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
          })}
        </motion.div>

        <motion.div className="flex flex-row gap-4">
          {socialIcons.map((social, i) => (
            <motion.a
              className="text-xl text-[#BF1736] text-[1.5em]"
              href={social.href}
              target="_blank"
              variants={slideIn}
              custom={i}
              initial="initial"
              animate="enter"
              exit="exit"
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>
        
      </div>

      {/* Clouds Pop up */}

    </div> 
  );
};

export default Nav;