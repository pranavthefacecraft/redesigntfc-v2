import "./Solit.css";
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
              id="main-image-solit"
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
            <h4 className="Futura-PT-Medium text-left font-bold text-[#BF1735] text-[28px] sm:text-[28px] md:text-[28px] lg:text-[28px] xl:text-[28px] 2xl:text-[28px]">About The Project.</h4>
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

        {/* Second container */}
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
        <div className="z-50 container mx-auto flex flex-col items-center p-8 pt-[0px] sm:pt-[0px] md:pt-[0px] lg:pt-[0px] xl:pt-[0px] 2xl:pt-[0px] pb-[35px] sm:pb-[35px] md:pb-[35px] lg:pb-[35px] xl:pb-[35px] pl-8 sm:pl-0 md:pl-0 lg:pl-8 xl:pl-0 2xl:pl-0 pr-8 sm:pr-0 md:pr-0 lg:pr-8 xl:pr-0 2xl:pr-0 gap-y-0 md:gap-y-12 lg:gap-y-28 xl:gap-y-28 2xl:gap-y-[130px]">
          {/* Slider */}
          <DisplaySlider>
            <Slider />
          </DisplaySlider>
        </div>
        <div className="z-50 container mx-auto flex flex-col items-center p-8 pt-[0px] sm:pt-[0px] md:pt-[0px] lg:pt-[0px] xl:pt-[0px] 2xl:pt-[0px] pb-[35px] sm:pb-[35px] md:pb-[35px] lg:pb-[35px] xl:pb-[35px] pl-8 sm:pl-0 md:pl-0 lg:pl-8 xl:pl-0 2xl:pl-0 pr-8 sm:pr-0 md:pr-0 lg:pr-8 xl:pr-0 2xl:pr-0 gap-y-0 md:gap-y-12 lg:gap-y-28 xl:gap-y-28 2xl:gap-y-[130px]">
          <div className="flex w-full flex-col items-center gap-8 lg:flex-row lg:gap-16 xl:gap-16">
            {/* Image1 */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl lg:aspect-[4/5] xl:aspect-[4/5] solit-el-1">
              <img
                src="/assets/solit/row1.jpg"
                className="absolute top-0 left-0 h-full w-full object-cover"
              />
            </div>

            {/* Image2 */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl lg:aspect-[4/5] xl:aspect-[4/5]">
              <div className="relative h-full aspect-square w-full bg-[url(/assets/solit/row2.jpg)] p-10 bg-cover">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute top-[106px] sm:top-[242px] md:top-[242px] lg:top-[142px] xl:top-[194px] 2xl:top-[234px] left-[107px] sm:left-[244px] md:left-[244px] lg:left-[143px] xl:left-[196px] 2xl:left-[238px] h-[134px] sm:h-[324px] md:h-[324px] lg:h-[187px] xl:h-[260px] 2xl:h-[324px] w-[132px] sm:w-[303px] md:w-[303px] lg:w-[181px] xl:w-[250px] 2xl:w-[303px] object-cover transform-flat rotate-y-18"
                  src="/assets/solit/solit_socmediapost_3.mp4"
                  type="video/mp4"
                ></video>
              </div>

              {/* Icon videos */}
            </div>
          </div>
            </div>
            <div className="z-50 container mx-auto flex flex-col items-center p-8 sm:p-0 md:p-0 lg:p-0 xl:p-8 2xl:p-0 lg:px-0 lg:py-0 pt-[80px] sm:pt-[0px] md:pt-[130px] lg:pt-[130px] xl:pt-[130px] 2xl:pt-[130px] pb-[30px] sm:pb-[130px] md:pb-[130px] lg:pb-[130px] xl:pb-[130px] 2xl:pb-[130px] gap-y-8 sm:gap-y-8 md:gap-y-12 lg:gap-y-16 xl:gap-y-28 2xl:gap-y-[130px]">
          <Sectionidea
            title={{
              content: (
                <>
                  Social Media
                  <br />
                  Visual Content
                </>
              ),
              size: "md",
            }}
            text="To boost engagement and create a fresh, youthful brand character, we produced six short video posts for social media. These videos featured people answering questions about what Solit means to them, adding an element of fun and personal connection to the brand. This approach not only heightens engagement but also aligns perfectly with the target market of young creative businesses."
          />
          </div>
          <div className="z-50 container mx-auto flex flex-col items-center p-8 2xl:pt-[0px] lg:px-0 lg:py-0 lg:pb-0 xl:pb-[130px] pl-8 sm:pl-0 md:pl-0 lg:pl-8 xl:pl-0 2xl:pl-0 pr-8 sm:pr-0 md:pr-0 lg:pr-8 xl:pr-0 2xl:pr-0 gap-y-8 md:gap-y-12 lg:gap-y-[35px] xl:gap-y-15 2xl:gap-y-[65px]">
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
          </div>
          <div className="z-50 container mx-auto flex flex-col items-center p-8 pt-[0px] sm:pt-[0px] md:pt-[0px] lg:pt-[50px] xl:pt-[0px] 2xl:pt-[0px] pb-[35px] sm:pb-[35px] md:pb-[35px] lg:pb-[35px] xl:pb-[35px] 2xl:pb-[135px] pl-8 sm:pl-0 md:pl-0 lg:pl-8 xl:pl-0 2xl:pl-0 pr-8 sm:pr-0 md:pr-0 lg:pr-8 xl:pr-0 2xl:pr-0 gap-y-0 md:gap-y-12 lg:gap-y-28 xl:gap-y-28 2xl:gap-y-[130px]">
          <Sectionidea
            title={{
              content: "Design System",
              size: "md",
            }}
            text="The favicon we created encapsulates the brand’s identity. By incorporating the green color from the palette white color from the logo, and the customized typeface from the Visby font (used in the logo); the favicon serves as a miniature representation of the brand’s visual language. The elements support brand recognition. "
          />
          <Display>
            <img
              src="/assets/solit/overlay.jpg"
              className="solit-el-1 absolute top-0 left-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 z-50 flex flex-col items-center justify-between p-8 lg:items-start lg:justify-center md:p-20 lg:p-16 xl:p-24">
              <h3 className="Futura-PT-Bold text-center text-white text-4xl md:text-6xl lg:text-left lg:text-8xl xl:w-2/3 xl:text-8xl 2xl:text-9xl">
                Are you ready to transform your brand?
              </h3>

              <h4 className="Futura-PT-Medium text-customred text-[25px] sm:text-[30px] md:text-[30px] lg:absolute lg:right-16 lg:bottom-40 lg:text-[30px] xl:right-24 xl:bottom-24 xl:text-[30px] 2xl:text-[30px]">
                Let’s work together
              </h4>
            </div>
          </Display>
        </div>
        <div className="h-full w-full bg-[#f8f8f8] border-0 border-red-400">
          <div className="marquee-container border-0 pt-10 sm:pt-20 md:pt-20 lg:pt-20 xl:pt-20 2xl:pt-20">
            <TitleMoreProjects
              content="Explore more projects"
              size="md"
              centered
            />
             <TitleMoreProjects
              content="Explore more projects"
              size="md"
              centered
            />
             <TitleMoreProjects
              content="Explore more projects"
              size="md"
              centered
            />
             <TitleMoreProjects
              content="Explore more projects"
              size="md"
              centered
            />
             <TitleMoreProjects
              content="Explore more projects"
              size="md"
              centered
            />
             <TitleMoreProjects
              content="Explore more projects"
              size="md"
              centered
            />  
            
            
          </div>

          <div className="container mx-auto flex flex-col items-center gap-y-0 p-0 md:gap-y-0 lg:gap-y-0 lg:px-0 lg:py-0 lg:pb-12 xl:gap-y-0 xl:pb-32 border-0">
            <MoreProjects />
          </div>
        </div>
      </div>

      <PageFooter />
    </>
  );
};

export default Solit;
