import React, { useEffect, useState, useRef } from "react";
import DoctorSidebar from "./doctorSidebar";
import { useMediaQuery } from "react-responsive";
import { Modal } from "react-responsive-modal";
import UserSidebarWithoutLogin from "./UserSidebarWithoutLogin";
import PatientHeader from "./patientHeader";
import { useNavigate } from "react-router-dom";
import one from "../assets/one.svg";
import two from "../assets/two.svg";
import three from "../assets/three.svg";
import home from "../assets/home.svg";
import education from "../assets/education.svg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; ``
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import phonelogo from "../assets/phone.svg";
import close_button from "../assets/close_button.svg";
import delete_button from "../assets/delete_button.svg";
import edit_button from "../assets/edit_button.svg";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const svg1 = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.7778 10C17.7778 7.83333 17.0231 5.99537 15.5139 4.48611C14.0046 2.97685 12.1667 2.22222 10 2.22222V0C11.3889 0 12.6898 0.263889 13.9028 0.791667C15.1157 1.31944 16.1713 2.03241 17.0694 2.93056C17.9676 3.8287 18.6806 4.88426 19.2083 6.09722C19.7361 7.31019 20 8.61111 20 10H17.7778ZM13.3333 10C13.3333 9.07407 13.0093 8.28704 12.3611 7.63889C11.713 6.99074 10.9259 6.66667 10 6.66667V4.44444C11.537 4.44444 12.8472 4.98611 13.9306 6.06944C15.0139 7.15278 15.5556 8.46296 15.5556 10H13.3333ZM18.8333 20C16.5185 20 14.2315 19.4954 11.9722 18.4861C9.71296 17.4769 7.65741 16.0463 5.80556 14.1944C3.9537 12.3426 2.52315 10.287 1.51389 8.02778C0.50463 5.76852 0 3.48148 0 1.16667C0 0.833333 0.111111 0.555556 0.333333 0.333333C0.555556 0.111111 0.833333 0 1.16667 0H5.66667C5.92593 0 6.15741 0.087963 6.36111 0.263889C6.56482 0.439815 6.68519 0.648148 6.72222 0.888889L7.44444 4.77778C7.48148 5.07407 7.47222 5.32407 7.41667 5.52778C7.36111 5.73148 7.25926 5.90741 7.11111 6.05556L4.41667 8.77778C4.78704 9.46296 5.22685 10.125 5.73611 10.7639C6.24537 11.4028 6.80556 12.0185 7.41667 12.6111C7.99074 13.1852 8.59259 13.7176 9.22222 14.2083C9.85185 14.6991 10.5185 15.1481 11.2222 15.5556L13.8333 12.9444C14 12.7778 14.2176 12.6528 14.4861 12.5694C14.7546 12.4861 15.0185 12.463 15.2778 12.5L19.1111 13.2778C19.3704 13.3519 19.5833 13.4861 19.75 13.6806C19.9167 13.875 20 14.0926 20 14.3333V18.8333C20 19.1667 19.8889 19.4444 19.6667 19.6667C19.4444 19.8889 19.1667 20 18.8333 20ZM3.36111 6.66667L5.19444 4.83333L4.72222 2.22222H2.25C2.34259 2.98148 2.47222 3.73148 2.63889 4.47222C2.80556 5.21296 3.0463 5.94444 3.36111 6.66667ZM13.3056 16.6111C14.0278 16.9259 14.7639 17.1759 15.5139 17.3611C16.2639 17.5463 17.0185 17.6667 17.7778 17.7222V15.2778L15.1667 14.75L13.3056 16.6111Z" fill="#89CFF0"/>
</svg>`;
const svg2 = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 12H12V10H4V12ZM4 9H16V7H4V9ZM4 6H16V4H4V6ZM0 20V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H4L0 20ZM3.15 14H18V2H2V15.125L3.15 14Z" fill="#89CFF0"/>
</svg>`;

const svg3 = `<svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.5 0L15.3064 8.63729H24.3882L17.0409 13.9754L19.8473 22.6127L12.5 17.2746L5.15268 22.6127L7.95911 13.9754L0.611794 8.63729H9.69357L12.5 0Z" fill="#FFF500"/>
</svg>`;

