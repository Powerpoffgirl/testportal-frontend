import React from "react";
// import { useMediaQuery } from "react-responsive";
import { useDispatch, } from "react-redux";
// import { useState,useEffect } from "react";
import { toggleSidebar } from "../slices/sidebar/toggleSlice";

export default function Header(props) {

  const threeDots = `<svg width="25" height="14" viewBox="0 0 25 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1 1L24 0.999998" stroke="black" stroke-width="2" stroke-linecap="round"/>
  <path d="M1 13L24 13" stroke="black" stroke-width="2" stroke-linecap="round"/>
  <path d="M7 7L24 7" stroke="black" stroke-width="2" stroke-linecap="round"/>
  </svg>`;

  // let isTab = useMediaQuery({ query: "(max-width: 768px)" });

  const dispatch = useDispatch();



  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };




  return (
    <div
    className={`bg-customRed w-full`}
    style={{
      // Use a percentage width for responsiveness
      // width: isTab ? "100%" : "80%",
      left: "2%",
      height: "212px",
      borderRadius: "0px 0px 81px 0px",
      position: "relative",
      // marginRight:'4%'
    }}
  >
    <div
      style={{
        width: "80%", // Adjust the width percentage as needed
        height: "110px",
        top:'55%',
        left: "50%", // Center horizontally using left and transform properties
        transform: "translateX(-50%)",
        position: "absolute",
        fontWeight: 600,
        fontFamily: "Kanit, sans-serif",
        fontSize: "40px", // Reduce the font size for better responsiveness
        lineHeight: "39px", // Adjust the line height as needed
      }}
    >
      {props.line1}
    </div>
    <div
      style={{
        width: "80%", // Adjust the width percentage as needed
        height: "110px",
        top:'75%',
        left: "50%", // Center horizontally using left and transform properties
        transform: "translateX(-50%)",
        position: "absolute",
        fontWeight: 400,
        fontFamily: "Kanit, sans-serif",
        fontSize: "40px", // Reduce the font size for better responsiveness
        lineHeight: "39px", // Adjust the line height as needed
      }}
    >
     {props.line2}
    </div>
    <div className="m-3 md:hidden  " onClick={handleToggleSidebar}>
      <span
        style={{
          width: "8px",
          height: "20px",
          top: "10px",
          // left: "200px",
          marginLeft:'85%',
          position: "absolute",
        }}
        dangerouslySetInnerHTML={{ __html: threeDots }}
      ></span>
    </div>
  </div>

  );
}


