import React from "react";
import { CommonButton } from "./Shared";

const Form = () => {
  return (
    <form className="text-center max-w-3xl mx-auto mb-10">
      <div className="gadzen 2xl:text-7xl lg:text-5xl sm:text-4xl text-3xl mb-12 text-custom-blue w-fit mx-auto text-left">
        <span className="bold sm:text-lg text-sm text-black ">
          გაქვს კითხვები?
        </span>{" "}
        <br />
        დაგვიკავშირდი
      </div>
      <div className="grid sm:grid-cols-2 sm:gap-5 gap-2 sm:mb-5 mb-2 ">
        <input type="text" placeholder="სახელი" />
        <input type="text" placeholder="გვარი" />
        <input type="text" placeholder="მობილურის ნომერი" />
        <input type="text" placeholder="იმეილი" />
      </div>
      <textarea className="mb-8" placeholder="შეტყობინება"></textarea>
      <CommonButton text="გაგზავნა" />
    </form>
  );
};

export default Form;
