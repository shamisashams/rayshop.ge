// import UserImg from "../assets/images/icons/user.png";
import { CommonButton } from "../components/Shared";
import { BsPlusCircle, BsEye } from "react-icons/bs";
import Layout from "../Layouts/Layout";
import { Link, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import React, { useState } from "react";
import AccountTabs from "../components/AccountTabs";

const Account = ({ seo, city }) => {
    const [displayPassword, setDisplayPassword] = useState(false);
    const { user, flash } = usePage().props;
    const renderHTML = (rawHTML) =>
        React.createElement("div", {
            dangerouslySetInnerHTML: { __html: rawHTML },
        });
    const sharedData = usePage().props.localizations;

    const [values, setValues] = useState({
        name: user.name,
        surname: user.surname,
        email: user.email,
        phone: user.phone,
        address: user.address,
        city: user.city,
        password: "",
    });

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        Inertia.post(route("client.updateuser"), values);
    }
    return (
        <Layout seo={seo}>
            <div className="relative bg-custom-slate-300">
                <div className="lg:block hidden absolute bg-white w-1/5 h-full left-0 top-0"></div>
                <div className="wrapper flex min-h-screen relative items-center flex-col lg:flex-row">
                    <AccountTabs tab={1} />
                    <div className="lg:w-2/3 mt-10  lg:mt-0 pb-20 lg:pb-0">
                        <div className="max-w-md  text-center">
                            <form onSubmit={handleSubmit}>
                                <div className="bold text-2xl mb-10">
                                    {__(
                                        "client.cabinet_personal_information",
                                        sharedData
                                    )}
                                </div>
                                <input
                                    className="bg-white mb-5"
                                    id="name"
                                    type="text"
                                    placeholder={__(
                                        "client.cabinet_name",
                                        sharedData
                                    )}
                                    value={values.name}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    className="bg-white mb-5"
                                    id="surname"
                                    type="text"
                                    placeholder={__(
                                        "client.cabinet_surname",
                                        sharedData
                                    )}
                                    value={values.surname}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    className="bg-white mb-5"
                                    id="email"
                                    type="email"
                                    placeholder={__(
                                        "client.cabinet_email",
                                        sharedData
                                    )}
                                    value={values.email}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    id="phone"
                                    className="bg-white mb-5"
                                    type="text"
                                    placeholder={__(
                                        "client.cabinet_phone",
                                        sharedData
                                    )}
                                    value={values.phone}
                                    onChange={handleChange}
                                />
                                <select
                                    onChange={(e) => {
                                        values.city = e.target.value;
                                    }}
                                    id="city"
                                    className="bg-white mb-5"
                                >
                                    <option selected="true" disabled="true">
                                        {__(
                                            "client.cabinet_choose_city",
                                            sharedData
                                        )}
                                    </option>
                                    {city.map((e, i) => {
                                        // let isCity = false;
                                        // if(user.city == e.id)isCity== true
                                        return (
                                            <option
                                                key={i}
                                                selected={user.city == e.id}
                                                value={e.id}
                                            >
                                                {e.title}
                                            </option>
                                        );
                                    })}
                                </select>
                                <input
                                    id="address"
                                    name="address"
                                    className="bg-white mb-5"
                                    type="text"
                                    placeholder={__(
                                        "client.cabinet_address",
                                        sharedData
                                    )}
                                    value={values.address}
                                    onChange={handleChange}
                                />
                                <div className="relative w-full h-fit mb-10 ">
                                    <input
                                        value={values.password}
                                        onChange={handleChange}
                                        id="password"
                                        //   required
                                        className="bg-white"
                                        type={
                                            displayPassword
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder={__(
                                            "client.cabinet_newpassword",
                                            sharedData
                                        )}
                                    />
                                    <button
                                        onClick={() =>
                                            setDisplayPassword(!displayPassword)
                                        }
                                        className="absolute top-1/2 right-3 -translate-y-1/2"
                                    >
                                        <BsEye className="w-5 h-5" />
                                    </button>
                                </div>
                                <button className="bold text-custom-blue">
                                    <BsPlusCircle className="inline-block w-5 h-5 mr-2" />
                                    {__("client.cabinet_save", sharedData)}
                                </button>

                                {flash ? (
                                    <p className="alert alert-success">
                                        {__(
                                            "client.cabinet_savesuccess",
                                            sharedData
                                        )}
                                    </p>
                                ) : (
                                    ""
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Account;
