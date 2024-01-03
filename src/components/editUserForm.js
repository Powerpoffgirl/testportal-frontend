import React, { useEffect, useRef, useState, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import Menu from "@mui/material/Menu";
import Modal from "react-responsive-modal";
import MenuItem from "@mui/material/MenuItem";
import { HiOutlineUserAdd } from "react-icons/hi";
import { FaRegTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdEdit } from "react-icons/md";
import UserContext from "./userContext";
import { Select } from "antd";

const DiseasesDropdown = [
  { label: "Common Cold", value: "Common Cold" },
  { label: "Influenza", value: "Influenza" },
  { label: "Asthma", value: "Asthma" },
  { label: "Diabetes Mellitus", value: "Diabetes Mellitus" },
  { label: "Hypertension", value: "Hypertension" },
  { label: "Arthritis", value: "Arthritis" },
  { label: "Depression", value: "Depression" },
  { label: "Anxiety Disorders", value: "Anxiety Disorders" },
  { label: "Allergic Rhinitis", value: "Allergic Rhinitis" },
  { label: "Reflux Esophagitis", value: "Reflux Esophagitis" },
  {
    label: "Chronic Obstructive Pulmonary Disease",
    value: "Chronic Obstructive Pulmonary Disease",
  },
  { label: "Migraine", value: "Migraine" },
  { label: "Chronic Kidney Disease", value: "Chronic Kidney Disease" },
  { label: "Heart Failure", value: "Heart Failure" },
  { label: "Anemia", value: "Anemia" },
  { label: "Coronary Artery Disease", value: "Coronary Artery Disease" },
  { label: "Hyperlipidemia", value: "Hyperlipidemia" },
  { label: "Osteoporosis", value: "Osteoporosis" },
  { label: "Gastroenteritis", value: "Gastroenteritis" },
  { label: "Bronchitis", value: "Bronchitis" },
  { label: "Pneumonia", value: "Pneumonia" },
  { label: "Urinary Tract Infection", value: "Urinary Tract Infection" },
  { label: "Skin Infections", value: "Skin Infections" },
  { label: "Sinusitis", value: "Sinusitis" },
  { label: "Tuberculosis", value: "Tuberculosis" },
  { label: "Hepatitis", value: "Hepatitis" },
  { label: "HIV/AIDS", value: "HIV/AIDS" },
  { label: "Dengue Fever", value: "Dengue Fever" },
  { label: "Typhoid Fever", value: "Typhoid Fever" },
  { label: "Malaria", value: "Malaria" },
  { label: "Chickenpox", value: "Chickenpox" },
  { label: "Measles", value: "Measles" },
  { label: "Peptic Ulcer Disease", value: "Peptic Ulcer Disease" },
  { label: "Pancreatitis", value: "Pancreatitis" },
  { label: "Irritable Bowel Syndrome", value: "Irritable Bowel Syndrome" },
  { label: "Crohn's Disease", value: "Crohn's Disease" },
  { label: "Rheumatoid Arthritis", value: "Rheumatoid Arthritis" },
  { label: "Psoriasis", value: "Psoriasis" },
  { label: "Eczema", value: "Eczema" },
  { label: "Lyme Disease", value: "Lyme Disease" },
  { label: "Sepsis", value: "Sepsis" },
  { label: "Osteoarthritis", value: "Osteoarthritis" },
  { label: "Thyroid Disorders", value: "Thyroid Disorders" },
  { label: "Epilepsy", value: "Epilepsy" },
  { label: "Parkinson's Disease", value: "Parkinson's Disease" },
  { label: "Alzheimer's Disease", value: "Alzheimer's Disease" },
  { label: "Multiple Sclerosis", value: "Multiple Sclerosis" },
  { label: "Cancer", value: "Cancer" },
];
const SymptomsDropdown = [
  { label: "Fever", value: "Fever" },
  { label: "Cough", value: "Cough" },
  { label: "Shortness of Breath", value: "Shortness of Breath" },
  { label: "Fatigue", value: "Fatigue" },
  { label: "Headache", value: "Headache" },
  { label: "Muscle or Body Aches", value: "Muscle or Body Aches" },
  { label: "Sore Throat", value: "Sore Throat" },
  { label: "Congestion or Runny Nose", value: "Congestion or Runny Nose" },
  { label: "Nausea or Vomiting", value: "Nausea or Vomiting" },
  { label: "Diarrhea", value: "Diarrhea" },
  { label: "Chills", value: "Chills" },
  { label: "Chest Pain", value: "Chest Pain" },
  { label: "Dizziness", value: "Dizziness" },
  { label: "Abdominal Pain", value: "Abdominal Pain" },
  { label: "Loss of Appetite", value: "Loss of Appetite" },
  { label: "Rapid Heartbeat", value: "Rapid Heartbeat" },
  { label: "Dehydration", value: "Dehydration" },
  { label: "Skin Rash", value: "Skin Rash" },
  { label: "Weight Loss", value: "Weight Loss" },
  { label: "Swelling", value: "Swelling" },
  { label: "Bruising", value: "Bruising" },
  { label: "Bleeding", value: "Bleeding" },
  { label: "Constipation", value: "Constipation" },
  { label: "Insomnia", value: "Insomnia" },
  { label: "Anxiety", value: "Anxiety" },
  { label: "Depression", value: "Depression" },
  { label: "Palpitations", value: "Palpitations" },
  { label: "Blurred Vision", value: "Blurred Vision" },
  { label: "Hearing Loss", value: "Hearing Loss" },
  { label: "Tinnitus", value: "Tinnitus" },
  { label: "Hair Loss", value: "Hair Loss" },
  { label: "Frequent Urination", value: "Frequent Urination" },
  { label: "Urinary Incontinence", value: "Urinary Incontinence" },
  { label: "Back Pain", value: "Back Pain" },
  { label: "Joint Pain", value: "Joint Pain" },
  { label: "Memory Loss", value: "Memory Loss" },
  { label: "Difficulty Concentrating", value: "Difficulty Concentrating" },
  { label: "Stiffness", value: "Stiffness" },
  { label: "Tremors", value: "Tremors" },
  { label: "Numbness or Tingling", value: "Numbness or Tingling" },
  { label: "Weakness", value: "Weakness" },
  { label: "Change in Vision", value: "Change in Vision" },
  { label: "Difficulty Swallowing", value: "Difficulty Swallowing" },
  { label: "Excessive Thirst", value: "Excessive Thirst" },
  { label: "Excessive Hunger", value: "Excessive Hunger" },
  { label: "Night Sweats", value: "Night Sweats" },
  { label: "Hot Flashes", value: "Hot Flashes" },
  { label: "Mood Swings", value: "Mood Swings" },
  { label: "Snoring", value: "Snoring" },
];

export default function EditUserForm()
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
  const onOpenModal = () => setOpen1(true);
  const onCloseModal = () => setOpen1(false);
  const appointmentDate = localStorage.getItem("appointment_date");
  const appointmentTime = localStorage.getItem("appointment_time");
  const [userDetails, setUserDetails] = useState({ name: "" });
  const [floorError, setFloorError] = useState("");
  const [newUser, setNewUser] = useState(false);

  const [appointmentDetails, setAppointmentDetails] = useState({
    doctorId: localStorage.getItem("doctorId"),
    patientId: "",
    appointmentDate: {
      date: localStorage.getItem("appointment_date"),
      time: localStorage.getItem("appointment_time"),
    },
    issues: [],
    diseases: [],
  });

  // const patientId = localStorage.getItem("patientId");
  const [patientDetails, setPatientDetails] = useState({
    name: "",
    age: "",
    ageType: "",
    gender: "",
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
    const fetchPatientList = async () =>
    {
      try
      {
        const token = localStorage.getItem("token");
        if (!token)
        {
          console.error("No token found in local storage");
          return;
        }
        const response = await fetch(
          `${baseUrl}/api/v1/user/get_patientsList`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token, // Replace with your actual token from the previous session
            },
          }
        );

        const data = await response.json();
        console.log("DATA from response", data);
        setPatientsList(data?.data);
      } catch (error)
      {
        console.error("There was an error verifying the OTP:", error);
      }
    };

    fetchPatientList();
  }, []);

  console.log("DATE TIME", appointmentDate, appointmentTime);
  const handleChangeIssues = (values) =>
  {
    setAppointmentDetails((prevAppointmentDetails) => ({
      ...prevAppointmentDetails,
      issues: values,
    }));
  };

  const handleChangeDiseases = (values) =>
  {
    setAppointmentDetails((prevAppointmentDetails) => ({
      ...prevAppointmentDetails,
      diseases: values,
    }));
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
        setUserImage(data.profilePicImageUrl);
        toast.success("Image uploaded successfully");

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
        if (data.data.newUser === true)
        {
          setNewUser(true)
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
    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      ageType: e,
    }));
  };

  const handleChange1 = (e) =>
  {
    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      gender: e,
    }));
  };

  const handleChange3 = (e) =>
  {
    console.log("HELLOOOOOOOO")
    setAppointmentDetails((prevAppointmentDetails) => ({
      ...prevAppointmentDetails,
      patientId: e,
    }));

    localStorage.setItem("patientId", e)
  };

  const handleChange = (e) =>
  {
    const { name, value } = e.target;

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
    if (newUserDetails.name === "")
    {
      toast.error("Please write name");
    } else if (newUserDetails.email === "")
    {
      toast.error("Please write email");
    } else if (newUserDetails.contactNumber === "")
    {
      toast.error("Please write contact number");
    } else if (newUserDetails.address?.pinCode === "")
    {
      toast.error("Please write Pincode");
    } else if (newUserDetails.address?.district === "")
    {
      toast.error("Please write district");
    } else if (newUserDetails.address?.state === "")
    {
      toast.error("Please write state");
    } else
    {
      const token = localStorage.getItem("token");
      const patientId = localStorage.getItem("patientId")
      if (newUser)
      {
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




      // if (data.success === true)
      // {
      console.log("====================APPOINTMENT DETAILS=====================", appointmentDetails)
      const response = await fetch(
        `${baseUrl}/api/v1/user/create_appointment`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
          body: JSON.stringify(appointmentDetails),
        }
      );
      const data = await response.json();
      console.log("DATA FROM APPOINTMENT BOOKING", data);
      if (data.success === true)
      {
        console.log("OPEN MODAL");
        onOpenModal();
        console.log("DATA FROM APPOINTMENT BOOKING", data)
        if (data.success === true)
        {
          toast.success("Appointment booked successfully")
          // console.log("Doctor updated successfully.");
          navigate("/appointmentlistuser");
        }
        console.log("Doctor updated successfully.");
      }
      console.log("DATA from response", data);
      // }
    };
  }

  useEffect(() =>
  {
    localStorage.setItem("patientId", appointmentDetails?.patientId)

    const fetchPatientDetails = async () =>
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
        const response = await fetch(`${baseUrl}/api/v1/user/get_patientDetails/${patientId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token, // Replace with your actual token from the previous session
          },
        });

        const data = await response.json();
        console.log("DATA from PAITIENTS response", data);
        console.log("SELECTED PATIENT DETAILS=================", data?.data)
        setPatientDetails(data?.data);
        localStorage.setItem("patientId", patientId)
        console.log("################PATIENT NAME$$$$$$$", data?.data.name);
      } catch (error)
      {
        console.error("There was an error verifying the OTP:", error);
      }
    };
    fetchPatientDetails();
  }, [appointmentDetails?.patientId])

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
  updateUser(userDetails.name);
  updateUserEmail(userDetails.email);
  updateUserimage(userDetails?.userPic);

  console.log("NEW USER", userDetails.newUser);
  console.log("PATIENTS LIST", patientsList);
  console.log("PATIENT DETAILS", patientDetails)

  return (
    <>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        styles={{
          modal: {
            backgroundColor: "#89CFF0",
            alignContent: "center",
            width: "30%",
          },
        }}
      >
        <div
          className="flex flex-col bg-customRedp-2  items-center w-[100%] Tabview:w-[100%]  mt-[2%]"
          style={{ borderRadius: "5px" }}
        >
          <text
            className="ml-4 text-center mt-4"
            style={{
              // fontSize: isTab ? "18px" : "26px",
              fontWeight: 600,
              lineHeight: "28.8px",
              fontFamily: "Lato, sans-serif",
              color: "#FFFFFF",
            }}
          >
            Congratulations
          </text>
          <text
            className="ml-4 text-center mt-4"
            style={{
              fontSize: "40px",
              fontWeight: 400,
              lineHeight: "24px",
              fontFamily: "Lato, sans-serif",
              color: "#FFFFFF",
              marginBottom: "2%",
            }}
          >
            {/* <img src={celebrate} alt="Congratulations" /> */}
          </text>

          <text
            className="ml-4 text-center mt-2"
            style={{
              // fontSize: isTab ? "16px" : "24px",
              fontWeight: 400,
              lineHeight: "28.8px",
              fontFamily: "Lato, sans-serif",
              color: "white",
            }}
          >
            Your Appointment Has Been Booked.
            <br />
            Please wait for Confirmation.
            <br />
          </text>
          <text
            className="ml-4 text-center mt-2"
            style={{
              // fontSize: isTab ? "16px" : "24px",
              fontWeight: 400,
              lineHeight: "28.8px",
              fontFamily: "Lato, sans-serif",
              color: "white",
            }}
          >
            <b> Thank You</b>
          </text>
        </div>
      </Modal>

      <div className="flex ">
        <div className="shadow-md bg-white flex flex-col w-full  p-6 my-5 mr-4">
          <p className="text-3xl ml-4">Appointment Details</p>
          <hr className="border my-2 " />
          {/* 1st flex-box */}
          <div className="flex flex-col Tabview:flex-row ">
            {/* -------name------- */}
            <div className="Tabview:w-1/2 Tabview:pr-2 ">
              <div className="mt-3">
                <label
                  htmlFor="name"
                  className="block text-black text-lg font-semibold"
                >
                  Name
                </label>
                {patientsList?.length === 0 || userDetails?.newUser === true ? (
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter Name"
                    onChange={handleChange}
                    className="block w-full placeholder-gray-400 rounded-lg border bg-white px-5 py-2.5 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                  />
                ) : (
                  <Select
                    className="h-11 block w-full placeholder-gray-400 rounded-lg border  bg-white text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    name="patientName"
                    onChange={handleChange3}
                    placeholder="Select Member"
                  >
                    {patientsList?.map((patient) => (
                      <Select.Option key={patient._id} value={patient._id}>
                        {patient.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
                {errors.name && <p className="text-red-500">{errors.name}</p>}
              </div>
            </div>

            {/* ------------age/age type/gender------------ */}
            <div className="Tabview:w-1/2 Tabview:pl-2">
              <div className="flex flex-col Tabview:flex-row ">
                <div className=" Tabview:w-1/3 Tabview:px-2 ">
                  <div className="mt-3">
                    <label
                      htmlFor="age"
                      className="block text-black text-lg font-semibold "
                    >
                      Age
                    </label>
                    {patientsList?.length === 0 ||
                      userDetails?.newUser === true ? (
                      <input
                        type="text"
                        id="age"
                        name="age"
                        onChange={handleChange}
                        className="block w-full placeholder-gray-400 rounded-lg border bg-white px-5 py-2.5 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      />
                    ) : (
                      <input
                        type="text"
                        id="age"
                        name="age"
                        value={patientDetails?.age}
                        className="block w-full placeholder-gray-400 rounded-lg border bg-white px-5 py-2.5 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      />
                    )}

                    {floorError && (
                      <p className="text-red-500 text-sm mt-1">{floorError}</p>
                    )}
                  </div>
                </div>
                <div className=" Tabview:w-1/3 Tabview:px-2">
                  <div className="mt-3 flex flex-col">
                    <label
                      className="block text-lg font-semibold text-black font-lato"
                      htmlFor="ageType"
                    >
                      Age Type
                    </label>
                    {patientsList?.length === 0 ||
                      userDetails?.newUser === true ? (
                      <Select
                        className="border rounded-lg h-11"
                        popupClassName="no-border-dropdown-menu"
                        id="ageType"
                        name="ageType"
                        onChange={handleChange2}
                        placeholder="Select Age Type"
                        style={{ overflowY: "auto" }}
                        dropdownStyle={{
                          maxHeight: "300px",
                          overflowY: "auto",
                        }}
                      >
                        {AgeType.map((option) => (
                          <Select.Option
                            key={option.value}
                            value={option.value}
                          >
                            {option.label}
                          </Select.Option>
                        ))}
                      </Select>
                    ) : (
                      <Select
                        className="border rounded-lg h-11"
                        popupClassName="no-border-dropdown-menu"
                        id="ageType"
                        name="ageType"
                        value={patientDetails?.ageType}
                        placeholder="Select Age Type"
                        style={{ overflowY: "auto" }}
                        dropdownStyle={{
                          maxHeight: "300px",
                          overflowY: "auto",
                        }}
                      >
                        {AgeType.map((option) => (
                          <Select.Option
                            key={option.value}
                            value={option.value}
                          >
                            {option.label}
                          </Select.Option>
                        ))}
                      </Select>
                    )}
                  </div>
                </div>
                <div className="Tabview:w-1/3 Tabview:px-2">
                  <div className="mt-3 flex flex-col">
                    <label
                      className="block text-lg font-semibold text-black font-lato"
                      htmlFor="gender"
                    >
                      Gender
                    </label>
                    {patientsList?.length === 0 ||
                      userDetails?.newUser === true ? (
                      <Select
                        className="border rounded-lg h-11"
                        popupClassName="no-border-dropdown-menu"
                        id="gender"
                        name="gender"
                        onChange={handleChange1}
                        placeholder="Select Gender"
                        style={{ overflowY: "auto" }}
                        dropdownStyle={{
                          maxHeight: "300px",
                          overflowY: "auto",
                        }}
                      >
                        {Gender.map((option) => (
                          <Select.Option
                            key={option.value}
                            value={option.value}
                          >
                            {option.label}
                          </Select.Option>
                        ))}
                      </Select>
                    ) : (
                      <Select
                        className="border rounded-lg h-11"
                        popupClassName="no-border-dropdown-menu"
                        id="gender"
                        name="gender"
                        value={patientDetails?.gender}
                        placeholder="Select Gender"
                        style={{ overflowY: "auto" }}
                        dropdownStyle={{
                          maxHeight: "300px",
                          overflowY: "auto",
                        }}
                      >
                        {Gender.map((option) => (
                          <Select.Option
                            key={option.value}
                            value={option.value}
                          >
                            {option.label}
                          </Select.Option>
                        ))}
                      </Select>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* -----------------------------------------2nd flex-box----------------------------------------- */}
          <div className="flex flex-col Tabview:flex-row">
            {/* ------------------------------------------------weight/date/time------------------------------------------------ */}
            <div className="Tabview:w-1/3 Tabview:pr-2">
              <div className="mt-5">
                <label
                  htmlFor="email1"
                  className="block text-black text-lg font-semibold"
                >
                  Body Weight
                </label>
                {patientsList?.length === 0 || userDetails?.newUser === true ? (
                  <input
                    type="text"
                    id="bodyWeight"
                    name="bodyWeight"
                    onChange={handleChange}
                    className="block w-full placeholder-gray-400 rounded-lg border bg-white px-5 py-2.5 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                  />
                ) : (
                  <input
                    type="text"
                    id="bodyWeight"
                    name="bodyWeight"
                    value={patientDetails?.bodyWeight}
                    className="block w-full placeholder-gray-400 rounded-lg border bg-white px-5 py-2.5 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                  />
                )}

                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>
            </div>
            <div className="Tabview:w-1/3 Tabview:pr-2">
              <div className="mt-5">
                <label
                  htmlFor="email2"
                  className="block text-black text-lg font-semibold"
                >
                  Appointment Date
                </label>
                <input
                  type="text"
                  id="appointmentDate"
                  name="appointmentDate"
                  onChange={handleChange}
                  value={appointmentDate}
                  className="block w-full placeholder-gray-400 rounded-lg border bg-white px-5 py-2.5 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>
            </div>
            <div className="Tabview:w-1/3">
              <div className="mt-5">
                <label
                  htmlFor="email3"
                  className="block text-black text-lg font-semibold"
                >
                  Appointment Time
                </label>
                <input
                  type="text"
                  id="appointmentTime"
                  name="appointmentTime"
                  onChange={handleChange}
                  value={appointmentTime}
                  className="block w-full placeholder-gray-400 rounded-lg border bg-white px-5 py-2.5 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>
            </div>
          </div>
          {/* -----------3rd flex-box----------- */}
          <div className="flex flex-col Tabview:flex-row">
            <div className="Tabview:w-1/2 Tabview:pr-2">
              <div className="mt-3 ">
                <label
                  htmlFor="contact"
                  className="block text-black text-lg font-semibold"
                >
                  Issues
                </label>
                <div class="">
                  <style>
                    {`
                    .ant-select-selector{
                      border-color: white !important;
                    }
                    `}
                  </style>
                  <Select
                    mode="multiple"
                    className={`h-11 block  w-full placeholder-gray-400 border-2 overflow-y-auto rounded-lg bg-white text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 `}
                    popupClassName="no-border-dropdown-menu" // Apply the custom class here
                    id="issues"
                    name="issues"
                    onChange={handleChangeIssues}
                    onInputKeyDown={(e) =>
                    {

                      if (e.key === 'Enter')
                      {
                        e.preventDefault();
                        let inputValue = e.target.value.trim();
                        if (inputValue)
                        {
                          handleChangeIssues([...appointmentDetails?.issues, inputValue]);
                          setTimeout(() =>
                          {
                            e.target.value = '';
                            inputValue = '';
                          }, 0);
                        }
                      }
                    }}
                    value={patientDetails?.issues}
                    placeholder="Select Issues"

                    dropdownStyle={{ maxHeight: "300px", overflowY: "auto" }}
                  >
                    {SymptomsDropdown.map((option) => (
                      <Select.Option key={option.value} value={option.value}>
                        {option.label}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
                {errors.contactNumber && (
                  <p className="text-red-500">{errors.contactNumber}</p>
                )}
              </div>
            </div>
            <div className="Tabview:w-1/2 Tabview:pl-2">
              <div className="mt-3 ">
                <label
                  htmlFor="contact"
                  className="block text-black text-lg font-semibold"
                >
                  Disease
                </label>
                <Select
                  mode="multiple"
                  className="h-11 block w-full placeholder-gray-400 rounded-lg border bg-white text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                  popupClassName="no-border-dropdown-menu" // Apply the custom class here
                  id="diseases"
                  name="diseases"
                  onChange={handleChangeDiseases}
                  onInputKeyDown={(e) =>
                  {

                    if (e.key === 'Enter')
                    {
                      e.preventDefault();
                      let inputValue = e?.target?.value?.trim();
                      if (inputValue)
                      {
                        handleChangeDiseases([...appointmentDetails?.diseases, inputValue]);
                        setTimeout(() =>
                        {
                          e.target.value = '';
                          inputValue = '';
                        }, 0);
                      }
                    }
                  }}
                  value={patientDetails?.diseases}
                  placeholder="Select Disease"
                  style={{ overflowY: "auto" }}
                  dropdownStyle={{ maxHeight: "300px", overflowY: "auto" }}
                >
                  {DiseasesDropdown.map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
                {errors.contactNumber && (
                  <p className="text-red-500">{errors.contactNumber}</p>
                )}
              </div>

              {/* Add the second input field here */}
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
                  <div className="px-2 w-1/4  mt-3">
                    {patientsList?.length === 0 ||
                      userDetails?.newUser === true ? (
                      <input
                        type="text"
                        placeholder="House No."
                        id="houseNo"
                        name="houseNo"
                        onChange={handleChange}
                        className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      />
                    ) : (
                      <input
                        type="text"
                        placeholder="House No."
                        id="houseNo"
                        name="houseNo"
                        value={patientDetails?.address?.houseNo}
                        className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      />
                    )}
                  </div>
                  <div className="px-2 w-1/4 mt-3">
                    {patientsList?.length === 0 ||
                      userDetails?.newUser === true ? (
                      <input
                        type="text"
                        id="floor"
                        name="floor"
                        onChange={handleChange}
                        placeholder="Floor"
                        className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      />
                    ) : (
                      <input
                        type="text"
                        id="floor"
                        name="floor"
                        value={patientDetails?.address?.floor}
                        placeholder="Floor"
                        className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      />
                    )}
                  </div>
                  <div className="px-2 w-1/4 mt-3">
                    {patientsList?.length === 0 ||
                      userDetails?.newUser === true ? (
                      <input
                        type="text"
                        id="block"
                        name="block"
                        onChange={handleChange}
                        placeholder="Block"
                        className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      />
                    ) : (
                      <input
                        type="text"
                        id="block"
                        name="block"
                        value={patientDetails?.address?.block}
                        placeholder="Block"
                        className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      />
                    )}

                    {errors.block && (
                      <p className="text-red-500">{errors.block}</p>
                    )}
                  </div>
                  <div className="px-2 w-1/4 mt-3">
                    {patientsList?.length === 0 ||
                      userDetails?.newUser === true ? (
                      <input
                        type="number"
                        id="pinCode"
                        name="pinCode"
                        onChange={handleChange}
                        placeholder="Pin Code"
                        className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      />
                    ) : (
                      <input
                        type="number"
                        id="pinCode"
                        name="pinCode"
                        value={patientDetails?.address?.pinCode}
                        placeholder="Pin Code"
                        className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      />
                    )}

                    {errors.pinCode && (
                      <p className="text-red-500">{errors.pinCode}</p>
                    )}
                  </div>
                </div>
                {/* ----------------------------area/landmark---------------------------- */}
                <div className="px-2 w-full mt-3 ">
                  {patientsList?.length === 0 ||
                    userDetails?.newUser === true ? (
                    <input
                      type="text"
                      id="area"
                      name="area"
                      onChange={handleChange}
                      placeholder="Area/Landmark"
                      className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                  ) : (
                    <input
                      type="text"
                      id="area"
                      name="area"
                      value={patientDetails?.address?.area}
                      placeholder="Area/Landmark"
                      className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                  )}

                  {errors.area && <p className="text-red-500">{errors.area}</p>}
                </div>

                <div className="flex flex-row">
                  <div className="px-2 w-1/2 mt-3">
                    {patientsList?.length === 0 ||
                      userDetails?.newUser === true ? (
                      <input
                        type="text"
                        id="district"
                        name="district"
                        onChange={handleChange}
                        placeholder="District"
                        className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      />
                    ) : (
                      <input
                        type="text"
                        id="district"
                        name="district"
                        value={patientDetails?.address?.district}
                        placeholder="District"
                        className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      />
                    )}

                    {errors.district && (
                      <p className="text-red-500">{errors.district}</p>
                    )}
                  </div>

                  <div className="px-2 w-1/2 mt-3">
                    {patientsList?.length === 0 ||
                      userDetails?.newUser === true ? (
                      <input
                        type="text"
                        id="state"
                        name="state"
                        onChange={handleChange}
                        placeholder="State"
                        className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      />
                    ) : (
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={patientDetails?.address?.state}
                        placeholder="State"
                        className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
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
          <div className="flex flex-row-reverse mt-5 my-2 ">
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
