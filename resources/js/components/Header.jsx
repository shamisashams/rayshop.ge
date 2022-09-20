import  React from 'react';
import { useRef, useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/inertia-react";
// import {  useLocation } from "react-router-dom";
// import Logo from "/assets/images/logo/1.png";
// import { ReactComponent as SearchIcon } from "/assets/svg/search.svg";
// import { ReactComponent as UserIcon } from "/assets/svg/user.svg";
// import { ReactComponent as CartIcon } from "/assets/svg/cart.svg";
// import { ReactComponent as SettingIcon } from "/assets/svg/settings.svg";
// import { ReactComponent as LogoutIcon } from "/assets/svg/logout.svg";
import { IoCloseOutline } from "react-icons/io5";
import Cart from "./Cart";

const Header = () => {
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
      text: "მთავარი",
    },
    {
      link: route("client.product.index"),
      text: "პროდუქცია",
    },
    {
      link: route("client.about.index"),
      text: "ჩვენ შესახებ",
    },
    {
      link: route("client.conditions.index"),
      text: "პირობები",
    },
    {
      link: route("client.contact.index"),
      text: "კონტაქტი",
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
              placeholder="ძიება საიტზე"
              className={` text-sm bg-custom-slate-300 pr-10 pl-5 h-10 w-72 rounded-full transition-all duration-300 origin-right `}
            />
            <button className="absolute right-0 top-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 bg-custom-slate-300 z-20 ">
              {/* {search ? <IoCloseOutline /> : <SearchIcon /> } */}
              {search? <IoCloseOutline /> :   <img src={"/assets/svg/search.svg"} alt="ss" />}
            </button>
          </div>
          {navLinks.map((item, index) => {
            return (
              <li key={index} className="bold inline text-sm">
                <Link
                  className={`navLink relative 2xl:px-5 px-3 py-2 ${
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
          <div className="relative search_desktop">
            <input
              type="text"
              placeholder="ძიება საიტზე"
              className={`absolute right-0 top-0 text-sm bg-custom-slate-200 pr-10 pl-5 h-full w-72 rounded-full transition-all duration-300 origin-right ${
                search ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
              }`}
            />
            <button
              onClick={() => setSearch(!search)}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-custom-slate-200 z-20 relative"
            >
              {/* {search ? <IoCloseOutline /> : <SearchIcon />} */}
              {search ? <IoCloseOutline /> : <img src={"/assets/svg/search.svg"} alt="ss" />}
            </button>
          </div>
          <div ref={wrapperRef} className="relative">
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
              className={`absolute right-0 sm:top-full top-12  transition-all duration-300 overflow-hidden sm:bg-transparent bg-custom-slate-200 sm:p-0 sm:pt-3 p-5 rounded ${
                accountDrop ? "visible opacity-100" : "invisible opacity-0"
              } `}
            >
              {/* if logged in 👇  */}
              <Link
                href="/signup"
                className={`flex items-center !cursor-pointer mb-3 whitespace-nowrap justify-end transition-all duration-300 ${
                  accountDrop ? "translate-x-0" : "translate-x-32"
                }`}
              >
                {/* <UserIcon className="mr-2" /> */}
                <img src="/assets/svg/user.svg" alt="user" className="mr-2" />
                <p>სახელი გვარი</p>
              </Link>
              <Link
                href="/"
                className={`flex items-center !cursor-pointer mb-3 whitespace-nowrap justify-end  transition-all duration-300 ${
                  accountDrop ? "translate-x-0" : "translate-x-20"
                }`}
              >
                {/* <SettingIcon className="mr-2" /> */}
                <img src="/assets/svg/settings.svg" alt="setting" className="mr-2"/>
                <p>პირადი კაბინეტი</p>
              </Link>
              <button className="flex items-center !cursor-pointer whitespace-nowrap justify-end mx-auto mr-0 text-custom-blue">
                {/* <LogoutIcon className="mr-2" /> */}
                <img src="/assets/svg/logout.svg" alt="logout" className="mr-2" />
                <p>გასვლა</p>
              </button>

              {/* if not logged in 👇  */}

              {/* <Link
                href="/login"
                className={`flex items-center !cursor-pointer mb-3 whitespace-nowrap justify-end transition-all duration-300 ${
                  accountDrop ? "translate-x-0" : "translate-x-32"
                }`}
              >
                <p>სისტემაში შესვლა</p>
              </Link>
              <Link
                href="/signup"
                className={`flex items-center !cursor-pointer mb-3 whitespace-nowrap justify-end  transition-all duration-300 text-custom-blue ${
                  accountDrop ? "translate-x-0" : "translate-x-20"
                }`}
              >
                <p>შექმენი ექაუნთი</p>
              </Link> */}
            </div>
          </div>
          <button
            onClick={() => setShowCart(true)}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-custom-slate-200"
            style={{ background: showCart ? "white" : "" }}
          >
            {/* <CartIcon /> */}
            <img src="/assets/svg/cart.svg" alt="cart" />

          </button>
        </div>
      </div>
      <div ref={wrapperRef}>
        <Cart show={showCart} closeCart={() => setShowCart(false)} />
      </div>
    </header>
  );
};

export default Header;
