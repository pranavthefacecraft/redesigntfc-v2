import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Slide = ({ image }) => {
  return (
    <div className="relative h-full w-full overflow-hidden border border-transparent lg:border-4 xl:border-6">
      <img
        src={image}
        className="h-full w-full object-cover select-none rounded-[20px] lg:rounded-[39px]"
      />
    </div>
  );
};

const Slider = () => {
  return (
    <div className="solit-el-1 h-full relative inset-0 flex items-center justify-center bg-black z-1000">
      <img
        src="/assets/bhms/hording.png"
        className="pointer-events-none relative bottom-0 left-0 w-full object-cover select-none"
      />

      
    </div>
  );
};
export default Slider;
