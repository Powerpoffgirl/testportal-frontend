import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";
// import { useState,useEffect } from "react";
import { toggleSidebar } from "../slices/sidebar/toggleSlice";
import { useNavigate } from "react-router-dom";

export default function Header({ searchTerm, setSearchTerm, line1, line2, isAdd })
{
  const threeDots = `<svg width="25" height="14" viewBox="0 0 25 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1 1L24 0.999998" stroke="black" stroke-width="2" stroke-linecap="round"/>
  <path d="M1 13L24 13" stroke="black" stroke-width="2" stroke-linecap="round"/>
  <path d="M7 7L24 7" stroke="black" stroke-width="2" stroke-linecap="round"/>
  </svg>`;

  const svg1 = `<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M23.0556 25L14.3056 16.25C13.6111 16.8056 12.8125 17.2454 11.9097 17.5694C11.0069 17.8935 10.0463 18.0556 9.02778 18.0556C6.50463 18.0556 4.36921 17.1817 2.62153 15.434C0.873843 13.6863 0 11.5509 0 9.02778C0 6.50463 0.873843 4.36921 2.62153 2.62153C4.36921 0.873843 6.50463 0 9.02778 0C11.5509 0 13.6863 0.873843 15.434 2.62153C17.1817 4.36921 18.0556 6.50463 18.0556 9.02778C18.0556 10.0463 17.8935 11.0069 17.5694 11.9097C17.2454 12.8125 16.8056 13.6111 16.25 14.3056L25 23.0556L23.0556 25ZM9.02778 15.2778C10.7639 15.2778 12.2396 14.6701 13.4549 13.4549C14.6701 12.2396 15.2778 10.7639 15.2778 9.02778C15.2778 7.29167 14.6701 5.81597 13.4549 4.60069C12.2396 3.38542 10.7639 2.77778 9.02778 2.77778C7.29167 2.77778 5.81597 3.38542 4.60069 4.60069C3.38542 5.81597 2.77778 7.29167 2.77778 9.02778C2.77778 10.7639 3.38542 12.2396 4.60069 13.4549C5.81597 14.6701 7.29167 15.2778 9.02778 15.2778Z" fill="white"/>
  </svg>`;

  let isTab = useMediaQuery({ query: "(max-width: 768px)" });

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleDoctorForm = () =>
  {
    navigate("/doctorform")
  }

  const handleToggleSidebar = () =>
  {
    dispatch(toggleSidebar());
  };

  const handleSearchTerm = (e) =>
  {
    setSearchTerm(e.target.value)
  }

  console.log("Search term", searchTerm)

  return (
    <div
      className={`bg-customRed w-full flex flex-row `}
      style={{
        left: "2%",
        height: "212px",
        borderRadius: "0px 0px 81px 0px",
        position: "relative",
      }}
    >
      <div>
        <span className="flex flex-col ">
          <div
            className="flex flex-row justify-between"
            style={{
              width: "80%", // Adjust the width percentage as needed
              height: "110px",
              top: "55%",
              left: "50%", // Center horizontally using left and transform properties
              transform: "translateX(-50%)",
              position: "absolute",
              fontWeight: 600,
              fontFamily: "Kanit, sans-serif",
              fontSize: "40px", // Reduce the font size for better responsiveness
              lineHeight: "39px", // Adjust the line height as needed
            }}
          >
            <span>{line1}</span>
            <div
              className="flex  justify-between"
              style={{
                width: isTab ? '81px' : '200px',
                height: isTab ? '25px' : '45px',
                border: '2px solid #FFFFFF',
                backgroundColor: '#08DA75',
                borderRadius: '43px',
                display: 'inline-block',
                overflow: 'hidden',
                paddingLeft: "1%",
                marginLeft: "50%",
                paddingBottom: "5%",
              }}
            >
              <span
                style={{
                  width: isTab ? "25px" : "14.58px",
                  height: isTab ? "25px" : "14.58px",
                  display: 'inline-block',
                  marginLeft: '4%',
                  marginRight: '4%',
                  marginBottom: isTab ? '6%' : '3%',
                  alignContent: 'center'
                  // flex: 1
                }}
                dangerouslySetInnerHTML={{ __html: svg1 }}
              ></span>
              <input
                placeholder={`${isTab ? '' : 'search'}`}

                style={{
                  width: '100px',
                  display: 'inline-block',
                  backgroundColor: '#08DA75',
                  fontSize: '24px',
                  color: 'white',
                  fontWeight: 600,
                  outline: 'none',
                  marginLeft: '4%',
                }}
                onChange={(e) => handleSearchTerm(e)}
              />
            </div>
            {isAdd ? (
              <button
                style={{
                  display: "inline",
                  fontSize: isTab ? "14px" : "29px",
                  fontWeight: 800,
                  fontFamily: "Lato, sans-serif",
                  lineHeight: isTab ? "16.8px" : "34.8px",
                  color: "#08DA75",
                  backgroundColor: "white",
                  height: isTab ? "25px" : "45px",
                  width: isTab ? "65px" : "132px",
                  borderRadius: "43px",
                }}
                onClick={handleDoctorForm}
              >
                Add+
              </button>
            ) : (
              ""
            )}
          </div>
          <div
            style={{
              width: "80%", // Adjust the width percentage as needed
              height: "110px",
              top: "75%",
              left: "50%", // Center horizontally using left and transform properties
              transform: "translateX(-50%)",
              position: "absolute",
              fontWeight: 400,
              fontFamily: "Kanit, sans-serif",
              fontSize: "40px", // Reduce the font size for better responsiveness
              lineHeight: "39px", // Adjust the line height as needed
            }}
          >
            {line2}
          </div>
        </span>
      </div>
      <div className="m-3 md:hidden  " onClick={handleToggleSidebar}>
        <span
          style={{
            width: "8px",
            height: "20px",
            top: "10px",
            // left: "200px",
            marginLeft: "85%",
            position: "absolute",
          }}
          dangerouslySetInnerHTML={{ __html: threeDots }}
        ></span>
      </div>
    </div>
  );
}


