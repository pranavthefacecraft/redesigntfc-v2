import { useRef, useEffect } from "react";
import gsap from "gsap/all";

const Video = () => {
  const cursor = useRef();
  const showCursorTimeline = useRef();

  useEffect(() => {
    let tl = gsap.timeline().pause().reverse();

    let c = cursor.current;

    tl.to(c, {
      scale: 1,
      duration: 0.6,
      ease: "back.out(4)",
    });

    showCursorTimeline.current = tl;
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
      className="h-full w-full"
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <video
        className="absolute top-0 left-0 h-full w-full object-cover"
        controls
      >
        <source
          src="/assets/solit-create-at-solit-thrive-in-luzern.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Cursor */}
      <div
        ref={cursor}
        className="pointer-events-none absolute h-60 w-60 -translate-x-1/2 -translate-y-1/2 scale-0"
      >
        <img src="/assets/play-icon.png" className="absolute inset-0" />
      </div>
    </div>
  );
};
export default Video;
