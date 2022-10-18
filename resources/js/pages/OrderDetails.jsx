import Layout from "../Layouts/Layout";
import React, { useState } from "react";
import AccountTabs from "../components/AccountTabs";
import { Link, usePage } from "@inertiajs/inertia-react";

const OrderDetails = ({ seo, order,orderitems }) => {
    console.log(order , orderitems, 'esaaa');
    const rows = [
        {
            name: "პროდუქტის დასახელება",
            size: "M",
            quantity: "2",
            price: "95.55",
        },
        {
            name: "პროდუქტის დასახელება",
            size: "s",
            quantity: "1",
            price: "295.00",
        },
        {
            name: "პროდუქტის დასახელება",
            size: "xl",
            quantity: "1",
            price: "22",
        },
        {
            name: "პროდუქტის დასახელება",
            size: "M",
            quantity: "6",
            price: "95.55",
        },
    ];

    const date = () => {
        let z = order.created_at.split("-");
        z[2] = z[2].split(":");
        z[2] = z[2][0].slice(0, z[2][0].search("T"));
        return z;
    }
    return (
        <Layout seo={seo}>
            <div className="relative bg-custom-slate-300">
                <div className="lg:block hidden absolute bg-white w-1/5 h-full left-0 top-0"></div>
                <div className="wrapper flex min-h-screen relative items-center  flex-col lg:flex-row justify-start ">
                    <AccountTabs tab={2} />
                    <div className="lg:w-2/3 w-full mt-10  lg:mt-0  lg:ml-10 lg:py-40  py-10">
                        <div className="pl-4 mb-10">
                            <div className="bold text-lg mb-3">#{order.id}</div>
                            <strong className="mb-3 block">
                                შეკვეთის თარიღი: {`${date()[0]} ${date()[1]} ${date()[2]}`}
                            </strong>
                            <strong className="mb-3  block">
                                ჯამური ფასი: {order.grand_total} ₾
                            </strong>
                        </div>
                        <div className="w-full overflow-x-scroll lg:overflow-x-hidden scrollbar pb-5 my-5">
                            <table className="orderTable w-full">
                                <tr>
                                    <th className="opacity-50 text-sm">
                                        დასახელება
                                    </th>
                                    <th className="opacity-50 text-sm">ზომა</th>
                                    <th className="opacity-50 text-sm">
                                        რაოდენობა
                                    </th>
                                    <th className="opacity-50 text-sm">ფასი</th>
                                </tr>
                                {/* {rows.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="bold">
                                                {item.name}
                                            </td>
                                            <td className="bold uppercase">
                                                {item.size}
                                            </td>
                                            <td className="bold">
                                                {item.quantity}
                                            </td>
                                            <td className="bold">
                                                ₾ {item.price}
                                            </td>
                                        </tr>
                                    );
                                })} */}
                                {
                                    orderitems.map((item,index)=>{
                                        return (
                                            <tr key={index}>
                                                <td className="bold">
                                                    {item.name}
                                                </td>
                                                <td className="bold uppercase">
                                                    {item.size}
                                                </td>
                                                <td className="bold">
                                                    {item.qty_ordered}
                                                </td>
                                                <td className="bold">
                                                    ₾ {item.price}
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default OrderDetails;
