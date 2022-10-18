import { CommonButton } from "../components/Shared";
import { Link, usePage } from "@inertiajs/inertia-react";
import React, { useState } from "react";

const AccountTabs = () => {
    const { user } = usePage().props;
    const sharedData = usePage().props.localizations;

    return (
        <div className="self-stretch bg-white flex flex-col items-center justify-center md:pr-10 md:mr-5 pt-32 pb-10 md:pb-0 md:pt-0">
            <div className="w-14 h-14 rounded-full overflow-hidden md:mb-10 mb-5">
                <img src={"/assets/images/icons/user.png"} alt="" />
            </div>
            <div className="opacity-50 mb-3">
                {__("client.cabinet", sharedData)}
            </div>
            <div className="bold text-2xl">
                {/* სახელი გვარი */}
                {user.name + " " + user.surname}
            </div>
            <div className="md:mb-20 mb-6"></div>
            <CommonButton text="სისტემიდან გასვლა" />
        </div>
    );
};

export default AccountTabs;
