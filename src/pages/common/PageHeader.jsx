import React, { useState, useEffect, useRef, useMemo } from "react";


import { Canvas, useThree } from "@react-three/fiber";
import { PerspectiveCamera, Text } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";
import { lerp } from "three/src/math/MathUtils.js";

// const Menu = ({ setIsMenuOpen }) => {
//   // Refs
//   const containerRef = useRef();
//   const backgroundRef = useRef();
//   const timelines = useRef({});
//   const initialPosition = useRef(new THREE.Vector3(6, 3, 6));
//   const animating = useRef(false);
//   const opened = useRef(false);
//   const isHovered = useRef(false);

//   // Functions
//   const setTimelines = (camera) => {
//     let initialSpherical = new THREE.Spherical().setFromVector3(
//       initialPosition.current,
//     );

//     // Menu hover
//     let menuHoverTl = gsap.timeline().pause();
//     timelines.current.menuHover = menuHoverTl;

//     let menuSpherical = new THREE.Spherical(
//       initialPosition.current.length(),
//       Math.PI * 0.5,
//       Math.PI * 0.5,
//     );

//     let menuAnimation = { progress: 0 };

//     menuHoverTl.to(menuAnimation, {
//       progress: 1,
//       duration: 0.6,
//       onStart: () => {
//         animating.current = true;
//       },
//       onUpdate: () => {
//         let s = new THREE.Spherical(
//           initialSpherical.radius,
//           lerp(initialSpherical.phi, menuSpherical.phi, menuAnimation.progress),
//           lerp(
//             initialSpherical.theta,
//             menuSpherical.theta,
//             menuAnimation.progress,
//           ),
//         );

//         let position = new THREE.Vector3().setFromSpherical(s);
//         camera.position.copy(position);
//         camera.lookAt(0, 0, 0);
//         isHovered.current = false;
//       },
//       onComplete: () => {
//         isHovered.current = true;
//       },
//       onReverseComplete: () => {
//         animating.current = false;
//       },
//     });

//     // Close hover
//     let closeHoverTl = gsap.timeline().pause();
//     timelines.current.closeHover = closeHoverTl;

//     let closeSpherical = new THREE.Spherical(
//       initialPosition.current.length(),
//       Math.PI * 0.5,
//       0,
//     );

//     let closeAnimation = { progress: 0 };

//     closeHoverTl.to(closeAnimation, {
//       progress: 1,
//       duration: 0.6,
//       onStart: () => {
//         animating.current = true;
//       },
//       onUpdate: () => {
//         let s = new THREE.Spherical(
//           initialSpherical.radius,
//           lerp(
//             initialSpherical.phi,
//             closeSpherical.phi,
//             closeAnimation.progress,
//           ),
//           lerp(
//             initialSpherical.theta,
//             closeSpherical.theta,
//             closeAnimation.progress,
//           ),
//         );

//         let position = new THREE.Vector3().setFromSpherical(s);
//         camera.position.copy(position);
//         camera.lookAt(0, 0, 0);
//         isHovered.current = false;
//       },
//       onComplete: () => {
//         isHovered.current = true;
//       },
//       onReverseComplete: () => {
//         animating.current = false;
//       },
//     });

//     // Menu open
//     let menuOpenTl = gsap.timeline().pause();
//     timelines.current.menuOpen = menuOpenTl;

//     menuOpenTl.to(backgroundRef.current, {
//       opacity: 0.9,
//       ease: "power1.out",
//       duration: 0.2,
//     });

//     menuOpenTl.to(
//       backgroundRef.current,
//       {
//         left: 0,
//         right: 0,
//         top: 0,
//         bottom: 0,
//         ease: "power1.inOut",
//         duration: 1.7,
//       },
//       "<",
//     );
//   };

//   // Event handlers
//   const onMenuHover = () => {
//     if (animating.current) return;
//     timelines.current.menuHover.play();
//   };

//   const onMenuLeave = () => {
//     timelines.current.menuHover.reverse();
//   };

//   const onMenuClick = () => {
//     if (!isHovered.current) return;
//     console.log("menu click");
//     timelines.current.menuOpen.play();
//     setIsMenuOpen(true);
//   };

//   const onCloseHover = () => {
//     if (animating.current) return;
//     timelines.current.closeHover.play();
//   };

//   const onCloseLeave = () => {
//     timelines.current.closeHover.reverse();
//   };

