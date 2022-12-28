import React, { useState, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import Layout from "../Layouts/Layout";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import { Link, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import axios from "axios";

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

async function getProduct(id) {


    return axios.get(route('get-cart-items'), {params: {product_id: id}}).then(function (response) {
        // handle success
        console.log(response.data);

        return response.data

    });
}

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
     Inertia.visit(window.location.href);
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
        promo_code: null,
        promocode_product: null
    });


    const [cartTotal,setCartTotal] = useState(0);

    let cart = [];
    let _cart = localStorage.getItem("cart");
    if (_cart !== null) cart = JSON.parse(_cart);

    let total = 0;
    let product_id = [];
    cart.forEach(function (el, i) {
        product_id.push(el.product.id);
    });

     axios.get(route('get-cart-items2'), {params: {product_id: product_id}}).then(function (response) {
        // handle success
        console.log(response.data);

        cart.forEach(function (el, i) {
            total +=
                el.qty *
                (response.data[el.product.id].special_price !== null
                    ? response.data[el.product.id].special_price
                    : response.data[el.product.id].price);
        });
        //alert(total)

        setCartTotal(total);
    });


    const [discount,setDiscount] = useState('');

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));


    }

    function handleChange2(e) {

        const value = e.target.value;
        setValues((values) => ({
            ...values,
            promocode_product: value,
        }));
        let data = e.target.dataset.price;
        data = parseFloat(data);
        //alert(data)
        if(values.promo_code){
            setDiscount(data * parseFloat(values.promo_code.discount)/100);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        Inertia.post(route("client.checkout.order"), values);
    }

    const [selectBank, setSelectBank] = useState(false);

    let promoCode = 1234567;
    const [correctPromo, setCorrectPromo] = useState(false);
    const [promoAttempt, setPromoAttempt] = useState(false);
    const checkCode = (e) => {
        setPromoAttempt(true);
        if (e.target.value.length > 7 && e.target.value.length < 9) {
            axios.post(route('check-promocode'),{promocode:e.target.value}).then((response)=>{
                console.log(response.data);
                if(response.data.status === 'ok'){
                    setCorrectPromo(true);
                    console.log("promo code is correct");
                    setValues((values) => ({
                        ...values,
                        promo_code: response.data.promocode,
                    }));
                } else {
                    setDiscount(null);
                    setCorrectPromo(false);
                }
            });

        } else {
            axios.get(route('remove-promocode')).then((response)=>{
                console.log(response.data);
            });
            setValues((values) => ({
                ...values,
                promo_code: null,
            }));
            setDiscount(null)
            setCorrectPromo(false);
        }
        document.querySelectorAll('[name="product_id"]').forEach((el,i) => {
            el.checked =  false;
        })
    };

    return (
        <Layout seo={seo}>
            <div className="relative paymentPage">
                <div className="lg:block hidden absolute bg-custom-slate-300 w-1/5 h-full right-0 top-0"></div>
                <div className="flex items-center justify-between wrapper min-h-screen flex-col-reverse lg:flex-row">
                    <div className="lg:w-2/3 lg:mt-32 mt-20 pb-10 pt-20">
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
                                                selected={user.city == e.id}
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

                            <div className="text-center my-5  mb-10">
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
                            <p className="opacity-50 text-center mb-4 ">
                                გამოიყენე პრომო კოდი
                            </p>
                            <div className="relative w-fil h-fit mb-10">
                                <input
                                    onChange={(e) => checkCode(e)}
                                    className=" placeholder:opacity-50 text-center bold text-xl"
                                    type="text"

                                />
                                {/* correct or incorrect code :  */}
                                <img
                                    className={`absolute top-1/2 -translate-y-1/2 right-4 ${
                                        promoAttempt ? "block" : "hidden"
                                    }`}
                                    src={
                                        correctPromo
                                            ? "/assets/images/icons/other/correct.png"
                                            : "/assets/images/icons/other/error.png"
                                    }
                                />
                            </div>

                            <div
                                className={` transition-all duration-300
                                    ${
                                        correctPromo
                                            ? "opacity-100"
                                            : "opacity-0"
                                    }
                                `}
                            >
                                <p>
                                    აირჩიე ნივთი{" "}
                                    <span className="opacity-50">
                                        (პრომო კოდი მოქმედებს მხოლოდ 1 ნივთზე)
                                    </span>{" "}
                                </p>

                                <div
                                    className={`bg-custom-slate-200 sm:p-5 p-3 overflow-y-scroll scrollbar h-44 mt-3 `}
                                >
                                    {getCart().items.map((item, index) => {
                                        const [quantity, setquantity] =
                                            useState(item.qty);

                                        const [realProduct2, setRealProduct2] = useState(
                                            null,[]
                                        );

                                        useEffect(()=>{
                                            getProduct(item.product.id).then((data)=>{
                                                console.log(data)
                                                setRealProduct2(data)
                                            })
                                        },[]);
                                        return (
                                            <div
                                                key={index}
                                                className={`flex items-center justify-between mb-4 text-sm`}
                                            >
                                                <div className="flex items-center  mr-3 ">
                                                    <input
                                                        type="radio"
                                                        id={`radio_${index}`}
                                                        name="product_id"
                                                        value={item.product.id}
                                                        onChange={handleChange2}
                                                        data-price={realProduct2?realProduct2.special_price
                                                            ? realProduct2
                                                                .special_price
                                                            : realProduct2.price:null}
                                                    />
                                                    <label
                                                        htmlFor={`radio_${index}`}
                                                    >
                                                        <div></div>
                                                    </label>
                                                    <div className=" sm:w-20 w-16 h-fit shrink-0 sm:mx-3 mx-2">
                                                        {/* <img className="w-full object-cover" src={item.product.img} alt="" /> */}
                                                        {realProduct2 ? (
                                                            <img
                                                                className="w-full object-cover"
                                                                alt=""
                                                                src={
                                                                    realProduct2
                                                                        .latest_image !=
                                                                    null
                                                                        ? "/" +
                                                                        realProduct2
                                                                              .latest_image
                                                                              .path +
                                                                          "/" +
                                                                        realProduct2
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
                                                                    realProduct2?(realProduct2
                                                                        .files !=
                                                                    null
                                                                        ? "/" +
                                                                        realProduct2
                                                                              .files[0]
                                                                              .path +
                                                                          "/" +
                                                                        realProduct2
                                                                              .files[0]
                                                                              .title
                                                                        : null):null
                                                                }
                                                            />
                                                        )}
                                                    </div>
                                                    <div>
                                                        {realProduct2?realProduct2.title:null}
                                                    </div>
                                                </div>

                                                <div>
                                                    {__(
                                                        "client.size",
                                                        sharedData
                                                    )}{" "}
                                                    :{" "}
                                                    <span className="bold uppercase">
                                                        {item.size}
                                                    </span>
                                                </div>
                                                <div className="bold">
                                                    {realProduct2?realProduct2.special_price
                                                        ? realProduct2
                                                              .special_price
                                                        : realProduct2.price:null}
                                                    {__(
                                                        "client.gel",
                                                        sharedData
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <form
                                className={`transition-all duration-300 ${
                                    correctPromo ? "mt-0 " : "-mt-32"
                                }`}
                                onSubmit={handleSubmit}
                            >
                                <div className="text-center mt-10">
                                    {/* <CommonButton text="გადახდა" width="245px" /> */}
                                    <button
                                        //disabled={!correctPromo}
                                        type="submit"
                                        className={`bold xl:py-5 py-4 xl:px-12 px-9 relative commonBtn whitespace-nowrap xl:text-base text-sm opacity-100`}
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
                                const [realProduct, setRealProduct] = useState(
                                    null,[]
                                );

                                useEffect(()=>{
                                    getProduct(item.product.id).then((data)=>{
                                        console.log(data)
                                        setRealProduct(data)
                                    })
                                },[]);

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
                                                {realProduct ? (
                                                    <img
                                                        className="w-full object-cover"
                                                        alt=""
                                                        src={
                                                            realProduct
                                                                .latest_image !=
                                                            null
                                                                ? "/" +
                                                                realProduct
                                                                      .latest_image
                                                                      .path +
                                                                  "/" +
                                                                realProduct
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
                                                            realProduct ? (realProduct
                                                                .files != null
                                                                ? "/" +
                                                                realProduct
                                                                      .files[0]
                                                                      .path +
                                                                  "/" +
                                                                realProduct
                                                                      .files[0]
                                                                      .title
                                                                : null):null
                                                        }
                                                    />
                                                )}
                                            </div>
                                            <div className="lg:w-32 w-24">
                                                <div>{realProduct ? realProduct.title :null}</div>
                                                <div className="bold mb-3 mt-1">
                                                    {realProduct ? realProduct.special_price
                                                        ? realProduct
                                                              .special_price
                                                        : realProduct.price:null}
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
                                                      {discount ? e.ship_price * 1 +
                                                          cartTotal.toFixed(
                                                              2
                                                          ) *
                                                              1 - discount : e.ship_price * 1 +
                                                          cartTotal.toFixed(2) * 1 }
                                                  </p>
                                              );
                                          }
                                      })
                                    : discount ? cartTotal.toFixed(2) * 1 - discount : cartTotal.toFixed(2) * 1}

                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Payment;
