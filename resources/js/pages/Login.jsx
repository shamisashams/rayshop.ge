import React, {useState} from "react";
import { Inertia } from '@inertiajs/inertia'
import { CommonButton } from "../components/Shared";
import Layout from "../Layouts/Layout";
import { Link, usePage,useForm } from "@inertiajs/inertia-react";


const Login = ({seo,error}) => {
    const renderHTML = (rawHTML) =>
    React.createElement("div", {
        dangerouslySetInnerHTML: { __html: rawHTML },
    });
const sharedData = usePage().props.localizations;
    const { data, setData, post, processing, errors } = useForm({

        email: '',
        password: null,
        remember: false,
    })

    function submit(e) {
        // alert('asdas')
        e.preventDefault()
        post(route("client.login"))
    }


  return (
    <Layout seo={seo}>
    <div className="py-20 lg:pt-40 pt-32 wrapper relative text-center min-h-screen">
      <div className="max-w-md mx-auto">
        <div className="text-lg mb-6 bold">{__("client.signin_login", sharedData)}</div>
        <form onSubmit={submit}>

        <input
name="email"
value={data.email} onChange={e => setData('email', e.target.value)}
        className="mb-3" type="text" placeholder={__("client.signin_email", sharedData)} />
        <input
        name="password"
        value={data.password} onChange={e => setData('password', e.target.value)}
        className="mb-5" type="password" placeholder={__("client.signin_password", sharedData)} />
        <div className="flex justify-between mb-8">
          <div className="flex items-center justify-start">
            <input
            value={data.remember} onChange={e => setData('remember', !data.remember)}
            type="checkbox"
            id="rememberme" />

            <label htmlFor="rememberme">
              {" "}
              <div></div>
            </label>
            <label htmlFor="rememberme" className="ml-2 opacity-50">
              {__("client.signin_remember", sharedData)}
            </label>
          </div>
          <Link className="underline opacity-50" href={route("password.request")}>
          {__("client.signin_password_recovery", sharedData)}
          </Link>
        </div>
        <CommonButton text={__("client.signin_loginbtn", sharedData)} />


        {error &&
                            <h2 className="alert alert-danger">
                                {/* {error} */}
                                {__("client.signin_error", sharedData)}
                            </h2>
                        }

        </form>
        <div className="mt-10">
          <div className="opacity-30 relative text-center ">
            <div className="h-px w-full bg-black absolute left-0 top-1/2 -translate-y-1/2"></div>
            <span className="bg-white  px-3 relative"> {__("client.signup_oruse", sharedData)}</span>
          </div>
        </div>
        <div className="flex items-center justify-center py-6 pb-10">
          <a href={route("google-redirect")} className="mx-4">
            <img src={"/assets/images/icons/sm/google.png"} alt="" />
          </a>
          <a href={route("fb-redirect")} className="mx-4">
            <img src={"/assets/images/icons/sm/facebook.png"} alt="" />
          </a>
        </div>
      </div>
      <p>
      {__("client.signin_registered", sharedData)}{" "}
        <Link
          href={route("client.registration.index")}
          className="underline whitespace-nowrap"
          style={{ color: "#4A7AFF" }}
        >
          {__("client.signin_register", sharedData)}
        </Link>{" "}
      </p>

      <img
        className="absolute bottom-0 left   -0 2xl:w-auto w-1/3 md:block hidden -z-10"
        src={"/assets/images/abs/2.png"}
        alt=""
      />
    </div>
    </Layout>
  );
};

export default Login;
