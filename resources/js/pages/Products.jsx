import React, {useState,useEffect, useRef} from "react";
import { productGrid } from "../components/Data";
import RangeSlider from "../components/PriceRange/PriceRange";
import ProductBox from "../components/ProductBox";
import { Link, usePage } from "@inertiajs/inertia-react";
import { CommonButton, SizePick } from "../components/Shared";
import { IoMdOptions } from "react-icons/io";
import Layout from "../Layouts/Layout";
import { Inertia } from '@inertiajs/inertia'
import "../components/PriceRange/PriceRange.css";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value) {
    return `${value}°C`;
  }



let links = function (links) {
    let rows = [];
    //links.shift();
    //links.splice(-1);
    {
        links.map(function (item, index) {
            if (index > 0 && index < links.length - 1) {
                rows.push(
                    <Link
                        href={item.url}
                        className={item.active ? "num active" : "num"}
                    >
                        {item.label}
                    </Link>
                );
            }
        });
    }
    return <div className="nums"> {rows.length > 1 ? rows : null} </div>;
};

let linksPrev = function (links) {
    let rowCount = 0;
    links.map(function (item, index) {
        if (index > 0 && index < links.length - 1) {
            rowCount++;
        }
    });
    return rowCount > 1 ? (
        <Link href={links[0].url}>
            <Arrow color="#2F3E51" rotate="90" />
            <Arrow color="#2F3E51" rotate="90" />
        </Link>
    ) : null;
};
let linksNext = function (links) {
    let rowCount = 0;
    links.map(function (item, index) {
        if (index > 0 && index < links.length - 1) {
            rowCount++;
        }
    });
    return rowCount > 1 ? (
        <Link href={links[links.length - 1].url}>
            <Arrow color="#2F3E51" rotate="-90" />
            <Arrow color="#2F3E51" rotate="-90" />
        </Link>
    ) : null;
};

