import React, { useEffect, useState, useRef, useContext } from "react";
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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import phonelogo from "../assets/phone.svg";
import UserContext from "./userContext";
import close_button from "../assets/close_button.svg";
import { Tooltip } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DoctorListUser({ searchTerm }) {
  const { updateUser, updateUserEmail, updateUserimage } =
    useContext(UserContext);
  let isTab = useMediaQuery({ query: "(max-width: 767px)" });
  const [doctorsList, setDoctorsList] = useState([]);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [selectedDoctor, setselectedDoctor] = useState("");
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const [resendClicked, setResendClicked] = useState(false);
  const [firstTime, setFirstTime] = useState(true);
  const [userDetailsName, setUserDetailsName] = useState();
  const [userDetailsEmail, setUserDetailsEmail] = useState();
  const [userDetailsPic, setUserDetailsPic] = useState();

  const [prevAppointment, setprevAppointment] = useState({
    doctorId: localStorage.getItem('doctorId'),
    appointmentDate: localStorage.getItem('appointment_date'),
    appointmentTime: localStorage.getItem('appointment_time')
  });

  const onCloseModal = () => {
    console.log("modal closed");
    setappointment(false);
    setotppage(false);
    setbookingslottoggle(false);
    setCurrentIndex(0);
    setCurrentTimeIndex(0);
    setcontactNumber(null);
    setmobileNumberError("");
    setOtp(["", "", "", "", "", ""]);
    setOpen(false);
  };
  const [filteredDoctors, setFilteredDoctors] = useState([doctorsList]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const patientId = localStorage.getItem("patientId");
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
        console.log("DATA from response", data);
        setUserDetailsName(data?.data.name);
        setUserDetailsEmail(data?.data.email);
        setUserDetailsPic(data?.data.userPic);
        console.log("usser name$$$$$$$", data?.data.name);
      } catch (error) {
        console.error("There was an error verifying the OTP:", error);
      }
    };
    fetchUserDetails();
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
      const matchedDoctors = doctorsList.filter((doctor) => {
        // Check if the doctor's name includes the searchTerm
        const nameMatch = doctor.name
          ?.toLowerCase()
          .includes(lowerCaseSearchTerm);

        // Check if any of the doctor's specialities include the searchTerm
        const specialityMatch = doctor.speciality?.some((speciality) =>
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
  // Include all dependencies in the dependency array

  const handleQRCode = (doctorId) => {
    console.log("HELLO");
    localStorage.setItem("doctorId", doctorId);
    const doctor = doctorsList?.find((doc) => doc._id === doctorId);
    setselectedDoctor(doctor);
    console.log(selectedDoctor);
    onOpenModal();
  };

  const handleBookAppointment = async () => {

    const token = localStorage.getItem("token");
    console.log("********************previous date*****************************", prevAppointment?.appointmentDate)
    // if (token) {
    //   navigate("/edituserform");
    // }

    console.log("date", keys[currentIndex]);
    console.log("slot", values[currentIndex][currentTimeIndex].start);
    if (prevAppointment?.appointmentDate) {
      //cancel slot
      const details = {
        date: prevAppointment?.appointmentDate,
        time: prevAppointment?.appointmentTime,
      };

      const response = await fetch(
        `${baseUrl}/api/v1/cancel_slot/${prevAppointment?.doctorId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token, // Use the stored token
          },
          body: JSON.stringify(details),
        }
      );
      toast.success('appointment deleted')

    }


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
    if (data.success === true) {
      // toast.success("Slot selected Successfully!");
      navigate("/edituserform");
    } else {
      toast.error("Slot Not Available");
    }
    localStorage.setItem(
      "appointment_date",
      data?.doctorSlot?.date?.split("T")[0]
    );
    localStorage.setItem("appointment_time", data?.doctorSlot?.startTime);

    // showappointment();
    // showSlot();
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
  const [mobileNumberError, setmobileNumberError] = useState("");
  const [seconds, setSeconds] = useState(90);
  const [currentTimeIndex, setCurrentTimeIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [contactNumber, setcontactNumber] = useState(null);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const MAX_LENGTH = 6;
  const otpInputs = [];

  const handleChange = (e) => {
    let { name, value } = e.target;
    console.log(value);
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
    console.log("user id", data?.user?._id);
    localStorage.setItem("userId", data?.user?._id);

    // localStorage.setItem("token", data?.user?.token)
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

  const bookingslot = selectedDoctor.slots;

  const numberOfColumns = 4;
  const numberOfRows = Math.ceil(bookingslot?.length / numberOfColumns);

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
  const handleTimeClick = (time) => {
    // console.log(time)
    setCurrentTimeIndex(time);
    console.log(currentTimeIndex);
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

  updateUser(userDetailsName);
  updateUserEmail(userDetailsEmail);
  updateUserimage(userDetailsPic);

  return (
    <>
      {/* ---------------------------------------------modal--------------------------------------------- */}
      <ToastContainer />
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
            borderRadius: "23px",
          },
          closeButton: {
            display: "none",
          },
        }}
      >
        <style>
          {`
          .react-responsive-modal-container{
            overflow-y:hidden;
             
          }
          `}
        </style>

        <div class="flex flex-col  ">
          <div class="flex flex-row-reverse md:-mb-14  -mb-14 z-50">
            <button onClick={onCloseModal}>
              <img src={close_button} class="w-8 mb-1"></img>
            </button>
            {/* <button><img src={delete_button} class="w-8"></img></button>
            <button><img src={edit_button} class="w-8"></img></button> */}
          </div>
          <div className="flex md:flex-row p-2 pt-5 flex-col overflow-y-auto  h-[90vh] md:h-auto">
            {/* ---------------------------left part--------------------------- */}
            <div className="flex flex-col px-1 md:w-1/2">
              <div className="">
                {selectedDoctor?.doctorPic ? (
                  <img
                    src={selectedDoctor?.doctorPic}
                    alt={selectedDoctor?.name}
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
                    <img
                      src={education}
                      alt="education"
                      className="w-5 py-2 "
                    ></img>
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
                      alt="home"
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
              <div className="flex flex-col  md:w-1/2 px-2 pb-5 mb-4">
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
                            <div className="w-1/3 px-2 h-10">
                              <div
                                className="rounded-3xl py-1 px-2 mt-2 text-center"
                                style={{
                                  backgroundColor: selectedDoctor?.slots?.[0]
                                    ?.isBooked
                                    ? "#4974a5"
                                    : "#E5E7EB",
                                  color: selectedDoctor?.slots?.[0]?.isBooked
                                    ? "white"
                                    : "#1F2937",
                                }}
                              >
                                {selectedDoctor?.slots?.[0]?.startTime}
                              </div>
                            </div>

                            <div className="w-1/3 px-2 h-10">
                              <div
                                className="rounded-3xl py-1 px-2 mt-2 text-center"
                                style={{
                                  backgroundColor: selectedDoctor?.slots?.[0]
                                    ?.isBooked
                                    ? "#4974a5"
                                    : "#E5E7EB",
                                  color: selectedDoctor?.slots?.[0]?.isBooked
                                    ? "white"
                                    : "#1F2937",
                                }}
                              >
                                {selectedDoctor?.slots?.[1]?.startTime}
                              </div>
                            </div>

                            <div className="w-1/3 px-2 h-10">
                              <div
                                className="rounded-3xl py-1 px-2 mt-2 text-center"
                                style={{
                                  backgroundColor: selectedDoctor?.slots?.[0]
                                    ?.isBooked
                                    ? "#4974a5"
                                    : "#E5E7EB",
                                  color: selectedDoctor?.slots?.[0]?.isBooked
                                    ? "white"
                                    : "#1F2937",
                                }}
                              >
                                {selectedDoctor?.slots?.[2]?.startTime}
                              </div>
                            </div>
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
                                  className="text-white text-xs rounded-3xl ml-auto"
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
                                        className={` w-1/3 px-2  ${marginb} `}
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
                                          className={` w-1/3 px-2 ${marginb}`}
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
                                        className={` w-1/3 px-2  ${marginb}`}
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
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {otppage && (
              <div className="border bg-white flex flex-col md:w-1/2  p-4  mx-1 pb-5 mb-4">
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
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                        }}
                        key={index}
                        ref={(input) => (otpInputs[index] = input)}
                        type="number"
                        className="w-10 h-8 mr-2 text-lg  border-2 text-black border-gray-400 text-center "
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
                      style={{
                        color: "#B1DAED",
                        fontSize: isTab ? "45px" : "90px",
                      }}
                    />
                  )}
                  <div>
                    <h1 className=" font-semibold text-gray-700 sm:text-lg text-sm capitalize">
                      Dr. {doctor.name}
                    </h1>

                    <p className=" text-gray-500 sm:text-sm text-xs flex flex-row">
                      {/* {doctor?.speciality?.join(", ")} */}
                      {doctor?.speciality?.slice(0, 1).join(", ")}
                      <p class="text-gray">...</p>
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
