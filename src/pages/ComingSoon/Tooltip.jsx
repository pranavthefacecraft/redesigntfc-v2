import React, { useEffect, useRef, useState } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import useTooltipStore from './TooltipStore'

const Tooltip = ({ children }) => {
  const tooltipVisible = useTooltipStore(s => s.tooltipVisible)
  const forceHide = useTooltipStore(s => s.forceHide)
  const mouse = useTooltipStore((state) => state.mouse)
  const tooltipRef = useRef(null)

  // Local state to keep tooltip in DOM until fade-out finishes
  const [shouldRender, setShouldRender] = useState(false)

  // Position spring for smooth movement
  const [{ left, top }, api] = useSpring(() => ({
    left: mouse?.x ?? 0,
    top: (mouse?.y ?? 0) - 50,
    config: { tension: 300, friction: 30 },
  }))

  useEffect(() => {
    api.start({
      left: mouse?.x ?? 0,
      top: (mouse?.y ?? 0) - 50,
    })
  }, [mouse, api, shouldRender])

  // Show/hide logic with fade-out
  useEffect(() => {
    if (tooltipVisible && !forceHide) {
      setShouldRender(true)
      if (tooltipRef.current) {
        gsap.to(tooltipRef.current, {
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }
    } else if (shouldRender) {
      // Fade out, then remove from DOM
      if (tooltipRef.current) {
        gsap.to(tooltipRef.current, {
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          overwrite: 'auto',
          onComplete: () => setShouldRender(false),
        })
      } else {
        setShouldRender(false)
      }
    }
    // eslint-disable-next-line
  }, [tooltipVisible, forceHide])

  if (!shouldRender) return null

  // Render in portal to body for best overlay behavior
  return createPortal(
    <animated.div
      ref={tooltipRef}
      className="fixed z-50 pointer-events-none min-w-[120px] px-[1.5em] py-[0.9em] rounded-[1.1em] bg-transparent"
      style={{
        left,
        top,
        transform: 'translate(-50%, 0)', // Center horizontally
        boxShadow: 'inset 0px 0px 11px 5px rgba(255,255,255,0.6)',
        opacity: 0, // Start hidden, GSAP will animate
      }}
    >
      <div
        className="font-[Futura] text-[1.3em] tracking-[0.06em]"
        style={{
          color: '#F9E3E7',
          textShadow:
            '-1px -1px 0 #bf1736, 1px -1px 0 #bf1736, -1px 1px 0 #bf1736, 1px 1px 0 #bf1736',
        }}
      >
        {children}
      </div>
    </animated.div>,
    document.body
  )
}

export default Tooltip