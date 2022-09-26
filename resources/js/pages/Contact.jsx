// import AbsImage1 from "../assets/images/abs/5.png";
import React, { useState } from 'react'
import { Inertia } from '@inertiajs/inertia'
import { CommonButton, SocialMedia } from "../components/Shared";
import Layout from "../Layouts/Layout";
import { Link, usePage } from "@inertiajs/inertia-react";

const Contact = ({seo}) => {
    const renderHTML = (rawHTML) =>
    React.createElement("div", {
        dangerouslySetInnerHTML: { __html: rawHTML },
    });
  const sharedData = usePage().props.localizations;

    const { errors, gphone, gemail, gaddress, gfacebook, ginstagram } = usePage().props;
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
          <div className="opacity-80 font-bold mb-3">
            {/* მისამართი */}
            {__("client.contact_address", sharedData)}
            </div>
          <div className="bold lg:text-xl  mb-8">
            {gaddress.value}
          </div>
          <div className="opacity-80 font-bold mb-3">
            {/* ტელეფონის ნომერი */}
            {__("client.contact_phone", sharedData)}
            </div>
          <div className="bold lg:text-xl  mb-8">{gphone.value}</div>
          <div className="opacity-80 font-bold mb-3">
            {/* ელ-ფოსტა */}
            {__("client.contact_email", sharedData)}
            </div>
          <div className="bold lg:text-xl  mb-8">{gemail.value}</div>
          <div className="absolute left-0 bottom-10">
            <SocialMedia />
          </div>
        </div>
        <div className="2xl:mr-20">
          <form className="xl:max-w-md max-w-sm mx-auto text-center " onSubmit={handleSubmit}>
            <div className="gadzen 2xl:text-7xl lg:text-5xl sm:text-4xl text-3xl mb-12 text-custom-blue w-fit mx-auto text-left">
              <span className="bold sm:text-lg text-sm text-black ">
                {/* გაქვს კითხვები? */}
                {__("client.form_anyquestions", sharedData)}
              </span>{" "}
              <br />
              {/* დაგვიკავშირდი */}
              {__("client.form_contact", sharedData)}
            </div>
            <input className="mb-3" id="name" type="text" placeholder={__("client.form_name",sharedData)} value={values.name} onChange={handleChange}/>
            <input className="mb-3" id="surname" type="text" placeholder={__("client.form_surname",sharedData)} value={values.surname} onChange={handleChange} />
            <input
            id="phone"
              className="mb-3"
              type="text"
              placeholder={__("client.form_phone",sharedData)}
              value={values.phone} onChange={handleChange}
            />
            <input id="email" className="mb-3" type="text" placeholder={__("client.form_email",sharedData)} value={values.email} onChange={handleChange}/>
            <textarea id="message" className="mb-8" placeholder={__("client.form_message",sharedData)} value={values.message} onChange={handleChange}></textarea>
            <CommonButton text={__("client.form_sendBtn",sharedData)} />
          </form>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Contact;
