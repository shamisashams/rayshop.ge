import React from "react";
import { SocialMedia } from "./Shared";
// import { ReactComponent as Insite } from "/assets/images/logo/insite/1.svg";
import { useLocation } from "react-router-dom";
import { Link, usePage } from "@inertiajs/inertia-react";
const Footer = () => {
    const { pathname } = usePage().props;

    let hideFooter = false;

    if (
        pathname === route("client.login.index") ||
        pathname === route("client.registration.index") ||
        pathname === route("client.contact.index")
    ) { 
        hideFooter = true;
    }

    return (
        <footer
            className={`wrapper flex justify-between items-end py-5 ${
                hideFooter ? "hidden" : "flex"
            }`}
        >
            <div className="opacity-50 bold text-sm">
                2022. All rights reserved <br />
                <p className="bold pt-2">
                    {" "}
                    Made by{" "}
                    <a target="_blank" href="https://insite.ge/">
                        {/* <Insite className="inline-block align-middle  ml-1 mb-1" /> */}
                        <img
                            className="inline-block align-middle  ml-1 mb-1"
                            src="/assets/images/logo/insite/1.svg"
                            alt="insite"
                        />
                    </a>
                </p>
            </div>
            <SocialMedia />
        </footer>
    );
};

export default Footer;