const svg4 = `<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.2237 22.2222V20.243L8.6473 6.66664L6.66813 8.6458L20.2445 22.2222H22.2237ZM25.0015 25H19.0987L0.800076 6.66664C0.545446 6.38886 0.348687 6.08214 0.209798 5.7465C0.0709093 5.41085 0.00146484 5.05784 0.00146484 4.68747C0.00146484 4.3171 0.0709093 3.9583 0.209798 3.61108C0.348687 3.26386 0.55702 2.96293 0.834798 2.7083L2.77924 0.798582C3.03387 0.520803 3.3348 0.318256 3.68202 0.190942C4.02924 0.0636268 4.37646 -3.09348e-05 4.72369 -3.09348e-05C5.09406 -3.09348e-05 5.44707 0.0636268 5.78271 0.190942C6.11836 0.318256 6.42508 0.520803 6.70285 0.798582L25.0015 19.0972V25ZM7.67508 7.67358L6.66813 8.6458L8.6473 6.66664L7.67508 7.67358Z" fill="white"/>
</svg>`;

const svg5 = `<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.6875 24.9999C3.82812 24.9999 3.09245 24.7279 2.48047 24.1839C1.86849 23.6399 1.5625 22.986 1.5625 22.2221V4.16654H0V1.38877H7.8125V-0.00012207H17.1875V1.38877H25V4.16654H23.4375V22.2221C23.4375 22.986 23.1315 23.6399 22.5195 24.1839C21.9076 24.7279 21.1719 24.9999 20.3125 24.9999H4.6875ZM20.3125 4.16654H4.6875V22.2221H20.3125V4.16654ZM7.8125 19.4443H10.9375V6.94432H7.8125V19.4443ZM14.0625 19.4443H17.1875V6.94432H14.0625V19.4443Z" fill="white"/>
</svg>`;

