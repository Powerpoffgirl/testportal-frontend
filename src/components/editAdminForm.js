import React, { useEffect, useRef, useState, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { HiOutlineUserAdd } from "react-icons/hi";
import { FaRegTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdEdit } from "react-icons/md";
import UserContext from "./userContext";
import { Flex, Select } from "antd";
import { Popconfirm } from "antd";
import delete_button from "../assets/delete_button.svg";

export default function EditAdminForm()
{
  let isTab = useMediaQuery({ query: "(max-width: 768px)" });
  const { updateUser, updateUserEmail, updateUserimage } =
    useContext(UserContext);
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [selectedFile, setSelectedFile] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);
  const [adminImage, setAdminImage] = useState();
  const [errors, setErrors] = useState({});
  const [userDetailsName, setUserDetailsName] = useState();
  const [userDetailsEmail, setUserDetailsEmail] = useState();
  const [userDetailsPic, setUserDetailsPic] = useState();
  const [pinCodeError, setPinCodeError] = useState("");
  const [contactNumber, setcontactNumber] = useState(null);
  const [doctorsList, setDoctorsList] = useState([]);

  const [mobileNumberError, setmobileNumberError] = useState("");

  const [adminDetails, setAdminDetails] = useState({
    permissions: {
      view: false,
      create: false,
      remove: false,
      edit: false,
    },
  });

  const handleFileSelect = async (event) =>
  {
    const file = event.target.files[0];
    if (file)
    {
      const token = localStorage.getItem("token");
      const doctorId = localStorage.getItem("doctorId");
      const formData = new FormData();
      formData.append("doctorPic", file);

      console.log("FORM DATA", formData);
      try
      {
        const response = await fetch(`${baseUrl}/api/v1/upload_image`, {
          method: "POST",
          headers: {
            "x-auth-token": token,
          },
          body: formData,
        });

        if (!response.ok)
        {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Image uploaded successfully:", data);
        setAdminImage(data.profilePicImageUrl);
        toast.success("Image uploaded successfully.");

        // Reset the file input
        setSelectedFile(null);
        fileInputRef.current.value = "";
      } catch (error)
      {
        console.error("Error uploading image:", error);
        toast.error("Error uploading image. Please try again.");
      }
    }
  };

  const handleNewProfilePictureClick = async () =>
  {
    // This will trigger the hidden file input to open the file dialog
    await fileInputRef.current.click();
  };

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
        const response = await fetch(`${baseUrl}/api/v1/admin/get_profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token, // Replace with your actual token from the previous session
          },
        });

        const data = await response.json();
        console.log("DATA from response", data);
        setUserDetailsName(data?.data.name);
        setUserDetailsEmail(data?.data.email);
        setUserDetailsPic(data?.data.doctorPic);
        console.log("usser name$$$$$$$", data?.data.name);
      } catch (error)
      {
        console.error("There was an error verifying the OTP:", error);
      }
    };
    fetchUserDetails();
  }, []);

  const Daysdropdown = [
    { label: "Select Days", value: "" },
    { label: "Monday", value: "Monday" },
    { label: "Tuesday", value: "Tuesday" },
    { label: "Wednesday", value: "Wednesday" },
    { label: "Thursday", value: "Thursday" },
    { label: "Friday", value: "Friday" },
    { label: "Saturday", value: "Saturday" },
    { label: "Sunday", value: "Sunday" },
  ];
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [open1, setOpen1] = useState(false);
  const onCloseModal = () => setOpen1(false);

  useEffect(() =>
  {
    const fetchDoctorDetails = async () =>
    {
      try
      {
        const token = localStorage.getItem("token");
        const doctorId = localStorage.getItem("doctorId");
        if (!token)
        {
          console.error("No token found in local storage");
          localStorage.clear();
          navigate(`/adminlogin`);
        }
        const response = await fetch(`${baseUrl}/api/v1/admin/get_profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token, // Replace with your actual token from the previous session
          },
        });

        const data = await response.json();
        console.log("DATA from response", data?.data);
        setDoctorDetails(data?.data);
      } catch (error)
      {
        console.error("There was an error verifying the OTP:", error);
      }
    };
    fetchDoctorDetails();
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

  // const validateField = (name, value) =>
  // {
  //     switch (name)
  //     {
  //         case "name":
  //             return value ? "" : "Name is required.";
  //         case "email":
  //             return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  //                 ? ""
  //                 : "Email is not valid.";
  //         case "contactNumber":
  //             return value.length > 0 && value.length === 10
  //                 ? ""
  //                 : "Contact number is required or Add valid 10 Digit Number.";
  //         case "houseNo":
  //             return /^[a-zA-Z\s]+$/.test(value) && value ? "" : "houseNo is required  ";
  //         case "floor":
  //             return /^[a-zA-Z\s]+$/.test(value) && value ? "" : "floor is required";
  //         case "block":
  //             return /^[a-zA-Z\s]+$/.test(value) && value ? "" : "Block is required  ";
  //         case "area":
  //             return /^[a-zA-Z\s]+$/.test(value) && value ? "" : "Area is required and must be a string ";
  //         case "pinCode":
  //             return /^\d{6}$/.test(value) ? "" : "Pincode must be exactly 6 digits.";
  //         case "district":
  //             return /^[a-zA-Z\s]+$/.test(value) && value ? "" : "District is required and must be a string ";
  //         case "state":
  //             return /^[a-zA-Z\s]+$/.test(value) && value ? "" : "State is required and must be a string ";
  //         case "workHourFrom":
  //             // Assuming time in HH:MM format, adjust as needed
  //             return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)
  //                 ? ""
  //                 : "Invalid start time.";
  //         case "workHourTo":
  //             return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)
  //                 ? ""
  //                 : "Invalid end time.";
  //         // Add more cases as needed for other fields
  //         default:
  //             return "";
  //     }
  // };

  const handleChange = (e) =>
  {
    const { name, value } = e.target;

    if (name === "pinCode")
    {
      if (/^\d{6}$/.test(value) && !/[A-Za-z]/.test(value))
      {
        setPinCodeError(""); // Clear the error message if it's a valid 6-digit number without alphabetic characters
      } else
      {
        setPinCodeError("Please enter a valid Pincode");
      }
    }
    if (name === "contactNumber")
    {
      if (/^\d{10}$/.test(value) && !/[A-Za-z]/.test(value))
      {
        setmobileNumberError("");
      } else
      {
        setmobileNumberError("Please enter a valid Number");
      }
    }

    // const error = validateField(name, value);
    // setErrors({ ...errors, [name]: error });

    if (name === "workingDays")
    {
      setDoctorDetails((prevDoctorDetails) => ({
        ...prevDoctorDetails,
        workingDays: [...prevDoctorDetails.workingDays, value],
      }));
    } else if (name === "workHourFrom" || name === "workHourTo")
    {
      setDoctorDetails((prevDoctorDetails) => ({
        ...prevDoctorDetails,
        workingHours: {
          ...prevDoctorDetails.workingHours,
          [name]: value,
        },
      }));
    } else if (
      [
        "houseNo",
        "floor",
        "block",
        "area",
        "pinCode",
        "district",
        "state",
      ].includes(name)
    )
    {
      setDoctorDetails((prevDoctorDetails) => ({
        ...prevDoctorDetails,
        address: {
          ...prevDoctorDetails.address,
          [name]: value,
        },
      }));
    } else
    {
      setDoctorDetails((prevDoctorDetails) => ({
        ...prevDoctorDetails,
        [name]: value,
      }));
    }
    setIsEditing(true);
  };

  const handleUpdate = async (e) =>
  {
    e.preventDefault();
    // Check if the token exists
    const newDoctorDetails = {
      name: doctorDetails?.name,
      // email: doctorDetails.email,
      // contactNumber: doctorDetails.contactNumber,
      totalExperience: doctorDetails?.totalExperience,
      speciality: doctorDetails?.speciality,
      degree: doctorDetails?.degree,
      address: {
        houseNo: doctorDetails?.address?.houseNo,
        floor: doctorDetails?.address?.floor,
        block: doctorDetails?.address?.block,
        area: doctorDetails?.address?.area,
        pinCode: doctorDetails?.address?.pinCode,
        district: doctorDetails?.address?.district,
        state: doctorDetails?.address?.state,
      },
      adminPic: adminImage,
    };
    if (doctorDetails.name === "")
    {
      toast.error("Please write name");
    } else if (doctorDetails.email === "")
    {
      toast.error("Please write email");
    } else if (doctorDetails.contactNumber === "")
    {
      toast.error("Please write contact number");
    } else if (doctorDetails.address.pinCode === "")
    {
      toast.error("Please write Pincode");
    } else if (doctorDetails.address.district === "")
    {
      toast.error("Please write district");
    } else if (doctorDetails.address.state === "")
    {
      toast.error("Please write state");
    } else
    {
      const token = localStorage.getItem("token");
      const doctorId = localStorage.getItem("doctorId");
      const isEmpty = Object.values(newDoctorDetails).some(
        (value) => value === ""
      );

      if (isEmpty || isEditing === false)
      {
        toast.error("Please fill the fields or Update");
        setIsEditing(false);
        return;
      }

      // if (isEditing === true)
      // {

      //     toast.success('Form submitted successfully!');

      // }

      if (!token)
      {
        console.error("No token found in local storage");
        localStorage.clear();
        navigate(`/adminlogin`);
      }
      const response = await fetch(`${baseUrl}/api/v1/admin/update_profile`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(newDoctorDetails),
      });
      const data = await response.json();

      if (data.statusCode === 400)
      {
        toast.error("Please fill the details");
      }

      if (data.success === true)
      {
        console.log("Doctor updated successfully.");
        toast.success("Form submitted successfully!");
        // navigate("/otp")
        // localStorage.setItem("id", data.data._id)
      }
      console.log("DATA from response", data);
    }
  };

  console.log("DOCTOR DETAILS", doctorDetails);

  updateUser(userDetailsName);
  updateUserEmail(userDetailsEmail);
  updateUserimage(userDetailsPic);

  return (
    <>
      <div className="flex flex-col -ml-7  lg:flex-row">
        {/* --------------left-------------- */}
        <div className="flex flex-col border bg-white lg:w-1/4 py-6 px-3  ml-5 my-5  ">
          <div
            className=" flex items-end justify-end w-100% "
            style={{ marginRight: -40, marginTop: -20 }}
          >
            <Popconfirm
              title="Delete the Profile"
              description="Are you sure to delete this Profile?"
              okText="Delete"
              okType="danger"
              cancelText="No"
              className="rounded-full px-4 sm:px-8 py-1 sm:py-2 text-white text-xs sm:text-sm"
            // onConfirm={handleDelete}
            >
              <button onClick={onCloseModal}>
                <img src={delete_button} alt="df" class="w-8 mb-1"></img>
              </button>
            </Popconfirm>
          </div>
          <div className="mx-auto my-2">
            <div className=" ">
              <div
                className=" border w-36 mx-auto rounded-full"
                style={{ backgroundColor: "#B1DAED" }}
              >
                {adminImage || doctorDetails?.adminPic ? (
                  <div
                    aria-controls="profile-pic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <img
                      src={adminImage || doctorDetails?.adminPic}
                      alt="Avatar"
                      style={{
                        borderRadius: "50%",
                        width: "145px",
                        height: "145px",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                ) : (
                  <PermIdentityOutlinedIcon
                    style={{
                      width: "auto",
                      height: "auto",
                      color: "white",
                      cursor: "pointer",
                    }}
                    aria-controls="profile-pic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  />
                )}
              </div>
            </div>

            <div className="flex flex-row mt-5 mb-3">
              <p className="block text-black text-lg font-semibold ">
                <input
                  id="files"
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleFileSelect}
                />
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
                {/* <FaAngleDown /> */}
              </p>

              <div style={{ backgroundColor: "#89CFF0" }}>
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
                    onClick={() =>
                    {
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
            </div>
          </div>
          <hr />

          {/* <div className=" mt-3">
            <label
              for="total-experience"
              className="block text-black text-lg font-semibold"
            >
              Gender
            </label>
            <Select
              className="border rounded-lg h-11 block w-full mt-0 placeholder-gray-400/70   bg-white  text-gray-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              popupClassName="no-border-dropdown-menu"
              id="gender"
              name="gender"
              value={doctorDetails?.gender}
              // onChange={handleChange1}
              placeholder="Select Gender"
              style={{ overflowY: "auto" }}
              dropdownStyle={{
                maxHeight: "300px",
                overflowY: "auto",
              }}
            >
        
            </Select>
            {errors.totalExperience && (
              <p className="text-red-500">{errors.totalExperience}</p>
            )}
          </div>

          <div className="flex flex-row gap-2">
            <div className="mt-3 flex flex-col w-1/2">
              <label
                for="degree"
                className="block text-black text-lg font-semibold"
              >
                Age
              </label>
              <input
                type="text"
                id="age"
                name="age"
                onChange={handleChange}
                value={doctorDetails?.age}
                className="block mt-0 w-full placeholder-gray-400/70  rounded-lg border  bg-white px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              />
              {errors.degree && <p className="text-red-500">{errors.degree}</p>}
            </div>
            <div className="mt-3 flex flex-col w-1/2">
              <label
                for="degree"
                className="block text-black text-lg font-semibold"
              >
                Age Type
              </label>
              <Select
                className="border rounded-lg h-11"
                popupClassName="no-border-dropdown-menu"
                id="ageType"
                name="ageType"
            
                placeholder="Select Age Type"
                style={{ overflowY: "auto" }}
                dropdownStyle={{
                  maxHeight: "300px",
                  overflowY: "auto",
                }}
              >
             
              </Select>
              {errors.degree && <p className="text-red-500">{errors.degree}</p>}
            </div>
          </div>

          <div className=" mt-3">
            <label
              for="total-experience"
              className="block text-black text-lg font-semibold"
            >
              Body Weight
            </label>
            <input
              type="text"
              id="bodyWeight"
              name="bodyWeight"
              onChange={handleChange}
              value={doctorDetails?.bodyWeight}
              className="block w-full mt-0 placeholder-gray-400/70 rounded-lg border  bg-white px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            />
            {errors.totalExperience && (
              <p className="text-red-500">{errors.totalExperience}</p>
            )}
          </div> */}

        </div>

        {/* ----------------------------------right---------------------------------- */}
        <div
          div
          className="border bg-white flex flex-col lg:w-3/4 p-6 my-5 mx-3"
        >
          <p className="text-3xl ">Personal Information</p>
          <hr className="border my-2 " />
          {/* -------name------- */}
          <div className="mt-3">
            <label
              for="name"
              className="block text-black text-lg font-semibold"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              value={doctorDetails?.name}
              className="block  w-full placeholder-gray-400  rounded-lg border  bg-white px-5 py-2.5 text-gray-900  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>

          {/* -----------contact----------- */}
          <div className="mt-3">
            <label
              for="contact"
              className="block text-black text-lg font-semibold"
            >
              Contact Number
            </label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              onChange={handleChange}
              onInput={(e) =>
              {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              }}
              value={doctorDetails?.contactNumber}
              className="block  w-full placeholder-gray-400  rounded-lg border  bg-white px-5 py-2.5 text-gray-900  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            />
            {/* {errors.contactNumber && ( */}
            <p class=" text-red-500 ">{mobileNumberError}</p>
            {/* )} */}
          </div>

          {/* -----------email----------- */}
          <div className="mt-3">
            <label
              for="email"
              className="block text-black text-lg font-semibold"
            >
              email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={handleChange}
              value={doctorDetails?.email}
              className="block  w-full placeholder-gray-400  rounded-lg border  bg-white px-5 py-2.5 text-gray-900  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            />
            {errors.contactNumber && (
              <p className="text-red-500">{errors.contactNumber}</p>
            )}
          </div>

          <div className="flex flex-row items-start pt-4 gap-4">
            <div className="flex flex-col mr-2 ">
              <label
                style={{ marginRight: "10px" }}
                className="mx-2 text-lg font-normal text-black font-lato font-semibold"
                htmlFor="Permission"
              >
                Permission
              </label>
            </div>

            <div
              className="flex flex-row flex-grow "
              style={{ justifyContent: "space-around" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: "10px",
                }}
              >
                <label style={{ marginRight: "15px" }}>View:</label>
                <input
                  type="checkbox"
                  name="view"
                  checked={doctorDetails?.permissions.view}
                  onChange={handleChange}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: "10px",
                }}
              >
                <label style={{ marginRight: "15px" }}>Create:</label>
                <input
                  type="checkbox"
                  name="create"
                  checked={doctorDetails?.permissions.create}
                  onChange={handleChange}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: "10px",
                }}
              >
                <label style={{ marginRight: "15px" }}>Remove:</label>
                <input
                  type="checkbox"
                  name="remove"
                  checked={doctorDetails?.permissions.remove}
                  onChange={handleChange}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: "10px",
                }}
              >
                <label style={{ marginRight: "15px" }}>Edit:</label>
                <input
                  type="checkbox"
                  name="edit"
                  checked={doctorDetails?.permissions.edit}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          {/* -----------address----------- */}
          <div className="mt-3">
            <label
              for="houseNo"
              className="block text-black text-lg font-semibold"
            >
              Address
            </label>
            <div className="p-3 pb-5 border shadow-lg rounded-md">
              <div className="flex flex-col ">
                <div className="flex lg:flex-row flex-col">
                  <div class="flex flex-row ">
                    <div className="px-2 lg:w-1/2  mt-3">

                      <input
                        type="text"
                        placeholder="House No."
                        id="houseNo"
                        name="houseNo"
                        value={doctorDetails?.address?.houseNo}
                        onChange={handleChange}
                        className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      />
                    </div>
                    <div className="px-2 lg:w-1/2 mt-3">
                      <input
                        type="text"
                        id="floor"
                        name="floor"
                        onChange={handleChange}
                        value={doctorDetails?.address?.floor}
                        placeholder="Floor"
                        className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      />
                    </div>
                  </div>
                  <div class="flex flex-row">
                    <div className="px-2 lg:w-1/2 mt-3">
                      <input
                        type="text"
                        id="block"
                        name="block"
                        value={doctorDetails?.address?.block}
                        onChange={handleChange}
                        placeholder="Block"
                        className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      />
                      {errors.block && (
                        <p className="text-red-500">{errors.block}</p>
                      )}
                    </div>
                    <div className="px-2 lg:w-1/2 mt-3">
                      <input
                        type="text"
                        id="pinCode"
                        name="pinCode"
                        value={doctorDetails?.address?.pinCode}
                        onChange={handleChange}
                        onInput={(e) =>
                        {
                          e.target.value = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                        }}
                        placeholder="Pin Code"
                        className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      />
                      {pinCodeError && (
                        <p className="text-red-500">{pinCodeError}</p>
                      )}
                    </div>
                  </div>
                </div>
                {/* ----------------------------area/landmark---------------------------- */}
                <div className="px-2 w-full mt-3 ">

                  <input
                    type="text"
                    id="area"
                    name="area"
                    value={doctorDetails?.address?.area}
                    placeholder="Area/Landmark"
                    className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                  />


                  {errors.area && <p className="text-red-500">{errors.area}</p>}
                </div>

                <div className="flex flex-row">
                  <div className="px-2 w-1/2 mt-3">

                    <input
                      type="text"
                      id="district"
                      name="district"
                      value={doctorDetails?.address?.district}
                      placeholder="District"
                      className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />


                    {errors.district && (
                      <p className="text-red-500">{errors.district}</p>
                    )}
                  </div>

                  <div className="px-2 w-1/2 mt-3">
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={doctorDetails?.address?.state}
                      placeholder="State"
                      className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                    {errors.state && (
                      <p className="text-red-500">{errors.state}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row-reverse mt-5 my-2">
            <button
              className="btn btn-primary border py-3 px-4 rounded-3xl text-white"
              style={{
                backgroundColor: "#89CFF0",
              }}
              onClick={handleUpdate}
            >
              Process
            </button>
          </div>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}
