import Brand1 from "@/assets/images/brands/emirates.webp";
import Brand2 from "@/assets/images/brands/shark-ninja.webp";
import Brand3 from "@/assets/images/brands/capital-one.png";
import Brand4 from "@/assets/images/brands/redbull.webp";
import Brand5 from "@/assets/images/brands/jd.webp";
import Brand6 from "@/assets/images/brands/kroger.webp";
import Brand7 from "@/assets/images/brands/hubspot.webp";
import Brand8 from "@/assets/images/brands/xbox.png";
import Brand9 from "@/assets/images/brands/sixt.webp";
import Brand10 from "@/assets/images/brands/revolution-beauty-london.webp";
import Brand11 from "@/assets/images/brands/playstation.png";
import Brand12 from "@/assets/images/brands/axa.png";

import BoxImage from "@/assets/images/common/1.webp";
import SlideButton from "@/components/Buttons";
import Image from "next/image";

import "swiper/css";
import "swiper/css/autoplay";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const brands = [
  Brand1,
  Brand2,
  Brand3,
  Brand4,
  Brand5,
  Brand6,
  Brand7,
  Brand8,
  Brand9,
  Brand10,
  Brand11,
  Brand12,
];

export default function Intro() {
  return (
    <section className="px-4 md:px-8">
      <div className="pt-6 xl:pt-12">

        <div className="w-full py-4">
          <div className="grid grid-cols-20 w-full gap-y-2 items-center">
            
            {/* Left Label */}
            <div className="col-span-20 md:col-span-4 lg:col-span-3 xl:col-span-2 flex items-center">
              <h2 className="text-grey-900 text-sm mb-6 md:mb-0 font-medium tracking-tight sm:max-w-32 text-balance text-black">
                The agency behind ...
              </h2>
            </div>

            {/* Carousel Area */}
            <div className="relative w-full col-span-20 md:col-span-16 lg:col-span-17 xl:col-span-18">
              <div className="relative w-full overflow-hidden">
                
                <Swiper
                  modules={[Autoplay]}
                  loop={true}
                  slidesPerView={3}
                  spaceBetween={30}
                  speed={5000}
                  autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                  }}
                  breakpoints={{
                    640: {
                      slidesPerView: 4,
                    },
                    1024: {
                      slidesPerView: 6,
                    },
                  }}
                  className="swiper-linear-behavior w-full"
                >
                  {brands.map((logo, index) => (
                    <SwiperSlide
                      key={index}
                      className="!flex items-center justify-center"
                    >
                      <div className="w-24 h-12 flex items-center justify-center grayscale opacity-100 transition-opacity">
                        <img
                          src={logo.src || logo}
                          alt={`brand-logo-${index}`}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Edge Fade Left */}
                <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-page-bg via-page-bg/40 to-transparent z-10 pointer-events-none" />

                {/* Edge Fade Right */}
                <div className="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-page-bg via-page-bg/40 to-transparent z-10 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 xl:py-24 text-gray-900 font-medium tracking-tight flex flex-col md:flex-row justify-between gap-4">
        
        <div className="contents md:flex md:flex-col md:gap-4 md:order-2 md:w-fit w-fit 2xl:mr-32">
          <h1 className="order-1 text-5xl lg:text-6xl xl:text-7xl 2xl:text-[5.6rem] leading-none max-w-92 md:max-w-fit">
            Driving Demand & <br className="hidden lg:flex" /> Discovery

            <Image
              src={BoxImage}
              alt="BoxImage"
              className="inline ml-2 size-12 md:size-16 xl:size-20 2xl:size-24 rounded-lg md:rounded-xl shrink-0 object-cover align-middle"
            />
          </h1>

          <div className="order-3 flex flex-col md:flex-row items-center gap-3 md:gap-4 w-full md:w-fit">
            <SlideButton className="w-full md:w-fit">
              Our Story
            </SlideButton>

            <SlideButton className="w-full md:w-fit bg-transparent">
              Our Services
            </SlideButton>
          </div>
        </div>

        <div className="order-2 md:order-1 max-w-sm md:max-w-md xl:max-w-lg w-full md:mt-2">
          <p className="text-lg xl:text-2xl leading-6">
            A global team of search-first content marketers engineering semantic
            relevancy & category signals for both the internet and people
          </p>
        </div>
      </div>
    </section>
  );
}