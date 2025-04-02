import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import required modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Idea = () => {
  return (
    <div id="idea-grid" className="solit-el-1">
      <div className="grid h-full w-full grid-cols-1 gap-4 z-2000 border-amber-300">
        {/* Row 1: 40%, 30%, 30% columns */}
        <div className="grid grid-cols-10 gap-4">
          <div className="col-span-4 min-h-[200px] p-0">
            <img
              src="/assets/rafw/collage-image-4.png"
              className="top-0 left-0 h-full w-full object-cover object-right-top"
            />
          </div>
          <div className="col-span-3 min-h-[200px]">
            <img
              src="/assets/rafw/collage-image-1.png"
              className="top-0 left-0 w-full object-cover"
            />
          </div>
          <div className="col-span-3 min-h-[200px]">
            <video
              src="/assets/rafw/leaf.mp4"
              className="h-full w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>

        {/* Row 2: 50%, 50% columns */}
        <div className="grid grid-cols-2 gap-4">
          <div className="min-h-[200px]">
            <img
              src="/assets/rafw/collage-image-2.png"
              className="top-0 left-0 w-full h-100 object-cover"
            />
          </div>
          <div className="flex min-h-[200px] flex-col bg-[#c09c45] p-14 justify-center items-center">
            {/* Import statements should be added at the top of your file:
              import { Swiper, SwiperSlide } from 'swiper/react';
              import { Navigation, Pagination } from 'swiper/modules';
              import 'swiper/css';
              import 'swiper/css/navigation';
              import 'swiper/css/pagination';
            */}
            <Swiper
  direction={"vertical"}
  slidesPerView={2}
  slidesPerGroup={2}
  spaceBetween={20}
  modules={[Autoplay]}
  autoplay={{
    delay: 3000,
    disableOnInteraction: false,
  }}
  loop={true}
  className="h-[200px] w-full"
>
              <SwiperSlide className="flex items-center justify-center rounded">
                <h3 className="2xl:text-[60px] font-bold">Cardo</h3>
              </SwiperSlide>
              <SwiperSlide className="flex items-center justify-center rounded">
              <h3 className="2xl:text-[60px] font-bold">AaBbCc 123</h3>
              </SwiperSlide>
              <SwiperSlide className="flex items-center justify-center rounded">
              <h3 className="2xl:text-[60px] font-bold">Cardo</h3>
              </SwiperSlide>
              <SwiperSlide className="flex items-center justify-center rounded">
              <h3 className="2xl:text-[60px] font-bold">AaBbCc 123</h3>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>

        {/* Row 3: Equal width columns (33.33% each) */}
        <div className="grid grid-cols-3 gap-4">
          <div className="flex min-h-[200px] flex-col bg-[#000000] p-14 justify-center items-center">
            {/* Import statements should be added at the top of your file:
              import { Swiper, SwiperSlide } from 'swiper/react';
              import { Navigation, Pagination } from 'swiper/modules';
              import 'swiper/css';
              import 'swiper/css/navigation';
              import 'swiper/css/pagination';
            */}
            <Swiper
  direction={"vertical"}
  slidesPerView={2}
  slidesPerGroup={2}
  spaceBetween={20}
  modules={[Autoplay]}
  autoplay={{
    delay: 3000,
    disableOnInteraction: false,
  }}
  loop={true}
  className="h-[200px] w-full"
>
              <SwiperSlide className="flex items-center justify-center rounded">
                <h3 className="2xl:text-[60px] font-bold text-[#c09c45]">Cardo</h3>
              </SwiperSlide>
              <SwiperSlide className="flex items-center justify-center rounded">
              <h3 className="2xl:text-[60px] font-bold text-[#c09c45]">AaBbCc 123</h3>
              </SwiperSlide>
              <SwiperSlide className="flex items-center justify-center rounded">
              <h3 className="2xl:text-[60px] font-bold text-[#c09c45]">Cardo</h3>
              </SwiperSlide>
              <SwiperSlide className="flex items-center justify-center rounded">
              <h3 className="2xl:text-[60px] font-bold text-[#c09c45]">AaBbCc 123</h3>
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="min-h-[200px] p-0">
          <img
              src="/assets/rafw/collage-image-3.png"
              className="top-0 left-0 w-full h-100 object-cover"
            />
          </div>
          <div className="min-h-[100px] p-0">
          <video
              src="/assets/rafw/cow-text.mp4"
              className="h-[400px] w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Idea;
