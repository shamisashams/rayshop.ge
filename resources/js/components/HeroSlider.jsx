import React, { useRef, useState } from "react";
// import Img1 from "/assets/images/products/1.png";
// import Img2 from "/assets/images/products/2.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { EffectFade, Navigation } from "swiper";
import { CommonButton, LearnMoreBtn, SizePick, SocialMedia } from "./Shared";
import { Link, usePage } from "@inertiajs/inertia-react";
import { Inertia } from '@inertiajs/inertia'
import {
  MouseParallaxContainer,
  MouseParallaxChild,
} from "react-parallax-mouse";
import { Route } from "react-router-dom";

const addToCart = function (product, size) {
  //localStorage.removeItem('cart')
  let _cart = localStorage.getItem("cart");
  let cart;
  if (_cart !== null) {
    cart = JSON.parse(_cart);
  } else cart = [];
  let qty = 1;
  if (cart.length > 0) {
    let exists = false;
    cart.forEach(function (el, i) {
      if (el.product.id === product.id && el.size == size) {
        el.qty += qty;
        exists = true;
      }
    });
    if (!exists) {
      let obj = {
        product: product,
        size: size,
        qty: qty,
      };
      cart.push(obj);
    }
  } else {
    let obj = {
      product: product,
      size: size,
      qty: qty,
    };
    cart.push(obj);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  Inertia.visit(window.location.href)
};

const HeroSlider = ({ data, sizes, cat, product,productCat }) => {
  let sizesArr = new Array();
  sizes.forEach(el => {
    sizesArr.push(el.name)
  });
  const [sizepicked, setSizePicked] = useState(false);
  const [picked, setPicked] = useState(0);
  const renderHTML = (rawHTML) =>
    React.createElement("div", {
      dangerouslySetInnerHTML: { __html: rawHTML },
    });
  const sharedData = usePage().props.localizations;

  const prevRef = useRef(null);
  const nextRef = useRef(null);


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
      {
        data.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <div className=" w-screen  lg:h-screen h-full  relative bg-white lg:pt-0 pt-24">
                <div className="absolute left-0 top-0 w-1/2 h-full bg-custom-orange"></div>
                <div className="h-full wrapper  lg:pb-0 pb-10 flex items-center lg:justify-between justify-start relative z-20 flex-col lg:flex-row ">
                  <div className="2xl:max-w-lg xl:max-w-md lg:max-w-sm max-w-none w-full shrink">
                    <div className="text-white lg:text-xl bold lg:mb-6 mb-3 gadzen">
                      {/* {item.product.title} */}

                      {
                          productCat.map((el, it) => {
                            if(el.product_id == item.product.id){
                                let category = cat.find((e)=>e.id == el.category_id)
                                // console.log(category.title , 'esaaa');
                                 return category.title
                                // cat.map((e,i)=>{
                                //     return e.title
                                // })
                                // return 'asdasdsd'
                            }
                          })
                      }
                    </div>
                    <div className="2xl:text-7xl lg:text-5xl sm:text-4xl text-3xl lg:mb-10 mb-3 gadzen">
                      {/* {product.title} */}
                      {
                        product.map((e, i) => {
                          if (e.id == item.product.id) {
                            return (
                              e.title
                            )
                          }
                        })
                      }
                    </div>
                    <p className="mb-7 lg:block hidden">
                      {/* {item.product.title} */}
                      {/* {__("client.slider_text", sharedData)} */}
                      {item.text}
                    </p>
                    {/* <Link href={route("client.product.index")} style={{zIndex:9999}}>
                          <LearnMoreBtn />
                    </Link> */}

                    <Link
                      href={route("client.product.show", item.product.slug)}
                      className="learnMoreBtn flex items-center bold text-xl group justify-start"
                    >
                      <div className="flex items-center justify-center rounded-full bg-black w-12 h-12 mr-2 group-hover:bg-white transition-all duration-300">
                        <svg className="group-hover:fill-black fill-white transition-all duration-300" xmlns="http://www.w3.org/2000/svg" width="24.952" height="19.282" viewBox="0 0 24.952 19.282">
                          <g id="noun-eye-5102066" transform="translate(-93.334 -81.66)">
                            <path id="Path_13" data-name="Path 13" d="M105.81,163.34a13.19,13.19,0,0,0-4.536,1.144,55.154,55.154,0,0,0-7.68,4.05.567.567,0,0,0,0,.954,55.139,55.139,0,0,0,7.68,4.05,13.19,13.19,0,0,0,4.536,1.144,13.19,13.19,0,0,0,4.536-1.144,55.145,55.145,0,0,0,7.68-4.05.567.567,0,0,0,0-.954,55.148,55.148,0,0,0-7.68-4.05A13.19,13.19,0,0,0,105.81,163.34Zm0,1.134a4.537,4.537,0,1,1-4.537,4.537A4.539,4.539,0,0,1,105.81,164.474Zm4.644,1.283a5.667,5.667,0,0,1,0,6.507c.342-.147.684-.3,1.022-.46a56.957,56.957,0,0,0,5.168-2.794,56.962,56.962,0,0,0-5.168-2.793c-.339-.158-.681-.313-1.022-.46Zm-9.288,0c-.342.147-.684.3-1.022.46a56.941,56.941,0,0,0-5.168,2.793,56.924,56.924,0,0,0,5.168,2.794c.339.158.681.313,1.022.46a5.667,5.667,0,0,1,0-6.507Z" transform="translate(0 -77.71)" fillRule="evenodd" />
                            <path id="Path_14" data-name="Path 14" d="M305.6,233.34a2.268,2.268,0,1,0,2.268,2.268A2.269,2.269,0,0,0,305.6,233.34Zm0,1.134a1.134,1.134,0,1,1-1.134,1.134A1.135,1.135,0,0,1,305.6,234.474Z" transform="translate(-199.794 -144.307)" fillRule="evenodd" />
                            <path id="Path_15" data-name="Path 15" d="M338.34,82.227v1.7a.567.567,0,1,0,1.134,0v-1.7a.567.567,0,1,0-1.134,0Z" transform="translate(-233.096)" fillRule="evenodd" />
                            <path id="Path_16" data-name="Path 16" d="M339.462,422.267v-1.7a.567.567,0,1,0-1.134,0v1.7a.567.567,0,1,0,1.134,0Z" transform="translate(-233.085 -321.892)" fillRule="evenodd" />
                            <path id="Path_17" data-name="Path 17" d="M415.083,106.966l-.851,1.473a.567.567,0,1,0,.982.567l.851-1.473a.567.567,0,1,0-.982-.567Z" transform="translate(-305.228 -23.806)" fillRule="evenodd" />
                            <path id="Path_18" data-name="Path 18" d="M246.065,401.989l.851-1.473a.567.567,0,1,0-.982-.567l-.851,1.473a.567.567,0,1,0,.982.567Z" transform="translate(-144.299 -302.547)" fillRule="evenodd" />
                            <path id="Path_19" data-name="Path 19" d="M245.073,107.527l.851,1.473a.567.567,0,1,0,.982-.567l-.851-1.473a.567.567,0,1,0-.982.567Z" transform="translate(-144.291 -23.8)" fillRule="evenodd" />
                            <path id="Path_20" data-name="Path 20" d="M416.068,401.428l-.851-1.473a.567.567,0,1,0-.982.567l.851,1.473a.567.567,0,1,0,.982-.567Z" transform="translate(-305.23 -302.553)" fillRule="evenodd" />
                          </g>
                        </svg>
                      </div>
                      <span className="mx-5">სრულად ნახვა</span>
                    </Link>
                  </div>
                  <MouseParallaxContainer useWindowMouseEvents>
                    <MouseParallaxChild factorX={0.03} factorY={0.03}>
                      <div className="heroImage transition-all duration-700 ">
                        <Link href={route("client.product.show", item.product.slug)}>
                          <img
                            className="w-full h-full object-contain"
                            src={
                              item.file != null
                                ? "/" +
                                item.file.path +
                                "/" +
                                item.file.title
                                : null
                            }
                            alt=""
                          />
                        </Link>
                      </div>
                    </MouseParallaxChild>
                  </MouseParallaxContainer>

                  <div className="lg:text-left text-center">
                    <div className="text-custom-blue bold lg:block hidden">
                      {/* ფასი: */}
                      {__("client.slider_price", sharedData)}

                    </div>
                    <div className="lg:my-7 my-3 2xl:text-5xl lg:text-3xl text-2xl gadzen">
                      <span className="2xl:text-8xl lg:text-7xl text-5xl 2xl:pr-6 pr-3">
                        {/* {item.price} */}
                        {/* 213 */}
                        {item.product.special_price ? item.product.special_price : item.product.price}
                      </span>
                      ლარი
                    </div>
                    {/* <SizePick sizes={sizes} product={product} /> */}
                    <div className="bold mb-5">{__("client.slider_size", sharedData)} :</div>
                    <div className="sizeFlex flex flex-wrap">
                      <div className="sizeFlex flex flex-wrap">
                        {/* {product.map((e)=>{
            if(e.id == item.product.id){
            }
        })} */}
                        {
                          // sizes
                          product[index].sizes
                            .map((size, i) => {
                              return (
                                <button
                                  onClick={() => {
                                    setSizePicked(true)
                                    setPicked(i)
                                    let iteration
                                    product.map((e, i) => {
                                      if (e.id == item.product.id) {
                                        iteration = i
                                      }
                                    })
                                    if (!product[iteration].sizes.find((e) => e.id == size.id)) {
                                      alert('არაა მარაგში')
                                    }
                                  }
                                  }
                                  key={i}
                                  className={`flex items-center justify-center rounded-full w-12 h-12 mr-2 group-hover:bg-white transition-all duration-300 mr-3 uppercase mb-2 ${picked == i && sizepicked
                                      ? "bg-black text-white"
                                      : "bg-custom-slate-200 text-black"
                                    }`}
                                >
                                  {size.name}
                                </button>
                              );
                            })}
                      </div>
                    </div>
                    <div className="flex  flex-nowrap mt-10">
                    <button onClick={()=>{
                      if(item.product.quantity == 0){
                        alert("არაა მარაგში");
                        return 0;
                    }
                     let iteration
                     product.map((e,i)=>{
                         if(e.id == item.product.id){
                             iteration = i
                         }
                     })
                    if(!product[iteration].sizes.find((e)=> e.id == sizes[picked].id)){
                        if(!sizepicked){
                            alert('აირჩიეთ ზომა')
                        }
                     }else{
                        if(sizepicked){
                            addToCart(product[iteration], sizesArr[picked])
                            Inertia.visit(route("client.checkout.index"))
                        }else{
                            alert('აირჩიეთ ზომა')
                        }
                     }
                  }
                }
      className={`bold xl:py-5 py-4 xl:px-12 px-9 relative commonBtn whitespace-nowrap xl:text-base text-sm`}
    >
      შეიძინე
    </button>
                      {/* <CommonButton text="დაამატე კალათში" /> */}
                      <button onClick={() => {
                        if (item.product.quantity == 0) {
                          alert("არაა მარაგში");
                          return 0;
                        }
                        let iteration
                        product.map((e, i) => {
                          if (e.id == item.product.id) {
                            iteration = i
                          }
                        })

                        if (!product[iteration].sizes.find((e) => e.id == sizes[picked].id)) {
                          if (!sizepicked) {
                            alert('აირჩიეთ ზომა!')
                            return 0;
                          } else {
                            alert('არაა მარაგში')
                            return 0;
                          }
                        } else {
                          if (sizepicked) {
                            addToCart(product[iteration], sizesArr[picked])
                          } else {
                            alert('აირჩიეთ ზომა!')
                          }

                        }
                      }
                      }
                        className={`bold xl:py-5 py-4 xl:px-12 px-9 relative commonBtn whitespace-nowrap xl:text-base text-sm ml-4`}>
                        დაამატე კალათში
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        })
      }

      <div className="h-fit wrapper absolute left-1/2 -translate-x-1/2 lg:bottom-3 bottom-1/2 translate-y-1/2 lg:translate-y-0 z-20 flex justify-between items-center">
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
