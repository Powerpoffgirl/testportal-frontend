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

const OTP = () => {
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
  useEffect(() => {

    setMobileNo(location?.state)

    const fetchData = async () => {
      try {
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
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setMobileNo(value)
  }

  const SendOTP = async () => {
    // Retrieve the token from local storage
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id")
    // If there's no token, log an error and exit
    if (!token) {
      console.error("No token found in local storage");
      return;
    }

    // Define the request body and the API endpoint
    const requestBody = {
      "contactNumber": mobileNo.contactNumber
    };
    const apiUrl = `${baseUrl}/api/v1/admin/send_otp/${id}`;

    try {
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
      if (response.ok) {
        console.log("OTP sent successfully", data);
      } else {
        console.error("Error sending OTP:", data);
      }

    } catch (error) {
      console.error("Error during the API call:", error);
    }
  }


  const verifyOTP = async () => {
    try {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id")
      if (!token) {
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
      if (data.success === true) {
        navigate("/qr")
      }
      console.log("DATA from response", data)
    } catch (error) {
      console.error('There was an error verifying the OTP:', error);
    }
  };

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

  console.log("OTP", otp)
  console.log("INPUT OTP", otpInputs)
  console.log("Mobile No", mobileNo)

  return (
    <>
      <div
        className="flex min-h-screen relative overflow-auto 
    box-border"
      >
        <AdminSidebar></AdminSidebar>
        <div
          className="flex flex-col bg-customGreen"
          style={{
            width: isTab ? "100%" : "77%",
          }}>
          <AdminHeader line1="Find" line2="Doctors"></AdminHeader>

          <div className="flex flex-row ml-2">
            {/* --------------left-------------- */}
            <div className="flex flex-col border bg-white w-1/4 p-6 m-5">
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

                {/* <div className="flex flex-row mt-5 mb-3">
{/* 
                  <p className="block text-black text-lg font-semibold ">
                    Edit Profile Picture
                  </p>

                  <p
                    className="mt-2 ml-3"
                    aria-controls="profile-pic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    style={{
                      cursor: "pointer",

                    }}
                  >
                    <FaAngleDown />
                  </p> */}

                {/* <div style={{ backgroundColor: "#89CFF0" }}>
                    <Menu
                      id="profile-pic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "edit-profile-pic-text",
                        style: { backgroundColor: "#89CFF0" }, // Set background color for the whole menu
                      }}
                    >
                      <MenuItem
                        style={{
                          backgroundColor: "#89CFF0",
                          color: isHovered ? "red" : "white",
                        }}
                        onClick={() => {
                          handleClose();
                        }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                      >
                        {" "}
                        <span style={{ marginRight: "8px" }}>
                          <HiOutlineUserAdd />
                        </span>
                        <label htmlFor="files">New profile picture</label>
                      </MenuItem>

                      <MenuItem
                        style={{
                          backgroundColor: "#89CFF0",
                          color: isHovered1 ? "red" : "white",
                        }}
                        // onClick={handleRemoveProfilePicture}
                        onMouseEnter={() => setIsHovered1(true)}
                        onMouseLeave={() => setIsHovered1(false)}
                      >
                        <span style={{ marginRight: "8px" }}>
                          <FaRegTrashAlt />
                        </span>
                        <span>Remove current picture</span>
                      </MenuItem>
                    </Menu>
                  </div> 

                </div> */}
              </div>

              <div className="mt-4 flex flex-row">
                <p className="block text-black text-lg font-semibold" >Working Days :</p>
                <p className="block text-black text-lg ">
                  {userDetails?.workingDays.map((item, index) => {
                    return (
                      <div key={index}>
                        {item}
                      </div>
                    )
                  })}
                </p>

              </div>

              <div className="mt-3 flex flex-row">
                <p className="block text-black text-lg font-semibold">Working Hours :</p>
                <p className="block text-black text-lg ">
                  {userDetails?.workingHours?.workHourFrom} - {userDetails?.workingHours?.workHourTo}

                </p>

              </div>

              <div className=" mt-3 flex flex-row">
                <p
                  className="block text-black text-lg font-semibold"
                >
                  Total Experience :
                </p>
                <p className="block text-black text-lg ">{userDetails?.totalExperience}</p>
              </div>

              <div className="mt-3 flex flex-row" >
                <p
                  className="block text-black text-lg font-semibold"
                >
                  Specialist:
                </p>
                <p className="block text-black text-lg ">{userDetails?.speciality}</p>
              </div>

              <div className="mt-3 flex flex-row">
                <p
                  className="block text-black text-lg font-semibold"
                >
                  Degree:
                </p>

                <p className="block text-black text-lg ">{userDetails?.degree}</p>
              </div>
            </div>

            {/* ----------------------------------right---------------------------------- */}
            <div className="border bg-white flex flex-col w-3/4 p-6 my-5 mx-3">
              <p className="text-3xl " >Personal Information</p>
              <hr className="border my-2 " />
              {/* -------name------- */}
              <div className="mt-3 flex flex-row">
                <p
                  className="block text-black text-lg font-semibold"
                >
                  Name :
                </p>
                <p className="block text-black text-lg "> {userDetails?.name}</p>
              </div>

              {/* ------------email------------ */}
              <div className="mt-3 flex flex-row">
                <p
                  className="block text-black text-lg font-semibold"
                >
                  Email :
                </p>
                <p className="block text-black text-lg "> {userDetails?.email}</p>
              </div>
              {/* -----------contact----------- */}
              <div className="mt-3 flex flex-row">
                <p
                  className="block text-black text-lg font-semibold"
                >
                  Mobile Number :
                </p>
                <p className="block text-black text-lg "> {userDetails?.contactNumber}</p>
              </div>
              {/* -----------address----------- */}
              <div className="mt-3 flex flex-row">
                <p
                  className="block text-black text-lg font-semibold"
                >
                  Address :
                </p>
                <p className="block text-black text-lg ">{userDetails?.address?.houseNo} {userDetails?.address?.floor} {userDetails?.address?.block} {userDetails?.address?.pinCode} {userDetails?.address?.area} {userDetails?.address?.district} {userDetails?.address?.state}</p>
              </div>
              <hr class=" mt-3" />


              {/* ----------------------------------------otp verification section---------------------------------------- */}
              <div class="flex flex-col">
                <p class="my-4 text-gray-600">Verify Your Mobile Number</p>
                <div class="bg-gray-300 flex flex-row rounded-lg" style={{ maxWidth: '11rem' }} >
                  <img src={phone} class="pl-5 pr-1"></img>
                  <input
                    className="mx-2 bg-gray-300 rounded-lg font-medium text-lg"
                    type="number"
                    id="mobileNo"
                    name="mobileNo"
                    value={mobileNo?.contactNumber}
                    style={{ border: "", height: "45px", paddingLeft: "1.5%", maxWidth: '8rem' }}
                  // onChange={handleChange}
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
                      className="w-10 h-8   text-lg  border-2 text-black border-gray-400 text-center "
                      maxLength={1}
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

                <p class="text-gray-600">Otp will expire in 30 seconds  <button onClick={SendOTP} class="font-medium underline text-black">Resend</button> </p>

              </div>
              <div className="flex flex-row-reverse mt-5 my-2">
                <button className="btn btn-primary border py-3 px-4 rounded-3xl text-white" style={{ backgroundColor: '#89CFF0' }} onClick={verifyOTP}>
                  Verify
                </button>
              </div>
            </div>



          </div >


          {/* otp verify section  */}
          {/* <div
            className="flex flex-col gap-2 px-3 w-full border-2"
            style={{
              top: "4%",
              left: "2%",
              position: "relative",
              overflow: "hidden",
              justifyContent: "center",
            }}
          >
            
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
                onClick={SendOTP}
              >
                Resend OTP
              </button>
            </div>

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
                  style={{ border: "1px solid #89CFF0" }}
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
                className="mt-4 bg-customRed"
                style={{
                  display: "inline",
                  width: isTab ? "150px" : "198px",
                  height: isTab ? "35px" : "45px",
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
          </div> */}



        </div>
      </div>
    </>
  );
};

export default OTP;
