import { Inertia } from '@inertiajs/inertia'
import React, { useState } from 'react'
import { CommonButton } from "../components/Shared";
// import AbsImage from "../assets/images/abs/2.png";
import Layout from "../Layouts/Layout";
import { Link, usePage } from "@inertiajs/inertia-react";
// import Google from "../assets/images/icons/sm/google.png";
// import Facebook from "../assets/images/icons/sm/facebook.png";

const ForgotPassword = ({seo, email, status}) => {
    const renderHTML = (rawHTML) =>
    React.createElement("div", {
        dangerouslySetInnerHTML: { __html: rawHTML },
    });
    const sharedData = usePage().props.localizations;
    const [values, setValues] = useState({
        email: "",
      })
      function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
      }
      function handleSubmit(e) {
        e.preventDefault()
        Inertia.post(route("password.email"), values)
      }

  return (
    <Layout seo={seo}>
    <div className="py-20 lg:pt-40 pt-32 wrapper relative text-center min-h-screen">
      <div className="max-w-md mx-auto">
        <div className="text-lg mb-2 bold">
            {/* პაროლის აღდგენა */}
            {__("client.forgotpass_recoverpass", sharedData)}
            </div>
        <p className="opacity-50 mb-6">
          {/* მიიღე პაროლის აღსადგენი ბმული ელფოსტაზე */}
          {__("client.forgotpass_text", sharedData)}
        </p>
        <form onSubmit={handleSubmit}>
        <input className="mb-10" type="text" id="email" name="email"  placeholder={__("client.forgotpass_email", sharedData)} value={values.email} onChange={handleChange}/>

        <CommonButton text={__("client.forgotpass_resetpassbtn", sharedData)} />
        {
            status? <p>success</p> : ""
        }
        {
            email ? <p>error</p> : ""
         }
        </form>
        {/* <div className="mt-10">
          <div className="opacity-30 relative text-center ">
            <div className="h-px w-full bg-black absolute left-0 top-1/2 -translate-y-1/2"></div>
            <span className="bg-white  px-3 relative"> ან გამოიყენე</span>
          </div>
        </div>
        <div className="flex items-center justify-center py-6 pb-10">
          <a href="#" className="mx-4">
            <img src={"/assets/images/icons/sm/google.png"} alt="" />
          </a>
          <a href="#" className="mx-4">
            <img src={"/assets/images/icons/sm/facebook.png"} alt="" />
          </a>
        </div> */}
      </div>
    </div>
    </Layout>
  );
};

export default ForgotPassword;
