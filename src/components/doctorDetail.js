import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import education from "../assets/education.svg";
import home from "../assets/home.svg";
import { toast } from "react-toastify";
import phonelogo from "../assets/phone.svg";
import "react-toastify/dist/ReactToastify.css";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { Tooltip } from "antd";


export default function DoctorDetail()
{
  const [doctorDetails, setDoctorDetails] = useState({});
  // const [selectedDoctor, setSelectedDoctor] = useState();
  console.log("Current URL", window.location.href);
  const arr = window.location.href.split("/");
  console.log("ARR 4", arr[4]);
  localStorage.setItem("doctorId", arr[4]);
  const doctorId = localStorage.getItem("doctorId");
  const selectedDoctorId = arr[4]

  useEffect(() =>
  {
    const fetchDoctorDetails = async () =>
    {
      try
      {
        const response = await fetch(
          `${baseUrl}/api/v1/get_doctor/${doctorId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        console.log("DATA from response", data?.data);
        console.log("slots===", data?.data?.slots);
        setDoctorDetails(data?.data);

      } catch (error)
      {
        console.error("There was an error verifying the OTP:", error);
      }
    };
    fetchDoctorDetails();
  }, [doctorId]);

  let isTab = useMediaQuery({ query: "(max-width: 768px)" });
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [open, setOpen] = useState(false);
  const [contactNumber, setcontactNumber] = useState(null);
  const [mobileNumberError, setmobileNumberError] = useState("");
  const [otppage, setotppage] = useState(false);
  const [bookingslottoggle, setbookingslottoggle] = useState(false);
  const [appointment, setappointment] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [resendClicked, setResendClicked] = useState(false);
  const [seconds, setSeconds] = useState(90);
  const [currentTimeIndex, setCurrentTimeIndex] = useState(0);
  const [newSlot, setNewSlot] = useState({
    date: "",
    time: ""
  })
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const MAX_LENGTH = 6;
  const otpInputs = [];
  const [appointmentDetails, setAppointmentDetails] = useState(null);

  const showappointment = () =>
  {
    setappointment(!appointment);
  };

  const handleChange = (e) =>
  {
    let { name, value } = e.target;
    console.log(value);
    if (value.length != 10)
    {
      setmobileNumberError("Please enter a valid number");
    }
    if (value.length == 10)
    {
      setmobileNumberError("");
    }
    setcontactNumber(value);
    console.log(contactNumber);
  };

  const goToNext = () =>
  {
    const isLastItem = currentIndex === bookingslot.length - 1;
    const nextIndex = isLastItem ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
    console.log(currentIndex);
  };

  const bookingslot = doctorDetails.slots;
  let processedSlots = {};

  console.log("===============BOOKING SLOTS==============", bookingslot);
  for (let i in bookingslot)
  {
    let objTitle = bookingslot[i].date.split("T")[0];
    // Use the title as the index
    processedSlots[objTitle] = [];
  }

  for (let i in bookingslot)
  {
    if (bookingslot[i].date.split("T")[0] in processedSlots)
    {
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

  const goToPrev = () =>
  {
    const isFirstItem = currentIndex === 0;
    const prevIndex = isFirstItem ? bookingslot.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    console.log(currentIndex);
  };


  function getYearMonthDay(dateString)
  {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = date.getDay();
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

  const handleDateClick = (index) =>
  {
    setCurrentIndex(index);
    console.log(currentIndex);
  };

  const handleTimeClick = (time) =>
  {
    // console.log(time)
    setCurrentTimeIndex(time);
    console.log(currentTimeIndex);
  };

  const workingDays =
    selectedDoctor && selectedDoctor.workingDays
      ? abbreviateAndCombineDays(selectedDoctor.workingDays)
      : "";
  const [doctorConsultationFee, setdoctorConsultationFee] = useState();
  useEffect(() =>
  {
    const fetchAppointmentDetails = async () =>
    {
      try
      {
        const token = localStorage.getItem("token");
        const appointmentId = localStorage.getItem("appointmentId");
        if (!token)
        {
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
      } catch (error)
      {
        console.error("There was an error verifying the OTP:", error);
      }
    };
    fetchAppointmentDetails();
  }, []);

  function abbreviateAndCombineDays(days)
  {
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

    while (i < dayIndexes.length)
    {
      let startDay = weekDays[dayIndexes[i]].substring(0, 3);
      let endDayIndex = i;

      while (
        endDayIndex < dayIndexes.length - 1 &&
        dayIndexes[endDayIndex + 1] === dayIndexes[endDayIndex] + 1
      )
      {
        endDayIndex++;
      }

      let endDay = weekDays[dayIndexes[endDayIndex]].substring(0, 3);

      if (i === endDayIndex)
      {
        combinedDays.push(startDay);
      } else
      {
        combinedDays.push(`${startDay}-${endDay}`);
      }

      i = endDayIndex + 1;
    }

    return combinedDays.join(" ");
  }

  const [input, setInput] = useState("");



  const handleOtp = async () =>
  {
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

  const handleInputChange = (e, index) =>
  {
    const value = e.target.value;

    if (isNaN(value))
    {
      return; // Allow only numeric input
    }

    otp[index] = value;

    if (index < MAX_LENGTH - 1 && value)
    {
      otpInputs[index + 1].focus();
    }

    setOtp([...otp]);
  };
  const verifyOTP = async () =>
  {
    try
    {
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

      if (!response.ok)
      {
        // toast.error("Wrong OTP");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let data;
      try
      {
        data = await response.json();
      } catch (e)
      {
        throw new Error("Failed to parse JSON");
      }

      if (data?.success === true)
      {
        console.log(
          "=============================DATA from response=========================",
          data
        );

        if (data?.data?.data?.newUser === true)
        {
          const patientId = data?.patient?._id;
          if (patientId)
          {
            console.log("Storing patient ID in local storage", patientId);
            localStorage.setItem("patientId", patientId);
          } else
          {
            console.error("Patient ID is undefined");
          }
        } else
        {

        }

        localStorage.setItem("token", data?.data?.token);
        navigate("/edituserform", { state: { selectedSlot: newSlot, selectedDoctor: selectedDoctorId } });
      }
    } catch (error)
    {
      toast.error("Wrong OTP");
      console.error("There was an error verifying the OTP:", error);
    }
  };



  const showSlot = () =>
  {
    console.log("func called-----------")
    setbookingslottoggle(!bookingslottoggle);
  };

  const handleBookAppointment = async () =>
  {
    console.log("date", keys[currentIndex]);
    console.log("slot", values[currentIndex][currentTimeIndex].start);
    const bookslot = {
      date: keys[currentIndex],
      time: values[currentIndex][currentTimeIndex].start,
    };

    setNewSlot((prevSlot) => ({
      ...prevSlot,
      date: bookslot.date
    }));

    setNewSlot((prevSlot) => ({
      ...prevSlot,
      time: bookslot.time
    }));

    console.log("Selected Doctor ID", selectedDoctorId)

    showappointment();

    showSlot();
  };

  const formatTime = (time) =>
  {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <>
      <div>
        <div class=" ">
          <div className="flex lg:flex-row  pt-5 flex-col ">
            {/* ---------------------------left part--------------------------- */}
            <div className="flex flex-col  px-1 lg:w-5/12 xl:mr-10 ">
              <div className=" mx-auto">
                {selectedDoctor?.doctorPic ? (
                  <img
                    src={selectedDoctor?.doctorPic}
                    alt="doctorimage"
                    style={{ height: '100%', width: '100%' }}
                  ></img>
                ) : (
                  <AccountCircleIcon
                    style={{ height: '90%', width: '90%', color: "#B1DAED", }}
                  />
                )}
              </div>
              <div className="flex flex-col  py-4 px-5 bg-white mt-1">
                <p className="text-xs text-black font-medium mb-2">
                  Registration No. :- {doctorDetails?.registrationNo}
                </p>

                <p className="text-black text-3xl font-medium mb-2">
                  Dr. {doctorDetails?.name}
                </p>
                <div className="flex flex-row">
                  <div>
                    <img src={education} className="w-5 py-2" alt="education"></img>
                  </div>
                  <div className="ml-1">
                    {doctorDetails?.degree?.split(",")?.map((item) => (
                      <p className="text-gray-600 text-xl mb-1">{item}</p>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-xl mb-2">
                  {doctorDetails?.totalExperience} Years Experience
                </p>

                <div className="flex flex-row space-x-2">
                  <div className="mt-2">
                    <img
                      src={home}
                      alt="a"
                      style={{ minWidth: "15px", maxWidth: "16px" }}
                    ></img>
                  </div>
                  <div className="flex flex-wrap">
                    <p className="text-gray-600 text-xl  ">
                      {doctorDetails?.address?.houseNo +
                        " " +
                        doctorDetails?.address?.block +
                        " " +
                        doctorDetails?.address?.area +
                        ", " +
                        doctorDetails?.address?.district +
                        ", "

                      }
                    </p>
                    <p className="text-gray-600 text-xl  ">
                      {doctorDetails?.address?.state +
                        " " +
                        doctorDetails?.address?.pinCode}
                    </p>

                  </div>
                </div>
              </div>
            </div>

            {/* --------------------------------right part-------------------------------- */}
            {!otppage && (
              <div className="flex flex-col   lg:w-6/12 px-2 xl:mr-16 ">
                <div className=" py-1 mb-2">
                  <p className="text-lg font-medium text-black ">SPECIALITY</p>
                  <div className="flex flex-wrap ">
                    {doctorDetails?.speciality?.map((item, index) =>
                    {
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
                  <p className=" italic text-gray-600">{doctorDetails?.about}</p>
                </div>

                <div className=" py-1 mb-2">
                  <p className="text-lg font-medium text-black">Timing</p>
                  <div className="flex flex-row  place-content-between px-3">
                    {workingDays.split(" ")[0] && (
                      <div className="flex flex-col">
                        <p className="text-gray-600 font-semibold">
                          {workingDays.split(" ")[0]}:
                        </p>
                        <p className="text-gray-600">
                          {doctorDetails?.workingHours?.workHourFrom} -{" "}
                          {doctorDetails?.workingHours?.workHourTo}
                        </p>
                      </div>
                    )}
                    {workingDays.split(" ")[1] && (
                      <div className="flex flex-col">
                        <p className="text-gray-600 font-semibold">
                          {workingDays.split(" ")[1]}:
                        </p>
                        <p className="text-gray-600">
                          {doctorDetails?.workingHours?.workHourFrom} -{" "}
                          {doctorDetails?.workingHours?.workHourTo}
                        </p>
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
                          {doctorDetails?.workingHours?.workHourFrom} -{" "}
                          {doctorDetails?.workingHours?.workHourTo}
                        </p>
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
                          Rs {doctorDetails.consultationFee}
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
                                  backgroundColor: doctorDetails?.slots?.[0]
                                    ?.isBooked
                                    ? "#4974a5"
                                    : "#E5E7EB",
                                  color: doctorDetails?.slots?.[0]?.isBooked
                                    ? "white"
                                    : "#1F2937",
                                }}
                              >
                                {doctorDetails?.slots?.[0]?.startTime}
                              </div>
                            </div>

                            <div className="w-1/3 px-2 h-10">
                              <div
                                className="rounded-3xl py-1 px-2 mt-2 text-center"
                                style={{
                                  backgroundColor: doctorDetails?.slots?.[0]
                                    ?.isBooked
                                    ? "#4974a5"
                                    : "#E5E7EB",
                                  color: doctorDetails?.slots?.[0]?.isBooked
                                    ? "white"
                                    : "#1F2937",
                                }}
                              >
                                {doctorDetails?.slots?.[1]?.startTime}
                              </div>
                            </div>

                            <div className="w-1/3 px-2 h-10">
                              <div
                                className="rounded-3xl py-1 px-2 mt-2 text-center"
                                style={{
                                  backgroundColor: doctorDetails?.slots?.[0]
                                    ?.isBooked
                                    ? "#4974a5"
                                    : "#E5E7EB",
                                  color: doctorDetails?.slots?.[0]?.isBooked
                                    ? "white"
                                    : "#1F2937",
                                }}
                              >
                                {doctorDetails?.slots?.[2]?.startTime}
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
                              doctorDetails?.slots[currentIndex].date.split(
                                "T"
                              )[0]
                            }
                          </p>
                          <p class="font-medium text-gray-500 mb-3">
                            Time:
                            {doctorDetails?.slots[currentIndex].startTime}
                          </p>
                          <hr />
                          <p class="mt-2">Mobile Number</p>
                          <div class="flex flex-row">
                            {/* <img src={phonelogo} class="pl-1 pr-3"></img> */}
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
                                  {keys.map((item, index) =>
                                  {
                                    const { year, monthName, day, dayName } =
                                      getYearMonthDay(item);
                                    const bg =
                                      currentIndex === index
                                        ? "bg-[#B3E7FB]"
                                        : "bg-gray-200";
                                    return (
                                      <div
                                        key={index}
                                        className="flex flex-col px-2"
                                        onClick={() =>
                                        {
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
                                {values[currentIndex]?.map((item, index) =>
                                {
                                  const marginb = index === 0 ? " mt-2 -" : "";
                                  if (index === currentTimeIndex)
                                  {
                                    return (
                                      <div
                                        key={index}
                                        className={` w-1/3 px-2  ${marginb} `}
                                        disabled={item.isBooked}
                                      >
                                        <div
                                          className={` rounded-3xl py-1 px-2 text-gray-800  bg-[#B3E7FB]`}
                                          onClick={() =>
                                          {
                                            handleTimeClick(index);
                                          }}
                                        >
                                          {item.start}
                                        </div>
                                      </div>
                                    );
                                  } else if (item.isBooked === true)
                                  {
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
                                  } else
                                  {
                                    return (
                                      <div
                                        key={index}
                                        className={` w-1/3 px-2  ${marginb}`}
                                        onClick={() =>
                                        {
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
                            onClick={() =>
                            {
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
              <div className="border bg-white flex flex-col md:w-1/2  p-4  mx-1 pb-5 ">
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
                    {doctorDetails?.slots[currentIndex]?.date?.split("T")[0]}
                  </p>
                </div>
                {/* -----------address----------- */}
                <div className="mt-3 flex flex-row">
                  <p className="block text-black text-base font-semibold">
                    Time :{doctorDetails?.slots[currentIndex]?.startTime}
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
                        onInput={(e) =>
                        {
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
                        onKeyDown={(e) =>
                        {
                          if (e.key === "Backspace" && index > 0 && !digit)
                          {
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
      </div>
    </>
  );
}

