import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function FloatingClouds() {
  const cloudRightRef = useRef();
  const cloudLeftRef = useRef();
  const cloudMiddleRef = useRef();

  useEffect(() => {
    const duration = 20; // Same duration for all clouds
    
    // Right cloud - moves left to right
    gsap.to(cloudRightRef.current, {
      x: '140vw',
      duration,
      ease: "sine.inOut"
    });
    
    // Left cloud - moves left to right
    gsap.to(cloudLeftRef.current, {
      x: '100vw',
      duration,
      ease: "sine.inOut",
    });

    // Middle cloud - moves right to left
    gsap.fromTo(cloudMiddleRef.current, 
      { x: '140vw' },
      {
        x: '-40vw',
        duration,
        ease: "sine.inOut"
      }
    );

    // Unique vertical movements
    gsap.to(cloudRightRef.current, {
      y: '+=40',
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(cloudLeftRef.current, {
      y: '+=20',
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(cloudMiddleRef.current, {
      y: '+=60',
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

  }, []);

  return (
    <>
      {/* Right Cloud */}
      <div ref={cloudRightRef} className="absolute -left-[25em] top-[40%] opacity-80 blur-[1.5px]">
        <img
          src={"/Menu/Images/cloudtwo_new.png"}
          width={250}
          height={150}
          alt="Right Cloud"
          draggable="false"
        />
      </div>
      
      {/* Left Cloud */}
      <div ref={cloudLeftRef} className="absolute top-[5%] opacity-75 blur-[1.5px]">
        <img
          src={"/Menu/Images/cloudone.png"}
          width={200}
          height={150}
          alt="Left Cloud"
          draggable="false"
        />
      </div>

      {/* Middle Cloud */}
      <div ref={cloudMiddleRef} className="absolute top-[70%] opacity-75 blur-[1.5px]">
        <img
          src={"/Menu/Images/cloudthree.png"}
          width={250}
          height={120}
          alt="Middle Cloud"
          draggable="false"
        />
      </div>
  </>
  );
}