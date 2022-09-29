import React, { useState } from "react";
import Layout from "../Layouts/Layout";
import { CommonButton } from "../components/Shared";

const PasswordFail = ({ seo }) => {
    return (
        <Layout seo={seo}>
            <div className="py-20 wrapper relative text-center min-h-screen flex items-center justify-center flex-col ">
                <img
                    className="mx-auto w-16"
                    src="/assets/images/icons/other/cancel.png"
                    alt=""
                />
                <div className=" text-2xl bold my-10">დაფიქსირდა შეცდომა</div>
                <CommonButton text="მთავარი გვერდი" />
            </div>
        </Layout>
    );
};

export default PasswordFail;
