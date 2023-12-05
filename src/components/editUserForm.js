import React, { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { HiOutlineUserAdd } from "react-icons/hi";
import { FaRegTrashAlt } from "react-icons/fa";

export default function EditUserForm()
{
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [selectedFile, setSelectedFile] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);
  const [userDetails, setUserDetails] = useState({ name: "" });
  const [errors, setErrors] = useState({});
  //     const [userDetails, setUserDetails] = useState({ name: '' });
  //   const [errors, setErrors] = useState({});

  const handleFileSelect = (event) =>
  {
    const file = event.target.files[0];
    if (file)
    {
      setSelectedFile(file);
    }
  };

  const handleNewProfilePictureClick = () =>
  {
    // This will trigger the hidden file input to open the file dialog
    fileInputRef.current.click();
    handleNewProfilePicture();
  };

  const handleNewProfilePicture = async () =>
  {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId)
    {
      console.error("Token or user ID not found in local storage");
      return;
    }

    const formData = new FormData();
    formData.append("doctorPic", selectedFile);

    try
    {
      const response = await fetch(
        `${baseUrl}/api/v1/user/upload_image/${userId}`,
        {
          method: "POST",
          headers: {
            "x-auth-token": token,
            // Content-Type should not be manually set for FormData; the browser will set it with the proper boundary.
          },
          body: formData,
        }
      );

      if (!response.ok)
      {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Image uploaded successfully:", data);
      alert("Image uploaded successfully.");

      // Reset the file input
      setSelectedFile(null);
      fileInputRef.current.value = "";
    } catch (error)
    {
      console.error("Error uploading image:", error);
      alert("Error uploading image. Please try again.");
    }
  };

  // const [userDetails, setUserDetails] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() =>
  {
    const fetchUserDetails = async () =>
    {
      try
      {
        const token = localStorage.getItem("token");
        const patientId = localStorage.getItem("patientId");
        if (!token)
        {
          console.error("No token found in local storage");
          return;
        }
        const response = await fetch(`${baseUrl}/api/v1/user/get_userDetails`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token, // Replace with your actual token from the previous session
          },
        });

        const data = await response.json();
        console.log("DATA from response", data);
        setUserDetails(data?.data);
      } catch (error)
      {
        console.error("There was an error verifying the OTP:", error);
      }
    };
    fetchUserDetails();
  }, []);

  const handleClick = (event) =>
  {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () =>
  {
    setAnchorEl(null);
  };

  const handleToggleEdit = () =>
  {
    setIsEditing(!isEditing);
  };

  // Function to handle profile picture removal
  const handleRemoveProfilePicture = () =>
  {
    // Logic to handle removing the current profile picture
    handleClose();
  };

  const handleChange = (e) =>
  {
    const { name, value } = e.target;


    let isValid = true;
    let errorMessage = '';

    // Validations
    if (name === "name" && value.length < 3)
    {
      errorMessage = "Name should be at least 3 characters.";
      isValid = false;
    }

    if (name === "email")
    {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value))
      {
        errorMessage = "Please enter a valid email address.";
        isValid = false;
      }
    }

    if (["houseNo", "floor", "block", "area"].includes(name) && (!value || value.trim() === ""))
    {
      errorMessage = `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`;
      isValid = false;
    }

    if (name === "pinCode" && !/^\d{6}$/.test(value))
    {
      errorMessage = "Pincode must be 6 digits.";
      isValid = false;
    }

    if (["district", "state"].includes(name) && !/^[a-zA-Z\s]*$/.test(value))
    {
      errorMessage = `${name.charAt(0).toUpperCase() + name.slice(1)} must contain only letters and spaces.`;
      isValid = false;
    }

    // Update errors and userDetails
    if (!isValid)
    {
      setErrors({ ...errors, [name]: errorMessage });
    } else
    {
      const { [name]: omit, ...rest } = errors;
      setErrors(rest);

      if (name === "workingDays")
      {
        setUserDetails(prevDoctorDetails => ({
          ...prevDoctorDetails,
          workingDays: [...prevDoctorDetails?.workingDays, value],
        }));
      } else if (name === "workHourFrom" || name === "workHourTo")
      {
        setUserDetails(prevDoctorDetails => ({
          ...prevDoctorDetails,
          workingHours: {
            ...prevDoctorDetails?.workingHours,
            [name]: value,
          }
        }));
      } else if (["houseNo", "floor", "block", "area", "pinCode", "district", "state"].includes(name))
      {
        setUserDetails(prevDoctorDetails => ({
          ...prevDoctorDetails,
          address: {
            ...prevDoctorDetails?.address,
            [name]: value
          }
        }));
      } else
      {
        setUserDetails(prevDoctorDetails => ({
          ...prevDoctorDetails,
          [name]: value
        }));
      }
    }
  };


  const handleUpdate = async (e) =>
  {
    e.preventDefault();
    // Check if the token exists
    const newUserDetails = {
      name: userDetails?.name,
      contactNumber: userDetails.contactNumber,
      email: userDetails.email,
      address: {
        houseNo: userDetails?.address?.houseNo,
        floor: userDetails?.address?.floor,
        block: userDetails?.address?.block,
        area: userDetails?.address?.area,
        pinCode: userDetails?.address?.pinCode,
        district: userDetails?.address?.district,
        state: userDetails?.address?.state,
      },
    };

    const token = localStorage.getItem("token");
    const doctorId = localStorage.getItem("doctorId");
    if (!token)
    {
      console.error("No token found in local storage");
      return;
    }
    const response = await fetch(`${baseUrl}/api/v1/user/update_user`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify(newUserDetails),
    });
    const data = await response.json();
    if (data.success === true)
    {
      console.log("Doctor updated successfully.");
      // navigate("/otp")
      // localStorage.setItem("id", data.data._id)
    }
    console.log("DATA from response", data);
  };

  console.log("User DETAILS", userDetails);

  return (
    <>
      <div className="flex flex-row">
        <div className="md:fixed md:h-screen md:overflow-y-auto md:w-[337px]"></div>
        <div className=" w-full">
          <div className="mt-6 p-2">
            <div className="flex  flex-col items-center justify-center w-full">
              <div className="cursor-pointer">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#FFFFFF",
                      width: "90px",
                      height: "90px",
                      borderRadius: "50%",
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      color: "#A4A4A4",
                    }}
                  >
                    {userDetails?.userPic ? (
                      <img
                        src={userDetails.userPic}
                        alt="Avatar"
                        style={{
                          borderRadius: "50%",
                        }}
                      />
                    ) : (
                      <PermIdentityOutlinedIcon
                        style={{ width: "70px", height: "70px" }}
                      />
                    )}
                  </div>
                  <p
                    aria-controls="profile-pic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    style={{ cursor: "pointer" }} // Add a pointer cursor to indicate clickable
                  >
                    Edit profile pic
                  </p>
                  <div style={{ backgroundColor: "#08DA75" }}>
                    <Menu
                      id="profile-pic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "edit-profile-pic-text",
                        style: { backgroundColor: "#08DA75" }, // Set background color for the whole menu
                      }}
                    >
                      <MenuItem
                        style={{
                          backgroundColor: "#08DA75",
                          color: isHovered ? "red" : "white",
                        }}
                        onClick={handleNewProfilePictureClick}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                      >
                        {" "}
                        <span style={{ marginRight: "8px" }}>
                          <HiOutlineUserAdd />
                        </span>
                        <span>New profile picture</span>
                      </MenuItem>

                      <MenuItem
                        style={{
                          backgroundColor: "#08DA75",
                          color: isHovered1 ? "red" : "white",
                        }}
                        onClick={handleRemoveProfilePicture}
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
                  <input
                    id="imageInput"
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleFileSelect}
                  />
                </div>
              </div>
            </div>
            <div class="grid grid-cols-1 w-full gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-black text-lg font-semibold"
                >
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Smita Singh"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  className="block mt-0 w-full placeholder-gray-400/70 rounded-lg border border-[#08DA75] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                  value={userDetails.name}
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}
              </div>{" "}
              <div>
                <label
                  htmlFor="email"
                  className="block text-black text-lg font-semibold"
                >
                  Email
                </label>
                <input
                  type="text"
                  placeholder="Email"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  className="block mt-0 w-full placeholder-gray-400/70 rounded-lg border border-[#08DA75] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                  value={userDetails.email}
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>{" "}
              <div>
                <label
                  for="contact"
                  class="block text-black text-lg font-semibold"
                >
                  Contact Number
                </label>
                <input
                  type="number"
                  placeholder="+91-8603678852"
                  id="contactNumber"
                  name="contactNumber"
                  onChange={handleChange}
                  class="block mt-0 w-full placeholder-gray-400/70  rounded-lg border border-[#08DA75] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                  value={userDetails?.contactNumber}
                />
              </div>
              <div class="p-3 pb-5 border border-[#08DA75]">
                <div class="flex flex-col sm:flex-row sm:flex-wrap -mx-2">
                  <div className="px-2 w-full sm:w-1/3">
                    <label
                      htmlFor="houseNo"
                      className="block text-black text-lg font-semibold"
                    >
                      House No
                    </label>
                    <input
                      type="text"
                      id="houseNo"
                      name="houseNo"
                      onChange={handleChange}
                      placeholder="1234"
                      className="block w-full rounded-lg border border-[#08DA75] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      value={userDetails?.address?.houseNo}
                    />
                    {errors.houseNo && (
                      <p className="text-red-500">{errors.houseNo}</p>
                    )}
                  </div>{" "}
                  <div class="px-2 w-full sm:w-1/3">
                    <label
                      htmlFor="floor"
                      class="block text-black text-lg font-semibold"
                    >
                      Floor
                    </label>
                    <input
                      type="text"
                      id="floor"
                      name="floor"
                      onChange={handleChange}
                      placeholder="2nd"
                      class="block w-full rounded-lg border border-[#08DA75] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      value={userDetails?.address?.floor}
                    />
                    {errors.floor && (
                      <p className="text-red-500">{errors.floor}</p>
                    )}
                  </div>{" "}
                  <div class="px-2 w-full sm:w-1/3">
                    <label
                      htmlFor="block"
                      class="block text-black text-lg font-semibold"
                    >
                      Block
                    </label>
                    <input
                      type="text"
                      id="block"
                      name="block"
                      onChange={handleChange}
                      placeholder="A"
                      class="block w-full rounded-lg border border-[#08DA75] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      value={userDetails?.address?.block}
                    />
                    {errors.block && (
                      <p className="text-red-500">{errors.block}</p>
                    )}
                  </div>{" "}
                  <div class="px-2 w-full sm:w-1/2">
                    <label
                      htmlFor="area"
                      class="block text-black text-lg font-semibold"
                    >
                      Area
                    </label>
                    <input
                      type="text"
                      id="area"
                      name="area"
                      onChange={handleChange}
                      placeholder="Green Park"
                      class="block w-full rounded-lg border border-[#08DA75] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      value={userDetails?.address?.area}
                    />
                    {errors.area && (
                      <p className="text-red-500">{errors.area}</p>
                    )}
                  </div>{" "}
                  <div class="px-2 w-full sm:w-1/2">
                    <label
                      htmlFor="pincode"
                      class="block text-black text-lg font-semibold"
                    >
                      Pincode
                    </label>
                    <input
                      type="text"
                      id="pinCode"
                      name="pinCode"
                      onChange={handleChange}
                      placeholder="110016"
                      class="block w-full rounded-lg border border-[#08DA75] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      value={userDetails?.address?.pinCode}
                    />
                    {errors.pinCode && (
                      <p className="text-red-500">{errors.pinCode}</p>
                    )}
                  </div>{" "}
                  <div class="px-2 w-full sm:w-1/2">
                    <label
                      htmlFor="district"
                      class="block text-black text-lg font-semibold"
                    >
                      District
                    </label>
                    <input
                      type="text"
                      id="district"
                      name="district"
                      onChange={handleChange}
                      placeholder="South Delhi"
                      class="block w-full rounded-lg border border-[#08DA75] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      value={userDetails?.address?.district}
                    />
                    {errors.district && (
                      <p className="text-red-500">{errors.district}</p>
                    )}
                  </div>{" "}
                  <div class="px-2 w-full sm:w-1/2">
                    <label
                      htmlFor="state"
                      class="block text-black text-lg font-semibold"
                    >
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      onChange={handleChange}
                      placeholder="Delhi"
                      class="block w-full rounded-lg border border-[#08DA75] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      value={userDetails?.address?.state}
                    />
                    {errors.state && (
                      <p className="text-red-500">{errors.state}</p>
                    )}
                  </div>{" "}
                </div>
              </div>
            </div>
            <div className="mt-10 w-100 items-center justify-center text-center">
              <button
                className="rounded-full justify-center px-9 py-2 bg-[#08DA73] text-white"
                onClick={handleUpdate}
              >
                Process
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
