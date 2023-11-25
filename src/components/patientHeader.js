import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";
// import { useState,useEffect } from "react";
import { toggleSidebar } from "../slices/sidebar/toggleSlice";
import { useNavigate } from "react-router-dom";

export default function PatientHeader({
  searchTerm,
  setSearchTerm,
  line1,
  line2,
  isAdd,
})
{
  const threeDots = `<svg width="25" height="14" viewBox="0 0 25 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1 1L24 0.999998" stroke="black" stroke-width="2" stroke-linecap="round"/>
  <path d="M1 13L24 13" stroke="black" stroke-width="2" stroke-linecap="round"/>
  <path d="M7 7L24 7" stroke="black" stroke-width="2" stroke-linecap="round"/>
  </svg>`;

  const svg1 = `<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M23.0556 25L14.3056 16.25C13.6111 16.8056 12.8125 17.2454 11.9097 17.5694C11.0069 17.8935 10.0463 18.0556 9.02778 18.0556C6.50463 18.0556 4.36921 17.1817 2.62153 15.434C0.873843 13.6863 0 11.5509 0 9.02778C0 6.50463 0.873843 4.36921 2.62153 2.62153C4.36921 0.873843 6.50463 0 9.02778 0C11.5509 0 13.6863 0.873843 15.434 2.62153C17.1817 4.36921 18.0556 6.50463 18.0556 9.02778C18.0556 10.0463 17.8935 11.0069 17.5694 11.9097C17.2454 12.8125 16.8056 13.6111 16.25 14.3056L25 23.0556L23.0556 25ZM9.02778 15.2778C10.7639 15.2778 12.2396 14.6701 13.4549 13.4549C14.6701 12.2396 15.2778 10.7639 15.2778 9.02778C15.2778 7.29167 14.6701 5.81597 13.4549 4.60069C12.2396 3.38542 10.7639 2.77778 9.02778 2.77778C7.29167 2.77778 5.81597 3.38542 4.60069 4.60069C3.38542 5.81597 2.77778 7.29167 2.77778 9.02778C2.77778 10.7639 3.38542 12.2396 4.60069 13.4549C5.81597 14.6701 7.29167 15.2778 9.02778 15.2778Z" fill="white"/>
  </svg>`;
  const smallSvg1 = `<svg width="19" height="19" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M23.0556 25L14.3056 16.25C13.6111 16.8056 12.8125 17.2454 11.9097 17.5694C11.0069 17.8935 10.0463 18.0556 9.02778 18.0556C6.50463 18.0556 4.36921 17.1817 2.62153 15.434C0.873843 13.6863 0 11.5509 0 9.02778C0 6.50463 0.873843 4.36921 2.62153 2.62153C4.36921 0.873843 6.50463 0 9.02778 0C11.5509 0 13.6863 0.873843 15.434 2.62153C17.1817 4.36921 18.0556 6.50463 18.0556 9.02778C18.0556 10.0463 17.8935 11.0069 17.5694 11.9097C17.2454 12.8125 16.8056 13.6111 16.25 14.3056L25 23.0556L23.0556 25ZM9.02778 15.2778C10.7639 15.2778 12.2396 14.6701 13.4549 13.4549C14.6701 12.2396 15.2778 10.7639 15.2778 9.02778C15.2778 7.29167 14.6701 5.81597 13.4549 4.60069C12.2396 3.38542 10.7639 2.77778 9.02778 2.77778C7.29167 2.77778 5.81597 3.38542 4.60069 4.60069C3.38542 5.81597 2.77778 7.29167 2.77778 9.02778C2.77778 10.7639 3.38542 12.2396 4.60069 13.4549C5.81597 14.6701 7.29167 15.2778 9.02778 15.2778Z" fill="white"/>
  </svg>`;

  let isTab = useMediaQuery({ query: "(max-width: 768px)" });
  let isTab1 = useMediaQuery({ query: "(max-width: 400px)" });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [doctorsList, setDoctorsList] = useState([]);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const handleDoctorForm = () =>
  {
    navigate("/patientform");
  };

  const handleToggleSidebar = () =>
  {
    dispatch(toggleSidebar());
  };

  // Find doctor API call
  useEffect(() =>
  {
    const fetchDoctorDetails = async () =>
    {
      try
      {
        const response = await fetch(`${baseUrl}/api/v1/list_doctors`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // 'x-auth-token': token // Replace with your actual token from the previous session
          },
        });

        const data = await response.json();
        console.log("DATA from response", data);
        const verifiedDoctors = data.data.filter(
          (doctor) => doctor.accountVerified.isVerified
        );
        setDoctorsList(verifiedDoctors);
      } catch (error)
      {
        console.error("There was an error verifying the OTP:", error);
      }
    };
    fetchDoctorDetails();
  }, []);

  const handleSearchTerm = (e) =>
  {
    setSearchTerm(e.target.value);
  };

  console.log("Search term", searchTerm);

  return (
    <div>
      <div
        className={`bg-customRed w-full flex flex-row `}
        style={{
          left: "2%",
          height: "150px",
          borderRadius: "0px 0px 81px 0px",
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div className=" header-left">
          <div
            className="header-left-top"
            style={{
              width: "80%", // Adjust the width percentage as needed
              height: "110px",
              marginTop: "25%",
              marginLeft: "50%", // Center horizontally using left and transform properties
              transform: "translateX(-50%)",
              // position: "absolute",
              fontWeight: 600,
              fontFamily: "Kanit, sans-serif",
              fontSize: "40px", // Reduce the font size for better responsiveness
              lineHeight: "39px", // Adjust the line height as needed
            }}
          >
            {line1}
          </div>
          <div
            className="header-left-bottom"
            style={{
              width: "80%", // Adjust the width percentage as needed
              height: "110px",
              marginTop: -66,
              marginLeft: "50%", // Center horizontally using left and transform properties
              transform: "translateX(-50%)",
              // position: "absolute",
              fontWeight: 400,
              fontFamily: "Kanit, sans-serif",
              fontSize: "40px", // Reduce the font size for better responsiveness
              lineHeight: "39px", // Adjust the line height as needed
            }}
          >
            {line2}
          </div>
        </div>

        <div
          className=" header-Right"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div>
            <div
              className="m-3 md:hidden  "
              onClick={handleToggleSidebar}
              style={{ marginLeft: "75%" }}
            >
              <span
                style={{
                  width: "8px",
                  height: "20px",
                  top: "10px",
                  // left: "200px",
                  marginLeft: "85%",
                  marginRight: 10,
                  // position: "absolute",
                }}
                dangerouslySetInnerHTML={{ __html: threeDots }}
              ></span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: isTab ? "20px" : "80px",
              marginRight: isTab1 ? -45 : 60,
              marginLeft: isTab1 ? -40 : 0,
            }}
          >
            <div className="header-Right-top">
              <span
                style={{
                  display: "flex",
                  flexDirection: "row",
                  border: "2px solid white",
                  borderRadius: 50,
                  alignItems: "center",
                }}
              >
                {" "}
                <span
                  style={{
                    width: isTab ? "25px" : "25.58px",
                    height: isTab ? "20px" : "14.58px",
                    // display: 'inline-block',
                    marginTop: 7,
                    marginLeft: "3%",
                    marginRight: "4%",
                    marginBottom: isTab ? "6%" : "8%",
                    alignContent: "center",
                    // flex: 1
                  }}
                  dangerouslySetInnerHTML={{ __html: isTab ? smallSvg1 : svg1 }}
                ></span>{" "}
                <span>
                  {" "}
                  <input
                    placeholder={`${isTab ? "" : "search"}`}
                    style={{
                      width: isTab ? "55px" : "100px",
                      marginRight: "30px",
                      // display: 'inline-block',
                      backgroundColor: "#08DA75",
                      fontSize: "24px",
                      color: "white",
                      fontWeight: 600,
                      outline: "none",
                      marginLeft: "4%",
                    }}
                    onChange={(e) => handleSearchTerm(e)}
                  />{" "}
                </span>{" "}
              </span>
            </div>

            <div className="header-Right-bottom">
              {isAdd ? (
                <button
                  style={{
                    display: "inline",
                    fontSize: isTab ? "20px" : "29px",
                    fontWeight: isTab ? 600 : 800,
                    fontFamily: "Lato, sans-serif",
                    lineHeight: isTab ? "16.8px" : "34.8px",
                    color: "#08DA75",
                    backgroundColor: "white",
                    height: isTab ? "40px" : "38px",
                    width: isTab ? "90px" : "122px",
                    borderRadius: "43px",
                    marginLeft: isTab ? 18 : 5,
                  }}
                  onClick={handleDoctorForm}
                >
                  Add +
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
