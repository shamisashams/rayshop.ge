import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import Img1 from "/assets/images/products/3.png";
import Img2 from "/assets/images/products/4.png";
import Img3 from "/assets/images/products/5.png";
import { CartItem, CommonButton } from "./Shared";
import { BsArrowRightCircle } from "react-icons/bs";
import { useEffect } from "react";
import { Link, usePage } from "@inertiajs/inertia-react";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import { Route } from "react-router-dom";

const Cart = ({ show, closeCart }) => {
    const renderHTML = (rawHTML) =>
        React.createElement("div", {
            dangerouslySetInnerHTML: { __html: rawHTML },
        });
    const sharedData = usePage().props.localizations;
    const [quantity, setquantity] = useState(2);

    const [number, setNumber] = useState(1);

    //   const decrease = () => {
    //     if (number > 1) {
    //       setNumber(number - 1);
    //     } else {
    //       setNumber(1);
    //     }
    //   };
    //   const increase = () => {
    //     setNumber(number + 1);
    //   };

    const [remove, setRemove] = useState(false);
    const [clear, setClear] = useState(false);
    const removeItem = () => {
        setRemove(true);
        setTimeout(() => {
            setClear(true);
        }, 500);
    };

    const getCart = function () {
        let cart = [];
        let _cart = localStorage.getItem("cart");
        if (_cart !== null) cart = JSON.parse(_cart);

        let total = 0;
        cart.forEach(function (el, i) {
            total +=
                el.qty *
                (el.product.special_price !== null
                    ? el.product.special_price
                    : el.product.price);
        });

        let obj = {
            items: cart,
            total: parseFloat(total),
        };
        return obj;
    };

    const updateCart = (quantity, index) => {
        let cart = localStorage.getItem("cart");
        cart = JSON.parse(cart);
        cart[index].qty = quantity;
        localStorage.setItem("cart", JSON.stringify(cart));
        // Inertia.visit(window.location.href);
    };

    const removeCartItem = function (i) {
        let cart = [];
        let _cart = localStorage.getItem("cart");
        if (_cart !== null) cart = JSON.parse(_cart);
        cart.splice(i, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        Inertia.visit(window.location.href);
    };

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
            <div
                className={
                    getCart().items.length
                        ? "overflow-y-scroll scrollbar pr-5 lg:h-1/2 h-60 "
                        : ""
                }
            >
                {/* {itemsInCart.map((item, index) => {
          return <CartItem key={index} item.product={item} index={index} />;
        })} */}

                {getCart().items.map((item, index) => {
                    const [quantity, setquantity] = useState(item.qty);
                    return (
                        <div
                            key={index}
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
                                    {/* <img className="w-full object-cover" src={item.product.img} alt="" /> */}
                                    {item.product.latest_image ? (
                                        <img
                                            className="w-full object-cover"
                                            alt=""
                                            src={
                                                item.product.latest_image !=
                                                null
                                                    ? "/" +
                                                      item.product.latest_image
                                                          .path +
                                                      "/" +
                                                      item.product.latest_image
                                                          .title
                                                    : null
                                            }
                                        />
                                    ) : (
                                        <img
                                            className="w-full object-cover"
                                            alt=""
                                            src={
                                                item.product.files != null
                                                    ? "/" +
                                                      item.product.files[0]
                                                          .path +
                                                      "/" +
                                                      item.product.files[0]
                                                          .title
                                                    : null
                                            }
                                        />
                                    )}
                                </div>
                                <div className="lg:w-32 w-24">
                                    <div>{item.product.name}</div>
                                    <div className="bold mb-3 mt-1">
                                        {item.product.special_price
                                            ? item.product.special_price
                                            : item.product.price}
                                        {__("client.gel", sharedData)}
                                    </div>
                                    <div>
                                        {__("client.size", sharedData)} :{" "}
                                        <span className="bold uppercase">
                                            {item.size}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                {/* <Quantity /> */}
                                <div className="flex items-center ">
                                    <button
                                        className="flex items-center justify-center border border-black rounded-full w-6 h-6"
                                        // onClick={
                                        //     ()=>{
                                        //         setquantity(
                                        //             quantity > 1 ? quantity - 1 : 1
                                        //         )
                                        //         updateCart(quantity > 1 ? quantity - 1 : 1,index)
                                        //     }
                                        // }
                                        onClick={() => {
                                            setquantity(
                                                quantity > 1 ? quantity - 1 : 1
                                            );
                                            updateCart(
                                                quantity > 1 ? quantity - 1 : 1,
                                                index
                                            );
                                        }}
                                    >
                                        <HiOutlineMinus />
                                    </button>
                                    <div className="bold mx-3 text-lg">
                                        {quantity}
                                    </div>
                                    <button
                                        className="flex items-center justify-center border border-black rounded-full w-6 h-6"
                                        onClick={() => {
                                            setquantity(quantity + 1);
                                            updateCart(quantity + 1, index);
                                        }}
                                    >
                                        <HiOutlinePlus />
                                    </button>
                                </div>
                                <button
                                    onClick={() => {
                                        removeCartItem(index);
                                    }}
                                    className="sm:ml-10 ml-6 group"
                                >
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
                })}
            </div>

            <div className="mt-5">
                <div className="flex item-center justify-between mb-3">
                    <div className="opacity-50">
                        {__("client.cart_count", sharedData)}
                    </div>
                    <div className="bold text-lg">{getCart().items.length}</div>
                </div>
                <div className="flex item-center justify-between">
                    <div className="bold">
                        {__("client.cart_price", sharedData)}
                    </div>
                    <div className="bold text-lg text-custom-orange">
                        ₾{getCart().total.toFixed(2)}
                    </div>
                </div>
            </div>

            <Link
                href={route("client.checkout.index")}
                className="w-fit mx-auto mt-10"
            >
                <CommonButton text={__("client.cart_purchace", sharedData)} />
            </Link>
        </div>
    );
};

export default Cart;
