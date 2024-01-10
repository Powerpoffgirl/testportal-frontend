import React, { useRef, useState } from "react";
import AdminHeader from "./adminHeader";
import AdminSidebar from "./adminSidebar";
import { useNavigate } from "react-router-dom";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { HiOutlineUserAdd } from "react-icons/hi";
import { FaRegTrashAlt } from "react-icons/fa";
import { Select } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DoctorForm() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

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
      workingDays: e,
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
                          backgroundColor: "#89CFF0",
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
                  for="name"
                  class="block text-black text-lg font-semibold"
                >
                  Dr. Name
                </label>
                <input
                  type="text"
                  placeholder="Smita Singh"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  class="block mt-0 w-full placeholder-gray-400/70  rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                />
              </div>
              <div>
                <label
                  for="email"
                  class="block text-black text-lg font-semibold"
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="smitasingh1234@gmail.com"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  class="block mt-0 w-full placeholder-gray-400/70  rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                />
              </div>
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
                  class="block mt-0 w-full placeholder-gray-400/70  rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                />
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
                    onChange={handleChange}
                    class="block w-full mt-0 placeholder-gray-400/70 rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                  />
                </div>
                <div class="flex-1" style={{ marginRight: "10px" }}>
                  <label
                    for="specialist"
                    class="block text-black text-lg font-semibold"
                  >
                    Specialist
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
                  class="block text-black text-lg font-semibold"
                >
                  Degree
                </label>
                <input
                  type="text"
                  id="degree"
                  name="degree"
                  onChange={handleChange}
                  class="block mt-0 w-full placeholder-gray-400/70  rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                />
              </div>
              <div class="p-3 pb-5 border border-[#89CFF0]">
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
                      class="block w-full rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
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
                      class="block w-full rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                  </div>
                  <div class="px-2 w-full sm:w-1/3">
                    <label
                      for="block"
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
                      class="block w-full rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                  </div>
                  <div class="px-2 w-full sm:w-1/2">
                    <label
                      for="area"
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
                      class="block w-full rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                  </div>
                  <div class="px-2 w-full sm:w-1/2">
                    <label
                      for="pincode"
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
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, "");
                      }}
                      class="block w-full rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                  </div>
                  <div class="px-2 w-full sm:w-1/2">
                    <label
                      for="district"
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
                      class="block w-full rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                  </div>
                  <div class="px-2 w-full sm:w-1/2">
                    <label
                      for="state"
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
                      class="block w-full rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 w-100 items-center justify-center text-center">
              <button
                className="rounded-full justify-center px-9 py-2 bg-[89CFF0] text-white"
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
