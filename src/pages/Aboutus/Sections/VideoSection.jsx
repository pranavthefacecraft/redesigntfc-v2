import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const VideoSection = ({ 
  videoSrc, 
  autoplay = false,
  loop = true,
  muted = true,
  controls = false,
  className = ""
}) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Register GSAP ScrollTrigger
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  // GSAP scaling animation
  useEffect(() => {
    if (!containerRef.current || !videoRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom", // When container center touches viewport top
        end: "center top", // When container bottom touches viewport top
        scrub: true,
        animation: gsap.fromTo(videoRef.current, 
          { scale: 1 },
          { scale: 0.85, ease: "power2.inOut" }
        )
      });
    });

    return () => ctx.revert();
  }, []);

  // Enhanced intersection observer for autoplay with video state management
  useEffect(() => {
    if (!autoplay) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        const video = videoRef.current;
        if (!video || !isLoaded) return;

        if (entry.isIntersecting) {
          // Play video when in viewport
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.log("Video play failed:", error);
            });
          }
        } else {
          // Pause video when out of viewport
          video.pause();
        }
      },
      { threshold: 0.3 } // Lower threshold for better performance
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [autoplay, isLoaded]);

  // Video load handler with play attempt
  const handleLoadedMetadata = () => {
    setIsLoaded(true);
    
    // Try to play if autoplay is enabled and video is likely in viewport
    if (autoplay && videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Initial autoplay failed:", error);
        });
      }
    }
  };

  // Handle video errors and prevent stopping
  const handleVideoError = (e) => {
    console.error("Video error:", e);
    // Attempt to reload the video
    if (videoRef.current) {
      videoRef.current.load();
    }
  };

  // Prevent video from stopping during transitions
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      // Ensure video continues playing during GSAP animations
      video.style.willChange = 'transform';
    };

    const handlePause = () => {
      video.style.willChange = 'auto';
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  return (
    <div ref={containerRef} className={`video-section relative w-full h-full ${className}`}>
      <video
        ref={videoRef}
        className="w-full h-full object-cover rounded-3xl shadow-3xl"
        loop={loop}
        muted={muted}
        playsInline
        controls={controls}
        preload="metadata"
        onLoadedMetadata={handleLoadedMetadata}
        onError={handleVideoError}
      >
        <source src={videoSrc} type="video/webm" />
        <source src={videoSrc.replace('.webm', '.mp4')} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoSection;
