import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import Layout from "../Layouts/Layout";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import { Link, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

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

const removeCartItem = function (i) {
    let cart = [];
    let _cart = localStorage.getItem("cart");
    if (_cart !== null) cart = JSON.parse(_cart);
    cart.splice(i, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    Inertia.visit(window.location.href);
};

const updateCart = (quantity, index) => {
    let cart = localStorage.getItem("cart");
    cart = JSON.parse(cart);
    cart[index].qty = quantity;
    localStorage.setItem("cart", JSON.stringify(cart));
    // Inertia.visit(window.location.href);
};

function findArrayElementByTitle(array, title) {
    return array.find((e) => {
        return e.id == title;
    });
}

const Payment = ({ seo, city }) => {
    const renderHTML = (rawHTML) =>
        React.createElement("div", {
            dangerouslySetInnerHTML: { __html: rawHTML },
        });
    const sharedData = usePage().props.localizations;

    const { user } = usePage().props;
    const [cityid, setCityId] = useState(user.city ? user.city : "");
    const [remove, setRemove] = useState(false);
    const [clear, setClear] = useState(false);
    const [shipping, setShipping] = useState(0);
    const { errors } = usePage().props;
    const [values, setValues] = useState({
        first_name: user.name,
        city: user.city,
        address: user.address,
        email: user.email,
        phone: user.phone,
        cart: getCart(),
    });

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        Inertia.post(route("client.checkout.order"), values);
    }

    const [selectBank, setSelectBank] = useState(false);

    return (
        <Layout seo={seo}>
            <div className="relative paymentPage">
                <div className="lg:block hidden absolute bg-custom-slate-300 w-1/5 h-full right-0 top-0"></div>
                <div className="flex items-center justify-between wrapper min-h-screen flex-col-reverse lg:flex-row">
                    <div className="lg:w-2/3 lg:mt-32 mt-20 pb-10">
                        <div className="max-w-md mx-auto">
                            <div className="mb-3 w-full h-fit relative">
                                <div className="absolute top-1/2 -translate-y-1/2 right-2 z-20">
                                    <IoMdArrowDropdown className=" w-5 h-5" />
                                </div>
                                <select
                                    id="shipprice"
                                    className="relative"
                                    onChange={(e) => {
                                        setCityId(e.target.value);
                                        values.city = e.target.value;
                                    }}
                                >
                                    <option selected="true" disabled="true">
                                        აირჩიე ქალაქი
                                    </option>
                                    {city.map((e, i) => {
                                        return (
                                            <option
                                            key={i}
                                                selected={
                                                    user.city == e.id}
                                                value={e.id}
                                            >
                                                {e.title}
                                            </option>
                                        );
                                    })}
                                </select>
                                {errors.city && <div>{errors.city}</div>}
                            </div>
                            <input
                                id="address"
                                value={values.address}
                                onChange={handleChange}
                                className="mb-3 placeholder:opacity-50"
                                type="text"
                                placeholder="შეიყვანე მისამართი"
                            />
                            {errors.address && <div>{errors.address}</div>}
                            <input
                                id="phone"
                                value={values.phone}
                                onChange={handleChange}
                                className="mb-3 placeholder:opacity-50"
                                type="number"
                                placeholder="საკონტაქტო ტელეფონი"
                            />
                            {errors.phone && <div>{errors.phone}</div>}

                            <div className="text-center my-5 mb-20">
                                <button
                                    onClick={() => setSelectBank(!selectBank)}
                                    className={`border border-solid  py-2 px-3 mx-auto transition-all ${
                                        selectBank
                                            ? "border-custom-orange"
                                            : "border-custom-slate-300"
                                    } `}
                                >
                                    <img
                                        src="/assets/images/icons/banks/4.png"
                                        alt=""
                                    />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="text-center mt-10">
                                    {/* <CommonButton text="გადახდა" width="245px" /> */}
                                    <button
                                        type="submit"
                                        className={`bold xl:py-5 py-4 xl:px-12 px-9 relative commonBtn whitespace-nowrap xl:text-base text-sm`}
                                    >
                                        გადახდა
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="lg:bg-custom-slate-300  self-stretch pt-32 lg:pl-10 relative flex items-center justify-center flex-col lg:ml-5">
                        <div className="mb-20 itemsInCart">
                            {/* {itemsInCart.map((item, index) => {
              return <CartItem key={index} data={item} index={index} />;
            })} */}
                            {getCart().items.map((item, index) => {
                                const [quantity, setquantity] = useState(
                                    item.qty
                                );
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
                                            <label
                                                htmlFor={`checkbox_${index}`}
                                            >
                                                <div></div>
                                            </label>
                                            <div className="lg:w-28 w-20 h-fit shrink-0 sm:mx-5 mx-2">
                                                {/* <img className="w-full object-cover" src={item.product.img} alt="" /> */}
                                                {item.product.latest_image ? (
                                                    <img
                                                        className="w-full object-cover"
                                                        alt=""
                                                        src={
                                                            item.product
                                                                .latest_image !=
                                                            null
                                                                ? "/" +
                                                                  item.product
                                                                      .latest_image
                                                                      .path +
                                                                  "/" +
                                                                  item.product
                                                                      .latest_image
                                                                      .title
                                                                : null
                                                        }
                                                    />
                                                ) : (
                                                    <img
                                                        className="w-full object-cover"
                                                        alt=""
                                                        src={
                                                            item.product
                                                                .files != null
                                                                ? "/" +
                                                                  item.product
                                                                      .files[0]
                                                                      .path +
                                                                  "/" +
                                                                  item.product
                                                                      .files[0]
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
                                                        ? item.product
                                                              .special_price
                                                        : item.product.price}
                                                    ლარი
                                                </div>
                                                <div>
                                                    ზომა:{" "}
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
                                                            quantity > 1
                                                                ? quantity - 1
                                                                : 1
                                                        );
                                                        updateCart(
                                                            quantity > 1
                                                                ? quantity - 1
                                                                : 1,
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
                                                        setquantity(
                                                            quantity + 1
                                                        );
                                                        updateCart(
                                                            quantity + 1,
                                                            index
                                                        );
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
                        <div className="flex w-full justify-between items-center mb-3">
                            <div className="opacity-50">რაოდენობა:</div>
                            <div className="bold">{getCart().items.length}</div>
                        </div>
                        <div className="flex w-full justify-between items-center mb-3 bold">
                            {/* <span>პროდუქტის ფასი:</span>
            <span>
                {getCart().total.toFixed(2)}
                </span> */}
                        </div>
                        <div className="flex w-full justify-between items-center mb-6 bold">
                            <span>მიწოდება:</span>
                            <span id="shipping">
                                {city.map((e, i) => {
                                    if (e.id == cityid) {
                                        return <p>{e.ship_price}</p>;
                                    }
                                })}
                            </span>
                        </div>
                        <div className="flex w-full justify-between items-center  bold">
                            <span>ჯამი:</span>
                            <span className="text-xl text-custom-orange">
                                {/* ₾ 178.00 */}
                                {cityid
                                    ? city.map((e, i) => {
                                          if (e.id == cityid) {
                                              return (
                                                  <p>
                                                      {e.ship_price * 1 +
                                                          getCart().total.toFixed(
                                                              2
                                                          ) *
                                                              1}
                                                  </p>
                                              );
                                          }
                                      })
                                    : getCart().total.toFixed(2) * 1}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Payment;
