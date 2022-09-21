// import { Link } from "react-router-dom";
import React from 'react';
import { Link } from '@inertiajs/inertia-react'
import HeroSlider from '../components/HeroSlider';
import ProductSlider from "../components/ProductSlider";
// import MobileBank from "../assets/images/other/1.png";
import { galleryGrid } from "../components/Data";
import ProductBox from "../components/ProductBox";
// import ProductImg1 from "../assets/images/products/1.png";
// import ProductImg2 from "../assets/images/products/2.png";
// import ProductImg3 from "../assets/images/products/3.png";
import { LearnMoreBtn } from "../components/Shared";
import Form from "../components/Form";
import {
  MouseParallaxContainer,
  MouseParallaxChild,
} from "react-parallax-mouse";

import Layout from "../Layouts/Layout";
import { Route } from 'react-router-dom';

const Home = ({seo,gallery, products, productsAll, sliders}) => {
  return (
    <Layout seo={seo}>
      <HeroSlider data={sliders} />
      <section className="py-10">
        <div className="text-center mb-10 bold text-xl">
          <Link href="/products">ყველა პროდუქტი</Link>
        </div>
        <ProductSlider data={productsAll} />
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
                <Link
                  href={item.link}
                  className=" flex-grow lg:h-96 h-72 lg:m-5 m-2"
                >
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
                </Link>
              </MouseParallaxChild>
            );
          })}
        </MouseParallaxContainer>
      </section>
      <section className="bg-custom-slate-100 py-10 ">
        <div className="wrapper flex justify-between items-center flex-col xl:flex-row">
          <div className="flex xl:justify-between justify-center xl:w-3/5 flex-wrap xl:flex-nowrap">
            {/* <ProductBox
              link="/"
              image={"/assets/images/products/1.png"}
              name="პარასკევი"
              sale={true}
              oldPrice="32.50"
              price="25.90"
            />
            <ProductBox
              link="/"
              image={"/assets/images/products/2.png"}
              name="პარასკევი"
              sale={true}
              oldPrice="32.50"
              price="25.90"
            />
            <ProductBox
              link="/"
              image={"/assets/images/products/3.png"}
              name="პარასკევი"
              sale={true}
              oldPrice="32.50"
              price="25.90"
            /> */}
            {
                products.day_price.map(
                    (e,i)=>{
                        return(
                            <ProductBox
key={i}
              link="/"
              image={
                e.files != null
                ? "/" +
                  e.files[0].path +
                  "/" +
                  e.files[0].title
                : null

              }
              name={e.name}
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
              სპეციალური ფასი
            </div>
            <div className="gadzen 2xl:text-7xl lg:text-5xl sm:text-4xl text-3xl mb-6">
              მაისურები სპეც ფასით
            </div>
            <p className="mb-5">
              ზოგიერთ მაისურზე მოქმედებს ფასდაკლება, თუმცა ეს ფასი მუდმივად არ
              იქნება, იყიდე სანამ დროა!
            </p>
            <LearnMoreBtn href={route("client.product.index")} />
          </div>
        </div>
      </section>
      <section className="wrapper py-10">
        <Form />
      </section>
    </Layout>
  );
};

export default Home;
