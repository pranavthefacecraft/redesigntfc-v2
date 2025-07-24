import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import IslandText from './IslandText';


const IslandImages = [
  { 
    src: "/About/Islands/Marketing.png", 
    alt: "Marketing", 
    header: "The FaceCraft is a",
    title: "Digital Branding\nAgency", 
    subTitle: "",
    description: "We create visually stunning designs\nthat effectively communicate your\nbrand message and attract customers." 
  },
  { 
    src: "/About/Islands/Branding.png", 
    alt: "Branding", 
    header: "Offering Services from",
    title: "Web & App\nDevelopment", 
    subTitle: "",
    description: "We create visually stunning designs\nthat effectively communicate your\nbrand message and attract customers." 
  },
  { 
    src: "/About/Islands/SocialMedia.png", 
    alt: "Social Media", 
    header: "Enhanced by Bespoke",
    title: "Photography,\nVideos & Animations", 
    subTitle: "",
    description: "We create visually stunning designs\nthat effectively communicate your\nbrand message and attract customers." 
  },
  { 
    src: "/About/Islands/WebApp.png", 
    alt: "Web App", 
    header: "The FaceCraft is a",
    title: "Digital Branding\nAgency", 
    subTitle: "",
    description: "We create visually stunning designs\nthat effectively communicate your\nbrand message and attract customers." 
  }
];

const Island = () => {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
  const [dimensions, setDimensions] = useState({
    vw: window.innerWidth,
    vh: window.innerHeight,
    pathData: '',
    viewBoxWidth: 0,
    viewBoxHeight: 0
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const updateDimensions = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      
  

      const viewBoxWidth = vw;
      const viewBoxHeight = vh;
      
      // Circle positioned with center at (75vw, 25vh) for example
      const centerX = vw * 1.05;
      const centerY = vh * 0; 
      const radius = vh * 1;  
      
      // Starting point at top of circle
      const startX = centerX;
      const startY = centerY - radius;
      
      // Create SVG path for complete circle
      const pathData = `M ${startX} ${startY} A ${radius} ${radius} 0 1 1 ${startX - 0.1} ${startY}`;
      
      setDimensions({
        vw,
        vh,
        pathData,
        viewBoxWidth,
        viewBoxHeight
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useLayoutEffect(() => {
    if (!dimensions.pathData) return; // Don't run until path is calculated
    
    const ctx = gsap.context(() => {

      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.5,
        paused: true // Start paused
      });

      // Calculate conditional values outside the loop for debugging
      const isLargeScreen = dimensions.vw > 1536;
      console.log('Screen width:', dimensions.vw, 'Is Large Screen:', isLargeScreen);

      // Create animation for each image
      IslandImages.forEach((image, index) => {
        // Y animation values
        const startY = isLargeScreen ? -dimensions.vh * 0.16 : -dimensions.vh * 0.19;
        const endY = isLargeScreen ? -dimensions.vh * 0.24 : -dimensions.vh * 0.27;
        const middleY = isLargeScreen ? -dimensions.vh * 0.2 : -dimensions.vh * 0.23;
        
        // AlignOrigin values
        const alignOriginX = isLargeScreen ? 0.3 : 0.3;
        const alignOriginY = isLargeScreen ? 0.5 : 0.5;

        const imageSize = isLargeScreen ? 900 : 650;

        console.log(`Image ${index}: startY=${startY}, middleY=${middleY}, endY=${endY}, alignOrigin=[${alignOriginX}, ${alignOriginY}], size=${imageSize}`);

        tl.set(`#target-${index}`, { 
          opacity: 1,
          motionPath: {
            path: "#mainPath",
            align: "#mainPath",
            alignOrigin: [alignOriginX, alignOriginY],
            start: 0.3,
            end: 0.3,
          }
        })
        .set(`#text-${index}`, { 
          opacity: 0,
          x: 0,
          y: startY
        })
        // Start island movement and text fade in simultaneously
        .to(`#target-${index}`, {
          duration: 2,
          motionPath: {
            path: "#mainPath",
            align: "#mainPath",
            alignOrigin: [alignOriginX, alignOriginY],
            start: 0.3,
            end: 0.67,
          },
          ease: "power2.out"
        })
        .to(`#text-${index}`, {
          duration: 2,
          opacity: 1,
          y: middleY,
          ease: "power2.out"
        }, "<") // Start at the same time as island movement
        // Pause - text stays visible, island pauses
        .to({}, { duration: 1.0 }) // Empty tween for pause
        // Island continues to end, text fades out
        .to(`#target-${index}`, {
          duration: 2.0,
          motionPath: {
            path: "#mainPath",
            align: "#mainPath",
            alignOrigin: [alignOriginX, alignOriginY],
            start: 0.67,
            end: 0.9,
            immediateRender: false
          },
          ease: "power2.in"
        })
        .to(`#text-${index}`, {
          duration: 2,
          opacity: 0,
          y: endY,
          ease: "power2.in"
        }, "<") // Start text fade out with island movement
        // Fade out island
        .to(`#target-${index}`, {
          duration: 0.5,
          opacity: 0,
          ease: "power2.out"
        }, "-=0.5");
      });

      // ScrollTrigger to start animation when section comes into viewport
      ScrollTrigger.create({
        trigger: ".island-section-wrapper",
        start: "top 80%", // Start when top of section is 80% down the viewport
        end: "bottom 20%", // End when bottom of section is 20% down the viewport
        onEnter: () => {
          console.log("Island section entered viewport - starting animation");
          tl.play();
        },
        onLeave: () => {
          console.log("Island section left viewport - pausing animation");
          tl.pause();
        },
        onEnterBack: () => {
          console.log("Island section re-entered viewport - resuming animation");
          tl.play();
        },
        onLeaveBack: () => {
          console.log("Island section left viewport (scrolling up) - pausing animation");
          tl.pause();
        }
      });

      
    });
    return () => ctx.revert();
  }, [dimensions.pathData, dimensions.vw, dimensions.vh]); // Added vw and vh to dependencies

  return (
    <div className="island-section-wrapper relative w-full h-full overflow-hidden">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="100%" 
        height="100%" 
        viewBox={`0 0 ${dimensions.viewBoxWidth} ${dimensions.viewBoxHeight}`}
        style={{ overflow: 'visible', opacity: '1' }}
        className="absolute inset-0"
      >
        <path 
          id="mainPath" 
          d={dimensions.pathData} 
          fill="none" 
          stroke="rgba(255,0,0,0.3)" 
          strokeWidth="2" 
        />
      </svg>

      {/* Text elements using the new component */}
      {IslandImages.map((island, index) => (
        <IslandText 
          key={`text-${index}`}
          island={island}
          index={index}
        />
      ))}

      {/* Create individual targets for each image */}
      {IslandImages.map((image, index) => {
        // Conditional image size based on screen width
        const isLargeScreen = dimensions.vw > 1536;
        const imageSize = isLargeScreen 
          ? 800
          : 650;

        return (
          <div 
            key={index}
            id={`target-${index}`} 
            className='absolute' 
            style={{ 
              width: `${imageSize}px`, 
              height: `${imageSize}px`,
              opacity: 0
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className='w-full h-full object-cover rounded'
            />
          </div>
        );
      })}
    </div>
  );
};

export default Island;