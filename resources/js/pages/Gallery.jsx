import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { CommonButton } from "../components/Shared";
import Layout from "../Layouts/Layout";
import { Link, usePage, useForm } from "@inertiajs/inertia-react";
import {
    MouseParallaxContainer,
    MouseParallaxChild,
} from "react-parallax-mouse";
import { AiOutlineCloseCircle } from "react-icons/ai";

let links = function (links) {
    let rows = [];
    {
        links.map(function (item, index) {
            if (index > 0 && index < links.length - 1) {
                rows.push(
                    <Link
                        href={item.url}
                        className={item.active ? "text-blue-600" : "num"}
                    >
                        <span style={{ padding: "5px" }}>{item.label}</span>
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

const Login = ({ seo, gallery }) => {
    const renderHTML = (rawHTML) =>
        React.createElement("div", {
            dangerouslySetInnerHTML: { __html: rawHTML },
        });
    const sharedData = usePage().props.localizations;
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: null,
        remember: false,
    });

    function submit(e) {
        // alert('asdas')
        e.preventDefault();
        post(route("client.login"));
    }

    const [imgIndex, setImgIndex] = useState(0);
    const [showPopup, setShowPopup] = useState(false);

    const handleImgClick = (index) => {
        setShowPopup(true);
        setImgIndex(index);
    };

    return (
        <Layout seo={seo}>
            <div className="mx-auto py-20 ">
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
                                        factorX={
                                            Math.random() * (0.1 - 0.01) + 0.01
                                        }
                                        factorY={
                                            Math.random() * (0.1 - 0.01) + 0.01
                                        }
                                    >
                                        <div
                                            className=" flex-grow lg:h-96 h-72 lg:m-5 m-2"
                                            onClick={() =>
                                                handleImgClick(index)
                                            }
                                        >
                                            <div className="w-full h-full relative after:left-0 after:top-0 after:w-full after:h-full hover:after:bg-white/[0.5] after:transition-all">
                                                <img
                                                    className="w-full h-full object-cover"
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
                                    </MouseParallaxChild>
                                );
                            })}
                        </MouseParallaxContainer>
                    </section>
                </div>
                <div className="wrapper flex flex-around justify-center pt-20">
                    {linksPrev(gallery.links)}
                    <button className="">
                        <p style={{ margin: "10px" }}>{links(gallery.links)}</p>
                    </button>
                    {linksNext(gallery.links)}
                </div>
            </div>
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
                                gallery.data[imgIndex].file != null
                                    ? "/" +
                                      gallery.data[imgIndex].file.path +
                                      "/" +
                                      gallery.data[imgIndex].file.title
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

export default Login;
