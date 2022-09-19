import { CartItem, CommonButton } from "../components/Shared";
// import Img1 from "../assets/images/products/3.png";
// import Img2 from "../assets/images/products/4.png";
import { IoMdArrowDropdown } from "react-icons/io";
// import Bank1 from "../assets/images/icons/banks/1.png";
// import Bank2 from "../assets/images/icons/banks/2.png";
// import Bank3 from "../assets/images/icons/banks/3.png";
import { useRef } from "react";

const Payment = () => {
  const itemsInCart = [
    {
      img: "/assets/images/products/3.png",
      name: "დასახელება",
      price: "31.90",
      size: "m",
    },
    {
      img: "/assets/images/products/4.png",
      name: "დხეასა ხეასა ლეddბა",
      price: "310",
      size: "m",
    },
  ];
  return (
    <div className="relative paymentPage">
      <div className="lg:block hidden absolute bg-custom-slate-300 w-1/5 h-full right-0 top-0"></div>
      <div className="flex items-center justify-between wrapper min-h-screen flex-col-reverse lg:flex-row">
        <div className="lg:w-2/3 lg:mt-32 mt-20">
          <div className="max-w-md mx-auto">
            <div className="mb-3 w-full h-fit relative">
              <div className="absolute top-1/2 -translate-y-1/2 right-2 z-20">
                <IoMdArrowDropdown className=" w-5 h-5" />
              </div>

              <select className="relative">
                <option value="0">აირჩიე ქალაქი</option>
                <option value="1"> ქალ აი რჩიეაქი</option>
                <option value="2">იე ქალაქიაირჩ</option>
                <option value="3">აი ლაიქ</option>
              </select>
            </div>

            <input
              className="mb-3 placeholder:opacity-50"
              type="text"
              placeholder="შეიყვანე მისამართი"
            />
            <input
              className="mb-3 placeholder:opacity-50"
              type="text"
              placeholder="საკონტაქტო ტელეფონი"
            />
            <div className="mt-10">
              <div className="bold text-lg">ბარათის დეტალები</div>
              <div className="flex items-center justify-between my-4">
                <div>შეგიძლია გამოიყენო</div>
                <div className="flex">
                  <img className="mr-1" src={"/assets/images/icons/banks/1.png"} alt="" />
                  <img className="mr-1" src={"/assets/images/icons/banks/2.png"} alt="" />
                  <img className="mr-1" src={"/assets/images/icons/banks/3.png"} alt="" />
                </div>
              </div>
              <input
                className="placeholder:opacity-50 mb-3"
                type="tel"
                inputmode="numeric"
                pattern="[0-9\s]{13,19}"
                autocomplete="cc-number"
                maxlength="19"
                placeholder="ბარათის ნომერი"
              ></input>

              <input
                type="text"
                placeholder="სახელი ბარათზე"
                className="placeholder:opacity-50 mb-3"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  className="placeholder:opacity-50"
                  maxlength="7"
                  name="credit-expires"
                  pattern="\d*"
                  placeholder="MM / YY"
                  type="tel"
                />
                <input
                  className="placeholder:opacity-50"
                  maxlength="4"
                  name="credit-cvc"
                  pattern="\d*"
                  placeholder="CVC"
                  type="tel"
                />
              </div>
              <div className="text-center mt-10">
                <CommonButton text="გადახდა" width="245px" />
              </div>
            </div>
          </div>
        </div>
        <div className="lg:bg-custom-slate-300  self-stretch pt-32 lg:pl-10 relative flex items-center justify-center flex-col lg:ml-5">
          <div className="mb-20 itemsInCart">
            {itemsInCart.map((item, index) => {
              return <CartItem key={index} data={item} index={index} />;
            })}
          </div>
          <div className="flex w-full justify-between items-center mb-3">
            <div className="opacity-50">რაოდენობა:</div>
            <div className="bold">2</div>
          </div>
          <div className="flex w-full justify-between items-center mb-3 bold">
            <span>პროდუქტის ფასი:</span>
            <span>₾ 155.00</span>
          </div>
          <div className="flex w-full justify-between items-center mb-6 bold">
            <span>მიწოდება:</span>
            <span>₾ 23.00</span>
          </div>
          <div className="flex w-full justify-between items-center  bold">
            <span>ჯამი:</span>
            <span className="text-xl text-custom-orange"> ₾ 178.00</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
