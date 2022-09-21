// import AbsImage1 from "../assets/images/abs/5.png";
import React, { useState } from 'react'
import { Inertia } from '@inertiajs/inertia'
import { CommonButton, SocialMedia } from "../components/Shared";
import Layout from "../Layouts/Layout";

const Contact = ({seo}) => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        phone: "",
        surname: "",
        message: "",
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
        Inertia.post(route("client.contact.mail"), values)
      }
  return (
    <Layout seo={seo}>
    <div className="relative">
      <div className="h-full w-1/2 bg-custom-slate-300 absolute left-0 top-0"></div>
      <img
        className="xl:w-auto w-1/2 absolute left-1/2 bottom-0 -translate-x-1/2 hidden lg:block"
        src={"/assets/images/abs/5.png"}
        alt=""
      />
      <div className="relative wrapper flex justify-between items-center min-h-screen lg:pt-20 pt-32 pb-40 lg:pb-20 flex-col lg:flex-row">
        <div className="lg:w-auto w-full mb-10 lg:mb-0">
          <div className="opacity-80 font-bold mb-3">მისამართი</div>
          <div className="bold lg:text-xl  mb-8">
            ქუჩის დასახელება #212, თბილისი.
          </div>
          <div className="opacity-80 font-bold mb-3">ტელეფონის ნომერი</div>
          <div className="bold lg:text-xl  mb-8">+995 032 2 00 00 00</div>
          <div className="opacity-80 font-bold mb-3">ელ-ფოსტა</div>
          <div className="bold lg:text-xl  mb-8">example@mail.com</div>
          <div className="absolute left-0 bottom-10">
            <SocialMedia />
          </div>
        </div>
        <div className="2xl:mr-20">
          <form className="xl:max-w-md max-w-sm mx-auto text-center " onSubmit={handleSubmit}>
            <div className="gadzen 2xl:text-7xl lg:text-5xl sm:text-4xl text-3xl mb-12 text-custom-blue w-fit mx-auto text-left">
              <span className="bold sm:text-lg text-sm text-black ">
                გაქვს კითხვები?
              </span>{" "}
              <br />
              დაგვიკავშირდი
            </div>
            <input className="mb-3" id="name" type="text" placeholder="სახელი" value={values.name} onChange={handleChange}/>
            <input className="mb-3" id="surname" type="text" placeholder="გვარი" value={values.surname} onChange={handleChange} />
            <input
            id="phone"
              className="mb-3"
              type="text"
              placeholder="მობილურის ნომერი"
              value={values.phone} onChange={handleChange}
            />
            <input id="email" className="mb-3" type="text" placeholder="იმეილი"  value={values.email} onChange={handleChange}/>
            <textarea id="message" className="mb-8" placeholder="შეტყობინება" value={values.message} onChange={handleChange}></textarea>
            <CommonButton text="გაგზავნა" />
          </form>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Contact;
