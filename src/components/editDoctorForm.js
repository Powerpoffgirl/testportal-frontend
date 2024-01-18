import React, { useEffect, useRef, useState, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import AdminSidebar from "./adminSidebar";
import { useNavigate } from "react-router-dom";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { HiOutlineUserAdd } from "react-icons/hi";
import { FaRegTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Select } from "antd";
import { MdEdit } from "react-icons/md";
import UserContext from "./userContext";
import { Popconfirm } from "antd";
import delete_button from "../assets/delete_button.svg";

export default function EditDoctorForm() 
{
  const { updateUser, updateUserEmail, updateUserimage } =
    useContext(UserContext);
  let isTab = useMediaQuery({ query: "(max-width: 768px)" });
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [showQrCode, setShowQrCode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [open1, setOpen1] = useState(false);
  const onOpenModal = () => setOpen1(true);
  const onCloseModal = () => setOpen1(false);
  const [doctorsList, setDoctorsList] = useState([]);

  const [doctorImage, setDoctorImage] = useState();
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [value, setValue] = useState("");
  const [mobileNumberError, setmobileNumberError] = useState("");
  const [contactNumber, setcontactNumber] = useState(null);
  const [pinCodeError, setPinCodeError] = useState("");

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

  useEffect(() =>
  {
    const fetchData = async () =>
    {
      try
      {
        const response = await fetch(
          `https://api.postalpincode.in/pincode/${patientDetails?.address?.pinCode}`,
          {
            method: "GET",
          }
        );

        if (!response.ok)
        {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const district = data[0]?.PostOffice[0]?.District;
        const state = data[0]?.PostOffice[0]?.State; // Corrected to "State" with a capital "S"
        console.log("District:", district);
        console.log("State:", state);

        setPatientDetails((prevDetails) => ({
          ...prevDetails,
          address: {
            ...prevDetails.address,
            district: district,
            state: state,
          },
        }));
      } catch (error)
      {
        console.error("Error fetching data:", error);
      }
    };

    if (patientDetails?.address?.pinCode)
    {
      fetchData();
    }
  }, [patientDetails?.address?.pinCode]);

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
        setDoctorImage(data.profilePicImageUrl);
        toast.success("Image uploaded successfully.");

        // Reset the file input
        setSelectedFile(null);
        fileInputRef.current.value = "";
      }
    }
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
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const fileInputRef = useRef(null);

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
          return;
        }
        const response = await fetch(
          `${baseUrl}/api/v1/doctor/get_doctorDetails`,
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
        setQrCodeUrl(data.data.qrCodeUrl)
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

  // Function to handle profile picture removal
  const handleRemoveProfilePicture = () =>
  {
    // Logic to handle removing the current profile picture
    handleClose();
  };

  const TimeDropdown = [
    { label: "Select Time", value: "" },
    ...Array.from({ length: 24 }, (v, i) =>
    {
      const hour = i.toString().padStart(2, "0");
      return { label: `${hour}:00`, value: `${hour}:00` };
    }),
  ];

  const handleChange2 = (e) =>
  {
    setDoctorDetails((prevDoctorDetails) => ({
      ...prevDoctorDetails,
      // workingDays: e,
      speciality: e,
    }));
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
  //         case "degree":
  //             return value ? "" : "Degree is required  ";
  //         case "totalExperience":
  //             return value ? "" : "Total Experience is required  ";
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
        workingDays: [...prevDoctorDetails?.workingDays, value],
      }));
    } else if (
      name === "workHourFrom" ||
      name === "workHourTo" ||
      name === "interval"
    )
    {
      setDoctorDetails((prevDoctorDetails) => ({
        ...prevDoctorDetails,
        workingHours: {
          ...prevDoctorDetails?.workingHours,
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
          ...prevDoctorDetails?.address,
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

  useEffect(() =>
  {
    setIsEditing(true);
  }, [doctorDetails]);

  const handleUpdate = async (e) =>
  {
    e.preventDefault();
    // Check if the token exists
    const newDoctorDetails = {
      name: doctorDetails?.name,
      about: doctorDetails?.about,
      consultationFee: doctorDetails?.consultationFee,
      registrationNo: doctorDetails?.registrationNo,

      // email: doctorDetails?.email, // Added email field
      // contactNumber: doctorDetails?.contactNumber, // Added contactNumber field

      consultationFee: doctorDetails?.consultationFee,
      workingDays: doctorDetails?.workingDays, // Added workingDays field
      workingHours: {
        workHourFrom: doctorDetails?.workingHours?.workHourFrom,
        workHourTo: doctorDetails?.workingHours?.workHourTo,
        interval: doctorDetails?.workingHours?.interval,
      },
      totalExperience: doctorDetails?.totalExperience,
      degree: doctorDetails?.degree,
      speciality: doctorDetails?.speciality,

      address: {
        houseNo: doctorDetails?.address?.houseNo,
        floor: doctorDetails?.address?.floor,
        block: doctorDetails?.address?.block,
        area: doctorDetails?.address?.area,
        pinCode: doctorDetails?.address?.pinCode,
        district: doctorDetails?.address?.district,
        state: doctorDetails?.address?.state,
      },
      doctorPic: doctorImage,
    };
    if (newDoctorDetails.name === "")
    {
      toast.error("Please write Dr. name");
    } else if (newDoctorDetails.email === "")
    {
      toast.error("Please write Email");
    } else if (newDoctorDetails.contactNumber === "")
    {
      toast.error("Please write contact number");
    } else if (newDoctorDetails.workingDays === "")
    {
      toast.error("Please write working days");
    } else if (newDoctorDetails.workingHours === "")
    {
      toast.error("Please write working hours");
    } else if (newDoctorDetails.totalExperience === "")
    {
      toast.error("Please write total experience");
    } else if (newDoctorDetails.speciality === "")
    {
      toast.error("Please write speciality");
    } else if (newDoctorDetails.degree === "")
    {
      toast.error("Please write degree");
    } else if (newDoctorDetails.address?.pinCode === "")
    {
      toast.error("Please write Pincode");
    } else if (newDoctorDetails.address?.district === "")
    {
      toast.error("Please write district");
    } else if (newDoctorDetails.address?.state === "")
    {
      toast.error("Please write state");
    } else
    {
      console.log("New DOCTOR DETAILS", newDoctorDetails);
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

      if (!token)
      {
        console.error("No token found in local storage");
        localStorage.clear();
        navigate(`/doctorlogin`);
      }
      const response = await fetch(`${baseUrl}/api/v1/doctor/update_doctor`, {
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
        toast.error('"workingHours.interval" must be a string');
      }
      if (data.success === true)
      {
        console.log("Doctor updated successfully.");

        toast.success("Doctor updated successfully.");
        // onOpenModal()
        // navigate("/doctorlistadmin")

        // localStorage.setItem("id", data.data._id)
      }
      console.log("DATA from response", data);
    }
  };

  const handleChange1 = (value) =>
  {
    setDoctorDetails((prevDoctorDetails) => ({
      ...prevDoctorDetails,
      workingDays: value, // directly set the value, which is the updated array of working days
    }));
  };

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

  const handleDeleteDoctor = async () =>
  {
    const token = localStorage.getItem("token");
    const doctorId = localStorage.getItem("doctorId");
    if (!token)
    {
      console.error("No token found in local storage");
      localStorage.clear();
      navigate("/userlogin");
    }
    const response = await fetch(`${baseUrl}/api/v1/doctor/delete_doctor`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });
    const data = await response.json();

    if (data.success === true)
    {
      toast.success("Doctor Deleted successfully");
      navigate("/doctorlogin");
    }
    console.log("DATA from response", data);
  };

  const handleDelete = (workingDay) =>
  {
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
  const toggleQrCode = () =>
  {
    setShowQrCode(!showQrCode);
  };

  const handleRegister = async (e) =>
  {
    e.preventDefault();
    // Check if the token exists
    if (doctorDetails.name === "")
    {
      toast.error("Please write name");
    } else if (doctorDetails.email === "")
    {
      toast.error("Please write email");
    } else if (doctorDetails.contactNumber === "")
    {
      toast.error("Please write contact number");
    } else if (doctorDetails.totalExperience === "")
    {
      toast.error("Please write total experience");
    } else if (doctorDetails.degree === "")
    {
      toast.error("Please write degree");
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
      if (!token)
      {
        console.error("No token found in local storage");
        localStorage.clear();
        navigate(`/adminlogin`);
      }

      const isEmpty = Object.values(doctorDetails).some(
        (value) => value === ""
      );

      if (isEmpty || isEditing === false)
      {
        toast.error("Please fill the fields or Update");
        setIsEditing(false);
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

      if (data.statusCode === 400)
      {
        toast.error("Please fill the details");
      } else
      {
        toast.error("Contact number already registered");
      }

      if (data.message === "Permission denied")
      {
        toast.error("Permission Denied");
      }

      if (data.statusCode === 500)
      {
        toast.error("Enter Unique Values or Values already Exist ");
      }

      if (data.success === true)
      {
        navigate("/otp", {
          state: { contactNumber: doctorDetails.contactNumber },
        });
        localStorage.setItem("id", data.data._id);
      }
      console.log("DATA from response", data);
    }

    const handleDelete = (workingDay) =>
    {
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

  updateUser(doctorDetails?.name);
  updateUserEmail(doctorDetails?.email);
  updateUserimage(doctorDetails?.doctorPic);

  return (
    <>
      <div className="flex flex-col -ml-7  lg:flex-row">
        {/* --------------left-------------- */}
        <div className="flex flex-col border bg-white lg:w-2/5 xl:w-1/4 py-6 px-3  ml-5 my-5  ">
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
              onConfirm={handleDeleteDoctor}
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
                {doctorImage || doctorDetails?.doctorPic ? (
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
              Total Experience<span className="text-red-500">*</span>{" "}
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

          <div className="mt-3">
            <label
              for="specialist"
              className="block text-black text-lg font-semibold"
            >
              Specialist<span className="text-red-500">*</span>{" "}
            </label>
            <style>
              {`
          .ant-select-selector {
            border-color: white !important;
          }
        `}
            </style>

            <div class="border rounded-lg border-[#89CFF0]">
              <Select
                className="w-full border-none h-10 overflow-y-scroll "
                id="speciality"
                name="speciality"
                value={doctorDetails?.speciality}
                mode="multiple"
                onChange={handleChange2}
              >
                {SpecialtiesDropdown.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>

          <div className="mt-3">
            <label
              for="degree"
              className="block text-black text-lg font-semibold"
            >
              Degree<span className="text-red-500">*</span>{" "}
            </label>
            <input
              type="text"
              id="degree"
              name="degree"
              value={doctorDetails?.degree}
              onChange={handleChange}
              className="block mt-0 w-full placeholder-gray-400/70  rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            />
            {errors.degree && <p className="text-red-500">{errors.degree}</p>}
          </div>
        </div>

        {/* ----------------------------------right---------------------------------- */}
        <div className="border bg-white flex flex-col lg:w-3/5 xl:w-3/4 p-6 my-5 mx-3">
          <p className="text-3xl ">Personal Information</p>
          {
            showQrCode && (<p class="mx-auto ">
              {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" />}
            </p>)
          }
          <hr className="border my-2 " />
          {/* -------name------- */}
          <div className="flex flex-row">
            <div className="px-2 w-full sm:w-1/2 mt-3">
              <label
                for="name"
                className="block text-black text-lg font-semibold"
              >
                Name<span className="text-red-500">*</span>{" "}
              </label>
              <input
                type="text"
                placeholder=""
                id="name"
                name="name"
                value={doctorDetails?.name}
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
                type="number"
                // placeholder="Dr. Sneha Ahuja"
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
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                value={doctorDetails?.contactNumber}
                onChange={handleChange}
                onInput={(e) =>
                {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }}
                className="block  w-full placeholder-gray-400  rounded-lg border  bg-white px-5 py-2.5 text-gray-900  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              />
              <p class=" text-red-500 ">{mobileNumberError}</p>

              {/* {errors.name && <p className="text-red-500">{errors.name}</p>} */}
            </div>
          </div>

          <div className="flex flex-row">
            <div className="px-2 w-full sm:w-1/2 mt-3">
              <label
                for="interval"
                className="block text-black text-lg font-semibold"
              >
                Interval<span className="text-red-500">*</span>{" "}
              </label>
              <input
                type="text"
                id="interval"
                name="interval"
                value={doctorDetails?.workingHours?.interval}
                // placeholder="snehaahuja1234@gmail.com"
                onChange={handleChange}
                className="block  w-full placeholder-gray-400  rounded-lg border  bg-white px-5 py-2.5 text-gray-900  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>
            <div className="px-2 w-full sm:w-1/2 mt-3">
              <label
                for="consultationFee"
                className="block text-black text-lg font-semibold"
              >
                Consultation fees<span className="text-red-500">*</span>{" "}
              </label>
              <input
                type="number"
                // placeholder="+91-8603678862"
                id="consultationFee"
                name="consultationFee"
                value={doctorDetails?.consultationFee}
                onChange={handleChange}
                className="block  w-full placeholder-gray-400  rounded-lg border  bg-white px-5 py-2.5 text-gray-900  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              />
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
                <div className="flex lg:flex-row flex-col">
                  <div class="flex flex-row ">
                    <div className="px-2 lg:w-1/2  mt-3">
                      {doctorsList?.length === 0 ||
                        doctorDetails?.newDoctor === true ? (
                        <input
                          type="text"
                          placeholder="House No."
                          id="houseNo"
                          name="houseNo"
                          onChange={handleChange}
                          value={doctorDetails?.address?.houseNo}
                          className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                        />
                      ) : (
                        <input
                          type="text"
                          placeholder="House No."
                          id="houseNo"
                          name="houseNo"
                          value={doctorDetails?.address?.houseNo}
                          className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                        />
                      )}
                    </div>
                    <div className="px-2 lg:w-1/2 mt-3">
                      {doctorsList?.length === 0 ||
                        doctorDetails?.newDoctor === true ? (
                        <input
                          type="text"
                          id="floor"
                          name="floor"
                          onChange={handleChange}
                          value={doctorDetails?.address?.floor}
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
                          value={doctorDetails?.address?.block}
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
                        <input
                          type="text"
                          id="pinCode"
                          name="pinCode"
                          onChange={handleChange}
                          value={doctorDetails?.address?.pinCode}
                          placeholder="Pin Code*"
                          className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                          onInput={(e) =>
                          {
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
                </div>
                {/* ----------------------------area/landmark---------------------------- */}
                <div className="px-2 w-full mt-3 ">
                  {doctorsList?.length === 0 ||
                    doctorDetails?.newDoctor === true ? (
                    <input
                      type="text"
                      id="area"
                      name="area"
                      onChange={handleChange}
                      value={doctorDetails?.address?.area}
                      placeholder="Area/Landmark"
                      className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                  ) : (
                    <input
                      type="text"
                      id="area"
                      name="area"
                      value={doctorDetails?.address?.area}
                      placeholder="Area/Landmark"
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
                        value={doctorDetails?.address?.district}
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
                        value={doctorDetails?.address?.state}
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
            <input
              type="text"
              id="about"
              name="about"
              value={doctorDetails?.about}
              onChange={handleChange}
              // style={{ display: 'flex', flexWrap: 'wrap' }}
              className="flex flex-wrap w-full h-24 placeholder-gray-400 rounded-lg border bg-white px-5 py-2.5 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            />
            {errors.username && (
              <p className="text-red-500">{errors.username}</p>
            )}
          </div>
          <div className="flex flex-row-reverse mt-5 my-2 gap-4">
            <button
              className="btn btn-primary border py-3 px-4 rounded-3xl text-white"
              style={{
                backgroundColor: "#89CFF0",
              }}
              onClick={toggleQrCode}
            >
              Show Qr
            </button>
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
