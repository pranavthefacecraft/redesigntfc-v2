import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { useRef, useState } from "react";
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

const MoreProjectMobile = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <div className="border container mx-auto flex flex-col items-center gap-y-0 p-0 md:gap-y-0 lg:gap-y-0 lg:px-0 lg:py-0 lg:pb-0 xl:gap-y-0 xl:pb-0">
        <div className="flex w-full flex-col gap-0 md:flex-row lg:gap-0 xl:gap-0">
          <CubeCard
            title="Tanda"
            images={[
              "/assets/tanda/main.png",
              "/assets/tanda/dark-purple-v2.png",
              "/assets/tanda/laptop.png",
              "/assets/tanda/main.png",
            ]}
            color="#b1acf5"
          />

          <CubeCard
            title="Solit"
            images={[
              "/assets/solit/main.png",
              "assets/tanda/dark-purple-v2.png",
              "/assets/solit/icon.png",
              "/assets/solit/tab.png",
            ]}
            color="#b1acf5"
          />

          <CubeCard
            title="Towork"
            images={[
              "/assets/towork/laptopwithtowork.png",
              "assets/tanda/dark-purple-v2.png",
              "/assets/towork/man-sitting-on-chair.png",
              "/assets/towork/mobile-in-hand.png",
            ]}
            color="#b1acf5"
          />
        </div>
        {!showMore && (
          <div className="LoadMorebutton w-full text-center Futura-PT-Medium text-[25px]">
            <button
              onClick={() => setShowMore(true)}
              style={{
                outline: "none",
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
            >
              Load More
            </button>
          </div>
        )}
        {showMore && (
          <>
            <div className="flex w-full flex-col gap-4 md:flex-row lg:gap-0 xl:gap-0">
              <CubeCard
                title="Rafw"
                images={[
                  "/assets/rafw/hero-image.png",
                  "assets/tanda/dark-purple-v2.png",
                  "/assets/rafw/3-Screens.png",
                  "/assets/rafw/Tab.png",
                ]}
                color="#b1acf5"
              />

              <CubeCard
                title="Housing Search"
                images={[
                  "/assets/hosuing-search/dream-home.png",
                  "assets/tanda/dark-purple-v2.png",
                  "/assets/hosuing-search/housing-search-hero.png",
                  "/assets/hosuing-search/laptopwithweb.png",
                ]}
                color="#b1acf5"
              />
              <CubeCard
                title="Study English"
                images={[
                  "/assets/hosuing-search/dream-home.png",
                  "assets/tanda/dark-purple-v2.png",
                  "/assets/hosuing-search/housing-search-hero.png",
                  "/assets/hosuing-search/laptopwithweb.png",
                ]}
                color="#b1acf5"
              />
            </div>

            <div className="flex w-full flex-col gap-0 md:flex-row lg:gap-0 xl:gap-0">
              <CubeCard
                title="Rafw"
                images={[
                  "/assets/rafw/hero-image.png",
                  "assets/tanda/dark-purple-v2.png",
                  "/assets/rafw/3-Screens.png",
                  "/assets/rafw/Tab.png",
                ]}
                color="#b1acf5"
              />

              <CubeCard
                title="Housing Search"
                images={[
                  "/assets/hosuing-search/dream-home.png",
                  "assets/tanda/dark-purple-v2.png",
                  "/assets/hosuing-search/housing-search-hero.png",
                  "/assets/hosuing-search/laptopwithweb.png",
                ]}
                color="#b1acf5"
              />
              <CubeCard
                title="Study English"
                images={[
                  "/assets/hosuing-search/dream-home.png",
                  "assets/tanda/dark-purple-v2.png",
                  "/assets/hosuing-search/housing-search-hero.png",
                  "/assets/hosuing-search/laptopwithweb.png",
                ]}
                color="#b1acf5"
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MoreProjectMobile;
