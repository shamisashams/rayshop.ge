// import UserImg from "../assets/images/icons/user.png";
import React from "react";
import { CommonButton } from "../components/Shared";
import { BsPlusCircle, BsEye } from "react-icons/bs";
import { useState } from "react";
import Layout from "../Layouts/Layout";
import { Link, usePage } from "@inertiajs/inertia-react";

const Account = ({seo}) => {
  const [displayPassword, setDisplayPassword] = useState(false);
  const {user} = usePage().props;

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
          <div className="bold text-2xl">სახელი გვარი</div>
          <div className="md:mb-20 mb-6"></div>
          <CommonButton text="სისტემიდან გასვლა" />
        </div>
        <div className="md:w-2/3 mt-10  md:mt-0 pb-20 md:pb-0">
          <div className="max-w-md  m-auto text-center">
            <div className="bold text-2xl mb-10">პირადი ინფორმაცია</div>
            <input className="bg-white mb-5" type="text" placeholder="სახელი" value={user.name} />
            <input className="bg-white mb-5" type="text" placeholder="გვარი" value={user.surname} />
            <input className="bg-white mb-5" type="text" placeholder="იმეილი"  value={user.email}/>
            <input
            value={user.phone}
              className="bg-white mb-5"
              type="text"
              placeholder="მობილურის ნომერი"
            />
            <input
              className="bg-white mb-5"
              type="text"
              placeholder="მისამართი"
            />
            <div className="relative w-full h-fit mb-10 ">
              <input
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
          </div>
        </div>
      </div>
    </div>
</Layout>
  );
};

export default Account;
