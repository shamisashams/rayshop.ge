import React, {useState} from "react";
import { Inertia } from '@inertiajs/inertia'
import { CommonButton } from "../components/Shared";
import Layout from "../Layouts/Layout";
import { Link, usePage,useForm } from "@inertiajs/inertia-react";
import {
    MouseParallaxContainer,
    MouseParallaxChild,
  } from "react-parallax-mouse";


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
<div className="h-screen">
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
   </div>
</div>

    </Layout>
  );
};

export default Login;
