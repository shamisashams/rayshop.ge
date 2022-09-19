import { CommonButton } from "../components/Shared";
// import AbsImage from "../assets/images/abs/2.png";
import { Link } from "react-router-dom";
// import Google from "../assets/images/icons/sm/google.png";
// import Facebook from "../assets/images/icons/sm/facebook.png";

const ForgotPassword = () => {
  return (
    <div className="py-20 lg:pt-40 pt-32 wrapper relative text-center min-h-screen">
      <div className="max-w-md mx-auto">
        <div className="text-lg mb-2 bold">პაროლის აღდგენა</div>
        <p className="opacity-50 mb-6">
          მიიღე პაროლის აღსადგენი ბმული ელფოსტაზე
        </p>
        <input className="mb-10" type="text" placeholder="ელ. ფოსტა" />

        <CommonButton text="მოითხოვე ბმული" />
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
    </div>
  );
};

export default ForgotPassword;
