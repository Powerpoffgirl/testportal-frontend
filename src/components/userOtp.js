import { useMediaQuery } from "react-responsive";
import Header from "./header";

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminSidebar from "./adminSidebar";
import UserSidebarWithoutLogin from "./UserSidebarWithoutLogin";

const UserOTP = () =>
{
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpInputs = [];
  const [mobileNo, setMobileNo] = useState();
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const MAX_LENGTH = 6;
  const baseUrl = process.env.REACT_APP_BASE_URL;
  let isTab = useMediaQuery({ query: "(max-width: 768px)" });


  useEffect(() =>
  {
    const contactNumber = localStorage.getItem("contactNumber")
    setMobileNo(contactNumber)
  }, [])

  const SendOTP = async () =>
  {

    const requestBody = {
      contactNumber: mobileNo,
    };
    const apiUrl = `${baseUrl}/api/v1/user/send_otp`;

    try
    {
      // Send the POST request
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "x-auth-token": token
        },
        body: JSON.stringify(requestBody),
      });

      // Convert the response to JSON
      const data = await response.json();

      // Check the response status
      if (response.ok)
      {
        console.log("OTP sent successfully", data);
      } else
      {
        console.error("Error sending OTP:", data);
      }
    } catch (error)
    {
      console.error("Error during the API call:", error);
    }
  };

  const verifyOTP = async () =>
  {
    try
    {

      const id = localStorage.getItem("userId");

      const otpString = otp.join("");
      const response = await fetch(`${baseUrl}/api/v1/user/verify_otp/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp: otpString }),
      });

      const data = await response.json();
      if (data.success === true)
      {
        localStorage.setItem("token", data?.data?.token)
        console.log("token", data?.data?.token)
        console.log("======NEW USER=======", data?.data?.data?.newUser)
        if (data?.data?.data?.newUser)
        {
          navigate("/edituserform", { state: { user: user } })
        } else
        {
          navigate("/doctorlistuser", { state: { user: user } });
        }

      }
      console.log("DATA from response", data);
    } catch (error)
    {
      console.error("There was an error verifying the OTP:", error);
    }
  };

  const handleInputChange = (e, index) =>
  {
    const value = e.target.value;

    if (isNaN(value))
    {
      return; // Allow only numeric input
    }

    otp[index] = value;

    if (index < MAX_LENGTH - 1 && value)
    {
      otpInputs[index + 1].focus();
    }

    setOtp([...otp]);
  };

  console.log("OTP", otp);
  console.log("INPUT OTP", otpInputs);
  console.log("Mobile No", mobileNo);

  return (
    <>
      <div
        className="flex min-h-screen relative overflow-auto 
    box-border"
      >
        <div
          className="flex flex-col bg-customGreen"
          style={{
            width: isTab ? "100%" : "77%",
          }}
        >
          {/* <Header line1="Verify" line2="OTP"></Header> */}
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
              htmlFor="mobileNo"
              className="mx-2"
              style={{
                fontWeight: 400,
                fontSize: "20px",
                fontFamily: "Lato, sans-serif",
              }}
            >
              Mobile No.
            </label>
            <input
              className="mx-2"
              type="number"
              id="mobileNo"
              name="mobileNo"
              value={mobileNo}
              style={{
                border: "1px solid #08DA75",
                height: "45px",
                paddingLeft: "5px",
              }}
            />
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
              onClick={SendOTP}
            >
              Resend OTP
            </button>
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
                  onKeyDown={(e) =>
                  {
                    if (e.key === "Backspace" && index > 0 && !digit)
                    {
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
                onClick={verifyOTP}
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

export default UserOTP;
