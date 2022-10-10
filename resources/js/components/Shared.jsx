import React from "react";

import { useState } from "react";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import { Link, usePage } from "@inertiajs/inertia-react";

// LEARN MORE BUTTON

export const LearnMoreBtn = ({ href }) => {
    return (
        <Link
            href={href}
            className="learnMoreBtn flex items-center justify-start bold text-xl group w-fit"
        >
            <div className="flex items-center justify-center rounded-full bg-black w-12 h-12 mr-2 group-hover:bg-white transition-all duration-300">
                <svg
                    className="group-hover:fill-black fill-white transition-all duration-300"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24.952"
                    height="19.282"
                    viewBox="0 0 24.952 19.282"
                >
                    <g
                        id="noun-eye-5102066"
                        transform="translate(-93.334 -81.66)"
                    >
                        <path
                            id="Path_13"
                            data-name="Path 13"
                            d="M105.81,163.34a13.19,13.19,0,0,0-4.536,1.144,55.154,55.154,0,0,0-7.68,4.05.567.567,0,0,0,0,.954,55.139,55.139,0,0,0,7.68,4.05,13.19,13.19,0,0,0,4.536,1.144,13.19,13.19,0,0,0,4.536-1.144,55.145,55.145,0,0,0,7.68-4.05.567.567,0,0,0,0-.954,55.148,55.148,0,0,0-7.68-4.05A13.19,13.19,0,0,0,105.81,163.34Zm0,1.134a4.537,4.537,0,1,1-4.537,4.537A4.539,4.539,0,0,1,105.81,164.474Zm4.644,1.283a5.667,5.667,0,0,1,0,6.507c.342-.147.684-.3,1.022-.46a56.957,56.957,0,0,0,5.168-2.794,56.962,56.962,0,0,0-5.168-2.793c-.339-.158-.681-.313-1.022-.46Zm-9.288,0c-.342.147-.684.3-1.022.46a56.941,56.941,0,0,0-5.168,2.793,56.924,56.924,0,0,0,5.168,2.794c.339.158.681.313,1.022.46a5.667,5.667,0,0,1,0-6.507Z"
                            transform="translate(0 -77.71)"
                            fill-rule="evenodd"
                        />
                        <path
                            id="Path_14"
                            data-name="Path 14"
                            d="M305.6,233.34a2.268,2.268,0,1,0,2.268,2.268A2.269,2.269,0,0,0,305.6,233.34Zm0,1.134a1.134,1.134,0,1,1-1.134,1.134A1.135,1.135,0,0,1,305.6,234.474Z"
                            transform="translate(-199.794 -144.307)"
                            fill-rule="evenodd"
                        />
                        <path
                            id="Path_15"
                            data-name="Path 15"
                            d="M338.34,82.227v1.7a.567.567,0,1,0,1.134,0v-1.7a.567.567,0,1,0-1.134,0Z"
                            transform="translate(-233.096)"
                            fill-rule="evenodd"
                        />
                        <path
                            id="Path_16"
                            data-name="Path 16"
                            d="M339.462,422.267v-1.7a.567.567,0,1,0-1.134,0v1.7a.567.567,0,1,0,1.134,0Z"
                            transform="translate(-233.085 -321.892)"
                            fill-rule="evenodd"
                        />
                        <path
                            id="Path_17"
                            data-name="Path 17"
                            d="M415.083,106.966l-.851,1.473a.567.567,0,1,0,.982.567l.851-1.473a.567.567,0,1,0-.982-.567Z"
                            transform="translate(-305.228 -23.806)"
                            fill-rule="evenodd"
                        />
                        <path
                            id="Path_18"
                            data-name="Path 18"
                            d="M246.065,401.989l.851-1.473a.567.567,0,1,0-.982-.567l-.851,1.473a.567.567,0,1,0,.982.567Z"
                            transform="translate(-144.299 -302.547)"
                            fill-rule="evenodd"
                        />
                        <path
                            id="Path_19"
                            data-name="Path 19"
                            d="M245.073,107.527l.851,1.473a.567.567,0,1,0,.982-.567l-.851-1.473a.567.567,0,1,0-.982.567Z"
                            transform="translate(-144.291 -23.8)"
                            fill-rule="evenodd"
                        />
                        <path
                            id="Path_20"
                            data-name="Path 20"
                            d="M416.068,401.428l-.851-1.473a.567.567,0,1,0-.982.567l.851,1.473a.567.567,0,1,0,.982-.567Z"
                            transform="translate(-305.23 -302.553)"
                            fill-rule="evenodd"
                        />
                    </g>
                </svg>
            </div>
            <span>სრულად ნახვა</span>
        </Link>
    );
};

