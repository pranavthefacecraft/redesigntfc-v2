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
    <div className="nav flex flex-col justify-between absolute h-[100vh] pt-[180px] pb-[30px] pl-[140px] 2xl:pt-[70px] 2xl:pb-[15px] 2xl:pl-[227px] box-border z-[50]">

      <div className="nav-one flex flex-col text-white 2xl:text-[5.7em] text-[6.0em] decoration-none">
        {links.map((link, i) => {
          return (
            <div key={`b_${i}`} className="title relative 2xl:-mb-[0.23em]">
              <motion.div
                custom={i}
                variants={perspective}
                initial="initial"
                animate="enter"
                exit="exit"
              >
                <Link 
                  to={link.href} 
                  className='hover:text-[#7767ba] duration-300 ease-out'
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
           
      <div className="nav-gap flex flex-row 2xl:gap-[42.5em]">

        <motion.div className="flex flex-row 2xl:-ml-2">
          {footerLinks.map((link, i) => {
            const { title, href } = link;
            return (
              <motion.a 
                className='footertext text-[0.8em] text-[#151515] decoration-none whitespace-nowrap 2xl:ml-4 pointer-events-none'
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
              key={`social-icon-${i}`}  
              className={`text-xl relative text-[#BF1736] ${i === 1 ? 'text-[1.5em] 2xl:top-[-0.4em]' : 'text-[1.5em] 2xl:top-[-0.3em]'}`}
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

    </div> 
  );
};

export default Nav;