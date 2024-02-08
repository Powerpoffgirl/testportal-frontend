import React, { useEffect, useState, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import Header from "./header";
import DoctorSidebar from "./doctorSidebar";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-responsive-modal";
import { Popconfirm } from "antd";
import { FaTrashAlt } from "react-icons/fa";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ToastContainer, toast } from "react-toastify";
import UserContext from "./userContext";
import close_button from "../assets/close_button.svg";
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

export default function PatientList({ searchTerm }) {
  const { updateUser, updateUserEmail, updateUserimage } =
    useContext(UserContext);
  let isTab = useMediaQuery({ query: "(max-width: 767px)" });

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [selectedPatient, setSelectedPatient] = useState();
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [patientsList, setPatientsList] = useState([]);
  const [appointmentList, setAppointmentList] = useState([]);
  const navigate = useNavigate();
  const [filteredPatients, setFilteredPatients] = useState([patientsList]);
  const [userDetailsName, setUserDetailsName] = useState();
  const [userDetailsEmail, setUserDetailsEmail] = useState();
  const [userDetailsPic, setUserDetailsPic] = useState();

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in local storage");
          return;
        }
        const response = await fetch(
          `${baseUrl}/api/v1/doctor/get_patientsList`,
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
        const filteredPatients = data.data.filter((patient) => patient.name !== null);
        setPatientsList(filteredPatients);

      } catch (error) {
        console.error("There was an error verifying the OTP:", error);
      }
    };
    fetchPatientDetails();
    const fetchAppointmentDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in local storage");
          return;
        }
        const response = await fetch(
          `${baseUrl}/api/v1/doctor/get_all_appointments`,
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
        if (data.message === "Invalid or expired token") {
          toast.error("Invalid or expired token")
          navigate("/doctorlogin")
          localStorage.clear()
        }
        setAppointmentList(data?.data);
      } catch (error) {
        console.error("There was an error verifying the OTP:", error);
      }
    };
    fetchAppointmentDetails();
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const patientId = localStorage.getItem("patientId");
        if (!token) {
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
        console.log("DATA from response", data);
        setUserDetailsName(data?.data.name);
        setUserDetailsEmail(data?.data.email);
        setUserDetailsPic(data?.data.doctorPic);
        console.log("usser name$$$$$$$", data?.data.name);
      } catch (error) {
        console.error("There was an error verifying the OTP:", error);
      }
    };
    fetchUserDetails();
  }, []);

  useEffect(() => {
    if (patientsList?.length > 0 && searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
      const matchedPatients = patientsList.filter((p) =>
        p.name && p.name.toLowerCase().includes(lowerCaseSearchTerm)
      );
      setFilteredPatients(matchedPatients);
    } else {
      const filteredPatients = patientsList.filter((p) => p.name !== undefined);
      setFilteredPatients(filteredPatients);
    }
  }, [patientsList, searchTerm]);

  const handleDeletePatient = async (patientId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in local storage");
        return;
      }
      const response = await fetch(
        `${baseUrl}/api/v1/doctor/delete_patient/${patientId}`,
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
    setSelectedPatient(patient); // This will return the doctor object if found, otherwise undefined
    onOpenModal();
  };

  const handleEditPatient = (patientId) => {
    localStorage.setItem("patientId", patientId);
    navigate("/editpatientform");
  };

  // const handleDeletePatient = (patientId) =>
  // {

  // }

  const handleBookAppointment = (patientId) => {
    localStorage.setItem("patientId", patientId);
    navigate("/editappointment");
  };

  console.log("PATIENT LISTS", patientsList);
  console.log("APPOINTMENT LIST", appointmentList);
  updateUser(userDetailsName);
  updateUserEmail(userDetailsEmail);
  updateUserimage(userDetailsPic);

  return (
    <>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        patient={selectedPatient}
        styles={{
          modal: {
            width: isTab ? "80%" : "70%",
            backgroundColor: "#E3F6FF",
            alignContent: "center",
            borderRadius: "23px",
          },
          closeButton: {
            display: "none",
          },
        }}
      >
        <div class="flex flex-row-reverse md:-mb-14  -mb-18 z-50">
          <button onClick={onCloseModal}>
            <img src={close_button} alt="close_button" class="w-8 mb-5"></img>
          </button>

        </div>
        <div className="flex flex-col bg-customRedp-2 w-[100%] md:w-[100%]  mt-[2%] ">
          <div className="flex flex-row w-[100%] justify-between">
            {selectedPatient?.patientPic ? (
              <img
                src={selectedPatient?.patientPic}
                alt="Avatar"
                style={{
                  borderRadius: "50%",
                  height: isTab ? "80px" : "123px",
                  width: isTab ? "80px" : "123px",
                  marginRight: "auto",
                  marginLeft: "auto",
                  boxShadow: "inset 0 0 0 2px #76767",
                }}
              />
            ) : (
              <AccountCircleIcon
                style={{
                  fontSize: "90px",
                  color: "#B1DAED",
                  borderRadius: "50%",
                  height: isTab ? "40px" : "123px",
                  width: isTab ? "40px" : "123px",
                  marginRight: "auto",
                  marginLeft: "auto",
                  boxShadow: "inset 0 0 0 2px #76767",
                }}
              />
            )}
          </div>
          <text
            className="ml-4 text-start mt-4"
            style={{
              fontSize: isTab ? "18px" : "26px",
              fontWeight: 600,
              lineHeight: "28.8px",
              fontFamily: "Lato, sans-serif",
              color: "#000000",
            }}
          >
            {selectedPatient?.name}
          </text>
          <text
            className="ml-4 text-start mt-4"
            style={{
              fontSize: isTab ? "12px" : "20px",
              fontWeight: 400,
              lineHeight: "24px",
              fontFamily: "Lato, sans-serif",
              color: "#000000",
              marginBottom: "2%",
            }}
          >
            {selectedPatient?.age} yr, {selectedPatient?.bodyWeight} kg
          </text>

          <text
            className="ml-4 text-start mt-1"
            style={{
              fontSize: isTab ? "14px" : "20px",
              fontWeight: 400,
              lineHeight: "28.8px",
              fontFamily: "Lato, sans-serif",
              color: "#000000",
            }}
          >
            {selectedPatient?.address?.houseNo && `${selectedPatient.address.houseNo} `}
            {selectedPatient?.address?.block && `${selectedPatient.address.block} `}
            {selectedPatient?.address?.area && `${selectedPatient.address.area}, `}
            {selectedPatient?.address?.district && `${selectedPatient.address.district}, `}
            {selectedPatient?.address?.state && `${selectedPatient.address.state} `}
            {selectedPatient?.address?.pinCode && `${selectedPatient.address.pinCode}`}

          </text>
        </div>
      </Modal>
      <div className="flex flex-col">
        {filteredPatients?.map((patient) => (
          <div className="bg-white w-full p-4 sm:px-5 px-1 mb-5">
            <div className="flex flex-row justify-start items-center">
              <div
                class="flex items-center gap-x-2 "
                onClick={() => findSelectedDoctor(patient._id)}
              >
                {patient.patientPic ? (
                  <img
                    class="object-cover sm:w-20 sm:h-20 w-10 h-10  rounded-full"
                    src={patient.patientPic}
                    alt={patient.name}
                  />
                ) : (
                  <AccountCircleIcon
                    style={{
                      color: "#B1DAED",
                      fontSize: isTab ? "50px" : "90px",
                    }}
                  />
                )}
                <div>
                  <h1 class=" font-semibold text-gray-700 sm:text-lg text-sm capitalize">
                    {patient.name}
                  </h1>
                  <p>
                    {patient.age} yrs , {patient.bodyWeight} kg
                  </p>
                  {/* {patient.address?.district && `${patient.address.district}, `} */}
                  {patient.address?.state && `${patient.address.state}, `}
                  {patient.address?.pinCode && `${patient.address.pinCode}`}


                </div>
              </div>
              <div class="flex flex-row ms-auto gap-1 sm:gap-4">
                <Popconfirm
                  title="Delete the Patient"
                  description="Are you sure to delete this Patient?"
                  okText="Delete"
                  okType="danger"
                  cancelText="No"
                  onConfirm={() => handleDeletePatient(patient._id)}
                  className="rounded-full px-4 sm:px-6 py-1 sm:py-2 text-white bg-[#EF5F5F] text-xs sm:text-sm"
                >
                  <button class="rounded-full px-4 sm:px-6 py-1 sm:py-2 text-white bg-[#EF5F5F] text-xs sm:text-sm">
                    Delete
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