// COMMON BUTTON

export const CommonButton = ({ text, width }) => {
    return (
        <button
            style={{ width: width }}
            className={`bold xl:py-5 py-4 xl:px-12 px-9 relative commonBtn whitespace-nowrap xl:text-base text-sm ${
                width ? "!px-0 " : ""
            }`}
        >
            {text}
        </button>
    );
};

// SIZE PICK COMPONENT

export const SizePick = ({ sizes, product }) => {
    const [sizepicked, setSizePicked] = useState(false);
    const [picked, setPicked] = useState(0);
    return (
        <>
            <div className="bold mb-5">აირჩიე ზომა:</div>
            <div className="sizeFlex flex flex-wrap">
                {sizes.map((size, i) => {
                    return (
                        <button
                            onClick={() => {
                                setSizePicked(true);
                                setPicked(i);
                                if (
                                    !product.sizes.find((e) => e.id == size.id)
                                ) {
                                    alert("araa maragshi");
                                }
                            }}
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
        </>
    );
};

// SOCIAL MEDIA

export const SocialMedia = () => {
    const { errors, gphone, gemail, gaddress, gfacebook, ginstagram, gyoutube } = usePage().props;
    return (
        <div className="socialMedia flex items-center ">
            {/* <a target="_blank" href={gyoutube.value ? gyoutube.value : '#'}>
                <img src={"/assets/images/icons/sm/yt.svg"} alt="" />
            </a> */}
            <a target="_blank" href={gfacebook.value ? gfacebook.value : '#'} className="sm:mx-8 mx-5">
                <img src={"/assets/images/icons/sm/fb.svg"} alt="" />
            </a>
            <a target="_blank" href={ginstagram.value ? ginstagram.value : '#'}>
                <img src={"/assets/images/icons/sm/ig.svg"} alt="" />
            </a>
        </div>
    );
};

// QUANTITY COMPONENT

export const Quantity = () => {
    const [number, setNumber] = useState(1);

    const decrease = () => {
        if (number > 1) {
            setNumber(number - 1);
        } else {
            setNumber(1);
        }
    };
    const increase = () => {
        setNumber(number + 1);
    };

    return (
        <div className="flex items-center ">
            <button
                className="flex items-center justify-center border border-black rounded-full w-6 h-6"
                onClick={decrease}
            >
                <HiOutlineMinus />
            </button>
            <div className="bold mx-3 text-lg">{number}</div>
            <button
                className="flex items-center justify-center border border-black rounded-full w-6 h-6"
                onClick={increase}
            >
                <HiOutlinePlus />
            </button>
        </div>
    );
};

// CART ITEM

export const CartItem = ({ data, index }) => {
    const [remove, setRemove] = useState(false);
    const [clear, setClear] = useState(false);

    const removeItem = () => {
        setRemove(true);
        setTimeout(() => {
            setClear(true);
        }, 500);
    };

    return (
        <div
            className={`flex items-center justify-between mb-4 text-sm transition-all duration-500  ${
                remove ? "opacity-0" : ""
            } ${clear ? "hidden" : ""} `}
        >
            <div className="flex items-center lg:mr-10 mr-3 ">
                <input
                    defaultChecked
                    type="checkbox"
                    id={`checkbox_${index}`}
                />
                <label htmlFor={`checkbox_${index}`}>
                    <div></div>
                </label>
                <div className="lg:w-28 w-20 h-fit shrink-0 sm:mx-5 mx-2">
                    <img
                        className="w-full object-cover"
                        src={data.img}
                        alt=""
                    />
                </div>
                <div className="lg:w-32 w-24">
                    <div>{data.name}</div>
                    <div className="bold mb-3 mt-1">{data.price} ლარი</div>
                    <div>
                        ზომა:{" "}
                        <span className="bold uppercase">{data.size}</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center">
                <Quantity />
                <button onClick={removeItem} className="sm:ml-10 ml-6 group">
                    {/* <Delete className="fill-black group-hover:fill-custom-orange transition " /> */}
                    <img
                        src="/assets/svg/delete.svg"
                        alt="del"
                        className="fill-black group-hover:fill-custom-orange transition "
                    />
                </button>
            </div>
        </div>
    );
};
