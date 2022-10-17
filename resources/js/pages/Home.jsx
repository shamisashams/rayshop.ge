// import { Link } from "react-router-dom";
import React, {useState} from 'react';
import { Link, usePage } from "@inertiajs/inertia-react";
import HeroSlider from '../components/HeroSlider';
import ProductSlider from "../components/ProductSlider";
import { galleryGrid } from "../components/Data";
import ProductBox from "../components/ProductBox";
import { LearnMoreBtn } from "../components/Shared";
import Form from "../components/Form";
import { AiOutlineCloseCircle } from "react-icons/ai";
import {
  MouseParallaxContainer,
  MouseParallaxChild,
} from "react-parallax-mouse";

import Layout from "../Layouts/Layout";
import { Route } from 'react-router-dom';

const Home = ({seo,gallery, products,product, productsAll, sliders, sizes, category, productsCat}) => {
    const renderHTML = (rawHTML) =>
    React.createElement("div", {
        dangerouslySetInnerHTML: { __html: rawHTML },
    });
const sharedData = usePage().props.localizations;
const [imgIndex, setImgIndex] = useState(0);
    const [showPopup, setShowPopup] = useState(false);

    const handleImgClick = (index) => {
        setShowPopup(true);
        setImgIndex(index);
    };
  return (
    <Layout seo={seo}>
      <HeroSlider data={sliders} sizes={sizes} cat={category} productCat={productsCat} product={product}/>
      <section className="py-10">
        <div className="text-center mb-10 bold text-xl">
          <Link href="/products">
            {/* ყველა პროდუქტი */}
            {__("client.home_all_products", sharedData)}
            </Link>
        </div>
        <ProductSlider data={productsAll}/>
      </section>
      <section className="wrapper py-5">
        <img className="w-full h-auto" src={"/assets/images/other/1.png"} alt="" />
      </section>
      <section className="wrapper py-10">
        <MouseParallaxContainer
          useWindowMouseEvents
          className="flex flex-wrap justify-between lg:-mx-5 -mx-2"
        >
          {gallery.map((item, index) => {
            return (
              <MouseParallaxChild
                className=" flex-grow lg:h-96 h-72 lg:m-5 m-2"
                key={index}
                factorX={Math.random() * (0.1 - 0.01) + 0.01}
                factorY={Math.random() * (0.1 - 0.01) + 0.01}
              >
                <div
                                            className=" flex-grow lg:h-96 h-72 lg:m-5 m-2"
                                            onClick={() =>
                                                handleImgClick(index)
                                            }
                                        >
                {/* <Link
                  href={route("client.galleryshow.index", item.id)}
                  className=" flex-grow lg:h-96 h-72 lg:m-5 m-2"
                > */}
                  <div className="w-full h-full relative after:left-0 after:top-0 after:w-full after:h-full hover:after:bg-white/[0.5] after:transition-all">
                    <img
                      className="w-full h-full object-cover"
                    //   src={item.img}
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
                  </div>
                {/* </Link> */}
              </MouseParallaxChild>
            );
          })}
        </MouseParallaxContainer>

     <div className="text-center w-fit mx-auto my-10">
      <LearnMoreBtn href={route("client.gallery.index")} />
     </div>
      </section>
      <section className="bg-custom-slate-100 py-10 ">
        <div className="wrapper flex justify-between items-center flex-col xl:flex-row">
          <div className="flex xl:justify-between justify-center xl:w-3/5 flex-wrap xl:flex-nowrap">
            {
                products.day_price.map(
                    (e,i)=>{
                        return(
                            <ProductBox
key={i}
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
              price={e.special_price}
            />
                        )

                    }
                )
            }
          </div>
          <div className="2xl:max-w-lg xl:max-w-md w-full xl:ml-20 xl:mt-0 mt-10">
            <div className="bold mb-5" style={{ color: "#A7DE5C" }}>
              {__("client.home_special_price", sharedData)}
            </div>
            <div className="gadzen 2xl:text-7xl lg:text-5xl sm:text-4xl text-3xl mb-6">
              {__("client.home_tshirt_withspecialprice", sharedData)}
            </div>
            <p className="mb-5">
              {/* ზოგიერთ მაისურზე მოქმედებს ფასდაკლება, თუმცა ეს ფასი მუდმივად არ
              იქნება, იყიდე სანამ დროა! */}
              {__("client.home_on_some_tshirts_are_on_sale", sharedData)}
            </p>
              <LearnMoreBtn href={route("client.product.index")} />

          </div>
        </div>
      </section>
      <section className="wrapper py-10">
        <Form />
      </section>

      <div
                className={`z-50 fixed w-screen h-screen left-0 top-0 bg-black/[0.9] flex items-center justify-center transition-all duration-500  p-10 ${
                    showPopup ? "" : "opacity-0 invisible"
                }`}
            >
                <div className="w-fit h-fit relative">
                    <button
                        onClick={() => setShowPopup(false)}
                        className="absolute -top-7 -right-7 text-white"
                    >
                        <AiOutlineCloseCircle className="w-8 h-8" />
                    </button>
                    <div
                        className="overflow-hidden w-fit h-fit"
                        style={{ maxHeight: "80vh" }}
                    >
                        <img
                            className="w-full h-full object-contain"
                            src={
                                gallery[imgIndex].file != null
                                    ? "/" +
                                      gallery[imgIndex].file.path +
                                      "/" +
                                      gallery[imgIndex].file.title
                                    : null
                            }
                            alt=""
                        />
                    </div>
                </div>
            </div>
    </Layout>
  );
};

export default Home;
