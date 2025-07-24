import './ComingSoon.css';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Hero from './Hero/Hero';
import Tooltip from './Tooltip';
import useComingSoonStore from './ComingSoonStore';
import useTooltipStore from './TooltipStore';
import TestFloatingCube from './TextScreen';

const backgroundImages = [
  '/Comingsoon/Images/bg-coming.jpg',
  '/Comingsoon/Images/BG-new.png'
];

const ComingSoon = () => {
  const bg1Ref = useRef(null);
  const bg2Ref = useRef(null);

  // Initial state
  useEffect(() => {
    gsap.set(bg1Ref.current, { opacity: 1 });
    gsap.set(bg2Ref.current, { opacity: 0 });
  }, []);

  // Imperative Zustand subscription to avoid re-render
  useEffect(() => {
    const unsub = useComingSoonStore.subscribe(
      (isActive) => {
        if (isActive) {
          gsap.to(bg1Ref.current, { opacity: 0, duration: 1, ease: 'power2.inOut' });
          gsap.to(bg2Ref.current, { opacity: 1, duration: 1, ease: 'power2.inOut' });
        }
      },
      (state) => state.isImageTransitionActive
    );
    return unsub;
  }, []);

  // Mouse movement effect for tooltip
  useEffect(() => {
    const setMouse = useTooltipStore.getState().setMouse;
    const handleMouseMove = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const cameraAnimationFinished = useComingSoonStore(s => s.cameraAnimationFinished);

  return (
    <div className="coming-soon-bg-wrapper">
      <TestFloatingCube/>
      <div
        ref={bg1Ref}
        className="coming-soon-bg"
        style={{ backgroundImage: `url(${backgroundImages[0]})` }}
      />
      <div
        ref={bg2Ref}
        className="coming-soon-bg"
        style={{ backgroundImage: `url(${backgroundImages[1]})` }}
      />
      <div className="coming-soon-content">
        <Hero />
        <Tooltip>Click me</Tooltip>
      </div>
    </div>
  );
};

export default ComingSoon;