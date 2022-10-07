import { Inertia } from "@inertiajs/inertia";
import React, { useState } from "react";
import { CommonButton } from "../components/Shared";
// import AbsImage from "../assets/images/abs/2.png";
import Layout from "../Layouts/Layout";
import { Link, usePage } from "@inertiajs/inertia-react";
import { IoCloseOutline } from "react-icons/io5";

const ForgotPassword = ({ seo, email, status, err }) => {
    const renderHTML = (rawHTML) =>
        React.createElement("div", {
            dangerouslySetInnerHTML: { __html: rawHTML },
        });
    const sharedData = usePage().props.localizations;
    const [values, setValues] = useState({
        email: "",
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
        Inertia.post(route("password.email"), values);
        // setSuccess(true);
    }

    const [success, setSuccess] = useState(status? true : false);
    const { errors } = usePage().props
    return (
        <Layout seo={seo}>
            <div className="py-20 lg:pt-40 pt-32 wrapper relative text-center min-h-screen">
                <div className="max-w-md mx-auto relative">
                    <div className="text-lg mb-2 bold">
                        {/* პაროლის აღდგენა */}
                        {__("client.forgotpass_recoverpass", sharedData)}
                    </div>
                    <p className="opacity-50 mb-6">
                        {/* მიიღე პაროლის აღსადგენი ბმული ელფოსტაზე */}
                        {__("client.forgotpass_text", sharedData)}
                    </p>
                    <form onSubmit={handleSubmit}>
                        <input
                            className="mb-10"
                            type="text"
                            id="email"
                            name="email"
                            placeholder={__("client.forgotpass_email", sharedData)}
                            value={values.email}
                            onChange={handleChange}
                            required
                        />

                        <CommonButton
                            text={__("client.forgotpass_resetpassbtn", sharedData)}
                        />
                        {/* {status ? <p>success</p> : ""} */}
                        {/* {email ? <p>error</p> : ""} */}
                    </form>
                    <div
                        className={`absolute left-0 top-0 w-full text-center py-20 px-10 bg-custom-slate-300 transition-all duration-500  ${
                            status
                                ? "translate-y-0 opacity-100 visible"
                                : "translate-y-full opacity-0 invisible"
                        }`}
                    >
                        <button
                            onClick={() => setSuccess(!success)}
                            className="absolute top-3 right-3"
                        >
                            <IoCloseOutline className="w-6 h-6" />
                        </button>
                        <div className="text-lg mb-6 bold">
                            ბმული გამოგზავნილია მითითებულ ელ.ფოსტაზე
                        </div>
                        <img
                            className="mx-auto w-16"
                            src="/assets/images/icons/other/checked.png"
                            alt=""
                        />
                    </div>
                    {err != null ? <p className="mt-4 text-red-200">მომხმარებელი ამ მეილით არ არსებობს !</p> : ""}
                </div>
            </div>
        </Layout>
    );
};

export default ForgotPassword;
