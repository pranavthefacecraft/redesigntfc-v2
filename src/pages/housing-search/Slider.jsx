import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Slide = ({ image }) => {
  return (
    <div className="relative h-full w-full overflow-hidden border border-transparent lg:border-4 xl:border-6">
      <img
        src={image}
        className="h-full w-full rounded-2xl object-cover select-none lg:rounded-3xl"
      />
    </div>
  );
};

const Slider = () => {
  return (
    <div className="solit-el-1 absolute inset-0 flex items-center justify-center bg-black">
      <img
        src="solit/slider-bg.jpg"
        className="pointer-events-none absolute bottom-0 left-0 h-full w-full object-cover select-none"
      />

      <div className="bg-red-500">
        <div className="no-drag relative">
          <img
            src="solit/phone-cover.png"
            className="no-drag pointer-events-none relative z-50 w-28 select-none lg:h-[420px] lg:w-[unset] xl:h-[540px]"
          />

          <div className="absolute inset-0">
            <Swiper
              className="h-full !overflow-visible"
              spaceBetween={12}
              slidesPerView={1}
              initialSlide={2}
              longSwipes={false}
              preventClicksPropagation
              touchMoveStopPropagation
              breakpoints={{
                768: {
                  spaceBetween: 24,
                },
                1024: {
                  spaceBetween: 48,
                },
                1280: {
                  
                  spaceBetween: 120,
                },
              }}
              onSlideChangeTransitionStart={(self) => {
                if (self.activeIndex == 2 || self.activeIndex == 9) {
                  self.disable();
                }

                if (self.activeIndex < 2 || self.activeIndex > 10) {
                  self.setTransition(0);
                  self.slideTo(4, 0);
                  self.disable();
                  setTimeout(() => {
                    self.enable();
                  }, 10);
                }
              }}
              onSlideChangeTransitionEnd={(self) => {
                if (self.activeIndex == 2) {
                  self.enable();
                  self.slideTo(8, 0);
                }

                if (self.activeIndex == 9) {
                  self.enable();
                  self.slideTo(3, 0);
                }
              }}
            >
              {/* 3 Previous Duplicates */}
              <SwiperSlide>
                <Slide image="solit/row1.jpg" />
              </SwiperSlide>

              <SwiperSlide>
                <Slide image="solit/row3.jpg" />
              </SwiperSlide>

              <SwiperSlide>
                <Slide image="solit/row4.jpg" />
              </SwiperSlide>

              {/* Actual Slides */}

              <SwiperSlide>
                <Slide image="solit/slide1.png" />
              </SwiperSlide>

              <SwiperSlide>
                <Slide image="solit/slide2.png" />
              </SwiperSlide>

              <SwiperSlide>
                <Slide image="solit/slide3.png" />
              </SwiperSlide>

              <SwiperSlide>
                <Slide image="solit/row1.jpg" />
              </SwiperSlide>

              <SwiperSlide>
                <Slide image="solit/row3.jpg" />
              </SwiperSlide>

              <SwiperSlide>
                <Slide image="solit/row4.jpg" />
              </SwiperSlide>

              {/* 3 Next Duplicates */}
              <SwiperSlide>
                <Slide image="solit/slide1.png" />
              </SwiperSlide>

              <SwiperSlide>
                <Slide image="solit/slide2.png" />
              </SwiperSlide>

              <SwiperSlide>
                <Slide image="solit/slide3.png" />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Slider;
