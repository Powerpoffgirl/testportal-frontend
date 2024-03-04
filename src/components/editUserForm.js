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
import { useLocation } from "react-router-dom";

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

export default function EditUserForm() {
  const { updateUser, updateUserEmail, updateUserimage } =
    useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  console.log("LOCATION APPOINTMENT===", location?.state?.appointment);
  const baseUrl = process.env.REACT_APP_BASE_URL;
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
  const [pinCodeError, setPinCodeError] = useState("");
  const [houseNoError, setHouseNoError] = useState("");

  const [mobileNumberError, setmobileNumberError] = useState("");
  const [appointmentList, setAppointmentList] = useState([]);
  const [patientId, setPatientId] = useState(localStorage.getItem("patientId"));
  const inputRef = useRef(null);

  // ----------------------new Dates coming from base URL--------------------------------
  const selectedDate = location?.state?.selectedSlot.date;
  const selectedTime = location?.state?.selectedSlot.time;
  const selectedDoctor = location?.state?.selectedDoctor;
  const isEditing = location?.state?.isEditing;
  const oldAppointment = location?.state?.appointment;
  const oldAppointmentId = location?.state?.appointment?._id;

  console.log("=======OLD APPOINTMENT ID==========", oldAppointmentId);
  const [appointmentDetails, setAppointmentDetails] = useState({
    doctorId: selectedDoctor,
    patientId: patientId,
    appointmentDate: {
      date: selectedDate,
      time: selectedTime,
    },
    issues: [],
    diseases: [],
  });

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

  useEffect(() => {
    setPatientId(localStorage.getItem("patientId"));
    console.log("+++++++++++++++PATIENT ID++++++++++++", patientId);
  }, [patientId]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      localStorage.clear();
      navigate(`/userlogin`);
    }
  }, []);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const patientId = localStorage.getItem("patientId");
        if (!token) {
          console.error("No token found in local storage");
          return;
        }
        const response = await fetch(
          `${baseUrl}/api/v1/user/get_patientDetails/${patientId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token, // Replace with your actual token from the previous session
            },
          }
        );

        const data = await response.json();

        console.log("DATA from PAITIENTS response", data);
        console.log("SELECTED PATIENT DETAILS=================", data?.data);
        setPatientDetails(data?.data);
        // localStorage.setItem("patientId", patientId);
        console.log("################PATIENT NAME$$$$$$$", data?.data.name);
      } catch (error) {
        console.error("There was an error verifying the OTP:", error);
      }
    };
    fetchPatientDetails();
  }, [appointmentDetails?.patientId]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
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
        if (data.message === "Invalid or expired token") {
          localStorage.clear();
          toast.error("Invalid or Expired Token");
          navigate(`/userlogin`);
        }
        console.log("DATA from response", data);
        if (data.data.newUser === true) {
          setNewUser(true);
        }
        setUserDetails(data?.data);
        console.log("usser name$$$$$$$", data?.data.name);
      } catch (error) {
        console.error("There was an error verifying the OTP:", error);
      }
    };
    fetchUserDetails();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (patientDetails?.address?.pinCode?.length === 6) {
        try {
          const response = await fetch(
            `https://api.postalpincode.in/pincode/${patientDetails?.address?.pinCode}`,
            {
              method: "GET",
            }
          );

          if (!response.ok) {
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
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    if (patientDetails?.address?.pinCode.length === 6) {
      fetchData();
    }
  }, [patientDetails?.address?.pinCode]);

  useEffect(() => {
    const fetchPatientList = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
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
      } catch (error) {
        console.error("There was an error verifying the OTP:", error);
      }
    };
    fetchPatientList();

    const fetchAppointmentList = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in local storage");
          return;
        }
        const response = await fetch(
          `${baseUrl}/api/v1/user/get_all_appointments`,
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
        setAppointmentList(data?.data);
      } catch (error) {
        console.error("There was an error verifying the OTP:", error);
      }
    };
    fetchAppointmentList();
  }, []);

  const handleChangeIssues = (value) => {
    const cleanedValues = value.filter((item) => item.trim() !== " ");
    setAppointmentDetails({ ...appointmentDetails, issues: cleanedValues });
  };

  const handleChangeDiseases = (values) => {
    setAppointmentDetails((prevAppointmentDetails) => ({
      ...prevAppointmentDetails,
      diseases: values,
    }));
  };

  const handleChange2 = (e) => {
    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      ageType: e,
    }));
  };

  const handleChange1 = (e) => {
    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      gender: e,
    }));
  };

  const handleChange3 = (e) => {
    if (e === "add-member") {
      navigate("/patientform");
    }
    console.log("HELLOOOOOOOO");

    setAppointmentDetails((prevAppointmentDetails) => ({
      ...prevAppointmentDetails,
      patientId: e,
    }));

    localStorage.setItem("patientId", e);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "pinCode") {
      if (/^\d{6}$/.test(value) && !/[A-Za-z]/.test(value)) {
        setPinCodeError("");
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
      if ("houseNo" === name) {
        if (value.length > 5) {
          setHouseNoError("Max 5 chars.");
        } else {
          setHouseNoError("");
          setUserDetails((prevUserDetails) => ({
            ...prevUserDetails,
            address: {
              ...prevUserDetails.address,
              [name]: value,
            },
          }));
        }
      }

      setUserDetails((prevUserDetails) => ({
        ...prevUserDetails,
        address: {
          ...prevUserDetails.address,
          [name]: value,
        },
      }));

      setPatientDetails((prevPatientDetails) => ({
        ...prevPatientDetails,
        address: {
          ...prevPatientDetails.address,
          [name]: value,
        },
      }));
    } else {
      setUserDetails((prevUserDetails) => ({
        ...prevUserDetails,
        [name]: value,
      }));

      setPatientDetails((prevPatientDetails) => ({
        ...prevPatientDetails,
        [name]: value,
      }));
    }
  };

  const handleUpdate = async (e) => {
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
    if (newUserDetails.name === "") {
      toast.error("Please write name");
    } else if (newUserDetails.email === "") {
      toast.error("Please write email");
    } else if (newUserDetails.contactNumber === "") {
      toast.error("Please write contact number");
    } else if (newUserDetails.address?.pinCode === "") {
      toast.error("Please write Pincode");
    } else if (newUserDetails.address?.district === "") {
      toast.error("Please write district");
    } else if (newUserDetails.address?.state === "") {
      toast.error("Please write state");
    } else {
      const token = localStorage.getItem("token");
      const patientId = localStorage.getItem("patientId");
      // ---------------------if New User--------------------
      if (newUser) {
        if (!token) {
          console.error("No token found in local storage");
          localStorage.clear();
          navigate("/userlogin");
        }

        // -------------------------UPDATED USER HERE-------------------
        const response = await fetch(`${baseUrl}/api/v1/user/update_user`, {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
          body: JSON.stringify(newUserDetails),
        });
        const data = await response.json();

        if (data.statusCode === 400) {
          toast.error("Please fill the details");
        }

        // -------------------------UPDATED PATIENT HERE-------------------

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
              contactNumber: userDetails?.contactNumber,
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

        // -------------------------CREATE APPOINTMENT FOR NEW USER-------------------

        if (
          appointmentDetails.patientId === null ||
          appointmentDetails.patientId === "undefined"
        ) {
          toast.error("Please select a member.");
        } else {
          const appointmentResponse = await fetch(
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
          const appointmentData = await appointmentResponse.json();

          if (appointmentData.success === true) {
            // -------------------------SLOT BOOKED FOR NEW USER-------------------

            const response = await fetch(
              `${baseUrl}/api/v1/book_slot/${selectedDoctor}`,
              {
                method: "post",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  date: selectedDate,
                  time: selectedTime,
                }),
              }
            );
            const data = await response.json();
            if (data.success === true) {
              navigate("/appointmentlistuser");
              toast.success("Appointment booked successfully");
            } else {
              toast.error("Slot not available");
            }
          }
        }
      } else {
        if (!token) {
          console.error("No token found in local storage");
          localStorage.clear();
          navigate("/userlogin");
        }

        //-------- IF AN APPOINTMENT ALREADY EXSISTS AND USER WANTS TO EDIT IT
        if (isEditing) {
          //----------------1. UPDATE APPOINTMENT API------------------------
          const appointmentResponse = await fetch(
            `${baseUrl}/api/v1/user/update_appointmentById/${oldAppointmentId}`,
            {
              method: "put",
              headers: {
                "Content-Type": "application/json",
                "x-auth-token": token,
              },
              body: JSON.stringify({
                patientId: oldAppointment.patientId._id,
                doctorId: selectedDoctor,
                issues: oldAppointment.issues,
                diseases: oldAppointment.diseases,
                appointmentDate: {
                  date: selectedDate,
                  time: selectedTime,
                },
              }),
            }
          );
          const appointmentData = await appointmentResponse.json();

          if (appointmentData.success) {
            // ---------------2. BOOK  SLOT API--------------------------------
            const response = await fetch(
              `${baseUrl}/api/v1/book_slot/${selectedDoctor}`,
              {
                method: "post",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  date: selectedDate,
                  time: selectedTime,
                }),
              }
            );
            const data = await response.json();
            if (data.success === true) {
              toast.success("Appointment edited successfully");
            } else {
              toast.error("Slot not available for editing");
            }
          }
          // ---------------3. CANCEL SLOT API-------------------------------
          const response = await fetch(
            `${baseUrl}/api/v1/cancel_slot/${selectedDoctor}`,
            {
              method: "post",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                date: oldAppointment.appointmentDate.date,
                time: oldAppointment.appointmentDate.time,
              }),
            }
          );
          const data = await response.json();
          if (data.success === true) {
            navigate("/appointmentlistuser");
          } else {
            toast.error("Slot not available for cancelling");
          }
        } else {
          // ------------------------CHECK WHETHER AN APPOINTMENT ALREADY EXSISTS OR NOT---------------
          const existingAppointment = appointmentList?.find((appointment) => {
            if (
              appointment?.doctorId?._id === appointmentDetails?.doctorId &&
              appointment?.patientId?._id === appointmentDetails?.patientId &&
              appointment?.appointmentDate?.date >=
                appointmentDetails?.appointmentDate?.date
            ) {
              console.log(
                "IDS ARE MATCHING",
                appointment?.appointmentDate?.date,
                appointmentDetails?.appointmentDate?.date
              );
              return appointment;
            }
          });

          console.log("EXSISTING APPOINTMENT", existingAppointment);

          if (existingAppointment) {
            toast.error(
              "An appointment already exsists. Please edit that appointment"
            );
          } else {
            // -------------------------CREATE APPOINTMENT FOR OLD USER-------------------

            if (
              appointmentDetails.patientId === null ||
              appointmentDetails.patientId === "undefined"
            ) {
              toast.error("Please select a member.");
            } else {
              const appointmentResponse = await fetch(
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
              const appointmentData = await appointmentResponse.json();

              if (appointmentData.success === true) {
                // -------------------------SLOT BOOKED FOR OLD USER-------------------

                const response = await fetch(
                  `${baseUrl}/api/v1/book_slot/${selectedDoctor}`,
                  {
                    method: "post",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      date: selectedDate,
                      time: selectedTime,
                    }),
                  }
                );
                const data = await response.json();
                if (data.success === true) {
                  navigate("/appointmentlistuser");
                  toast.success("Appointment booked successfully");
                } else {
                  navigate("/doctorlistuser");
                  toast.error("Slot not available");
                }
              }
            }
          }
        }
      }
    }
  };

  console.log("User DETAILS", userDetails);
  updateUser(userDetails.name);
  updateUserEmail(userDetails.email);
  updateUserimage(userDetails?.userPic);

  console.log("NEW USER", userDetails.newUser);
  console.log("PATIENTS LIST", patientsList);
  console.log("PATIENT DETAILS", patientDetails);

  return (
    <>
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
                    className="h-11 block w-full placeholder-gray-400 rounded-lg border bg-white text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    name="patientName"
                    onChange={handleChange3}
                    placeholder="Select Member"
                    value={patientDetails?.name}
                  >
                    {patientsList?.map((patient) => (
                      <Select.Option key={patient._id} value={patient._id}>
                        {patient.name}
                      </Select.Option>
                    ))}
                    <Select.Option key="add-member" value="add-member">
                      Add member +
                    </Select.Option>
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
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                        }}
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
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, "");
                    }}
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
                  value={selectedDate}
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
                  value={selectedTime}
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
                    ref={inputRef}
                    onInputKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        let inputValue = e.target.value.trim();
                        if (inputValue) {
                          handleChangeIssues([
                            ...appointmentDetails?.issues,
                            inputValue,
                          ]);
                          inputRef.current.focus();
                          setTimeout(() => {
                            e.target.value = "";
                            inputValue = "";
                          }, 0);
                        }
                        inputRef.current.focus();
                      }
                    }}
                    value={appointmentDetails.issues}
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
                  onInputKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      let inputValue = e?.target?.value?.trim();
                      if (inputValue) {
                        handleChangeDiseases([
                          ...appointmentDetails?.diseases,
                          inputValue,
                        ]);
                        setTimeout(() => {
                          e.target.value = "";
                          inputValue = "";
                        }, 0);
                      }
                    }
                  }}
                  value={appointmentDetails.diseases}
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
                  <div className="px-2 w-1/2 mt-3">
                    <input
                      type="text"
                      placeholder="House No./Floor/Block"
                      id="houseNo"
                      name="houseNo"
                      onChange={handleChange}
                      value={patientDetails?.address?.houseNo}
                      className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />

                    {errors.district && (
                      <p className="text-red-500">{errors.district}</p>
                    )}
                  </div>

                  <div className="px-2 w-1/2 mt-3">
                    <input
                      type="text"
                      id="pinCode"
                      name="pinCode"
                      value={patientDetails?.address?.pinCode}
                      onChange={handleChange}
                      placeholder="Pin Code*"
                      className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, "");
                      }}
                    />

                    {pinCodeError && (
                      <p className="text-red-500">{pinCodeError}</p>
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
                      className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                  ) : (
                    <input
                      type="text"
                      id="area"
                      name="area"
                      value={patientDetails?.address?.area}
                      placeholder="Area/Landmark"
                      className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
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
                        value={patientDetails?.address?.district}
                        placeholder="District"
                        className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      />
                    ) : (
                      <input
                        type="text"
                        id="district"
                        name="district"
                        value={patientDetails?.address?.district}
                        placeholder="District"
                        className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
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
                        value={patientDetails?.address?.state}
                        placeholder="State"
                        className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      />
                    ) : (
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={patientDetails?.address?.state}
                        placeholder="State"
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
          <div className="flex flex-row-reverse mt-5 my-2 ">
            <button
              className="btn btn-primary border py-3 px-8 rounded-3xl text-white"
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
