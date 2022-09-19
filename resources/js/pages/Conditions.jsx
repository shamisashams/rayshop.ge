import React from "react";
import Form from "../components/Form";
import Layout from "../Layouts/Layout";
// import Arrow from "../assets/images/icons/fastdown.png";

const Conditions = ({seo}) => {
  return (
    <Layout seo={seo}>
    <div className="wrapper py-40">
      <div className="bold text-lg mb-2">გაეცანი</div>
      <div className="gadzen 2xl:text-7xl lg:text-5xl sm:text-4xl text-3xl lg:mb-12 mb-3 text-custom-orange">
        წესები და პირობები
      </div>
      <p className="mb-6">გადახდის მეთოდები:</p>
      <p className="mb-6">
        გადახდა შესაძლებელია ნებისმიერი ბანკის ბარათით. (გარდა American
        Express-ისა)
      </p>
      <p className="mb-6">ნივთის გაცვლა ან დაბრუნება:</p>
      <p className="mb-6">
        მონაცემთა დაცვის პოლიტიკა: <br /> როგორ ვაგროვებთ და ვიყენებთ პერსონალურ
        მონაცემებს
      </p>
      <p className="mb-6">
        “პერსონალური მონაცემები” ნიშნავს ინფორმაციას, რომელიც დაკავშირებულია
        ფიზიკურ/კერძო პირთან ან რომელიც გამოიყენება ასეთი პირის
        იდენტიფიკაციისთვის; მაგალითად, თქვენი სახელი, საცხოვრებელი მისამართი,
        ტელეფონის ნომერი, ელ–ფოსტის მისამართი და ნებისმიერი სხვა ინფორმაცია,
        რომელსაც ჩვენ დავურთავთ აღნიშნულ ელემენტებს. პერსონალური მონაცემები არ
        მოიცავს „შეჯამებულ“ ან „დეიდენტიფიცირებულ“ ინფორმაციას, რომელიც არ
        ახდენს პირის იდენტიფიკაციას.
      </p>
      <p className="mb-6">
        როდესაც თქვენ სარგებლობთ ჩვენი სერვისებით, ჩვენ ვაგროვებთ და ვიღებთ
        შემდეგი ტიპის მონაცემებს:
      </p>
      <p className="mb-6">თქვენს მიერ მოწოდებული მონაცემები</p>
      <div className="py-10 text-center bold text-custom-blue text-xl">
        მაჩვენე მეტი <br />
        <img className="mx-auto mt-4" src={"/assets/images/icons/fastdown.png"} alt="" />
      </div>
      <div className="mt-10">
        <Form />
      </div>
    </div>
    </Layout>
  );
};

export default Conditions;
