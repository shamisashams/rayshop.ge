import { CommonButton } from "../components/Shared";
// import AbsImage from "../assets/images/abs/2.png";
import { Link } from "react-router-dom";
// import Google from "../assets/images/icons/sm/google.png";
// import Facebook from "../assets/images/icons/sm/facebook.png";

const Login = () => {
  return (
    <div className="py-20 lg:pt-40 pt-32 wrapper relative text-center min-h-screen">
      <div className="max-w-md mx-auto">
        <div className="text-lg mb-6 bold">სისტემაში შესვლა</div>
        <input className="mb-3" type="text" placeholder="ელ. ფოსტა" />
        <input className="mb-5" type="password" placeholder="პაროლი" />
        <div className="flex justify-between mb-8">
          <div className="flex items-center justify-start">
            <input type="checkbox" id="rememberme" />
            <label htmlFor="rememberme">
              {" "}
              <div></div>
            </label>
            <label htmlFor="rememberme" className="ml-2 opacity-50">
              დამიმახსოვრე
            </label>
          </div>
          <Link className="underline opacity-50" to="/forgot-password">
            პაროლის აღდგენა
          </Link>
        </div>
        <CommonButton text="სისტემაში შესვლა" />
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
          to="/login"
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
  );
};

export default Login;
