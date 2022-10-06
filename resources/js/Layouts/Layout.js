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
import LinearWithValueLabel from "../components/Preloader/Preloader";
import { useState } from "react";
// import { InertiaProgress } from '@inertiajs/progress'
// import { Inertia } from "@inertiajs/inertia";
import NProgress from 'nprogress'
import { Inertia } from '@inertiajs/inertia'
import { Route } from "react-router-dom";



export default function Layout({ children, seo = null }) {
    // const [loading, setLoading] = useState(window.location == route("client.home.index")?true:false);
    const [loading, setLoading] = useState(window.location != route("client.product.index")?true:false);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, [1500]);
    }, []);

    Inertia.on('finish', () => {
        setLoading(false);
    })


    window.addEventListener("load", ()=>{
      setLoading(false)
     })


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
            <LinearWithValueLabel loading={loading} />
            <CursorFollower />
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
