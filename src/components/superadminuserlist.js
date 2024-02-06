import React, { useEffect, useState } from "react";
import DoctorSidebar from "./doctorSidebar";
import Header from "./header";
import { useMediaQuery } from "react-responsive";
import { Modal } from "react-responsive-modal";
import AdminSidebar from "./adminSidebar";
import { useNavigate } from "react-router-dom";
import UserList from "./userList";
import { Button, Popconfirm } from "antd";
import { FaTrashAlt } from "react-icons/fa";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { toast } from "react-toastify";
import close_button from "../assets/close_button.svg";

const svg1 = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.7778 10C17.7778 7.83333 17.0231 5.99537 15.5139 4.48611C14.0046 2.97685 12.1667 2.22222 10 2.22222V0C11.3889 0 12.6898 0.263889 13.9028 0.791667C15.1157 1.31944 16.1713 2.03241 17.0694 2.93056C17.9676 3.8287 18.6806 4.88426 19.2083 6.09722C19.7361 7.31019 20 8.61111 20 10H17.7778ZM13.3333 10C13.3333 9.07407 13.0093 8.28704 12.3611 7.63889C11.713 6.99074 10.9259 6.66667 10 6.66667V4.44444C11.537 4.44444 12.8472 4.98611 13.9306 6.06944C15.0139 7.15278 15.5556 8.46296 15.5556 10H13.3333ZM18.8333 20C16.5185 20 14.2315 19.4954 11.9722 18.4861C9.71296 17.4769 7.65741 16.0463 5.80556 14.1944C3.9537 12.3426 2.52315 10.287 1.51389 8.02778C0.50463 5.76852 0 3.48148 0 1.16667C0 0.833333 0.111111 0.555556 0.333333 0.333333C0.555556 0.111111 0.833333 0 1.16667 0H5.66667C5.92593 0 6.15741 0.087963 6.36111 0.263889C6.56482 0.439815 6.68519 0.648148 6.72222 0.888889L7.44444 4.77778C7.48148 5.07407 7.47222 5.32407 7.41667 5.52778C7.36111 5.73148 7.25926 5.90741 7.11111 6.05556L4.41667 8.77778C4.78704 9.46296 5.22685 10.125 5.73611 10.7639C6.24537 11.4028 6.80556 12.0185 7.41667 12.6111C7.99074 13.1852 8.59259 13.7176 9.22222 14.2083C9.85185 14.6991 10.5185 15.1481 11.2222 15.5556L13.8333 12.9444C14 12.7778 14.2176 12.6528 14.4861 12.5694C14.7546 12.4861 15.0185 12.463 15.2778 12.5L19.1111 13.2778C19.3704 13.3519 19.5833 13.4861 19.75 13.6806C19.9167 13.875 20 14.0926 20 14.3333V18.8333C20 19.1667 19.8889 19.4444 19.6667 19.6667C19.4444 19.8889 19.1667 20 18.8333 20ZM3.36111 6.66667L5.19444 4.83333L4.72222 2.22222H2.25C2.34259 2.98148 2.47222 3.73148 2.63889 4.47222C2.80556 5.21296 3.0463 5.94444 3.36111 6.66667ZM13.3056 16.6111C14.0278 16.9259 14.7639 17.1759 15.5139 17.3611C16.2639 17.5463 17.0185 17.6667 17.7778 17.7222V15.2778L15.1667 14.75L13.3056 16.6111Z" fill="#89CFF0"/>
</svg>`;
const svg2 = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 12H12V10H4V12ZM4 9H16V7H4V9ZM4 6H16V4H4V6ZM0 20V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H4L0 20ZM3.15 14H18V2H2V15.125L3.15 14Z" fill="#89CFF0"/>
</svg>`;

