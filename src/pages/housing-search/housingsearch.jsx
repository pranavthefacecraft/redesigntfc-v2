import "./housing-search.css";
import Display from "../common/Display.jsx";
import Text from "../common/Text.jsx";
import Section from "../common/Section.jsx";
import RowDisplay from "../common/RowDisplay.jsx";
import Separator from "../common/Separator.jsx";
import Title from "../common/Title.jsx";
import PageHeader from "../common/PageHeader.jsx";
import PageBreadcrumbs from "./PageBreadcrumbs.jsx";
import ProjectTag from "./ProjectTagHousingSearch.jsx";
import MainText from "./MainText.jsx";
import Idea from "./Idea.jsx";
import Slider from "./Slider.jsx";
import MoreProjects from "./MoreProjects.jsx";
import PageFooter from "../common/PageFooter.jsx";
import Video from "./Video.jsx";
import BackgroundImageWithIconText from "./testimonial.jsx"; // Import the new component
import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import GridDistortion from "../common/GridDistortion.jsx";
import { FaQuoteLeft, FaQuoteRight, FaStar } from "react-icons/fa"; // Example icon from react-icons
import BeforeAfterSlider from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";
import BackgroundImageWithVideos from "./BackgroundImageWithVideos.jsx";
import SketchFinal from "./SketchFinal.jsx";
import TandaLogo from "/assets/tanda/tanda-logo.png"; // Adjust the path as needed
import TitleMoreProjects from "../common/TitleMoreProjects.jsx";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const Tanda = () => {
  const imageTimeline = useRef();
  const container = useRef();
  const videoRef = useRef();
  const iconsRef = useRef([]);

  const inlineStyles = {
    gridItem1: {
      backgroundColor: "#5AC076",
      padding: "20px",
      textAlign: "center",
      display: "flex", // Enable Flexbox
      justifyContent: "center", // Horizontally center
      alignItems: "center", // Vertically center
      fontFamily: "NeometricBold, sans-serif",
    },
    gridItem2: {},
    gridItem3: {
      backgroundColor: "#000000",
      padding: "20px",
      textAlign: "center",
      display: "flex", // Enable Flexbox
      justifyContent: "center", // Horizontally center
      alignItems: "center", // Vertically center
      fontFamily: "NeometricBold, sans-serif",
      height: "444px",
    },
    gridItem4: {
      fontFamily: "NeometricBold, sans-serif",
      height: "444px",
    },
    heading: {
      fontFamily: "NeometricBold, sans-serif",
    },
    paragraph: {},
  };

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
        onComplete: () => {
          ScrollTrigger.refresh();
        },
      });
    });

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  });

  useEffect(() => {
    // Apply bounce animation to all icons
    gsap.fromTo(
      iconsRef.current,
      { y: -20 }, // Start position
      {
        y: 0, // End position
        duration: 1,
        ease: "bounce.out",
        repeat: -1, // Infinite loop
        repeatDelay: 1, // Delay between repeats
        stagger: 0.4, // Stagger animation for each icon
      }
    );
  }, []);

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
              id="main-image-tanda"
              className="parallax pointer-events-none h-full w-full"
            ></div>
          </Display>
        </div>

        <div className="z-50 container mx-auto flex flex-col items-center p-0 lg:px-0 lg:py-0 lg:pb-0 xl:pb-[130px] gap-y-8  md:gap-y-12 lg:gap-y-16 xl:gap-y-28 2xl:gap-y-[130px]">
          <MainText />

          <Display>
            <div className="solit-el-1 h-full w-full">
              <Video />
            </div>
          </Display>

          <Section
            title={{
              content: "Challenge",
              size: "md",
            }}
            text="Finding the right home can be time-consuming and stressful due to scattered listings, unreliable information, and lengthy negotiations. Buyers and renters often struggle with outdated property details, unclear pricing, and lack of direct communication with property owners."
            expanded={false}
          />

          <Section
            title={{
              content: "Results",
              size: "md",
            }}
            text="Our housing search website addresses these challenges by offering a centralized platform with verified listings, real-time updates, and advanced search filters. As a result, users experience a faster, more transparent, and hassle-free home search, while property owners connect with genuine buyers and tenants more efficiently."
            expanded={false}
          />
        </div>

        {/* Full-width container with 2x2 grid */}
        <div className="w-full max-w-full mx-auto gap-0 p-0">
          

          {/* Pinterest-style image grid */}
          <div className="pinterest-grid">
            {[
              "/assets/hosuing-search/font-used.png",
              "/assets/hosuing-search/laptopwithweb.png",
              "/assets/hosuing-search/color-code.png",
              "/assets/hosuing-search/websiteonphone.png",
              "/assets/hosuing-search/logoandthumbs.png",
              "/assets/hosuing-search/laptopwithweb.png",
            ].map((src, index) => (
              <div key={index} className="pinterest-item">
                <img src={src} alt={`Image ${index + 1}`} className="w-full h-auto rounded-lg" />
              </div>
            ))}
          </div>

          
        </div>

        {/* Second container */}
        <div className="z-50 container mx-auto flex flex-col items-center p-0 lg:px-0 lg:py-0 lg:pb-0 xl:pb-[130px] gap-y-8  md:gap-y-12 lg:gap-y-16 xl:gap-y-28 2xl:gap-y-[130px] 2xl:pt-[130px]">
          <Section
            title={{
              content: "From Idea to Creation: Transforming Housing Searches",
              size: "md",
            }}
            text="The journey from envisioning a seamless housing search experience to building a fully functional platform required innovation and user-centric solutions. We started with the idea of eliminating common challenges in property hunting—such as outdated listings and inefficient communication—and transformed it into a smart, intuitive housing search website. By integrating real-time updates, AI-driven recommendations, and secure messaging, we have created a platform that simplifies the home search process. What began as an idea is now a powerful tool that connects buyers, renters, and property owners effortlessly."
            expanded={false}
          />
          <Display>
            <img
              src="/assets/hosuing-search/find-your-property.png"
              className="solit-el-1 relative top-0 left-0 h-full w-full object-cover"
            />
          </Display>

          <RowDisplay
            image1="/assets/hosuing-search/our-services.png"
            image2="/assets/hosuing-search/dream-home.png"
            classes="solit-el-1"
          /> 

         

          <Section
            title={{
              content: "Craft Your Digital Story: Captivating Audiences Online",
              size: "md",
            }}
            text="We believe in the power of storytelling. Our creative team develops compelling digital branding solutions that capture the essence of your brand and connect with your audience on a deeper level. We specialize in creating engaging content, designing stunning visuals, and implementing innovative strategies to elevate your brand's digital presence and drive meaningful engagement."
          />
        </div>
        <div className="z-50 container mx-auto flex flex-col items-center p-0 lg:px-0 lg:py-0 lg:pb-0 xl:pb-[130px] gap-y-8  md:gap-y-12 lg:gap-y-16 xl:gap-y-28 2xl:gap-y-[130px]">
          <Display>
            <SketchFinal />
          </Display>
          <div className="bg-[#f5f5f5] w-full rounded-4xl pt-44 pb-44">
            <div className="grid grid-cols-4 gap-0 gap-y-24">
              {/* Row 1 */}
              {["icon1", "icon2", "icon3", "icon4", "icon5", "icon6", "icon7", "icon8"].map(
                (icon, index) => (
                  <img
                    key={index}
                    ref={(el) => (iconsRef.current[index] = el)} // Add ref to each icon
                    src={`/assets/tanda/${icon}.png`}
                    alt={`Icon ${index + 1}`}
                    className="w-16 h-16 mx-auto"
                  />
                )
              )}
            </div>
          </div>
        </div>
        <div className="z-50 w-full mx-auto flex flex-col items-center p-0 lg:px-0 lg:py-0 lg:pb-0 xl:pb-[130px] gap-y-8  md:gap-y-12 lg:gap-y-16 xl:gap-y-28 2xl:gap-y-[130px]">
          {/* Add Background Image with Icon and Text */}
          <BackgroundImageWithIconText
            imageUrl="/assets/tanda/testimony-bg.png"
            icon={FaQuoteRight}
            text="the animation in our ad, in our case it was very very successful. They key to that success is your process.  "
            secondImageUrl="/assets/tanda/person.png"
            iconImageUrl="/assets/tanda/double-quotes.png"
          />
        </div>
        <div className="container mx-auto flex flex-col items-center gap-y-8 p-8 md:gap-y-12 lg:gap-y-16 lg:px-0 lg:py-16 lg:pb-12 xl:gap-y-32 xl:pb-32">
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

export default Tanda;
