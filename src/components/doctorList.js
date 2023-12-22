import React, { useEffect, useState } from "react";
import DoctorSidebar from "./doctorSidebar";
import { useMediaQuery } from "react-responsive";
import { Modal } from "react-responsive-modal";
import UserSidebarWithoutLogin from "./UserSidebarWithoutLogin";
import PatientHeader from "./patientHeader";
import { useNavigate } from "react-router-dom";
import one from "../assets/one.svg";
import two from "../assets/two.svg";
import three from "../assets/three.svg";
import home from "../assets/home.svg"
import education from "../assets/education.svg"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


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

  const categories = [
    "All",
    "General Medicine",
    "Cardiology",
    "Dermatology",
    "Endocrinology",
    "Urology",
  ];

  useEffect(() => {
    localStorage.clear()
  }, [])

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
    if (doctorsList.length > 0 && searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
      const matchedDoctors = doctorsList.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          doctor.speciality.toLowerCase().includes(lowerCaseSearchTerm)
      );
      setFilteredDoctors(matchedDoctors);
    } else {
      // If no searchTerm or doctorsList is empty, use the original list.
      setFilteredDoctors(doctorsList);
    }
  }, [doctorsList, searchTerm]); // Include all dependencies in the dependency array

  const handleQRCode = (doctorId) => {
    console.log("HELLO");
    localStorage.setItem("doctorId", doctorId);
    const doctor = doctorsList?.find((doc) => doc._id === doctorId);
    setselectedDoctor(doctor);
    console.log(selectedDoctor)
    console.log(selectedDoctor.degree.split(','))

    onOpenModal();
  };

  const handleBookAppointment = () => {
    localStorage.setItem("doctorId", selectedDoctor._id)
    localStorage.setItem("doctorName", selectedDoctor.name)
    localStorage.setItem("doctorEmail", selectedDoctor.email)
    navigate("/userlogin");
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bookingslottoggle, setbookingslottoggle] = useState(false);
  const showSlot = () => {
    setbookingslottoggle(!bookingslottoggle)
  }
  const bookingslot = [
    {
      "date": "2023-12-22",
      "startTime": "09:00",
      "endTime": "09:15",
      "isBooked": false
    },
    {
      "date": "2023-12-22",
      "startTime": "09:15",
      "endTime": "09:30",
      "isBooked": false
    },
    {
      "date": "2023-12-22",
      "startTime": "09:30",
      "endTime": "09:45",
      "isBooked": false
    },
    {
      "date": "2023-12-22",
      "startTime": "09:45",
      "endTime": "10:00",
      "isBooked": false
    },
    {
      "date": "2023-12-22",
      "startTime": "10:00",
      "endTime": "10:15",
      "isBooked": false
    },
    {
      "date": "2023-12-22",
      "startTime": "10:15",
      "endTime": "10:30",
      "isBooked": false
    },
    {
      "date": "2023-12-22",
      "startTime": "10:30",
      "endTime": "10:45",
      "isBooked": false
    },
    {
      "date": "2023-12-22",
      "startTime": "10:45",
      "endTime": "11:00",
      "isBooked": false
    },
    {
      "date": "2023-12-22",
      "startTime": "11:00",
      "endTime": "11:15",
      "isBooked": false
    },
    {
      "date": "2023-12-22",
      "startTime": "11:15",
      "endTime": "11:30",
      "isBooked": false
    },
    {
      "date": "2023-12-22",
      "startTime": "11:30",
      "endTime": "11:45",
      "isBooked": false
    },
    {
      "date": "2023-12-22",
      "startTime": "11:45",
      "endTime": "12:00",
      "isBooked": false
    },
    {
      "date": "2023-12-22",
      "startTime": "12:00",
      "endTime": "12:15",
      "isBooked": false
    },
    {
      "date": "2023-12-22",
      "startTime": "12:15",
      "endTime": "12:30",
      "isBooked": false
    },
    {
      "date": "2023-12-22",
      "startTime": "12:30",
      "endTime": "12:45",
      "isBooked": false
    },
    {
      "date": "2023-12-22",
      "startTime": "12:45",
      "endTime": "13:00",
      "isBooked": false
    },
    {
      "date": "2023-12-22",
      "startTime": "13:00",
      "endTime": "13:15",
      "isBooked": false
    },
    {
      "date": "2023-12-22",
      "startTime": "13:15",
      "endTime": "13:30",
      "isBooked": false
    },
    {
      "date": "2023-12-22",
      "startTime": "13:30",
      "endTime": "13:45",
      "isBooked": false
    },
    {
      "date": "2023-12-22",
      "startTime": "13:45",
      "endTime": "14:00",
      "isBooked": false
    },
    {
      "date": "2023-12-22",
      "startTime": "14:00",
      "endTime": "14:15",
      "isBooked": false
    },
    {
      "date": "2023-12-22",
      "startTime": "14:15",
      "endTime": "14:30",
      "isBooked": false
    },
    {
      "date": "2023-12-22",
      "startTime": "14:30",
      "endTime": "14:45",
      "isBooked": false
    },
    {
      "date": "2023-12-22",
      "startTime": "14:45",
      "endTime": "15:00",
      "isBooked": false
    },
    {
      "date": "2023-12-22",
      "startTime": "15:00",
      "endTime": "15:15",
      "isBooked": false
    },
    {
      "date": "2023-12-22",
      "startTime": "15:15",
      "endTime": "15:30",
      "isBooked": false
    },
    {
      "date": "2023-12-22",
      "startTime": "15:30",
      "endTime": "15:45",
      "isBooked": false
    },
    {
      "date": "2023-12-22",
      "startTime": "15:45",
      "endTime": "16:00",
      "isBooked": false
    },
    {
      "date": "2023-12-22",
      "startTime": "16:00",
      "endTime": "16:15",
      "isBooked": false
    },
    {
      "date": "2023-12-22",
      "startTime": "16:15",
      "endTime": "16:30",
      "isBooked": false
    },
    {
      "date": "2023-12-22",
      "startTime": "16:30",
      "endTime": "16:45",
      "isBooked": false
    },
    {
      "date": "2023-12-22",
      "startTime": "16:45",
      "endTime": "17:00",
      "isBooked": false
    }
  ]

  const goToNext = () => {
    const isLastItem = currentIndex === bookingslot.length - 1;
    const nextIndex = isLastItem ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
  };

  const goToPrev = () => {
    const isFirstItem = currentIndex === 0;
    const prevIndex = isFirstItem ? bookingslot.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
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
            // Set your custom width here (e.g., '70%')
            width: isTab ? "80%" : "60%",
            backgroundColor: "#E3F6FF",
            alignContent: "center",
          },
        }}
      >
        {/* <div className="flex flex-col bg-customRedp-2  w-[100%] md:w-[100%]  mt-[2%]">
          <div className="flex flex-row w-[100%] justify-between">


        
            {selectedDoctor?.email}
          </text>
          
          
          <text
            className="ml-4 text-start mt-2 text-purple-900"
            style={{
              fontSize: isTab ? "14px" : "24px",
              fontWeight: 400,
              lineHeight: "28.8px",
              fontFamily: "Lato, sans-serif",
              color: "#CB13CF"
            }}
          >
            {selectedDoctor?.degree}
          </text>
          

          <div className="flex justify-center">
            <button
              className="rounded-full mt-4 "
              type="submit"
              style={{
                backgroundColor: "white",
                width: isTab ? "150px" : "198px",
                height: isTab ? "35px" : "45px",
                boxShadow: " rgba(0, 0, 0, 0.35) 0px 5px 15px",
                // box- shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
                color: "#000000"
              }}
              onClick={handleBookAppointment}
            >
              Book Appointment
            </button>
          </div>

          <div className="flex flex-row gap-3 mt-10 w-[45%] ml-3" >
            <span className="flex">
              <span
                className="mr-8"
                style={{ width: "8px", height: "20px" }}
                dangerouslySetInnerHTML={{ __html: svg3 }}
              ></span>
              <text
                style={{
                  fontWeight: 400,
                  fontSize: isTab ? "14px" : "20px",
                  fontFamily: "Lato, sans-serif",
                  color: "#000000",
                }}
              >
                (4.5 Ratings)
              </text>
            </span>
          </div>
          <span className="flex flex-col" style={{ marginTop: -50 }}>
            <text style={{
              fontWeight: 400,
              fontSize: isTab ? "14px" : "20px",
              fontFamily: "Lato, sans-serif",
              color: "#43BCF5",
              textAlign: 'end'
            }}>Mon-Fri</text>
            <text style={{
              fontWeight: 400,
              fontSize: isTab ? "14px" : "20px",
              fontFamily: "Lato, sans-serif",
              color: "#43BCF5",
              textAlign: 'end'
            }}>10:00am-6:00pm</text>
          </span>
        </div> */}

        <div className="flex flex-row p-2 pt-5">
          {/* ---------------------------left part--------------------------- */}
          <div className="flex flex-col w-1/2 px-2">
            <div class="">
              <img src={selectedDoctor?.doctorPic} alt="doctor image" class=" h-80 w-full" ></img>
            </div>
            <div class="flex flex-col  py-4 px-5 bg-white mt-1">

              <p class="text-xs text-black font-medium mb-2" >Registration No. :- 33256</p>

              <p class="text-black text-3xl font-medium mb-2" >Dr. {selectedDoctor?.name}</p>
              <div class="flex flex-row">
                <div>
                  <img src={education} class="w-5 py-2 " ></img>
                </div>
                <div class="ml-1">


                  {selectedDoctor?.degree?.split(',')?.map((item) => (

                    <p class="text-gray-600 text-xl mb-1">{item}</p>
                  ))}
                  {/* <p class="text-gray-400 text-sm -mt-1 mb-2">Darbhanga Medical College</p> */}
                  {/* <p class="text-gray-600 text-xl">MBBS - 2004</p>
                  <p class="text-gray-400 text-sm -mt-1 mb-2">Darbhanga Medical College</p> */}
                </div>
              </div>
              <p class="text-gray-600 text-xl mb-2" >{selectedDoctor?.totalExperience} Years Experience</p>

              <div class="flex flex-row space-x-2">
                <div class="mt-2">
                  <img src={home} style={{ minWidth: '15px', maxWidth: '16px' }} ></img>
                </div>
                <div class="">
                  <p class="text-gray-600 text-xl ">{selectedDoctor?.address?.houseNo +
                    " " +
                    selectedDoctor?.address?.block +
                    " " +
                    selectedDoctor?.address?.area +
                    ", " +
                    selectedDoctor?.address?.district +
                    ", " +
                    selectedDoctor?.address?.state +
                    " " +
                    selectedDoctor?.address?.pinCode}</p>
                </div>

              </div>


            </div>
          </div>
          {/* --------------------------------right part-------------------------------- */}
          <div className="flex flex-col  w-1/2 px-2" >

            <div class=" py-1 mb-2">
              <p class="text-lg font-medium text-black" >SPECIALITY</p>
              <div class="flex flex-wrap ">
                <p class="bg-white rounded-xl py-1 px-4 mx-2 my-1 ">{selectedDoctor?.speciality}</p>
                {/* <p class="bg-white rounded-xl py-1 px-4 mx-2 my-1">Pulmonologist</p>
                <p class="bg-white rounded-xl py-1 px-4 mx-2 my-1">Pulmonologist</p>
                <p class="bg-white rounded-xl py-1 px-4 mx-2 my-1">Pulmonologist</p> */}

              </div>
            </div>


            <div class=" py-1 mb-2">
              <p class="text-lg font-medium text-black">About The Doctor</p>
              <p class=" italic text-gray-600">
                Lorem ipsum dolor sit amet consectetur. Vitae dui elit vel justo facilisi praesent in et donec. Rutrum lorem consequat tempus fermentum egestas. At gravida enim proin blandit. Non et arcu arcu mauris augue massa.
              </p>
            </div>


            <div class=" py-1 mb-2">
              <p class="text-lg font-medium text-black">Timing</p>
              <div class="flex flex-row  place-content-between">
                <div class="flex flex-col ">
                  <p class="text-gray-600 font-semibold">Mon - Thur :</p>
                  <p class="text-gray-600">10:00 AM - 3:00 PM</p>
                  <p class="text-gray-600">3:00 AM - 7:00 PM</p>
                </div>
                <div class="flex flex-col">
                  <p class="text-gray-600 font-semibold">Mon - Thur :</p>
                  <p class="text-gray-600">10:00 AM - 3:00 PM</p>
                  <p class="text-gray-600">3:00 AM - 7:00 PM</p>
                </div>
              </div>
            </div>


            <div class=" py-1 mb-2">
              <p class="text-lg font-medium text-black">Select service</p>

              <div class="flex flex-col mb-2">
                <div class="flex flex-col  bg-white p-1">
                  <p class="flex place-content-between my-1"><span class="font-medium px-2">Consultation</span> <span class="font-bold px-2">Rs1000</span></p>
                  <p class="text-xs text-gray-500 px-2 my-1">Slot available for Tommorrow 22 Dec. 2023</p>
                  <p class="flex flex-wrap space-x-1 ml-2 my-1">
                    <p class="border-2 rounded-3xl py-1 px-2 text-gray-800 " >3:00 AM</p>
                    <p class="border-2 rounded-3xl py-1 px-2 text-gray-800">7:00 PM</p>
                    <p class="border-2 rounded-3xl py-1 px-2 text-gray-800">3:00 AM</p>
                    <p class="border-2 rounded-3xl py-1 px-2 text-gray-800">7:00 PM</p>

                  </p>

                  <div>


                    {bookingslottoggle && <div class="flex flex-col">
                      <div class=" flex flex-col text-center">
                        <p>
                          Date: {bookingslot[currentIndex].date}
                        </p>

                        <p>
                          Start Time: {bookingslot[currentIndex].startTime}
                        </p>
                        <p>
                          End Time: {bookingslot[currentIndex].endTime}
                        </p>


                      </div>
                      <div class="flex justify-center mt-3">
                        <button class="text-white text-xs rounded-3xl px-3 py-1 mx-5" onClick={goToPrev} style={{ backgroundColor: ' #89CFF0' }}>
                          Previous
                        </button>
                        <button class="text-white text-xs rounded-3xl px-3 py-1 mx-5 " onClick={goToNext} style={{ backgroundColor: ' #89CFF0' }}>
                          Next
                        </button>
                      </div>
                    </div>}


                  </div>
                  <div class="flex flex-row-reverse my-1">
                    <button class="text-white text-xs rounded-3xl px-3 py-1 " onClick={() => { showSlot() }} style={{ backgroundColor: ' #89CFF0' }}>
                      See all Slots
                    </button>
                  </div>
                </div>

              </div>

              <div class="flex flex-col">
                <div class="flex flex-col  bg-white p-1">
                  <p class="flex place-content-between my-1"><span class="font-medium px-2">Consultation</span> <span class="font-bold px-2">Rs1000</span></p>
                  <p class="text-xs text-gray-500 px-2 my-1">Slot available for Tommorrow 22 Dec. 2023</p>
                  <p class="flex flex-wrap space-x-1 ml-2 my-1">
                    <p class="border-2 rounded-3xl py-1 px-2 text-gray-800 " >3:00 AM</p>
                    <p class="border-2 rounded-3xl py-1 px-2 text-gray-800">7:00 PM</p>
                    <p class="border-2 rounded-3xl py-1 px-2 text-gray-800">3:00 AM</p>
                    <p class="border-2 rounded-3xl py-1 px-2 text-gray-800">7:00 PM</p>

                  </p>
                  <div class="flex flex-row-reverse my-1">
                    <button class="text-white text-xs rounded-3xl px-3 py-1 " style={{ backgroundColor: ' #89CFF0' }}>
                      See all Slots
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div >

        </div >
      </Modal >



      <div
        className="flex flex-col bg-customGreen"
        style={{
          width: "100%",
        }}
      >
        <div
          className="divWithHiddenScrollbar flex flex-row gap-4"
          style={{
            overflowX: "auto",
            whiteSpace: "nowrap", // Ensures items are in a single line
            position: "relative",
            maxWidth: "100%", // Set a max-width to ensure scrolling
            msOverflowStyle: "none", // Hides scrollbar in IE and Edge
            scrollbarWidth: "none", // Hides scrollbar in Firefox

            // Additional styles for Webkit browsers like Chrome and Safari
            "&::-webkit-scrollbar": {
              display: "none", // Hides scrollbar
            },
          }}
        >
          {categories.map((item, index) => (
            <span
              className="bg-#E4FFF2; cursor-pointer px-8 hover:bg-customRed"
              style={{
                height: "29px",
                border: "1px solid #89CFF0",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Lato, sans-serif",
                fontWeight: 400,
                fontSize: "20px",
                lineHeight: "28.8px",
                color: "#595959",
              }}
              key={index} // It's better to use a unique identifier if available
              onClick={() => handleFilterDocotors(item)}
            >
              {item}
            </span>
          ))}
        </div>

        {/* Doctors Array Start */}

        <div style={{ marginTop: "10px" }}>
          {filteredDoctors?.map((doctor, index) => (
            <div
              className="bg-white w-full p-4 mb-5 hover:cursor-pointer"
              onClick={() => handleQRCode(doctor._id)}

            >
              <div className="flex flex-row justify-between">
                <div class="flex items-center gap-x-2">
                  {
                    doctor.doctorPic ? <img
                      class="object-cover sm:w-20 sm:h-20 w-10 h-10  rounded-full"
                      src={doctor.doctorPic}
                      alt={doctor.name}
                    />
                      :
                      <AccountCircleIcon style={{ fontSize: '90px', color: "#A4A4A4" }} />
                  }
                  <div>
                    <h1 class=" font-semibold text-gray-700 sm:text-lg text-sm capitalize">
                      Dr. {doctor.name}
                    </h1>

                    <p class=" text-gray-500 sm:text-sm text-xs ">
                      {doctor.speciality}
                    </p>
                    <p class=" text-gray-500 sm:text-sm text-xs ">
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
