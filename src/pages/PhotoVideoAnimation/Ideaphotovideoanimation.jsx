import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const Idea = () => {
  // Create refs for each icon
  const iconRefs = [useRef(), useRef(), useRef(), useRef(), useRef()];

  // Ref for animated text
  const animatedTextRef = useRef();

  useEffect(() => {
    iconRefs.forEach((ref, i) => {
      gsap.to(ref.current, {
        opacity: 0.4,
        repeat: -1,
        yoyo: true,
        duration: 1.1,
        delay: i * 0.25, // stagger the blink
        ease: "power1.inOut",
      });
    });
  }, [iconRefs]);

  useGSAP(() => {
    setTimeout(() => {
      let splitted = new SplitType(animatedTextRef.current);
      splitted.chars.forEach((char) => {
        char.style.opacity = 0.2;
      });

      gsap.to(splitted.chars, {
        scrollTrigger: {
          trigger: animatedTextRef.current,
          start: "-10% bottom",
          end: "60% 20%",
          scrub: 1.5,
        },
        opacity: 1,
        stagger: 0.05,
      });

      ScrollTrigger.refresh();
    }, 100);
  });

  return (
    <div
      id="idea-grid-photo-video-animation"
      className="border-0 border-amber-900 h-auto grid gap-0 sm:gap-4 md:gap-4 lg:gap-4 xl:gap-4 2xl:gap-4"
     
    >
      {/* First Row */}
      <div
        className="grid w-full h-full grid-cols-1 grid-rows-1 sm:grid-cols-3 sm:grid-rows-1"
        style={{
          // Remove gridTemplateColumns here, Tailwind handles it responsively
        }}
      >
        <div className="bg-[#e8e8e8] flex items-center justify-center">
          {/* First Column Content */}
          <div
            className="grid grid-rows-3 grid-cols-2 gap-2 w-full h-full items-center p-10 sm:p-20 md:p-20 lg:p-20 xl:p-20 2xl:p-20"
          >
            {/* Top Row: Two icons, left and right */}
            <span
              ref={iconRefs[0]}
              className="flex items-center justify-center bg-white rounded-full w-35 h-35 col-start-1 row-start-1 justify-self-start"
            >
              <img src="/assets/photovideoanimation/timestamp-v1.png" alt="Icon 1" className="w-25 h-25" />
            </span>
            <span
              ref={iconRefs[1]}
              className="flex items-center justify-center bg-white rounded-full w-35 h-35 col-start-2 row-start-1 justify-self-end"
            >
              <img src="/assets/photovideoanimation/camera-v3.png" alt="Icon 2" className="w-25 h-25" />
            </span>
            {/* Middle Row: One icon, centered */}
            <span
              ref={iconRefs[2]}
              className="flex items-center justify-center bg-white rounded-full w-35 h-35 col-span-2 row-start-2 justify-self-center"
            >
              <img src="/assets/photovideoanimation/camera-lence.png" alt="Icon 3" className="w-25 h-25" />
            </span>
            {/* Bottom Row: Two icons, left and right */}
            <span
              ref={iconRefs[3]}
              className="flex items-center justify-center bg-white rounded-full w-35 h-35 col-start-1 row-start-3 justify-self-start"
            >
              <img src="/assets/photovideoanimation/reel-v3.png" alt="Icon 4" className="w-25 h-25" />
            </span>
            <span
              ref={iconRefs[4]}
              className="flex items-center justify-center bg-white rounded-full w-35 h-35 col-start-2 row-start-3 justify-self-end"
            >
              <img src="/assets/photovideoanimation/drone-v3.png" alt="Icon 5" className="w-25 h-25" />
            </span>
          </div>
        </div>
        <div className="bg-white flex items-center justify-center">
          {/* Second (Middle) Column Content */}
          <div className="flex flex-col items-center gap-0 sm:gap-4 md:gap-4 lg:gap-4 xl:gap-4 2xl:gap-4 w-full h-full">
            <div className="h-1/2 w-full bg-black border-l-0 sm:border-l-12 md:border-l-12 lg:border-l-12 xl:border-l-12 2xl:border-l-12 border-r-0 sm:border-r-12 md:border-r-12 lg:border-r-12 xl:border-r-12 2xl:border-r-12 border-[#ffffff]">
              <img src="/assets/photovideoanimation/story-board.webp" alt="Sample 1" className="w-full h-full" />
            </div>
            {/* Video with autoplay and loop */}
            <div className="h-1/2 w-full bg-[#f2f2f2] border-l-0 sm:border-l-12 md:border-l-12 lg:border-l-12 xl:border-l-12 2xl:border-l-12 border-r-0 sm:border-r-12 md:border-r-12 lg:border-r-12 xl:border-r-12 2xl:border-r-12 border-[#ffffff] flex items-center justify-center">
              <video src="/assets/photovideoanimation/camera-video-480.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
        <div className="bg-blue-500 flex items-center justify-center">
          {/* Third Column Content */}
          <img src="/assets/photovideoanimation/man-image.png" alt="Sample 2" className="w-full object-cover h-full" />
        </div>
      </div>
      {/* Second Row */}
      <div
        className="block sm:grid md:grid lg:grid xl:grid 2xl:grid w-full h-auto sm:h-full grid-cols-1 grid-rows-1 sm:grid-cols-2 sm:grid-rows-1 border-0 border-amber-400"
      >
        <div className="bg-yellow-500 flex items-center justify-center border-0 border-amber-400">
          {/* First Column Content */}
          <img src="/assets/photovideoanimation/studio.png" alt="Sample 2" className="w-full h-full object-cover" />
        </div>
        <div className="bg-[#e8e8e8] flex items-center justify-center border-l-0 sm:border-l-12 md:border-l-12 lg:border-l-12 xl:border-l-12 2xl:border-l-12 border-r-0 sm:border-r-12 md:border-r-12 lg:border-r-12 xl:border-r-12 2xl:border-r-12 border-[#ffffff]">
          {/* Second Column Content */}
          <div className="p-10 sm:p-30 md:p-30 lg:p-30 xl:p-30 2xl:p-30 text-center">
            <span
              ref={animatedTextRef}
              className="font-secondary text-[45px] leading-12 sm:leading-20 md:text-4xl md:leading-16 lg:text-5xl lg:leading-20 xl:text-[50px] xl:leading-20 2xl:text-[70px] 2xl:leading-[98px]"
              style={{ fontKerning: "none", display: "inline-block" }}
            >
              Elevate storytelling with stunning visuals
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Idea;
