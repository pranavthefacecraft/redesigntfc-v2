import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const Component = () => {
  const wrapper = useRef();

  useGSAP(() => {
    let tl = gsap.timeline();

    ScrollTrigger.create({
      animation: tl,
      trigger: wrapper.current,
      start: "top top",
      end: "+=300% bottom",
      pin: true,
      scrub: true,
      onEnter: () => {
        console.log("enter");
      },
      onUpdate: (self) => {
        console.log(self.progress);
      },
      onLeaveBack: () => {
        console.log("leave");
      },
    });

    ScrollTrigger.refresh();
  });

  return (
    <div
      ref={wrapper}
      className="relative h-screen w-full overflow-hidden border-8 border-blue-500"
    >
      <div className="absolute inset-0 bg-orange-300"></div>

      <div className="absolute inset-0 bg-red-500"></div>
    </div>
  );
};

export default Component;
