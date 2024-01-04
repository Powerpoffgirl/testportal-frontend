import { useMediaQuery } from "react-responsive";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaPhoneAlt } from "react-icons/fa";
import { LuRefreshCcw } from "react-icons/lu";
import "./userLogin.css";
import { Tooltip } from "antd";

const UserOTP = () =>
{
  const [otp, setOtp] = useState();
  const otpInputs = [];
  const [mobileNo, setMobileNo] = useState();
  const [user, setUser] = useState();
  const [seconds, setSeconds] = useState(90);
  const [resendClicked, setResendClicked] = useState(false);
  const [firstTime, setFirstTime] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const MAX_LENGTH = 6;
  const baseUrl = process.env.REACT_APP_BASE_URL;
  let isTab = useMediaQuery({ query: "(max-width: 768px)" });
  const [doctorName, setDoctorName] = useState();
  const [otperror, setOtperror] = useState();

  console.log("LOCATION STATE", location.state);

  useEffect(() =>
  {
    const contactNumber = localStorage.getItem("contactNumber");
    setDoctorName(localStorage.getItem("doctorName"));
    setMobileNo(contactNumber);
  }, []);

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
      console.log("==========================DATA===================", data);
      if (response.ok)
      {
        console.log("OTP sent successfully", data);

        setResendClicked(true);
        setSeconds(90);
        toast.success("Otp sent !!");
      } else
      {
        console.error("Error sending OTP:", data);
        toast.error("Error sending Otp");
      }
    } catch (error)
    {
      console.error("Error during the API call:", error);
    }
  };

  const handleMobileNumberChange = (e) =>
  {
    const { name, value } = e.target;

    if (name === "otp")
    {
      setOtp(value);
    }
  };

  console.log("otp output$$$$$$$$$$$", otp);

  const verifyOTP = async () =>
  {
    if (otp?.length < 6)
    {
      setOtperror("Please enter valid otp");
    }

    try
    {
      const id = localStorage.getItem("userId");

      // const otpString = otp.join("");
      const response = await fetch(`${baseUrl}/api/v1/user/verify_otp/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp: otp }),
      });

      const data = await response.json();
      if (data.success === true)
      {
        localStorage.setItem("token", data?.data?.token);
        localStorage.setItem("pic", data?.data?.data?.userPic);
        console.log("token", data?.data?.token);
        console.log("======NEW USER=======", data?.data?.data?.newUser);
        localStorage.setItem("patientId", data?.patient?._id);
        if (data?.data?.data?.newUser)
        {
          navigate("/userprofile", { state: { user: user } });
        } else if (doctorName)
        {
          navigate("/bookappointment", { state: { user: user } });
        } else
        {
          navigate("/doctorlistuser", { state: { user: user } });
        }
      }
      if (data.success === false)
      {
        toast.error("OTP expired!");
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

  return (
    <>
      <div
        className="login"
        style={{ backgroundColor: "white", fontWeight: "700" }}
      >
        <div className="left_side">
          <h1 className="left_heading">
            Welcome To <br /> Doctalk'S{" "}
          </h1>
        </div>
        <div className="right_side">
          {/* <h3 className="right_heading">User Login</h3> */}
          <p className="para_one">Verify OTP</p>
          <p className="para_two">Please enter OTP</p>
          <div className="input_container">
            <FaPhoneAlt className="call_icon" />
            <input
              className="input_box"
              type="number"
              value={mobileNo}
              name="contactNumber"
            />
          </div>
          {/* OTP input boxes */}
          <div className="input_container">
            <Tooltip placement="top" title="Resend OTP">
              <LuRefreshCcw className="Resend_icon" onClick={SendOTP} />
            </Tooltip>

            <input
              className="input_box"
              type="number"
              placeholder="Enter OTP"
              value={otp}
              name="otp"
              onChange={handleMobileNumberChange}
            />
            <p className="error_message">{otperror}</p>
          </div>
          <p
            style={{
              fontWeight: 400,
              fontSize: "16px",
              display: "flex",
              marginLeft: "40%",
            }}
          >
            <p className="timer" style={{ color: "#666", cursor: "pointer" }}>
              <text className="mx-2" style={{ color: "#000000" }}>
                {formatTime(seconds)} sec
              </text>{" "}
            </p>{" "}
          </p>

          <button
            style={{ marginTop: "10px" }}
            className="button1"
            onClick={verifyOTP}
          >
            {" "}
            Verify OTP
          </button>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default UserOTP;
