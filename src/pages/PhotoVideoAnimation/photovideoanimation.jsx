import "./photovideoanimation.css";
import Display from "../common/Display.jsx";
import DisplaySlider from "../common/DisplaySlider.jsx";

import Text from "../common/Text.jsx";
import Section from "../common/Section.jsx";
import SectionIdea from "../common/SectionIdea.jsx";
import RowDisplay from "../common/RowDisplay.jsx";
import Separator from "../common/Separator.jsx";
import Title from "../common/Title.jsx";
import TitleMoreProjects from "../common/TitleMoreProjects.jsx";
import PageHeader from "../common/PageHeader.jsx";
import PageBreadcrumbs from "./PageBreadcrumbsphotovideoanimation.jsx";

import ProjectTag from "./ProjectTagphotovideoanimation.jsx";
import MainText from "./MainTextphotovideoanimation.jsx";
import ImgGallery from "./ImgGallery.jsx";
import Idea from "./Ideaphotovideoanimation.jsx";
import Slider from "./Sliderphotovideoanimation.jsx";
import MoreProjects from "../common/MoreProjects.jsx";
import PageFooter from "../common/PageFooter.jsx";
import PageFooterMobile from "../common/PageFooterMobile.jsx";
import Video from "./Videophotovideoanimation.jsx";
import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import GridDistortion from "../common/GridDistortion.jsx";
import Sectionidea from "../common/SectionIdea.jsx";
import AlternatingGrid from "./imageScrollGallery.jsx";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const images = [
  "/assets/photovideoanimation/gallery-1.png",
  "/assets/photovideoanimation/edith1.png",
  "/assets/photovideoanimation/gallery-1.png",
  "/assets/photovideoanimation/edith1.png",
  "/assets/photovideoanimation/gallery-1.png",
  "/assets/photovideoanimation/edith1.png",
];

const GalleryStack = () => {
  const [current, setCurrent] = useState(0);
  const cardsRef = useRef([]);

  const handleNext = () => {
    if (current < images.length - 1) {
      const card = cardsRef.current[current];
      gsap.to(card, {
        y: -100,
        rotation: 15,
        opacity: 0,
        duration: 0.6,
        onComplete: () => setCurrent((c) => c + 1),
      });
    }
  };

  return (
    <div className="img-gallery relative w-[350px] h-[500px] mx-auto flex flex-col items-center" data-scroll-container>
      <div className="img-gallery-container order" data-scroll>
        
      {images.map((src, idx) => (
        <div className="img-gallery-cards reorder">
        <img
          key={src}
          ref={el => (cardsRef.current[idx] = el)}
          src={src}
          alt={`Gallery ${idx + 1}`}
          className={`
            ${idx < current ? "opacity-0 pointer-events-none" : ""}
            ${idx === current ? "z-20" : "z-10"}
          `}
          
        />
        </div>
      ))}
      
      </div>
      <button
        className="img-gallery-btn mt-[520px] px-6 py-3 bg-[#BF1735] text-white rounded-lg font-bold shadow hover:bg-[#a0132b] transition"
        onClick={handleNext}
        disabled={current >= images.length - 1}
      >
        {current < images.length - 1 ? "Next Image" : "End of Gallery"}
      </button>
    </div>
  );
};

