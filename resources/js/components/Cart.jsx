import React from "react";
import Img1 from "/assets/images/products/3.png";
import Img2 from "/assets/images/products/4.png";
import Img3 from "/assets/images/products/5.png";
import { CartItem, CommonButton } from "./Shared";
import { BsArrowRightCircle } from "react-icons/bs";
import { useEffect } from "react";
import { Link } from '@inertiajs/inertia-react'

const Cart = ({ show, closeCart }) => {
  const itemsInCart = [
    {
      img: Img1,
      name: "დასახელება",
      price: "31.90",
      size: "m",
    },
    {
      img: Img2,
      name: "დხეასა ხეასა ლეddბა",
      price: "310",
      size: "m",
    },
    {
      img: Img3,
      name: "jiga kokolapic",
      price: "50.90",
      size: "m",
    },
    {
      img: Img2,
      name: "დხეასა ხეასა ლეddბა",
      price: "310",
      size: "m",
    },
    {
      img: Img3,
      name: "jiga kokolapic",
      price: "50.90",
      size: "m",
    },
  ];

  return (
    <div
      className={`absolute h-screen top-0 right-0 bg-custom-slate-300 lg:p-10 p-5  flex flex-col justify-end transition-all duration-500 origin-right sm:w-auto w-full  ${
        show ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
      }`}
    >
      <button
        onClick={closeCart}
        className="absolute sm:top-14 sm:left-10 top-20 right-4"
      >
        <BsArrowRightCircle className="w-6 h-6" />
      </button>
      <div className="overflow-y-scroll scrollbar pr-5 lg:h-1/2 h-60 ">
        {itemsInCart.map((item, index) => {
          return <CartItem key={index} data={item} index={index} />;
        })}
      </div>

      <div className="mt-5">
        <div className="flex item-center justify-between mb-3">
          <div className="opacity-50">რაოდენობა:</div>
          <div className="bold text-lg">2</div>
        </div>
        <div className="flex item-center justify-between">
          <div className="bold">პროდუქტის ფასი:</div>
          <div className="bold text-lg text-custom-orange">₾ 155.00</div>
        </div>
      </div>

      <Link href="/checkout" className="w-fit mx-auto mt-10">
        <CommonButton text="გადახდა" />
      </Link>
    </div>
  );
};

export default Cart;
