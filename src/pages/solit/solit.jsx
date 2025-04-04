import "./Solit.css";
import Display from "../common/Display.jsx";
import Text from "../common/Text.jsx";
import Section from "../common/Section.jsx";
import SectionIdea from "../common/SectionIdea.jsx";
import RowDisplay from "../common/RowDisplay.jsx";
import Separator from "../common/Separator.jsx";
import Title from "../common/Title.jsx";
import TitleMoreProjects from "../common/TitleMoreProjects.jsx";
import PageHeader from "../common/PageHeader.jsx";
import PageBreadcrumbs from "./PageBreadcrumbs.jsx";

import ProjectTag from "./ProjectTag.jsx";
import MainText from "./MainText.jsx";
import Idea from "./Idea.jsx";
import Slider from "./Slider.jsx";
import MoreProjects from "./MoreProjects.jsx";
import PageFooter from "../common/PageFooter.jsx";
import Video from "./Video.jsx";
import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import GridDistortion from "../common/GridDistortion.jsx";
import Sectionidea from "../common/SectionIdea.jsx";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const Solit = () => {
  const imageTimeline = useRef();
  const container = useRef();

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
        <div className="absolute top-0 left-0 h-[80vh] w-full sm:h-[80vh] md:h-[50vh] lg:h-[100vh] xl:h-[100vh] 2xl:h-[100vh]">
          <div className="absolute inset-0 opacity-100">
            <GridDistortion
              // imageSrc="https://picsum.photos/1920/1080?grayscale"
              imageSrc="/assets/solit/griddistortion.jpg"
              grid={10}
              mouse={0.15}
              strength={0.15}
              relaxation={0.9}
              className="pointer-events-auto"
            />
          </div>
        </div>

        {/* First container */}
        <div className=" pointer-events-none z-50 container mx-auto flex flex-col items-center gap-y-8 p-8 md:gap-y-0 lg:gap-y-16 lg:px-10 lg:py-16 lg:pb-12 xl:gap-y-28 xl:pb-32 2xl:gap-y-20">
          <PageBreadcrumbs />

          <ProjectTag />

          <Display>
            <div
              id="main-image-solit"
              className="parallax pointer-events-none h-full w-full"
            ></div>
          </Display>
        </div>

        <div className="border z-50 container mx-auto flex flex-col items-center p-8 sm:p-0 md:p-0 lg:p-0 xl:p-0 lg:px-0 lg:py-0 lg:pb-[130px] xl:pb-[130px] gap-y-8  md:gap-y-12 lg:gap-y-16 xl:gap-y-28 2xl:gap-y-[130px]">
          <MainText />

          <Display>
            <div className="solit-el-1 h-full w-full z-1000">
              <Video />
            </div>
          </Display>

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

        {/* Second container */}
        <div className="z-50 container mx-auto flex flex-col items-center p-8 sm:p-0 md:p-0 lg:p-0 xl:p-0 2xl:pt-[130px] lg:px-0 lg:py-0 lg:pb-0 xl:pb-[130px] gap-y-28  md:gap-y-12 lg:gap-y-16 xl:gap-y-28 2xl:gap-y-[130px]">
          <Sectionidea
            title={{
              content: "Idea to creation",
              size: "md",
            }}
            text="We created a 20-second brand awareness video, designed to be easily adaptable for social media platforms. The video effectively encapsulates Solit Hub’s brand message and identity, making it a versatile tool for Various digital channels. The brand identity reflects the slogan ‘Create at Solit, Thrive in Luzern’."
            expanded={false}
          />
        </div>
        <div className="z-50 container mx-auto flex flex-col items-center 2xl:pt-[0px] lg:px-0 lg:py-0 lg:pb-0 xl:pb-[130px] gap-y-8  md:gap-y-12 lg:gap-y-16 xl:gap-y-28 2xl:gap-y-[130px]">
          {/* Slider */}
          <Display>
            <Slider />
          </Display>
        </div>
        <div className="z-50 container mx-auto flex flex-col items-center 2xl:pt-[0px] lg:px-0 lg:py-0 lg:pb-0 xl:pb-[130px] gap-y-8  md:gap-y-12 lg:gap-y-16 xl:gap-y-28 2xl:gap-y-[130px]">
        <div className="flex w-full flex-col items-center gap-8 lg:flex-row lg:gap-16 xl:gap-16">
            {/* Image1 */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl lg:aspect-[4/5] xl:aspect-[4/5]">
              <img
                src="/assets/solit/row1.jpg"
                className="absolute top-0 left-0 h-full w-full object-cover"
              />
            </div>

            {/* Image2 */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl lg:aspect-[4/5] xl:aspect-[4/5]">
            <div className="relative h-full aspect-square w-full">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-0 left-0 h-full w-full object-cover"
                    src="/assets/solit/solit_socmediapost_3.mp4"
                    type="video/mp4"
                  ></video>
                </div>

              {/* Icon videos */}
              
            </div>
          </div>
         
          <div className="z-50 container mx-auto flex flex-col items-center p-8 sm:p-0 md:p-0 lg:p-0 xl:p-0 2xl:pt-[130px] lg:px-0 lg:py-0 lg:pb-0 xl:pb-[130px] gap-y-28  md:gap-y-12 lg:gap-y-16 xl:gap-y-28 2xl:gap-y-[130px]">
          <Sectionidea
            title={{
              content: "Social Media, Visual Content",
              size: "md",
            }}
            text="To boost engagement and create a fresh, youthful brand character, we produced six short video posts for social media. These videos featured people answering questions about what Solit means to them, adding an element of fun and personal connection to the brand. This approach not only heightens engagement but also aligns perfectly with the target market of young creative businesses."
          />
          </div>
          <RowDisplay
            image1="/assets/solit/row3.jpg"
            image2="/assets/solit/row4.jpg"
            classes="solit-el-1"
          />

          <RowDisplay
            image1="/assets/solit/row5.jpg"
            image2="/assets/solit/row6.jpg"
            classes="solit-el-1"
          />
<div className="z-50 container mx-auto flex flex-col items-center p-8 sm:p-0 md:p-0 lg:p-0 xl:p-0 2xl:pt-[130px] lg:px-0 lg:py-0 lg:pb-0 xl:pb-[130px] gap-y-28  md:gap-y-12 lg:gap-y-16 xl:gap-y-28 2xl:gap-y-[130px]">
          <Sectionidea
            title={{
              content: "Design System",
              size: "md",
            }}
            text="The favicon we created encapsulates the brand’s identity. By incorporating the green color from the palette white color from the logo, and the customized typeface from the Visby font (used in the logo); the favicon serves as a miniature representation of the brand’s visual language. The elements support brand recognition. "
          />
</div>
          <Display>
            <img
              src="/assets/solit/overlay.jpg"
              className="solit-el-1 absolute top-0 left-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 z-50 flex flex-col items-center justify-between p-8 lg:items-start lg:justify-center md:p-20 lg:p-16 xl:p-24">
              <h3 className="Futura-PT-Bold text-center text-white text-5xl md:text-6xl lg:text-left lg:text-8xl xl:w-2/3 xl:text-9xl 2xl:text-9xl">
                Are you ready to transform your brand?
              </h3>

              <h4 className="Futura-PT-Medium text-customred sm:text-[30px] md:text-[30px] lg:absolute lg:right-16 lg:bottom-40 lg:text-[30px] xl:right-24 xl:bottom-24 xl:text-[30px] 2xl:text-[30px]">
                Let’s work together
              </h4>
            </div>
          </Display>
        </div>
        <div className="h-full w-full">
          <div className="marquee-container">
            <TitleMoreProjects
              content="Explore more projects&nbsp; . &nbsp;"
              size="md"
              centered
            />
            <TitleMoreProjects
              content="Explore more projects&nbsp; . &nbsp;"
              size="md"
              centered
            />
            <TitleMoreProjects
              content="Explore more projects&nbsp; . &nbsp;"
              size="md"
              centered
            />
            <TitleMoreProjects
              content="Explore more projects&nbsp; . &nbsp;"
              size="md"
              centered
            />
            <TitleMoreProjects
              content="Explore more projects&nbsp; . &nbsp;"
              size="md"
              centered
            />
            <TitleMoreProjects
              content="Explore more projects&nbsp; . &nbsp;"
              size="md"
              centered
            />
            <TitleMoreProjects
              content="Explore more projects&nbsp; . &nbsp;"
              size="md"
              centered
            />
            <TitleMoreProjects
              content="Explore more projects&nbsp; . &nbsp;"
              size="md"
              centered
            />
          </div>

          <div className="container mx-auto flex flex-col items-center gap-y-8 p-8 md:gap-y-12 lg:gap-y-16 lg:px-0 lg:py-16 lg:pb-12 xl:gap-y-32 xl:pb-32">
            <MoreProjects />
          </div>
        </div>
      </div>

      <PageFooter />
    </>
  );
};

export default Solit;
