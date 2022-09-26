import React from "react";
import { CommonButton } from "./Shared";
import { Link, usePage } from "@inertiajs/inertia-react";

const Form = () => {
    const renderHTML = (rawHTML) =>
    React.createElement("div", {
        dangerouslySetInnerHTML: { __html: rawHTML },
    });
    const sharedData = usePage().props.localizations;
  return (
    <form className="text-center max-w-3xl mx-auto mb-10">
      <div className="gadzen 2xl:text-7xl lg:text-5xl sm:text-4xl text-3xl mb-12 text-custom-blue w-fit mx-auto text-left">
        <span className="bold sm:text-lg text-sm text-black ">
          {/* გაქვს კითხვები? */}
          {__("client.form_anyquestions", sharedData)}
        </span>{" "}
        <br />
        {/* დაგვიკავშირდი */}
        {__("client.form_contact", sharedData)}
      </div>
      <div className="grid sm:grid-cols-2 sm:gap-5 gap-2 sm:mb-5 mb-2 ">
        <input type="text" placeholder={__("client.form_name",sharedData)} />
        <input type="text" placeholder={__("client.form_surname",sharedData)} />
        <input type="text" placeholder={__("client.form_phone",sharedData)} />
        <input type="text" placeholder={__("client.form_email",sharedData)} />
      </div>
      <textarea className="mb-8" placeholder={__("client.form_message",sharedData)}></textarea>
      <CommonButton text={__("client.form_sendBtn",sharedData)} />
    </form>
  );
};

export default Form;
