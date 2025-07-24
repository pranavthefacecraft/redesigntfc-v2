import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import useComingSoonStore from './ComingSoonStore'
import { useSpring, animated, useSpringRef, useChain } from '@react-spring/web'

const CUBE_IMGS = [
  '/Comingsoon/Images/Cube.png',
  '/Comingsoon/Images/cubeone.png',
  '/Comingsoon/Images/cubethree.png'
]

// Only two clouds for step-by-step debugging
const CLOUDS = [
  {
    src: '/Comingsoon/Images/cloudtwo.png',
    style: 'top-[5vh] left-[10vw]',
    from: { x: '-50vw', y: 0 },
    opacity: 1,
  },
  {
    src: '/Comingsoon/Images/cloudtwo.png',
    style: 'top-[10vh] right-[10vw]',
    from: { x: 0, y: '-50vh' },
    opacity: 1,
  },
  {
    src: '/Comingsoon/Images/cloudone.png',
    style: 'top-[30vh] left-[20vw]',
    from: { x: '-30vw', y: '35vh' }, // changed from '-60vw' to '-30vw'
    opacity: 0.6,
  },
  {
    src: '/Comingsoon/Images/cloudtwo.png',
    style: 'top-[50vh] left-[60vw]', // Place it visibly on the right
    from: { x: '90vw', y: 0 },      // Start far right
    opacity: 0.5,
  },
  {
    src: '/Comingsoon/Images/cloudthree.png',
    style: 'top-[70vh] left-[30vw]',
    from: { x: 0, y: '-60vh' },
    opacity: 0.4,
  },
]

// Text function
function Text({ trigger, onTextAnimationEnd }) {
  const logoRef = useSpringRef()
  const textRef = useSpringRef()

  const logoSpring = useSpring({
    ref: logoRef,
    from: { opacity: 0, transform: 'translateY(-100vh)' },
    to: trigger
      ? { opacity: 1, transform: 'translateY(0)' }
      : { opacity: 0, transform: 'translateY(-100vh)' },
    config: { tension: 60, friction: 18 }, // Slower transition
  })

  const textSpring = useSpring({
    ref: textRef,
    from: { opacity: 0, transform: 'translateY(-100vh)' },
    to: trigger
      ? { opacity: 1, transform: 'translateY(0)' }
      : { opacity: 0, transform: 'translateY(-100vh)' },
    config: { tension: 60, friction: 18 }, // Slower transition
    delay: 150,
    onRest: () => {
      if (trigger && onTextAnimationEnd) onTextAnimationEnd();
    },
  })

  useChain(trigger ? [logoRef, textRef] : [], [0, 0.2])

  return (
    <div className="w-full h-full flex items-center justify-center pt-0">
      <animated.div style={logoSpring} className="flex flex-col items-center">
        <img
          src="/Comingsoon/Images/tfclogo.png"
          alt="Logo"
          className="w-[90%] h-auto mb-4"
        />
        <animated.span style={textSpring} className="futura-light text-[#bf1736] text-3xl md:text-4xl font-bold">
          Coming Soon..
        </animated.span>
      </animated.div>
    </div>
  )
}

// Cubes function
function Cubes() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {CUBE_IMGS.map((src, idx) => (
        <img key={idx} src={src} alt={`Cube ${idx + 1}`} className="w-16 h-16 mx-2" />
      ))}
    </div>
  )
}