export default function SuperAdminUserList({ searchTerm })
{
  let isTab = useMediaQuery({ query: "(max-width: 768px)" });
  const [usersList, setUsersList] = useState([]);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [selectedDoctor, setselectedDoctor] = useState();
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const navigate = useNavigate();
  const [filteredUsers, setFilteredUsers] = useState([usersList]);
  const [selectedPatient, setSelectedPatient] = useState();

  const categories = [
    { name: "All", value: "1" },
    { name: "Cardiologist", value: "2" },
    { name: "Therapist", value: "3" },
    { name: "Pediatrician", value: "4" },
    { name: "Neurologist", value: "5" },
    { name: "Physiotherapist", value: "6" },
  ];

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
        const response = await fetch(
          `${baseUrl}/api/v1/superAdmin/list_users`,
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
        setUsersList(data?.data);
      } catch (error)
      {
        console.error("There was an error verifying the OTP:", error);
      }
    };
    fetchDoctorDetails();
  }, []);

  useEffect(() =>
  {
    if (usersList?.length > 0 && searchTerm)
    {
      const lowerCaseSearchTerm = searchTerm?.toLowerCase().trim();
      const matchedPatients = usersList?.filter((p) =>
        p?.contactNumber?.toLowerCase()?.includes(lowerCaseSearchTerm)
      );
      setFilteredUsers(matchedPatients);
    } else
    {
      // If searchTerm is empty, show all patients
      setFilteredUsers(usersList);
    }
  }, [usersList, searchTerm]);


  const findSelectedDoctor = async (patientId) =>
  {
    console.log("DOCTOR ID", patientId);
    // // Assuming doctorsList is an array of doctor objects and each doctor has an _id field.
    const patient = usersList?.find((doc) => doc._id === patientId);
    setSelectedPatient(patient); // This will return the doctor object if found, otherwise undefined
    onOpenModal();
  };

  console.log("FILTERED USERES", filteredUsers);
  const handleBookAppointment = (userId) =>
  {
    localStorage.setItem("userId", userId);
    navigate("/superadminusereditform");
  };

  const handleDeletePatient = async (userId) =>
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
        `${baseUrl}/api/v1/superAdmin/delete_user/${userId}`,
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
        setUsersList((prevPatientsList) =>
          prevPatientsList.filter((patient) => patient._id !== userId)
        );

        // Show toast message for successful deletion
        toast.success("User deleted successfully");
      } else
      {
        console.error("Failed to delete the doctor", data?.message);
      }
    } catch (error)
    {
      console.error("There was an error deleting the doctor:", error);
    }
  };
  console.log("USER LIST", usersList);
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
        <div className="flex flex-col bg-customRedp-2  items-center w-[100%] md:w-[100%]  mt-[2%]">
          <div className="flex flex-row w-[100%] justify-between">
            {selectedPatient?.userPic ? (
              <img
                src={selectedPatient?.userPic}
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
            className="ml-4 text-center mt-4"
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
            className="ml-4 text-center mt-4"
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
            className="ml-4 text-center mt-4"
            style={{
              fontSize: isTab ? "12px" : "20px",
              fontWeight: 400,
              lineHeight: "24px",
              fontFamily: "Lato, sans-serif",
              color: "#000000",
              marginBottom: "2%",
            }}
          >
            {selectedPatient?.contactNumber}
          </text>
          <text
            className="ml-4 text-center mt-2"
            style={{
              fontSize: isTab ? "14px" : "20px",
              fontWeight: 400,
              lineHeight: "28.8px",
              fontFamily: "Lato, sans-serif",
              color: "#000000",
            }}
          >
            {selectedPatient?.address?.houseNo +
              " " +
              selectedPatient?.address?.block +
              " " +
              selectedPatient?.address?.area +
              ", " +
              selectedPatient?.address?.district +
              ", " +
              selectedPatient?.address?.state +
              " " +
              selectedPatient?.address?.pinCode}
          </text>

          <div className="flex flex-row justify-center gap-8 w-[100%] mt-8">
          </div>
          <div className="flex flex-row justify-between gap-3 mt-10 w-[95%]">
            <span className="flex">
              <span
                className="mr-8"
                style={{ width: "8px", height: "20px" }}
                dangerouslySetInnerHTML={{ __html: svg1 }}
              ></span>
              <span
                style={{ width: "8px", height: "20px" }}
                dangerouslySetInnerHTML={{ __html: svg2 }}
              ></span>
            </span>
          </div>
        </div>
      </Modal>
      <div className="flex flex-col">
        {filteredUsers?.map((user) => (
          <div
            className="bg-white w-full p-4 sm:px-5 px-1 mb-5"
          >
            <div className="flex flex-row justify-start items-center">
              <div class="flex items-center gap-x-2" onClick={() => findSelectedDoctor(user._id)}>
                {user.userPic ? (
                  <img
                    class="object-cover sm:w-20 sm:h-20 w-10 h-10  rounded-full"
                    src={user.userPic}
                    alt={user.name}
                  />
                ) : (
                  <AccountCircleIcon
                    style={{ fontSize: "90px", color: "#B1DAED" }}
                  />
                )}
                <div>
                  <h1 class=" font-semibold text-gray-700 sm:text-lg text-sm capitalize">
                    {user.name}
                  </h1>
                  <p>
                    {user.age} yrs , {user.bodyWeight} kg
                  </p>
                  <p>
                    {user.address?.houseNo} , {user.address?.block},{" "}
                    {user.address?.area}, {user.address?.district},
                    {user.address?.state}, {user.address?.pinCode}
                  </p>
                </div>
              </div>
              <div class="flex flex-row ms-auto gap-1 sm:gap-4">
                <button
                  class="rounded-full px-6 sm:px-8 py-1 sm:py-2 text-white bg-[#89CFF0] text-xs sm:text-sm"
                  onClick={() => handleBookAppointment(user._id)}
                >
                  Edit
                </button>
                <Popconfirm
                  title="Delete the User"
                  description="Are you sure to delete this User?"
                  okText={<FaTrashAlt />}
                  cancelText="No"
                  okTextcolor="blue"
                  onConfirm={() => handleDeletePatient(user._id)}
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
