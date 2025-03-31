import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { useRef } from "react";
import CubeCard from "../common/CubeCard/CubeCard";

const ProjectCard = ({ name, image }) => {
  const expandTimeline = useRef();
  const imageRef = useRef();
  const titleRef = useRef();

  useGSAP(() => {
    let tl = gsap.timeline().pause().reverse();

    tl.to(imageRef.current, {
      top: -64,
      duration: 0.4,
      ease: "power4.inOut",
    });

    tl.to(
      titleRef.current,
      {
        y: 8,
        opacity: 0,
        duration: 0.3,
        ease: "power4.inOut",
      },
      "<",
    );

    expandTimeline.current = tl;
  });

  const onMouseEnter = () => {
    expandTimeline.current.play();
  };

  const onMouseLeave = () => {
    expandTimeline.current.reverse();
  };

  return (
    <div className="relative flex w-full flex-col gap-y-4">
      <h4 ref={titleRef} className="text-xl lg:text-2xl xl:text-3xl">
        {name}
      </h4>

      <div
        className="relative aspect-square w-full"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div
          ref={imageRef}
          className="absolute inset-0 cursor-pointer overflow-hidden rounded-xl"
        >
          <img src={image} className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  );
};

const MoreProjects = () => {
  return (
    <>
      <div className="container mx-auto flex flex-col items-center gap-y-0 p-0 md:gap-y-0 lg:gap-y-0 lg:px-0 lg:py-0 lg:pb-0 xl:gap-y-20 xl:pb-0">
        <div className="flex w-full flex-col gap-4 md:flex-row lg:gap-8 xl:gap-16">
          <CubeCard
            title="Tanda"
            images={[
              "tanda/main.png",
              // "tanda/tab-bg-v1.png",
              // "tanda/tab-bg-v2.png",
              // "tanda/laptop.png",
              // "tanda/section-2a-2048x1365.png",
              // "tanda/sketch-after.png",
            ]}
            color="#b1acf5"
          />

          <CubeCard title="Solit" images={["solit/main.png"]} color="#b1acf5" />
          <CubeCard
            title="Towork"
            images={["solit/icon.png"]}
            color="#b1acf5"
          />
        </div>

        <div className="flex w-full flex-col gap-0 md:flex-row lg:gap-0 xl:gap-0">
          <CubeCard
            title="Title1"
            images={["solit/row1.jpg"]}
            color="#b1acf5"
          />

          <CubeCard
            title="Title2"
            images={["tanda/tab-bg-v1.png"]}
            color="#b1acf5"
          />
          <CubeCard
            title="Title3"
            images={["tanda/laptop.png"]}
            color="#b1acf5"
          />
        </div>
      </div>
    </>
  );
};

export default MoreProjects;
