import Sidebar from "./sidebar";
import { useMediaQuery } from "react-responsive";
import Header from "./header";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminSidebar from "./adminSidebar";
import AdminHeader from "./adminHeader";
import phone from '../assets/phone.svg'
import { toast } from "react-toastify";

const OTP = () =>
{
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [userDetails, setUserDetails] = useState(null);
  const otpInputs = [];
  const [mobileNo, setMobileNo] = useState();
  const navigate = useNavigate()
  const MAX_LENGTH = 6;
  const baseUrl = process.env.REACT_APP_BASE_URL
  let isTab = useMediaQuery({ query: "(max-width: 768px)" });
  const location = useLocation();
  const id = localStorage.getItem('id')
  const token = localStorage.getItem('token')
  console.log(location.state);
  const [seconds, setSeconds] = useState(90);
  const [resendClicked, setResendClicked] = useState(false);
  const [firstTime, setFirstTime] = useState(true);


  useEffect(() =>
  {

    setMobileNo(location?.state)

    const fetchData = async () =>
    {
      try
      {
        const response = await fetch(`${baseUrl}/api/v1/admin/get_doctor/${id}`, {
          method: "GET",
          headers: {
            "x-auth-token": token,
          },
          // body: JSON.stringify(doctorDetails),
        });
        const data = await response.json();
        setUserDetails(data.data);
        console.log("registered data", userDetails)
        console.log("address", userDetails.address.houseNo)
      } catch (error)
      {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [])

  const handleChange = (e) =>
  {
    const { name, value } = e.target
    setMobileNo(value)
  }

  const SendOTP = async () =>
  {
    // Retrieve the token from local storage
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id")
    // If there's no token, log an error and exit
    if (!token)
    {
      console.error("No token found in local storage");
      return;
    }

    // Define the request body and the API endpoint
    const requestBody = {
      "contactNumber": mobileNo.contactNumber
    };
    const apiUrl = `${baseUrl}/api/v1/admin/send_otp/${id}`;

    try
    {
      // Send the POST request
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token
        },
        body: JSON.stringify(requestBody)
      });

      // Convert the response to JSON
      const data = await response.json();

      // Check the response status
      if (response.ok)
      {
        toast.success("OTP sent")
      } else
      {
        console.error("Error sending OTP:", data);
      }

    } catch (error)
    {
      console.error("Error during the API call:", error);
    }
  }


  const verifyOTP = async () =>
  {
    try
    {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id")
      if (!token)
      {
        console.error("No token found in local storage");
        return;
      }
      const otpString = otp.join('');
      const response = await fetch(`${baseUrl}/api/v1/admin/verify_otp/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token // Replace with your actual token from the previous session
        },
        body: JSON.stringify({ otp: otpString })
      });

      const data = await response.json();
      if (data.success === true)
      {
        navigate("/qr")
      }
      console.log("DATA from response", data)
    } catch (error)
    {
      console.error('There was an error verifying the OTP:', error);
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

  useEffect(() =>
  {
    if (resendClicked || firstTime)
    {
      const intervalId = setInterval(() =>
      {
        if (seconds > 0)
        {
          setSeconds((prevSeconds) => prevSeconds - 1);
        } else
        {
          setFirstTime(false);
          setSeconds(90);
          setResendClicked(false);
        }
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [seconds, resendClicked, firstTime]);

  const formatTime = (time) =>
  {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  console.log("OTP", otp)
  console.log("INPUT OTP", otpInputs)
  console.log("Mobile No", mobileNo)

  return (
    <>

      <div className="flex flex-col -ml-7 lg:flex-row" style={{
        paddingRight: "3%"
      }}>
        {/* --------------left-------------- */}
        <div className="flex flex-col border bg-white lg:w-1/4 py-6 px-3  ml-5 my-5 ">
          <div className="mx-auto my-2">
            <div className=" " >
              <div className=" border w-36 mx-auto rounded-full" style={{ backgroundColor: '#B1DAED' }}>
                {userDetails?.doctorPic ? (
                  <img
                    src={userDetails?.doctorPic}
                    alt="Avatar"
                    style={{
                      borderRadius: "50%",
                      width: '130px',
                      height: '130px'
                    }}
                  />
                ) : (
                  <PermIdentityOutlinedIcon
                    style={{ width: "auto", height: 'auto', color: 'white' }}
                  />
                )}
              </div>
            </div>

          </div>

          <div className="mt-4 flex flex-row">
            <p className="block text-black text-lg font-semibold mr-1" >Working Days :</p>
            <p className="block text-black text-lg ">
              {userDetails?.workingDays.map((item, index) =>
              {
                return (
                  <div key={index}>
                    {item}
                  </div>
                )
              })}
            </p>

          </div>

          <div className="mt-3 flex flex-row">
            <p className="block text-black text-lg font-semibold mr-1">Working Hours :</p>
            <p className="block text-black text-lg ">
              {userDetails?.workingHours?.workHourFrom} - {userDetails?.workingHours?.workHourTo}

            </p>

          </div>

          <div className=" mt-3 flex flex-row">
            <p
              className="block text-black text-lg font-semibold mr-1"
            >
              Total Experience :
            </p>
            <p className="block text-black text-lg ">{userDetails?.totalExperience}</p>
          </div>

          <div className="mt-3 flex flex-row" >
            <p
              className="block text-black text-lg font-semibold mr-1"
            >
              Specialist:
            </p>

            <p class=" flex flex-wrap">
              {userDetails?.speciality?.map((item, index) =>
              {
                return (
                  <p key={index} className="block text-black text-lg ">{item},</p>

                )
              })}
            </p>

          </div>

          <div className="mt-3 flex flex-row">
            <p
              className="block text-black text-lg font-semibold mr-1"
            >
              Degree:
            </p>

            <p className="block text-black text-lg ">{userDetails?.degree}</p>
          </div>
        </div>

        {/* ----------------------------------right---------------------------------- */}
        <div className="border bg-white flex flex-col lg:w-3/4 p-6 my-5 mx-3">
          <p className="text-3xl " >Personal Information</p>
          <hr className="border my-2 " />
          {/* -------name------- */}
          <div className="mt-3 flex flex-row">
            <p
              className="block text-black text-lg font-semibold mr-1"
            >
              Name :
            </p>
            <p className="block text-black text-lg "> {userDetails?.name}</p>
          </div>

          {/* ------------email------------ */}
          <div className="mt-3 flex flex-row">
            <p
              className="block text-black text-lg font-semibold mr-1"
            >
              Email :
            </p>
            <p className="block text-black text-lg "> {userDetails?.email}</p>
          </div>
          {/* -----------contact----------- */}
          <div className="mt-3 flex flex-row">
            <p
              className="block text-black text-lg font-semibold mr-1"
            >
              Mobile Number :
            </p>
            <p className="block text-black text-lg "> {userDetails?.contactNumber}</p>
          </div>
          {/* -----------address----------- */}
          <div className="mt-3 flex flex-row">
            <p
              className="block text-black text-lg font-semibold mr-1"
            >
              Address:
            </p>
            <p className=" text-black text-lg flex flex-wrap">
              {
                userDetails?.address?.houseNo &&
                <p>, {userDetails?.address?.houseNo}</p>
              }
              {
                userDetails?.address?.floor &&
                <p>
                  , {userDetails?.address?.floor}
                </p>
              }
              {
                userDetails?.address?.block &&
                <p>
                  , {userDetails?.address?.block}
                </p>
              }
              {
                userDetails?.address?.area &&
                <p>
                  , {userDetails?.address?.area}
                </p>
              }

              {userDetails?.address?.district &&
                <p>
                  , {userDetails?.address?.district}
                </p>
              }
              {userDetails?.ddress?.state &&
                <p >, {userDetails?.ddress?.state}</p>
              }
              {userDetails?.address?.pinCode &&
                <p>
                  , {userDetails?.address?.pinCode}
                </p>
              }

            </p>

          </div>
          <hr class=" mt-3" />


          {/* ----------------------------------------otp verification section---------------------------------------- */}
          <div class="flex flex-col">
            <p class="my-4 text-gray-600">Verify Your Mobile Number</p>
            <div class="bg-gray-300 flex flex-row rounded-lg" style={{ maxWidth: '11rem' }} >
              <img src={phone} alt="phone" class="pl-5 pr-1"></img>
              <input
                className="mx-2 bg-gray-300 rounded-lg font-medium text-lg"
                type="number"
                id="mobileNo"
                name="mobileNo"
                value={mobileNo?.contactNumber}
                style={{ border: "", height: "45px", paddingLeft: "1.5%", maxWidth: '8rem' }}
              />
            </div>

            <div
              className="flex w-full my-3"
              style={{

                position: "relative",
                overflow: "hidden",
              }}
            >
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(input) => (otpInputs[index] = input)}
                  type="text"
                  className="w-10 h-8 mr-1.5  text-lg  border-2 text-black border-gray-400 text-center "
                  maxLength={1}
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

            <p class="text-gray-600">Otp will expire in <span
              className="timer"
              style={{ color: "#666", cursor: "pointer" }}
            >
              <text className="mx-2" style={{ color: "#000000" }}>
                {formatTime(seconds)} sec
              </text>
            </span> seconds  <button onClick={SendOTP} class="font-medium underline text-black">Resend</button> </p>

          </div>
          <div className="flex flex-row-reverse mt-5 my-2">
            <button className="btn btn-primary border py-3 px-4 rounded-3xl text-white" style={{ backgroundColor: '#89CFF0' }} onClick={verifyOTP}>
              Verify
            </button>
          </div>
        </div>



      </div >

    </>
  );
};

export default OTP;
