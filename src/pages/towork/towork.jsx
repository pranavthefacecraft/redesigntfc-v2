import "./towork.css";
import Display from "../common/Display.jsx";
import Text from "../common/Text.jsx";
import Section from "../common/Section.jsx";
import RowDisplay from "../common/RowDisplay.jsx";
import Separator from "../common/Separator.jsx";
import Title from "../common/Title.jsx";
import PageHeader from "../common/PageHeader.jsx";
import PageBreadcrumbs from "./PageBreadcrumbs.jsx";
import ProjectTag from "./ProjectTagTowork.jsx";
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
import mobileInHand from "/assets/towork/mobile-in-hand.png"; // Adjust the path as needed
import ToworkMotto from "/assets/towork/towork-motto.png"; // Adjust the path as needed
import ManImage from "/assets/towork/man.png"; // Adjust the path as needed
import WomanWithPhone from "/assets/towork/womanwithphone.png"; // Adjust the path as needed
import ToworkLogo from "/assets/towork/towork-logo.png"; // Adjust the path as needed
import TitleMoreProjects from "../common/TitleMoreProjects.jsx";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const Towork = () => {
  const imageTimeline = useRef();
  const container = useRef();
  const videoRef = useRef();
  const iconsRef = useRef([]);

  const inlineStyles = {
    gridItem1: {
      backgroundColor: "#5AC076",
      padding: "0px",
      textAlign: "center",
      display: "flex", // Enable Flexbox
      justifyContent: "center", // Horizontally center
      alignItems: "flex-start", // Vertically center
      fontFamily: "NeometricBold, sans-serif",
    },
    gridItem2: {},
    gridItem3: {
      backgroundColor: "#000000",
      padding: "0px",
      textAlign: "center",
      display: "flex", // Enable Flexbox
      justifyContent: "center", // Horizontally center
      alignItems: "flex-start", // Vertically center
      fontFamily: "NeometricBold, sans-serif",
      height: "444px",
    },
    gridItem4: {
      fontFamily: "NeometricBold, sans-serif",
      
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
              id="main-image-towork"
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
            text="Finding the right talent for gray-collar jobs can be challenging due to skill gaps, high attrition rates, and the lack of a structured hiring process. Employers often struggle to connect with qualified candidates, while job seekers face difficulties in accessing reliable opportunities."
            expanded={false}
          />

          <Section
            title={{
              content: "Results",
              size: "md",
            }}
            text="Our job portal addresses these challenges by streamlining recruitment, offering skill-based job matching, and providing a seamless hiring experience. As a result, businesses can quickly fill positions with competent workers, and job seekers gain access to better career opportunities, leading to increased employment rates and workforce stability."
            expanded={false}
          />
        </div>

        {/* Full-width container with 2x2 grid */}
        <div className="w-full max-w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-0 p-0 overflow-hidden">
          {/* Grid Item 1 */}
          <div style={inlineStyles.gridItem1}>
            <img
              src={mobileInHand}
              alt="TandaLogo"
              className="w-full h-full mx-auto object-cover"
            />
          </div>

          {/* Grid Item 2 */}
          <div className="text-center py-0">
            <img
              src={ToworkMotto}
              alt="TandaLogo"
              className="w-full h-auto mx-auto object-cover"
            />
          </div>

          {/* Grid Item 3 */}
          <div className="" style={inlineStyles.gridItem3}>
            <img
              src={ManImage}
              alt="TandaLogo"
              className="w-full h-auto mx-auto object-cover"
            />
          </div>

          {/* Grid Item 4 */}
          <div className="" style={inlineStyles.gridItem3}>
            <img
              src={WomanWithPhone}
              alt="TandaLogo"
              className="w-full h-auto mx-auto object-cover"
            />
          </div>

          {/* Grid Item 5 */}
          <div className="" style={inlineStyles.gridItem3}>
            <div className="grid grid-rows-2 grid-cols-1 gap-0">
              {/* Row 1, Column 1 */}
              <div className="">
                <img
                  src={ToworkLogo}
                  alt="TandaLogo"
                  className="w-full h-auto mx-auto object-cover"
                />
              </div>

              {/* Row 1, Column 2 */}
              <div className="bg-[#ffffff] text-start">
                <video
                  ref={videoRef}
                  className="relative top-0 left-0 h-full w-full object-cover"
                  
                  poster=""
                  muted
                  autoPlay
                  loop
                >
                  <source
                    src="/assets/towork/grid-video-v1.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>

          {/* Grid Item 6 */}
          <div className="bg-gray-100 p-0 border" >
          <video
                  ref={videoRef}
                  className="relative top-0 left-0 h-[670px] w-full object-cover"
                  
                  poster=""
                  muted
                  autoPlay
                  loop
                >
                  <source
                    src="/assets/towork/Colors.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
          </div>
        </div>

        {/* Second container */}
        <div className="z-50 container mx-auto flex flex-col items-center p-0 lg:px-0 lg:py-0 lg:pb-0 xl:pb-[130px] gap-y-8  md:gap-y-12 lg:gap-y-16 xl:gap-y-28 2xl:gap-y-[130px] 2xl:pt-[130px]">
          <Section
            title={{
              content: "Amplifying Gray-Collar Hiring, Igniting Growth",
              size: "md",
            }}
            text="In today’s fast-evolving job market, connecting skilled gray-collar workers with the right employers is crucial for business success and workforce stability. Our job portal enhances the hiring process by leveraging digital solutions to bridge the gap between talent and opportunity. With advanced job-matching algorithms, seamless onboarding, and industry-specific listings, we empower both job seekers and employers to achieve their goals efficiently. By revolutionizing gray-collar recruitment, we drive growth, improve workforce retention, and create a more structured and accessible job market."
            expanded={false}
          />
          <Display>
            <img
              src="/assets/towork/laptopwithtowork.png"
              className="solit-el-1 relative top-0 left-0 h-full w-full object-cover"
            />
          </Display>

         <RowDisplay
            image1="/assets/towork/tabwithtowork.png"
            image2="/assets/towork/man-sitting-on-chair.png"
            classes="solit-el-1"
          /> 

          

          <Section
            title={{
              content: "Revolutionizing Gray-Collar Recruitment for a Better Workforce",
              size: "md",
            }}
            text="The gray-collar job sector often faces challenges like inefficient hiring, skill mismatches, and high turnover rates. Our job portal is designed to solve these issues by providing a seamless and efficient recruitment platform. We connect skilled workers with the right opportunities, ensuring businesses find reliable employees while job seekers secure stable careers. With an intuitive interface, smart job-matching technology, and industry-focused solutions, we are transforming gray-collar hiring, making it faster, smarter, and more effective for everyone involved."
          />
        </div>
        
        <div className="z-50 container mx-auto flex flex-col items-center p-0 lg:px-0 lg:py-0 lg:pb-0 xl:pb-[130px] gap-y-8  md:gap-y-12 lg:gap-y-16 xl:gap-y-28 2xl:gap-y-[130px]">
        <Display>
            <img
              src="/assets/towork/all-device-size.png"
              className="solit-el-1 relative top-0 left-0 h-full w-full object-cover"
            />
          </Display>

          <Display>
            <img
              src="/assets/towork/woman-staff.png"
              className="solit-el-1 relative top-0 left-0 h-full w-full object-cover"
            />
          </Display>
          
          <RowDisplay
            image1="/assets/towork/become-a-seller.png"
            image2="/assets/towork/service-page.png"
            classes="solit-el-1"
          /> 
          <Display>
            <img
              src="/assets/towork/Phones.png"
              className="solit-el-1 relative top-0 left-0 h-full w-full object-cover"
            />
          </Display>
          
          
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

          <MoreProjects />
        </div>
      </div>

      <PageFooter />
    </>
  );
};

export default Towork;
