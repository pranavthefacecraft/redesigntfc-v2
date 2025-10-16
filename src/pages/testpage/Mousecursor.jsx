import React, { useRef, useCallback, useEffect, useState } from 'react';
import { usePlay } from './Contexts/Play';

const MouseScrollCursor = ({
  smoothness = 0.1,
  className = '',
}) => {
  const cursorRef = useRef(null);
  const wheelPathRef = useRef(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const targetPositionRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);
  const wheelAnimationRef = useRef(null);
  const { play, end } = usePlay();
  const [isVisible, setIsVisible] = useState(false);
  const [currentSize, setCurrentSize] = useState(1);

  // Responsive size calculation
  const calculateSize = useCallback(() => {
    const width = window.innerWidth;
    
    if (width < 640) { // sm breakpoint
      return 0.8;
    } else if (width < 768) { // md breakpoint
      return 0.9;
    } else if (width < 1024) { // lg breakpoint
      return 1;
    } else if (width < 1280) { // xl breakpoint
      return 1.1;
    } else if (width < 1920 ) { // 2xl and above
      return 1.0;
    }
    else {
      return 1.3;
    }


  }, []);

  // Mouse move handler - always active, no dependencies
  const handleMouseMove = useCallback((e) => {
    targetPositionRef.current = {
      x: e.clientX,
      y: e.clientY
    };
  }, []);

  // Handle window resize
  const handleResize = useCallback(() => {
    setCurrentSize(calculateSize());
  }, [calculateSize]);

  // Smooth animation
  const animateCursor = useCallback(() => {
    if (!cursorRef.current || !isVisible) return;

    const { x: currentX, y: currentY } = positionRef.current;
    const { x: targetX, y: targetY } = targetPositionRef.current;

    const newX = currentX + (targetX - currentX) * smoothness;
    const newY = currentY + (targetY - currentY) * smoothness;

    positionRef.current = { x: newX, y: newY };
    cursorRef.current.style.transform = `translate3d(${newX}px, ${newY}px, 0) scale(${currentSize})`;

    animationFrameRef.current = requestAnimationFrame(animateCursor);
  }, [smoothness, currentSize, isVisible]);

  // Wheel animation using keyframes
  const animateWheel = useCallback(() => {
    if (!wheelPathRef.current || !isVisible) return;

    wheelAnimationRef.current = requestAnimationFrame(animateWheel);
  }, [isVisible]);

  // Start/stop wheel animation
  useEffect(() => {
    if (isVisible && wheelPathRef.current) {
      // Start wheel animation when visible
      wheelAnimationRef.current = requestAnimationFrame(animateWheel);
    } else {
      // Stop wheel animation when not visible
      if (wheelAnimationRef.current) {
        cancelAnimationFrame(wheelAnimationRef.current);
        wheelAnimationRef.current = null;
      }
    }

    return () => {
      if (wheelAnimationRef.current) {
        cancelAnimationFrame(wheelAnimationRef.current);
        wheelAnimationRef.current = null;
      }
    };
  }, [animateWheel, isVisible]);

  // Handle visibility transitions based on play and end states
  useEffect(() => {
    if (play && !end) {
      // Fade in when play is true and end is false
      setIsVisible(true);
    } else if (end) {
      // Fade out when end becomes true
      setIsVisible(false);
    } else if (!play) {
      // Fade out when play becomes false
      setIsVisible(false);
    }
  }, [play, end]);

  // Initialize responsive size and event listeners
  useEffect(() => {
    // Set initial size
    setCurrentSize(calculateSize());
    
    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [handleMouseMove, handleResize, calculateSize]);

  // Initialize animation when visible
  useEffect(() => {
    if (!isVisible) {
      // Clean up animation if not visible
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    // Start animation when visible
    if (!animationFrameRef.current) {
      animationFrameRef.current = requestAnimationFrame(animateCursor);
    }

    return () => {
      // Clean up animation on unmount or when visibility changes
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [animateCursor, isVisible]);

  // CSS for the keyframe animation - responsive animation distance
  const wheelStyle = {
    fill: 'none',
    stroke: '#fff',
    strokeWidth: '20px',
    animation: 'wheelScroll 1.5s ease-in-out infinite'
  };

  // Responsive text size with FuturaLight font
  const textStyle = "text-white transition-all duration-300 font-[FuturaLight] font-bold tracking-normal";

  // Don't render anything if not play or if end (but keep in DOM for transitions)
  if (!play && !isVisible) return null;

  return (
    <>
      <style>
        {`
          @keyframes wheelScroll {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(calc(25px * min(1, ${currentSize})));
            }
            100% {
              transform: translateY(0px);
            }
          }

          /* Responsive SVG sizing */
          .cursor-svg {
            width: calc(15px * min(1.5, ${currentSize}));
            height: auto;
            transition: all 0.3s ease;
          }

          /* Responsive text sizes with FuturaLight font */
          .cursor-text {
            font-family: "FuturaLight", sans-serif;
          }
          @media (max-width: 640px) {
            .cursor-text {
              font-size: 14px;
            }
          }
          @media (min-width: 641px) and (max-width: 768px) {
            .cursor-text {
              font-size: 15px;
            }
          }
          @media (min-width: 769px) and (max-width: 1024px) {
            .cursor-text {
              font-size: 16px;
            }
          }
          @media (min-width: 1025px) and (max-width: 1280px) {
            .cursor-text {
              font-size: 17px;
            }
          }
          @media (min-width: 1281px) {
            .cursor-text {
              font-size: 18px;
              letter-spacing: 0.5px;
            }
          }
        `}
      </style>
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-50 transition-opacity duration-500 ease-in-out ${className}`}
        style={{
          transform: 'translate3d(0, 0, 0)',
          willChange: 'transform',
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div className="flex items-center justify-center whitespace-nowrap gap-[0.5px]">
          <span className={`${textStyle} cursor-text`}>Scr</span>
          <svg 
            className="cursor-svg"
            viewBox="0 0 247 390" 
            version="1.1" 
            xmlns="http://www.w3.org/2000/svg" 
            xmlnsXlink="http://www.w3.org/1999/xlink" 
            style={{ 
              fillRule: 'evenodd', 
              clipRule: 'evenodd', 
              strokeLinecap: 'round', 
              strokeLinejoin: 'round', 
              strokeMiterlimit: 2.5 
            }}
          >
            <g id="wheel-container">
              <path 
                ref={wheelPathRef}
                id="wheel" 
                d="M123.359,79.775l0,72.843" 
                style={wheelStyle}
              />
            </g>
            <path 
              id="mouse" 
              d="M236.717,123.359c0,-62.565 -50.794,-113.359 -113.358,-113.359c-62.565,0 -113.359,50.794 -113.359,113.359l0,143.237c0,62.565 50.794,113.359 113.359,113.359c62.564,0 113.358,-50.794 113.358,-113.359l0,-143.237Z" 
              style={{ fill: 'none', stroke: '#fff', strokeWidth: '20px' }} 
            />
          </svg>
          <span className={`${textStyle} cursor-text`}>ll</span>
        </div>
      </div>
    </>
  );
};

export default React.memo(MouseScrollCursor);