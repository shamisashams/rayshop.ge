import React from "react";
// import img1 from "../assets/images/projects/3.png";
import { Link } from '@inertiajs/inertia-react'
import Layout from "../Layouts/Layout";
import {
    MouseParallaxContainer,
    MouseParallaxChild,
  } from "react-parallax-mouse";
import { FiArrowLeft } from "react-icons/fi";

const SingleGallery = ({ seo, news,back }) => {
    // console.log(news);

    return (
        // <layout seo={seo}>
        <>
            <MouseParallaxContainer
          useWindowMouseEvents
          className="flex flex-wrap justify-between lg:-mx-5 -mx-2"
        >
 <section className="py-32 relative wrapper">
                <img
                    style={{ width: "50%" }}
                    src={news.file != null
                        ? "/" +
                        news.file.path +
                        "/" +
                        news.file.title
                        : null}
                    alt="err"
                    className="fixed left-1/2 -translate-x-1/2 top-40 -z-10 blur-xl  opacity-50"
                />
<div className="max-w-lg mt-10 mx-auto text-justify">
<p className="mb-5 regular">
                        {" "}
                        <img className="w-full" src={news.file != null
                            ? "/" +
                            news.file.path +
                            "/" +
                            news.file.title
                            : null} alt="err" />
                    </p>
                    </div>

                <div className="text-center mt-20">
                    <Link href={back} className="regular text-center mx-auto">
                        back <FiArrowLeft className="inline-block h-5 w-5" />
                    </Link>
                </div>
            </section>
        </MouseParallaxContainer>

        </>
        // </layout>
    );
};

export default SingleGallery;
