import React, { useState, useEffect } from 'react';
import useStore from './contexts/store';

const useMousePosition = () => {
  const [
    mousePosition,
    setMousePosition
  ] = React.useState({ x: null, y: null });

  React.useEffect(() => {
    const updateMousePosition = ev => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    
    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return mousePosition;
};

const SvgMouseFollow = () => {
  const { play, hasScroll, end } = useStore();
  const mousePosition = useMousePosition();
  return (
    <>
    <div
      className={`svg-wrapper absolute flex flex-row items-center gap-1 opacity-0 ${play && !end ? 'svg-wrapper--appear' : `${end ? 'svg-wrapper--disappear' : ''}`}`}
      style={{
        position: 'absolute',
        left: window.innerWidth >= 1920 ? mousePosition.x - 200 : mousePosition.x || 0, 
        top: mousePosition.y + 10  || 0,
        pointerEvents: 'none',
      }}
    >
    <span className="scroll-text">Scr</span>
      <svg width="20px" height="100%" viewBox="0 0 247 390" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: 1.5 }}>
	    <path id="wheel" d="M123.359,79.775l0,72.843" style={{ fill: 'none', stroke: '#fff', strokeWidth: '20px' }} />
	    <path id="mouse" d="M236.717,123.359c0,-62.565 -50.794,-113.359 -113.358,-113.359c-62.565,0 -113.359,50.794 -113.359,113.359l0,143.237c0,62.565 50.794,113.359 113.359,113.359c62.564,0 113.358,-50.794 113.358,-113.359l0,-143.237Z" style={{ fill: 'none', stroke: '#fff', strokeWidth: '20px' }} />
      </svg>
      <span className="scroll-text">ll</span>
    </div>
    </>
  );
};

export default SvgMouseFollow;