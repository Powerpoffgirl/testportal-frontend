import React, { useEffect } from "react";
import "./userLogin.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export default function UserLogin()
{
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmailChange = (e) =>
  {
    const enteredEmail = e.target.value;
    setEmail(enteredEmail);
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(enteredEmail) && enteredEmail !== "")
    {
      setEmailError("Please enter a valid email address");
    } else
    {
      setEmailError("");
    }
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

  const handleSubmit = async (e) =>
  {
    e.preventDefault();

    if (!emailError && !passwordError)
    {
      const response = await fetch(`${baseUrl}/api/v1/student/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      if (data?.status === 200)
      {
        console.log("----------DATA-------------", data?.data?.token)
        const token = data?.data?.token
        const userId = data?.data?.user?._id
        if (userId)
        {
          localStorage.setItem('userId', userId);
        }
        localStorage.setItem('token', token);
        navigate("/dashboard");
      } else
      {
        setError("Invalid email or password");
      }
    }
  };

  const handleRegister = async () =>
  {
    navigate("/usersignup")
  }

  return (
    <div
      className="login"
      style={{ backgroundColor: "white", fontWeight: "700" }}
    >
      <div className="left_side">
        <h1 className="left_heading">
          Test Portal<br />
        </h1>
      </div>
      <div className="right_side">
        <h3 className="right_heading">User Login</h3>
        <div className="input_container ">
          <input
            className={`input_box ${emailError ? "invalid" : ""}`}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && <p className="error_message">{emailError}</p>}
        </div>
        <div className="input_container ">
          <input
            className="input_box"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordError && (
            <p className="error_message">{passwordError}</p>
          )}
        </div>

        <div>
          <button className="button1" onClick={handleSubmit}>
            Login
          </button>
          <button className="button1" onClick={handleRegister}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
