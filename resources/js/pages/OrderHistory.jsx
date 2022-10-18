import Layout from "../Layouts/Layout";
import React, { useState } from "react";
import AccountTabs from "../components/AccountTabs";
import { Link, usePage } from "@inertiajs/inertia-react";

const OrderHistory = ({ seo }) => {
    const rows = [
        {
            id: "123456789",
            date: "15.05.2022",
            price: "95.55",
        },
        {
            id: "123456789",
            date: "15.05.2022",
            price: "95.55",
        },
        {
            id: "123456789",
            date: "15.05.2022",
            price: "95.55",
        },
        {
            id: "123456789",
            date: "15.05.2022",
            price: "95.55",
        },
        {
            id: "123456789",
            date: "15.05.2022",
            price: "95.55",
        },
        {
            id: "123456789",
            date: "15.05.2022",
            price: "95.55",
        },
        {
            id: "123456789",
            date: "15.05.2022",
            price: "95.55",
        },
    ];

    return (
        <Layout seo={seo}>
            <div className="relative bg-custom-slate-300">
                <div className="lg:block hidden absolute bg-white w-1/5 h-full left-0 top-0"></div>
                <div className="wrapper flex min-h-screen relative items-center  flex-col lg:flex-row justify-start ">
                    <AccountTabs tab={2} />
                    <div className="lg:w-2/3 w-full mt-10  lg:mt-0  lg:ml-10 lg:py-40  py-10">
                        <div className="w-full overflow-x-scroll lg:overflow-x-hidden scrollbar pb-5">
                            <table className="orderTable w-full">
                                <tr>
                                    <th>შეკვეთის ნომერი</th>
                                    <th>თარიღი</th>
                                    <th>ჯამური ფასი</th>
                                    <th>შეკვეთის დეტალები</th>
                                </tr>
                                {rows.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <b>{item.id}</b>
                                            </td>
                                            <td className="opacity-50">
                                                {item.date}
                                            </td>
                                            <td>₾ {item.price}</td>
                                            <td>
                                                <Link
                                                    className="flex items-center justify-end bold text-custom-blue"
                                                    href={route(
                                                        "client.orderDetails"
                                                    )}
                                                >
                                                    <span>დეტალურად</span>{" "}
                                                    <img
                                                        className="ml-2"
                                                        src="/assets/images/icons/other/open.png"
                                                        alt=""
                                                    />
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </table>
                        </div>

                        <div className=" flex flex-around justify-center  pt-20">
                            <p className="bold">1</p>
                            <p className="bold" style={{ margin: "20px" }}>
                                2
                            </p>
                            <p className="bold">3</p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default OrderHistory;
