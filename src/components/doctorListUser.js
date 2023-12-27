import React, { useEffect, useState } from "react";
import DoctorSidebar from "./doctorSidebar";
import Header from "./header";
import { useMediaQuery } from "react-responsive";
import { Modal } from "react-responsive-modal";
import UserSidebar from "./userSidebar";
import UserHeader from "./userHeader";
import { useNavigate } from "react-router-dom";
import one from "../assets/one.svg";
import two from "../assets/two.svg";
import three from "../assets/three.svg";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const svg3 = `<svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.5 0L15.3064 8.63729H24.3882L17.0409 13.9754L19.8473 22.6127L12.5 17.2746L5.15268 22.6127L7.95911 13.9754L0.611794 8.63729H9.69357L12.5 0Z" fill="#FFF500"/>
</svg>`;

const svg4 = `<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.2237 22.2222V20.243L8.6473 6.66664L6.66813 8.6458L20.2445 22.2222H22.2237ZM25.0015 25H19.0987L0.800076 6.66664C0.545446 6.38886 0.348687 6.08214 0.209798 5.7465C0.0709093 5.41085 0.00146484 5.05784 0.00146484 4.68747C0.00146484 4.3171 0.0709093 3.9583 0.209798 3.61108C0.348687 3.26386 0.55702 2.96293 0.834798 2.7083L2.77924 0.798582C3.03387 0.520803 3.3348 0.318256 3.68202 0.190942C4.02924 0.0636268 4.37646 -3.09348e-05 4.72369 -3.09348e-05C5.09406 -3.09348e-05 5.44707 0.0636268 5.78271 0.190942C6.11836 0.318256 6.42508 0.520803 6.70285 0.798582L25.0015 19.0972V25ZM7.67508 7.67358L6.66813 8.6458L8.6473 6.66664L7.67508 7.67358Z" fill="white"/>
</svg>`;

const svg5 = `<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.6875 24.9999C3.82812 24.9999 3.09245 24.7279 2.48047 24.1839C1.86849 23.6399 1.5625 22.986 1.5625 22.2221V4.16654H0V1.38877H7.8125V-0.00012207H17.1875V1.38877H25V4.16654H23.4375V22.2221C23.4375 22.986 23.1315 23.6399 22.5195 24.1839C21.9076 24.7279 21.1719 24.9999 20.3125 24.9999H4.6875ZM20.3125 4.16654H4.6875V22.2221H20.3125V4.16654ZM7.8125 19.4443H10.9375V6.94432H7.8125V19.4443ZM14.0625 19.4443H17.1875V6.94432H14.0625V19.4443Z" fill="white"/>
</svg>`;