const Solit = () => {
  const imageTimeline = useRef();
  const container = useRef();

  const [showMoreProjects, setShowMoreProjects] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    let scrolled = false;

    function onScroll() {
      if (!scrolled && window.scrollY > 300) { // adjust 300 as needed
        scrolled = true;
        timerRef.current = setTimeout(() => {
          setShowMoreProjects(true);
        }, 2000); // 20 seconds
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useGSAP(() => {
    let images = container.current.querySelectorAll(".solit-el-1");

    images.forEach((image) => {
      gsap.to(image, {
        scrollTrigger: {
          trigger: image,
          // markers: true,
        },
        opacity: 1,
        scale: 1,
        duration: 1,
      });
    });

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  });

  return (
    <>
      <div ref={container} className="w-full overflow-hidden">
        <div className="absolute top-0 left-0 w-full  h-[650px] sm:h-[500px] md:h-[500px] lg:h-[900px] xl:h-[800px] 2xl:h-[900px]">
          <div className="absolute inset-0 opacity-100">
            <GridDistortion
              // imageSrc="https://picsum.photos/1920/1080?grayscale"
              imageSrc="/assets/solit/griddistortion.jpg"
              grid={12}
              mouse={0.15}
              strength={0.15}
              relaxation={0.9}
              className="pointer-events-auto"
            />
          </div>
        </div>

        {/* First container */}
        <div className="pointer-events-none z-50 container mx-auto flex flex-col items-center p-8 lg:px-10 lg:py-16 lg:pb-12 xl:pb-13 gap-y-8 md:gap-y-16 lg:gap-y-16 xl:gap-y-20 2xl:gap-y-20">
          <PageBreadcrumbs />

          <ProjectTag />

          <Display>
            <div
              id="main-image-photovideoanimation"
              className="parallax pointer-events-none h-full w-full"
            ></div>
          </Display>
        </div>

        <div className="z-50 container mx-auto flex flex-col items-center pt-10 p-8 sm:p-0 md:p-8 lg:p-8 xl:p-8 2xl:p-0 lg:pb-[130px] xl:pb-[130px] 2xl:pb-[130px] gap-y-8 sm:gap-y-8 md:gap-y-12 lg:gap-y-16 xl:gap-y-28 2xl:gap-y-[130px]">
          <MainText />

          <Display>
            <div className="solit-el-1 h-full w-full z-1000">
              <Video />
            </div>
          </Display>
        </div>
        <div className="z-50 container relative mx-auto flex flex-col items-center p-8 sm:p-0 md:p-8 lg:p-8 xl:p-0 2xl:p-0 pb-[90px] sm:pb-[130px] md:pb-[130px] lg:pb-[130px] xl:pb-[130px] 2xl:pb-[130px] gap-y-8 sm:gap-y-8 md:gap-y-12 lg:gap-y-16 xl:gap-y-28 2xl:gap-y-[130px]">
          <div className=" relative sm:relative md:relative lg:relative xl:relative 2xl:absolute w-[100%] sm:w-[55%] md:w-[55%] lg:w-[55%] xl:w-[55%] 2xl:w-[100%] ">
            <h4 className="Futura-PT-Medium text-left font-bold text-[#BF1735] text-[28px] sm:text-[28px] md:text-[28px] lg:text-[28px] xl:text-[28px] 2xl:text-[28px]">
              About The Project.
            </h4>
          </div>
          <Section
            title={{
              content: "Challenge",
              size: "md",
            }}
            text="We promoted Solit Hub's location in the quieter subur ob Littau, Luzern through creative visuals, engaging the young demographic, and showcasting Littau as part of Luzern to enhance brand awareness in a competitive co-working space market."
            expanded={false}
          />

          <Section
            title={{
              content: "Results",
              size: "md",
            }}
            text="We improved the brand's digital presence through an integrated approach, including targeted social media campaigns and engaging video content. This resonated well with young, creative businesses, resulting in positive client feedback. The project demonstrates the impact of a well-crafted digital strategy on a brand's image and market position."
            expanded={false}
          />
        </div>

        <Idea />
        <div className="z-50 container mx-auto flex flex-col items-center p-8 sm:p-0 md:p-0 lg:p-0 xl:p-8 2xl:p-0 lg:px-0 lg:py-0 pt-[80px] sm:pt-[0px] md:pt-[130px] lg:pt-[130px] xl:pt-[130px] 2xl:pt-[130px] pb-[30px] sm:pb-[130px] md:pb-[130px] lg:pb-[130px] xl:pb-[130px] 2xl:pb-[130px] gap-y-8 sm:gap-y-8 md:gap-y-12 lg:gap-y-16 xl:gap-y-28 2xl:gap-y-[130px]">
          <Sectionidea
            title={{
              content: "Idea to creation",
              size: "md",
            }}
            text="We created a 20-second brand awareness video, designed to be easily adaptable for social media platforms. The video effectively encapsulates Solit Hub’s brand message and identity, making it a versatile tool for Various digital channels. The brand identity reflects the slogan ‘Create at Solit, Thrive in Luzern’."
            expanded={false}
          />
        </div>

        {/* Second container */}
        <div className="z-50 relative container mx-auto flex flex-col items-center p-8 sm:p-0 md:p-0 lg:p-0 xl:p-8 2xl:p-0 lg:px-0 lg:py-0 pt-[0px] sm:pt-[0px] md:pt-[130px] lg:pt-[130px] xl:pt-[130px] 2xl:pt-[130px] pb-[30px] sm:pb-[130px] md:pb-[130px] lg:pb-[130px] xl:pb-[0px] 2xl:pb-[0px] gap-y-8 sm:gap-y-8 md:gap-y-12 lg:gap-y-16 xl:gap-y-28 2xl:gap-y-[130px]">
          <div className="w-full text-center">
            <span className="block w-full text-[40px] sm:text-[48px] md:text-[56px] lg:text-[64px] xl:text-[72px] 2xl:text-[180px] font-bold text-center sm:text-center Futura-PT-Bold text-[#f2f2f2]">
            FEATURED WORK
            </span>
          </div>
          <div className="top-40 sm:-top-50 md:-top-50 lg:-top-50 xl:-top-50 2xl:-top-50 w-full text-center relative">
          <ImgGallery />
          </div>
          
        </div>

        <div className="z-50 container mx-auto flex flex-col items-center p-8 sm:p-0 md:p-0 lg:p-0 xl:p-8 2xl:p-0 lg:px-0 lg:py-0 pt-[80px] sm:pt-[0px] md:pt-[130px] lg:pt-[130px] xl:pt-[130px] 2xl:pt-[130px] pb-[30px] sm:pb-[130px] md:pb-[130px] lg:pb-[130px] xl:pb-[130px] 2xl:pb-[130px] gap-y-8 sm:gap-y-8 md:gap-y-12 lg:gap-y-16 xl:gap-y-28 2xl:gap-y-[130px] ">
        <AlternatingGrid />
          
        </div>

        
        
     
      </div>
         {showMoreProjects && (
          <>
            <div className="h-full w-full bg-[#f8f8f8] overflow-hidden">
              <div className="marquee-container pt-10 sm:pt-20 md:pt-20 lg:pt-20 xl:pt-20 2xl:pt-20">
                <TitleMoreProjects content="Explore more projects" size="md" centered />
                <TitleMoreProjects content="Explore more projects" size="md" centered />
                <TitleMoreProjects content="Explore more projects" size="md" centered />
                <TitleMoreProjects content="Explore more projects" size="md" centered />
                <TitleMoreProjects content="Explore more projects" size="md" centered />
                <TitleMoreProjects content="Explore more projects" size="md" centered />
              </div>
              <div className="container mx-auto flex flex-col items-center gap-y-0 p-0 md:gap-y-0 lg:gap-y-0 lg:px-0 lg:py-0 lg:pb-12 xl:gap-y-0 xl:pb-32">
                <MoreProjects />
              </div>
            </div>
            <PageFooter />
            <PageFooterMobile />
          </>
        )}
    </>
  );
};

export default Solit;
