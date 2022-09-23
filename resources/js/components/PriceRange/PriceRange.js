import React from "react";
import "./PriceRange.css";
import { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value) {
  return `${value}°C`;
}
export default function RangeSlider() {
  const [value, setValue] = useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(value, 'esaa');

  return (
    <>
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
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
        />
      </Box>
    </>
  );
}
