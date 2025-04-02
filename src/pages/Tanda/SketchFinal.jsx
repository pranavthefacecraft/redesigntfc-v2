import gsap from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import { AiOutlineCaretRight, AiOutlineCaretLeft } from "react-icons/ai";

gsap.registerPlugin(useGSAP);

const SketchFinal = () => {
  const tl = useRef(gsap.timeline());
  const container = useRef();
  const line = useRef();
  const carets = useRef();
  const caretEvents = useRef({
    clickCheck: false,
    dragCheck: false,
  });
  const clippedImage = useRef();

  useEffect(() => {
    clippedImage.current.style.clipPath = `inset(0 50% 0 0)`;

    window.addEventListener("resize", () => {
      clippedImage.current.style.clipPath = `inset(0 50% 0 0)`;
      line.current.style.left = "50%";
    });
  }, []);

  const onMouseDown = (e) => {
    if (e.target.id == "carets") {
      caretEvents.current.clickCheck = false;
      return;
    }

    caretEvents.current.clickCheck = true;
  };

  const onMouseMove = (e) => {
    caretEvents.current.clickCheck = false;

    let rect = container.current.getBoundingClientRect();
    let offsetX = e.nativeEvent.clientX - rect.left;
    let offsetY = e.nativeEvent.clientY - rect.top;

    if (caretEvents.current.dragCheck) {
      line.current.style.left = offsetX + "px";
      carets.current.style.top = offsetY + "px";

      let current = line.current.style.left.substr(
        0,
        line.current.style.left.length - 2,
      );
      current = parseFloat(current);

      let clip = (1 - current / container.current.offsetWidth) * 100;

      clippedImage.current.style.clipPath = `inset(0 ${clip}% 0 0)`;
    }
  };

  const onMouseUp = (e) => {
    if (caretEvents.current.clickCheck) {
      tl.current.to(line.current, {
        left: e.nativeEvent.offsetX,
        onUpdate: () => {
          let current = line.current.style.left.substr(
            0,
            line.current.style.left.length - 2,
          );
          current = parseFloat(current);

          let clip = (1 - current / container.current.offsetWidth) * 100;

          clippedImage.current.style.clipPath = `inset(0 ${clip}% 0 0)`;
        },
      });

      tl.current.to(
        carets.current,
        {
          top: e.nativeEvent.offsetY,
        },
        "<",
      );
    }

    caretEvents.current.clickCheck = false;
  };

  const onMouseLeave = (e) => {};

  const onCaretMouseDown = (e) => {
    caretEvents.current.dragCheck = true;
  };

  const onCaretMouseMove = (e) => {};

  const onCaretMouseUp = (e) => {
    caretEvents.current.dragCheck = false;
  };

  return (
    <div
      className="solit-el-1 absolute inset-0 container mx-auto z-1000 h-full"
      ref={container}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
    >
      {/* Image1 */}
      <img
        src="/assets/tanda/sketch-b4-v1.png"
        className="pointer-events-none absolute top-0 left-0 z-50 h-full w-full object-cover select-none"
        draggable="false"
        ref={clippedImage}
      />

      {/* Image2 */}
      <img
        src="/assets/tanda/sketch-after-v1.png"
        className="pointer-events-none absolute top-0 left-0 h-full w-full object-cover select-none"
        draggable="false"
      />

      {/* Line */}
      <div
        ref={line}
        className="absolute top-0 bottom-0 left-1/2 z-[1000] w-1 -translate-x-1/2 bg-red-400"
      >
        <div
          ref={carets}
          id="carets"
          className="relative top-1/2 left-1/2 flex aspect-square h-12 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center gap-x-1"
          onMouseDown={onCaretMouseDown}
          onMouseMove={onCaretMouseMove}
          onMouseUp={onCaretMouseUp}
        >
          <AiOutlineCaretLeft
            color="#646464"
            className="pointer-events-none h-8"
          />
          <AiOutlineCaretRight
            color="#646464"
            className="pointer-events-none h-8"
          />
        </div>
      </div>
    </div>
  );
};
export default SketchFinal;
