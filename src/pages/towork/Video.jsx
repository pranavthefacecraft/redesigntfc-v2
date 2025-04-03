import { useRef, useEffect } from "react";
import gsap, { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const Video = () => {
  const cursor = useRef();
  const showCursorTimeline = useRef();
  const videoRef = useRef();
  const userInteracted = useRef(false);

  useGSAP(() => {
    let videoTl = gsap.timeline();

    ScrollTrigger.create({
      animation: videoTl,
      trigger: ".tanda-video",
      // markers: true,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      },
      onEnterBack: () => {
        videoRef.current.play();
      },
      onLeave: () => {
        videoRef.current.pause();
      },
      onLeaveBack: () => {
        videoRef.current.pause();
      },
    });

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  });

  useEffect(() => {
    let tl = gsap.timeline().pause().reverse();

    let c = cursor.current;

    tl.to(c, {
      scale: 1,
      duration: 0.6,
      ease: "back.out(4)",
    });

    showCursorTimeline.current = tl;

    return () => {
     // observer.disconnect();
    };
  }, []);

  const onMouseEnter = () => {
    document.body.style.cursor = "none";
    showCursorTimeline.current.play();
  };

  const onMouseMove = (e) => {
    // console.log(e);
    let x = e.nativeEvent.offsetX;
    let y = e.nativeEvent.offsetY;

    cursor.current.style.left = x + "px";
    cursor.current.style.top = y + "px";
  };

  const onMouseLeave = () => {
    document.body.style.cursor = "auto";
    showCursorTimeline.current.reverse();
  };

  return (
    <div
      className="tanda-video h-full w-full"
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <video
        ref={videoRef}
        className="absolute top-0 left-0 h-full w-full rounded-2xl border object-cover"
        controls
        poster="/assets/tanda/poster-image.png"
        muted
      >
        <source src="/assets/towork/towork-showreel-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Cursor */}
      <div
        ref={cursor}
        className="pointer-events-none absolute h-100 w-100 -translate-x-1/2 -translate-y-1/2 scale-0"
      >
        <img src="/assets/play-icon-black.png" className="absolute inset-0" />
      </div>
    </div>
  );
};
export default Video;
