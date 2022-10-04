import React from "react";
import { useRef, useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/inertia-react";
import { IoCloseOutline } from "react-icons/io5";
import Cart from "./Cart";
import { Inertia } from "@inertiajs/inertia";

const Header = () => {
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
    const sharedData = usePage().props.localizations;

    // const searchProduct = function () {
    //     let term = document.getElementById("search_inp").value;
    //     Inertia.get(route("search.index"), { term: term });
    // };

    const { user } = usePage().props;
    const { pathname } = usePage().props;
    const [search, setSearch] = useState(false);
    const [accountDrop, setaAcountDrop] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [showMobileNav, setShowMobileNav] = useState(false);
    const wrapperRef = useRef(null);
    const menuWrapper = useRef(null);

    useOutsideAlerter(wrapperRef);
    useOutsideMenu(menuWrapper);
    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setaAcountDrop(false);
                    setShowCart(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    function useOutsideMenu(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setShowMobileNav(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const navLinks = [
        {
            link: route("client.home.index"),
            text: __("client.nav_home", sharedData),
        },
        {
            link: route("client.product.index"),
            text: __("client.nav_product", sharedData),
        },
        {
            link: route("client.about.index"),
            text: __("client.nav_about", sharedData),
        },
        {
            link: route("client.conditions.index"),
            text: __("client.nav_conditions", sharedData),
        },
        {
            link: route("client.gallery.index"),
            text: __("client.nav_gallery", sharedData),
        },
        {
            link: route("client.contact.index"),
            text: __("client.nav_contact", sharedData),
        },
    ];
    return (
        <header
            ref={menuWrapper}
            className={` w-full top-0 left-0 z-50 ${
                showMobileNav ? "fixed" : "absolute"
            } `}
        >
            <div className="wrapper relative lg:py-10 py-5 flex items-center justify-between">
                <Link
                    href={route("client.home.index")}
                    className="z-50 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pl-6 w-36 "
                >
                    <img src={"/assets/images/logo/1.png"} alt="" />
                </Link>
                <button
                    onClick={() => setShowMobileNav(!showMobileNav)}
                    className={`hidden z-50 relative py-2 menuButton group w-10 ${
                        showMobileNav && "close"
                    }`}
                >
                    <div className="bg-black h-px w-full duration-300  origin-right transition  "></div>
                    <div className="bg-black h-px w-full duration-300  origin-right  my-1  transition "></div>
                    <div className="bg-black h-px w-full duration-300 transition "></div>
                </button>
                <ul className={`navbar ${showMobileNav ? "show" : ""}`}>
                    <div className="relative search_mobile flex items-center justify-center hidden">
                        <input
                            type="text"
                            id="search_inp"
                            placeholder={__("client.nav_search", sharedData)}
                            className={` text-sm bg-custom-slate-300 pr-10 pl-5 h-10 w-72 rounded-full transition-all duration-300 origin-right `}
                        />

                        <button className="absolute right-0 top-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 bg-custom-slate-300 z-20 ">
                            {/* {search ? <IoCloseOutline /> : <SearchIcon /> } */}
                            search ? (
                            <IoCloseOutline />
                            ) : (
                            <img src={"/assets/svg/search.svg"} alt="ss" />)
                        </button>
                    </div>

                    {navLinks.map((item, index) => {
                        return (
                            <li key={index} className="bold inline text-sm">
                                <Link
                                    className={`navLink relative 2xl:px-4 px-3 py-2 ${
                                        pathname === item.link ? "active" : ""
                                    }`}
                                    href={item.link}
                                >
                                    {item.text}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                <div className="z-50  flex items-center justiry-between">
                    <div
                        className={`relative search_desktop transition-all  duration-300 ${
                            showCart ? "invisible opacity-0" : ""
                        }`}
                    >
                        <input
                            id="search_inp"
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    Inertia.get(route("search.index"), {
                                        term: e.target.value,
                                    });
                                }
                            }}
                            type="text"
                            placeholder={__("client.nav_search", sharedData)}
                            className={`absolute right-0 top-0 text-sm bg-custom-slate-200 pr-10 pl-5 h-full w-72 rounded-full transition-all duration-300 origin-right ${
                                search
                                    ? "scale-x-100 opacity-100"
                                    : "scale-x-0 opacity-0"
                            }`}
                        />
                        <button
                            onClick={() => setSearch(!search)}
                            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-custom-slate-200 z-20 relative"
                        >
                            {search ? (
                                <IoCloseOutline />
                            ) : (
                                <img src={"/assets/svg/search.svg"} alt="ss" />
                            )}
                        </button>
                    </div>
                    <div
                        className={`relative transition-all duration-300 ${
                            showCart ? "invisible opacity-0" : ""
                        }`}
                    >
                        <button
                            onClick={() => setaAcountDrop(!accountDrop)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-custom-slate-200 mx-1 ${
                                accountDrop ? "bg-custom-slate-200" : ""
                            }`}
                        >
                            <img src="/assets/svg/user.svg" alt="user" />
                            {/* <UserIcon /> */}
                        </button>

                        <div
                            className={`absolute right-0 sm:top-full top-12  transition-all duration-300  sm:bg-transparent bg-custom-slate-200 sm:p-0 sm:pt-3 p-5 rounded ${
                                accountDrop
                                    ? "visible opacity-100"
                                    : "invisible opacity-0"
                            }

                            `}
                        >
                            {/* if logged in 👇  */}

                            {user ? (
                                <>
                                    <Link
                                        href="/"
                                        className={`flex items-center !cursor-pointer mb-3 whitespace-nowrap justify-end transition-all duration-300 ${
                                            accountDrop
                                                ? "translate-x-0"
                                                : "translate-x-32"
                                        }`}
                                    >
                                        {/* <UserIcon className="mr-2" /> */}
                                        <img
                                            src="/assets/svg/user.svg"
                                            alt="user"
                                            className="mr-2"
                                        />
                                        <p>{`${user.name}`}</p>
                                    </Link>
                                    <Link
                                        href="/"
                                        className={`flex items-center !cursor-pointer mb-3 whitespace-nowrap justify-end  transition-all duration-300 ${
                                            accountDrop
                                                ? "translate-x-0"
                                                : "translate-x-20"
                                        }`}
                                    >
                                        {/* <SettingIcon className="mr-2" /> */}
                                        <img
                                            src="/assets/svg/settings.svg"
                                            alt="setting"
                                            className="mr-2"
                                        />
                                        <Link href={route("client.cabinet")}>
                                            <p>
                                                {/* პირადი კაბინეტი */}
                                                {__("client.nav_cabinet", sharedData)}
                                            </p>
                                        </Link>
                                    </Link>
                                    <button className="flex items-center !cursor-pointer whitespace-nowrap justify-end mx-auto mr-0 text-custom-blue">
                                        {/* <LogoutIcon className="mr-2" /> */}
                                        <img
                                            src="/assets/svg/logout.svg"
                                            alt="logout"
                                            className="mr-2"
                                        />
                                        <Link href={route("logout")}>
                                            <p>
                                                {__("client.nav_logout", sharedData)}
                                            </p>
                                        </Link>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href={route("client.login.index")}
                                        className={`flex items-center !cursor-pointer mb-3 whitespace-nowrap justify-end transition-all duration-300 ${
                                            accountDrop
                                                ? "translate-x-0"
                                                : "translate-x-32"
                                        }`}
                                    >
                                        <p>
                                            {__("client.nav_login", sharedData)}
                                        </p>
                                    </Link>
                                    <Link
                                        href={route(
                                            "client.registration.index"
                                        )}
                                        className={`flex items-center !cursor-pointer mb-3 whitespace-nowrap justify-end  transition-all duration-300 text-custom-blue ${
                                            accountDrop
                                                ? "translate-x-0"
                                                : "translate-x-20"
                                        }`}
                                    >
                                        <p>
                                            {__("client.nav_signup", sharedData)}
                                        </p>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>{" "}
                    <button
                        onClick={() => {
                            setShowCart(!showCart);
                        }}
                        className="relative z-50 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-custom-slate-200"
                        style={{ background: showCart ? "white" : "" }}
                    >
                        {/* <CartIcon /> */}
                        <div>
                        <img src="/assets/svg/cart.svg" alt="cart" />
                        {
                           getCart().items.length > 0 &&
                            <span style={{
                             position:"absolute",
                             left:"18px",top:"20px",
                             background:'red',
                             color:'white',
                             padding: '1px 5px 1px',
                             fontWeight: 'bold',
                            }}
                            className="text-xs rounded-full">{getCart().items.length}
                            </span>
                        }

                        </div>
                    </button>
                </div>
            </div>
            <div>
                <Cart show={showCart} closeCart={() => setShowCart(false)} />
            </div>
        </header>
    );
};

export default Header;
