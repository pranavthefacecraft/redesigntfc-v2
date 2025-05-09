import {
  OrbitControls,
  OrthographicCamera,
  useTexture,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import vs from "./shadersMobile/footer/vs.glsl?raw";
import fs from "./shadersMobile/footer/fs.glsl?raw";
import pointerVs from "./shadersMobile/pointer/vs.glsl?raw";
import pointerFs from "./shadersMobile/pointer/fs.glsl?raw";
import effectFs from "./shadersMobile/effect/fs.glsl?raw";
import { EffectComposer, EffectPass, RenderPass, Effect } from "postprocessing";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import SplitType from "split-type";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const DEBUG = false;
let progress = 0;

class CustomEffect extends Effect {
  constructor() {
    super("CustomEffect", effectFs, {
      uniforms: new Map([["uMaskTexture", new THREE.Uniform()]]),
    });
  }
}

const Scene = ({ titleSize }) => {
  const { size, gl, scene } = useThree();
  const [particleAlpha] = useTexture(
    ["/assets/solit/footer-particle-v5.png"],
    (loaded) => {
      loaded.forEach((texture) => {
        texture.flipY = false;
      });
    }
  );

  // Refs and states
  const cameraRef = useRef();
  const pointerRef = useRef();
  const baseRef = useRef();
  const [pointerPosition, setPointerPosition] = useState(new THREE.Vector2());

  // Uniforms
  const uniforms = useRef({
    uAlpha: new THREE.Uniform(particleAlpha),
    uGap: new THREE.Uniform(0),
    uProgress: new THREE.Uniform(0),
  });

  // Geometry
  const particleGeometry = useMemo(() => {
    let positions = [];
    let offsets = [];
    let evens = [];

    let count = 15;

    for (let i = -count; i < count; i++) {
      for (let j = -count; j < count; j++) {
        let offset = i % 2 == 0 ? 1.0 : 0;
        let even = j % 2 == 0 ? 1.0 : 0;
        positions.push(i, 0, j);
        offsets.push(offset);
        evens.push(even);
      }
    }

    let geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(positions), 3)
    );
    geometry.setAttribute(
      "aOffset",
      new THREE.BufferAttribute(new Float32Array(offsets), 1)
    );
    geometry.setAttribute(
      "aEven",
      new THREE.BufferAttribute(new Float32Array(evens), 1)
    );

    return geometry;
  }, []);

  // Postprocessing
  const postprocessing = useRef({});

  useEffect(() => {
    let maskScene = new THREE.Scene();
    maskScene.add(pointerRef.current, baseRef.current);

    let renderTarget = new THREE.WebGLRenderTarget(size.width, size.height);

    let composer = new EffectComposer(gl);
    composer.addPass(new RenderPass(scene, cameraRef.current));
    // composer.addPass(new EffectPass(cameraRef.current, new NoiseEffect({})));
    let effect = new CustomEffect();
    composer.addPass(new EffectPass(cameraRef.current, effect));

    postprocessing.current = {
      maskScene,
      renderTarget,
      composer,
      effect,
    };
  }, []);

  // Timelines
  const pointerTl = useRef();
  useEffect(() => {
    let tl = gsap.timeline().reverse().pause();

    tl.to(pointerRef.current.scale, {
      x: titleSize * 0.35,
      y: titleSize * 0.35,
      z: titleSize * 0.35,
      duration: 0.4,
      ease: "power2.inOut",
    });

    pointerTl.current = tl;

    return () => {
      if (pointerTl.current) {
        pointerTl.current.kill();
      }
    };
  }, [titleSize]);

  // Animation loop
  useFrame(() => {
    uniforms.current.uProgress.value = progress;

    let pc = postprocessing.current;

    gl.setRenderTarget(pc.renderTarget);
    gl.clear();
    gl.render(postprocessing.current.maskScene, cameraRef.current);

    gl.setRenderTarget(null);

    pc.effect.uniforms.get("uMaskTexture").value = pc.renderTarget.texture;

    pc.composer.render();
  }, 1);

  useEffect(() => {
    let gap;
    if (size.width < 512) {
      gap = 72;
    } else if (size.width < 1024) {
      gap = 128;
    } else {
      gap = 156;
    }

    postprocessing.current.composer.setSize(size.width, size.height);
    postprocessing.current.renderTarget.setSize(size.width, size.height);

    uniforms.current.uGap.value = gap;
  }, [size]);

  return (
    <>
      <OrthographicCamera
        ref={cameraRef}
        makeDefault
        left={-size.width * 0.5}
        right={size.width * 0.5}
        top={size.height * 0.5}
        bottom={-size.height * 0.5}
        near={0.1}
        far={1000}
        position={[0, 10, 0]}
        onUpdate={(self) => {
          self.lookAt(0, 0, 0);
          self.updateProjectionMatrix();
        }}
      />

      <points geometry={particleGeometry}>
        <shaderMaterial
          vertexShader={vs}
          fragmentShader={fs}
          uniforms={uniforms.current}
          transparent
          depthWrite={false}
        />
      </points>

      {DEBUG && (
        <>
          <OrbitControls />

          <axesHelper args={[1000]} />

          <mesh
            rotation-x={-Math.PI * 0.5}
            scale={[size.width, size.height, 1]}
          >
            <planeGeometry
              args={[
                1,
                1,
                Math.ceil(size.width / 50),
                Math.ceil(size.height / 50),
              ]}
            />
            <meshBasicMaterial wireframe transparent opacity={0.2} />
          </mesh>
        </>
      )}

      <mesh
        ref={baseRef}
        rotation-x={-Math.PI * 0.5}
        scale={[size.width, size.height, 1]}
        onPointerEnter={() => {
          if (pointerTl.current) {
            pointerTl.current.play();
          }
        }}
        onPointerMove={(e) => {
          setPointerPosition(e.point);
        }}
        onPointerLeave={(e) => {
          if (pointerTl.current) {
            pointerTl.current.reverse();
          }
        }}
      >
        <planeGeometry
          args={[1, 1, Math.ceil(size.width / 50), Math.ceil(size.height / 50)]}
        />
        <meshBasicMaterial
          color={0xffffff}
          depthWrite={false}
          transparent
          opacity={1}
        />
      </mesh>

      {/* Pointer */}
      <mesh
        ref={pointerRef}
        rotation-x={-Math.PI * 0.5}
        // scale={[titleSize * 0.5, titleSize * 0.5, titleSize * 0.5]}
        scale={[0, 0, 0]}
        position={[pointerPosition.x, 0, pointerPosition.z]}
        renderOrder={2}
      >
        <circleGeometry args={[1.25, 64]} />
        <shaderMaterial
          vertexShader={pointerVs}
          fragmentShader={pointerFs}
          depthWrite={false}
          depthTest={false}
          transparent
        />
      </mesh>
    </>
  );
};

