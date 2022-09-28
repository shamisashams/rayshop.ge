import React from "react";
import Form from "../components/Form";
import Layout from "../Layouts/Layout";
import { Link, usePage } from "@inertiajs/inertia-react";

const Conditions = ({seo}) => {
    const renderHTML = (rawHTML) =>
    React.createElement("div", {
        dangerouslySetInnerHTML: { __html: rawHTML },
    });
  const sharedData = usePage().props.localizations;
  return (
    <Layout seo={seo}>
    <div className="wrapper py-40">
      <div className="bold text-lg mb-2">
        {/* გაეცანი */}
        {__("client.conditions_knowmore", sharedData)}
        </div>
      <div className="gadzen 2xl:text-7xl lg:text-5xl sm:text-4xl text-3xl lg:mb-12 mb-3 text-custom-orange">
        {/* წესები და პირობები */}
        {__("client.conditions_rulesandconditions", sharedData)}
      </div>
      <p className="mb-6">
        {/* გადახდის მეთოდები: */}
        {__("client.conditions_payment", sharedData)}
        </p>
      <p className="mb-6">
        {/* გადახდა შესაძლებელია ნებისმიერი ბანკის ბარათით. (გარდა American
        Express-ისა) */}
                {__("client.conditions_title1", sharedData)}
      </p>
      <p className="mb-6">
        {/* ნივთის გაცვლა ან დაბრუნება: */}
        {__("client.conditions_returnitem", sharedData)}
        </p>
      <p className="mb-6">
        {/* მონაცემთა დაცვის პოლიტიკა: <br /> როგორ ვაგროვებთ და ვიყენებთ პერსონალურ
        მონაცემებს */}
                {__("client.conditions_privacy_politics", sharedData)}
      </p>
      <p className="mb-6">
        {/* “პერსონალური მონაცემები” ნიშნავს ინფორმაციას, რომელიც დაკავშირებულია
        ფიზიკურ/კერძო პირთან ან რომელიც გამოიყენება ასეთი პირის
        იდენტიფიკაციისთვის; მაგალითად, თქვენი სახელი, საცხოვრებელი მისამართი,
        ტელეფონის ნომერი, ელ–ფოსტის მისამართი და ნებისმიერი სხვა ინფორმაცია,
        რომელსაც ჩვენ დავურთავთ აღნიშნულ ელემენტებს. პერსონალური მონაცემები არ
        მოიცავს „შეჯამებულ“ ან „დეიდენტიფიცირებულ“ ინფორმაციას, რომელიც არ
        ახდენს პირის იდენტიფიკაციას. */}
        {renderHTML(
                                __("client.conditions_text", sharedData).replace(
                                    /(?:\r\n|\r|\n)/g,
                                    "<br>"
                                )
                            )}
      </p>
      {/* <p className="mb-6">
        როდესაც თქვენ სარგებლობთ ჩვენი სერვისებით, ჩვენ ვაგროვებთ და ვიღებთ
        შემდეგი ტიპის მონაცემებს:
      </p>
      <p className="mb-6">თქვენს მიერ მოწოდებული მონაცემები</p> */}

      <div className="mt-10">
        <Form />
      </div>
    </div>
    </Layout>
  );
};

export default Conditions;
