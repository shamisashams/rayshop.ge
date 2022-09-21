import React, { useRef } from "react";
// import Img1 from "/assets/images/products/1.png";
// import Img2 from "/assets/images/products/2.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { EffectFade, Navigation } from "swiper";
import { CommonButton, LearnMoreBtn, SizePick, SocialMedia } from "./Shared";
import { Link } from '@inertiajs/inertia-react'
// import { ReactComponent as Arrow } from "/assets/svg/longArrow.svg";
import {
  MouseParallaxContainer,
  MouseParallaxChild,
} from "react-parallax-mouse";

const HeroSlider = ({data}) => {
    console.log(data, 'esaa');
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const heroData = [
    {
      category: "ახალი პროდუქტი",
      title: "მაისურის დასახელება",
      paragraph:
        "ამ მაისურის შექმნის იდეა გაჩნდა შემთხვევის წყალობით, რომელმაც უამრავი ადამიანის ცხოვრება მთლიანად შეცვალა.",
      link: "/",
      img: "/assets/images/products/1.png",
      price: "112",
      sizes: ["s", "m", "l", "xl"],
    },
    {
      category: "ახალი პროდუქტი",
      title: "სხვა მაისურის დასახელება",
      paragraph:
        "თხვევის წყალობით, რომელმაც ამ მაისურის შექმნის იდეა გაჩნდა შემუამრავი ადამიანისა.",
      link: "/",
      img: "/assets/images/products/2.png",
      price: "57",
      sizes: ["s", "m", "l", "xl"],
    },
  ];

  return (
    <Swiper
      loop
      slidesPerView={1}
      effect={"fade"}
      modules={[EffectFade, Navigation]}
      className="relative heroSlider"
      onInit={(swiper) => {
        swiper.params.navigation.prevEl = prevRef.current;
        swiper.params.navigation.nextEl = nextRef.current;
        swiper.navigation.init();
        swiper.navigation.update();
      }}
    >
      {heroData.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <div className=" w-screen  lg:h-screen h-full  relative bg-white lg:pt-0 pt-24">
              <div className="absolute left-0 top-0 w-1/2 h-full bg-custom-orange"></div>
              <div className="h-full wrapper  lg:pb-0 pb-10 flex items-center lg:justify-between justify-start relative z-20 flex-col lg:flex-row ">
                <div className="2xl:max-w-lg xl:max-w-md lg:max-w-sm max-w-none w-full shrink">
                  <div className="text-white lg:text-xl bold lg:mb-6 mb-3 ">
                    {item.category}
                  </div>
                  <div className="gadzen 2xl:text-7xl lg:text-5xl sm:text-4xl text-3xl lg:mb-10 mb-3">
                    {item.title}
                  </div>
                  <p className="mb-7 lg:block hidden">{item.paragraph}</p>
                  <LearnMoreBtn href="/" />
                </div>
                <MouseParallaxContainer useWindowMouseEvents>
                  <MouseParallaxChild factorX={0.03} factorY={0.03}>
                    <div className="heroImage transition-all duration-700 ">
                      <img
                        className="w-full h-full object-contain"
                        src={item.img}
                        alt=""
                      />
                    </div>
                  </MouseParallaxChild>
                </MouseParallaxContainer>

                <div className="lg:text-left text-center">
                  <div className="text-custom-blue bold lg:block hidden">
                    ფასი:
                  </div>
                  <div className="lg:my-7 my-3 2xl:text-5xl lg:text-3xl text-2xl gadzen">
                    <span className="2xl:text-8xl lg:text-7xl text-5xl 2xl:pr-6 pr-3">
                      {item.price}
                    </span>
                    ლარი
                  </div>
                  <SizePick sizes={item.sizes} />
                  <div className="flex  flex-nowrap mt-10">
                    <Link href="/" className="sm:mr-6 mr-3 ">
                      <CommonButton text="შეიძინე" />
                    </Link>
                    <CommonButton text="დაამატე კალათში" />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}

      <div className="wrapper absolute left-1/2 -translate-x-1/2 lg:bottom-3 bottom-1/2 translate-y-1/2 lg:translate-y-0 z-20 flex justify-between items-center">
        <SocialMedia />
        <div className="flex items-center lg:w-auto w-full justify-between">
          <div
            ref={prevRef}
            className="flex items-center justify-center relative w-16 h-16 cursor-pointer group"
          >
            <div className="absolute w-full h-full left-0 top-0 rounded-full bg-custom-slate-200 scale-50 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:scale-100 z-0"></div>
            {/* <Arrow className="rotate-180 z-10 lg:fill-gray-400 fill-white" /> */}
            <img src="/assets/svg/longArrow.svg" alt="arrow" className="rotate-180 z-10 lg:fill-gray-400 fill-white" />
          </div>
          <div
            ref={nextRef}
            className="flex items-center justify-center relative w-16 h-16 cursor-pointer group"
          >
            <div className="absolute w-full h-full left-0 top-0 rounded-full bg-custom-orange scale-50 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:scale-100  z-0 "></div>
            {/* <Arrow fill="#000" className=" z-10 " /> */}
            <img src="/assets/svg/longArrow.svg" alt="arrow" className=" z-10 " />
          </div>
        </div>
      </div>
    </Swiper>
  );
};

export default HeroSlider;
