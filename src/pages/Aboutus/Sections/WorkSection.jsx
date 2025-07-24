import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const WorkSection = () => {
  const leftImageRef = useRef(null);
  const centerImageRef = useRef(null);
  const rightImageRef = useRef(null);
  const timelineRef = useRef(null);

  const images = [
    { src: "/About/Images/image-one.png", alt: "Creative workspace setup" },
    { src: "/About/Images/image-two.png", alt: "Creative professional portrait" },
    { src: "/About/Images/image-three.png", alt: "Fashion and creativity" }
  ];

  useEffect(() => {
    // Create GSAP timeline for infinite rotation
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    // Animation sequence: left → center, center → right, right → left
    tl.to([leftImageRef.current, centerImageRef.current, rightImageRef.current], {
      duration: 1.5,
      ease: "power2.inOut",
      onStart: () => {
        // Move left to center position (normal size)
        gsap.to(leftImageRef.current, {
          scale: 1,
          rotation: 0,
          zIndex: 1,
          duration: 1.5,
          ease: "power2.inOut"
        });
        
        // Move center to right position (scale up and rotate)
        gsap.to(centerImageRef.current, {
          scale: 1.2,
          rotation: -5,
          zIndex: 10,
          duration: 1.5,
          ease: "power2.inOut"
        });
        
        // Move right to left position (normal size)
        gsap.to(rightImageRef.current, {
          scale: 1,
          rotation: 0,
          zIndex: 1,
          duration: 1.5,
          ease: "power2.inOut"
        });
      },
      onComplete: () => {
        // Rotate the image sources after animation
        const leftSrc = leftImageRef.current.querySelector('img').src;
        const centerSrc = centerImageRef.current.querySelector('img').src;
        const rightSrc = rightImageRef.current.querySelector('img').src;
        
        // Cycle the images: left → center, center → right, right → left
        leftImageRef.current.querySelector('img').src = rightSrc;
        centerImageRef.current.querySelector('img').src = leftSrc;
        rightImageRef.current.querySelector('img').src = centerSrc;
        
        // Reset scales and rotations: center image becomes the featured one
        gsap.set([leftImageRef.current, rightImageRef.current], {
          scale: 1,
          rotation: 0,
          zIndex: 1
        });
        gsap.set(centerImageRef.current, {
          scale: 1.2,
          rotation: -5,
          zIndex: 10
        });
      }
    });

    timelineRef.current = tl;

    // Set initial states - center image starts as featured
    gsap.set([leftImageRef.current, rightImageRef.current], {
      scale: 1,
      rotation: 0,
      zIndex: 1
    });
    gsap.set(centerImageRef.current, {
      scale: 1.2,
      rotation: -5,
      zIndex: 10
    });

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  return (
    <section className="min-h-screen">
      {/* Header Section - 50vh with max-w-7xl */}
      <div className="h-[50vh] px-4 md:px-8 lg:px-4 mb-[20vh]">
        <div className="mx-auto max-w-7xl w-full">
          
          {/* First Row - "We Transform" */}
          <div className="mb-8">
            <h1 className="text-4xl futura-light font-semibold tracking-[6px] leading-tight text-[#8C86DB] md:text-[52px] lg:text-[60px] xl:text-[70px] 2xl:text-[128px] whitespace-nowrap">
              We Transform
            </h1>
          </div>

          {/* Second Row - Two Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-100">
            {/* Column 1 - "Brands" */}
            <div>
              <h1 className="text-4xl futura-light font-semibold tracking-[6px] leading-tight text-[#8C86DB] md:text-[52px] lg:text-[60px] xl:text-[70px] 2xl:text-[128px] whitespace-nowrap">
                Brands
              </h1>
            </div>
            
            {/* Column 2 - Subtitle and Description */}
            <div className='mt-25'>
              <h2 className="monserrat-bold text-[#040404] text-[16px] sm:text-[16px] md:text-[16px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] mb-4 whitespace-nowrap">
                From brand development to digital marketing
              </h2>
              <p className="monserrat-medium leading-relaxed text-[#6F6F6F] text-[16px] sm:text-[16px] md:text-[16px] lg:text-[16px] xl:text-[18px] 2xl:text-[18px]">
                We establish ourselves as a dependable partner <br/> for our clients, delivering impactful messages <br/> and serving as a one-stop center for all digital <br/> services a company may need.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Third Row - Images Section */}
      <div className="h-[70vh] w-full flex items-center justify-center overflow-hidden">
        <div className="grid grid-cols-3 gap-6 lg:gap-30 items-center w-full">
          {/* Left Image - Half cropped */}
          <div ref={leftImageRef} className="flex items-center justify-end relative">
            <div className="overflow-hidden rounded-2xl shadow-lg transition-all duration-300 w-80 h-60">
              <img
                src={images[0].src}
                alt={images[0].alt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Center Image - More rectangular */}
          <div ref={centerImageRef} className="flex items-center justify-center relative">
            <div className="overflow-hidden rounded-2xl shadow-lg w-96 h-80">
              <img
                src={images[1].src}
                alt={images[1].alt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Image - Half cropped */}
          <div ref={rightImageRef} className="flex items-center justify-start relative">
            <div className="overflow-hidden rounded-2xl shadow-lg transition-all duration-300 w-80 h-60">
              <img
                src={images[2].src}
                alt={images[2].alt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;