const PageFooter = () => {
  const wrapper = useRef();
  const scroller = useRef();

  const containerRef = useRef();
  const container2Ref = useRef();
  const titleRef = useRef();

  const [titleSize, setTitleSize] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    setMousePosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    let onResize = () => {
      setTitleSize(titleRef.current.offsetWidth);
    };
    onResize();

    window.addEventListener("resize", onResize);

    () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useGSAP(() => {
    let splitted = new SplitType(titleRef.current);
    splitted.words.forEach((word) => {
      word.style.opacity = 0;
      word.style.transform = "translateY(550px)";
    });

    gsap.to(splitted.words, {
      scrollTrigger: {
        trigger: containerRef.current,
        // markers: true,
        start: "45% 75%",
        toggleActions: "restart none none reverse",
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power1.out",
      onUpdate: () => {
        // refactor needed
        progress = parseFloat(splitted.words[0].style.opacity);
      },
    });

    window.addEventListener("resize", () => ScrollTrigger.refresh());

    let tl = gsap.timeline();

    tl.to(container2Ref.current, {});

    tl.to(container2Ref.current, {
      display: "block",
    });

    tl.fromTo(
      container2Ref.current.querySelector("#footer-bg"),
      {
        scale: 0,
        opacity: 0,
        y: "40%",
      },
      {
        scale: 1,
        opacity: 1,
        y: 0,
      },
      "<"
    );

    tl.to(
      titleRef.current,
      {
        color: "#ffffff",
        scale: 1.2,
        ease: "power4.in",
      },
      "<"
    );

    tl.fromTo(
      container2Ref.current.querySelectorAll(".footer-link"),
      {
        opacity: 0,
        y: 32,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.04,
      }
    );

    tl.fromTo(
      container2Ref.current.querySelectorAll(".cloud-img"),
      {
        opacity: 0,
        y: 32,
        x: 200, // Start from the right
      },
      {
        opacity: 1,
        y: 0,
        x: 0, // Move to the center
        stagger: 0.04,
        ease: "power2.out", // Smooth easing
      }
    );

    tl.fromTo(
      container2Ref.current.querySelectorAll(".footer-detail"),
      {
        opacity: 0,
        y: 32,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.04,
      }
    );

    ScrollTrigger.create({
      animation: tl,
      trigger: wrapper.current,
      top: "top top",
      end: "+=600% bottom",
      // markers: true,
      pin: true,
      scrub: 1.2,
      onEnter: () => {
        // console.log("enter");
      },
      onUpdate: (self) => {
        // console.log(self.progress);
      },
      onLeaveBack: () => {
        // console.log("leave");
      },
    });

    ScrollTrigger.refresh();
  });

    
  const [isWhatsappHovering, setIsWhatsappHovering] = useState(false);
  const [whatsappMousePosition, setWhatsappMousePosition] = useState({ x: 0, y: 0 });
  
  
  const handleWhatsappMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setWhatsappMousePosition({ x, y });
  };
  
  const handleWhatsappMouseEnter = () => setIsWhatsappHovering(true);
  const handleWhatsappMouseLeave = () => {
    setIsWhatsappHovering(false);
    setWhatsappMousePosition({ x: 0, y: 0 });
  };


  return (
    <>
      <div ref={wrapper} className="relative h-screen w-full overflow-hidden block sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden">
        <div
          ref={containerRef}
          className="absolute inset-0 flex flex-col items-center gap-4 lg:flex-row lg:justify-between"
        >
          <h2
            ref={titleRef}
            className="Futura-PT-Heavy text-white pointer-events-none absolute top-1/2 left-1/2 z-[60] -translate-x-1/2 -translate-y-1/2 text-center text-5xl md:text-4xl lg:text-[60px] xl:text-[60px] 2xl:text-[140px]"
          >
            ELEVATE YOUR <br /> BRAND
          </h2>

          <div className="absolute top-0 left-0 flex h-screen w-full items-center justify-center">
            <div className="absolute inset-0 bg-black">
              <Canvas
                gl={{
                  powerPreference: "high-performance",
                  antialias: false,
                  stencil: false,
                  depth: false,
                }}
              >
                <Scene titleSize={titleSize} />
              </Canvas>
            </div>
          </div>
        </div>

        <div
          ref={container2Ref}
          className="absolute top-0 left-0 z-50 hidden h-screen w-full"
        >
          <div className="font-primary relative z-50 flex h-screen w-full flex-col items-center gap-4 lg:flex-row lg:justify-between">
            {/* Footer elements */}
            <div className="absolute inset-0 z-50 mx-auto flex flex-col items-center justify-between gap-y-12 p-8 lg:w-fit lg:px-0 lg:py-24 ">
              {/* Links */}
              <div className="font-primary relative flex cursor-pointer flex-wrap items-center justify-center gap-6 font-light text-white lg:text-xl mt-5">
                <a href="#" className="footer-link hover:text-[#bf1736]">
                  HOME
                </a>
                <a href="#" className="footer-link hover:text-[#bf1736]">
                  WORK
                </a>
                <a href="#" className="footer-link hover:text-[#bf1736]">
                  AGENCY
                </a>
                <a href="#" className="footer-link hover:text-[#bf1736]">
                  SERVICES
                </a>
                <a href="#" className="footer-link hover:text-[#bf1736]">
                  CONTACT
                </a>
              </div>
              

              {/* Title */}
              <div className="relative">
                {/* Contact */}
                <div className="absolute top-full right-0 left-0 flex flex-col items-center gap-y-2 -mt-65 text-white lg:-right-16 lg:-left-16 lg:-mt-2 lg:-translate-y-full lg:flex-row lg:justify-between xl:-mt-3">
                  <p className="footer-detail font-light underline opacity-60 lg:text-lg xl:text-2xl">
                    <a
                      href="mailto:hello@thefacecraft.com"
                      className="text-white hover:text-[#bf1736]"
                    >
                      hello@thefacecraft.com
                    </a>
                  </p>

                  <div className="footer-detail h-12 w-36 flex items-center justify-around text-red-500 text-2xl">
  <a href="#" className="transition-transform duration-200 hover:scale-125">
    <FaFacebook />
  </a>
  <a href="#" className="transition-transform duration-200 hover:scale-125">
    <FaTwitter />
  </a>
  <a href="#" className="transition-transform duration-200 hover:scale-125">
    <FaYoutube />
  </a>
</div>
                </div>
                <h2 className="Futura-PT-Heavy pointer-events-none relative translate-y-0 text-center text-4xl text-white opacity-0 md:text-4xl lg:text-8xl xl:text-[144px]">
                  ELEVATE YOUR <br /> BRAND
                </h2>

                
                <div
                  className="cloud-img absolute -top-20 right-0 w-auto border-0 p-8 border-amber-50 z-[2000] overflow-hidden  "
                  onMouseMove={handleMouseMove}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <img
                    src="/assets/cloud.png"
                    title=""
                    alt=""
                    className={`pointer-events-none relative  w-[400px]  right-0 transition-transform duration-300 ${
                      isHovering ? "scale-105" : ""
                    }`}
                    style={{
                      transform: isHovering
                        ? `translate(${mousePosition.x * 0.1}px, ${
                            mousePosition.y * 0.1
                          }px)`
                        : "translate(0, 0)",
                    }}
                  />
                </div>
              </div>

              {/* Details */}
              <div className="flex w-full flex-col items-center justify-center gap-y-4 lg:relative lg:w-[calc(100%+8rem)] lg:flex-row lg:justify-between">
                {/* Whatsapp */}
                
<div
  className="footer-detail shrink-0 -left-10 relative"
  onMouseMove={handleWhatsappMouseMove}
  onMouseEnter={handleWhatsappMouseEnter}
  onMouseLeave={handleWhatsappMouseLeave}
>
  <img
    src="/assets/solit/thumb_whatsapp.png"
    className={`cursor-pointer h-12 lg:h-16 pointer-events-none transition-transform duration-300 ${
      isWhatsappHovering ? "scale-115" : ""
    }`}
    style={{
      transform: isWhatsappHovering
        ? `translate(${whatsappMousePosition.x * 0.1}px, ${whatsappMousePosition.y * 0.1}px)`
        : "translate(0, 0)",
    }}
  />
  <p className="text-md absolute bottom-0 left-3/4 w-max font-medium text-white opacity-90">
    <a href="#">Chat with us </a>
  </p>
</div>


                {/* Logo */}
                <div className="flex w-full flex-col lg:absolute lg:top-1/2 lg:left-1/2 lg:w-fit lg:-translate-x-1/2 lg:-translate-y-1/2 lg:gap-y-2">
                  <p className="text-center text-xl font-bold tracking-widest lg:text-3xl">
                    <span className="text-customred footer-detail inline-block">
                      the
                    </span>
                    <span className="footer-detail inline-block text-white">
                      facecraft
                    </span>
                  </p>

                  <div className="footer-detail flex w-full justify-center gap-x-4 text-sm text-white opacity-60 lg:text-base">
                    <p>Malaysia</p>
                    <p>Switzerland</p>
                  </div>
                </div>

                {/* Terms of service */}
                <div className="footer-detail mt-2 flex w-full items-center justify-center gap-x-4 text-white opacity-90 lg:w-fit lg:flex-col lg:items-start lg:gap-y-2">
                  <a href="#" className="hover:text-[#bf1736]">
                    Privacy Policy
                  </a>
                  <a href="#" className="hover:text-[#bf1736]">
                    Terms of Service
                  </a>
                </div>
              </div>
            </div>

            {/* Background image */}
            <img
              id="footer-bg"
              src="/assets/solit/thumb_BG.png"
              className="pointer-events-none absolute top-0 left-0 -z-50 h-full w-full origin-bottom object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PageFooter;
