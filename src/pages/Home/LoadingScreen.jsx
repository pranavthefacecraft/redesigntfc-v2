import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './loading.css';
import LoadingElements from '../HomePage/Elements/LoadingElements';

const LoadingScreen = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const increment = Math.random() * 10 + 5;
        const newProgress = prev + increment;
        
        const clampedProgress = Math.min(100, Math.max(0, newProgress));
        
        if (clampedProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => onLoaded(), 500);
          }, 400);
          return 100;
        }
        return clampedProgress;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [onLoaded]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="loading-screen fixed inset-0 z-[1000] overflow-hidden cursor-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Logo */}
          <motion.div
              className="logo fixed 2xl:top-[16em] 2xl:left-[37em] pointer-events-none select-none"
              transition={{ delay: 0.2, duration: 1.0 }}
              >
              <img src='/Menu/Images/Blacklogo.png' alt="Logo" className="2xl:h-[4em] w-auto" />
          </motion.div>

          <LoadingElements/>
        
            <div className="absolute inset-0 flex flex-col items-center justify-center select-none">
              <div className="loading-content p-4 flex flex-col items-center bg-opacity-70 rounded-lg">
              
                <div className="loading-bar-container w-70 h-2 bg-gray-700 rounded-full overflow-hidden ml-[2em]">
                  <div 
                    className="loading-bar h-full bg-[#BF1736] transition-all duration-200 ease-in-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
            
              </div>
            </div>
            
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;