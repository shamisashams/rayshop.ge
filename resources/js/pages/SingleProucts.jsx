import React, { useState } from "react";
import { Link } from '@inertiajs/inertia-react'
import { CommonButton, SizePick, SocialMedia } from "../components/Shared";
import ProductSlider from "../components/ProductSlider";
import Form from "../components/Form";
import Layout from "../Layouts/Layout";
import { identity } from "lodash";
import { Inertia } from '@inertiajs/inertia'

const SingleProucts = ({seo,sizes,product,sameproduct}) => {

    let sizesArr = new Array();
    sizes.forEach(el => {
             sizesArr.push(el.name)
    });
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

    const [picked, setPicked] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
let imgs = new Array();
product.files.map((e,i)=>{
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
        {sizes.map((size, i) => {
          return (
            <button
              onClick={() =>
                {
                    setPicked(i)
                    if(!product.sizes.find((e)=> e.id == size.id)){
                       alert('araa maragshi')
                    }
                }
            }
              key={i}
              className={`flex items-center justify-center rounded-full w-12 h-12 mr-2 group-hover:bg-white transition-all duration-300 mr-3 uppercase mb-2 ${
                picked === i
                  ? "bg-black text-white"
                  : "bg-custom-slate-200 text-black"
              }`}
            >
              {size.name}
            </button>
          );
        })}
      </div>
              <div className="flex  flex-nowrap mt-10 mb-16 ">
                <Link href="/" className="sm:mr-6 mr-3 ">
                  <CommonButton text="შეიძინე" />
                </Link>
                <button onClick={()=>{
                    addToCart(product, sizesArr[picked])
                }
                }
                    className={`bold xl:py-5 py-4 xl:px-12 px-9 relative commonBtn whitespace-nowrap xl:text-base text-sm`}>
                    დაამატე კალათში
               </button>

              </div>
              <div className="bold mb-5">
                {/* <ShareIcon className="inline-block mr-2 align-middle" /> */}
                <img src="/assets/svg/share.svg" alt="share" />
                {" "}
                გაუზიარე მეგობრებს{" "}
              </div>
              <SocialMedia />
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
