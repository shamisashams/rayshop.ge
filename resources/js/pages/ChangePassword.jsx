import React, {useState} from "react";
import { Inertia } from '@inertiajs/inertia'
import { CommonButton } from "../components/Shared";
// import AbsImage from "../assets/images/abs/2.png";
// import { Link } from "react-router-dom";
// import Google from "../assets/images/icons/sm/google.png";
// import Facebook from "../assets/images/icons/sm/facebook.png";
import Layout from "../Layouts/Layout";
import { Link, usePage,useForm } from "@inertiajs/inertia-react";


const ChangePassword = ({seo,error, token}) => {

    const { data, setData, post, processing, errors } = useForm({

        email: '',
        password: null,
        // remember: false,
        token: token,
    })

    function submit(e) {
        // alert('asdas')
        e.preventDefault()
        post(route("password.update"))
    }


    // function handleChange(e) {
    //     const key = e.target.name;
    //     const value = e.target.value
    //     setValues(values => ({
    //         ...values,
    //         [key]: value,
    //     }))
    // }

    // function handleSubmit(e) {
    //     e.preventDefault()
    //     Inertia.post(route('client.login'), values)
    // }


  return (
    <Layout seo={seo}>
    <div className="py-20 lg:pt-40 pt-32 wrapper relative text-center min-h-screen">
      <div className="max-w-md mx-auto">
        <div className="text-lg mb-6 bold">სისტემაში შესვლა</div>
        <form onSubmit={submit}>

        <input
name="email"
value={data.email} onChange={e => setData('email', e.target.value)}
        className="mb-3" type="text" placeholder="ელ. ფოსტა" />
        <input
        name="password"
        value={data.password} onChange={e => setData('password', e.target.value)}
        className="mb-5" type="password" placeholder="პაროლი" />
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
              დამიმახსოვრე
            </label>
          </div>
          <Link className="underline opacity-50" href={route("password.request")}>
            პაროლის აღდგენა
          </Link>
        </div>
        <CommonButton text="სისტემაში შესვლა" />


        {error &&
                            <h2 className="alert alert-danger">
                                {error}
                            </h2>
                        }

        </form>
        <div className="mt-10">
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
        </div>
      </div>
      <p>
        ჯერ არ ხარ მომხმარებელი?{" "}
        <Link
          href={route("client.registration.index")}
          className="underline whitespace-nowrap"
          style={{ color: "#4A7AFF" }}
        >
          გაიარე რეგისტრაცია
        </Link>{" "}
      </p>

      <img
        className="absolute bottom-0 left   -0 2xl:w-auto w-1/3 md:block hidden"
        src={"/assets/images/abs/2.png"}
        alt=""
      />
    </div>
    </Layout>
  );
};

export default ChangePassword;
