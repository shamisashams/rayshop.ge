import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Pagination, FreeMode, Navigation } from "swiper";
import { Link } from "react-router-dom";
import { ReactComponent as Arrow } from "/assets/svg/longArrow.svg";
import ProductBox from "./ProductBox";
import Product1 from "/assets/images/products/1.png";
import Product2 from "/assets/images/products/2.png";
import Product3 from "/assets/images/products/3.png";
import Product4 from "/assets/images/products/4.png";
import Product5 from "/assets/images/products/5.png";

const ProductSlider = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const data = [
    {
      link: "/",
      image: Product3,
      name: "პირობითი მაქვს",
      sale: false,
      price: "31.90",
      oldPrice: "",
    },
    {
      link: "/",
      image: Product4,
      name: "მემერიდე ბრატ",
      sale: false,
      price: "31.90",
      oldPrice: "",
    },
    {
      link: "/",
      image: Product5,
      name: "პარასკევი",
      sale: false,
      price: "31.90",
      oldPrice: "",
    },
    {
      link: "/",
      image: Product1,
      name: "მემერიდე ბრატ",
      sale: false,
      price: "31.90",
      oldPrice: "",
    },
    {
      link: "/",
      image: Product2,
      name: "პარასკევი",
      sale: false,
      price: "31.90",
      oldPrice: "",
    },
    {
      link: "/",
      image: Product3,
      name: "პირობითი მაქვს",
      sale: false,
      price: "31.90",
      oldPrice: "",
    },
    {
      link: "/",
      image: Product4,
      name: "მემერიდე ბრატ",
      sale: false,
      price: "31.90",
      oldPrice: "",
    },
    {
      link: "/",
      image: Product5,
      name: "პარასკევი",
      sale: false,
      price: "31.90",
      oldPrice: "",
    },
  ];

  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={5}
      modules={[Pagination, FreeMode, Navigation]}
      grabCursor
      pagination={{
        dynamicBullets: true,
      }}
      className="relative"
      freeMode={true}
      onInit={(swiper) => {
        swiper.params.navigation.prevEl = prevRef.current;
        swiper.params.navigation.nextEl = nextRef.current;
        swiper.navigation.init();
        swiper.navigation.update();
      }}
      breakpoints={{
        1650: {
          slidesPerView: 5,
        },
        1300: {
          slidesPerView: 4,
        },
        1000: {
          slidesPerView: 3,
        },
        600: {
          slidesPerView: 2,
          centeredSlides: false,
        },
        200: {
          slidesPerView: 1,
          centeredSlides: true,
        },
      }}
    >
      {data.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <ProductBox
              link={item.link}
              image={item.image}
              name={item.name}
              sale={item.sale}
              price={item.price}
              oldPrice={item.oldPrice}
            />
          </SwiperSlide>
        );
      })}

      <div className="wrapper flex items-center  justify-between pt-5 pb-10">
        {/* <div  ref={prevRef}

              className="flex items-center justify-center relative w-16 h-16 cursor-pointer group"
            >
              <div className="absolute w-full h-full left-0 top-0 rounded-full bg-custom-slate-200 scale-50 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:scale-100 z-0"></div>
              <Arrow  className="rotate-180 z-10 lg:fill-gray-400 fill-white" />
            </div>
            <div
                ref={nextRef}
              className="flex items-center justify-center relative w-16 h-16 cursor-pointer group"
            >
              <div className="absolute w-full h-full left-0 top-0 rounded-full bg-custom-orange scale-50 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:scale-100  z-0 "></div>
              <Arrow fill="#000" className=" z-10 " />
            </div> */}
      </div>
    </Swiper>
  );
};

export default ProductSlider;
