import React, { useEffect, useRef, useState, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import Menu from "@mui/material/Menu";
import Modal from "react-responsive-modal";
import MenuItem from "@mui/material/MenuItem";
import { HiOutlineUserAdd } from "react-icons/hi";
import { FaAngleDown, FaRegTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdEdit } from "react-icons/md";
import UserContext from "./userContext";
import { Flex, Select } from "antd";
import { IoTrashOutline } from "react-icons/io5";
import { Popconfirm } from "antd";
import delete_button from "../assets/delete_button.svg";

export default function UserProfile()
{
  const { updateUser, updateUserEmail, updateUserimage } =
    useContext(UserContext);

  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [selectedFile, setSelectedFile] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [patientsList, setPatientsList] = useState([]);
  const [userImage, setUserImage] = useState();
  const [errors, setErrors] = useState({});
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [pinCodeError, setPinCodeError] = useState("");

  const onOpenModal = () => setOpen1(true);
  const onCloseModal = () => setOpen1(false);
  const [userDetails, setUserDetails] = useState({ name: "" });
  const [floorError, setFloorError] = useState("");
  const [newUser, setNewUser] = useState(false);
  const [contactNumber, setcontactNumber] = useState(null);
  const [mobileNumberError, setmobileNumberError] = useState("");

  const patientId = localStorage.getItem("patientId");
  const [patientDetails, setPatientDetails] = useState({
    name: "",
    age: "",
    bodyWeight: "",
    address: {
      houseNo: "",
      floor: "",
      block: "",
      area: "",
      pinCode: "",
      district: "",
      state: "",
    },
    patientPic: "",
  });

  const handleChange3 = (e) =>
  {
    let { name, value } = e.target;
    console.log("e.target value", value);

    // Check if the value consists of exactly 10 digits and does not include alphabetic characters
    if (/^\d{10}$/.test(value) && !/[A-Za-z]/.test(value))
    {
      setmobileNumberError(""); // Clear the error message if it's valid
      setcontactNumber(value);
    } else
    {
      setmobileNumberError("Please enter a valid 10-digit number");
    }

    console.log("contact number after setter function", contactNumber);
  };

  const handleNewProfilePictureClick = async () =>
  {
    // This will trigger the hidden file input to open the file dialog
    await fileInputRef.current.click();
  };

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

      const response = await fetch(`${baseUrl}/api/v1/upload_image`, {
        method: "POST",
        headers: {
          "x-auth-token": token,
        },
        body: formData,
      });

      if (!response.ok)
      {
        toast.error("Error uploading image.");
      }

      const data = await response.json();
      if (response.status === 500)
      {
        toast.error("file type not supported");
      }

      if (response.status === 413)
      {
        toast.error("file Size is too big try smaller image");
      }

      if (data.success === true)
      {
        console.log("Image uploaded successfully:", data);
        setUserImage(data.profilePicImageUrl);
        toast.success("Image uploaded successfully.");

        // Reset the file input
        setSelectedFile(null);
        fileInputRef.current.value = "";


      }

    }
  };


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
        if (data?.data?.newUser === true)
        {
          setNewUser(true);
        }
        setUserDetails(data?.data);
        console.log("usser name$$$$$$$", data?.data.name);
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

  const handleChange2 = (e) =>
  {
    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      // workingDays: e,
      ageType: e,
    }));
  };

  const handleChange1 = (e) =>
  {
    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      gender: e,
      // speciality: e,
    }));
  };

  const handleDelete = async () =>
  {
    const token = localStorage.getItem("token");
    const doctorId = localStorage.getItem("doctorId");
    if (!token)
    {
      console.error("No token found in local storage");
      localStorage.clear();
      navigate("/userlogin");
    }
    const response = await fetch(`${baseUrl}/api/v1/user/delete_user`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });
    const data = await response.json();

    if (data.success === true)
    {
      toast.success("User Deleted successfully");
      navigate("/userlogin");
    }
    console.log("DATA from response", data);
  };

  const handleChange = (e) =>
  {
    const { name, value } = e.target;
    if (name === "pinCode")
    {
      if (value.length !== 6)
      {
        setPinCodeError("Please enter a valid Pincode");
      } else
      {
        setPinCodeError(""); // Clear the error message if it's valid
      }
    }

    if (
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
      setUserDetails((prevUserDetails) => ({
        ...prevUserDetails,
        address: {
          ...prevUserDetails.address,
          [name]: value,
        },
      }));
    } else
    {
      setUserDetails((prevUserDetails) => ({
        ...prevUserDetails,
        [name]: value,
      }));
    }

    setIsEditing(true);
  };

  const handleUpdate = async (e) =>
  {
    e.preventDefault();
    const newUserDetails = {
      name: userDetails?.name,
      contactNumber: userDetails?.contactNumber,
      age: userDetails?.age,
      ageType: userDetails?.ageType,
      gender: userDetails?.gender,
      bodyWeight: userDetails?.bodyWeight,
      address: {
        houseNo: userDetails?.address?.houseNo,
        floor: userDetails?.address?.floor,
        block: userDetails?.address?.block,
        area: userDetails?.address?.area,
        pinCode: userDetails?.address?.pinCode,
        district: userDetails?.address?.district,
        state: userDetails?.address?.state,
      },
      userPic: userImage,
    };
    console.log("New User", newUserDetails);

    if (newUserDetails.gender === "")
    {
      toast.error("Please write gender");
    } else if (newUserDetails.age === "")
    {
      toast.error("Please write age");
    } else if (newUserDetails.ageType === "")
    {
      toast.error("Please write ageType");
    } else if (newUserDetails.bodyWeight === "")
    {
      toast.error("Please write bodyWeight");
    } else if (newUserDetails.name === "")
    {
      toast.error("Please write name");
    } else if (newUserDetails.contactNumber === "")
    {
      toast.error("Please write contactNumber");
    } else if (!newUserDetails.address?.pinCode)
    {
      toast.error("Please write Pincode");
    } else if (!/^\d{6}$/.test(newUserDetails.address?.pinCode))
    {
      toast.error("Please enter a valid 6-digit PIN code");
    } else if (newUserDetails.address?.district === "")
    {
      toast.error("Please write district");
    } else if (newUserDetails.address?.state === "")
    {
      toast.error("Please write state");
    } else
    {
      const token = localStorage.getItem("token");
      const doctorId = localStorage.getItem("doctorId");
      if (!token)
      {
        console.error("No token found in local storage");
        localStorage.clear();
        navigate("/userlogin");
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

      if (data.statusCode === 400)
      {
        toast.error("Please fill the details");
      }
      if (data.success === true)
      {
        toast.success("User details updated successfully");
        // console.log("Doctor updated successfully.");
        navigate("/doctorlistuser");
      }
      console.log("DATA from response", data);
      const response1 = await fetch(
        `${baseUrl}/api/v1/user/update_patient/${patientId}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
          body: JSON.stringify({
            name: userDetails?.name,
            age: userDetails?.age,
            ageType: userDetails?.ageType,
            gender: userDetails?.gender,
            bodyWeight: userDetails?.bodyWeight,
            address: {
              houseNo: userDetails?.address?.houseNo,
              floor: userDetails?.address?.floor,
              block: userDetails?.address?.block,
              area: userDetails?.address?.area,
              pinCode: userDetails?.address?.pinCode,
              district: userDetails?.address?.district,
              state: userDetails?.address?.state,
            },
            patientPic: userImage,
          }),
        }
      );
      const data1 = await response1.json();
      console.log("PATIENT UPDATED SUCCESSFULLY", data1);
    }
  };

  const AgeType = [
    { label: "Year", value: "Year" },
    { label: "Month", value: "Month" },
    { label: "Day", value: "Day" },
  ];

  const Gender = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ];

  console.log("User DETAILS", userDetails);
  updateUser(userDetails?.name);
  updateUserEmail(userDetails?.email);
  updateUserimage(userDetails?.userPic);

  console.log("NEW USER", userDetails?.newUser);

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
              onConfirm={handleDelete}
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
                {userImage || userDetails?.userPic ? (
                  <div
                    aria-controls="profile-pic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <img
                      src={userImage || userDetails?.userPic}
                      alt={userDetails?.name}
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

          <div className=" mt-3">
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
              value={userDetails?.gender}
              onChange={handleChange1}
              placeholder="Select Gender"
              style={{ overflowY: "auto" }}
              dropdownStyle={{
                maxHeight: "300px",
                overflowY: "auto",
              }}
            >
              {Gender.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
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
                value={userDetails.age}
                className="block mt-0 w-full placeholder-gray-400/70  rounded-lg border  bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
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
                value={userDetails?.ageType}
                onChange={handleChange2}
                placeholder="Select Age Type"
                style={{ overflowY: "auto" }}
                dropdownStyle={{
                  maxHeight: "300px",
                  overflowY: "auto",
                }}
              >
                {AgeType.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
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
              value={userDetails.bodyWeight}
              className="block w-full mt-0 placeholder-gray-400/70 rounded-lg border  bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            />
            {errors.totalExperience && (
              <p className="text-red-500">{errors.totalExperience}</p>
            )}
          </div>

          {/* <div style={{ display: 'flex', alignItems: "center", justifyContent: "center", marginTop: '20px' }}>
                        <button className="btn btn-primary border py-3 px-4 rounded-3xl text-white" style={{
                            backgroundColor: '#89CFF0'
                        }}
                            onClick={handleDelete}
                        >
                            Delete Profile
                        </button>
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
              value={userDetails.name}
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
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              required
              value={userDetails?.contactNumber}
              onChange={handleChange3}
              className="block  w-full placeholder-gray-400  rounded-lg border  bg-white px-5 py-2.5 text-gray-900  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            />
            {/* {errors.contactNumber && ( */}
            <p class=" text-red-500 ">{mobileNumberError}</p>
            {/* )} */}
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
                <div className="flex flex-row">
                  <div className="px-2 w-full sm:w-1/3 mt-3">
                    <input
                      type="text"
                      placeholder="House No."
                      id="houseNo"
                      name="houseNo"
                      onChange={handleChange}
                      value={userDetails?.address?.houseNo}
                      className="block w-full rounded-lg border  bg-gray-300 placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                  </div>
                  <div className="px-2 w-full sm:w-1/3 mt-3">
                    <input
                      type="text"
                      id="floor"
                      name="floor"
                      onChange={handleChange}
                      value={userDetails?.address?.floor}
                      placeholder="Floor"
                      className="block w-full rounded-lg border  bg-gray-300 placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                  </div>
                  <div className="px-2 w-full sm:w-1/3 mt-3">
                    <input
                      type="text"
                      id="block"
                      name="block"
                      onChange={handleChange}
                      placeholder="Block"
                      value={userDetails?.address?.block}
                      className="block w-full rounded-lg border  bg-gray-300 placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                    {errors.block && (
                      <p className="text-red-500">{errors.block}</p>
                    )}
                  </div>
                  <div className="px-2 w-full sm:w-1/2 mt-3">
                    <input
                      type="number" // Uncomment this line if you want it to be a number input
                      id="pinCode"
                      name="pinCode"
                      onChange={handleChange}
                      value={userDetails?.address?.pinCode}
                      placeholder="Pin Code"
                      className="block w-full rounded-lg border  bg-gray-300 placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                    {pinCodeError && (
                      <p className="text-red-500">{pinCodeError}</p>
                    )}
                  </div>
                </div>

                <div className="px-2 w-full mt-3 ">
                  <input
                    type="text"
                    id="area"
                    name="area"
                    onChange={handleChange}
                    value={userDetails?.address?.area}
                    placeholder="Area/Landmark"
                    className="block w-full rounded-lg border  bg-gray-300 placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                  />
                  {errors.area && <p className="text-red-500">{errors.area}</p>}
                </div>

                <div className="flex flex-row">
                  <div className="px-2 w-full sm:w-1/2 mt-3">
                    <input
                      type="text"
                      id="district"
                      name="district"
                      onChange={handleChange}
                      value={userDetails?.address?.district}
                      placeholder="District"
                      className="block w-full rounded-lg border  bg-gray-300 placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                    {errors.district && (
                      <p className="text-red-500">{errors.district}</p>
                    )}
                  </div>

                  <div className="px-2 w-full sm:w-1/2 mt-3">
                    <input
                      type="text"
                      id="state"
                      name="state"
                      onChange={handleChange}
                      value={userDetails?.address?.state}
                      placeholder="State"
                      className="block w-full rounded-lg border  bg-gray-300 placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
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
              Continue...
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
