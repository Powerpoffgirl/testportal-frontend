import React, { useRef, useState, useEffect } from "react";
import AdminHeader from "./adminHeader";

import AdminSidebar from "./adminSidebar";
import { useNavigate } from "react-router-dom";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { HiOutlineUserAdd } from "react-icons/hi";
import { FaRegTrashAlt } from "react-icons/fa";
import { Select } from "antd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditLabFormAdmin() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [doctorImage, setDoctorImage] = useState();
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [contactNumber, setcontactNumber] = useState(null);
  const [mobileNumberError, setmobileNumberError] = useState("");
  const [pinCodeError, setPinCodeError] = useState("");
  const [doctorsList, setDoctorsList] = useState([]);
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [doctorDetails, setDoctorDetails] = useState({
    ownerName: "",
    labName: "",
    registrationNo: "",
    licenseNo: "",
    email: "",
    contactNumber: "",
    // consultationFee: "",
    about: "",
    workingDays: [],
    workingHours: {
      workHourFrom: "",
      workHourTo: "",
    },
    totalExperience: "",
    // availabletest: [],
    certification: [],
    address: {
      houseNo: "",
      pinCode: "",
      district: "",
      state: "",
    },
    labPic: "",
  });

  const [isHovered, setIsHovered] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);
  const [houseNoError, setHouseNoError] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const adminId = localStorage.getItem("adminId");
        if (!token) {
          console.error("No token found in local storage");
          localStorage.clear();
          navigate(`/adminlogin`);
        }
        const response = await fetch(
          `${baseUrl}/api/v1/admin/get_lab/${adminId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token, // Replace with your actual token from the previous session
            },
          }
        );

        const data = await response.json();
        console.log("DATA from USE EFFECT response", data?.data);
        setDoctorDetails(data?.data);
        setQrCodeUrl(data.data.qrCodeUrl);
        if (data.message === "Permission denied") {
          toast.error("Permission Denied");
        }
      } catch (error) {
        console.error("There was an error verifying the OTP:", error);
      }
    };
    fetchDoctorDetails();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const token = localStorage.getItem("token");
      const doctorId = localStorage.getItem("doctorId");
      const formData = new FormData();
      formData.append("doctorPic", file);

      console.log("FORM DATA", formData);
      try {
        const response = await fetch(`${baseUrl}/api/v1/upload_image`, {
          method: "POST",
          headers: {
            "x-auth-token": token,
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Image uploaded successfully:", data);
        setDoctorImage(data.profilePicImageUrl);
        toast.success("Image uploaded successfully.");

        // Reset the file input
        setSelectedFile(null);
        fileInputRef.current.value = "";
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Error uploading image. Please try again.");
      }
    }
  };

  const handleNewProfilePictureClick = async () => {
    // This will trigger the hidden file input to open the file dialog
    await fileInputRef.current.click();
  };

  const handleRemoveProfilePicture = () => {
    handleClose();
  };

  const Daysdropdown = [
    { label: "Monday", value: "Monday" },
    { label: "Tuesday", value: "Tuesday" },
    { label: "Wednesday", value: "Wednesday" },
    { label: "Thursday", value: "Thursday" },
    { label: "Friday", value: "Friday" },
    { label: "Saturday", value: "Saturday" },
    { label: "Sunday", value: "Sunday" },
  ];
  const IndianDoctorCertifications = [
    "NOC fire deparment & municipality-> Garbage disposal",
    " NABL certified",
    "ISO 15189 Certification ",
    "ISO 17025 is for General Labs and Calibration agencies. ",
  ];

  // const SpecialtiesDropdown = IndianDoctorSpecialties?.map((specialty) => ({
  //   label: specialty,
  //   value: specialty,
  // }));

  const CertificationDropdown = IndianDoctorCertifications?.map(
    (certification) => ({
      label: certification,
      value: certification,
    })
  );

  const TimeDropdown = [
    { label: "Select Time", value: "" },
    ...Array.from({ length: 24 }, (v, i) => {
      const hour = i.toString().padStart(2, "0");
      return { label: `${hour}:00`, value: `${hour}:00` };
    }),
  ];

  const handleChange1 = (e) => {
    setDoctorDetails((prevDoctorDetails) => ({
      ...prevDoctorDetails,
      workingDays: e,
    }));
  };
  const handleChange2 = (e) => {
    setDoctorDetails((prevDoctorDetails) => ({
      ...prevDoctorDetails,
      speciality: e,
    }));
  };

  const handleChange = (e) => {
    console.log("E value", e);
    const { name, value } = e.target;

    if (name === "pinCode") {
      if (/^\d{6}$/.test(value) && !/[A-Za-z]/.test(value)) {
        setPinCodeError(""); // Clear the error message if it's a valid 6-digit number without alphabetic characters
      } else {
        setPinCodeError("Please enter a valid Pincode");
      }
    }

    if (name === "contactNumber") {
      if (/^\d{10}$/.test(value) && !/[A-Za-z]/.test(value)) {
        setmobileNumberError("");
      } else {
        setmobileNumberError("Please enter a valid Number");
      }
    }

    setDoctorDetails((prevDoctorDetails) => ({
      ...prevDoctorDetails,
      doctorPic: doctorImage,
    }));

    if (name === "workHourFrom" || name === "interval") {
      setDoctorDetails((prevDoctorDetails) => ({
        ...prevDoctorDetails,
        workingHours: {
          ...prevDoctorDetails.workingHours,
          [name]: value,
        },
      }));
    } else if (name === "workHourTo") {
      if (doctorDetails.workingHours.workHourFrom > value) {
        console.log(doctorDetails.workingHours.workHourFrom, "VAALUE", value);
        toast.error("End time should be greater than the start time.");
      } else {
        setDoctorDetails((prevDoctorDetails) => ({
          ...prevDoctorDetails,
          workingHours: {
            ...prevDoctorDetails.workingHours,
            [name]: value,
          },
        }));
      }
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
    ) {
      if ("houseNo" === name) {
        if (value.length > 5) {
          setHouseNoError("Max 10 chars.");
        } else {
          setHouseNoError("");
          setDoctorDetails((prevDoctorDetails) => ({
            ...prevDoctorDetails,
            address: {
              ...prevDoctorDetails.address,
              [name]: value,
            },
          }));
        }
      }
      setDoctorDetails((prevDoctorDetails) => ({
        ...prevDoctorDetails,
        address: {
          ...prevDoctorDetails.address,
          [name]: value,
        },
      }));
    } else {
      setDoctorDetails((prevDoctorDetails) => ({
        ...prevDoctorDetails,
        [name]: value,
      }));
    }
    setIsEditing(true);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    // navigate("/labverifyotp");
    // Check if the token exists
    if (doctorDetails.name === "") {
      toast.error("Please write name");
    } else if (doctorDetails.registrationNo === "") {
      toast.error("Please write registration number");
    } else if (doctorDetails.email === "") {
      toast.error("Please write email");
    } else if (doctorDetails.contactNumber === "") {
      toast.error("Please write contact number");
    } else if (doctorDetails.totalExperience === "") {
      toast.error("Please write total experience");
    } else if (doctorDetails.degree === "") {
      toast.error("Please write degree");
    } else if (doctorDetails.address.pinCode === "") {
      toast.error("Please write Pincode");
    } else if (doctorDetails.address.district === "") {
      toast.error("Please write district");
    } else if (doctorDetails.address.state === "") {
      toast.error("Please write state");
    } else {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in local storage");
        localStorage.clear();
        navigate(`/adminlogin`);
      }

      const isEmpty = Object.values(doctorDetails).some(
        (value) => value === ""
      );

      // if (isEmpty || isEditing === false) {
      //   toast.error("Please fill the fields or Update");
      //   setIsEditing(false);
      //   return;
      // }
      const adminId = localStorage.getItem("adminId");

      const response = await fetch(
        `${baseUrl}/api/v1/admin/update_lab/${adminId}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
          body: JSON.stringify(doctorDetails),
        }
      );
      const data = await response.json();

      if (data.message === "Mobile number is already registered") {
        toast.error("Mobile number is already registered");
      }
      if (data.statusCode === 400) {
        toast.error("Please fill the details");
      }

      if (data.message === "Permission denied") {
        toast.error("Permission Denied");
      }

      if (data.statusCode === 500) {
        toast.error("Enter Unique Values or Values already Exist ");
      }

      if (data.success === true) {
        console.log("-----------------ID------------------", data?.data?._id);
        localStorage.setItem("id", data?.data?._id);
        navigate("/otp", {
          state: { contactNumber: doctorDetails.contactNumber },
        });
      }
      console.log("DATA from response", data);
    }

    const handleDelete = (workingDay) => {
      console.log("delete", workingDay);
      const days = doctorDetails.workingDays.filter(
        (doctorDetail) => doctorDetail !== workingDay
      );

      // Assuming you want to update the doctorDetails state after filtering
      setDoctorDetails({
        ...doctorDetails,
        workingDays: days,
      });
    };
  };

  console.log("DOCTOR DETAILS", doctorDetails);

  return (
    <>
      <div className="flex flex-col -ml-7  lg:flex-row">
        {/* --------------left-------------- */}
        <div className="flex flex-col border bg-white lg:w-1/4 py-6 px-3  ml-5 my-5  ">
          <div className="mx-auto my-2">
            <div className=" ">
              <div
                className=" border w-36 mx-auto rounded-full"
                style={{ backgroundColor: "#B1DAED" }}
              >
                {doctorImage || doctorDetails?.labPic ? (
                  <div
                    aria-controls="profile-pic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <img
                      src={doctorImage || doctorDetails?.doctorPic}
                      alt={doctorDetails?.name}
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
            </div>
          </div>
          <hr />

          <div className="mt-4">
            <p className="block text-black text-lg font-semibold">
              Working Days<span className="text-red-500">*</span>{" "}
            </p>
            <div className="block w-full mt-0 rounded-lg border border-[#89CFF0] bg-white text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
              <Select
                className="w-full border-none h-10 overflow-y-scroll"
                mode="multiple"
                id="workingDays"
                name="workingDays"
                value={doctorDetails?.workingDays}
                onChange={handleChange1}
                placeholder="Mon-Fri"
                // Add other props as needed
              >
                {Daysdropdown.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>

          <div className="mt-3">
            <p className="block text-black text-lg font-semibold">
              Working Hours<span className="text-red-500">*</span>{" "}
            </p>
            <div className="flex flex-row-ml-2 mr-2">
              <div className="flex ">
                <select
                  className="mx-2 block w-full mt-0 placeholder-gray-400/70 rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                  name="workHourFrom"
                  value={doctorDetails?.workingHours?.workHourFrom}
                  onChange={handleChange}
                >
                  {TimeDropdown.map((time) => (
                    <option key={time.value} value={time.value}>
                      {time.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className=" mt-2 text-lg font-medium">to</div>
              <div className="flex">
                <select
                  className="mx-2 block w-full mt-0 placeholder-gray-400/70 rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                  name="workHourTo"
                  value={doctorDetails?.workingHours?.workHourTo}
                  onChange={handleChange}
                >
                  {TimeDropdown.map((time) => (
                    <option key={time.value} value={time.value}>
                      {time.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className=" mt-3">
            <label
              for="total-experience"
              className="block text-black text-lg font-semibold"
            >
              Total Experience<span className="text-red-500"></span>{" "}
              <span style={{ fontSize: "12px", color: "gray" }}>
                [ In yrs ex: 1, 2, 3... ]
              </span>
            </label>
            <input
              type="text"
              id="total-experience"
              name="totalExperience"
              value={doctorDetails?.totalExperience}
              onChange={handleChange}
              className="block w-full mt-0 placeholder-gray-400/70 rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            />
            {errors.totalExperience && (
              <p className="text-red-500">{errors.totalExperience}</p>
            )}
          </div>

          <div>
            <label for="degree" class="block text-black text-lg font-semibold">
              Degree
            </label>
            <input
              type="text"
              id="degree"
              name="degree"
              value={doctorDetails?.degree}
              onChange={handleChange}
              class="block mt-0 w-full placeholder-gray-400/70  rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            />
          </div>

          <div className="mt-3">
            <label
              htmlFor="certification" // Changed for to htmlFor as per JSX conventions
              className="block text-black text-lg font-semibold"
            >
              Certification<span className="text-red-500"></span>
            </label>
            <style>
              {`
          .ant-select-selector {
            border-color: white !important;
          }
        `}
            </style>
            <div className="border rounded-lg border-[#89CFF0]">
              <Select
                className="w-full border-none h-10 overflow-y-scroll"
                id="certification" // Changed id and name to match the certification context
                name="certification"
                value={doctorDetails?.certification}
                mode="multiple"
                onChange={handleChange2}
              >
                {CertificationDropdown.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>

          {/* <div className="mt-3">
            <label
              for="degree"
              className="block text-black text-lg font-semibold"
            >
              Certification<span className="text-red-500">*</span>{" "}
            </label>
            <input
              type="text"
              id="degree"
              name="degree"
              onChange={handleChange}
              className="block mt-0 w-full placeholder-gray-400/70  rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            />

            <Select>
              {CertificationDropdown.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
            {errors.degree && <p className="text-red-500">{errors.degree}</p>}
          </div> */}
        </div>

        {/* ----------------------------------right---------------------------------- */}
        <div className="border bg-white flex flex-col lg:w-3/4 p-6 my-5 mx-3">
          <p className="text-3xl ">Personal Information</p>
          <hr className="border my-2 " />
          {/* -------name------- */}

          <div className="flex flex-row">
            <div className="px-2 w-full sm:w-1/2 mt-3">
              <label
                for="name"
                className="block text-black text-lg font-semibold"
              >
                Owner Name<span className="text-red-500">*</span>{" "}
              </label>
              <input
                type="text"
                placeholder=""
                id="name"
                name="name"
                value={doctorDetails?.ownerName}
                onChange={handleChange}
                className="block  w-full placeholder-gray-400  rounded-lg border  bg-white px-5 py-2.5 text-gray-900  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>
            <div className="px-2 w-full sm:w-1/2 mt-3">
              <label
                for="name"
                className="block text-black text-lg font-semibold"
              >
                Licence Number<span className="text-red-500">*</span>{" "}
              </label>
              <input
                type="text"
                id="licenseNo"
                name="licenseNo"
                onChange={handleChange}
                value={doctorDetails?.licenseNo}
                className="block  w-full placeholder-gray-400  rounded-lg border  bg-white px-5 py-2.5 text-gray-900  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              />
              {/* {errors.name && <p className="text-red-500">{errors.name}</p>} */}
            </div>
          </div>

          <div className="flex flex-row">
            <div className="px-2 w-full sm:w-1/2 mt-3">
              <label
                for="name"
                className="block text-black text-lg font-semibold"
              >
                Lab Name<span className="text-red-500">*</span>{" "}
              </label>
              <input
                type="text"
                placeholder=""
                id="name"
                name="name"
                value={doctorDetails?.labName}
                onChange={handleChange}
                className="block  w-full placeholder-gray-400  rounded-lg border  bg-white px-5 py-2.5 text-gray-900  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>
            <div className="px-2 w-full sm:w-1/2 mt-3">
              <label
                for="name"
                className="block text-black text-lg font-semibold"
              >
                Registration Number<span className="text-red-500">*</span>{" "}
              </label>
              <input
                type="text"
                id="registrationNo"
                name="registrationNo"
                value={doctorDetails?.registrationNo}
                onChange={handleChange}
                className="block  w-full placeholder-gray-400  rounded-lg border  bg-white px-5 py-2.5 text-gray-900  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              />
              {/* {errors.name && <p className="text-red-500">{errors.name}</p>} */}
            </div>
          </div>
          {/* ------------email------------ */}
          <div className="flex flex-row">
            <div className="px-2 w-full sm:w-1/2 mt-3">
              <label
                for="email"
                className="block text-black text-lg font-semibold"
              >
                Email<span className="text-red-500">*</span>{" "}
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={doctorDetails?.email}
                placeholder=""
                onChange={handleChange}
                className="block  w-full placeholder-gray-400  rounded-lg border  bg-white px-5 py-2.5 text-gray-900  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>
            <div className="px-2 w-full sm:w-1/2 mt-3">
              <label
                for="contact"
                className="block text-black text-lg font-semibold"
              >
                Contact Number<span className="text-red-500">*</span>{" "}
              </label>
              <input
                type="text"
                placeholder=""
                id="contactNumber"
                name="contactNumber"
                value={doctorDetails?.contactNumber}
                onChange={handleChange}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }}
                className="block  w-full placeholder-gray-400  rounded-lg border  bg-white px-5 py-2.5 text-gray-900  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              />
              <p class=" text-red-500 ">{mobileNumberError}</p>

              {/* {errors.name && <p className="text-red-500">{errors.name}</p>} */}
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
                <div className="flex flex-row">
                  <div className="px-2 w-1/2 mt-3">
                    {doctorsList?.length === 0 ||
                    doctorDetails?.newDoctor === true ? (
                      <input
                        type="text"
                        placeholder="House No./Floor/Block"
                        id="houseNo"
                        name="houseNo"
                        onChange={handleChange}
                        value={doctorDetails?.address?.houseNo}
                        className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      />
                    ) : (
                      <input
                        type="text"
                        placeholder="House No./Floor/Block"
                        id="houseNo"
                        name="houseNo"
                        value={doctorDetails?.address?.houseNo}
                        className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      />
                    )}
                  </div>

                  <div className="px-2 w-1/2 mt-3">
                    {doctorsList?.length === 0 ||
                    doctorDetails?.newDoctor === true ? (
                      <input
                        type="text"
                        id="pinCode"
                        name="pinCode"
                        onChange={handleChange}
                        value={doctorDetails?.address?.pinCode}
                        placeholder="Pin Code*"
                        className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                        }}
                      />
                    ) : (
                      <input
                        type="text"
                        id="pinCode"
                        name="pinCode"
                        value={doctorDetails?.address?.pinCode}
                        placeholder="Pin Code*"
                        className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      />
                    )}

                    {pinCodeError && (
                      <p className="text-red-500">{pinCodeError}</p>
                    )}
                  </div>
                </div>

                {/* <div className="flex lg:flex-row flex-col">
                  <div class="flex flex-row ">
                    <div className="px-2 lg:w-1/2  mt-3">
                      <input
                        type="text"
                        placeholder="House No."
                        id="houseNo"
                        name="houseNo"
                        onChange={handleChange}
                        className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      />
                      <p class=" text-red-500 flex flex-wrap">
                        {houseNoError && <p>{houseNoError}</p>}
                      </p>
                    </div>

                    <div className="px-2 lg:w-1/2 mt-3">
                      {doctorsList?.length === 0 ||
                      doctorDetails?.newDoctor === true ? (
                        <input
                          type="text"
                          id="floor"
                          name="floor"
                          onChange={handleChange}
                          placeholder="Floor"
                          className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                        />
                      ) : (
                        <input
                          type="text"
                          id="floor"
                          name="floor"
                          value={doctorDetails?.address?.floor}
                          placeholder="Floor"
                          className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                        />
                      )}
                    </div>
                  </div>
                  <div class="flex flex-row">
                    <div className="px-2 lg:w-1/2 mt-3">
                      {doctorsList?.length === 0 ||
                      doctorDetails?.newDoctor === true ? (
                        <input
                          type="text"
                          id="block"
                          name="block"
                          onChange={handleChange}
                          placeholder="Block"
                          className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                        />
                      ) : (
                        <input
                          type="text"
                          id="block"
                          name="block"
                          value={doctorDetails?.address?.block}
                          placeholder="Block"
                          className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                        />
                      )}

                      {errors.block && (
                        <p className="text-red-500">{errors.block}</p>
                      )}
                    </div>

                    <div className="px-2 lg:w-1/2 mt-3">
                      {doctorsList?.length === 0 ||
                      doctorDetails?.newDoctor === true ? (
                        <div style={{ display: "flex" }}>
                          <input
                            type="text"
                            id="pinCode"
                            name="pinCode"
                            onChange={handleChange}
                            placeholder="Pin Code*"
                            className="block w-full rounded-lg border bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                            onInput={(e) => {
                              e.target.value = e.target.value.replace(
                                /[^0-9]/g,
                                ""
                              );
                            }}
                          />
                        </div>
                      ) : (
                        <input
                          type="text"
                          id="pinCode"
                          name="pinCode"
                          value={doctorDetails?.address?.pinCode}
                          placeholder="Pin Code*"
                          className="block w-full rounded-lg border bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                          readOnly
                        />
                      )}

                      {pinCodeError && (
                        <p className="text-red-500">{pinCodeError}</p>
                      )}
                    </div>
                  </div>
                </div> */}
                {/* ----------------------------area/landmark---------------------------- */}
                <div className="px-2 w-full mt-3 ">
                  {doctorsList?.length === 0 ||
                  doctorDetails?.newDoctor === true ? (
                    <input
                      type="text"
                      id="area"
                      name="area"
                      onChange={handleChange}
                      placeholder="Area/Landmark*"
                      className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                  ) : (
                    <input
                      type="text"
                      id="area"
                      name="area"
                      value={doctorDetails?.address?.area}
                      placeholder="Area/Landmark*"
                      className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                  )}

                  {errors.area && <p className="text-red-500">{errors.area}</p>}
                </div>

                <div className="flex flex-row">
                  <div className="px-2 w-1/2 mt-3">
                    {doctorsList?.length === 0 ||
                    doctorDetails?.newDoctor === true ? (
                      <input
                        type="text"
                        id="district"
                        name="district"
                        onChange={handleChange}
                        placeholder="District*"
                        className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      />
                    ) : (
                      <input
                        type="text"
                        id="district"
                        name="district"
                        value={doctorDetails?.address?.district}
                        placeholder="District*"
                        className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      />
                    )}

                    {errors.district && (
                      <p className="text-red-500">{errors.district}</p>
                    )}
                  </div>

                  <div className="px-2 w-1/2 mt-3">
                    {doctorsList?.length === 0 ||
                    doctorDetails?.newUser === true ? (
                      <input
                        type="text"
                        id="state"
                        name="state"
                        onChange={handleChange}
                        placeholder="State*"
                        className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      />
                    ) : (
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={doctorDetails?.address?.state}
                        placeholder="State*"
                        className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      />
                    )}

                    {errors.state && (
                      <p className="text-red-500">{errors.state}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="about"
              className="block text-black text-lg font-semibold"
            >
              About
            </label>
            <textarea
              type="text"
              id="about"
              name="about"
              value={doctorDetails?.about}
              onChange={handleChange}
              className="block w-full h-24 placeholder-gray-400 rounded-lg border bg-white px-5 py-2.5 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            />

            {errors.username && (
              <p className="text-red-500">{errors.username}</p>
            )}
          </div>
          <div className="flex flex-row-reverse mt-5 my-2">
            <button
              className="btn btn-primary border py-3 px-4 rounded-3xl text-white"
              style={{
                backgroundColor: "#89CFF0",
              }}
              onClick={handleRegister}
            >
              Continue...
            </button>
          </div>
        </div>
      </div>

      {/* <div className="flex flex-row">
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
                    {doctorImage || doctorDetails?.doctorPic ? (
                      <img
                        src={doctorImage || doctorDetails?.doctorPic}
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
                    style={{
                      cursor: "pointer",
                      marginLeft: 37,
                      marginTop: -20,
                    }}
                  >
                    <MdEdit />
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
                  <label
                    style={{ marginLeft: -17, marginTop: 5, fontWeight: "600" }}
                  >
                    Edit Profile Picture
                  </label>
                  <input
                    id="files"
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleFileSelect}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 w-full gap-4">
              <div>
                <label
                  for="name"
                  className="block text-black text-lg font-semibold"
                >
                  Dr. Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  className="block mt-0 w-full placeholder-gray-400/70  rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}
              </div>
              <div>
                <label
                  for="email"
                  className="block text-black text-lg font-semibold"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  className="block mt-0 w-full placeholder-gray-400/70  rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>
              <div>
                <label
                  for="contact"
                  className="block text-black text-lg font-semibold"
                >
                  Contact Number
                </label>
                <input
                  type="number"
                  id="contactNumber"
                  name="contactNumber"
                  onChange={handleChange}
                  className="block mt-0 w-full placeholder-gray-400/70  rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                />
                {errors.contactNumber && (
                  <p className="text-red-500">{errors.contactNumber}</p>
                )}
              </div>

              <div className="flex justify-between space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="workingDays"
                    className="block text-black text-lg font-semibold"
                  >
                    Working Days
                  </label>
                  <div className="block w-full mt-0 rounded-lg border border-[#89CFF0] bg-white text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                    <Select
                      className="w-full border-none h-10"
                      mode="multiple"
                      id="workingDays"
                      name="workingDays"
                      onChange={handleChange1}
                      placeholder="Select Working Days"
                    // Add other props as needed
                    >
                      {Daysdropdown.map((option) => (
                        <Select.Option key={option.value} value={option.value}>
                          {option.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </div>
                </div>

                <div className="flex-1" style={{ marginRight: "10px" }}>
                  <label className="block text-black text-lg font-semibold">
                    Working Hours
                  </label>
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <select
                        className="mx-2 block w-full mt-0 placeholder-gray-400/70 rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                        name="workHourFrom"
                        onChange={handleChange}
                      >
                        {TimeDropdown.map((time) => (
                          <option key={time.value} value={time.value}>
                            {time.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex-1">
                      <select
                        className="mx-2 block w-full mt-0 placeholder-gray-400/70 rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                        name="workHourTo"
                        onChange={handleChange}
                      >
                        {TimeDropdown.map((time) => (
                          <option key={time.value} value={time.value}>
                            {time.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between space-x-4">
                <div className="flex-1">
                  <label
                    for="total-experience"
                    className="block text-black text-lg font-semibold"
                  >
                    Total Experience
                  </label>
                  <input
                    type="text"
                    id="total-experience"
                    name="totalExperience"
                    onChange={handleChange}
                    className="block w-full mt-0 placeholder-gray-400/70 rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                  />
                  {errors.totalExperience && (
                    <p className="text-red-500">{errors.totalExperience}</p>
                  )}
                </div>
                <div className="flex-1" style={{ marginRight: "10px" }}>
                  <label
                    for="specialist"
                    className="block text-black text-lg font-semibold"
                  >
                    Certification
                  </label>
                  <select
                    className="mx-2 block w-full mt-0 placeholder-gray-400/70 rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    id="speciality"
                    name="speciality"
                    onChange={handleChange}
                  >
                    {SpecialtiesDropdown.map(({ label, value }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  for="degree"
                  className="block text-black text-lg font-semibold"
                >
                  Degree
                </label>
                <input
                  type="text"
                  id="degree"
                  name="degree"
                  onChange={handleChange}
                  className="block mt-0 w-full placeholder-gray-400/70  rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                />
                {errors.degree && (
                  <p className="text-red-500">{errors.degree}</p>
                )}
              </div>
              <div>
                <label
                  for="houseNo"
                  className="block text-black text-lg font-semibold"
                >
                  Address
                </label>
                <div className="p-3 pb-5 border border-[#89CFF0]">
                  <div className="flex flex-col sm:flex-row sm:flex-wrap -mx-2">
                    <div className="px-2 w-full sm:w-1/3">
                      <label
                        for="houseNo"
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
                        className="block w-full rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      />
                    </div>
                    <div className="px-2 w-full sm:w-1/3">
                      <label
                        for="floor"
                        className="block text-black text-lg font-semibold"
                      >
                        Floor
                      </label>
                      <input
                        type="text"
                        id="floor"
                        name="floor"
                        onChange={handleChange}
                        placeholder="2nd"
                        className="block w-full rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      />
                    </div>
                    <div className="px-2 w-full sm:w-1/3">
                      <label
                        for="block"
                        className="block text-black text-lg font-semibold"
                      >
                        Block
                      </label>
                      <input
                        type="text"
                        id="block"
                        name="block"
                        onChange={handleChange}
                        placeholder="A"
                        className="block w-full rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      />
                      {errors.block && (
                        <p className="text-red-500">{errors.block}</p>
                      )}
                    </div>
                    <div className="px-2 w-full sm:w-1/2">
                      <label
                        for="area"
                        className="block text-black text-lg font-semibold"
                      >
                        Area
                      </label>
                      <input
                        type="text"
                        id="area"
                        name="area"
                        onChange={handleChange}
                        placeholder="Green Park"
                        className="block w-full rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      />
                      {errors.area && (
                        <p className="text-red-500">{errors.area}</p>
                      )}
                    </div>
                    <div className="px-2 w-full sm:w-1/2">
                      <label
                        for="pincode"
                        className="block text-black text-lg font-semibold"
                      >
                        Pincode
                      </label>
                      <input
                        type="text"
                        id="pinCode"
                        name="pinCode"
                        onChange={handleChange}
                        placeholder="110016"
                        className="block w-full rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      />
                      {errors.pinCode && (
                        <p className="text-red-500">{errors.pinCode}</p>
                      )}
                    </div>
                    <div className="px-2 w-full sm:w-1/2">
                      <label
                        for="district"
                        className="block text-black text-lg font-semibold"
                      >
                        District
                      </label>
                      <input
                        type="text"
                        id="district"
                        name="district"
                        onChange={handleChange}
                        placeholder="South Delhi"
                        className="block w-full rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      />
                      {errors.district && (
                        <p className="text-red-500">{errors.district}</p>
                      )}
                    </div>
                    <div className="px-2 w-full sm:w-1/2">
                      <label
                        for="state"
                        className="block text-black text-lg font-semibold"
                      >
                        State
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        onChange={handleChange}
                        placeholder="Delhi"
                        className="block w-full rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      />
                      {errors.state && (
                        <p className="text-red-500">{errors.state}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 w-100 items-center justify-center text-center">
              <button
                className="rounded-full justify-center px-9 py-2 bg-[#89CFF0] text-white"
                onClick={handleRegister}
              >
                Process
              </button>
            </div>
          </div>

        </div>
      </div> */}
    </>
  );
}
