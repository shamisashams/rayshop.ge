import React, { useState } from "react";
import Layout from "../Layouts/Layout";
import { CommonButton } from "../components/Shared";

const PaymentFail = ({ seo }) => {
    return (
        <Layout seo={seo}>
            <div className="py-20 lg:pt-52 pt-32 wrapper relative text-center min-h-screen ">
                <div className="lg:text-3xl text-2xl bold mb-6">
                    გადახდა არ შესრულებულდა
                </div>
                <p className="opacity-50 mb-6 max-w-md mx-auto">
                    დაფიქსირდა პრობლემა, გთხოვთ გადაამოწმოთ ინფომრაცია, რომელიც
                    გადახდის გვერდზე შეგყავთ
                </p>
                <img
                    className="mx-auto mb-10"
                    src="/assets/images/icons/other/cancel.png"
                    alt=""
                />

                <CommonButton text="მთავარი გვერდი" />
            </div>
        </Layout>
    );
};

export default PaymentFail;
