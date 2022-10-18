import Layout from "../Layouts/Layout";
import React, { useState } from "react";
import AccountTabs from "../components/AccountTabs";
import { Link, usePage } from "@inertiajs/inertia-react";

const OrderHistory = ({ seo, orders }) => {

    let links = function (links) {
        let rows = [];
        {
            links.map(function (item, index) {
                if (index > 0 && index < links.length - 1) {
                    rows.push(
                        <Link
                            href={item.url}
                            className={
                                item.active
                                    ? "text-decoration-line: underline text-blue-500 "
                                    : "num"
                            }
                        >
                            <span style={{ padding: "5px" }}>{item.label}</span>
                        </Link>
                    );
                }
            });
        }
        return <div className="nums"> {rows.length > 1 ? rows : null} </div>;
    };

    let linksPrev = function (links) {
        let rowCount = 0;
        links.map(function (item, index) {
            if (index > 0 && index < links.length - 1) {
                rowCount++;
            }
        });
        return rowCount > 1 ? (
            <Link href={links[0].url}>
                {/* <Arrow color="#2F3E51" rotate="90" /> */}
                {/* <Arrow color="#2F3E51" rotate="90" /> */}
            </Link>
        ) : null;
    };
    let linksNext = function (links) {
        let rowCount = 0;
        links.map(function (item, index) {
            if (index > 0 && index < links.length - 1) {
                rowCount++;
            }
        });
        return rowCount > 1 ? (
            <Link href={links[links.length - 1].url}>
                {/* <Arrow color="#2F3E51" rotate="-90" /> */}
                {/* <Arrow color="#2F3E51" rotate="-90" /> */}
            </Link>
        ) : null;
    };

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

                                {
                                    orders.data.map((item,index)=>{
                                        const date = () => {
                                            let z = item.created_at.split("-");
                                            z[2] = z[2].split(":");
                                            z[2] = z[2][0].slice(0, z[2][0].search("T"));
                                            return z;
                                        }
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <b>#{item.id}</b>
                                                </td>
                                                <td className="opacity-50">
                                                    {/* {item.created_at} */}
                                                    {`${date()[0]} ${date()[1]} ${date()[2]}`}
                                                </td>
                                                <td>₾ {item.grand_total}</td>
                                                <td>
                                                    <Link
                                                        className="flex items-center justify-end bold text-custom-blue"
                                                        href={route("client.orderDetails", item.id)}>
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
                                    })
                                }
                            </table>
                        </div>

                        <div className=" flex flex-around justify-center  pt-20">
                        {linksPrev(orders.links)}
                        <p className="bold" style={{ margin: "20px" }}>

                            <p className="bold">{links(orders.links)}</p>
                        </p>
                        {linksNext(orders.links)}
                    </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default OrderHistory;
