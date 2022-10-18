import React, { useState } from "react";
import Layout from "../Layouts/Layout";
import { CommonButton } from "../components/Shared";

const PaymentSuccess = ({ seo }) => {
    localStorage.clear();

    return (
        <Layout seo={seo}>
            <div className="py-20 lg:pt-52 pt-32 wrapper relative text-center min-h-screen ">
                <div className="lg:text-3xl text-2xl bold mb-6">
                    გადახდა შესრულებულია
                </div>
                <p className="opacity-50 mb-6">
                    ტრანზაქცია წარმატებით შესრულდა
                </p>
                <img
                    className="mx-auto"
                    src="/assets/images/icons/other/checked.png"
                    alt=""
                />

                <div
                    className="rounded-2xl h-3 w-full bg-zinc-300 relative mx-auto my-10  mb-20"
                    style={{ maxWidth: "511px" }}
                >
                    <div className="absolute top-0 left-0 bg-custom-orange h-full w-3/5 rounded-2xl "></div>
                    <div className="flex justify-between items-center absolute left-0 top-1/2 -translate-y-1/2 w-full text-sm">
                        <button className="relative w-7 h-7 rounded-full text-white bg-custom-orange shadow">
                            1
                            <div className="absolute left-0 top-full pt-3 text-black text-xs whitespace-nowrap ">
                                პროდუქტის შერჩევა
                            </div>
                        </button>
                        <button className="relative w-7 h-7 rounded-full text-white bg-custom-orange shadow">
                            2
                            <div className="absolute left-0 top-full pt-3 text-black text-xs whitespace-nowrap ">
                                შეკვეთის გაფორმება
                            </div>
                        </button>
                        <button className="relative w-7 h-7 rounded-full text-white  bg-zinc-300  shadow">
                            3
                            <div className="absolute right-0 top-full pt-3 text-black text-xs whitespace-nowrap opacity-50">
                                მიწოდება
                            </div>
                        </button>
                    </div>
                </div>
                <CommonButton text="მთავარი გვერდი" />
            </div>
        </Layout>
    );
};

export default PaymentSuccess;