// Cloud function (two clouds)
function Cloud({ trigger }) {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1536)
  // Create a ref for each cloud
  const cloudRefs = React.useRef(CLOUDS.map(() => React.createRef()))

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth > 1536)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    CLOUDS.forEach((cloud, i) => {
      const ref = cloudRefs.current[i]
      if (ref && ref.current) {
        gsap.set(ref.current, {
          opacity: 0,
          x: cloud.from.x,
          y: cloud.from.y || 0,
        })

        if (trigger) {
          if (i === 0) {
            gsap.to(ref.current, {
              opacity: cloud.opacity,
              x: isLargeScreen ? '-19vw' : '-19vw',
              y: 0,
              duration: 1.8,
              ease: 'power2.out',
              delay: 0.3 + i * 0.2,
              onComplete: () => {
                gsap.to(ref.current, {
                  y: 20,
                  duration: 3.5,
                  repeat: -1,
                  yoyo: true,
                  ease: 'sine.inOut',
                })
              },
            })
          } else if (i === 1) {
            gsap.to(ref.current, {
              opacity: cloud.opacity,
              x: 0,
              y: isLargeScreen ? '-20vh' : '-23vh',
              duration: 1.8,
              ease: 'power2.out',
              delay: 0.3 + i * 0.5,
              onComplete: () => {
                gsap.to(ref.current, {
                  y: isLargeScreen ? '-18vh' : '-20vh',
                  duration: 2.5,
                  repeat: -1,
                  yoyo: true,
                  ease: 'sine.inOut',
                })
              },
            })
          } else if (i === 2) {
            // Third cloud: animate x from -30vw to 0
            gsap.to(ref.current, {
              opacity: cloud.opacity,
              x: '-5vw',
              y: '35vh',
              duration: 1.8,
              ease: 'power2.out',
              delay: 0.3 + i * 0.2,
              onComplete: () => {
                gsap.to(ref.current, {
                  y: '36vh',
                  duration: 2.5,
                  repeat: -1,
                  yoyo: true,
                  ease: 'sine.inOut',
                })
              },
            })
          } else if (i === 3) {
            // Fourth cloud: animate x from initial to 90vw
            gsap.to(ref.current, {
              opacity: cloud.opacity,
              x: '20vw', // Animate to its styled position
              y: 0,
              duration: 1.8,
              ease: 'power2.out',
              delay: 0.3 + i * 0.2,
              onComplete: () => {
                gsap.to(ref.current, {
                  y: 20,
                  duration: 3.5,
                  repeat: -1,
                  yoyo: true,
                  ease: 'sine.inOut',
                })
              },
            })
          } else if (i === 4) {
            gsap.to(ref.current, {
              opacity: cloud.opacity,
              x: 0,
              y: '-50vh',
              duration: 1.8,
              ease: 'power2.out',
              delay: 0.3 + i * 0.5,
              onComplete: () => {
                gsap.to(ref.current, {
                  y: '-51vh',
                  duration: 1.0,
                  repeat: -1,
                  yoyo: true,
                  ease: 'sine.inOut',
                })
              },
            })
          }
        } else {
          gsap.killTweensOf(ref.current)
          gsap.set(ref.current, {
            opacity: 0,
            x: cloud.from.x,
            y: cloud.from.y || 0,
          })
        }
      }
    })
  }, [trigger, isLargeScreen])

  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none z-10">
      {CLOUDS.map((cloud, i) => {
        // Responsive size per cloud
        let responsiveSize
        if (i === 0) {
          responsiveSize = isLargeScreen ? 'w-110' : 'w-90'
        } else if (i === 1) {
          responsiveSize = isLargeScreen ? 'w-120' : 'w-100'
        } else if (i === 2) {
          responsiveSize = isLargeScreen ? 'w-55' : 'w-50'
        } else if (i === 3) {
          responsiveSize = isLargeScreen ? 'w-80' : 'w-60'
        } else if (i === 4) {
          responsiveSize = isLargeScreen ? 'w-45' : 'w-40'
        }
        return (
          <img
            key={i}
            ref={cloudRefs.current[i]}
            src={cloud.src}
            alt={`Cloud ${i + 1}`}
            style={{
              position: 'absolute',
            }}
            className={`${cloud.style} ${responsiveSize}`}
          />
        )
      })}
    </div>
  )
}

const TestFloatingCube = () => {
  const wrapperRef = useRef()
  const cube022CloudGsapTriggered = useComingSoonStore(s => s.cube022CloudGsapTriggered)
  const [cloudTrigger, setCloudTrigger] = useState(false)
  const [textTrigger, setTextTrigger] = useState(false)
  const [buttonTrigger, setButtonTrigger] = useState(false)

  // Button opacity-only spring
  const buttonSpring = useSpring({
    opacity: buttonTrigger ? 1 : 0,
    config: { tension: 120, friction: 14 },
  })

  useEffect(() => {
    if (wrapperRef.current) {
      gsap.set(wrapperRef.current, { opacity: 0 })
      if (cube022CloudGsapTriggered) {
        gsap.to(wrapperRef.current, {
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          onComplete: () => {
            setTimeout(() => setCloudTrigger(true), 100)
            setTimeout(() => setTextTrigger(true), 2000)
          }
        })
      }
    }
  }, [cube022CloudGsapTriggered])

  // Callback for when text animation completes
  const handleTextAnimationEnd = () => {
    setButtonTrigger(true)
  }

  return (
    <div
      ref={wrapperRef}
      className="pointer-events-none fixed inset-0 z-[99] w-screen h-screen flex flex-col"
    >
      <div className="pointer-events-none fixed inset-0 z-30 w-screen h-screen flex flex-col items-center justify-center">
        <Text trigger={textTrigger} onTextAnimationEnd={handleTextAnimationEnd} />
        <div className="flex justify-center w-full">
          <animated.button
            style={buttonSpring}
            className="futura-light mt-0 mb-15 px-6 py-1 bg-[#bf1736] text-white rounded-lg shadow-lg font-bold text-lg pointer-events-auto hover:bg-[#a0142d] transition"
            onClick={() => {
              window.open(
                "https://mail.google.com/mail/?view=cm&fs=1&to=info@thefacecraft.com&su=Contact%20Request&body=Hi%2C%20I%20would%20like%20to%20get%20in%20touch.",
                "_blank"
              );
            }}
          >
            Contact Us
          </animated.button>
        </div>
      </div>
      {/* <div className="pointer-events-none fixed inset-0 z-20 w-screen h-screen flex flex-col">
        <Cubes />
      </div> */}
      <Cloud trigger={cloudTrigger} />
    </div>
  )
}

export default TestFloatingCube

