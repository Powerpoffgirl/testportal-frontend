import React, { useRef, useState } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import AdminHeader from "./adminHeader";
import AdminSidebar from "./adminSidebar";
import { useNavigate } from "react-router-dom";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { HiOutlineUserAdd } from "react-icons/hi";
import { FaRegTrashAlt } from "react-icons/fa";
import { Select } from "antd";

export default function SuperAdminDoctorForm() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [drName, setDrName] = useState("");
  const [drNameError, setDrNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [contactError, setContactError] = useState("");
  const [totalExperience, setTotalExperience] = useState("");
  const [totalExperienceError, setTotalExperienceError] = useState("");
  const [degree, setDegree] = useState("");
  const [degreeError, setDegreeError] = useState("");
  const [blockError, setBlockError] = useState("");
  const [areaError, setAreaError] = useState("");
  const [pinCodeError, setPinCodeError] = useState("");
  const [districtError, setDistrictError] = useState("");
  const [stateError, setStateError] = useState("");

  const handleDrNameChange = (e) => {
    const enteredDrName = e.target.value;
    setDrName(enteredDrName);

    // Validation logic for Dr. Name
    const drNameRegex = /^Dr\. [a-zA-Z\s-]+$/;

    if (!enteredDrName.trim()) {
      setDrNameError("Dr. Name is required");
    } else if (!drNameRegex.test(enteredDrName)) {
      setDrNameError("Invalid Dr. Name format. It should start with 'Dr. '");
    } else {
      setDrNameError("");
    }
  };

  const handleEmailChange = (e) => {
    const enteredEmail = e.target.value;
    setEmail(enteredEmail);

    // Validation logic for email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!enteredEmail.trim()) {
      setEmailError("Email is required");
    } else if (!emailPattern.test(enteredEmail)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const handleContactChange = (e) => {
    const enteredContact = e.target.value;
    setContactNumber(enteredContact);

    const contactRegex = /^\d{10}$/; // Validates a 10-digit number

    if (!enteredContact.trim()) {
      setContactError("Contact number is required");
    } else if (!contactRegex.test(enteredContact)) {
      setContactError("Invalid contact number format (should be 10 digits)");
    } else {
      setContactError("");
    }
  };

  const handleTotalExperienceChange = (e) => {
    const enteredTotalExperience = e.target.value;
    setTotalExperience(enteredTotalExperience);

    // Total Experience validation logic
    const experienceRegex = /^\d+$/; // Assumes Total Experience is a positive number

    if (!enteredTotalExperience.trim()) {
      setTotalExperienceError("Total Experience is required");
    } else if (!experienceRegex.test(enteredTotalExperience)) {
      setTotalExperienceError("Invalid Total Experience format");
    } else {
      setTotalExperienceError("");
    }
  };

  const handleDegreeChange = (e) => {
    const enteredDegree = e.target.value;
    setDegree(enteredDegree);

    // Validation logic for Degree
    if (!enteredDegree.trim()) {
      setDegreeError("Degree is required");
    } else {
      setDegreeError("");
    }
  };

  const handleBlockChange = (e) => {
    // Your validation logic here
    // Example validation:
    const enteredBlock = e.target.value;

    if (enteredBlock.trim() === "") {
      setBlockError("Block is required");
    } else {
      setBlockError("");
    }
  };

  const handleAreaChange = (e) => {
    const enteredArea = e.target.value;

    // Your validation logic here
    if (enteredArea.trim() === "") {
      setAreaError("Area is required");
    } else {
      setAreaError("");
    }
  };

  const handlePinCodeChange = (e) => {
    const enteredPinCode = e.target.value;

    // Validation logic for Pincode
    const pinCodeRegex = /^\d{6}$/; // Assumes Pincode is a 6-digit number

    if (!enteredPinCode.trim()) {
      setPinCodeError("Pincode is required");
    } else if (!pinCodeRegex.test(enteredPinCode)) {
      setPinCodeError("Invalid Pincode format. Should be a 6-digit number.");
    } else {
      setPinCodeError("");
    }
  };

  const handleDistrictChange = (e) => {
    const enteredDistrict = e.target.value;

    // Validation logic for District
    if (!enteredDistrict.trim()) {
      setDistrictError("District is required");
    } else {
      setDistrictError("");
    }
  };
  const handleStateChange = (e) => {
    const enteredState = e.target.value;

    // Validation logic for State
    if (!enteredState.trim()) {
      setStateError("State is required");
    } else {
      setStateError("");
    }
  };

  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [doctorDetails, setDoctorDetails] = useState({
    name: "",
    email: "",
    contactNumber: "",
    workingDays: [],
    workingHours: {
      workHourFrom: "",
      workHourTo: "",
    },
    totalExperience: "",
    speciality: "",
    degree: "",
    address: {
      houseNo: "",
      floor: "",
      block: "",
      area: "",
      pinCode: "",
      district: "",
      state: "",
    },
    doctorPic: "",
  });
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleNewProfilePictureClick = async () => {
    // This will trigger the hidden file input to open the file dialog
    await fileInputRef.current.click();
    handleNewProfilePicture();
  };

  const handleNewProfilePicture = async () => {
    const token = localStorage.getItem("token");
    const doctorId = localStorage.getItem("doctorId");

    if (!token || !doctorId) {
      console.error("Token or doctor ID not found in local storage");
      return;
    }

    const formData = new FormData();
    formData.append("doctorPic", selectedFile);

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
      setDoctorDetails((prevDoctorDetails) => ({
        ...prevDoctorDetails,
        doctorPic: data.profilePicImageUrl,
      }));

      alert("Image uploaded successfully.");

      // Reset the file input
      setSelectedFile(null);
      fileInputRef.current.value = "";
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image. Please try again.");
    }
  };

  // Function to handle profile picture removal
  const handleRemoveProfilePicture = () => {
    handleClose();
  };

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
  const IndianDoctorSpecialties = [
    "General Medicine",
    "Cardiology",
    "Dermatology",
    "Endocrinology",
    "Gastroenterology",
    "Nephrology",
    "Neurology",
    "Oncology",
    "Pediatrics",
    "Psychiatry",
    "Pulmonology",
    "Rheumatology",
    "General Surgery",
    "Orthopedic Surgery",
    "Cardiothoracic Surgery",
    "Neurosurgery",
    "Plastic Surgery",
    "Urology",
    "Vascular Surgery",
    "Gynecology",
    "Obstetrics",
    "Ophthalmology",
    "ENT (Ear, Nose, and Throat)",
    "Dental Surgery",
    "Anesthesiology",
    "Radiology",
    "Pathology",
    "Hematology",
    "Ayurveda",
    "Homeopathy",
    "Physical Medicine and Rehabilitation",
    "Sports Medicine",
    "Diabetology",
    "Infectious Disease",
    "Geriatrics",
    "Pain Management",
    "Critical Care Medicine",
    "Emergency Medicine",
    "Occupational Medicine",
    "Preventive Medicine",
    "Family Medicine",
    "Pediatric Surgery",
    "Gastrointestinal Surgery",
    "Laparoscopic Surgery",
    "Transplant Surgery",
    "Nuclear Medicine",
    "Reproductive Medicine",
    "Neonatology",
    "Allergy and Immunology",
    "Audiology and Speech Therapy",
  ];

  const SpecialtiesDropdown = IndianDoctorSpecialties.map((specialty) => ({
    label: specialty,
    value: specialty,
  }));

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
      workingDays: [...prevDoctorDetails.workingDays, e],
    }));
  };

  const handleChange = (e) => {
    console.log("E value", e);
    const { name, value } = e.target;

    if (name === "workHourFrom" || name === "workHourTo") {
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
    ) {
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
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    // Check if the token exists
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in local storage");
      return;
    }
    const response = await fetch(`${baseUrl}/api/v1/admin/register_doctor`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify(doctorDetails),
    });
    const data = await response.json();
    if (data.success === true) {
      navigate("/otp", {
        state: { contactNumber: doctorDetails.contactNumber },
      });
      localStorage.setItem("id", data.data._id);
    }
    console.log("DATA from response", data);
  };

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

  console.log("DOCTOR DETAILS", doctorDetails);

  return (
    <>
      <div className="flex flex-row">
        {/* <div className="md:fixed md:h-screen md:overflow-y-auto md:w-[337px]"></div> */}
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
                    {doctorDetails?.doctorPic ? (
                      <img
                        src={doctorDetails.doctorPic}
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
                  Dr. Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleDrNameChange}
                  className={`block mt-0 w-full placeholder-gray-400/70 rounded-lg border ${
                    drNameError ? "border-red-500" : "border-[#08DA75]"
                  } bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40`}
                />
                {drNameError && (
                  <p className="text-red-500 text-sm mt-1">{drNameError}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-black text-lg font-semibold"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleEmailChange}
                  className={`block mt-0 w-full placeholder-gray-400/70 rounded-lg border ${
                    emailError ? "border-red-500" : "border-[#08DA75]"
                  } bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40`}
                />
                {emailError && (
                  <p className="text-red-500 text-sm mt-1">{emailError}</p>
                )}{" "}
              </div>
              <div>
                <label
                  htmlFor="contact"
                  className="block text-black text-lg font-semibold"
                >
                  Contact Number
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  onChange={handleContactChange}
                  className={`block mt-0 w-full placeholder-gray-400/70 rounded-lg border ${
                    contactError ? "border-red-500" : "border-[#08DA75]"
                  } bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40`}
                />
                {contactError && (
                  <p className="text-red-500 text-sm mt-1">{contactError}</p>
                )}
              </div>{" "}
              <div className="flex justify-between space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="workingDays"
                    className="block text-black text-lg font-semibold"
                  >
                    Working Days
                  </label>
                  <div className="block w-full mt-0 rounded-lg border border-[#08DA75] bg-white text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
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
                        className="mx-2 block w-full mt-0 placeholder-gray-400/70 rounded-lg border border-[#08DA75] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
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
                        className="mx-2 block w-full mt-0 placeholder-gray-400/70 rounded-lg border border-[#08DA75] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
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
              <div class="flex justify-between space-x-4">
                <div class="flex-1">
                  <label
                    for="total-experience"
                    class="block text-black text-lg font-semibold"
                  >
                    Total Experience
                  </label>
                  <input
                    type="text"
                    id="total-experience"
                    name="totalExperience"
                    onChange={handleTotalExperienceChange}
                    className={`block mt-0 w-full placeholder-gray-400/70 rounded-lg border ${
                      totalExperienceError
                        ? "border-red-500"
                        : "border-[#08DA75]"
                    } bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40`}
                  />
                  {totalExperienceError && (
                    <p className="text-red-500 text-sm mt-1">
                      {totalExperienceError}
                    </p>
                  )}
                </div>{" "}
                <div class="flex-1" style={{ marginRight: "10px" }}>
                  <label
                    for="specialist"
                    class="block text-black text-lg font-semibold"
                  >
                    Specialist
                  </label>
                  <select
                    className="mx-2 block w-full mt-0 placeholder-gray-400/70 rounded-lg border border-[#08DA75] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
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
                  htmlFor="degree"
                  className="block text-black text-lg font-semibold"
                >
                  Degree
                </label>
                <input
                  type="text"
                  id="degree"
                  name="degree"
                  onChange={handleDegreeChange}
                  className={`block mt-0 w-full placeholder-gray-400/70 rounded-lg border ${
                    degreeError ? "border-red-500" : "border-[#08DA75]"
                  } bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40`}
                />
                {degreeError && (
                  <p className="text-red-500 text-sm mt-1">{degreeError}</p>
                )}
              </div>{" "}
              <div class="p-3 pb-5 border border-[#08DA75]">
                <div class="flex flex-col sm:flex-row sm:flex-wrap -mx-2">
                  <div class="px-2 w-full sm:w-1/3">
                    <label
                      for="houseNo"
                      class="block text-black text-lg font-semibold"
                    >
                      House No
                    </label>
                    <input
                      type="text"
                      id="houseNo"
                      name="houseNo"
                      onChange={handleChange}
                      placeholder="1234"
                      class="block w-full rounded-lg border border-[#08DA75] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                  </div>
                  <div class="px-2 w-full sm:w-1/3">
                    <label
                      for="floor"
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
                    />
                  </div>
                  <div className="px-2 w-full sm:w-1/3">
                    <label
                      htmlFor="block"
                      className="block text-black text-lg font-semibold"
                    >
                      Block
                    </label>
                    <input
                      type="text"
                      id="block"
                      name="block"
                      onChange={handleBlockChange}
                      placeholder="A"
                      className={`block mt-0 w-full placeholder-gray-400/70 rounded-lg border ${
                        blockError ? "border-red-500" : "border-[#08DA75]"
                      } bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40`}
                    />
                    {blockError && (
                      <p className="text-red-500 text-sm mt-1">{blockError}</p>
                    )}
                  </div>
                  <div className="px-2 w-full sm:w-1/2">
                    <label
                      htmlFor="area"
                      className="block text-black text-lg font-semibold"
                    >
                      Area
                    </label>
                    <input
                      type="text"
                      id="area"
                      name="area"
                      onChange={handleAreaChange}
                      placeholder="Green Park"
                      className={`block w-full rounded-lg border ${
                        areaError ? "border-red-500" : "border-[#08DA75]"
                      } bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40`}
                    />
                    {areaError && (
                      <p className="text-red-500 text-sm mt-1">{areaError}</p>
                    )}
                  </div>{" "}
                  <div className="px-2 w-full sm:w-1/2">
                    <label
                      htmlFor="pinCode"
                      className="block text-black text-lg font-semibold"
                    >
                      Pincode
                    </label>
                    <input
                      type="text"
                      id="pinCode"
                      name="pinCode"
                      onChange={handlePinCodeChange}
                      placeholder="110016"
                      className={`block w-full rounded-lg border ${
                        pinCodeError ? "border-red-500" : "border-[#08DA75]"
                      } bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40`}
                    />
                    {pinCodeError && (
                      <p className="text-red-500 text-sm mt-1">
                        {pinCodeError}
                      </p>
                    )}
                  </div>{" "}
                  <div className="px-2 w-full sm:w-1/2">
                    <label
                      htmlFor="district"
                      className="block text-black text-lg font-semibold"
                    >
                      District
                    </label>
                    <input
                      type="text"
                      id="district"
                      name="district"
                      onChange={handleDistrictChange}
                      placeholder="South Delhi"
                      className={`block w-full rounded-lg border ${
                        districtError ? "border-red-500" : "border-[#08DA75]"
                      } bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40`}
                    />
                    {districtError && (
                      <p className="text-red-500 text-sm mt-1">
                        {districtError}
                      </p>
                    )}
                  </div>{" "}
                  <div className="px-2 w-full sm:w-1/2">
                    <label
                      htmlFor="state"
                      className="block text-black text-lg font-semibold"
                    >
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      onChange={handleStateChange}
                      placeholder="Delhi"
                      className={`block w-full rounded-lg border ${
                        stateError ? "border-red-500" : "border-[#08DA75]"
                      } bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40`}
                    />
                    {stateError && (
                      <p className="text-red-500 text-sm mt-1">{stateError}</p>
                    )}
                  </div>{" "}
                </div>
              </div>
            </div>
            <div className="mt-10 w-100 items-center justify-center text-center">
              <button
                className="rounded-full justify-center px-9 py-2 bg-[#08DA73] text-white"
                onClick={handleRegister}
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
