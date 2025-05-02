import "./Rafw.css";
import Display from "../common/Display.jsx";
import DisplayVideo from "../common/DisplayVideo.jsx"; // Add this import
import Text from "../common/Text.jsx";
import Section from "../common/Section.jsx";
import RowDisplay from "../common/RowDisplay.jsx";
import RowDisplayRafw from "../common/RowDisplayRafw.jsx";
import Separator from "../common/Separator.jsx";
import Title from "../common/Title.jsx";

import PageBreadcrumbs from "./PageBreadcrumbsrafw.jsx";

import ProjectTag from "./ProjectTagRafw.jsx";
import MainText from "./MainText.jsx";
import Idea from "./Idea.jsx";
import Slider from "./Slider.jsx";
import MoreProjects from "../common/MoreProjects.jsx";
import MoreProjectsMobile from "../common/MoreProjectMobile.jsx";
import PageFooter from "../common/PageFooter.jsx";
import Video from "./Video.jsx";
import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import GridDistortion from "../common/GridDistortion.jsx";
import TitleMoreProjects from "../common/TitleMoreProjects.jsx";

import MoreProjectMobile from "../common/MoreProjectMobile.jsx";
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
      <div ref={container} className="w-full overflow-hidden bg-black">
      <div className="absolute top-0 left-0 w-full  h-[650px] sm:h-[500px] md:h-[500px] lg:h-[900px] xl:h-[800px] 2xl:h-[900px]">
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
        <div className="pointer-events-none z-50 container mx-auto flex flex-col items-center p-8 lg:px-10 lg:py-16 lg:pb-12 xl:pb-13 gap-y-8 sm:gap-y-8 md:gap-y-8 lg:gap-y-16 xl:gap-y-20 2xl:gap-y-20">
          <PageBreadcrumbs />

          <ProjectTag />

          <Display>
            <div
              id="main-image-rafw"
              className="pointer-events-none h-full w-full object-cover"
            ></div>
          </Display>
        </div>

        <div className="z-1000 container mx-auto flex flex-col items-center gap-y-8 p-8 md:gap-y-12 lg:gap-y-16 lg:px-0 lg:py-16 lg:pb-12 xl:gap-y-28 xl:pb-32 2xl:gap-y-32">
          <MainText />

          <Display>
            <div className="solit-el-1 z-1000 h-full w-full">
              <Video />
            </div>
          </Display>

          <Section
            title={{
              content: "Challenge",
              size: "md",
              color: "#ffffff",
            }}
            text="We promoted Solit Hub's location in the quieter subur ob Littau, Luzern through creative visuals, engaging the young demographic, and showcasting Littau as part of Luzern to enhance brand awareness in a competitive co-working space market."
            expanded={false}
            textColor="white"
          />

          <Section
            title={{
              content: "Results",
              size: "md",
              color: "#ffffff",
            }}
            text="We improved the brand's digital presence through an integrated approach, including targeted social media campaigns and engaging video content. This resonated well with young, creative businesses, resulting in positive client feedback. The project demonstrates the impact of a well-crafted digital strategy on a brand's image and market position."
            expanded={false}
            textColor="white"
          />
        </div>
        <div className="container-full z-2000 mx-auto flex flex-col items-center">
          <Idea />
        </div>

        {/* Second container */}
        <div className="container mx-auto flex flex-col items-center gap-y-8 p-8 md:gap-y-12 lg:gap-y-16 lg:px-0 lg:py-16 lg:pb-12 xl:gap-y-30 xl:pb-32 2xl:pt-40">
          <Section
            title={{
              content: "Idea to creation",
              size: "md",
              color: "#ffffff",
            }}
            text="We created a 20-second brand awareness video, designed to be easily adaptable for social media platforms. The video effectively encapsulates Solit Hub’s brand message and identity, making it a versatile tool for Various digital channels. The brand identity reflects the slogan ‘Create at Solit, Thrive in Luzern’."
            expanded={false}
            textColor="white"
          />

          {/* Slider */}
          <DisplayVideo>
            <Slider />
          </DisplayVideo>

          <div className="flex w-full flex-col items-center gap-8 lg:flex-row lg:gap-16 xl:gap-16">
            {/* Image1 */}

            {/* Image2 */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl lg:aspect-[4/5] xl:aspect-[4/5]">
              <div className="h-full border bg-[#c09c45] p-20">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="top-0 left-0 w-auto rounded-3xl"
                  src="/assets/rafw/menu.mp4"
                  type="video/mp4"
                ></video>
              </div>
            </div>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl lg:aspect-[4/5] xl:aspect-[4/5]">
              <img
                src="/assets/rafw/phone.png"
                className="object-fit absolute top-0 left-0 h-full w-full"
              />
            </div>
          </div>

          <Section
            className="text-white"
            title={{
              content: "How FaceCraft transformed online presence.",
              size: "md",
              color: "#ffffff",
            }}
            text="To boost engagement and create a fresh, youthful brand character, we produced six short video posts for social media. These videos featured people answering questions about what Solit means to them, adding an element of fun and personal connection to the brand. This approach not only heightens engagement but also aligns perfectly with the target market of young creative businesses."
            textColor="white"
          />
          <div className="flex w-full flex-col items-start gap-8 lg:gap-16 xl:gap-16">
            {/* First Video */}
            <div className="relative w-[80%]">
              <div className="border">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="top-0 left-0 w-auto rounded-3xl"
                  src="/assets/rafw/phone-video.mp4"
                  type="video/mp4"
                ></video>
              </div>
            </div>
          </div>
          {/* Second Video */}
          <div className="flex w-full flex-col items-end gap-8 lg:gap-16 xl:gap-16">
            <div className="relative w-[80%]">
              <div className="">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="top-0 left-0 w-auto rounded-3xl"
                  src="/assets/rafw/Tab-Dashboard.mp4"
                  type="video/mp4"
                ></video>
              </div>
            </div>
          </div>

          {/* Images Side by Side */}
          <div className="flex w-full flex-col items-center gap-8 lg:flex-row lg:gap-16 xl:gap-16">
            {/* Left Image - 40% width */}
            <div className="relative w-full lg:w-[34%] overflow-hidden rounded-2xl">
              <img
                src="/assets/rafw/get-your-table.png"
                className="top-0 left-0 h-full w-full"
              />
            </div>

            {/* Right Image - 60% width */}
            <div className="relative w-full lg:w-[66%] overflow-hidden rounded-2xl">
              <img
                src="/assets/rafw/Tab.png"
                className="top-0 left-0 h-full w-full"
              />
            </div>
          </div>

          <Display>
            <img
              src="/assets/solit/overlay.jpg"
              className="solit-el-1 absolute top-0 left-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 z-50 flex flex-col items-center justify-between p-8 md:p-20 lg:items-start lg:justify-center lg:p-16 xl:p-24">
              <h3 className="Futura-PT-Bold text-center text-5xl text-white md:text-6xl lg:text-left lg:text-8xl xl:w-2/3 xl:text-9xl 2xl:text-9xl">
                Are you ready to transform your brand?
              </h3>

              <h4 className="text-customred sm:text-[30px] md:text-[30px] lg:absolute lg:right-16 lg:bottom-40 lg:text-[30px] xl:right-24 xl:bottom-24 xl:text-[30px] 2xl:text-[30px]">
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

          <div className="desktopcubeblocks hidden sm:hidden md:block lg:block xl:block 2xl:block container mx-auto flex-col items-center gap-y-0 p-0 md:gap-y-0 lg:gap-y-0 lg:px-0 lg:py-0 lg:pb-12 xl:gap-y-0 xl:pb-32 border-0">
            <MoreProjects />
          </div>
          <div className="mobilecubeblock block sm:block md:hidden lg:hidden xl:hidden 2xl:hidden container mx-auto flex-col items-center gap-y-0 p-0 md:gap-y-0 lg:gap-y-0 lg:px-0 lg:py-0 lg:pb-12 xl:gap-y-0 xl:pb-32 border-0">
            <MoreProjectMobile />
          </div>
        </div>
      </div>

      <PageFooter />
    </>
  );
};

export default Solit;
