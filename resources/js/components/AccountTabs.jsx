import React, { useState } from "react";
import { CommonButton } from "../components/Shared";
import { Link, usePage } from "@inertiajs/inertia-react";

const AccountTabs = ({ tab }) => {
    const { user } = usePage().props;
    const sharedData = usePage().props.localizations;

    return (
        <div className="self-stretch bg-white flex flex-col items-center justify-center lg:pr-10 lg:mr-5 pt-32 pb-10 lg:pb-0 lg:pt-0">
            <div className="w-14 h-14 rounded-full overflow-hidden lg:mb-10 mb-5">
                <img src={"/assets/images/icons/user.png"} alt="" />
            </div>
            <div className="opacity-50 mb-3">
                {__("client.cabinet", sharedData)}
            </div>
            <div className="bold text-2xl">
                {/* სახელი გვარი */}
                {user.name + " " + user.surname}
            </div>
            <div className="lg:mb-20 mb-6 mt-10">
                <Link
                    href={route("client.cabinet")}
                    className={`group flex items-center justify-start bold mb-6 ${
                        tab === 1
                            ? "text-custom-blue opacity-100"
                            : "opacity-70"
                    } transition-all `}
                >
                    <svg
                        className="mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        width="23.25"
                        height="23.243"
                        viewBox="0 0 23.25 23.243"
                    >
                        <path
                            id="key-outline"
                            d="M11.961,9.39a5.708,5.708,0,0,0,.207,1.888c-2.175,2.554-7.92,9.3-8.455,9.818a1.018,1.018,0,0,0-.338.757,1.687,1.687,0,0,0,.485,1.075c.333.348,1.757,1.666,2.019,1.414.777-.757.934-.959,1.252-1.272.48-.47-.05-1.429.116-1.817a.736.736,0,0,1,.631-.525,9.473,9.473,0,0,1,1.2.151,1.262,1.262,0,0,0,.959-.464,1.061,1.061,0,0,0,.439-.788c.01-.454-.646-1.055-.157-1.534s1.2.313,1.716.253a1.906,1.906,0,0,0,1.217-1.09c.066-.308-.591-1.1-.49-1.55a1.051,1.051,0,0,1,.576-.555c.233-.05,1.262.348,1.494.3a3.528,3.528,0,0,0,.878-.525,5.686,5.686,0,0,0,2.408.475,6.143,6.143,0,0,0,6.259-6.017,6.136,6.136,0,0,0-6.261-6.007A6.048,6.048,0,0,0,11.961,9.39Zm9.182-1.169a1.615,1.615,0,1,1-1.615-1.615A1.615,1.615,0,0,1,21.143,8.221Z"
                            transform="translate(-2.25 -2.25)"
                            fill="none"
                            className={` ${
                                tab === 1
                                    ? "stroke-custom-blue"
                                    : "stroke-black"
                            } transition-all `}
                            stroke-linejoin="round"
                            stroke-width="2.25"
                        />
                    </svg>
                    <span>პაროლის ცვლილება</span>
                </Link>
                <Link
                    href={route("client.orderhistory")}
                    className={`group flex items-center justify-start bold  ${
                        tab === 2
                            ? "text-custom-blue opacity-100"
                            : "opacity-70"
                    } transition-all `}
                >
                    <svg
                        className="mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="18"
                        viewBox="0 0 21 18"
                    >
                        <path
                            id="Icon_material-history"
                            data-name="Icon material-history"
                            d="M13.5,4.5a9,9,0,0,0-9,9h-3l3.89,3.89.07.14L9.5,13.5h-3a7.034,7.034,0,1,1,2.06,4.94L7.14,19.86A9,9,0,1,0,13.5,4.5Zm-1,5v5l4.28,2.54.72-1.21L14,13.75V9.5Z"
                            transform="translate(-1.5 -4.5)"
                            className={` ${
                                tab === 2 ? "fill-custom-blue" : ""
                            } transition-all `}
                        />
                    </svg>

                    <span>შეკვეთების ისტორია</span>
                </Link>
            </div>
            <CommonButton text="სისტემიდან გასვლა" />
        </div>
    );
};

export default AccountTabs;