//   const onCloseClick = () => {
//     if (!isHovered.current) return;
//     timelines.current.menuOpen.reverse();
//     setIsMenuOpen(false);
//   };

//   return (
//     <>
//       <div
//         className="fixed top-4 right-4 bottom-[calc(100%-6rem)] left-[calc(100%-6rem)] z-[1001] cursor-pointer"
//         ref={containerRef}
//       >
//         <Canvas>
//           <PerspectiveCamera
//             makeDefault
//             fov={10}
//             position={initialPosition.current}
//             onUpdate={(self) => {
//               self.lookAt(0, 0, 0);
//               setTimelines(self);
//             }}
//           />

//           <group>
//             {/* Top plane */}
//             <mesh rotation-x={-Math.PI * 0.5} position-y={0.5}>
//               <planeGeometry args={[0.9, 0.9]} />
//               <meshBasicMaterial color={0x323232} transparent opacity={0.1} />
//             </mesh>

//             <mesh rotation-x={-Math.PI * 0.5} position-y={0.5}>
//               <planeGeometry args={[0.9, 0.9]} />
//               <meshBasicMaterial color={0x323232} wireframe />
//             </mesh>

//             {/* Menu plane */}
//             <mesh
//               position-x={0.5}
//               rotation-y={Math.PI * 0.5}
//               onPointerMove={onMenuHover}
//               onPointerLeave={onMenuLeave}
//               onClick={onMenuClick}
//             >
//               <planeGeometry args={[0.9, 0.9]} />
//               <meshBasicMaterial color={0x323232} transparent opacity={0.1} />
//             </mesh>

//             <mesh position-x={0.5} rotation-y={Math.PI * 0.5}>
//               <planeGeometry args={[0.9, 0.9]} />
//               <meshBasicMaterial color={0x323232} wireframe />
//             </mesh>

//             {/* Close plane */}
//             <mesh
//               position-z={0.5}
//               onPointerMove={onCloseHover}
//               onPointerLeave={onCloseLeave}
//               onClick={onCloseClick}
//             >
//               <planeGeometry args={[0.9, 0.9]} />
//               <meshBasicMaterial color={0x323232} transparent opacity={0.1} />
//             </mesh>

//             <mesh position-z={0.5}>
//               <planeGeometry args={[0.9, 0.9]} />
//               <meshBasicMaterial color={0x323232} wireframe />
//             </mesh>
//           </group>
//         </Canvas>
//       </div>

//       <div
//         ref={backgroundRef}
//         className="fixed top-8 right-8 bottom-[calc(100%-5rem)] left-[calc(100%-5rem)] z-[999] bg-black opacity-0"
//       ></div>
//     </>
//   );
// };

const PageHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(section1Image);
  const [logoImage, setLogoImage] = useState(logo1); // State for the logo image
  const [cubeClass, setCubeClass] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setLogoImage((prevLogo) => (prevLogo === logo1 ? circleLogo : logo1)); // Toggle between the two logos
    }, 5000); // Adjust the interval as needed

    return () => clearInterval(interval);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClick = (event, image) => {
    event.preventDefault();
    setCurrentImage(image);
  };

  const handleMouseEnter = (className) => {
    setCubeClass(className);
  };

  const handleMouseLeave = () => {
    setCubeClass("");
  };

  /*
    Menu icon
  */
  // Refs
  const containerRef = useRef();
  const backgroundRef = useRef();
  const menuRef = useRef();
  const timelines = useRef({});
  const initialPosition = useRef(new THREE.Vector3(6, 3, 6));
  const animating = useRef(false);
  const animatingMenu = useRef(false);
  const opened = useRef(false);
  const isHovered = useRef(false);

  // Three.js objects
  const lineGeometry = useMemo(() => {
    let geometry = new THREE.BufferGeometry();

    let a = 0.45;

    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        new Float32Array([
          -a,
          -a,
          0, // v0
          -a,
          a,
          0, // v1
          a,
          a,
          0, // v2
          a,
          -a,
          0, // v3
        ]),
        3,
      ),
    );

    return geometry;
  }, []);

  const planeMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.1,
    });
  }, []);

  const lineMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: 0x323232,
    });
  }, []);

  const textMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: 0x323232,
    });
  }, []);

  // Functions
  const setTimelines = (camera) => {
    let initialSpherical = new THREE.Spherical().setFromVector3(
      initialPosition.current,
    );

    // Menu hover
    let menuHoverTl = gsap.timeline().pause();
    timelines.current.menuHover = menuHoverTl;

    let menuSpherical = new THREE.Spherical(
      initialPosition.current.length(),
      Math.PI * 0.5,
      Math.PI * 0.5,
    );

    let menuAnimation = { progress: 0 };

    menuHoverTl.to(menuAnimation, {
      progress: 1,
      duration: 0.6,
      onStart: () => {
        animating.current = true;
      },
      onUpdate: () => {
        let s = new THREE.Spherical(
          initialSpherical.radius,
          lerp(initialSpherical.phi, menuSpherical.phi, menuAnimation.progress),
          lerp(
            initialSpherical.theta,
            menuSpherical.theta,
            menuAnimation.progress,
          ),
        );

        let position = new THREE.Vector3().setFromSpherical(s);
        camera.position.copy(position);
        camera.lookAt(0, 0, 0);
        isHovered.current = false;
      },
      onComplete: () => {
        isHovered.current = true;
      },
      onReverseComplete: () => {
        animating.current = false;
      },
    });

    // Close hover
    let closeHoverTl = gsap.timeline().pause();
    timelines.current.closeHover = closeHoverTl;

    let closeSpherical = new THREE.Spherical(
      initialPosition.current.length(),
      Math.PI * 0.5,
      0,
    );

    let closeAnimation = { progress: 0 };

    closeHoverTl.to(closeAnimation, {
      progress: 1,
      duration: 0.6,
      onStart: () => {
        animating.current = true;
      },
      onUpdate: () => {
        let s = new THREE.Spherical(
          initialSpherical.radius,
          lerp(
            initialSpherical.phi,
            closeSpherical.phi,
            closeAnimation.progress,
          ),
          lerp(
            initialSpherical.theta,
            closeSpherical.theta,
            closeAnimation.progress,
          ),
        );

        let position = new THREE.Vector3().setFromSpherical(s);
        camera.position.copy(position);
        camera.lookAt(0, 0, 0);
        isHovered.current = false;
      },
      onComplete: () => {
        isHovered.current = true;
      },
      onReverseComplete: () => {
        animating.current = false;
      },
    });

    // Menu open
    let menuOpenTl = gsap.timeline().pause();
    timelines.current.menuOpen = menuOpenTl;

    menuOpenTl.to(backgroundRef.current, {
      opacity: 0.9,
      ease: "power1.in",
      duration: 0.02,
      onStart: () => {
        animatingMenu.current = true;
      },
      onReverseComplete: () => {
        animatingMenu.current = false;
        opened.current = false;
        closeHoverTl.reverse();
      },
    });

    menuOpenTl.to(
      lineMaterial.color,
      {
        r: 1,
        g: 1,
        b: 1,
        duration: 0.8,
      },
      "<",
    );

    menuOpenTl.to(
      textMaterial.color,
      {
        r: 1,
        g: 1,
        b: 1,
        duration: 0.8,
      },
      "<",
    );

    menuOpenTl.to(
      planeMaterial,
      {
        opacity: 0,
        duration: 0.8,
      },
      "<",
    );

    menuOpenTl.to(
      backgroundRef.current,
      {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        ease: "power1.inOut",
        duration: 2.2,
      },
      "<",
    );

    menuOpenTl.to(
      menuRef.current,
      {
        opacity: 1,
        duration: 0.4,
        ease: "power1.inOut",
      },
      "-=0.2",
    );

    menuOpenTl.fromTo(
      menuRef.current.querySelectorAll("a"),
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.7,
        stagger: 0.05,
        ease: "power1.inOut",
        onComplete: () => {
          animatingMenu.current = false;
          opened.current = true;
          menuHoverTl.reverse();
        },
      },
    );
  };

  // Event handlers
  const onMenuHover = () => {
    if (animating.current) return;
    timelines.current.menuHover.play();
  };

  const onMenuLeave = () => {
    if (animatingMenu.current) return;
    timelines.current.menuHover.reverse();
  };

  const onMenuClick = () => {
    if (!isHovered.current) return;
    console.log("menu click");
    timelines.current.menuOpen.play();
    setIsMenuOpen(true);
  };

  const onCloseHover = () => {
    if (animating.current) return;
    timelines.current.closeHover.play();
  };

  const onCloseLeave = () => {
    if (animatingMenu.current) return;
    timelines.current.closeHover.reverse();
  };

  const onCloseClick = () => {
    if (!isHovered.current || !opened.current) return;
    timelines.current.menuOpen.reverse();
    animatingMenu.current = true;
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <img
            src={logo1}
            alt="Logo"
            className={`logo1 h-40 ${logoImage === circleLogo ? "fade-out" : ""}`}
          />
          <img
            src={circleLogo}
            alt="Circle Logo"
            className={`logo1 h-40 ${logoImage === circleLogo ? "" : "fade-out"}`}
          />
        </div>

        {/* <Menu setIsMenuOpen={setIsMenuOpen} /> */}

        <div
          className="fixed top-4 right-4 bottom-[calc(100%-6rem)] left-[calc(100%-6rem)] z-[1001] cursor-pointer"
          ref={containerRef}
        >
          <Canvas>
            <PerspectiveCamera
              makeDefault
              fov={10}
              position={initialPosition.current}
              onUpdate={(self) => {
                self.lookAt(0, 0, 0);
                setTimelines(self);
              }}
            />

            <group>
              {/* Top plane */}
              <mesh
                rotation-x={-Math.PI * 0.5}
                position-y={0.5}
                material={planeMaterial}
              >
                <planeGeometry args={[0.9, 0.9]} />
                {/* <meshBasicMaterial color={0x000000} transparent opacity={0.9} /> */}
              </mesh>

              <lineLoop
                geometry={lineGeometry}
                rotation-x={-Math.PI * 0.5}
                position-y={0.5}
                material={lineMaterial}
              ></lineLoop>

              {/* Menu plane */}
              <mesh
                position-x={0.5}
                rotation-y={Math.PI * 0.5}
                onPointerMove={onMenuHover}
                onPointerLeave={onMenuLeave}
                onClick={onMenuClick}
                material={planeMaterial}
              >
                <planeGeometry args={[0.9, 0.9]} />
              </mesh>

              <lineLoop
                geometry={lineGeometry}
                position-x={0.5}
                rotation-y={Math.PI * 0.5}
                material={lineMaterial}
              ></lineLoop>

              <Text
                fontSize={0.3}
                position-x={0.501}
                rotation-y={Math.PI * 0.5}
                textAlign="center"
                material={textMaterial}
              >
                Menu
              </Text>

              {/* Close plane */}
              <mesh
                position-z={0.501}
                onPointerMove={onCloseHover}
                onPointerLeave={onCloseLeave}
                onClick={onCloseClick}
                material={planeMaterial}
              >
                <planeGeometry args={[0.9, 0.9]} />
                {/* <meshBasicMaterial color={0x000000} transparent opacity={0.9} /> */}
              </mesh>

              <lineLoop
                geometry={lineGeometry}
                position-z={0.5}
                material={lineMaterial}
              ></lineLoop>

              <Text
                fontSize={0.3}
                position-z={0.5}
                textAlign="center"
                material={textMaterial}
              >
                Close
              </Text>
            </group>
          </Canvas>
        </div>

        <div
          ref={backgroundRef}
          className="fixed top-8 right-8 bottom-[calc(100%-5rem)] left-[calc(100%-5rem)] z-[999] bg-black opacity-0"
        ></div>

        {/* <div className="menu-icon" onClick={toggleMenu}>
          <div className={`cube ${cubeClass}`} onMouseLeave={handleMouseLeave}>
            <div
              className="square"
              onMouseEnter={() => handleMouseEnter("rotate-close")}
            >
              Close
            </div>
            <div
              className="square2"
              onMouseEnter={() => handleMouseEnter("hover-menu")}
            >
              Menu
            </div>
            <div className="square3"></div>
          </div>
        </div> */}

        <div ref={menuRef} className={`menu-modal`}>
          {/* <div className="close-icon" onClick={toggleMenu}>
            ✖
          </div> */}
          <div className="menu-content">
            <div className="menu-items">
              <ul>
                <li>
                  <a
                    href="#section1"
                    onMouseEnter={(e) => handleMenuClick(e, section1Image)}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#section2"
                    onMouseEnter={(e) => handleMenuClick(e, section2Image)}
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#section3"
                    onMouseEnter={(e) => handleMenuClick(e, section3Image)}
                  >
                    Work
                  </a>
                </li>
                <li>
                  <a
                    href="#section4"
                    onMouseEnter={(e) => handleMenuClick(e, section4Image)}
                  >
                    Agency
                  </a>
                </li>
                <li>
                  <a
                    href="#section5"
                    onMouseEnter={(e) => handleMenuClick(e, section5Image)}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="menu-images">
              <img src={currentImage} alt="Section" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default PageHeader;
