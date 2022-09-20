import React from "react";

import { useState } from "react";
// import { Link } from "react-router-dom";
import { Link } from '@inertiajs/inertia-react'
// import { ReactComponent as Eye } from "/assets/svg/eye.svg";
// import YT from "/assets/images/icons/sm/yt.svg";
// import FB from "/assets/images/icons/sm/fb.svg";
// import IG from "/assets/images/icons/sm/ig.svg";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
// import { ReactComponent as Delete } from "/assets/svg/delete.svg";

// LEARN MORE BUTTON

export const LearnMoreBtn = ({ href }) => {
  return (
    <Link
      to={href}
      className="learnMoreBtn flex items-center bold text-xl group"
    >
      <div className="flex items-center justify-center rounded-full bg-black w-12 h-12 mr-2 group-hover:bg-white transition-all duration-300">
        {/* <Eye className="group-hover:fill-black fill-white transition-all duration-300" /> */}
        <img src="/assets/svg/eye.svg" alt="eye"  className="group-hover:fill-black fill-white transition-all duration-300"/>
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

export const SizePick = ({ sizes }) => {
  const [picked, setPicked] = useState(0);

  return (
    <>
      <div className="bold mb-5">აირჩიე ზომა:</div>
      <div className="sizeFlex flex flex-wrap">
        {sizes.map((size, i) => {
          return (
            <button
              onClick={() => setPicked(i)}
              key={i}
              className={`flex items-center justify-center rounded-full w-12 h-12 mr-2 group-hover:bg-white transition-all duration-300 mr-3 uppercase mb-2 ${
                picked === i
                  ? "bg-black text-white"
                  : "bg-custom-slate-200 text-black"
              }`}
            >
              {size}
            </button>
          );
        })}
      </div>
    </>
  );
};

// SOCIAL MEDIA

export const SocialMedia = () => {
  return (
    <div className="socialMedia flex items-center">
      <a target="_blank" href="#">
        <img src={"/assets/images/icons/sm/yt.svg"} alt="" />
      </a>
      <a target="_blank" href="#" className="sm:mx-8 mx-5">
        <img src={"/assets/images/icons/sm/fb.svg"} alt="" />
      </a>
      <a target="_blank" href="#">
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
        <input defaultChecked type="checkbox" id={`checkbox_${index}`} />
        <label htmlFor={`checkbox_${index}`}>
          <div></div>
        </label>
        <div className="lg:w-28 w-20 h-fit shrink-0 sm:mx-5 mx-2">
          <img className="w-full object-cover" src={data.img} alt="" />
        </div>
        <div className="lg:w-32 w-24">
          <div>{data.name}</div>
          <div className="bold mb-3 mt-1">{data.price} ლარი</div>
          <div>
            ზომა: <span className="bold uppercase">{data.size}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <Quantity />
        <button onClick={removeItem} className="sm:ml-10 ml-6 group">
          {/* <Delete className="fill-black group-hover:fill-custom-orange transition " /> */}
          <img src="/assets/svg/delete.svg" alt="del" className="fill-black group-hover:fill-custom-orange transition " />/>
        </button>
      </div>
    </div>
  );
};