export default function DoctorListUser({ searchTerm })
{
  let isTab = useMediaQuery({ query: "(max-width: 768px)" });
  const [doctorsList, setDoctorsList] = useState([]);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [selectedDoctor, setSelectedDoctor] = useState();
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const navigate = useNavigate();
  const [filteredDoctors, setFilteredDoctors] = useState([doctorsList])


  useEffect(() =>
  {
    const fetchDoctorDetails = async () =>
    {
      try
      {
        const token = localStorage.getItem("token");
        if (!token)
        {
          console.error("No token found in local storage");
          return;
        }
        const response = await fetch(`${baseUrl}/api/v1/list_doctors`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // 'x-auth-token': token // Replace with your actual token from the previous session
          },
        });

        const data = await response.json();
        console.log("DATA from response", data);
        const verifiedDoctors = data.data.filter(
          (doctor) => doctor.accountVerified.isVerified
        );
        setDoctorsList(verifiedDoctors);
      } catch (error)
      {
        console.error("There was an error verifying the OTP:", error);
      }
    };
    fetchDoctorDetails();
  }, []);

  useEffect(() =>
  {
    // Check if there is a searchTerm and the doctorsList is not empty.
    if (doctorsList.length > 0 && searchTerm)
    {
      const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
      const matchedDoctors = doctorsList.filter(doctor =>
        doctor.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        doctor.speciality.toLowerCase().includes(lowerCaseSearchTerm)
      )
      setFilteredDoctors(matchedDoctors)
    } else
    {
      // If no searchTerm or doctorsList is empty, use the original list.
      setFilteredDoctors(doctorsList);
    }
  }, [doctorsList, searchTerm]); // Include all dependencies in the dependency array


  const handleQRCode = (doctorId) =>
  {
    console.log("HELLO");
    localStorage.setItem("doctorId", doctorId);
    const doctor = doctorsList?.find((doc) => doc._id === doctorId);
    setSelectedDoctor(doctor);
    onOpenModal();
  };

  const handleBookAppointment = () =>
  {
    localStorage.setItem("doctorId", selectedDoctor._id)
    localStorage.setItem("doctorName", selectedDoctor.name)
    localStorage.setItem("doctorEmail", selectedDoctor.email)
    navigate("/bookappointment");
  };

  const handleFilterDocotors = (item) =>
  {
    console.log("ITEM NAME IS================>", item)
    if (item.toLowerCase() === "all")
    {
      setFilteredDoctors(doctorsList)
    }
    else
    {
      const filteredDoctors = doctorsList.filter((doc) => doc.speciality === item)
      setFilteredDoctors(filteredDoctors)
    }

  }

  return (
    <>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        doctor={selectedDoctor}
        styles={{
          modal: {
            // Set your custom width here (e.g., '70%')
            width: isTab ? "80%" : "50%",
            backgroundColor: "#fff",
            alignContent: "center",
          },
        }}
      >
        <div className="flex flex-col bg-customRedp-2  w-[100%] md:w-[100%]  mt-[2%]">
          <div className="flex flex-row w-[100%] justify-between">
            {/* <span className="flex flex-col justify-start">
              <text
                style={{
                  fontWeight: 400,
                  fontSize: !isTab ? "20px" : "16px",
                  fontFamily: "Lato, sans-serif",
                  color: "white",
                }}
              >
                {selectedDoctor?.workingDays?.map((day) => (
                  <span key={day}>{day.slice(0, 3)} </span>
                ))}
              </text>
              <text
                style={{
                  fontWeight: 400,
                  fontSize: !isTab ? "20px" : "16px",
                  fontFamily: "Lato, sans-serif",
                  color: "white",
                }}
              >
                {selectedDoctor?.workingHours?.workHourFrom}:00 To{" "}
                {selectedDoctor?.workingHours?.workHourTo}:00
              </text>
            </span> */}

            {
              selectedDoctor?.doctorPic ? <img
                src={selectedDoctor?.doctorPic}
                alt="Avatar"
                style={{
                  borderRadius: "50%",
                  height: isTab ? "40px" : "123px",
                  width: isTab ? "40px" : "123px",
                  marginRight: '70px',
                  marginLeft: '20px',
                  boxShadow: 'inset 0 0 0 2px #76767'
                }}
              />
                :
                <AccountCircleIcon style={{
                  fontSize: '90px', color: "#E3F6FF",
                  borderRadius: "50%",
                  height: isTab ? "40px" : "123px",
                  width: isTab ? "40px" : "123px",
                  marginRight: '70px',
                  boxShadow: 'inset 0 0 0 2px #76767'
                }} />
            }

            {/* <img
              src={selectedDoctor?.doctorPic}
              alt="Avatar"
              style={{
                borderRadius: "50%",
                height: isTab ? "40px" : "123px",
                width: isTab ? "40px" : "123px",
                marginRight: '70px',
                marginLeft: '20px',
                boxShadow: 'inset 0 0 0 2px #76767'
              }}
            ></img> */}

            {/* <span className="flex flex-col justify-start">
              <text style={{ color: "#89CFF0" }}>Mon-Fri</text>
              <text style={{ color: "#89CFF0" }}>10:00am-6:00pm</text>
            </span> */}
          </div>
          <text
            className="ml-4 text-start mt-4"
            style={{
              fontSize: isTab ? "18px" : "30px",
              fontWeight: 500,
              lineHeight: "28.8px",
              fontFamily: "Lato, sans-serif",
            }}
          >
            Dr. {selectedDoctor?.name}
          </text>
          <text
            className="ml-4 text-start mt-2"
            style={{
              fontSize: isTab ? "12px" : "24px",
              fontWeight: 400,
              lineHeight: "24px",
              fontFamily: "Lato, sans-serif",
              color: "#767676",

            }}
          >
            {selectedDoctor?.email}
          </text>
          <text
            className="ml-4 text-start mt-2"
            style={{
              fontSize: isTab ? "16px" : "24px",
              fontWeight: 400,
              lineHeight: "28.8px",
              fontFamily: "Lato, sans-serif",
              color: "#43BCF5",
            }}
          >
            {selectedDoctor?.speciality}
          </text>
          <text
            className="ml-4 text-start mt-2"
            style={{
              fontSize: isTab ? "14px" : "24px",
              fontWeight: 400,
              lineHeight: "28.8px",
              fontFamily: "Lato, sans-serif",
              color: "#2CBE78"

            }}
          >
            {selectedDoctor?.totalExperience} Years Experience
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
          <text
            className="ml-4 text-start mt-2"
            style={{
              fontSize: isTab ? "14px" : "24px",
              fontWeight: 400,
              lineHeight: "28.8px",
              fontFamily: "Lato, sans-serif",
              color: "#000000",
            }}
          >
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
        </div>
      </Modal>
      <div
        className="flex flex-col bg-customGreen"
        style={{
          width: "100%",
        }}
      >



        {/* Doctors Array Start */}

        <div style={{ marginTop: "10px" }}>
          {filteredDoctors?.map((doctor, index) => (
            <div
              className="bg-white w-full p-4 mb-5"
              onClick={() => handleQRCode(doctor._id)}
            >
              <div className="flex flex-row justify-between">
                <div class="flex items-center gap-x-2">

                  {
                    doctor.doctorPic ? <img
                      class="object-cover sm:w-20 sm:h-20 w-10 h-10  rounded-full"
                      src={doctor?.doctorPic}
                      alt={doctor?.name}
                    />
                      :
                      <AccountCircleIcon style={{ fontSize: '90px', color: "#B1DAED" }} />
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
