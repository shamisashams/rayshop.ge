import React from "react";
// import { Link } from "react-router-dom";
import { Link } from '@inertiajs/inertia-react'
// import { ReactComponent as Eye } from "/assets/svg/eye.svg";
// import { ReactComponent as CartIcon } from "/assets/svg/cart.svg";

const ProductBox = (props) => {


  return (
    <Link href={props.link}>
    <div className=" p-5 bg-custom-slate-100 text-center group">
      <div className="h-72 mb-5 relative" >
        {
            props.image != null ?
            <img
          className="h-full w-full object-contain"
          src={props.image}
          alt=""
        /> : ""
        }

        <div className="absolute w-full h-full left-0 top-0 flex items-center justify-center bg-custom-slate-100/[0.6] opacity-0  transition-all duration-500 group-hover:opacity-100">

            <div className="flex items-center justify-center w-12 h-12 mx-1 shadow-lg rounded-full bg-white hover:bg-custom-orange translate-y-32 group-hover:translate-y-0 group transition-all duration-500">
              {/* <Eye /> */}
              <img src="/assets/svg/eye.svg" alt="eye" />
            </div>

          {/* </Link> */}
        </div>
      </div>
      <div className="mb-1">{props.name}</div>
      {props.sale ? (
        <div className="bold text-xl">
          <span className="text-sm text-gray-400 crossed relative mr-1">
            {props.oldPrice}
          </span>{" "}
          {props.price}₾
        </div>
      ) : (
        <div className="bold">{props.price} ლარი</div>
      )}
    </div>
    </Link>
  );
};

export default ProductBox;
