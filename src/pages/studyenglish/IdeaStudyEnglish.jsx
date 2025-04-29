import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const Idea = () => {
  const imgRef = useRef(null);
  const logoRef = useRef(null); // Add ref for the logo

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

    // GSAP zoom in/out for logo
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { scale: 1 },
        {
          scale: 1.2,
          duration: 1,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
          repeatDelay: 1,
          yoyoDelay: 2,
        }
      );
    }
  }, []);

  return (
    <div
      id="idea-grid"
      className="grid grid-cols-[100%] sm:grid-cols-[35%_65%] md:grid-cols-[35%_65%] lg:grid-cols-[35%_65%] xl:grid-cols-[35%_65%] 2xl:grid-cols-[35%_65%] h-full w-full solit-el-1" style={{ minHeight: "100vh" }}
    >
      <div className="h-full w-full flex flex-col">
        <div className="min-h-1/2 p-18 mb-0 bg-[#0077BE] bg-[url('/assets/studyenglish/se-grid-1bg.png')] bg-auto bg-no-repeat bg-right-bottom">
          <img
            ref={imgRef}
            src="/assets/studyenglish/bebas-fonts.png"
            alt="Box 1"
            className="w-full"
            style={{ display: "block" }}
          />
        </div>
        <div className="min-h-1/2  bg-[#50C878] p-0">
          <div className="bg-[#50C878]">
            <img src="/assets/studyenglish/man-with-laptop.png" />
          </div>

        </div>
      </div>
      <div className="h-full w-full flex flex-col">
        {/* Second column content goes here */}
        <div className="flex flex-col sm:flex-row w-full">
          <div className="w-full sm:w-1/2 bg-[#FFF0CF] p-22">
            <div className="flex items-center justify-center h-full">
              <img
                ref={logoRef}
                src="/assets/studyenglish/studyenglish-logo.png"
                alt="Study English Logo"
              />
            </div>
          </div>
          <div className="w-full sm:w-1/2 bg-gray-100 p-0 relative">
            <div className="bg-[99C9E5] p-0 flex items-center justify-center relative min-h-40">
              <div className="relative w-80 h-140">
                <img
                  src="/assets/studyenglish/black-color.png"
                  alt="Stack 4"
                  className="absolute bottom-80 left-0 w-auto z-30"
                />
                <img
                  src="/assets/studyenglish/yellow-color.png"
                  alt="Stack 3"
                  className="absolute bottom-60 left-0 w-auto z-20"
                />
                <img
                  src="/assets/studyenglish/green-color.png"
                  alt="Stack 2"
                  className="absolute bottom-30 left-0 w-auto z-10"
                />
                <img
                  src="/assets/studyenglish/blue-color.png"
                  alt="Stack 1"
                  className="absolute bottom-0 left-0 w-auto"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full bg-green-200 p-0">
          
          <img src="assets/studyenglish/shapes.png" />
        </div>
      </div>
    </div>
  );
};

export default Idea;
