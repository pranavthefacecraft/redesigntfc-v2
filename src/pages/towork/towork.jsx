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
import MoreProjects from "../common/MoreProjects.jsx";
import PageFooter from "../common/PageFooter.jsx";
import PageFooterMobile from "../common/PageFooterMobile.jsx";
import Video from "./Video.jsx";
import BackgroundImageWithIconText from "./testimonial.jsx"; // Import the new component
import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import GridDistortion from "../common/GridDistortion.jsx";
import Sectionidea from "../common/SectionIdea.jsx";
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
        <div className=" pointer-events-none z-50 container mx-auto flex flex-col items-center p-8 lg:px-10 lg:py-16 lg:pb-12 xl:pb-13 gap-y-8 md:gap-y-16 lg:gap-y-16 xl:gap-y-20 2xl:gap-y-20">
          <PageBreadcrumbs />

          <ProjectTag />

          <Display>
            <div
              id="main-image-towork"
              className="parallax pointer-events-none h-full w-full"
            ></div>
          </Display>
        </div>

        <div className="z-50 container mx-auto flex flex-col items-center pt-10 p-8 sm:p-0 md:p-8 lg:p-8 xl:p-8 2xl:p-0 lg:pb-[130px] xl:pb-[130px] 2xl:pb-[130px] gap-y-8 sm:gap-y-8 md:gap-y-12 lg:gap-y-16 xl:gap-y-28 2xl:gap-y-[130px]">
          <MainText />

          <Display>
            <div className="solit-el-1 h-full w-full">
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
          <div className="bg-gray-100 p-0 border">
            <video
              ref={videoRef}
              className="relative top-0 left-0 h-[670px] w-full object-cover"
              poster=""
              muted
              autoPlay
              loop
            >
              <source src="/assets/towork/Colors.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Second container */}

        <div className="z-50 container mx-auto flex flex-col items-center p-8 sm:p-0 md:p-0 lg:p-0 xl:p-8 2xl:p-0 lg:px-0 lg:py-0 pt-[80px] sm:pt-[0px] md:pt-[130px] lg:pt-[130px] xl:pt-[130px] 2xl:pt-[130px] pb-[30px] sm:pb-[130px] md:pb-[130px] lg:pb-[130px] xl:pb-[130px] 2xl:pb-[130px] gap-y-8 sm:gap-y-8 md:gap-y-12 lg:gap-y-16 xl:gap-y-28 2xl:gap-y-[130px]">
          <Sectionidea
            title={{
              content: "Amplifying Gray-Collar Hiring, Igniting Growth",
              size: "md",
            }}
            text="In today’s fast-evolving job market, connecting skilled gray-collar workers with the right employers is crucial for business success and workforce stability. Our job portal enhances the hiring process by leveraging digital solutions to bridge the gap between talent and opportunity. With advanced job-matching algorithms, seamless onboarding, and industry-specific listings, we empower both job seekers and employers to achieve their goals efficiently. By revolutionizing gray-collar recruitment, we drive growth, improve workforce retention, and create a more structured and accessible job market."
            expanded={false}
          />
        </div>
        <div className="z-50 container mx-auto flex flex-col items-center p-8 pt-[0px] sm:pt-[0px] md:pt-[0px] lg:pt-[0px] xl:pt-[0px] 2xl:pt-[0px] pb-[35px] sm:pb-[35px] md:pb-[35px] lg:pb-[35px] xl:pb-[35px] pl-8 sm:pl-0 md:pl-0 lg:pl-8 xl:pl-0 2xl:pl-0 pr-8 sm:pr-0 md:pr-0 lg:pr-8 xl:pr-0 2xl:pr-0 gap-y-0 md:gap-y-12 lg:gap-y-28 xl:gap-y-28 2xl:gap-y-[130px]">
          
          <Display>
            <img
              src="/assets/towork/laptopwithtowork.png"
              className="solit-el-1 relative top-0 left-0 w-full "
            />
          </Display>

          <RowDisplay
            image1="/assets/towork/tabwithtowork.png"
            image2="/assets/towork/man-sitting-on-chair.png"
            classes="solit-el-1"
          />

         
        </div>

        <div className="z-50 container mx-auto flex flex-col items-center p-8 sm:p-0 md:p-0 lg:p-0 xl:p-8 2xl:p-0 lg:px-0 lg:py-0 pt-[20px] sm:pt-[0px] md:pt-[130px] lg:pt-[130px] xl:pt-[130px] 2xl:pt-[100px] pb-[30px] sm:pb-[130px] md:pb-[130px] lg:pb-[130px] xl:pb-[130px] 2xl:pb-[130px] gap-y-8 sm:gap-y-8 md:gap-y-12 lg:gap-y-16 xl:gap-y-28 2xl:gap-y-[130px]">
        <Section
            title={{
              content:
                "Revolutionizing Gray-Collar Recruitment for a Better Workforce",
              size: "md",
            }}
            text="The gray-collar job sector often faces challenges like inefficient hiring, skill mismatches, and high turnover rates. Our job portal is designed to solve these issues by providing a seamless and efficient recruitment platform. We connect skilled workers with the right opportunities, ensuring businesses find reliable employees while job seekers secure stable careers. With an intuitive interface, smart job-matching technology, and industry-focused solutions, we are transforming gray-collar hiring, making it faster, smarter, and more effective for everyone involved."
          />

        </div>

        <div className="z-50 container mx-auto flex flex-col items-center p-8 2xl:pt-[0px] lg:px-0 lg:py-0 lg:pb-0 xl:pb-[130px] pl-8 sm:pl-0 md:pl-0 lg:pl-8 xl:pl-0 2xl:pl-0 pr-8 sm:pr-0 md:pr-0 lg:pr-8 xl:pr-0 2xl:pr-0 gap-y-8 md:gap-y-12 lg:gap-y-[35px] xl:gap-y-15 2xl:gap-y-[65px]">
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
      <PageFooterMobile />
    </>
  );
};

export default Towork;
