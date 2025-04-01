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
    <div className="lg:px-8 xl:px-16">
      <p
        ref={text}
        className="Futura-PT-Book text-[30px] sm:leading-20 md:text-5xl md:leading-20 lg:text-5xl lg:leading-20 xl:text-text-[70px] xl:leading-20 2xl:text-[70px] 2xl:leading-[84px]"
        style={{ fontKerning: "none" }}
      >
        TANDA Digital’s animated brand video showcases their LinkedIn and AI expertise with dynamic visuals, an engaging script, and the slogan "Leads Delivered, Success Achieved," positioning them as a leader in digital growth.
      </p>
    </div>
  );
};
export default MainText;
