import React from "react";
import { useEffect, useState, useRef } from "react";
import { productGrid } from "../components/Data";
import RangeSlider from "../components/PriceRange/PriceRange";
import ProductBox from "../components/ProductBox";
import { CommonButton, SizePick } from "../components/Shared";
import { IoMdOptions } from "react-icons/io";
import Layout from "../Layouts/Layout";
import { Route } from "react-router-dom";


const Products = ({seo, products}) => {
  const [showFilter, setShowfilter] = useState(false);
  const wrapperRef = useRef(null);

  const checkboxes = ["მაისური", "ქურთუკი", "შარვალი", "ქუდი"];

  useOutsideAlerter(wrapperRef);
  useOutsideAlerter();
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowfilter(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  return (
    <Layout seo={seo}>
    <div className=" wrapper pb-20">
      <div
        ref={wrapperRef}
        className={`fixed top-0 bg-custom-slate-300 h-screen pt-44 z-40 2xl:px-20 px-10 overflow-y-scroll xl:overflow-y-hidden  xl:left-0 transition-all duration-500 pb-10 ${
          showFilter ? "left-0" : " -left-full"
        }`}
      >
        <div className="bold xl:mb-6 mb-3">პროდუქცია</div>
        <div className="xl:mb-12 mb-8">
          {checkboxes.map((check, index) => {
            return (
              <div
                key={index}
                className="xl:mb-5 mb-2 flex items-center justify-start"
              >
                <input type="checkbox" name="" id={`checkbox-${index}`} />
                <label className="mr-2" htmlFor={`checkbox-${index}`}>
                  <div></div>
                </label>
                <label htmlFor={`checkbox-${index}`}>{check}</label>
              </div>
            );
          })}
        </div>
        <div className="xl:mb-10 mb-6">
          <div className="bold xl:mb-6 mb-3">შეარჩიე საფასო კატეგორია</div>
          <RangeSlider />
        </div>
        <div className="xl:mb-10 mb-6">
          <SizePick sizes={["s", "m", "l", "xl"]} />
        </div>
        <CommonButton width="245px" text="გაფილტრე პროდუქცია" />
      </div>
      <div className=" xl:pt-44 pt-40">
        <button
          className="bold mb-5 xl:hidden block"
          onClick={() => setShowfilter(true)}
        >
          <IoMdOptions className="inline-block w-6 h-6 mb-1 mr-2" />
          ფილტერ
        </button>
        <div className="xl:pl-5  xl:ml-80 2xl:ml-96  grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-8">
          {products.data.map((data, index) => {
            return (
              <ProductBox
                key={index}
                image={
                    data.files != null
                    ? "/" +
                      data.files[0].path +
                      "/" +
                      data.files[0].title
                    : null
                }
                // link={data.link}
                link={
                    route("client.product.show", data.slug)
                }
                name={data.name}
                sale={data.sale}
                oldPrice={data.oldPrice}
                price={data.price}
              />
            );
          })}
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Products;
