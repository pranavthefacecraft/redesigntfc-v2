import SplitType from "split-type";
import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const MainText = () => {
  const text = useRef();

  useGSAP(() => {
    setTimeout(() => {
      let splitted = new SplitType(text.current);
      splitted.chars.forEach((char) => {
        char.style.opacity = 0.2;
      });

      gsap.to(splitted.chars, {
        scrollTrigger: {
          trigger: text.current,
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
    <div className="px-8 sm::px-8 md::px-8 lg:px-8 xl:px-8 2xl:px-8 mb-10 sm:mb-10 md:mb-0 lg:mb-0 xl:mb-0 2xl:mb-0 w-full">
      <p ref={text} className="font-secondary text-[25px] leading-12 sm:text-[35px] sm:leading-15 md:text-[25px] md:leading-16 lg:text-[50px] lg:leading-20 xl:text-[50px] xl:leading-20 2xl:text-[70px] 2xl:leading-[98px]" style={{ fontKerning: "none" }}>
        Solit Hub in Littau offers affordable co-working spaces for young businesses. Our digital branding campaign, ‘Create at Solit, Thrive in Luzern,’ transformed Solit Hub’s identity, attracting the right audience through color schemes and a focused strategy.
      </p>
    </div>
  );
};
export default MainText;
