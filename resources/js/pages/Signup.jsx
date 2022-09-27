import React, {useState} from "react";
import { CommonButton } from "../components/Shared";
// import AbsImage from "../assets/images/abs/1.png";
// import { Link } from "react-router-dom";
import Layout from "../Layouts/Layout";
import { Link, usePage } from "@inertiajs/inertia-react";

import {Inertia} from "@inertiajs/inertia";
// import Google from "../assets/images/icons/sm/google.png";
// import Facebook from "../assets/images/icons/sm/facebook.png";

const Signup = ({seo}) => {

    const renderHTML = (rawHTML) =>
    React.createElement("div", {
        dangerouslySetInnerHTML: { __html: rawHTML },
    });
const sharedData = usePage().props.localizations;

    const {errors,localizations} = usePage().props
    const [values, setValues] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        password_repeat: "",
        phone: "",
        // agree: false
    })

    function handleChange(e) {
        const key = e.target.name;
        let value = e.target.value
        if(e.target.name === 'agree'){
            value = e.target.checked ? true : false
        }
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        Inertia.post(route('client.register'), values)
    }


    return (
    <Layout seo={seo}>
    <div className="py-20 lg:pt-40 pt-32 wrapper relative text-center min-h-screen">
      <div className="max-w-md mx-auto">
        <form onSubmit={handleSubmit}>
        <div className="text-lg mb-6 bold">{__("client.signup_register", sharedData)}</div>
        <input onChange={handleChange} name="name" className={errors.name? "mb-3 bg-red-200":"mb-3"} type="text" placeholder={__("client.signup_name", sharedData)} />
        <input onChange={handleChange} name="surname" className={errors.surname? "mb-3 bg-red-200":"mb-3"} type="text" placeholder={__("client.signup_surname", sharedData)} />
        <input onChange={handleChange} name="email"  className={errors.email? "mb-3 bg-red-200":"mb-3"} type="email" placeholder={__("client.signup_email", sharedData)} />
        <input onChange={handleChange} name="phone" className={errors.phone? "mb-3 bg-red-200":"mb-3"} type="text" placeholder={__("client.signup_phone", sharedData)} />
        <input onChange={handleChange} name="password" className={errors.password? "mb-3 bg-red-200":"mb-3"} type="password" placeholder={__("client.signup_pass", sharedData)} />
        {/* {errors.password_repeat && <div>{errors.password_repeat}</div>} */}
        <input onChange={handleChange} name="password_repeat" className={errors.password_repeat? "mb-3 bg-red-200":"mb-3"} type="password" placeholder={__("client.signup_repeat_pass", sharedData)} />
        <CommonButton text={__("client.register", sharedData)} />

        </form>
        <div className="mt-10">
          <div className="opacity-30 relative text-center ">
            <div className="h-px w-full bg-black absolute left-0 top-1/2 -translate-y-1/2"></div>
            <span className="bg-white  px-3 relative"> {__("client.signup_oruse", sharedData)}</span>
          </div>
        </div>
        <div className="flex items-center justify-center py-6 pb-10">
          <a href="#" className="mx-4">
            <img src={"/assets/images/icons/sm/google.png"} alt="" />
          </a>
          <a href="#" className="mx-4">
            <img src={"/assets/images/icons/sm/facebook.png"} alt="" />
          </a>
        </div>
      </div>
      <p>
      {__("client.signup_already_registered", sharedData)}{" "}
        <Link
          href={route("client.login.index")}
          className="underline whitespace-nowrap"
          style={{ color: "#4A7AFF" }}
        >
          {__("client.login", sharedData)}
        </Link>{" "}
      </p>

      <img
        className="absolute bottom-0 right-0 2xl:w-auto w-1/3 md:block hidden"
        src={"/assets/images/abs/1.png"}
        alt=""
      />
    </div>
    </Layout>
  );
};

export default Signup;
