import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Header from "./header";
import DoctorSidebar from "./doctorSidebar";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-responsive-modal";
import { Popconfirm } from "antd";
import { FaTrashAlt } from "react-icons/fa";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import close_button from "../assets/close_button.svg";
import { toast } from "react-toastify";
import delete_button from "../assets/delete_button.svg";
import edit_button from "../assets/edit_button.svg";
import home from "../assets/home.svg";
import education from "../assets/education.svg";
import phonelogo from "../assets/phone.svg";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { Tooltip } from "antd";

export default function SuperAdminAdminList({ searchTerm }) {
  let isTab = useMediaQuery({ query: "(max-width: 767px)" });
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [selectedDoctor, setselectedDoctor] = useState("");
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [patientsList, setPatientsList] = useState([]);
  const [appointmentList, setAppointmentList] = useState([]);
  const navigate = useNavigate();
  const [filteredPatients, setFilteredPatients] = useState([patientsList]);
  const [otppage, setotppage] = useState(false);
  const [bookingslottoggle, setbookingslottoggle] = useState(false);
  const [appointment, setappointment] = useState(false);
  // const [otppage, setotppage] = useState(false);
  const [currentTimeIndex, setCurrentTimeIndex] = useState(0);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [contactNumber, setcontactNumber] = useState(null);
  const [mobileNumberError, setmobileNumberError] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const MAX_LENGTH = 6;
  const otpInputs = [];
  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in local storage");
          return;
        }
        const response = await fetch(
          `${baseUrl}/api/v1/superAdmin/list_doctors`,
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
    fetchPatientDetails();
  }, []);

  const bookingslot = selectedDoctor.slots;

  const numberOfColumns = 4;
  const numberOfRows = Math.ceil(bookingslot?.length / numberOfColumns);

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
    localStorage.setItem("patientId", data?.patient?._id);

    // localStorage.setItem("token", data?.user?.token)
    setotppage(true);
  };
  // processing for the booking slots
  const handleDateClick = (index) => {
    setCurrentIndex(index);
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

  const workingDays =
    selectedDoctor && selectedDoctor.workingDays
      ? abbreviateAndCombineDays(selectedDoctor.workingDays)
      : "";
  const handleDeletePatient = async (patientId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in local storage");
        return;
      }
      const response = await fetch(
        `${baseUrl}/api/v1/superAdmin/delete_doctor/${patientId}`,
        {
          method: "DELETE", // Use DELETE method
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token, // Use the stored token
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Patient deleted successfully", data);
        // Update the list in the UI by removing the deleted doctor
        setPatientsList((prevPatientsList) =>
          prevPatientsList.filter((patient) => patient._id !== patientId)
        );
      } else {
        console.error("Failed to delete the doctor", data?.message);
      }
    } catch (error) {
      console.error("There was an error deleting the doctor:", error);
    }
  };

  const findSelectedDoctor = async (patientId) => {
    console.log("DOCTOR ID", patientId);
    // // Assuming doctorsList is an array of doctor objects and each doctor has an _id field.
    const patient = patientsList?.find((doc) => doc._id === patientId);
    setselectedDoctor(patient); // This will return the doctor object if found, otherwise undefined
    onOpenModal();
  };

  const handleDelete = async (id) => {
    console.log("DOCTRO ID", id);
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${baseUrl}/api/v1/admin/delete_doctor/${id}`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      }
    );
    const data = await response.json();
    console.log("DATA FROM RESPONSE", data);
    if (data.success) {
      toast.success("Doctor deleted successfully")
      setPatientsList((prevDoctorsList) =>
        prevDoctorsList.filter((patient) => patient._id !== id)
      );
    }
    else {
      toast.error("Permission Denied")
    }
    onCloseModal()
  };

  const handleEditPatient = (patientId) => {
    localStorage.setItem("doctorId", patientId);
    navigate("/superadmindoctoreditform");
  };

  useEffect(() => {
    if (patientsList?.length > 0 && searchTerm) {
      const lowerCaseSearchTerm = searchTerm?.toLowerCase().trim();
      const matchedPatients = patientsList?.filter((p) =>
        p?.name?.toLowerCase()?.includes(lowerCaseSearchTerm)
      );
      setFilteredPatients(matchedPatients);
    } else {
      // If searchTerm is empty, show all patients
      setFilteredPatients(patientsList);
    }
  }, [patientsList, searchTerm]);

  const handleBookAppointment = (patientId) => {
    localStorage.setItem("patientId", patientId);
    navigate("/editadminlistform");
  };

  const handleEdit = (patientId) => {
    localStorage.setItem("doctorId", patientId);
    navigate("/superadmindoctoreditform");
  };
  console.log("PATIENT LISTS", patientsList);
  console.log("APPOINTMENT LIST", appointmentList);

  return (
    <>
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

        <div class="flex flex-col ">
          <div class="flex flex-row-reverse md:-mb-14  -mb-14 z-50">
            <button onClick={onCloseModal}>
              <img src={close_button} alt="closeButton" class="w-8 mb-1"></img>
            </button>
            <Popconfirm
              title="Delete the Doctor"
              description="Are you sure to delete this Doctor?"
              okText="Delete"
              okType="danger"
              cancelText="No"
              onConfirm={() =>
                handleDelete(selectedDoctor?._id)
              }
            >
              <button>
                <img src={delete_button} alt="deleteButton" class="w-8"></img>
              </button>
            </Popconfirm>
            <button onClick={() => handleEdit(selectedDoctor?._id)}>
              <img src={edit_button} alt="editButton" class="w-8"></img>
            </button>
          </div>
          <div className="flex md:flex-row p-2 pt-5 flex-col overflow-y-auto h-[90vh] ">
            {/* ---------------------------left part--------------------------- */}
            <div className="flex flex-col px-1 md:w-1/2">
              <div className="">
                {selectedDoctor?.doctorPic ? (
                  <img
                    src={selectedDoctor?.doctorPic}
                    alt="doctorimage"
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
                  Registration No. :- {selectedDoctor?.registrationNo}
                </p>

                <p className="text-black text-3xl font-medium mb-2">
                  Dr. {selectedDoctor?.name}
                </p>
                <div className="flex flex-row">
                  <div>
                    <img src={education} alt="education" className="w-5 py-2 "></img>
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
              <div className="flex flex-col  md:w-1/2 px-2">
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
                          {selectedDoctor?.workingHours?.workHourFrom} - {" "}
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
                            <img src={phonelogo} alt="phonelogo" class="pl-1 pr-3"></img>
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
                                  className="text-white text-xs rounded-3xl  "
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
      {/* -------------------------Doctors Array Start------------------------- */}

      <div className="flex flex-col">
        {filteredPatients?.map((patient) => (
          <div className="bg-white  p-4 sm:px-5 px-1 mb-5   " key={patient._id}>
            <div className="flex lg:flex-row flex-col justify-start items-center  ">
              <div
                className="flex items-center gap-x-2 mr-auto"
                onClick={() => findSelectedDoctor(patient._id)}
              >
                {patient.doctorPic ? (
                  <img
                    className="object-cover sm:w-20 sm:h-20 w-10 h-10 rounded-full"
                    src={patient.doctorPic}
                    alt={patient.name}
                  />
                ) : (
                  <AccountCircleIcon
                    style={{ fontSize: isTab ? "45px" : "90px", color: "#B1DAED" }}
                  />
                )}
                <div className="gap-x-3 truncate overflow-x-auto">
                  <h1 className="font-semibold text-gray-700 sm:text-lg text-sm capitalize ">
                    {patient.name}
                  </h1>
                  <p
                    className="text-gray-500 text-sm capitalize    flex flex-wrap space-x-1"
                  >
                    <p>{patient.address?.houseNo}</p>
                    <p>{patient.address?.block}</p>
                    <p>{patient.address?.area}</p>
                    <p>{patient.address?.district}</p>
                    <p>{patient.address?.state}</p>
                    <p>{patient.address?.pinCode}</p>
                  </p>
                </div>
              </div>
              <div className="flex flex-row ms-auto gap-1 sm:gap-4 pr-5 mt-2 lg:mt-0">
                <button
                  className="rounded-full px-6 sm:px-8 py-1 sm:py-2 text-white bg-[#89CFF0] text-xs sm:text-sm"
                  onClick={() =>
                    handleEditPatient(
                      patient._id,
                      patient?.patientDate?.date,
                      patient?.patientDate?.time,
                      patient?.doctorId?._id
                    )
                  }
                  style={{
                    height: isTab ? null : null,
                    marginTop: isTab ? null : null,
                  }}
                >
                  {"Edit"}
                </button>

                <Popconfirm
                  title="Delete the Admin"
                  description="Are you sure to delete this Admin?"
                  okText="Delete"
                  okType="danger"
                  cancelText="No"
                  className={`rounded-full px-4 sm:px-6 py-2 sm:py-2 text-white bg-[#EF5F5F] text-xs sm:text-sm `}
                  onConfirm={() => handleDeletePatient(patient._id, patient.name)}
                >
                  <button
                    danger
                    className="rounded-full px-4 sm:px-6 py-2 sm:py-2 text-white bg-[#EF5F5F] text-xs sm:text-sm"
                  >
                    {"Delete"}
                  </button>
                </Popconfirm>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

{/* <button
    className="rounded-full px-6 sm:px-4 py-2 sm:py-1 text-white bg-[#89CFF0] text-xs sm:text-sm"
    onClick={() => handleBookAppointment(patient)}
  >
    Book Appointment
  </button> */}