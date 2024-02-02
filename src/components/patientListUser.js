import React, { useEffect, useState, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-responsive-modal";
import { FaTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Popconfirm } from "antd";
import UserContext from "./userContext";
import { FaEdit } from "react-icons/fa";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import close_button from "../assets/close_button.svg";


export default function PatientListUser({ searchTerm })
{
  const { updateUser, updateUserEmail, updateUserimage } =
    useContext(UserContext);
  let isTab = useMediaQuery({ query: "(max-width: 768px)" });
  let smaller = useMediaQuery({ query: "(max-width: 425px)" });
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [patientsList, setPatientsList] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([patientsList]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [selectedPatient, setSelectedPatient] = useState();
  const [userDetailsName, setUserDetailsName] = useState();
  const [userDetailsEmail, setUserDetailsEmail] = useState();
  const [userDetailsPic, setUserDetailsPic] = useState();
  const [userPatient, setUserPatient] = useState({})

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
        if (data.message === "Invalid or expired token")
        {
          toast.error("Invalid or expired token")
          navigate("/userlogin")
          localStorage.clear()
        }
        const filtered = data?.data.filter((patient) => patient.name !== null);
        setPatientsList(filtered);
      } catch (error)
      {
        console.error("There was an error verifying the OTP:", error);
      }
    };
    fetchPatientDetails();
  }, [searchTerm]);

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
      } catch (error)
      {
        console.error("There was an error verifying the OTP:", error);
      }
    };
    fetchUserDetails();
  }, []);

  updateUser(userDetailsName);
  updateUserEmail(userDetailsEmail);
  updateUserimage(userDetailsPic);


  console.log("USER NAME", userDetailsName)



  useEffect(() =>
  {
    if (patientsList?.length > 0 && searchTerm)
    {
      const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
      const matchedPatients = patientsList.filter((p) =>
        p.name.toLowerCase().includes(lowerCaseSearchTerm)
      );

      setFilteredPatients(matchedPatients);
    } else
    {
      setFilteredPatients(patientsList);
    }

  }, [patientsList, searchTerm]);




  const handleEditPatient = (patientId) =>
  {
    localStorage.setItem("patientId", patientId);
    navigate("/editpatientform");
  };

  const handleDeletePatient = async (patientId, patientName) =>
  {
    try
    {
      const token = localStorage.getItem("token");
      if (!token)
      {
        console.error("No token found in local storage");
        return;
      }

      if (patientName === userDetailsName)
      {
        // If the patientName is the same as userDetailsName, it appears to be trying to delete a user
        const response = await fetch(`${baseUrl}/api/v1/user/delete_user`, {
          method: "DELETE", // Use DELETE method for deleting user
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        });
        const data = await response.json();

        if (data.success === true)
        {
          toast.success("User Deleted successfully");
          navigate("/userlogin");
          return; // Return to exit the function after deleting the user
        } else
        {
          console.error("Failed to delete user:", data?.message);
        }
      } else
      {
        // If the patientName is different from userDetailsName, it appears to be trying to delete a patient
        const response = await fetch(
          `${baseUrl}/api/v1/user/delete_patient/${patientId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token,
            },
          }
        );

        const data = await response.json();

        if (response.ok)
        {
          console.log("Patient deleted successfully", data);
          // Update the list in the UI by removing the deleted patient
          toast.success("Patient Deleted!");
          setPatientsList((prevPatientsList) =>
            prevPatientsList.filter((patient) => patient._id !== patientId)
          );
        } else
        {
          console.error("Failed to delete the patient", data?.message);
        }
      }
    } catch (error)
    {
      console.error("There was an error deleting the patient:", error);
    }
  };

  const handleBookAppointment = (patient) =>
  {
    console.log("PATIENT", patient);
    localStorage.setItem("patientId", patient?._id);
    localStorage.setItem("patientName", patient?.name);
    navigate("/bookappointment");
  };
  console.log("PATIENT LISTS", patientsList);

  const findSelectedDoctor = async (patientId) =>
  {
    console.log("DOCTOR ID", patientId);
    const patient = patientsList?.find((doc) => doc._id === patientId);
    setSelectedPatient(patient); // This will return the doctor object if found, otherwise undefined
    onOpenModal();
  };

  console.log("SELECTED PATIENT", selectedPatient);
  console.log("SEARCH TERM FROM COMPONENT", searchTerm);
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
        <div class="flex flex-row-reverse    z-50   hover:cursor-pointer">
          <button onClick={onCloseModal}>
            <img src={close_button} alt="close button" class="w-8 "></img>
          </button>
        </div>

        <div className="flex flex-row w-[100%] justify-between">
          {selectedPatient?.patientPic ? (
            <img
              src={selectedPatient?.patientPic}
              alt="Avatar"
              style={{
                borderRadius: "50%",
                height: isTab ? "40px" : "123px",
                width: isTab ? "40px" : "123px",
                marginTop: "10px",
                marginRight: "auto",
                marginLeft: "auto",
                boxShadow: "inset 0 0 0 2px #76767",
              }}
            />
          ) : (
            <div className="flex flex-row w-[100%] justify-center ">
              <AccountCircleIcon
                style={{
                  fontSize: isTab ? "50px" : "90px",
                  color: "#B1DAED",
                  borderRadius: "50%",
                  height: isTab ? "80px" : "123px",
                  width: isTab ? "80px" : "123px",
                  boxShadow: "inset 0 0 0 2px #76767",
                  // Adjust or remove marginRight if necessary
                }}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col bg-customGreen p-2  items-center w-[100%] md:w-[100%] mt-[2%]">
          <div className="flex flex-row w-[100%] justify-between"></div>
          <text
            className="ml-4 text-center mt-4"
            style={{
              fontSize: isTab ? "18px" : "26px",
              fontWeight: 600,
              lineHeight: "28.8px",
              fontFamily: "Lato, sans-serif",
            }}
          >
            {selectedPatient?.name}
          </text>
          <text
            className="ml-4 text-center mt-4"
            style={{
              fontSize: isTab ? "12px" : "20px",
              fontWeight: 400,
              lineHeight: "24px",
              fontFamily: "Lato, sans-serif",
              color: "black",
              marginBottom: "2%",
            }}
          >
            {selectedPatient?.age} yr, {selectedPatient?.bodyWeight} kg
          </text>

          <text
            className="ml-4 text-center mt-2 truncate overflow-y-auto flex-wrap "
            style={{
              fontSize: isTab ? "14px" : "20px",
              fontWeight: 400,
              lineHeight: "28.8px",
              fontFamily: "Lato, sans-serif",
              color: "black",
            }}
          >
            {selectedPatient?.address?.houseNo +
              " " +
              selectedPatient?.address?.block +
              " " +
              selectedPatient?.address?.area

            }
          </text>

          <text
            className="ml-4 text-center mt-2 truncate overflow-y-auto flex-wrap "
            style={{
              fontSize: isTab ? "14px" : "20px",
              fontWeight: 400,
              lineHeight: "28.8px",
              fontFamily: "Lato, sans-serif",
              color: "black",
            }}
          >
            {selectedPatient?.address?.district +
              ", " +
              selectedPatient?.address?.state +
              " " +
              selectedPatient?.address?.pinCode}
          </text>


        </div>
      </Modal>

      <div className="flex flex-col">
        {(filteredPatients?.length > 0 && filteredPatients[0].name) ? (
          filteredPatients?.map((patient) => (
            <div
              className="bg-white w-full p-4 sm:px-5 px-1 mb-5"
              key={patient._id}
            >
              <div className="flex lg:flex-row flex-col justify-start items-center ">
                <div
                  className="flex items-center gap-x-2 "
                  onClick={() => findSelectedDoctor(patient._id)}
                >
                  {patient.patientPic ? (
                    <img
                      className="object-cover sm:w-20 sm:h-20 w-10 h-10 rounded-full"
                      src={patient.patientPic}
                      alt={patient.name}
                    />
                  ) : (
                    <AccountCircleIcon
                      style={{ fontSize: "90px", color: "#B1DAED" }}
                    />
                  )}

                  <div className="gap-x-3 truncate overflow-x-auto">
                    <h1 className="font-semibold text-gray-700 sm:text-lg text-sm capitalize ml-2">
                      {patient.name}
                    </h1>
                    <p className="text-gray-500 text-sm capitalize ml-2">
                      {patient.age} yrs, {patient.bodyWeight} kg
                    </p>
                    <p
                      className="text-gray-500 text-sm capitalize ml-2 truncate overflow-x-auto"
                      style={{ width: isTab ? "35%" : null }}
                    >
                      {patient.address?.houseNo} {patient.address?.block}{" "}
                      {patient.address?.area}, {patient.address?.district},{" "}
                      {patient.address?.state}, {patient.address?.pinCode}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row ms-auto gap-1 sm:gap-4 pr-5">
                  <button
                    class="rounded-full px-6 sm:px-8 py-1 sm:py-2 text-white bg-[#89CFF0] text-xs sm:text-sm"
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
                    title="Delete the Patient"
                    description="Are you sure to delete this Patient?"
                    okText="Delete"
                    okType="danger"
                    cancelText="No"
                    className="rounded-full px-4 sm:px-6 py-2 sm:py-2 text-white bg-[#EF5F5F] text-xs sm:text-sm"
                    onConfirm={() =>
                      handleDeletePatient(patient._id, patient.name)
                    }
                  >
                    <button
                      danger
                      className="rounded-full px-4 sm:px-6 py-2 sm:py-2 text-white bg-[#EF5F5F] text-xs sm:text-sm"
                    >
                      {isTab ? <FaTrashAlt /> : "Delete"}
                    </button>
                  </Popconfirm>

                </div>
              </div>
              <ToastContainer />
            </div>
          ))
        ) : (
          <p>
            Please complete your profile first.{" "}
            <span
              style={{ textDecoration: "underline" }}
              onClick={() => navigate("/userprofile")}
            >
              Click here.
            </span>
          </p>
        )}
      </div>
    </>
  );
}
