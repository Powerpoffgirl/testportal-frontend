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
import delete_button from "../assets/delete_button.svg";
import edit_button from "../assets/edit_button.svg";


export default function LabPatientList({ searchTerm })
{
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

  useEffect(() =>
  {
    const fetchPatientDetails = async () =>
    {
      try
      {
        const token = localStorage.getItem("token");
        if (!token)
        {
          console.error("No token found in local storage");
          return;
        }
        const response = await fetch(`${baseUrl}/api/v1/lab/list_labPatient`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token, // Replace with your actual token from the previous session
          },
        });

        const data = await response.json();
        console.log("DATA from response", data);
        const filteredPatients = data.data.filter(
          (patient) => patient.name !== null
        );
        setPatientsList(filteredPatients);
      } catch (error)
      {
        console.error("There was an error verifying the OTP:", error);
      }
    };
    fetchPatientDetails();

  }, []);

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
        const response = await fetch(`${baseUrl}/api/v1/lab/get_labDetails`, {
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
        setUserDetailsPic(data?.data.doctorPic);
        console.log("usser name$$$$$$$", data?.data.name);
      } catch (error)
      {
        console.error("There was an error verifying the OTP:", error);
      }
    };
    fetchUserDetails();
  }, []);

  useEffect(() =>
  {
    if (patientsList?.length > 0 && searchTerm)
    {
      const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
      const matchedPatients = patientsList.filter(
        (p) => p.name && p.name.toLowerCase().includes(lowerCaseSearchTerm)
      );
      setFilteredPatients(matchedPatients);
    } else
    {
      const filteredPatients = patientsList.filter((p) => p.name !== undefined);
      setFilteredPatients(filteredPatients);
    }
  }, [patientsList, searchTerm]);

  const handleDeletePatient = async (patientId) =>
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
        `${baseUrl}/api/v1/lab/delete_patient/${patientId}`,
        {
          method: "DELETE", // Use DELETE method
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token, // Use the stored token
          },
        }
      );

      const data = await response.json();

      if (response.ok)
      {
        console.log("Patient deleted successfully", data);
        // Update the list in the UI by removing the deleted doctor
        setPatientsList((prevPatientsList) =>
          prevPatientsList.filter((patient) => patient._id !== patientId)
        );
      } else
      {
        console.error("Failed to delete the doctor", data?.message);
      }
    } catch (error)
    {
      console.error("There was an error deleting the doctor:", error);
    }
  };

  const handleEdit = (patientId) =>
  {
    localStorage.setItem("patientId", patientId);
    navigate("/editpatientformlab");
  };

  const findSelectedDoctor = async (patientId) =>
  {
    console.log("DOCTOR ID", patientId);
    // // Assuming doctorsList is an array of doctor objects and each doctor has an _id field.
    const patient = patientsList?.find((doc) => doc._id === patientId);
    setSelectedPatient(patient); // This will return the doctor object if found, otherwise undefined
    onOpenModal();
  };

  const handleEditPatient = (patientId) =>
  {
    localStorage.setItem("patientId", patientId);
    navigate("/editpatientform");
  };

  // const handleDeletePatient = (patientId) =>
  // {

  // }

  const handleBookAppointment = (patientId) =>
  {
    localStorage.setItem("patientId", patientId);
    navigate("/billing");
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
        doctor={selectedPatient}
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
              title="Delete the Patient"
              description="Are you sure to delete this Patient?"
              okText="Delete"
              okType="danger"
              cancelText="No"
              onConfirm={() => handleDeletePatient(selectedPatient?._id)}
            >
              <button>
                <img src={delete_button} alt="deleteButton" class="w-8"></img>
              </button>
            </Popconfirm>
            <button onClick={() => handleEdit(selectedPatient?._id)}>
              <img src={edit_button} alt="editButton" class="w-8"></img>
            </button>
          </div>
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
            {selectedPatient?.address?.houseNo &&
              `${selectedPatient.address.houseNo} `}
            {selectedPatient?.address?.block &&
              `${selectedPatient.address.block} `}
            {selectedPatient?.address?.area &&
              `${selectedPatient.address.area}, `}
            {selectedPatient?.address?.district &&
              `${selectedPatient.address.district}, `}
            {selectedPatient?.address?.state &&
              `${selectedPatient.address.state} `}
            {selectedPatient?.address?.pinCode &&
              `${selectedPatient.address.pinCode}`}
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
              <div class="flex flex-row ms-auto gap-1 sm:gap-4  mt-3">
                <button
                  class="rounded-full px-6 sm:px-8 py-1 sm:py-2 text-white bg-[#89CFF0] text-xs sm:text-sm"
                  onClick={() => handleBookAppointment(patient._id)}
                >
                  Report
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
