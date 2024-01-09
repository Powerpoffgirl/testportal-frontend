import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import Modal from "react-responsive-modal";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Popconfirm } from "antd";
import close_button from "../assets/close_button.svg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function AppointmentListUser({ searchTerm })
{
  let isTab = useMediaQuery({ query: "(max-width: 768px)" });
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [appointmentList, setAppointmentList] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const onCloseModal = () => setOpen(false);
  const onOpenModal = () => setOpen(true);
  const [patientsList, setPatientsList] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState();
  const [filteredAppointmentList, setFilteredAppointmentList] = useState([
    appointmentList,
  ]);

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
          `${baseUrl}/api/v1/user/get_all_appointments`,
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
        setAppointmentList(data?.data);
      } catch (error)
      {
        console.error("There was an error verifying the OTP:", error);
      }
    };
    fetchPatientDetails();
  }, []);

  useEffect(() =>
  {
    let matchedDoctors = [];

    if (appointmentList?.length > 0 && searchTerm)
    {
      const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();

      matchedDoctors = appointmentList.filter(
        (appointment) =>
          appointment?.patientId?.name
            .toLowerCase()
            .includes(lowerCaseSearchTerm) ||
          appointment?.doctorId?.name
            .toLowerCase()
            .includes(lowerCaseSearchTerm)
      );
    } else
    {
      matchedDoctors = appointmentList;
    }

    setFilteredAppointmentList(matchedDoctors);
  }, [appointmentList, searchTerm]); // Include all dependencies in the dependency array

  const handleEditAppointment = (appointmentId) =>
  {
    localStorage.setItem("appointmentId", appointmentId);
    navigate("/editappointment");
  };

  const handleDeleteAppointment = async (appointmentId) =>
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
        `${baseUrl}/api/v1/user/delete_appointmentById/${appointmentId}`,
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
        console.log("Appointment deleted successfully", data);
        toast.success("Appointment Deleted!");
        // toast.success("Appointment Deleted")
        // Update the list in the UI by removing the deleted doctor

        setAppointmentList((prevAppointmentList) =>
          prevAppointmentList.filter(
            (appointment) => appointment._id !== appointmentId
          )
        );
      } else
      {
        console.error("Failed to delete the doctor", data?.message);
      }
    } catch (error)
    {
      console.error("There was an error deleting the Appointment:", error);
    }
  };

  function formatDate(dateString)
  {
    const parts = dateString.split("-");
    return `${parts[2]}.${parts[1]}.${parts[0]}`;
  }
  console.log("APPOINTMENT LISTS", appointmentList, selectedAppointment);

  const findSelectedDoctor = async (appointmentId) =>
  {
    console.log("appointmentId########################", appointmentId);
    // Assuming doctorsList is an array of doctor objects and each doctor has an _id field.
    const appointment = appointmentList?.find(
      (appointment) => appointment._id === appointmentId
    );
    setSelectedAppointment(appointment); // This will return the doctor object if found, otherwise undefined
    onOpenModal();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        patient={selectedAppointment}
        styles={{
          modal: {
            // Set your custom width here (e.g., '70%')
            width: isTab ? "80%" : "50%",
            backgroundColor: "#E3F6FF",
            alignContent: "center",
            borderRadius: "23px",
          },
          closeButton: {
            display: "none",
          },
        }}
      >
        <div class="flex flex-row-reverse md:-mb-14  -mb-14 z-50">
          <button className="z-50" onClick={onCloseModal}>
            <img src={close_button} className="w-8 mb-1"></img>
          </button>
        </div>

        <div className="flex flex-col bg-customRedp-2  w-[100%] md:w-[100%]  mt-[1%]">
          <div className="flex flex-row w-[100%] justify-between">
            {selectedAppointment?.UserPic ? (
              <img
                src={selectedAppointment?.UserPic}
                alt="Avatar"
                style={{
                  borderRadius: "50%",
                  height: isTab ? "40px" : "123px",
                  width: isTab ? "40px" : "123px",
                  marginRight: "70px",
                  marginLeft: "20px",
                  boxShadow: "inset 0 0 0 2px #76767",
                }}
              />
            ) : (
              <AccountCircleIcon
                style={{
                  fontSize: "90px",
                  color: "#fff",
                  borderRadius: "50%",
                  height: isTab ? "40px" : "123px",
                  width: isTab ? "40px" : "123px",
                  marginRight: "75px",
                  marginLeft: "-10px",
                  boxShadow: "0px 0px 5px 2px rgba(0, 0, 0, 0.5)",
                }}
              />
            )}
          </div>
          <text
            className="ml-4 text-start mt-2"
            style={{
              fontSize: isTab ? "18px" : "30px",
              fontWeight: 500,
              lineHeight: "28.8px",
              fontFamily: "Lato, sans-serif",
            }}
          >
            {selectedAppointment?.patientId?.name
              ? selectedAppointment.patientId?.name
              : "No Name"}
          </text>
          <text
            className="ml-4 text-start mt-2"
            style={{
              fontSize: isTab ? "12px" : "22px",
              fontWeight: 400,
              lineHeight: "24px",
              fontFamily: "Lato, sans-serif",
              color: "#767676",
            }}
          >
            Age:{" "}
            {selectedAppointment?.patientId?.age
              ? selectedAppointment?.patientId?.age
              : "   "}{" "}
            yr, Weight :
            {selectedAppointment?.patientId?.bodyWeight
              ? selectedAppointment?.patientId?.bodyWeight
              : "    "}{" "}
            kg
          </text>
          <text
            className="ml-4 text-start mt-2"
            style={{
              fontSize: isTab ? "16px" : "22px",
              fontWeight: 400,
              lineHeight: "28.8px",
              fontFamily: "Lato, sans-serif",
              color: "#43BCF5",
            }}
          >
            Issues:{" "}
            {selectedAppointment?.issues
              ? selectedAppointment?.issues.join(", ")
              : "N/A"}
            <br />
            Diseases:{" "}
            {selectedAppointment?.diseases
              ? selectedAppointment?.diseases.join(", ")
              : "N/A"}
          </text>
          <text
            className="ml-4 text-start mt-2"
            style={{
              fontSize: isTab ? "14px" : "22px",
              fontWeight: 400,
              lineHeight: "28.8px",
              fontFamily: "Lato, sans-serif",
              color: "#2CBE78",
            }}
          >
            Appointment Date:{" "}
            {selectedAppointment?.appointmentDate?.date
              ? selectedAppointment?.appointmentDate?.date
              : "No Date"}
            <br />
            Appointment Time:{" "}
            {selectedAppointment?.appointmentDate?.time
              ? selectedAppointment?.appointmentDate?.time
              : "N/A"}
          </text>
          <text
            className="ml-4 text-start mt-2 text-purple-900"
            style={{
              fontSize: isTab ? "14px" : "22px",
              fontWeight: 400,
              lineHeight: "28.8px",
              fontFamily: "Lato, sans-serif",
              color: "#CB13CF",
            }}
          >
            {selectedAppointment?.patientId?.address?.houseNo
              ? selectedAppointment?.patientId?.address?.houseNo +
              " " +
              selectedAppointment?.patientId?.address?.block +
              " " +
              selectedAppointment?.patientId?.address?.area +
              ", " +
              selectedAppointment?.patientId?.address?.district +
              ", " +
              selectedAppointment?.patientId?.address?.state +
              " " +
              selectedAppointment?.patientId?.address?.pinCode
              : " "}
          </text>
        </div>
      </Modal>

      <div className="flex flex-col">
        {filteredAppointmentList?.length > 0 ? (
          filteredAppointmentList?.map((appointment) => (
            <div className="bg-white w-full p-4 sm:px-5 px-1 mb-5">
              <div className="flex flex-row justify-start items-center">
                <div
                  class="flex items-center gap-x-2"
                  onClick={() => findSelectedDoctor(appointment?._id)}
                >
                  {appointment?.doctorId?.doctorPic ? (
                    <img
                      class="object-cover sm:w-20 sm:h-20 w-10 h-10  rounded-full"
                      src={appointment?.doctorId?.doctorPic}
                      alt={appointment?.doctorId?.doctorPic.name}
                    />
                  ) : (
                    <AccountCircleIcon
                      style={{ fontSize: "90px", color: "#B1DAED" }}
                    />
                  )}
                  <div
                    class="flex flex-row bg-white p-2 md:flex-row justify-between"
                    style={{
                      borderRadius: "5px",
                      marginBottom: "10px",
                      position: "relative",
                    }}
                  >
                    <div className="flex flex-row items-center">
                      <div>
                        <h1 class="font-semibold text-gray-700 sm:text-lg text-sm capitalize">
                          <p class="text-gray-500 sm:text-sm text-xs">
                            Doctor's Name:<span className="ms-2"></span>
                          </p>

                          {appointment?.doctorId?.name}
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <h1
                      class="font-semibold text-gray-700 sm:text-lg text-sm capitalize"
                      style={{
                        marginLeft: isTab ? "2px" : "8px",
                        marginRight: isTab ? "4px" : "8px",
                      }}
                    >
                      <p class="text-gray-500 sm:text-sm text-xs">
                        Patient's Name:<span className="ms-2"></span>
                      </p>
                      {appointment?.patientId?.name
                        ? appointment?.patientId?.name
                        : "No Name"}
                    </h1>
                  </div>

                  <div style={{ textAlign: "center" }}>
                    <h1
                      class="font-semibold text-gray-700 sm:text-lg text-sm capitalize"
                      style={{
                        marginLeft: isTab ? "2px" : "8px",
                        marginRight: isTab ? "4px" : "8px",
                      }}
                    >
                      <p class="text-gray-500 sm:text-sm text-xs">
                        Date & Time:<span className="ms-2"></span>
                      </p>
                      {appointment?.appointmentDate?.date
                        ? appointment?.appointmentDate?.date
                          .split("-")
                          .reverse()
                          .join("-")
                        : "No Date"}
                      {/* <br />
                    {appointment?.appointmentDate?.time} */}
                    </h1>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      borderRadius: "5px",
                      marginBottom: "20px",
                      position: "relative",
                      left: "29px",
                      top: "12px",
                      gap: "1px",
                    }}
                  >
                    <h1
                      class="font-semibold text-gray-700 sm:text-lg text-sm capitalize "
                      style={{
                        marginLeft: isTab ? "-30px" : "8px",
                        marginRight: isTab ? "4px" : "8px",
                      }}
                    >
                      <p class="text-gray-500 sm:text-sm text-xs">
                        Appointment status:<span className="ms-2"></span>
                      </p>
                      {appointment?.appointmentStatus}
                    </h1>
                  </div>
                </div>
                <div
                  class="flex flex-row ms-auto gap-1 sm:gap-1"
                  style={{ flexDirection: "row" }}
                >
                  <Popconfirm
                    title="Delete the Appointment"
                    description="Are you sure to delete this Appointment?"
                    okText="Delete"
                    okType="danger"
                    cancelText="No"
                    className="rounded-full px-3 sm:px-6 py-1 sm:py-1 text-white bg-[#EF5F5F] text-xs sm:text-sm"
                    onConfirm={() => handleDeleteAppointment(appointment._id)}
                  >
                    <button
                      danger
                      class="rounded-full px-3 sm:px-6 py-1 sm:py-1 text-black bg-[#EF5F5F] text-xs sm:text-sm"
                      // onClick={() => handleDeleteAppointment(appointment._id)}
                      style={{
                        marginTop: isTab ? 90 : null,
                        paddingLeft: isTab ? 10 : null,
                        paddingRight: isTab ? 10 : null,
                        marginRight: 10,
                      }}
                    >
                      {isTab ? <FaTrashAlt /> : "Delete"}
                    </button>
                  </Popconfirm>
                  <button
                    class="rounded-full px-6 sm:px-8 py-1 sm:py-2 text-white bg-[#89CFF0] text-xs sm:text-sm"
                    onClick={() => handleEditAppointment(appointment._id)}
                    style={{
                      height: isTab ? 25 : null,
                      marginTop: isTab ? 90 : null,
                    }}
                  >
                    {isTab ? <FaEdit /> : "Edit"}
                  </button>
                </div>
              </div>
              <ToastContainer />
            </div>
          ))
        ) : (
          <p>
            Please book an appointment.{" "}
            <span
              style={{ textDecoration: "underline" }}
              onClick={() => navigate("/doctorlistuser")}
            >
              Click here.
            </span>
          </p>
        )}
      </div>
    </>
  );
}
