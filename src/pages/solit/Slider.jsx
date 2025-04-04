import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Slide = ({ image }) => {
  return (
    <div className="relative h-full w-full overflow-hidden border border-transparent lg:border-4 xl:border-6">
      <img
        src={image}
        className="h-full w-full object-cover select-none rounded-[39px] lg:rounded-[39px]"
      />
    </div>
  );
};

const Slider = () => {
  return (
    <div className="solit-el-1 h-full absolute inset-0 flex items-center justify-center bg-black z-1000">
      <img
        src="/assets/solit/slider-bg.jpg"
        className="pointer-events-none absolute bottom-0 left-0 h-full w-full object-cover select-none"
      />

      <div className="">
        <div className="no-drag relative">
          <img
            src="/assets/solit/phone-cover.png"
            className="no-drag pointer-events-none relative z-50 select-none h-[320px] lg:h-[420px] lg:w-[unset] xl:h-[700px]"
          />

          <div className="absolute inset-0">
            <Swiper
              className="h-full !overflow-visible"
              spaceBetween={35}
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
                <Slide image="/assets/solit/row1.jpg" />
              </SwiperSlide>

              <SwiperSlide>
                <Slide image="/assets/solit/row3.jpg" />
              </SwiperSlide>

              <SwiperSlide>
                <Slide image="/assets/solit/row4.jpg" />
              </SwiperSlide>

              {/* Actual Slides */}

              <SwiperSlide>
                <Slide image="/assets/solit/slide1.png" />
              </SwiperSlide>

              <SwiperSlide>
                <Slide image="/assets/solit/slide2.png" />
              </SwiperSlide>

              <SwiperSlide>
                <Slide image="/assets/solit/slide3.png" />
              </SwiperSlide>

              <SwiperSlide>
                <Slide image="/assets/solit/row1.jpg" />
              </SwiperSlide>

              <SwiperSlide>
                <Slide image="/assets/solit/row3.jpg" />
              </SwiperSlide>

              <SwiperSlide>
                <Slide image="/assets/solit/row4.jpg" />
              </SwiperSlide>

              {/* 3 Next Duplicates */}
              <SwiperSlide>
                <Slide image="/assets/solit/slide1.png" />
              </SwiperSlide>

              <SwiperSlide>
                <Slide image="/assets/solit/slide2.png" />
              </SwiperSlide>

              <SwiperSlide>
                <Slide image="/assets/solit/slide3.png" />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Slider;
