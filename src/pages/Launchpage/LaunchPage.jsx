import './Launch.css'

import { useEffect, useRef, useCallback, Suspense } from "react";
import Lenis from "lenis";

import Overlay from "./Overlay";
import useStore from "./contexts/store";
import { Scene } from "./Canvas";

import SvgMouseFollow from "./SvgMouseFollow";

function LaunchPage() {
  const lenisRef = useRef();
  const pageWrapperRef = useRef();
  const { hasScroll, setHasScroll, play, setEnd, setScrollOffset } = useStore();

  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1, // Control the duration of the scroll
      easing: (t) => 1 - Math.pow(1 - t, 3), // Cubic easing for smooth stop
      smooth: true,
      smoothWheel: true,
      syncTouch: true,
    });
    function raf(time) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (play) {
      setTimeout(() => {
        lenisRef.current?.start();
      }, 2500);
    } else {
      lenisRef.current?.stop();
    }
  }, [play]);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY / window.innerHeight;
    // Update gradient position or colors based on scroll
    const gradientPosition = Math.min(scrollY * 20, 100);
    const gradientColorStop = Math.min(scrollY * 10, 100);
    if (pageWrapperRef.current) {
      pageWrapperRef.current.style.background = `radial-gradient(circle at top right, 
        #3F3862 ${20 + gradientColorStop}%, 
        #7d6fc4 ${100 + gradientPosition}%)`;
    }
    setScrollOffset(scrollY);
    if (scrollY > 0 && !hasScroll) {
      setHasScroll(true);
    }
    if (scrollY > 6.99 && hasScroll) {
      setEnd(true);
    } else {
      setEnd(false);
    }
  }, [hasScroll, setHasScroll, setEnd, setScrollOffset]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      <div className="page-wrapper fixed w-full h-screen top-0 left-0" ref={pageWrapperRef}>
        <div className="canvas-wrapper fixed w-full max-w-[1920px] h-screen z-0 left-1/2 transform -translate-x-1/2">
            <Scene />
        </div>
        <div className="overlay fixed w-full max-w-[1536px] h-screen z-10 left-1/2 transform -translate-x-1/2">
          <Overlay />
          <SvgMouseFollow />
        </div>
      </div>
      <div className="empty-scroll w-full h-[800vh]"></div>
    </>
  );
}
export default LaunchPage;