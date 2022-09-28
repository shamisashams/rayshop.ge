import React, { useRef,useState } from "react";
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
import { ReactComponent as Eye } from "/assets/svg/eye.svg";
import {
  MouseParallaxContainer,
  MouseParallaxChild,
} from "react-parallax-mouse";
import { Route } from "react-router-dom";

const addToCart = function (product,size) {
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

const HeroSlider = ({data, sizes,cat, product}) => {
    // console.log(product);
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
    data.map((item,index)=>{
           return(
            <SwiperSlide key={index}>
            <div className=" w-screen  lg:h-screen h-full  relative bg-white lg:pt-0 pt-24">
              <div className="absolute left-0 top-0 w-1/2 h-full bg-custom-orange"></div>
              <div className="h-full wrapper  lg:pb-0 pb-10 flex items-center lg:justify-between justify-start relative z-20 flex-col lg:flex-row ">
                <div className="2xl:max-w-lg xl:max-w-md lg:max-w-sm max-w-none w-full shrink">
                  <div className="text-white lg:text-xl bold lg:mb-6 mb-3 ">
                  {/* {item.product.title} */}
{
    cat.map((e,i)=>{
        if(item.id == e.id)
        {
            return(
            e.title
        )
        }
    })
}
                  </div>
                  <div className="gadzen 2xl:text-7xl lg:text-5xl sm:text-4xl text-3xl lg:mb-10 mb-3">
                    {product.title}
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
      href={route("client.product.index")}
      className="learnMoreBtn flex items-center bold text-xl group"
    >
      <div className="flex items-center justify-center rounded-full bg-black w-12 h-12 mr-2 group-hover:bg-white transition-all duration-300">
        <img src="/assets/svg/eye.svg" alt="eye"  className="group-hover:fill-black fill-white transition-all duration-300"/>
      </div>

      {/* <div className="flex items-center justify-center rounded-full bg-black w-12 h-12 mr-2 group-hover:bg-white transition-all duration-300">
        <Eye  />
      </div> */}
      <span>სრულად ნახვა</span>
    </Link>
                </div>
                <MouseParallaxContainer useWindowMouseEvents>
                  <MouseParallaxChild factorX={0.03} factorY={0.03}>
                    <div className="heroImage transition-all duration-700 ">
                      <img
                        className="w-full h-full object-contain"
                        // src={item.img}
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
                    </div>
                  </MouseParallaxChild>
                </MouseParallaxContainer>

                <div className="lg:text-left text-center">
                  <div className="text-custom-blue bold lg:block hidden">
                    {/* ფასი: */}
                    {__("client.slider_price",sharedData)}

                  </div>
                  <div className="lg:my-7 my-3 2xl:text-5xl lg:text-3xl text-2xl gadzen">
                    <span className="2xl:text-8xl lg:text-7xl text-5xl 2xl:pr-6 pr-3">
                      {/* {item.price} */}
                      {/* 213 */}
                      {product.special_price ?product.special_price: product.price }
                    </span>
                    ლარი
                  </div>
                  {/* <SizePick sizes={sizes} product={product} /> */}
                  <div className="bold mb-5">{__("client.slider_size",sharedData)} :</div>
                  <div className="sizeFlex flex flex-wrap">
      <div className="sizeFlex flex flex-wrap">
        {sizes.map((size, i) => {
          return (
            <button
              onClick={() =>
                {
                    setSizePicked(true)
                    setPicked(i)
                    if(!product.sizes.find((e)=> e.id == size.id)){
                        alert('araa maragshi')
                     }
                }
                }
              key={i}
              className={`flex items-center justify-center rounded-full w-12 h-12 mr-2 group-hover:bg-white transition-all duration-300 mr-3 uppercase mb-2 ${
                picked == i && sizepicked
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
                    if(!product.sizes.find((e)=> e.id == sizes[picked].id)){
                        alert('araa maragshi')
                        return 0;
                     }else{
                         addToCart(product, sizesArr[picked])
                         Inertia.visit(route("client.checkout.index"))
                     }
                  }
                }
      className={`bold xl:py-5 py-4 xl:px-12 px-9 relative commonBtn whitespace-nowrap xl:text-base text-sm`}
    >
      შეიძინე
    </button>
                    {/* <CommonButton text="დაამატე კალათში" /> */}
                    <button onClick={()=>{
                    // console.log(sizes[picked].id, 'esaa zoma', product.sizes);
                    // alert(sizes[picked].id)
                     if(!product.sizes.find((e)=> e.id == sizes[picked].id)){
                        alert('araa maragshi')
                        return 0;
                     }else addToCart(product, sizesArr[picked])
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