const addToCart = function (product) {
    //localStorage.removeItem('cart')
    let _cart = localStorage.getItem("cart");
    let cart;
    if (_cart !== null) {
        cart = JSON.parse(_cart);
    } else cart = [];

    let qty = 1;

    if (cart.length > 0) {
        let exists = false;
        cart.forEach(function (el, i) {
            if (el.product.id === product.id) {
                el.qty += qty;
                exists = true;
            }
        });
        if (!exists) {
            let obj = {
                product: product,
                qty: qty,
            };
            cart.push(obj);
        }
    } else {
        let obj = {
            product: product,
            qty: qty,
        };
        cart.push(obj);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    //localStorage.removeItem('cart')
    Inertia.visit(window.location.href)
};

const Products = ({seo, products, sizes,cat}) => {

    // pricerange
    const [value, setValue] = useState([20, 37]);
    const handleChangee = (event, newValue) => {
        setValue(newValue);
        values.price = newValue
      };

// size
    const [picked, setPicked] = useState(0);
    const [sizepicked, setSizePicked] = useState(false);
    const [values, setValues] = useState({
        cat: "",
        price: "",
        size: "",
      })
      let categoryArray = [];


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
        Inertia.get(route("search.index"), values)
      }
  const [showFilter, setShowfilter] = useState(false);
  const wrapperRef = useRef(null);

  const checkboxes = ["მაისური", "ქურთუკი", "შარვალი", "ქუდი"];

  return (
    <Layout seo={seo}>
    <div className=" wrapper pb-20">
      <div
        ref={wrapperRef}
        className={`fixed top-0 bg-custom-slate-300 h-screen pt-44 z-40 2xl:px-20 px-10 overflow-y-scroll xl:overflow-y-hidden  xl:left-0 transition-all duration-500 pb-10 ${
          showFilter ? "left-0" : " -left-full"
        }`}
      >
        <div className="bold xl:mb-6 mb-3">პროდუქცია</div>
        <form onSubmit={handleSubmit}>
        <div className="xl:mb-12 mb-8">
          {cat.map((check, index) => {
            return (
              <div
                key={index}
                className="xl:mb-5 mb-2 flex items-center justify-start"
              >
                <input type="checkbox" name="cat" id={`checkbox-${check.id}`} onChange={(e)=>{
                    categoryArray.indexOf(check.title) === -1 ? categoryArray.push(check.id): "";
                    // if(!e.target.checked){
                    //         categoryArray.splice(categoryArray.indexOf(e.target.id), 1)
                    //         if(categoryArray.length == 1) categoryArray.splice(categoryArray.indexOf(e.target.id), 0)
                    // }
                    values.cat = categoryArray;
                }
                }/>
                <label className="mr-2" htmlFor={`checkbox-${check.id}`}>
                  <div></div>
                </label>
                <label>{check.title}</label>
              </div>
            );
          })}

        </div>
        <div className="xl:mb-10 mb-6">
          <div className="bold xl:mb-6 mb-3">შეარჩიე საფასო კატეგორია</div>
          {/* <RangeSlider /> */}
          <div className="flex justify-between items-center mb-3">
        <div className="rounded bg-white w-16 text-center py-1">
          {value[0]} ₾
        </div>
        <div className="rounded bg-white w-16 text-center py-1">
          {value[1]} ₾
        </div>
      </div>
      <Box sx={{ width: 300 }}>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={value}
          onChange={handleChangee}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
        />
      </Box>
        </div>
        <div className="xl:mb-10 mb-6">
          <div className="bold mb-5">აირჩიე ზომა:</div>
      <div className="sizeFlex flex flex-wrap">
        {/* {["s", "m", "l", "xl"].map((size, i) => {
          return (
            <button type="button" id='size'
              onClick={(e) =>
                {
                    setPicked(i)
                    values.size = ["s", "m", "l", "xl"][i]
                    // values.size = i
                }
            }
              key={i}
              className={`flex items-center justify-center rounded-full w-12 h-12 mr-2 group-hover:bg-white transition-all duration-300 mr-3 uppercase mb-2 ${
                picked === i
                  ? "bg-black text-white"
                  : "bg-custom-slate-200 text-black"
              }`}
            >
              {size}
            </button>

        //    <input type="button" value="Click me"></input>

          );
        })} */}

        {
            sizes.map((e,i)=>{
                console.log(e, 'esaa');
                return(
                    <button type="button" id='size'
                    onClick={() =>
                      {
                        setSizePicked(true)
                          setPicked(i)
                          values.size = e.id
                      }
                  }
                    key={i}
                    className={`flex items-center justify-center rounded-full w-12 h-12 mr-2 group-hover:bg-white transition-all duration-300 mr-3 uppercase mb-2 ${
                      picked == i && sizepicked
                        ? "bg-black text-white"
                        : "bg-custom-slate-200 text-black"
                    }`}
                  >
                    {e.name}
                  </button>
                )
            })
        }
      </div>
        </div>
        <CommonButton width="245px" text="გაფილტრე პროდუქცია" />
      </form>
      </div>
      <div className=" xl:pt-44 pt-40">
        <button
          className="bold mb-5 xl:hidden block"
          onClick={() => setShowfilter(true)}
        >
          <IoMdOptions className="inline-block w-6 h-6 mb-1 mr-2" />
          ფილტერ
        </button>
        <div className="xl:pl-5  xl:ml-80 2xl:ml-96  grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-8">
          {products.data.map((data, index) => {
            return (
              <ProductBox
                key={index}
                image={
                    data.files != null
                    ? "/" +
                      data.files[0].path +
                      "/" +
                      data.files[0].title
                    : null
                }
                // link={data.link}
                link={
                    route("client.product.show", data.slug)
                }
                name={data.title}
                sale={data.sale}
                oldPrice={data.oldPrice}
                price={data.price}
                handleClick={() => addToCart(data)}
                />

            );
          })}
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Products;
