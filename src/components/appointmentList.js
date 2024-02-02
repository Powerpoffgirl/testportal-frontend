import React, { useEffect, useState, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import Header from "./header";
import DoctorSidebar from "./doctorSidebar";
import { Modal } from "react-responsive-modal";
import { useNavigate } from "react-router-dom";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { ImCancelCircle } from "react-icons/im";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { Button, Popconfirm } from "antd";
import UserContext from "./userContext";
import close_button from "../assets/close_button.svg";

export default function AppointmentList({ searchTerm })
{
  const { updateUser, updateUserEmail, updateUserimage } =
    useContext(UserContext);
  let isTab = useMediaQuery({ query: "(max-width: 767px)" });
  let isTab1 = useMediaQuery({ query: "(max-width: 768px)" });
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [patientsList, setPatientsList] = useState([]);
  const [appointmentList, setAppointmentList] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState();
  const [selectedPatient, setSelectedPatient] = useState();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openl, setOpenl] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onOpenModall = () => setOpenl(true);
  const onCloseModall = () =>
  {
    console.log("clicked");
    setOpenl(false);
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [diseasesinfo, setDiseasesinfo] = useState("");
  const [Issuesinfo, setIssuessinfo] = useState("");
  const [Medicineinfo, setMedicineinfo] = useState("");
  const [userDetailsName, setUserDetailsName] = useState();
  const [userDetailsEmail, setUserDetailsEmail] = useState();
  const [userDetailsPic, setUserDetailsPic] = useState();

  const [filteredAppointmentList, setFilteredAppointmentList] = useState([
    appointmentList,
  ]);

  const onCloseModal = () =>
  {
    console.log("close tapped");
    setModalOpen(false);
    setModalContent("");
  };
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
      } catch (error)
      {
        console.error("There was an error verifying the OTP:", error);
      }
    };
    fetchUserDetails();
  }, []);
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
        setPatientsList(data?.data);
      } catch (error)
      {
        console.error("There was an error verifying the OTP:", error);
      }
    };
    fetchPatientDetails();
    const fetchAppointmentDetails = async () =>
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
        if (data.message === "Invalid or expired token")
        {
          toast.error("Invalid or expired token")
          navigate("/doctorlogin")
          localStorage.clear()
        }
        const filteredAppointmentList = data?.data.filter(
          (appointment) => appointment.patientId !== null
        );

        setAppointmentList(filteredAppointmentList);
      } catch (error)
      {
        console.error("There was an error verifying the OTP:", error);
      }
    };
    fetchAppointmentDetails();
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
            .includes(lowerCaseSearchTerm) ||
          appointment?.appointmentDate?.date
            .toLowerCase()
            .includes(lowerCaseSearchTerm) ||
          appointment?.appointmentDate?.time
            .toLowerCase()
            .includes(lowerCaseSearchTerm) ||
          appointment?.appointmentStatus
            .toLowerCase()
            .includes(lowerCaseSearchTerm)
      );
    } else
    {
      matchedDoctors = appointmentList;
    }

    setFilteredAppointmentList(matchedDoctors);
  }, [appointmentList, searchTerm]); // Include all dependencies in the dependency array

  const handleAppointmentStatus = async (patientId, date, time, status) =>
  {
    try
    {
      const token = localStorage.getItem("token");
      if (!token)
      {
        console.error("No token found in local storage");
        return;
      }
      // Use the 'status' parameter to set the appointment status
      const appointmentStatus = status === "accept" ? "Confirm" : "Decline";
      const response = await fetch(
        `${baseUrl}/api/v1/doctor/accept_appointment/${patientId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token, // Replace with your actual token from the previous session
          },
          body: JSON.stringify({ appointmentStatus }),
        }
      );

      const data = await response.json();
      console.log("DATA from response", data);
      if (data.status === 200)
      {
        // setModalContent(status === "accept" ? "Accepted" : "Declined");
        // setModalOpen(true);
        window.location.reload();
      }

      const doctorId = localStorage.getItem("DoctorId");

      if (status === "Decline")
      {
        const details = {
          date: date,
          time: time,
        };

        const response = await fetch(
          `${baseUrl}/api/v1/cancel_slot/${doctorId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token, // Use the stored token
            },
            body: JSON.stringify(details),
          }
        );

        const data = await response.json();

        if (response.ok)
        {
          console.log("Appointment slot deleted successfully", data);
          toast.success("Appointment Slot Deleted!");
        }
      }
    } catch (error)
    {
      console.error("There was an error:", error);
    }
  };

  const findSelectedDoctor = async (appointmentId) =>
  {
    console.log("appointmentId########################", appointmentId);
    // Assuming doctorsList is an array of doctor objects and each doctor has an _id field.
    const appointment = appointmentList?.find(
      (appointment) => appointment?._id === appointmentId
    );
    setSelectedAppointment(appointment); // This will return the doctor object if found, otherwise undefined
    onOpenModall();
    setDiseasesinfo(appointment?.diseases?.join(", "));
    console.log("disease array ======", diseasesinfo);
    setIssuessinfo(appointment?.issues?.join(", "));
    setMedicineinfo(appointment?.medicineName?.join(", "));
  };

  const handleConsult = (appointment) =>
  {
    const appointmentId = appointment._id;

    console.log("========appointment=========", appointment);
    localStorage.setItem("appointmentId", appointmentId);
    localStorage.setItem("patientId", appointment?.patientId._id);
    navigate(`/patientdescription/${appointmentId}`, { state: { appointment: appointment } });

  };

  console.log("PATIENT LISTS", patientsList);
  console.log("APPOINTMENT LIST", appointmentList);

  updateUser(userDetailsName);
  updateUserEmail(userDetailsEmail);
  updateUserimage(userDetailsPic);

  console.log("selectedAppointment", selectedAppointment?.doctorId?.doctorPic);

  return (
    <>
      {/* appointment accepted */}
      <Modal
        open={modalOpen}
        onClose={onCloseModal}
        styles={{
          modal: {
            background: "transparent", // Makes modal background transparent
            boxShadow: "none", // Removes shadow or border effects
            backgroundColor: "#E3F6FF",
            alignContent: "center",
            borderRadius: "23px",
          },
          closeButton: {
            display: "none",
          },
        }}
        center
      >
        <div class="flex flex-row-reverse md:-mb-14  -mb-18 z-50">
          <button onClick={onCloseModal}>
            <img src={close_button} alt="close button" class="w-8 mb-5"></img>
          </button>

          {/* <button><img src={delete_button} class="w-8"></img></button>
            <button><img src={edit_button} class="w-8"></img></button> */}
        </div>
        <div
          className="flex flex-col items-center w-[100%] md:w-[100%]"
          style={{
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#89CFF0",
          }}
        >
          <text
            className="ml-4 text-center mt-4"
            style={{
              marginBottom: -20,
              fontSize: "40px",
              fontWeight: 700,
              lineHeight: "28.8px",
              fontFamily: "Lato, sans-serif",
              color: "#FFFFFF",
              height: "100px",
              width: "370px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {modalContent} {selectedPatient}
          </text>
          <text
            className="ml-4 text-center"
            style={{
              fontSize: "60px",
              fontWeight: 800,
              lineHeight: "24px",
              fontFamily: "Lato, sans-serif",
              color: "#FFFFFF",
              marginBottom: "7%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {modalContent === "Accepted" ? (
              <IoIosCheckmarkCircleOutline />
            ) : (
              <ImCancelCircle />
            )}
          </text>
        </div>
      </Modal>

      {/* appointment details */}
      <Modal
        open={openl}
        onClose={onCloseModall}
        center
        patient={selectedAppointment}
        styles={{
          modal: {
            width: isTab ? "80%" : "70%",
            alignContent: "center",
            borderRadius: "23px",
            backgroundColor: "#E3F6FF",
          },
          closeButton: {
            display: "none",
          },
        }}
      >
        <div class="flex flex-row-reverse    z-50   hover:cursor-pointer">
          <button onClick={onCloseModall}>
            <img src={close_button} alt="close button" class="w-8 "></img>
          </button>
        </div>

        <div className="flex flex-col bg-customRedp-2 w-[100%] md:w-[100%]  mt-[2%]">
          <div className="flex flex-row w-[100%] justify-center ">
            <div className="flex flex-row w-[100%] justify-between">
              {selectedAppointment?.patientId?.patientPic ? (
                <img
                  src={selectedAppointment?.patientId?.patientPic}
                  alt={selectedAppointment?.patientId?.name}
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
          </div>
          <text
            className=" text-center mt-4 capitalize"
            style={{
              fontSize: isTab ? "18px" : "26px",
              fontWeight: 600,
              lineHeight: "28.8px",
              fontFamily: "Lato, sans-serif",
              marginLeft: -70,
            }}
          >
            {selectedAppointment?.patientId?.name}
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
            Age: {selectedAppointment?.patientId?.age} yrs, Weight:{" "}
            {selectedAppointment?.patientId?.bodyWeight} kg
          </text>

          <text
            className="ml-4 text-start mt-2"
            style={{
              fontSize: isTab ? "14px" : "20px",
              fontWeight: 400,
              lineHeight: "28.8px",
              fontFamily: "Lato, sans-serif",
              color: "#000000",
            }}
          >
            Address:{" "}
            {selectedAppointment?.patientId?.address?.houseNo +
              " " +
              selectedAppointment?.patientId?.address?.block +
              " " +
              selectedAppointment?.patientId?.address?.area +
              ", " +
              selectedAppointment?.patientId?.address?.district +
              ", " +
              selectedAppointment?.patientId?.address?.state +
              " " +
              selectedAppointment?.patientId?.address?.pinCode}
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
            {/* {appointment?.diseases} yrs, {appointment?.issues} kg */}
            Diseases: {diseasesinfo}
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
            {/* {appointment?.diseases} yrs, {appointment?.issues} kg */}
            Issues: {Issuesinfo}
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
            {/* {appointment?.diseases} yrs, {appointment?.issues} kg */}
            Medicine info: {Medicineinfo}
          </text>
        </div>
      </Modal>

      <div className="flex flex-col">
        {filteredAppointmentList?.map((appointment) => (
          <div className="bg-white w-full p-4 sm:px-5 px-1 mb-5">
            <div className="flex flex-col xl:flex-row justify-start items-center">
              <div
                class="flex items-center gap-x-2 mr-auto "
                onClick={() => findSelectedDoctor(appointment?._id)}
              >
                {appointment?.patientId?.patientPic ? (
                  <img
                    class="object-cover sm:w-20 sm:h-20 w-10 h-10  rounded-full"
                    src={appointment?.patientId?.patientPic}
                    alt={appointment?.patientId?.name}
                  />
                ) : (
                  <AccountCircleIcon
                    style={{
                      fontSize: isTab ? "50px" : "90px",
                      color: "#B1DAED",
                    }}
                  />
                )}

                <div class="flex lg:flex-row flex-col">
                  <div class="flex flex-row ">
                    <div
                      class="flex flex-row bg-white p-2 md:flex-row justify-between "
                      style={{
                        borderRadius: "5px",
                        // marginBottom: "10px",
                        position: "relative",
                      }}
                    >
                      <div className="flex flex-row items-center">
                        <div>
                          <h1 class="font-semibold ml-2 text-gray-700 sm:text-lg text-sm capitalize">
                            {appointment?.patientId?.name}
                          </h1>
                          <h1 class="font-semibold text-gray-500 sm:text-sm text-xs capitalize">
                            <span className="ms-2">
                              {" "}
                              {appointment?.patientId?.address?.district},{" "}
                              {appointment?.patientId?.address?.pinCode},{" "}
                              {appointment?.patientId?.address?.state}
                            </span>
                          </h1>
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        textAlign: "center",
                        display: isTab1 ? "none" : "",
                      }}
                      class={`lg:mt-2 mt-2 `}
                    >
                      <h1
                        class="font-semibold text-gray-700 sm:text-lg text-sm capitalize"
                        style={{
                          marginLeft: isTab ? "2px" : "8px",
                          marginRight: isTab ? "4px" : "8px",
                        }}
                      >
                        <p class={`text-gray-500 sm:text-sm text-xs `}>
                          Issues:<span className={`ms-2 `}></span>
                        </p>
                        {appointment?.issues?.[0]}
                      </h1>
                    </div>
                  </div>

                  <div class="flex flex-row ml-4">
                    <div style={{ textAlign: "" }} class=" mt-2 mr-2">
                      <div
                        class="font-semibold text-gray-700 sm:text-lg text-sm capitalize "
                        style={
                          {
                            // marginLeft: isTab ? "2px" : "8px",
                            // marginRight: isTab ? "4px" : "8px",
                          }
                        }
                      >
                        <p class="text-gray-500 sm:text-sm text-xs">
                          Date & Time:<span className="ms-2"></span>
                        </p>
                        {appointment?.appointmentDate?.date}
                        <span style={{ marginRight: "10px" }}></span>
                        {appointment?.appointmentDate?.time}
                      </div>
                    </div>
                    <div style={{ display: isTab1 ? "none" : "" }} class="mt-2">
                      <h1
                        class="font-semibold text-gray-700 sm:text-lg text-sm capitalize"
                        style={{
                          marginLeft: isTab ? "2px" : "8px",
                          marginRight: isTab ? "4px" : "8px",
                        }}
                      >
                        <p class="text-gray-500 sm:text-sm text-xs">
                          Diseases:<span className="ms-2"></span>
                        </p>
                        {appointment?.diseases?.[0]}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="flex flex-row ms-auto gap-1 sm:gap-1 ml-auto mt-2"
                style={{ flexDirection: "row" }}
              >
                {appointment.appointmentStatus === "Confirm" ? (
                  appointment.medicineName.length === 0 ? (
                    <button
                      className="rounded-full px-4 sm:px-6 py-1 sm:py-2 text-[#89CFF0] border border-[#89CFF0] text-xs sm:text-sm"
                      onClick={() => handleConsult(appointment)}
                    >
                      Consult
                    </button>
                  ) : (
                    <button
                      className="rounded-full px-4 sm:px-6 py-1 sm:py-2 text-[#89CFF0] border border-[#89CFF0] text-xs sm:text-sm"
                      onClick={() => handleConsult(appointment)}
                    >
                      Consulted
                    </button>
                  )
                ) : appointment.appointmentStatus === "Decline" ? (
                  <span className="rounded-full px-4 sm:px-6 py-1 sm:py-2 text-[#EF5F5F] text-xs sm:text-sm">
                    Declined
                  </span>
                ) : (
                  <span className="flex flex-row gap-2 items-center">
                    <button
                      className="rounded-full px-4 sm:px-6 py-1 sm:py-2 text-white bg-[#EF5F5F] text-xs sm:text-sm"
                      onClick={() =>
                        handleAppointmentStatus(
                          appointment?._id,
                          appointment?.appointmentDate?.date,
                          appointment?.appointmentDate?.time,
                          "decline"
                        )
                      }
                    >
                      Decline
                    </button>
                    <button
                      className="rounded-full px-4 sm:px-6 py-1 sm:py-2 text-white bg-[#89CFF0] text-xs sm:text-sm"
                      onClick={() =>
                        handleAppointmentStatus(
                          appointment?._id,
                          appointment?.appointmentDate?.date,
                          appointment?.appointmentDate?.time,
                          "accept"
                        )
                      }
                    >
                      Accept
                    </button>
                  </span>
                )}
              </div>
            </div>
            <ToastContainer />
          </div>
        ))}
      </div>
    </>
  );
}
