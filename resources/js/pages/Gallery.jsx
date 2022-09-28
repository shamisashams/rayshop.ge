import React, {useState} from "react";
import { Inertia } from '@inertiajs/inertia'
import { CommonButton } from "../components/Shared";
import Layout from "../Layouts/Layout";
import { Link, usePage,useForm } from "@inertiajs/inertia-react";
import {
    MouseParallaxContainer,
    MouseParallaxChild,
  } from "react-parallax-mouse";


  let links = function (links) {
    let rows = [];
    {
        links.map(function (item, index) {
            if (index > 0 && index < links.length - 1) {
                rows.push(
                    <Link
                        href={item.url}
                        className={item.active ? "num active" : "num"}
                    >
                        {item.label}
                    </Link>
                );
            }
        });
    }
    return <div className="nums"> {rows.length > 1 ? rows : null} </div>;
};

let linksPrev = function (links) {
    let rowCount = 0;
    links.map(function (item, index) {
        if (index > 0 && index < links.length - 1) {
            rowCount++;
        }
    });
    return rowCount > 1 ? (
        <Link href={links[0].url}>
            {/* <Arrow color="#2F3E51" rotate="90" /> */}
            {/* <Arrow color="#2F3E51" rotate="90" /> */}
        </Link>
    ) : null;
};
let linksNext = function (links) {
    let rowCount = 0;
    links.map(function (item, index) {
        if (index > 0 && index < links.length - 1) {
            rowCount++;
        }
    });
    return rowCount > 1 ? (
        <Link href={links[links.length - 1].url}>
            {/* <Arrow color="#2F3E51" rotate="-90" /> */}
            {/* <Arrow color="#2F3E51" rotate="-90" /> */}
        </Link>
    ) : null;
};

const Login = ({seo,gallery}) => {
    const renderHTML = (rawHTML) =>
    React.createElement("div", {
        dangerouslySetInnerHTML: { __html: rawHTML },
    });
const sharedData = usePage().props.localizations;
    const { data, setData, post, processing, errors } = useForm({

        email: '',
        password: null,
        remember: false,
    })

    function submit(e) {
        // alert('asdas')
        e.preventDefault()
        post(route("client.login"))
    }


  return (
    <Layout seo={seo}>
         <section className="wrapper py-5">
      </section>
         <section className="wrapper py-5">
      </section>
         <section className="wrapper py-5">
      </section>
<div className="container mx-auto">
<div className="">
   <section className="wrapper py-10">
        <MouseParallaxContainer
          useWindowMouseEvents
          className="flex flex-wrap justify-between lg:-mx-5 -mx-2"
        >
          {gallery.data.map((item, index) => {
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
   </div>
   <div className="wrapper flex items-center justify-center pt-20">
                            {linksPrev(gallery.links)}
                            <button className="">{links(gallery.links)}</button>
                            {linksNext(gallery.links)}
                        </div>
</div>

    </Layout>
  );
};

export default Login;
