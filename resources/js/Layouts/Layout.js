import React, { useEffect } from "react";
import "./index.css";
import "aos/dist/aos.css";
import CursorFollower from "../components/AnimatedCursor";
import Header from "../components/Header";

import Footer from "../components/Footer";

import setSeoData from "./SetSeoData";
// import {Fragment} from "react";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Aos from "aos";
import { usePage } from "@inertiajs/inertia-react";

export default function Layout({ children, seo = null }) {
    if (seo) {
        setSeoData(seo);
    }
    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    const { currentLocale } = usePage().props;

    // if (currentLocale == "ge") {
    //     import("./AppGeo.css");
    // } else if (currentLocale == "ru") {
    //     import("./AppRus.css");
    // }

    return (
        <>
        <CursorFollower/>
            {/*<Router>*/}
            {/*<Fragment>*/}
            <Header />
            {children}
            <Footer />
            {/*</Fragment>*/}
            {/*</Router>*/}
        </>
    );
}
