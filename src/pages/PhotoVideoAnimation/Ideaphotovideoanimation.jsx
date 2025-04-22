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
        opacity: 0.3,
        repeat: -1,
        yoyo: true,
        duration: 0.7,
        delay: i * 0.15, // stagger the blink
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
      id="idea-grid"
      className="grid gap-4"
      style={{
        gridTemplateRows: "1fr 1fr",
        height: "100%",
      }}
    >
      {/* First Row */}
      <div
        className="grid w-full h-full"
        style={{
          gridTemplateColumns: "40% 20% 40%",
        }}
      >
        <div className="bg-[#e8e8e8] flex items-center justify-center">
          {/* First Column Content */}
          <div
            className="grid grid-rows-3 grid-cols-2 gap-2 w-full h-full items-center p-20"
          >
            {/* Top Row: Two icons, left and right */}
            <span
              ref={iconRefs[0]}
              className="flex items-center justify-center bg-white rounded-full w-35 h-35 col-start-1 row-start-1 justify-self-start"
            >
              <img src="/assets/photovideoanimation/camera.png" alt="Icon 1" className="w-15 h-15" />
            </span>
            <span
              ref={iconRefs[1]}
              className="flex items-center justify-center bg-white rounded-full w-35 h-35 col-start-2 row-start-1 justify-self-end"
            >
              <img src="/assets/photovideoanimation/reel.png" alt="Icon 2" className="w-15 h-15" />
            </span>
            {/* Middle Row: One icon, centered */}
            <span
              ref={iconRefs[2]}
              className="flex items-center justify-center bg-white rounded-full w-35 h-35 col-span-2 row-start-2 justify-self-center"
            >
              <img src="/assets/photovideoanimation/drone.png" alt="Icon 3" className="w-15 h-15" />
            </span>
            {/* Bottom Row: Two icons, left and right */}
            <span
              ref={iconRefs[3]}
              className="flex items-center justify-center bg-white rounded-full w-35 h-35 col-start-1 row-start-3 justify-self-start"
            >
              <img src="/assets/photovideoanimation/image.png" alt="Icon 4" className="w-15 h-15" />
            </span>
            <span
              ref={iconRefs[4]}
              className="flex items-center justify-center bg-white rounded-full w-35 h-35 col-start-2 row-start-3 justify-self-end"
            >
              <img src="/assets/photovideoanimation/camera-v2.png" alt="Icon 5" className="w-15 h-15" />
            </span>
          </div>
        </div>
        <div className="bg-white flex items-center justify-center">
          {/* Second (Middle) Column Content */}
          <div className="flex flex-col items-center gap-4 w-full h-full">
            <div className="h-1/2 w-full bg-black">
              <img src="/assets/photovideoanimation/storyboard.png" alt="Sample 1" className="w-full h-full" />
            </div>
            <div className="h-1/2 w-full bg-[#f2f2f2] p-6">
              <img src="/assets/photovideoanimation/insta.png" alt="Sample 2" className="w-80 h-auto" />
            </div>
          </div>
        </div>
        <div className="bg-blue-500 flex items-center justify-center">
          {/* Third Column Content */}
          <img src="/assets/photovideoanimation/man-image.png" alt="Sample 2" className="w-full object-cover" />
        </div>
      </div>
      {/* Second Row */}
      <div
        className="grid w-full h-full"
        style={{
          gridTemplateColumns: "60% 40%",
        }}
      >
        <div className="bg-yellow-500 flex items-center justify-center">
          {/* First Column Content */}
          <img src="/assets/photovideoanimation/studio.png" alt="Sample 2" className="w-full h-full object-cover" />
        </div>
        <div className="bg-[#e8e8e8] flex items-center justify-center">
          {/* Second Column Content */}
          <div className="p-30 text-center">
            <span
              ref={animatedTextRef}
              className="font-secondary text-[25px] leading-12 sm:leading-20 md:text-4xl md:leading-16 lg:text-5xl lg:leading-20 xl:text-[50px] xl:leading-20 2xl:text-[70px] 2xl:leading-[98px]"
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
