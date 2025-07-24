import { useLayoutEffect, useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const VideoCard = ({ videoPath, title, position }) => {
  const videoRef = useRef(null);
  const titleRef = useRef(null);

  const handleMouseEnter = (e) => {
    e.target.play();
    
    // Start pulsating effect on title
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        opacity: 0.6,
        duration: 0.8,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true
      });
    }
  };

  const handleMouseLeave = (e) => {
    e.target.currentTime = 0;
    e.target.pause();
    
    // Stop pulsating effect and reset title opacity
    if (titleRef.current) {
      gsap.killTweensOf(titleRef.current);
      gsap.to(titleRef.current, {
        opacity: 1,
        duration: 0.1,
        ease: "power2.out"
      });
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Preload video metadata for faster playback
      video.load();
      
      // Add event listeners for better loading management
      const handleCanPlay = () => {
        console.log(`Video ${position} can play`);
      };
      
      const handleLoadedData = () => {
        console.log(`Video ${position} loaded data`);
      };
      
      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('loadeddata', handleLoadedData);
      
      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('loadeddata', handleLoadedData);
      };
    }
  }, [position]);

  return (
    <div className={`basis-1/6 h-full relative z-10`}>
      <div className="absolute inset-0 flex items-end justify-center md:m-1 lg:m-0 xl:m-0 2xl:m-0 pointer-events-auto">
        <video
          ref={videoRef}
          src={videoPath}
          loop
          muted
          playsInline
          preload="metadata" // Load metadata first, then buffer on demand
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="character-video w-[250px] h-full object-cover rounded-xl shadow-lg cursor-pointer"
        />
        <h2 
          ref={titleRef}
          className="absolute text-3xl futura-bold font-bold text-white text-center z-10 mb-50 pointer-events-none"
        >
          {title}
        </h2>
      </div>
    </div>
  );
};

const Team = () => {
  gsap.registerPlugin(ScrollTrigger);

  // Preload videos for better performance
  useEffect(() => {
    const preloadVideos = () => {
      teamMembers.forEach((member) => {
        if (member.video) {
          const video = document.createElement('video');
          video.preload = 'metadata';
          video.src = member.video;
          console.log(`Preloading video: ${member.name}`);
        }
      });
    };

    // Delay preloading to not block initial page load
    const timer = setTimeout(preloadVideos, 1000);
    return () => clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let sections = gsap.utils.toArray('.panel');
      let scrollTween = gsap.to(sections, {
        xPercent: (i) => -100 * i,
        duration: (i) => 1 * i,
        ease: 'sine.inOut',
        scrollTrigger: {
          trigger: '.container',
          pin: true,
          scrub: 0.5,
          end: "+=5000 bottom"
        }
      });

      gsap.utils.toArray(".panel").forEach((panel) => {
        ScrollTrigger.create({
          trigger: panel,
          containerAnimation: scrollTween,
          start: "left 25%",
          toggleClass: "stick"
        });
      });

      // Title fade animation when Naima panel comes in
      ScrollTrigger.create({
        trigger: ".Naima",
        containerAnimation: scrollTween,
        start: "left 100%", // When Naima starts coming in
        end: "left 75%",   // When Naima is fully in
        scrub: true,
        animation: gsap.to(".title-text", {
          opacity: 0,
          scale: 0.8,
          ease: "power2.inOut"
        })
      });
    });
    return () => ctx.revert();
  }, []);

  const teamMembers = [
    { name: "Title", isTitle: true, title: "Our Wonderful Team" },
    { name: "Naima", video: "/About/Videos/Naima.webm", title: "The Boss", position: 1 },
    { name: "Sean", video: "/About/Videos/Sean.webm", title: "The Artist", position: 2 },
    { name: "Mirco", video: "/About/Videos/Mirco.webm", title: "The Shareholder", position: 3 },
    { name: "Anne", video: "/About/Videos/Anne.webm", title: "The Designer", position: 4 },
    { name: "Abhi", video: "/About/Videos/Abhi.webm", title: "The 3D guy", position: 5 },
    { name: "Pranav", video: "/About/Videos/pranav.webm", title: "The Developer", position: 6 }
  ];

  return (
    <div className='container h-[100vh] w-[100vw] flex flex-nowrap'>
      {teamMembers.map((member, index) => (
        <div key={member.name} className={`panel ${member.name} w-screen h-full flex flex-row relative box-border pointer-events-none`}>
          {member.isTitle ? (
            // Title panel - centered text
            <div className="w-full h-full flex items-center justify-center">
              <h1 className="title-text text-6xl md:text-7xl lg:text-9xl futura-bold text-white text-center">
                {member.title}
              </h1>
            </div>
          ) : (
            // Video panels
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="basis-1/6 h-full relative">
                {i + 1 === member.position && (
                  <VideoCard 
                    videoPath={member.video}
                    title={member.title}
                    position={member.position}
                  />
                )}
              </div>
            ))
          )}
        </div>
      ))}

      {/* Empty Panel */}
      <div className='panel stick pointer-events-none'>
      </div>
    </div>
  );
};

export default Team;