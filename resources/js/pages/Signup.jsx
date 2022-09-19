import { CommonButton } from "../components/Shared";
// import AbsImage from "../assets/images/abs/1.png";
import { Link } from "react-router-dom";
// import Google from "../assets/images/icons/sm/google.png";
// import Facebook from "../assets/images/icons/sm/facebook.png";

const Signup = () => {
  return (
    <div className="py-20 lg:pt-40 pt-32 wrapper relative text-center min-h-screen">
      <div className="max-w-md mx-auto">
        <div className="text-lg mb-6 bold">რეგისტრაცია</div>
        <input className="mb-3" type="text" placeholder="სახელი" />
        <input className="mb-3" type="text" placeholder="გვარი" />
        <input className="mb-3" type="text" placeholder="ელ. ფოსტა" />
        <input className="mb-3" type="text" placeholder="მობილურის ნომერი" />
        <input className="mb-3" type="password" placeholder="პაროლი" />
        <input className="mb-8" type="password" placeholder="პაროლი" />
        <CommonButton text="რეგისტრაცია" />
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
        უკვე გაქვს ანგარიში?{" "}
        <Link
          to="/login"
          className="underline whitespace-nowrap"
          style={{ color: "#4A7AFF" }}
        >
          გაიარე ავტორიზაცია
        </Link>{" "}
      </p>

      <img
        className="absolute bottom-0 right-0 2xl:w-auto w-1/3 md:block hidden"
        src={"/assets/images/abs/1.png"}
        alt=""
      />
    </div>
  );
};

export default Signup;
