import React, { useEffect, useState } from "react";
import DoctorSidebar from "./doctorSidebar";
import Header from "./header";
import { useMediaQuery } from "react-responsive";
import { Modal } from "react-responsive-modal";
import AdminSidebar from "./adminSidebar";
import { useNavigate } from "react-router-dom";
import UserList from "./userList";
import { Button, Popconfirm } from 'antd';
import { FaTrashAlt } from "react-icons/fa";

export default function SuperAdminUserList()
{
  let isTab = useMediaQuery({ query: "(max-width: 768px)" });
  const [usersList, setUsersList] = useState([]);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [selectedDoctor, setselectedDoctor] = useState();
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const navigate = useNavigate();

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

  const handleBookAppointment = (userId) =>
  {
    localStorage.setItem("userId", userId);
    navigate("/superadminusereditform");
  };

  const handleDeleteUser = async (userId) =>
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
        `${baseUrl}/api/v1/admin/delete_user/${userId}`,
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
      {/* <Modal
          open={open}
          onClose={onCloseModal}
          center
          patient={selectedPatient}
          styles={{
            modal: {
              width: isTab ? "80%" : "70%",
              backgroundColor: "#08DA75",
              alignContent: "center",
            },
          }}
        >
          <div className="flex flex-col bg-customRedp-2  items-center w-[100%] md:w-[100%]  mt-[2%]">
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
                color: "#FFFFFF",
                marginBottom: "2%",
              }}
            >
              {selectedPatient?.age} yr, {selectedPatient?.bodyWeight} kg
            </text>

            <text
              className="ml-4 text-center mt-2"
              style={{
                fontSize: isTab ? "14px" : "20px",
                fontWeight: 400,
                lineHeight: "28.8px",
                fontFamily: "Lato, sans-serif",
                color: "#FFFFFF",
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
        </Modal> */}


      <div className="flex flex-col">
        {usersList?.map((user) => (
          <div
            className="bg-white w-full p-4 sm:px-5 px-1 mb-5"
          // onClick={() => findSelectedDoctor(patient._id)}
          >
            <div className="flex flex-row justify-start items-center">
              <div class="flex items-center gap-x-2">
                <img
                  class="object-cover sm:w-20 sm:h-20 w-10 h-10  rounded-full"
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100"
                  alt=""
                />

                <div>
                  <h1 class=" font-semibold text-gray-700 sm:text-lg text-sm capitalize">
                    {user.contactNumber}
                  </h1>
                  {/* <p>
                      {patient.age} yrs , {patient.bodyWeight} kg
                    </p>
                    <p>
                      {patient.address?.houseNo} , {patient.address?.block},{" "}
                      {patient.address?.area}, {patient.address?.district},
                      {patient.address?.state}, {patient.address?.pinCode}
                    </p> */}
                  {/* <p class="text-gray-500 sm:text-sm text-xs">Wednesday<span className="ms-2">15:00</span></p> */}
                </div>
              </div>
              <div class="flex flex-row ms-auto gap-1 sm:gap-4">
                <Popconfirm
                  title="Delete the Patient"
                  description="Are you sure to delete this Patient?"
                  okText={<FaTrashAlt />}
                  cancelText="No"
                  okTextcolor="blue"
                  // onConfirm={() => handleDeletePatient(patient._id)}
                  className="rounded-full px-4 sm:px-6 py-1 sm:py-2 text-white bg-[#EF5F5F] text-xs sm:text-sm"
                >
                  <button class="rounded-full px-4 sm:px-6 py-1 sm:py-2 text-white bg-[#EF5F5F] text-xs sm:text-sm">
                    Delete
                  </button>
                </Popconfirm>
                <button class="rounded-full px-6 sm:px-8 py-1 sm:py-2 text-white bg-[#08DA75] text-xs sm:text-sm" onClick={() => handleBookAppointment(user._id)}>Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
