import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const Idea = () => {
  const imgRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      imgRef.current,
      { clipPath: "inset(0 0 100% 0)" }, // hidden from top
      {
        clipPath: "inset(0 0 0% 0)", // fully visible
        duration: 2.5,                // slower animation
        ease: "power2.out",
        repeat: -1,                   // infinite loop
        yoyo: true,                   // reverse the animation
        repeatDelay: 1,               // 3 seconds delay between repeats
        yoyoDelay: 3,                 // 3 seconds delay before reversing
      }
    );
  }, []);

  return (
    <div
      id="idea-grid"
      className="grid grid-cols-[35%_65%] h-full w-full solit-el-1"
    >
      <div className="border h-full w-full bg-red-500">
        <div className="min-h-96 p-18 mb-0 bg-[#0077BE] bg-[url('/assets/studyenglish/se-grid-1bg.png')] bg-auto bg-no-repeat bg-right-bottom">
          <img
            ref={imgRef}
            src="/assets/studyenglish/bebas-fonts.png"
            alt="Box 1"
            className="w-full"
            style={{ display: "block" }}
          />
        </div>
        <div className="bg-gray-200 p-4">Box 2</div>
      </div>
      <div className="border h-full w-full bg-blue-500">
        {/* Second column content goes here */}
      </div>
    </div>
  );
};

export default Idea;
