import { useMediaQuery } from "react-responsive";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import phone from '../assets/phone.svg'
import { Menu, MenuItem } from "@mui/material";


const SuperAdminOtp = () =>
{
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
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
  const [userDetails, setUserDetails] = useState(null);
  const id = localStorage.getItem('adminId')

  console.log("LOCATION STATE", location.state);

  useEffect(() =>
  {
    const contactNumber = localStorage.getItem("contactNumber");
    setDoctorName(localStorage.getItem("doctorName"));
    setMobileNo(contactNumber);
    const fetchData = async () =>
    {
      try
      {
        const token = localStorage.getItem("token")

        const response = await fetch(`${baseUrl}/api/v1/superAdmin/admin_byId/${id}`, {
          method: "GET",
          headers: {
            "x-auth-token": token,
          },
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
  }, []);

  const SendOTP = async () =>
  {
    const requestBody = {
      contactNumber: mobileNo,
    };
    const id = localStorage.getItem("adminId")
    const apiUrl = `${baseUrl}/api/v1/superAdmin/send_otp_admin/${id}`;
    const token = localStorage.getItem("token")
    try
    {
      // Send the POST request
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token
        },
        body: JSON.stringify(requestBody),
      });

      // Convert the response to JSON
      const data = await response.json();

      // Check the response status
      if (response.ok)
      {
        console.log("OTP sent successfully", data);
        setResendClicked(true);
        setSeconds(90);
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
      const id = localStorage.getItem("adminId");
      const token = localStorage.getItem("token");

      const otpString = otp.join("");
      const response = await fetch(
        `${baseUrl}/api/v1/superAdmin/verify_otp_admin/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
          body: JSON.stringify({ otp: otpString }),
        }
      );

      const data = await response.json();
      if (data.success === true)
      {
        console.log("======NEW USER=======", data?.data?.data?.newUser);
        navigate("/superadminadminlist");
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
      <div className="flex flex-col -ml-7 lg:flex-row" style={{
        paddingRight: "3%"
      }}>
        {/* --------------left-------------- */}
        <div className="flex flex-col border bg-white lg:w-1/4 py-6 px-3  ml-5 my-5 ">
          <div className="mx-auto my-2">
            <div className=" " >
              <div className=" border w-36 mx-auto rounded-full" style={{ backgroundColor: '#B1DAED' }}>
                {userDetails?.adminPic ? (
                  <img
                    src={userDetails?.adminPic}
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
            <div className="flex flex-row mt-5 mb-3">
              <p className="block text-black text-lg font-semibold ">
                <input
                  id="files"
                  type="file"
                  // ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                // onChange={handleFileSelect}
                />
              </p>

              <p
                className="mt-2 ml-3"
                aria-controls="profile-pic-menu"
                aria-haspopup="true"
                // aria-expanded={open ? "true" : undefined}
                // onClick={handleClick}
                style={{
                  cursor: "pointer",
                }}
              >
                {/* <FaAngleDown /> */}
              </p>

              <div style={{ backgroundColor: "#89CFF0" }}>
                <Menu
                  id="profile-pic-menu"
                  // anchorEl={anchorEl}
                  // open={open}
                  // onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "edit-profile-pic-text",
                    style: { backgroundColor: "#89CFF0" }, // Set background color for the whole menu
                  }}
                >
                  <MenuItem
                    style={{
                      backgroundColor: "#89CFF0",
                      // color: isHovered ? "red" : "white",
                    }}
                    onClick={() =>
                    {
                      // handleClose();
                    }}
                  // onMouseEnter={() => setIsHovered(true)}
                  // onMouseLeave={() => setIsHovered(false)}
                  >
                    {" "}
                    <span style={{ marginRight: "8px" }}>
                      {/* <HiOutlineUserAdd /> */}
                    </span>
                    <label htmlFor="files">New profile picture</label>
                  </MenuItem>

                  <MenuItem
                    style={{
                      backgroundColor: "#89CFF0",
                      // color: isHovered1 ? "red" : "white",
                    }}
                  // onClick={handleRemoveProfilePicture}
                  // onMouseEnter={() => setIsHovered1(true)}
                  // onMouseLeave={() => setIsHovered1(false)}
                  >
                    <span style={{ marginRight: "8px" }}>
                      {/* <FaRegTrashAlt /> */}
                    </span>
                    <span>Remove current picture</span>
                  </MenuItem>
                </Menu>
              </div>

            </div>
          </div>
          <hr />
          <div>
            <div className="flex flex-col mr-2 mt-2">
              <label
                style={{ marginRight: "10px" }}
                className="mx-2 text-lg font-semibold text-black font-lato"
                htmlFor="Permission"
              >
                Permissions
              </label>
            </div>
            <div
              className="flex flex-col flex-grow mx-2"
              style={{ justifyContent: "space-around" }}
            >
              <table>
                <tbody>
                  <tr>
                    <td>
                      View
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="view"
                        checked={userDetails?.permissions.view}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Create
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="create"
                        checked={userDetails?.permissions.create}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Remove
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="remove"
                        checked={userDetails?.permissions.remove}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Edit
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="edit"
                        checked={userDetails?.permissions.edit}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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
                <p> {userDetails?.address?.houseNo}</p>
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
                className="mx-2 bg-gray-300 rounded-lg font-medium text-lg "
                type="number"
                id="mobileNo"
                name="mobileNo"
                value={userDetails?.contactNumber}
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
                  type="number"
                  ref={(input) => (otpInputs[index] = input)}
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

export default SuperAdminOtp;
