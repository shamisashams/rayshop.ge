// import UserImg from "../assets/images/icons/user.png";
import { CommonButton } from "../components/Shared";
import { BsPlusCircle, BsEye } from "react-icons/bs";
import Layout from "../Layouts/Layout";
import { Link, usePage } from "@inertiajs/inertia-react";
import { Inertia } from '@inertiajs/inertia'
import React, { useState } from 'react'

const Account = ({seo}) => {
  const [displayPassword, setDisplayPassword] = useState(false);
  const {user,flash} = usePage().props;


  const [values, setValues] = useState({
    name: user.name,
    surname: user.surname,
    email: user.email,
    phone: user.phone,
    address: user.address,
    password: "",
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
    Inertia.post(route("client.updateuser"), values)
  }
  return (
    <Layout seo={seo}>
    <div className="relative bg-custom-slate-300">
      <div className="md:block hidden absolute bg-white w-1/5 h-full left-0 top-0"></div>
      <div className="wrapper flex min-h-screen relative items-center flex-col md:flex-row">
        <div className="self-stretch bg-white flex flex-col items-center justify-center md:pr-10 md:mr-5 pt-32 pb-10 md:pb-0 md:pt-0">
          <div className="w-14 h-14 rounded-full overflow-hidden md:mb-10 mb-5">
            <img src={"/assets/images/icons/user.png"} alt="" />
          </div>
          <div className="opacity-50 mb-3">პირადი კაბინეტი</div>
          <div className="bold text-2xl">
            {/* სახელი გვარი */}
{user.name + " " + user.surname}
            </div>
          <div className="md:mb-20 mb-6"></div>
          <CommonButton text="სისტემიდან გასვლა" />
        </div>
        <div className="md:w-2/3 mt-10  md:mt-0 pb-20 md:pb-0">
          <div className="max-w-md  m-auto text-center">
            <form onSubmit={handleSubmit}>
            <div className="bold text-2xl mb-10">პირადი ინფორმაცია</div>
            <input className="bg-white mb-5" id="name" type="text" placeholder="სახელი" value={values.name} onChange={handleChange} required />
            <input className="bg-white mb-5" id="surname" type="text" placeholder="გვარი" value={values.surname} onChange={handleChange} required/>
            <input className="bg-white mb-5" id="email" type="email" placeholder="იმეილი" value={values.email} onChange={handleChange}  required/>
            <input
            id="phone"
              className="bg-white mb-5"
              type="text"
              placeholder="მობილურის ნომერი"
              value={values.phone} onChange={handleChange}
            />
            <input id="address" name="address" className="bg-white mb-5" type="text" placeholder="მისამართი" value={values.address} onChange={handleChange}/>
            <div className="relative w-full h-fit mb-10 ">
              <input
              value={values.password} onChange={handleChange}
              id="password"
            //   required
                className="bg-white"
                type={displayPassword ? "text" : "password"}
                placeholder="ახალი პაროლი"
              />
              <button
                onClick={() => setDisplayPassword(!displayPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2"
              >
                <BsEye className="w-5 h-5" />
              </button>
            </div>
            <button className="bold text-custom-blue">
              <BsPlusCircle className="inline-block w-5 h-5 mr-2" />
              ცვლილებების შენახვა
            </button>

            {flash? <p className="alert alert-success">შეიცვალა!</p>: ""}

            </form>
          </div>
        </div>
      </div>
    </div>
</Layout>
  );
};

export default Account;
