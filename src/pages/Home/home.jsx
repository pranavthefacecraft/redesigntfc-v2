import './home.css';
import { Suspense, useRef, useEffect, useState } from 'react';
import Menu from '../../components/Menu/menu';
import Cards from '../../components/Menu/MenuCanvas/cards';
import Logo from '../../components/Menu/Logo';
import HomePage from '../HomePage/HomePage';
import { useClickStore } from '../../components/Menu/store';
import LoadingScreen from './LoadingScreen';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { clickCount, incrementClick } = useClickStore();
  const cursorRef = useRef(null);
  const cursor2Ref = useRef(null);

  // New cursor animation logic
  useEffect(() => {
    if (!cursorRef.current || !cursor2Ref.current) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let cursor2X = 0;
    let cursor2Y = 0;
    const speed = 0.2;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animateCursor = () => {
      
      cursorX += (mouseX - cursorX) * speed;
      cursorY += (mouseY - cursorY) * speed;

      cursor2X += (mouseX - cursor2X) * (speed * 1.0);
      cursor2Y += (mouseY - cursor2Y) * (speed * 1.0);

      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorX - 25}px, ${cursorY - 25}px)`;
      }
      if (cursor2Ref.current) {
        cursor2Ref.current.style.transform = `translate(${cursor2X - 4}px, ${cursor2Y - 4}px)`;
      }

      requestAnimationFrame(animateCursor);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animateCursor();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleClick = () => {
    incrementClick();
  };

  const getText = () => {
    switch (clickCount) {
      case 0:
        return 'Click me';
      case 1:
        return 'Click me again';
      case 2:
        return 'Click me once more';
      default: 
        return '';
    }
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      <Suspense fallback={null}>
      {isLoading && <LoadingScreen onLoaded={handleLoadingComplete} />}
      </Suspense>
      


      {/* Custom Cursor Elements */}
      <div className="cursor fixed pointer-events-none w-[50px] h-[50px] rounded-full border-1 z-[10]" ref={cursorRef} ></div>
      <div className="cursor2 fixed pointer-events-none w-[8px] h-[8px] rounded-full bg-white z-[10]" ref={cursor2Ref} />

      <div className="hometitle futuralight fixed top-[25.6em] left-[36.5em] 2xl:top-[25em] 2xl:left-[37em]  text-[1.7em] select-none">
            A digital branding agency
      </div>

      <div className="homewrapper fixed inset-0 -z-50 overflow-hidden h-screen w-full select-none pointer-events-none ">
      
        <div className="frontlayer absolute -bottom-[46em] z-[-46]">
          <div className="absolute -bottom-[34em] -left-[15em] opacity-100 blur-[0.4em]">
            <img
              className='cloudsimage1'
              src={"/Home/Images/two.png"}
              width={1300}
              height={100}
              alt="Cloud1"
            />
          </div>
          
          <div className="absolute -bottom-[24.5em] left-[35em] opacity-100 blur-[0.4em]">
            <img
              className='cloudsimage2' 
              src={"/Home/Images/four.png"}
              width={1500}
              height={100}
              alt="Cloud2" 
            />
          </div>
        </div>

        <div className="middlelayer absolute -bottom-[46em] z-[-48]">
          <div className="absolute -bottom-[34em] left-[60em] opacity-65 blur-[4px]">
            <img
              className='cloudsimage3'
              src={"/Home/Images/two.png"}
              width={1200}
              height={100}
              alt="Cloud3"
            />
          </div>
          
          <div className="absolute -bottom-[20em] -left-[10em] opacity-65 blur-[4px]">
            <img
              className='cloudsimage4'
              src={"/Home/Images/two.png"}
              width={1800}
              height={100}
              alt="Cloud4" 
            />
          </div>
        </div>  
        
        <div className="bottomlayer absolute -bottom-[46em] z-[-50]">
          <div className="absolute -bottom-[38em] left-[10em] opacity-55 blur-[1.5px]">
            <img
              className='cloudsimage5'
              src={"/Home/Images/two.png"}
              width={2000}
              height={100}
              alt="Cloud5"
            />
          </div>
          
          <div className="absolute -bottom-[28em] right-[20em] opacity-55 blur-[1.5px]">
            <img
              className='cloudsimage6'
              src={"/Home/Images/four.png"}
              width={1600}
              height={100}
              alt="Cloud6" 
            />
          </div>
        </div>
      </div> 
 
      {/* Top Layer - Menu, Cards, Logo */}
      <div className="fixed inset-0 w-full h-[1vh] z-[20] overflow-hidden">
        <Suspense fallback={null}>
          <div className="pointer-events-auto">
            <Menu />
          </div>
          <div className="pointer-events-auto">
            <Cards />
          </div>
          <div className="pointer-events-auto">
            <Logo />
          </div>
        </Suspense>
      </div>

      {/* Content Layer */}
      <div className="h-screen w-full -z-10 pointer-events-auto" onClick={handleClick}>
        <Suspense fallback={null}>
          <HomePage/>
        </Suspense>
      </div>
    </>
  );
};

export default Home;