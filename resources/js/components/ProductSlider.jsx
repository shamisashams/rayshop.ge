import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Pagination, FreeMode, Navigation } from "swiper";
import { Link, Route } from "react-router-dom";
import { ReactComponent as Arrow } from "/assets/svg/longArrow.svg";
import ProductBox from "./ProductBox";
import { Inertia } from '@inertiajs/inertia'

const ProductSlider = ({data}) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

//   const data = [
//     {
//       link: "/",
//       image: Product3,
//       name: "პირობითი მაქვს",
//       sale: false,
//       price: "31.90",
//       oldPrice: "",
//     },
//     {
//       link: "/",
//       image: Product4,
//       name: "მემერიდე ბრატ",
//       sale: false,
//       price: "31.90",
//       oldPrice: "",
//     },
//     {
//       link: "/",
//       image: Product5,
//       name: "პარასკევი",
//       sale: false,
//       price: "31.90",
//       oldPrice: "",
//     },
//     {
//       link: "/",
//       image: Product1,
//       name: "მემერიდე ბრატ",
//       sale: false,
//       price: "31.90",
//       oldPrice: "",
//     },
//     {
//       link: "/",
//       image: Product2,
//       name: "პარასკევი",
//       sale: false,
//       price: "31.90",
//       oldPrice: "",
//     },
//     {
//       link: "/",
//       image: Product3,
//       name: "პირობითი მაქვს",
//       sale: false,
//       price: "31.90",
//       oldPrice: "",
//     },
//     {
//       link: "/",
//       image: Product4,
//       name: "მემერიდე ბრატ",
//       sale: false,
//       price: "31.90",
//       oldPrice: "",
//     },
//     {
//       link: "/",
//       image: Product5,
//       name: "პარასკევი",
//       sale: false,
//       price: "31.90",
//       oldPrice: "",
//     },
//   ];

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
      {data.map((e, index) => {
        return (
          <SwiperSlide key={index}>
            {/* <ProductBox
            //   link={item.link}
              link={route("client.product.show", item.slug)}
              image={
                item.files != null
                ? "/" +
                  item.files[0].path +
                  "/" +
                  item.files[0].title
                : null

              }
              name={item.title}
              sale={item.special_price? true : false}
              price={item.price}
              oldPrice={item.oldPrice}
            /> */}
             <ProductBox
key={index}
              link={route("client.product.show", e.slug)}
              image={
                e.files != null && e.files[0]
                ? "/" +
                  e.files[0].path +
                  "/" +
                  e.files[0].title
                : null
              }
              name={e.title}
              sale={e.special_price? true : false}
              oldPrice={e.price}
              price={e.special_price? e.special_price : e.price}
              handleClick={
                ()=>{
                 Inertia.visit(route("client.product.show", e.slug))
                }
            }

            />


{/* sale={e.special_price? true : false}
              oldPrice={e.price}
              price={e.special_price} */}
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
