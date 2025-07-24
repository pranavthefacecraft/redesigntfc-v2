import './About.css';
import Lenis from 'lenis';
import { useEffect, useState } from 'react';

// Sections Import
import Team from './Sections/TeamSection/Team';
import Hero from './Sections/HeroSection/Hero';
import Island from './Sections/IslandSection/Island';
import VideoSection from './Sections/VideoSection';
import WorkSection from './Sections/WorkSection';

const About = () => {
  const [isHeroReady, setIsHeroReady] = useState(false);

  // lenis
  useEffect(() => {
    const lenis = new Lenis();
    lenis.on('scroll', (e) => {});

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Delay Hero rendering to improve initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHeroReady(true);
    }, 100); // Small delay to let other components render first

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Page-wrapper (base layer) */}
      <div className="main-wrapper relative m-0 p-0 overflow-x-hidden z-0">

        {/* Fixed Hero-Canvas (middle layer) */}
        <div className="fixed-canvas fixed top-0 left-0 w-screen h-screen m-0 p-0 z-10 pointer-events-none">
          
          {isHeroReady && <Hero/>}
        
        </div>

        {/* Scrollable Content (top layer) */}
        <div className="empty max-w-[1536px] h-[400vh] mx-auto"></div>
        <div className="first h-[100vh] max-w-[1536px] relative mx-auto mt-[100px] z-20 bg-slate-100"></div>
        <div className="second h-[100vh] max-w-[1536px] relative mx-auto mt-[100px] xl:mt-[112px] 2xl:mt-[130px] z-20">
          <VideoSection 
            videoSrc="/About/Videos/tanda.mp4"
            posterSrc="/About/Images/poster-image.png"
            title="Welcome to Our Company"
            description="Discover what makes us unique"
            autoplay={true}
            className="w-full h-full"
          />
        </div>
        <div className="empty max-w-[1536px] h-[400vh] mx-auto"></div>
        <div className="third h-[120vh] max-w-[1536px] relative mx-auto z-20">
          <WorkSection/>
        </div>
        <div className="fourth h-[100vh] max-w-[1536px] relative mx-auto mt-[100px] xl:mt-[112px] 2xl:mt-[130px] z-20 border-1">
          <Island/>
        </div>
        <div className="empty max-w-[1536px] h-[400vh] mx-auto"></div>
        <div className="fifth w-screen relative mx-auto mt-[100px] xl:mt-[112px] 2xl:mt-[130px] z-20"><Team/></div>
        <div className="six h-[100vh] max-w-[1536px] bg-slate-400 relative mx-auto mt-[100px] xl:mt-[112px] 2xl:mt-[130px] z-20"></div>

      </div>
    </>
  );
};

export default About;