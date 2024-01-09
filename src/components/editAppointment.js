import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Sidebar from "./sidebar";
import Header from "./header";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-responsive-modal";
import UserSidebar from "./userSidebar";
import AdminSidebar from "./adminSidebar";
import FormAppoinment from "./formAppointment";
import design from "../assets/design.svg";
import EditFormAppoinment from "./editFormAppointment";
import close_button from "../assets/close_button.svg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import education from "../assets/education.svg";
import home from "../assets/home.svg";
import phonelogo from "../assets/phone.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { Tooltip } from "antd";

export default function EditAppointment() {
  let isTab = useMediaQuery({ query: "(max-width: 768px)" });
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [open, setOpen] = useState(false);
  const [contactNumber, setcontactNumber] = useState(null);
  const [mobileNumberError, setmobileNumberError] = useState("");

  const [otppage, setotppage] = useState(false);
  const [bookingslottoggle, setbookingslottoggle] = useState(true);
  const [appointment, setappointment] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [resendClicked, setResendClicked] = useState(false);
  const [seconds, setSeconds] = useState(90);
  const [currentTimeIndex, setCurrentTimeIndex] = useState(0);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const otpInputs = [];

  const handleOtp = async () => {
    const response = await fetch(`${baseUrl}/api/v1/user/send_otp`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contactNumber: contactNumber }),
    });
    const data = await response.json();
    console.log("RESPONSE------", data);
    console.log("user id", data?.data?._id);
    localStorage.setItem("userId", data?.data?._id);
    setResendClicked(true);
    setSeconds(90);
    toast.success("Otp sent !!");

    setotppage(true);
  };

  const showappointment = () => {
    setappointment(!appointment);
  };

  const goToNext = () => {
    const isLastItem = currentIndex === bookingslot.length - 1;
    const nextIndex = isLastItem ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
    console.log(currentIndex);
  };

  const bookingslot = selectedDoctor.slots;
  let processedSlots = {};

  console.log("===============BOOKING SLOTS==============", bookingslot);
  for (let i in bookingslot) {
    let objTitle = bookingslot[i].date.split("T")[0];
    // Use the title as the index
    processedSlots[objTitle] = [];
  }

  for (let i in bookingslot) {
    if (bookingslot[i].date.split("T")[0] in processedSlots) {
      processedSlots[bookingslot[i].date.split("T")[0]].push({
        start: bookingslot[i].startTime,
        end: bookingslot[i].endTime,
        isBooked: bookingslot[i].isBooked,
        _id: bookingslot[i]._id,
      });
    }
  }

  const keys = Object.keys(processedSlots);
  // console.log(keys)
  const values = Object.values(processedSlots);

  const goToPrev = () => {
    const isFirstItem = currentIndex === 0;
    const prevIndex = isFirstItem ? bookingslot.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    console.log(currentIndex);
  };

  const SymptomsDropdown = [
    { label: "Select Symptom", value: "" },
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

  const verifyOTP = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const otpString = otp.join("");

      const response = await fetch(
        `${baseUrl}/api/v1/user/verify_otp/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp: otpString }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let data;
      try {
        data = await response.json();
      } catch (e) {
        throw new Error("Failed to parse JSON");
      }

      if (data?.success === true) {
        console.log(
          "=============================DATA from response=========================",
          data
        );

        if (data?.data?.data?.newUser === true) {
          const patientId = data?.patient?._id;
          if (patientId) {
            console.log("Storing patient ID in local storage", patientId);
            localStorage.setItem("patientId", patientId);
          } else {
            console.error("Patient ID is undefined");
          }
        } else {
          // Handle the case where newUser is not true or undefined
        }

        localStorage.setItem("token", data?.data?.token);
        navigate("/edituserform");
      }
    } catch (error) {
      console.error("There was an error verifying the OTP:", error);
    }
  };

  function getYearMonthDay(dateString) {
    // Create a new Date object using the provided date string
    const date = new Date(dateString);

    // Get the year, month, day, and day of the week from the date
    const year = date.getFullYear(); // Retrieves the year as a four-digit number
    const month = date.getMonth() + 1; // getMonth() returns 0-11, so adding 1 for human-readable format
    const day = date.getDate(); // Retrieves the day of the month
    const dayOfWeek = date.getDay(); // Retrieves the day of the week (0-6)
    // console.log(month)
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayName = dayNames[dayOfWeek];

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthName = monthNames[month - 1];

    return { year, monthName, day, dayName };
  }

  const handleDateClick = (index) => {
    setCurrentIndex(index);
    console.log(currentIndex);
  };

  const handleTimeClick = (time) => {
    // console.log(time)
    setCurrentTimeIndex(time);
    console.log(currentTimeIndex);
  };

  const workingDays =
    selectedDoctor && selectedDoctor.workingDays
      ? abbreviateAndCombineDays(selectedDoctor.workingDays)
      : "";
  const [doctorConsultationFee, setdoctorConsultationFee] = useState();
  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const appointmentId = localStorage.getItem("appointmentId");
        if (!token) {
          console.error("No token found in local storage");
          return;
        }
        const response = await fetch(
          `${baseUrl}/api/v1/user/get_appointmentById/${appointmentId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token, // Replace with your actual token from the previous session
            },
          }
        );

        const data = await response.json();

        console.log(
          "DATA from USE EFFECT get_appointmentById response",
          data?.data
        );
        console.log(
          "consultation fee ",
          data?.data?.doctorId?.consultationFee
        );
        setdoctorConsultationFee(data?.data?.doctorId?.consultationFee)

        setSelectedDoctor({
          _id: data?.data?.doctorId?._id,
          name: data?.data?.doctorId?.name,
          consultationFee: data?.data?.doctorId?.consultationFee,
          speciality: data?.data?.doctorId?.speciality,
          degree: data?.data?.doctorId?.degree,
          email: data?.data?.doctorId?.email,
          registrationNo: data?.data?.doctorId?.registrationNo,
          totalExperience: data?.data?.doctorId.totalExperience,
          about: data?.data?.doctorId?.about,
          issues: data?.data?.doctorId?.issues,
          address: {
            houseNo: data?.data?.doctorId?.address?.houseNo,
            block: data?.data?.doctorId?.address?.block,
            area: data?.data?.doctorId?.address?.area,
            district: data?.data?.doctorId?.address?.district,
            state: data?.data?.doctorId?.address?.state,
            pinCode: data?.data?.doctorId?.address?.pinCode,
          },
          workingHours: data?.data?.doctorId?.workingHours,
          slots: data?.data?.doctorId?.slots,
          appointmentDate: {
            date: data?.data?.doctorId?.date,
            time: data?.data?.doctorId?.time,
          },
          workingDays: data?.data?.doctorId?.workingDays, // Include the timing property if available
        });

        setAppointmentDetails(data?.data);
      } catch (error) {
        console.error("There was an error verifying the OTP:", error);
      }
    };
    fetchAppointmentDetails();
  }, []);

  function abbreviateAndCombineDays(days) {
    const weekDays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const dayIndexes = days.map((day) => weekDays.indexOf(day));
    let combinedDays = [];
    let i = 0;

    while (i < dayIndexes.length) {
      let startDay = weekDays[dayIndexes[i]].substring(0, 3);
      let endDayIndex = i;

      while (
        endDayIndex < dayIndexes.length - 1 &&
        dayIndexes[endDayIndex + 1] === dayIndexes[endDayIndex] + 1
      ) {
        endDayIndex++;
      }

      let endDay = weekDays[dayIndexes[endDayIndex]].substring(0, 3);

      if (i === endDayIndex) {
        combinedDays.push(startDay);
      } else {
        combinedDays.push(`${startDay}-${endDay}`);
      }

      i = endDayIndex + 1;
    }

    return combinedDays.join(" ");
  }

  const [input, setInput] = useState("");
  const [filteredSymptoms, setFilteredSymptoms] = useState(SymptomsDropdown);

  const handleInputChange = (e) => {
    const userInput = e.target.value;
    setInput(userInput);
    filterSymptoms(userInput);
  };

  const handleBookAppointment = async () => {
    console.log("date", keys[currentIndex]);
    console.log("slot", values[currentIndex][currentTimeIndex].start);
    const bookslot = {
      date: keys[currentIndex],
      time: values[currentIndex][currentTimeIndex].start,
    };
    console.log("selected doctor", selectedDoctor?._id);
    const response = await fetch(
      `${baseUrl}/api/v1/book_slot/${selectedDoctor?._id}`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookslot),
      }
    );

    const data = await response.json();

    console.log("slot booked", data);
    localStorage.setItem(
      "appointment_date",
      data?.doctorSlot?.date?.split("T")[0]
    );
    localStorage.setItem("appointment_time", data?.doctorSlot?.startTime);

    showappointment();
    // showSlot();

    if (data.success === true) {
      toast.success("Slot selected Successfully!");
      navigate("/edituserform");
    } else {
      toast.error("Please book another slot", {
        // position: "top-center",
      });
    }
  };

  const filterSymptoms = (userInput) => {
    if (!userInput) {
      setFilteredSymptoms(SymptomsDropdown);
    } else {
      const filtered = SymptomsDropdown.filter((symptom) =>
        symptom.label.toLowerCase().includes(userInput.toLowerCase())
      );
      setFilteredSymptoms(filtered);
    }
  };

  const handleOptionSelect = (selectedValue) => {
    // Check if the selected issue is already in the list
    if (!appointmentDetails.issues.includes(selectedValue)) {
      // If not, add it to the list
      setAppointmentDetails((prevDetails) => ({
        ...prevDetails,
        issues: [...prevDetails.issues, selectedValue],
      }));
    }

    // Optionally, clear the input after selection
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission only for Enter key
      if (filteredSymptoms.length > 0) {
        handleOptionSelect(filteredSymptoms[0].value);
      }
    }
  };

  const DiseasesDropdown = [
    { label: "Select Disease", value: "" },
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "date" || name === "time") {
      setAppointmentDetails((prevPatientDetails) => ({
        ...prevPatientDetails,
        appointmentDate: {
          ...prevPatientDetails.appointmentDate,
          [name]: value,
        },
      }));
    }
    if (["issues"].includes(name)) {
      // Assuming the value is an array or a string to be added to the array
      setAppointmentDetails((prevPatientDetails) => ({
        ...prevPatientDetails,
        [name]: Array.isArray(value)
          ? value
          : [...prevPatientDetails[name], value],
      }));
    } else if (["diseases"].includes(name)) {
      // Assuming the value is an array or a string to be added to the array
      setAppointmentDetails((prevPatientDetails) => ({
        ...prevPatientDetails,
        [name]: Array.isArray(value)
          ? value
          : [...prevPatientDetails[name], value],
      }));
    } else {
      setAppointmentDetails((prevPatientDetails) => ({
        ...prevPatientDetails,
        [name]: value,
      }));
    }
  };

  console.log("APPOINTMENT DETAILS", appointmentDetails);

  // const handleRegister = async (e) =>
  // {
  //     e.preventDefault();
  //     // Check if the token exists
  //     const newAppointmentDetails = {
  //         doctorId: appointmentDetails?.doctorId,
  //         patientId: appointmentDetails?.patientId,
  //         appointmentDate: {
  //             date: appointmentDetails?.appointmentDate.date,
  //             time: appointmentDetails?.appointmentDate.time
  //         },
  //         issues: appointmentDetails?.issues,
  //         diseases: appointmentDetails?.diseases,
  //     }
  //     const token = localStorage.getItem("token");
  //     const appointmentId = localStorage.getItem("appointmentId")
  //     if (!token)
  //     {
  //         console.error("No token found in local storage");
  //         return;
  //     }

  //     const response = await fetch(
  //         `${baseUrl}/api/v1/user/update_appointmentById/${appointmentId}`,
  //         {
  //             method: "put",
  //             headers: {
  //                 "Content-Type": "application/json",
  //                 "x-auth-token": token,
  //             },
  //             body: JSON.stringify(newAppointmentDetails)
  //         }
  //     );
  //     const data = await response.json();
  //     if (data.success === true)
  //     {
  //         // navigate("/otp")
  //         onOpenModal()
  //         localStorage.setItem("id", data.data._id)
  //     }
  //     console.log("DATA from response", data)
  // }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <>
      <div>
        <div class=" ">
          <div className="flex lg:flex-row p-2 pt-5 flex-col ">
            {/* ---------------------------left part--------------------------- */}
            <div className="flex flex-col  px-1 lg:w-1/2 mr-10">
              <div className=" mx-auto">
                {selectedDoctor?.doctorPic ? (
                  <img
                    src={selectedDoctor?.doctorPic}
                    alt="doctor image"
                    className=" max-w-fit"
                  ></img>
                ) : (
                  <AccountCircleIcon
                    style={{ height: '100%', width: '100%', color: "#B1DAED", }}
                  />
                )}
              </div>
              <div className="flex flex-col  py-4 px-5 bg-white mt-1">
                <p className="text-xs text-black font-medium mb-2">
                  Registration No. :- {selectedDoctor?.registrationNo}
                </p>

                <p className="text-black text-3xl font-medium mb-2">
                  Dr. {selectedDoctor?.name}
                </p>
                <div className="flex flex-row">
                  <div>
                    <img src={education} className="w-5 py-2 "></img>
                  </div>
                  <div className="ml-1">
                    {selectedDoctor?.degree?.split(",")?.map((item) => (
                      <p className="text-gray-600 text-xl mb-1">{item}</p>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-xl mb-2">
                  {selectedDoctor?.totalExperience} Years Experience
                </p>

                <div className="flex flex-row space-x-2">
                  <div className="mt-2">
                    <img
                      src={home}
                      style={{ minWidth: "15px", maxWidth: "16px" }}
                    ></img>
                  </div>
                  <div className="">
                    <p className="text-gray-600 text-xl ">
                      {selectedDoctor?.address?.houseNo +
                        " " +
                        selectedDoctor?.address?.block +
                        " " +
                        selectedDoctor?.address?.area +
                        ", " +
                        selectedDoctor?.address?.district +
                        ", " +
                        selectedDoctor?.address?.state +
                        " " +
                        selectedDoctor?.address?.pinCode}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* --------------------------------right part-------------------------------- */}
            <div className="flex flex-col   lg:w-1/2 px-2 mr-16">
              <div className=" py-1 mb-2">
                <p className="text-lg font-medium text-black ">SPECIALITY</p>
                <div className="flex flex-wrap ">
                  {selectedDoctor?.speciality?.map((item, index) => {
                    return (
                      <p
                        key={index}
                        className="bg-white rounded-xl py-1 px-4 mx-2 my-1 "
                      >
                        {item}
                      </p>
                    );
                  })}
                </div>
              </div>
              <div className=" py-1 mb-2">
                <p className="text-lg font-medium text-black">
                  About The Doctor
                </p>
                <p className=" italic text-gray-600">{selectedDoctor?.about}</p>
              </div>

              <div className=" py-1 mb-2">
                <p className="text-lg font-medium text-black">Timing</p>
                <div className="flex flex-row  place-content-between">
                  {workingDays.split(" ")[0] && (
                    <div className="flex flex-col">
                      <p className="text-gray-600 font-semibold">
                        {workingDays.split(" ")[0]}:
                      </p>
                      <p className="text-gray-600">
                        {selectedDoctor?.workingHours?.workHourFrom} -{" "}
                        {selectedDoctor?.workingHours?.workHourTo}
                      </p>
                      {/* <p className="text-gray-600">3:00 AM - 7:00 PM</p> */}
                    </div>
                  )}
                  {workingDays.split(" ")[1] && (
                    <div className="flex flex-col">
                      <p className="text-gray-600 font-semibold">
                        {workingDays.split(" ")[1]}:
                      </p>
                      <p className="text-gray-600">
                        {selectedDoctor?.workingHours?.workHourFrom} -{" "}
                        {selectedDoctor?.workingHours?.workHourTo}
                      </p>
                      {/* <p className="text-gray-600">3:00 AM - 7:00 PM</p> */}
                    </div>
                  )}
                </div>
                <div className="flex flex-row place-content-between">
                  {workingDays.split(" ")[2] && (
                    <div className="flex flex-col">
                      <p className="text-gray-600 font-semibold">
                        {workingDays.split(" ")[2]}:
                      </p>
                      <p className="text-gray-600">
                        {selectedDoctor?.workingHours?.workHourFrom} -{" "}
                        {selectedDoctor?.workingHours?.workHourTo}
                      </p>
                      {/* <p className="text-gray-600">3:00 AM - 7:00 PM</p> */}
                    </div>
                  )}
                </div>
              </div>

              <div className=" py-1 mb-2">
                <p className="text-lg font-medium text-black">Select service</p>

                <div className="flex flex-col mb-2">
                  <div className="flex flex-col  bg-white p-1 px-3">
                    <p className="flex place-content-between my-1">
                      <span className="font-medium px-2">Consultation</span>{" "}
                      <span className="font-bold px-2">Rs {doctorConsultationFee}</span>
                    </p>
                    <div>
                      {bookingslottoggle && (
                        <div className="flex flex-col">
                          <div className=" flex flex-col text-center space-y-2">
                            <div class="flex flex-row border-2 overflow-x-scroll">
                              <button
                                className="text-white text-xs rounded-3xl  "
                                onClick={goToPrev}
                              >
                                <FaAngleLeft style={{ color: "black" }} />
                              </button>
                              <div className="flex flex-row overflow-x-auto mx-auto ">
                                {keys.map((item, index) => {
                                  const { year, monthName, day, dayName } =
                                    getYearMonthDay(item);
                                  // console.log(index)
                                  const bg =
                                    currentIndex === index
                                      ? "bg-[#B3E7FB]"
                                      : "bg-gray-200";
                                  return (
                                    <div
                                      key={index}
                                      className="flex flex-col px-2"
                                      onClick={() => {
                                        handleDateClick(index);
                                      }}
                                    >
                                      <p>{monthName}</p>
                                      <p
                                        className={` p-2 border-2 pl-3 pr-3 rounded-lg ${bg}`}
                                      >
                                        {day}
                                      </p>
                                      <p>{dayName}</p>
                                    </div>
                                  );
                                })}
                              </div>
                              <button
                                className="text-white text-xs rounded-3xl"
                                onClick={goToNext}
                              >
                                <FaAngleRight style={{ color: "black" }} />
                              </button>
                            </div>

                            <div className="flex flex-wrap -mx-2 space-y-2 my-2 overflow-y-scroll h-32 px-2">
                              {values[currentIndex]?.map((item, index) => {
                                const marginb = index === 0 ? " mt-2 -" : "";
                                if (index === currentTimeIndex) {
                                  return (
                                    <div
                                      key={index}
                                      className={` w-1/4 px-4  ${marginb} `}
                                      disabled={item.isBooked}
                                    >
                                      <div
                                        className={` rounded-3xl py-1 px-2 text-gray-800  bg-[#B3E7FB]`}
                                        onClick={() => {
                                          handleTimeClick(index);
                                        }}
                                      >
                                        {item.start}
                                      </div>
                                    </div>
                                  );
                                } else if (item.isBooked === true) {
                                  return (
                                    <Tooltip
                                      placement="top"
                                      title="Booked Slots"
                                    >
                                      <div
                                        key={index}
                                        className={` w-1/4 px-4 ${marginb}`}
                                        disabled
                                      >
                                        <div
                                          className={` rounded-3xl py-1  px-2 `}
                                          style={{
                                            backgroundColor: "#4974a5",
                                            color: "white",
                                          }}
                                        >
                                          {item.start}
                                        </div>
                                      </div>
                                    </Tooltip>
                                  );
                                } else {
                                  return (
                                    <div
                                      key={index}
                                      className={` w-1/4 px-4  ${marginb}`}
                                      onClick={() => {
                                        handleTimeClick(index);
                                      }}
                                    >
                                      <div
                                        className={` rounded-3xl py-1 px-2 text-gray-800 bg-gray-200  `}
                                      >
                                        {item.start}
                                      </div>
                                    </div>
                                  );
                                }
                              })}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-row-reverse my-1">
                      {bookingslottoggle && !appointment && (
                        <div class="flex mx-auto space-x-4 mt-3">
                          <button
                            className="text-white text-sm rounded-3xl px-5 py-2 mb-1 "
                            onClick={handleBookAppointment}
                            style={{ backgroundColor: " #89CFF0" }}
                          >
                            Book Appointment
                          </button>
                          {/* <button className="text-white text-xs rounded-3xl px-3 py-1 " onClick={() => { showSlot() }} style={{ backgroundColor: ' #89CFF0' }}>
                          Go Back
                        </button> */}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="p-3 h-32">
        <div className="flex h-16 flex-row justify-between bg-[#89CFF0] w-full rounded-full px-10 pr-0">
          <div class="flex items-center gap-x-2">
            <img
              class="object-cover w-12 h-12 rounded-full"
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100"
              alt=""
            />
            <div>
              <h1 class="text-xl font-semibold text-white capitalize">
                {selectedDoctor.name}
              </h1>
              <p class="text-base text-white">{selectedDoctor.email}</p>
            </div>
          </div>
          <img
            className="h-16 hidden sm:block md:hidden lg:block"
            src={design}
            alt="design"
          />
        </div>
      </div> */}
      {/* <EditFormAppoinment appointmentDetails={appointmentDetails} /> */}
    </>
  );
}
