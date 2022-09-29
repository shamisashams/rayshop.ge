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
import { Inertia } from "@inertiajs/inertia";

export default function Layout({ children, seo = null }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, [1000]);
    }, []);

    // Inertia.on('finish', (event) => {
    //          setLoading(false);
    //   })

    // window.addEventListener("load", ()=>{
    //              setLoading(false);
    //  })


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
