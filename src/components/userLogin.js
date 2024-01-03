import React, { useEffect } from "react";
// import "../App.css";
import "./userLogin.css";
import { FaPhoneAlt } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "react-datepicker/dist/react-datepicker.min.css";

export default function UserLogin()
{
  let isTab = useMediaQuery({ query: "(max-width: 640px)" });
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [isDoctor, setIsDoctor] = useState(true);
  const [contactNumber, setContactNumber] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState();
  const [password, setPassword] = useState("");
  const location = useLocation();
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [checkboxerror, setCheckboxerror] = useState();
  const [isValidNumber, setIsValidNumber] = useState(true);

  const handleCheckboxChange = (event) =>
  {
    setIsChecked(event.target.checked);
  };

  const handleMobileNumberChange = (e) =>
  {
    const number = e.target.value;
    const isValidNumber = validateMobileNumber(number);
    setIsValid(isValidNumber);
    setContactNumber(number);
    setIsValidNumber(isValidNumber);
    if (isValidNumber || number === "")
    {
      setContactNumber(number);
    }
  };

  const validateMobileNumber = (number) =>
  {
    const isValidFormat = /^\d{0,10}$/.test(number); // Validates up to 10 digits
    return isValidFormat;
  };
  const handlePasswordChange = (e) =>
  {
    const enteredPassword = e.target.value;
    setPassword(enteredPassword);

    // Password validation
    if (enteredPassword.trim().length < 6)
    {
      setPasswordError("Password should be at least 6 characters");
    } else
    {
      setPasswordError("");
    }
  };

  const handleForgetPassword = async (e) =>
  {
    e.preventDefault();
    const requestBody = {
      contactNumber: contactNumber,
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
        localStorage.setItem("contactNumber", contactNumber);
        navigate("/otpverify");
      } else
      {
        console.error("Error sending OTP:", data);
      }
    } catch (error)
    {
      console.error("Error during the API call:", error);
    }
  };

  useEffect(() =>
  {
    const doctor = location?.state;
    setSelectedDoctor(doctor?.doctor);
    console.log("SELECTED DOCTOR", selectedDoctor);
  }, []);

  const handleSubmit = async (e) =>
  {
    e.preventDefault();

    if (!isChecked)
    {
      setCheckboxerror("Please select the Checkbox");
    }
    if (isValid && isChecked)
    {
      const response = await fetch(`${baseUrl}/api/v1/user/send_otp`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contactNumber: contactNumber,
        }),
      });
      const data = await response.json();
      console.log("=========eeeeeeeeee==============DATA FROM RESPONSE===================", data);
      localStorage.setItem("patientId", data?.patient?._id)
      if (data?.user?._id)
      {
        localStorage.setItem("userId", data?.user?._id);
        localStorage.setItem("name", data?.user?.name);
        localStorage.setItem("userContactNumber", data?.user?.email);
      } else
      {
        localStorage.setItem("userId", data?.data?._id);
      }
      localStorage.setItem("contactNumber", contactNumber);
      navigate("/userotp", {
        state: { name: selectedDoctor?.name, id: selectedDoctor?._id },
      });

      console.log(data);
    }
  };

  return (
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
        <h3 className="right_heading">User Login</h3>
        <p className="para_one" style={{ fontSize: "22px", fontWeight: 700 }}>
          Add Your Mobile Number
        </p>
        <p className="para_two" style={{ fontSize: "18px", fontWeight: 300 }}>
          Apply with your phone number
        </p>
        <div className="input_container">
          <FaPhoneAlt className="call_icon" />
          <input
            className={`input_box ${isValid ? "" : "invalid"}`}
            type="text"
            placeholder="Enter your mobile number"
            value={contactNumber}
            onChange={handleMobileNumberChange}
            maxLength={10}
          />
          {!isValid && (
            <p className="error_message">Please enter a valid mobile number</p>
          )}
          {isValid && !isChecked && (
            <p className="error_message1">{checkboxerror}</p>
          )}{" "}
        </div>
        <label className="label1" style={{ fontWeight: 400, fontSize: "16px" }}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />{" "}
          I agree with the{" "}
          <a
            onClick={() => navigate("/termsofservices")}
            style={{
              color: "#666",
              fontWeight: "bolder",
              textDecoration: "underline",
            }}
          >
            Terms of service
          </a>{" "}
          and{" "}
          <a
            onClick={() => navigate("/privacypolicy")}
            style={{
              color: "#666",
              fontWeight: "bolder",
              textDecoration: "underline",
            }}
          >
            Privacy policy
          </a>
        </label>
        <button className="button1" onClick={handleSubmit}>
          {" "}
          Agree & Continue
        </button>
      </div>
    </div>
  );
}
