import Sidebar from "./sidebar";
import { useMediaQuery } from "react-responsive";
import Header from "./header";

import React, { useState } from "react";

const OTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpInputs = [];
  const MAX_LENGTH = 6;

  let isTab = useMediaQuery({ query: "(max-width: 768px)" });

  const handleInputChange = (e, index) => {
    const value = e.target.value;

    if (isNaN(value)) {
      return; // Allow only numeric input
    }

    otp[index] = value;

    if (index < MAX_LENGTH - 1 && value) {
      otpInputs[index + 1].focus();
    }

    setOtp([...otp]);
  };

  return (
    <>
      <div
        className="flex min-h-screen relative overflow-auto 
    box-border"
      >
        <Sidebar></Sidebar>
        <div
          className="flex flex-col bg-customGreen"
          style={{
            width: isTab ? "100%" : "77%",
          }}>
          <Header line1="Find" line2="Doctors"></Header>
          <div
            className="flex flex-col gap-2 px-3 w-full"
            style={{
              top: "4%",
              left: "2%",
              position: "relative",
              overflow: "hidden",
              justifyContent: "center",
            }}
          >
            <label
              htmlFor="username"
              className="mx-2"
              style={{
                fontWeight: 400,
                fontSize: "20px",
                fontFamily: "Lato, sans-serif",
              }}
            >
              Mobile No
            </label>
            <input
              className="mx-2"
              type="text"
              id="username"
              name="username"
              style={{ border: "1px solid #08DA75", height: "45px" }}
            />
            <text
              className="ml-[45%] md:ml-[49%]"
              style={{
                // marginLeft: "49%",
                marginTop: "2%",
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "24px",
                fontFamily: "Lato, sans-serif",
              }}
            >
              OTP
            </text>

            <div
              className="flex  gap-1 md:gap-2 w-full"
              style={{
                top: "8%",
                position: "relative",
                overflow: "hidden",
                justifyContent: "center",
              }}
            >
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(input) => (otpInputs[index] = input)}
                  type="text"
                  className="w-8 h-10 md:w-14 md:h-14 lg:w-14 lg:h-14 mx-2 text-4xl md:text-5xl lg:text-6xl border rounded-md text-center"
                  maxLength={1}
                  style={{ border: "1px solid #08DA75" }}
                  value={digit}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && index > 0 && !digit) {
                      otpInputs[index - 1].focus();
                    }
                  }}
                />
              ))}
            </div>
            <text
              className="mt-20"
              style={{
                color: "#A4A4A4",
                display: "flex",
                fontWeight: 400,
                fontSize: "18px",
                lineHeight: "21.6px",
                justifyContent: "center",
              }}
            >
              Resnd OTP in
              <text className="mx-2" style={{ color: "#000000" }}>
                0.90
              </text>{" "}
              Sec
            </text>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                className="mt-4 bg-customRed w-40"
                style={{
                  display: "inline",
                  height: "45px",
                  borderRadius: "43px",
                  color: "white",
                  fontSize: "24px",
                  fontWeight: 600,
                  lineHeight: "28.8px",
                }}
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OTP;
