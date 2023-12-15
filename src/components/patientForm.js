import React, { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import Modal from "react-responsive-modal";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { ToastContainer, toast } from "react-toastify";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "react-toastify/dist/ReactToastify.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { HiOutlineUserAdd } from "react-icons/hi";

const svg1 = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.7778 10C17.7778 7.83333 17.0231 5.99537 15.5139 4.48611C14.0046 2.97685 12.1667 2.22222 10 2.22222V0C11.3889 0 12.6898 0.263889 13.9028 0.791667C15.1157 1.31944 16.1713 2.03241 17.0694 2.93056C17.9676 3.8287 18.6806 4.88426 19.2083 6.09722C19.7361 7.31019 20 8.61111 20 10H17.7778ZM13.3333 10C13.3333 9.07407 13.0093 8.28704 12.3611 7.63889C11.713 6.99074 10.9259 6.66667 10 6.66667V4.44444C11.537 4.44444 12.8472 4.98611 13.9306 6.06944C15.0139 7.15278 15.5556 8.46296 15.5556 10H13.3333ZM18.8333 20C16.5185 20 14.2315 19.4954 11.9722 18.4861C9.71296 17.4769 7.65741 16.0463 5.80556 14.1944C3.9537 12.3426 2.52315 10.287 1.51389 8.02778C0.50463 5.76852 0 3.48148 0 1.16667C0 0.833333 0.111111 0.555556 0.333333 0.333333C0.555556 0.111111 0.833333 0 1.16667 0H5.66667C5.92593 0 6.15741 0.087963 6.36111 0.263889C6.56482 0.439815 6.68519 0.648148 6.72222 0.888889L7.44444 4.77778C7.48148 5.07407 7.47222 5.32407 7.41667 5.52778C7.36111 5.73148 7.25926 5.90741 7.11111 6.05556L4.41667 8.77778C4.78704 9.46296 5.22685 10.125 5.73611 10.7639C6.24537 11.4028 6.80556 12.0185 7.41667 12.6111C7.99074 13.1852 8.59259 13.7176 9.22222 14.2083C9.85185 14.6991 10.5185 15.1481 11.2222 15.5556L13.8333 12.9444C14 12.7778 14.2176 12.6528 14.4861 12.5694C14.7546 12.4861 15.0185 12.463 15.2778 12.5L19.1111 13.2778C19.3704 13.3519 19.5833 13.4861 19.75 13.6806C19.9167 13.875 20 14.0926 20 14.3333V18.8333C20 19.1667 19.8889 19.4444 19.6667 19.6667C19.4444 19.8889 19.1667 20 18.8333 20ZM3.36111 6.66667L5.19444 4.83333L4.72222 2.22222H2.25C2.34259 2.98148 2.47222 3.73148 2.63889 4.47222C2.80556 5.21296 3.0463 5.94444 3.36111 6.66667ZM13.3056 16.6111C14.0278 16.9259 14.7639 17.1759 15.5139 17.3611C16.2639 17.5463 17.0185 17.6667 17.7778 17.7222V15.2778L15.1667 14.75L13.3056 16.6111Z" fill="#89CFF0"/>
</svg>`;
const svg2 = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 12H12V10H4V12ZM4 9H16V7H4V9ZM4 6H16V4H4V6ZM0 20V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H4L0 20ZM3.15 14H18V2H2V15.125L3.15 14Z" fill="#89CFF0"/>
</svg>`;

const svg3 = `<svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.5 0L15.3064 8.63729H24.3882L17.0409 13.9754L19.8473 22.6127L12.5 17.2746L5.15268 22.6127L7.95911 13.9754L0.611794 8.63729H9.69357L12.5 0Z" fill="#FFF500"/>
</svg>`;

export default function PatientForm() {
  let isTab = useMediaQuery({ query: "(max-width: 768px)" });
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [selectedDoctor, setselectedDoctor] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [open1, setOpen1] = useState(false);
  const onOpenModal = () => setOpen1(true);
  const onCloseModal = () => setOpen1(false);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [age, setAge] = useState("");
  const [ageError, setAgeError] = useState("");
  const [bodyWeight, setBodyWeight] = useState("");
  const [bodyWeightError, setBodyWeightError] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [houseNoError, setHouseNoError] = useState("");
  const [floor, setFloor] = useState("");
  const [floorError, setFloorError] = useState("");
  const [block, setBlock] = useState("");
  const [blockError, setBlockError] = useState("");
  const [area, setArea] = useState("");
  const [areaError, setAreaError] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [pinCodeError, setPinCodeError] = useState("");
  const [district, setDistrict] = useState("");
  const [districtError, setDistrictError] = useState("");
  const [state, setState] = useState("");
  const [stateError, setStateError] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [patientImage, setPatientImage] = useState();
  const fileInputRef = useRef(null);
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [errors, setErrors] = useState({});
  const [userImage, setUserImage] = useState();
  const [userDetails, setUserDetails] = useState({ name: "" });

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleNewProfilePictureClick = async () => {
    // This will trigger the hidden file input to open the file dialog
    await fileInputRef.current.click();
  };

  const handleNewProfilePicture = async () => {
    const token = localStorage.getItem("token");
    const doctorId = localStorage.getItem("doctorId");

    // if (!token || !doctorId)
    // {
    //     console.error('Token or doctor ID not found in local storage');
    //     return;
    // }

    const formData = new FormData();
    formData.append("patientPic", selectedFile);

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
      setUserImage(data.profilePicImageUrl);
      alert("Image uploaded successfully.");

      // Reset the file input
      setSelectedFile(null);
      fileInputRef.current.value = "";
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image. Please try again.");
    }
  };

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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value ? "" : "Name is required.";
      case "age":
        return /^[0-9]+$/.test(value) ? "" : "Age must be a number.";
      case "bodyWeight":
        return /^[0-9.]+$/.test(value) ? "" : "Body Weight must be a number.";
      case "houseNo":
        return /^[a-zA-Z\s]+$/.test(value) && value
          ? ""
          : "houseNo is required  ";
      case "floor":
        return /^[a-zA-Z\s]+$/.test(value) && value ? "" : "floor is required";
      case "block":
        return /^[a-zA-Z\s]+$/.test(value) && value
          ? ""
          : "Block is required  ";
      case "area":
        return /^[a-zA-Z\s]+$/.test(value) && value
          ? ""
          : "Area is required and must be a string ";
      case "pinCode":
        return /^\d{6}$/.test(value) ? "" : "Pincode must be exactly 6 digits.";
      case "district":
        return /^[a-zA-Z\s]+$/.test(value) && value
          ? ""
          : "District is required and must be a string ";
      case "state":
        return /^[a-zA-Z\s]+$/.test(value) && value
          ? ""
          : "State is required and must be a string ";
      case "workHourFrom":
        // Assuming time in HH:MM format, adjust as needed
        return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)
          ? ""
          : "Invalid start time.";
      case "workHourTo":
        return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)
          ? ""
          : "Invalid end time.";
      // Add more cases as needed for other fields
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });

    setPatientDetails((prevPatientDetails) => ({
      ...prevPatientDetails,
      patientPic: patientImage,
      ...([
        "houseNo",
        "floor",
        "block",
        "area",
        "pinCode",
        "district",
        "state",
      ].includes(name)
        ? {
            address: {
              ...prevPatientDetails.address,
              [name]: value,
            },
          }
        : { [name]: value }),
    }));

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
    ) {
      setPatientDetails((prevPatientDetails) => ({
        ...prevPatientDetails,
        address: {
          ...prevPatientDetails.address,
          [name]: value,
        },
      }));
    } else {
      setPatientDetails((prevPatientDetails) => ({
        ...prevPatientDetails,
        [name]: value,
      }));
    }
    setIsEditing(true);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const newPatientDetails = {
      name: patientDetails?.name,
      age: patientDetails?.age,
      bodyWeight: patientDetails?.bodyWeight,
      address: {
        houseNo: patientDetails?.address?.houseNo,
        floor: patientDetails?.address?.floor,
        block: patientDetails?.address?.block,
        area: patientDetails?.address?.area,
        pinCode: patientDetails?.address?.pinCode,
        district: patientDetails?.address?.district,
        state: patientDetails?.address?.state,
      },
      patientPic: userImage,
    };

    const doctorId = localStorage.getItem("doctorId");

    // if (isEmpty || isEditing === false)
    // {
    //   toast.error("Please fill the fields");
    //   setIsEditing(false);
    //   return;
    // }

    // if (!isEmpty || isEditing === true)
    // {
    //   toast.success("Form submitted successfully!");
    // }
    // Check if the token exists
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in local storage");
      return;
    }
    const response = await fetch(`${baseUrl}/api/v1/user/register_patient`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify(newPatientDetails),
    });
    const data = await response.json();
    if (data.success === true) {
      // navigate("/otp")
      onOpenModal();
      localStorage.setItem("id", data.data._id);
    }
    console.log("DATA from response", data);
  };
  console.log("PATIENT DETAILS", patientDetails);

  return (
    <>
      <Modal
        open={open1}
        onClose={onCloseModal}
        center
        doctor={selectedDoctor}
        styles={{
          modal: {
            // Set your custom width here (e.g., '70%')
            width: isTab ? "80%" : "70%",
            backgroundColor: "#89CFF0",
            alignContent: "center",
          },
        }}
      >
        <div className="flex flex-col bg-customRedp-2  items-center w-[100%] md:w-[100%]  mt-[2%]">
          <text
            className="text-center mt-4 mb-4"
            style={{
              fontSize: isTab ? "14px" : "20px",
              fontWeight: 600,
              lineHeight: "28.8px",
              fontFamily: "Lato, sans-serif",
              color: "#FFFFFF",
            }}
          >
            Member's Details is Saved.
            <br />
            Go to Member's list to book an Appointment.
          </text>
        </div>
      </Modal>

      <div className="flex flex-row">
        <ToastContainer />
        <div></div>
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
                    {userImage || patientDetails?.patientPic ? (
                      <img
                        src={userImage || patientDetails?.patientPic}
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
                  <input
                    id="imageInput"
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleFileSelect}
                  />
                </div>
                <button
                  onClick={handleNewProfilePicture}
                  style={{ marginLeft: 20, marginTop: 5 }}
                >
                  Upload
                </button>
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
                  id="name"
                  name="name"
                  value={patientDetails.name}
                  onChange={handleChange}
<<<<<<< HEAD
                  className={`block mt-0 w-full placeholder-gray-400/70 rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 ${nameError ? "border-red-500" : ""
                    }`}
=======
                  className={`block mt-0 w-full placeholder-gray-400/70 rounded-lg border border-[#08DA75] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 ${
                    nameError ? "border-red-500" : ""
                  }`}
>>>>>>> ffc5211ddfe2e1133cf3786a7ec35ae172302d55
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label
                    className="mx-2 text-lg font-normal text-black font-lato"
                    htmlFor="age"
                  >
                    Age
                  </label>
                  <input
                    className={`mx-2 px-2 border border-green-500 h-10 rounded-lg ${
                      ageError ? "border-red-500" : ""
                    }`}
                    type="text"
                    id="age"
                    name="age"
                    value={patientDetails.age}
                    onChange={handleChange}
                    style={{ marginLeft: -0.5 }}
                  />
                  {errors.age && ( // Change 'errors.email' to 'errors.age'
                    <p className="text-red-500">{errors.age}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    className="mx-2 text-lg font-normal text-black font-lato"
                    htmlFor="bodyWeight"
                  >
                    Body Weight
                  </label>
                  <input
                    className={`mx-2 px-2 border border-green-500 h-10 rounded-lg ${
                      bodyWeightError ? "border-red-500" : ""
                    }`}
                    type="text"
                    id="bodyWeight"
                    name="bodyWeight"
                    onChange={handleChange}
                    value={patientDetails.bodyWeight}
                    style={{ marginRight: -2 }}
                  />
                  {errors.bodyWeight && ( // Change 'error.bodyWeight' to 'bodyWeightError'
                    <p className="text-red-500 text-sm mt-1">
                      {errors.bodyWeight}
                    </p>
                  )}
                </div>
              </div>

              <div class="p-3 pb-5 border border-[#89CFF0]">
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
                      value={patientDetails.houseNo}
                      onChange={handleChange}
                      placeholder="1234"
<<<<<<< HEAD
                      className={`block w-full rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 ${houseNoError ? "border-red-500" : ""
                        }`}
=======
                      className={`block w-full rounded-lg border border-[#08DA75] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 ${
                        houseNoError ? "border-red-500" : ""
                      }`}
>>>>>>> ffc5211ddfe2e1133cf3786a7ec35ae172302d55
                    />
                    {houseNoError && (
                      <p className="text-red-500 text-sm mt-1">
                        {houseNoError}
                      </p>
                    )}
                  </div>{" "}
                  <div className="px-2 w-full sm:w-1/3">
                    <label
                      htmlFor="floor"
                      className="block text-black text-lg font-semibold"
                    >
                      Floor
                    </label>
                    <input
                      type="text"
                      id="floor"
                      name="floor"
                      value={patientDetails.floor}
                      onChange={handleChange}
                      placeholder="First Floor or 2nd"
<<<<<<< HEAD
                      className={`block w-full rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 ${floorError ? "border-red-500" : ""
                        }`}
=======
                      className={`block w-full rounded-lg border border-[#08DA75] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 ${
                        floorError ? "border-red-500" : ""
                      }`}
>>>>>>> ffc5211ddfe2e1133cf3786a7ec35ae172302d55
                    />
                    {floorError && (
                      <p className="text-red-500 text-sm mt-1">{floorError}</p>
                    )}
                  </div>{" "}
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
                      value={patientDetails.block}
                      onChange={handleChange}
                      placeholder="A"
<<<<<<< HEAD
                      className={`block w-full rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 ${blockError ? "border-red-500" : ""
                        }`}
=======
                      className={`block w-full rounded-lg border border-[#08DA75] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 ${
                        blockError ? "border-red-500" : ""
                      }`}
>>>>>>> ffc5211ddfe2e1133cf3786a7ec35ae172302d55
                    />
                    {errors.block && (
                      <p className="text-red-500">{errors.block}</p>
                    )}
                  </div>{" "}
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
                      value={patientDetails.area}
                      onChange={handleChange}
                      placeholder="Green Park"
<<<<<<< HEAD
                      className={`block w-full rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 ${areaError ? "border-red-500" : ""
                        }`}
=======
                      className={`block w-full rounded-lg border border-[#08DA75] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 ${
                        areaError ? "border-red-500" : ""
                      }`}
>>>>>>> ffc5211ddfe2e1133cf3786a7ec35ae172302d55
                    />
                    {errors.area && (
                      <p className="text-red-500">{errors.area}</p>
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
                      value={patientDetails?.address?.pinCode}
                      onChange={handleChange}
                      placeholder="110016"
<<<<<<< HEAD
                      className={`block w-full rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 ${pinCodeError ? "border-red-500" : ""
                        }`}
=======
                      className={`block w-full rounded-lg border border-[#08DA75] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 ${
                        pinCodeError ? "border-red-500" : ""
                      }`}
>>>>>>> ffc5211ddfe2e1133cf3786a7ec35ae172302d55
                    />
                    {errors.pinCode && (
                      <p className="text-red-500">{errors.pinCode}</p>
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
                      value={patientDetails?.address?.district}
                      onChange={handleChange}
                      placeholder="South Delhi"
<<<<<<< HEAD
                      className={`block w-full rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 ${districtError ? "border-red-500" : ""
                        }`}
=======
                      className={`block w-full rounded-lg border border-[#08DA75] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 ${
                        districtError ? "border-red-500" : ""
                      }`}
>>>>>>> ffc5211ddfe2e1133cf3786a7ec35ae172302d55
                    />
                    {errors.district && (
                      <p className="text-red-500">{errors.district}</p>
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
                      value={patientDetails?.address?.state}
                      onChange={handleChange}
                      placeholder="Delhi"
<<<<<<< HEAD
                      className={`block w-full rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 ${stateError ? "border-red-500" : ""
                        }`}
=======
                      className={`block w-full rounded-lg border border-[#08DA75] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 ${
                        stateError ? "border-red-500" : ""
                      }`}
>>>>>>> ffc5211ddfe2e1133cf3786a7ec35ae172302d55
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
