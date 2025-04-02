import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { useRef } from "react";

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
    <div className="flex w-full flex-col gap-8 md:flex-row">
      <ProjectCard name="Tanda" image="/assets/solit/row1.jpg" />
      <ProjectCard name="BHMS" image="/assets/solit/row2.jpg" />
      <ProjectCard name="Project3" image="/assets/solit/row3.jpg" />
    </div>
  );
};
export default MoreProjects;
