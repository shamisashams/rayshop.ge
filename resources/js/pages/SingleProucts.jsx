import React, { useState } from "react";
import { Link, usePage } from '@inertiajs/inertia-react'
import { CommonButton, SizePick, SocialMedia } from "../components/Shared";
import ProductSlider from "../components/ProductSlider";
import Form from "../components/Form";
import Layout from "../Layouts/Layout";
import { identity, indexOf } from "lodash";
import { Inertia } from '@inertiajs/inertia'
import { useForkRef } from "@mui/material";

const SingleProucts = ({seo,sizes,product,sameproduct}) => {
    const {pathname} = usePage().props;
    let sizesArr = new Array();
    sizes.forEach(el => {
             sizesArr.push(el.name)
    });
    const addToCart = function (product,size) {
        // localStorage.removeItem('cart')
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

    const [picked, setPicked] = useState(0);
  const [imageIndex, setImageIndex] = useState(() => {
    let iteration = null;
    product.files.map((e,i)=>{
        if(e.main) iteration = i
    })
    if (iteration != null) {
      return iteration;
    }

    return 0;
  });
  const [sizepicked, setSizePicked] = useState(false);
let imgs = new Array();
product.files.map((e,i)=>{
    // if(e.main){setImageIndex(i)}
    imgs.push("/"+e.path+"/"+e.title)
})

  return (
    <Layout seo={seo}>
      <section className="h-fit min-h-screen relative">
        <div className=" absolute left-0 top-0 w-1/2 h-full bg-custom-slate-300"></div>
        <div className="wrapper flex items-start justify-start relative pt-40 pb-10 flex-col lg:flex-row">
          <div className=" lg:w-1/2 w-full lg:mr-10 mb-12 lg:mb-0">
            <div className="singleMainImg mb-4 mx-auto">
              <img
                className="h-full w-full object-contain "
                src={imgs[imageIndex]}
                alt=""
              />
            </div>
            <div className="flex items-center justify-center flex-wrap">
              {imgs.map((item, index) => {
                return (
                  <div
                    onClick={() => setImageIndex(index)}
                    key={index}
                    style={{overflow:'hidden'}}
                    className={`flex justify-center item-center md:w-32 md:h-36 w-24 h-24 md:mx-2 mx-1 mb-1 bg-white transition-all duration-300 md:p-3 p-1 cursor-pointer border border-white hover:border-slate-300 ${
                      index === imageIndex ? "!border-custom-orange" : ""
                    } `}
                  >
                    <img className="object-contain" src={item} alt="" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="">
            <div className="lg:text-3xl text-2xl bold mb-6">
              {/* მაისურის დასახელება */}
              {product.title}
            </div>
            <div className="lg:text-left ">
              <div className="text-custom-blue bold lg:block hidden mb-2">
                ფასი:
              </div>
              <div className="lg:mb-7 mb-3 lg:text-3xl text-2xl gadzen">
                <span className=" text-6xl 2xl:pr-3 pr-2">
                 {product.special_price ? product.special_price: product.price}
                </span>
                ლარი
              </div>
              <div className="bold mb-5">აირჩიე ზომა:</div>
              <div className="sizeFlex flex flex-wrap">
      <div className="sizeFlex flex flex-wrap">
        {product.sizes.map((size, i) => {
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
                // picked === i
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
      {product.quantity == 0 &&

        <p className="text-red-200">{product.instock}</p>
      }
              <div className="flex flex-nowrap mt-10 mb-16">
                  <button onClick={()=>{
                     if(product.quantity == 0){
                        alert('არაა მარაგში')
                        return 0;
                    }
                    if(!sizepicked){
                        alert('აირჩიეთ ზომა!')
                        return 0;
                    }
                    if(!product.sizes.find((e)=> e.id == sizes[picked].id)){
                            alert('araa maragshi')
                            return 0;
                     }else{
                        // return 0;
                         addToCart(product, sizesArr[picked])
                         Inertia.visit(route("client.checkout.index"))
                     }
                  }
                }
      className={`bold xl:py-5 py-4 xl:px-12 px-9 relative commonBtn whitespace-nowrap xl:text-base text-sm`}
    >
      შეიძინე
    </button>
                <button onClick={(e)=>{
                    if(product.quantity == 0){
                        alert('არაა მარაგში')
                        return 0;
                    }
                     if(!sizepicked){
                        alert('აირჩიეთ ზომა!')
                        return 0;
                    }
                     if(!product.sizes.find((e)=> e.id == sizes[picked].id)){
                            alert('araa maragshi')
                            return 0;
                     }else
                     {
                        addToCart(product, sizesArr[picked])
                     }
                }
                }
                    className={`bold xl:py-5 py-4 xl:px-12 px-9 relative commonBtn whitespace-nowrap xl:text-base text-sm  ml-4`}>
                    დაამატე კალათში
               </button>

              </div>

              {/* <div class="fb-share-button" data-href={pathname} data-layout="button" data-size="large"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2F127.0.0.1%3A8000%2Fge%2Fproduct%2Ftest2&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">Share</a></div> */}
              <div className="socialMedia flex items-center">
              {/* <SocialMedia /> */}
              <div className="socialMedia flex items-center ">
      {/* <a target="_blank" href="#">
        <img src={"/assets/images/icons/sm/yt.svg"} alt="" />
      </a> */}
      <a target="_blank" href={`https://www.facebook.com/sharer.php?u=${pathname}`} className="sm:mx-8 mx-5">
        <img src={"/assets/images/icons/sm/fb.svg"} alt="" />
      </a>
      {/* <a target="_blank" href={"https://www.instagram.com/create/story"}>
        <img src={"/assets/images/icons/sm/ig.svg"} alt="" />
      </a> */}
    </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-10">
        <div className="wrapper bold text-xl pb-8">მსგავსი პროდუქტი</div>
        {/* <ProductSlider /> */}
        <ProductSlider data={sameproduct} />
      </section>
      <section className="wrapper pt-10 pb-20">
        <Form />
      </section>
    </Layout>
  );
};

export default SingleProucts;
