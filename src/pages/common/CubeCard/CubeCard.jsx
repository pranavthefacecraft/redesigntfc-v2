import "./CubeCard.css";
import { useRef, useEffect } from "react";
import { Color } from "three";

const CubeCard = ({ title, images, color }) => {
  const faces = useRef();
  const front = useRef();
  const back = useRef();
  const right = useRef();
  const left = useRef();
  const top = useRef();
  const bottom = useRef();

  useEffect(() => {
    let onResize = () => {
      let hw = faces.current.offsetWidth * 0.5;

      front.current.style.transform = `rotateY(0deg) translateZ(${hw}px) `;
      right.current.style.transform = `rotateY(90deg) translateZ(${hw}px)`;
      back.current.style.transform = `rotateY(180deg) translateZ(${hw}px)`;
      left.current.style.transform = `rotateY(-90deg) translateZ(${hw}px)`;
      top.current.style.transform = `rotateX(90deg) translateZ(${hw}px)`;
      bottom.current.style.transform = `rotateX(-90deg) translateZ(${hw}px)`;
    };
    onResize();

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    let color1 = new Color(color);
    let hsl = {};
    color1.getHSL(hsl);

    let { h, s, l } = hsl;

    let color2 = color1.clone().setHSL(h, s, l * 0.8);
    let color3 = color1.clone().setHSL(h, s, l * 0.65);
    let color4 = color1.clone().setHSL(h, s, l * 0.5);

    // --shadow-color-1: #7b76c4;
    // --shadow-color-2: #7b76c4;
    // --active-color: #b1acf5;
    // --inactive-color: #7b76c4;

    faces.current.style.cssText = `
      --active-color: #${color1.getHexString()};
      --shadow-color-1: #${color2.getHexString()};
      --shadow-color-2: #${color2.getHexString()};
      --inactive-color: #${color3.getHexString()};
    `;
  }, []);

  return (
    <div className="cube-card group">
      <div ref={faces} className="cube-faces ">
        <div 
          className="cube-faces-container" 
          style={{ animationDelay: `-${Math.random() * 50}s` }}
        >
          <div
            ref={front}
            className="cube-face front text-[40px] sm:text-[40px] md:text-[40px] lg:text-[80px] xl:text-[60px] 2xl:text-[60px] text-white leading-5"
          >
            {title}
            
          </div>
          <div ref={back} className="cube-face back border text-[40px] sm:text-[40px] md:text-[40px] lg:text-[80px] xl:text-[60px] 2xl:text-[60px] text-white leading-5">
          {title}
          </div>
          <div ref={right} className="cube-face right border text-[40px] sm:text-[40px] md:text-[40px] lg:text-[80px] xl:text-[80px] 2xl:text-[120px] text-white">
          <img src={images[2]} />
          </div>
          <div ref={left} className="cube-face left">
          <img src={images[3]} />
          </div>
          <div ref={top} className="cube-face top border text-[40px] sm:text-[40px] md:text-[40px] lg:text-[80px] xl:text-[80px] 2xl:text-[120px] text-white leading-0">
          <img src={images[0]} />
          </div>
          <div ref={bottom} className="cube-face bottom">
          <img src={images[1]} />
          </div>
          
        </div>
        <div className="opacity-0 group-hover:opacity-100 duration-300 absolute inset-x-0 -top-20 -left-20 flex justify-center items-end text-xl bg-gray-200 text-black font-semibold rounded-3xl w-[600px] h-[600px] "> <img className="object-cover w-[600px] h-[600px] rounded-[20px] border-1" src={images[0]} /></div>
      </div>
      
    </div>
    
  );
};

export default CubeCard;
