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
    <div className="cube-card">
      <div ref={faces} className="cube-faces">
        <div className="cube-faces-container">
          <div
            ref={front}
            className="cube-face front border text-[140px] text-white"
          >
            {title}
          </div>
          <div ref={back} className="cube-face back">
            <img src={images[0]} />
          </div>
          <div ref={right} className="cube-face right border text-[140px] text-white">
            {title}
          </div>
          <div ref={left} className="cube-face left">
            <img src={images[0]} />
          </div>
          <div ref={top} className="cube-face top border text-[140px] text-white">
            {title}
          </div>
          <div ref={bottom} className="cube-face bottom">
            <img src={images[0]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CubeCard;
