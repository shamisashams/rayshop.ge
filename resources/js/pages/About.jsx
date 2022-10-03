
import React from "react";
import Form from "../components/Form";
import Layout from "../Layouts/Layout";
import { Link, usePage } from "@inertiajs/inertia-react";

const About = ({seo}) => {
    const renderHTML = (rawHTML) =>
  React.createElement("div", {
      dangerouslySetInnerHTML: { __html: rawHTML },
  });
const sharedData = usePage().props.localizations;
  return (
    <Layout seo={seo}>
      <section className="relative">
        <img
          className="w-1/2 hidden md:block absolute top-0 right-0 -z-10"
          src={"/assets/images/abs/3.png"}
          alt=""
        />
        <img
          className="absolute bottom-40 left-0 -z-10 lg:block hidden "
          style={{ maxHeight: "1000px" }}
          src={"/assets/images/abs/4.png"}
          alt=""
        />
        <div className="wrapper md:pt-40 pt-32 lg:pb-20 pb-10">
          <div className="md:max-w-lg text-justify">
            <div className="bold text-lg mb-2">
                {/* გაიგე მეტი */}
                {__("client.about_knowmore", sharedData)}
                </div>
            <div className="gadzen 2xl:text-7xl lg:text-5xl sm:text-4xl text-3xl lg:mb-12 mb-3 text-custom-orange">
              {/* ჩვენ შესახებ */}
              {__("client.about_aboutus", sharedData)}
            </div>

            <p className="mb-5">
              {/* გპირდებით, რომ აქ, ჩვენს ონლაინ მაღაზიაში მუდმივად ვიზრუნებთ
              იმაზე, რომ შენთვის, შენი მეგობრისთვის ან თქვენი საერთო
              შეკრებებისთვის მუდმივად იპოვო პატარა თუ დიდი მაბედნიერებლები.
              დავიწყებთ ცხადია მცირედით და ასორტიმენტსაც მუდმივად გავზრდით,
              ოღონდ ამ ეტაპზე ამ მიმართულებით არ დაგასპოილერებთ. ხარისხი, რომ
              მნიშვნელოვანია ეს ჩვენც ვიცით, შესაბამისად არ გაგიცრუებთ იმედებსა
              თუ მოლოდინებს. */}
                 {renderHTML(
                                __("client.about_title1", sharedData).replace(
                                    /(?:\r\n|\r|\n)/g,
                                    "<br>"
                                )
                            )}
            </p>
          </div>
        </div>
        <div className="wrapper">
          <div className="lg:max-w-2xl mx-auto 2xl:mr-40 mr-0 text-justify lg:pl-5 mb-16">
            {/* <p className="mb-5">
              {" "}
              გაგვიხარდება თუ დაგვიმეგობრდები და იპოვი შენთვის სასურველ
              პროდუქტს, რომლის ონლაინ შეძენის შემთხვევაშიც, მაქსიმალურად სწრაფად
              მოგიტანთ მითითებულ მისამართზე, მთელი საქართველოს მასშტაბით.
            </p>
            <p className="mb-5">
              ვართ ღია და გვაქვს მუდმივი მზაობა მოვისმინოთ თქვენი სურვილები თუ
              კრიტიკა, რასაც გპირდებით, რომ გაგებით მოვეკიდებით და ვიპოვით მათი
              მოგვარების ყველაზე ეფექტურ გზებს.{" "}
            </p>
            <p className="mb-5">
              მადლობა, რომ გაგიჩნდა სურვილი წაგეკითხა ეს ინფორმაცია და იმედია
              ძალიან არ მოგაწყინეთ.{" "}
            </p>
            <p className="mb-5">
              სამუშაო საათების ფარგლებში (ორშაბათი-პარასკევი, 11:00-19:00) მზად
              ვართ გიპასუხოთ.{" "}
            </p> */}
            <p className="mb-5">
              {/* დაგვიმეგობრდი ჩვენს სოციალურ ქსელებშიც, სადაც ფასდაკლებებით,
              აქციებით და საინტერესო შემოთავაზებებით გაგანებივრებთ ან საჭიროების
              შემთხვევაში დაგვიკავშირდი ნომერზე (+995) 888 888 */}
                 {renderHTML(
                                __("client.about_title2", sharedData).replace(
                                    /(?:\r\n|\r|\n)/g,
                                    "<br>"
                                )
                            )}
            </p>
          </div>
          <div className="lg:ml-40 pb-20">
            <Form />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