export default function DoctorList({ searchTerm }) {
  let isTab = useMediaQuery({ query: "(max-width: 768px)" });
  const [doctorsList, setDoctorsList] = useState([]);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [selectedDoctor, setselectedDoctor] = useState("");
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [filteredDoctors, setFilteredDoctors] = useState([doctorsList]);
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(90);
  const [resendClicked, setResendClicked] = useState(false);
  const [firstTime, setFirstTime] = useState(true);

  const categories = [
    "All",
    "General Medicine",
    "Cardiology",
    "Dermatology",
    "Endocrinology",
    "Urology",
  ];

  useEffect(() => {
    localStorage.clear();
  }, []);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/v1/list_doctors`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log("DATA from response", data);
        const verifiedDoctors = data.data.filter(
          (doctor) => doctor.accountVerified.isVerified
        );
        setDoctorsList(verifiedDoctors);
      } catch (error) {
        console.error("There was an error verifying the OTP:", error);
      }
    };
    fetchDoctorDetails();
  }, [searchTerm]);

  useEffect(() => {
    // Check if there is a searchTerm and the doctorsList is not empty.
    if (doctorsList?.length > 0 && searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
      const matchedDoctors = doctorsList.filter(doctor => {
        // Check if the doctor's name includes the searchTerm
        const nameMatch = doctor.name?.toLowerCase().includes(lowerCaseSearchTerm);

        // Check if any of the doctor's specialities include the searchTerm
        const specialityMatch = doctor.speciality?.some(speciality =>
          speciality.toLowerCase().includes(lowerCaseSearchTerm)
        );

        return nameMatch || specialityMatch;
      });
      setFilteredDoctors(matchedDoctors);
    } else {
      // If no searchTerm or doctorsList is empty, use the original list.
      setFilteredDoctors(doctorsList);
    }
  }, [doctorsList, searchTerm]);

  const handleQRCode = (doctorId) => {
    console.log("HELLO");
    localStorage.setItem("doctorId", doctorId);
    const doctor = doctorsList?.find((doc) => doc._id === doctorId);
    setselectedDoctor(doctor);
    console.log(selectedDoctor);
    // console.log(selectedDoctor.degree.split(','))
    onOpenModal();
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
    showSlot();

    if (data.success === true) {
      toast.success("Slot booked successfully", {
        // position: "top-center",
      });
    } else {
      toast.error("Please book another slot", {
        // position: "top-center",
      });
    }
  };

  const handleFilterDocotors = (item) => {
    console.log("ITEM NAME IS================>", item);
    if (item.toLowerCase() === "all") {
      setFilteredDoctors(doctorsList);
    } else {
      const filteredDoctors = doctorsList.filter(
        (doc) => doc.speciality === item
      );
      setFilteredDoctors(filteredDoctors);
    }
  };
  const [bookingslottoggle, setbookingslottoggle] = useState(false);
  const [appointment, setappointment] = useState(false);
  const [otppage, setotppage] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTimeIndex, setCurrentTimeIndex] = useState(0);
  const [contactNumber, setcontactNumber] = useState(null);
  const [mobileNumberError, setmobileNumberError] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const MAX_LENGTH = 6;
  const otpInputs = [];

  const handleChange = (e) => {
    let { name, value } = e.target;
    console.log(value);
    if (value.length != 10) {
      setmobileNumberError("Please enter a valid number");
    }
    if (value.length == 10) {
      setmobileNumberError("");
    }
    setcontactNumber(value);
    console.log(contactNumber);
  };

  const showSlot = () => {
    setbookingslottoggle(!bookingslottoggle);
  };

  const showappointment = () => {
    setappointment(!appointment);
  };

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
    if (data.data.newUser === true) {
      localStorage.setItem("patientId", data?.patient?._id);
    }

    setotppage(true);
  };
  const handleInputChange = (e, index) => {
    const value = e.target.value;

    if (isNaN(value)) {
      return; // Allow only numeric input
    }

    otp[index] = value;

    if (index < MAX_LENGTH - 1 && value) {
      otpInputs[index + 1].focus();
    }

    setOtp([...otp]);
  };
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

      const data = await response.json();
      if (data.success === true) {
        console.log("DATA from response", data);

        localStorage.setItem("token", data?.data?.token);
        navigate("/edituserform");
      }
    } catch (error) {
      console.error("There was an error verifying the OTP:", error);
    }
  };

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

  // processing for the booking slots
  const bookingslot = selectedDoctor.slots;
  let processedSlots = {};

  for (let i in bookingslot) {
    let objTitle = bookingslot[i].date.split("T")[0];
    // Use the title as the index
    processedSlots[objTitle] = [];
  }
  // Loop to push unique object into array
  // console.log("uniques dates ====", processedSlots)
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

  const workingDays =
    selectedDoctor && selectedDoctor.workingDays
      ? abbreviateAndCombineDays(selectedDoctor.workingDays)
      : "";

  const handleDateClick = (index) => {
    setCurrentIndex(index);
    console.log(currentIndex);
  };
  const handleTimeClick = (time) => {
    // console.log(time)
    setCurrentTimeIndex(time);
    console.log(currentTimeIndex);
  };
  const goToNext = () => {
    const isLastItem = currentIndex === bookingslot.length - 1;
    const nextIndex = isLastItem ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
    console.log(currentIndex);
  };

  const goToPrev = () => {
    const isFirstItem = currentIndex === 0;
    const prevIndex = isFirstItem ? bookingslot.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    console.log(currentIndex);
  };

  var selectedschedule = 0;
  // console.log(selectedDoctor?.slots[currentIndex])

  useEffect(() => {
    if (resendClicked || firstTime) {
      const intervalId = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prevSeconds) => prevSeconds - 1);
        } else {
          setFirstTime(false);
          setSeconds(90);
          setResendClicked(false);
        }
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [seconds, resendClicked, firstTime]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <>
      {/* ---------------------------------------------modal--------------------------------------------- */}
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        doctor={selectedDoctor}
        styles={{
          modal: {
            width: isTab ? "94%" : "80%",
            backgroundColor: "#E3F6FF",
            alignContent: "center",
          },
          closeButton: {
            display: "none",
          },
        }}
      >
        <div class="flex flex-col ">
          <div class="flex flex-row-reverse md:-mb-14  -mb-14 z-50">
            <button onClick={onCloseModal}>
              <img src={close_button} class="w-8 mb-1"></img>
            </button>
            {/* <button><img src={delete_button} class="w-8"></img></button>
            <button><img src={edit_button} class="w-8"></img></button> */}
          </div>
          <div className="flex md:flex-row p-2 pt-5 flex-col">
            {/* ---------------------------left part--------------------------- */}
            <div className="flex flex-col px-1 md:w-1/2">
              <div className="">
                {selectedDoctor?.doctorPic ? (
                  <img
                    src={selectedDoctor?.doctorPic}
                    alt="doctor image"
                    className=" h-80 w-full"
                  ></img>
                ) : (
                  <AccountCircleIcon
                    style={{ height: "100%", width: "100%", color: "#B1DAED" }}
                  />
                )}
              </div>
              <div className="flex flex-col  py-4 px-5 bg-white mt-1">
                <p className="text-xs text-black font-medium mb-2">
                  Registration No. :- 33256
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
            {!otppage && (
              <div className="flex flex-col  md:w-1/2 px-2">
                <div className=" py-1 mb-2">
                  <p className="text-lg font-medium text-black ">SPECIALITY</p>
                  <div className="flex flex-wrap">
                    {selectedDoctor?.speciality?.map((item, index) => {
                      const formattedSpeciality = item.replace(
                        /([a-z])([A-Z])/g,
                        "$1 $2"
                      ); // Split at capital letters

                      return (
                        <p
                          key={index}
                          className="bg-white rounded-xl py-1 px-4 mx-2 my-1 space-between-words"
                        >
                          {formattedSpeciality}
                        </p>
                      );
                    })}
                  </div>
                </div>
                <div className=" py-1 mb-2">
                  <p className="text-lg font-medium text-black">
                    About The Doctor
                  </p>
                  <p className=" italic text-gray-600">
                    {selectedDoctor.about}
                  </p>
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
                  <p className="text-lg font-medium text-black">
                    Select service
                  </p>

                  <div className="flex flex-col mb-2">
                    <div className="flex flex-col  bg-white p-1 px-3">
                      <p className="flex place-content-between my-1">
                        <span className="font-medium px-2">Consultation</span>{" "}
                        <span className="font-bold px-2">
                          Rs {selectedDoctor.consultationFee}
                        </span>
                      </p>
                      {!bookingslottoggle && !appointment && (
                        <div>
                          <p className="text-xs text-gray-500 px-2 my-1">
                            Slot available for Tommorrow{" "}
                          </p>
                          <p className="flex flex-row justify-between  my-1 mx-2">
                            <p className="border-2 rounded-3xl py-1 px-3 text-gray-800  ">
                              3:00 AM
                            </p>
                            <p className="border-2 rounded-3xl py-1 px-3 text-gray-800  ">
                              3:00 AM
                            </p>
                            <p className="border-2 rounded-3xl py-1 px-3 text-gray-800  ">
                              3:00 AM
                            </p>
                          </p>
                        </div>
                      )}
                      {appointment && (
                        <div class="mx-2">
                          <p class="font-medium text-gray-500 ">
                            Date:{" "}
                            {
                              selectedDoctor?.slots[currentIndex].date.split(
                                "T"
                              )[0]
                            }
                          </p>
                          <p class="font-medium text-gray-500 mb-3">
                            Time:
                            {selectedDoctor?.slots[currentIndex].startTime}
                          </p>
                          <hr />
                          <p class="mt-2">Mobile Number</p>
                          <div class="flex flex-row">
                            <img src={phonelogo} class="pl-1 pr-3"></img>
                            <input
                              class=" border my-1 placeholder-gray-500 p-1 pl-2"
                              type="tel"
                              id="phone-number"
                              name="contactNumber"
                              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                              required
                              value={contactNumber}
                              onChange={handleChange}
                            />
                          </div>
                          <p class=" text-red-500 ">{mobileNumberError}</p>
                          <div class="flex flex-row-reverse">
                            {mobileNumberError.length === 0 ? (
                              <button
                                className="text-white text-xs rounded-3xl px-3 py-1 "
                                onClick={handleOtp}
                                style={{ backgroundColor: " #89CFF0" }}
                              >
                                Send OTP
                              </button>
                            ) : (
                              <button
                                className="text-white text-xs rounded-3xl px-3 py-1 "
                                disabled
                                onClick={handleOtp}
                                style={{ backgroundColor: " #89CFF0" }}
                              >
                                Send OTP
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                      <div>
                        {bookingslottoggle && (
                          <div className="flex flex-col">
                            <div className=" flex flex-col text-center space-y-2">
                              <div class="flex flex-row border-2">
                                <button
                                  className="text-white text-xs rounded-3xl mr-auto "
                                  onClick={goToPrev}
                                >
                                  <FaAngleLeft style={{ color: "black" }} />
                                </button>
                                <div className="flex flex-row overflow-x-auto mx-2 ">
                                  {keys.map((item, index) => {
                                    const { year, monthName, day, dayName } =
                                      getYearMonthDay(item);
                                    // console.log(index)
                                    const bg =
                                      currentIndex === index
                                        ? "bg-blue-200"
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
                                          className={` p-2 border-2 rounded-lg ${bg}`}
                                        >
                                          {day}
                                        </p>
                                        <p>{dayName}</p>
                                      </div>
                                    );
                                  })}

                                  {/* {bookingslot?.map((data, index) => {
                                    // console.log(data);
                                    const { year, monthName, day, dayName } =
                                      getYearMonthDay(data.date);
                                    // console.log(year, monthName, day, dayName)
                                    if (data.isBooked == true) {
                                      return (
                                        <div
                                          key={index}
                                          className="flex flex-col px-2"
                                          disabled
                                        >
                                          <p>{monthName}</p>
                                          <p
                                            className=" p-2 border-2 rounded-lg "
                                            style={{
                                              backgroundColor: "#89CFF0",
                                            }}
                                          >
                                            {day}
                                          </p>
                                          <p>{dayName}</p>
                                        </div>
                                      );
                                    } else if (index == currentIndex) {
                                      return (
                                        <div
                                          key={index}
                                          className="flex flex-col px-2"
                                        >
                                          <p>{monthName}</p>
                                          <p className=" p-2 border-2 rounded-lg bg-blue-100">
                                            {day}
                                          </p>
                                          <p>{dayName}</p>
                                        </div>
                                      );
                                    } else {
                                      return (
                                        <div
                                          key={index}
                                          className="flex flex-col px-2 hover:cursor-pointer"
                                          onClick={() => {
                                            handleDateClick(index);
                                          }}
                                        >
                                          <p>{monthName}</p>
                                          <p className=" p-2 border-2 rounded-lg bg-gray-200">
                                            {day}
                                          </p>
                                          <p>{dayName}</p>
                                        </div>
                                      );
                                    }
                                  })} */}
                                </div>
                                <button
                                  className="text-white text-xs rounded-3xl ml-auto"
                                  onClick={goToNext}
                                >
                                  <FaAngleRight style={{ color: "black" }} />
                                </button>
                              </div>
                              <div className="flex flex-wrap -mx-2 space-y-2 my-2 overflow-y-scroll h-32 px-2">
                                {values[currentIndex]?.map((item, index) => {
                                  const marginb =
                                    index == 0 ? " mt-2 -mb-4" : "";
                                  if (index === currentTimeIndex) {
                                    return (
                                      <div
                                        key={index}
                                        className={` w-1/3 px-2 mb-4 ${marginb} `}
                                        disabled={item.isBooked}
                                      >
                                        <div
                                          className={` rounded-3xl py-1 px-2 text-gray-800  bg-blue-200`}
                                          onClick={() => {
                                            handleTimeClick(index);
                                          }}
                                        >
                                          {item.start}
                                        </div>
                                      </div>
                                    );
                                  } else if (item.isBooked == true) {
                                    return (
                                      <div
                                        key={index}
                                        className={` w-1/3 px-2 mb-4 ${marginb}`}
                                        disabled
                                      >
                                        <div
                                          className={` rounded-3xl py-1 px-2 text-gray-800   `}
                                          style={{
                                            backgroundColor: "#89CFF0",
                                          }}
                                        >
                                          {item.start}
                                        </div>
                                      </div>
                                    );
                                  } else {
                                    return (
                                      <div
                                        key={index}
                                        className={` w-1/3 px-2 mb-4 ${marginb}`}
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
                        {!bookingslottoggle && !appointment && (
                          <button
                            className="text-white text-xs rounded-3xl px-3 py-1 "
                            onClick={() => {
                              showSlot();
                            }}
                            style={{ backgroundColor: " #89CFF0" }}
                          >
                            Show Slots
                          </button>
                        )}
                        {bookingslottoggle && !appointment && (
                          <div class="flex mx-auto space-x-4 mt-3">
                            <button
                              className="text-white text-sm rounded-3xl px-3 py-1 mb-1 "
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
            )}
            {otppage && (
              <div className="border bg-white flex flex-col md:w-1/2  p-4  mx-1">
                <p className="text-3xl ">Personal Information</p>
                <hr className="border my-2 " />
                {/* ------------mobile Number------------ */}
                <div className="mt-3 flex flex-row">
                  <p className="block text-black text-base font-semibold">
                    Mobile Number :{contactNumber}
                  </p>
                </div>
                {/* -----------contact----------- */}
                <div className="mt-3 flex flex-row">
                  <p className="block text-black text-base font-semibold">
                    Date :{" "}
                    {selectedDoctor?.slots[currentIndex]?.date?.split("T")[0]}
                  </p>
                </div>
                {/* -----------address----------- */}
                <div className="mt-3 flex flex-row">
                  <p className="block text-black text-base font-semibold">
                    Time :{selectedDoctor?.slots[currentIndex]?.startTime}
                  </p>
                  <p></p>
                </div>
                <hr class=" mt-3" />

                {/* ----------------------------------------otp verification section---------------------------------------- */}
                <div class="flex flex-col">
                  <p class="my-4 text-gray-600">Verify Your Mobile Number</p>
                  <div
                    class="bg-gray-300 flex flex-row rounded-lg"
                    style={{ maxWidth: "11rem" }}
                  >
                    <img src={phonelogo} class="pl-5 pr-1"></img>
                    <input
                      className="mx-2 bg-gray-300 rounded-lg font-medium text-lg"
                      type="number"
                      id="mobileNo"
                      name="mobileNo"
                      value={contactNumber}
                      style={{
                        border: "",
                        height: "45px",
                        paddingLeft: "1.5%",
                        maxWidth: "8rem",
                      }}
                    />
                  </div>

                  <div
                    className="flex w-full my-3"
                    style={{
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {otp?.map((digit, index) => (
                      <input
                        key={index}
                        ref={(input) => (otpInputs[index] = input)}
                        type="text"
                        className="w-10 h-8   text-lg  border-2 text-black border-gray-400 text-center "
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleInputChange(e, index)}
                        onKeyDown={(e) => {
                          if (e.key === "Backspace" && index > 0 && !digit) {
                            otpInputs[index - 1].focus();
                          }
                        }}
                      />
                    ))}
                  </div>

                  <p
                    style={{
                      fontWeight: 400,
                      fontSize: "16px",
                      display: "flex",
                      marginLeft: "40%",
                    }}
                  ></p>
                  <p class="text-gray-600">
                    Otp will expire in
                    <span
                      className="timer"
                      style={{ color: "#666", cursor: "pointer" }}
                    >
                      <text className="mx-2" style={{ color: "#000000" }}>
                        {formatTime(seconds)} sec
                      </text>
                    </span>
                    <button
                      onClick={handleOtp}
                      class="font-medium underline text-black"
                    >
                      Resend
                    </button>{" "}
                  </p>
                  <button
                    className="btn btn-primary border py-3 px-4 rounded-3xl text-white"
                    style={{ backgroundColor: "#89CFF0" }}
                    onClick={verifyOTP}
                  >
                    Verify
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>

      <div
        className="flex flex-col bg-customGreen"
        style={{
          width: "100%",
        }}
      >
        {/* -------------------------Doctors Array Start------------------------- */}

        <div style={{ marginTop: "10px" }}>
          {filteredDoctors?.map((doctor, index) => (
            <div
              className="bg-white w-full p-4 mb-5 hover:cursor-pointer"
              onClick={() => handleQRCode(doctor._id)}
            >
              <div className="flex flex-row justify-between">
                <div className="flex items-center gap-x-2">
                  {doctor.doctorPic ? (
                    <img
                      className="object-cover sm:w-20 sm:h-20 w-10 h-10  rounded-full"
                      src={doctor.doctorPic}
                      alt={doctor.name}
                    />
                  ) : (
                    <AccountCircleIcon
                      style={{ fontSize: "90px", color: "#B1DAED" }}
                    />
                  )}
                  <div>
                    <h1 className=" font-semibold text-gray-700 sm:text-lg text-sm capitalize">
                      Dr. {doctor.name}
                    </h1>

                    <p className=" text-gray-500 sm:text-sm text-xs ">
                      {doctor?.speciality?.join(", ")}
                    </p>
                    <p className=" text-gray-500 sm:text-sm text-xs ">
                      {doctor.totalExperience} Years Experience
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-between items-end">
                  <div className="flex flex-row gap-5 ">
                    <img
                      src={one}
                      className="sm:w-5 sm:h-5 w-4 h-4"
                      alt="img"
                    />
                    <img
                      src={two}
                      className="sm:w-5 sm:h-5 w-4 h-4"
                      alt="img"
                    />
                  </div>
                  <div className="flex flex-row items-center">
                    <img
                      src={three}
                      alt="img"
                      className="sm:w-5 sm:h-5 w-4 h-4"
                    />
                    <img
                      src={three}
                      alt="img"
                      className="sm:w-5 sm:h-5 w-4 h-4"
                    />
                    <img
                      src={three}
                      alt="img"
                      className="sm:w-5 sm:h-5 w-4 h-4"
                    />
                    <img
                      src={three}
                      alt="img"
                      className="sm:w-5 sm:h-5 w-4 h-4"
                    />
                    <div className="text-xs sm:text-lg">(4.5 Ratings)</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
