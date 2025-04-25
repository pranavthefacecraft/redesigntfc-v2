import { useEffect, useRef, useState } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import gsap from "gsap";

const items = [
  {
    src: "/assets/photovideoanimation/animation.png",
    title: "Animation",
    type: "image",
  },
  {
    src: "/assets/photovideoanimation/wireframe.png",
    title: "Fashion",
    type: "image",
  },
  {
    src: "/assets/photovideoanimation/fashion.png",
    title: "Wireframe",
    type: "image",
  },
  {
    src: "/assets/photovideoanimation/animation-v1.png",
    title: "Fashion",
    type: "image",
  },
  {
    src: "/assets/photovideoanimation/sample-video.mp4",
    title: "Sample Video",
    type: "video",
  },
];

const AlternatingGrid = () => {
  const scrollRef = useRef(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const lightboxRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
    });
    return () => {
      scroll.destroy();
    };
  }, []);

  useEffect(() => {
    if (lightboxOpen && lightboxRef.current) {
      gsap.fromTo(
        lightboxRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [lightboxOpen]);

  // Animate image on change
  useEffect(() => {
    if (imgRef.current) {
      gsap.fromTo(
        imgRef.current,
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [selectedIdx]);

  // Animate image on change with slide effect
  useEffect(() => {
    if (imgRef.current) {
      gsap.fromTo(
        imgRef.current,
        { opacity: 0, x: 80 },
        { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [selectedIdx]);

  const openLightbox = (idx) => {
    setSelectedIdx(idx);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    if (lightboxRef.current) {
      gsap.to(lightboxRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setLightboxOpen(false);
          setSelectedIdx(null);
        },
      });
    } else {
      setLightboxOpen(false);
      setSelectedIdx(null);
    }
  };

  const showPrev = (e) => {
    e.stopPropagation();
    if (selectedIdx > 0 && imgRef.current) {
      gsap.to(imgRef.current, {
        opacity: 0,
        x: -80,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => setSelectedIdx(selectedIdx - 1),
      });
    }
  };

  const showNext = (e) => {
    e.stopPropagation();
    if (selectedIdx < items.length - 1 && imgRef.current) {
      gsap.to(imgRef.current, {
        opacity: 0,
        x: 80,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => setSelectedIdx(selectedIdx + 1),
      });
    }
  };

  return (
    <div ref={scrollRef} data-scroll-container className="min-h-screen w-full bg-white py-0">
      <div className="grid grid-cols-1 gap-y-0 mx-auto w-full">
        {items.map((item, idx) => (
          <div
            key={item.title}
            data-scroll
            className={`
              flex flex-col items-${idx % 2 === 0 ? "start" : "end"}
              text-${idx % 2 === 0 ? "left" : "right"}
              w-full
            `}
          >
            {item.type === "video" ? (
              <video
                src={item.src}
                controls
                className="w-150 object-cover rounded-[20px] shadow mb-10 cursor-pointer transition-transform hover:scale-105"
                onClick={() => openLightbox(idx)}
                poster="/assets/photovideoanimation/video-poster.png"
              />
            ) : (
              <img
                src={item.src}
                alt={item.title}
                className="w-150 object-cover rounded-[20px] shadow mb-10 cursor-pointer transition-transform hover:scale-105"
                onClick={() => openLightbox(idx)}
              />
            )}
            <h3 className="text-[20px] sm:text-[20px] md:text-[20px] lg:text-[20px] xl:text-[40px] 2xl:text-[40px] Futura-PT-Heavy">{item.title}</h3>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          onClick={closeLightbox}
        >
          <div
            className="relative flex items-center"
            onClick={e => e.stopPropagation()}
          >
            {/* Left Arrow */}
            <button
              onClick={showPrev}
              disabled={selectedIdx === 0}
              className={`absolute left-[-60px] top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-3 hover:bg-opacity-100 transition shadow ${selectedIdx === 0 ? "opacity-30 cursor-not-allowed" : ""}`}
              aria-label="Previous"
              tabIndex={selectedIdx === 0 ? -1 : 0}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            {/* Image or Video */}
            {items[selectedIdx].type === "video" ? (
              <video
                ref={imgRef}
                src={items[selectedIdx].src}
                controls
                autoPlay
                className="max-w-[90vw] max-h-[80vh] rounded-xl shadow-2xl"
                poster="/assets/photovideoanimation/video-poster.png"
              />
            ) : (
              <img
                ref={imgRef}
                src={items[selectedIdx].src}
                alt={items[selectedIdx].title}
                className="max-w-[90vw] max-h-[80vh] rounded-xl shadow-2xl"
              />
            )}
            {/* Right Arrow */}
            <button
              onClick={showNext}
              disabled={selectedIdx === items.length - 1}
              className={`absolute right-[-60px] top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-3 hover:bg-opacity-100 transition shadow ${selectedIdx === items.length - 1 ? "opacity-30 cursor-not-allowed" : ""}`}
              aria-label="Next"
              tabIndex={selectedIdx === items.length - 1 ? -1 : 0}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-2 hover:bg-opacity-100 transition"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlternatingGrid;