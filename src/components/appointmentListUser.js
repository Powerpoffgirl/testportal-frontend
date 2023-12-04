import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Header from "./header";
import UserSidebar from "./userSidebar";
import { useNavigate } from "react-router-dom";

export default function AppointmentListUser() {
  let isTab = useMediaQuery({ query: "(max-width: 768px)" });
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [appointmentList, setAppointmentList] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const onCloseModal = () => setOpen(false);
  const onOpenModal = () => setOpen(true);
  const [patientsList, setPatientsList] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState();

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
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
      } catch (error) {
        console.error("There was an error verifying the OTP:", error);
      }
    };
    fetchPatientDetails();
  }, []);

  const handleBookAppointment = (appointmentId) => {
    localStorage.setItem("appointmentId", appointmentId);
    navigate("/editappointment");
  };

  const handleDeleteAppointment = async (appointmentId) => {
    localStorage.setItem("appointmentId", appointmentId);
    // try
    // {
    //     const token = localStorage.getItem("token");
    //     if (!token)
    //     {
    //         console.error("No token found in local storage");
    //         return;
    //     }
    //     const response = await fetch(`${baseUrl}/api/v1/user/get_all_appointments`, {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'x-auth-token': token // Replace with your actual token from the previous session
    //         }
    //     });

    //     const data = await response.json();
    //     console.log("DATA from response", data)
    //     setAppointmentList(data?.data)
    // } catch (error)
    // {
    //     console.error('There was an error verifying the OTP:', error);
    // }
  };

  function formatDate(dateString) {
    const parts = dateString.split("-");
    return `${parts[2]}.${parts[1]}.${parts[0]}`;
  }
  console.log("APPOINTMENT LISTS", appointmentList, selectedPatient);
  const findSelectedDoctor = async (patientId) => {
    // console.log("DOCTOR ID", patientId);
    // Assuming doctorsList is an array of doctor objects and each doctor has an _id field.
    // const patient = patientsList?.find((doc) => doc._id === patientId);
    // setSelectedPatient(patient); // This will return the doctor object if found, otherwise undefined
    onOpenModal();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        patient={selectedPatient}
        styles={{
          modal: {
            // Set your custom width here (e.g., '70%')
            width: isTab ? "80%" : "70%",
            backgroundColor: "#08DA75",
            alignContent: "center",
          },
        }}
      >
        <div className="flex flex-col bg-customRedp-2  items-center w-[100%] md:w-[100%]  mt-[2%]">
          <div className="flex flex-row w-[100%] justify-between">
            <span className="flex flex-col justify-start">
              <text
                style={{
                  fontWeight: 400,
                  fontSize: !isTab ? "20px" : "16px",
                  fontFamily: "Lato, sans-serif",
                  color: "white",
                }}
              >
                {/* {selectedDoctor?.workingDays?.map((day) => (
                                    <span key={day}>{day.slice(0, 3)} </span>
                                ))} */}
              </text>
              <text
                style={{
                  fontWeight: 400,
                  fontSize: !isTab ? "20px" : "16px",
                  fontFamily: "Lato, sans-serif",
                  color: "white",
                }}
              >
                {/* {selectedDoctor?.workingHours?.workHourFrom} */}
                :00 To
                {/* {selectedDoctor?.workingHours?.workHourTo} */}
                :00
              </text>
            </span>

            <img
              src="data:image/png;base64,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"
              alt="Avatar"
              style={{
                borderRadius: "50%",
                height: isTab ? "40px" : "123px",
                width: isTab ? "40px" : "123px",
              }}
            ></img>

            <span className="flex flex-col justify-start">
              <text style={{ color: "#08DA75" }}>Mon-Fri</text>
              <text style={{ color: "#08DA75" }}>10:00am-6:00pm</text>
            </span>
          </div>
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
              fontSize: isTab ? "16px" : "24px",
              fontWeight: 400,
              lineHeight: "28.8px",
              fontFamily: "Lato, sans-serif",
              color: "white",
            }}
          ></text>
          <text
            className="ml-4 text-center mt-2"
            style={{
              fontSize: isTab ? "14px" : "22px",
              fontWeight: 400,
              lineHeight: "28.8px",
              fontFamily: "Lato, sans-serif",
              color: "white",
            }}
          >
            {/* {selectedDoctor?.totalExperience */}
            {/* } Years Experience */}
          </text>
          <text
            className="ml-4 text-center mt-2"
            style={{
              fontSize: isTab ? "14px" : "20px",
              fontWeight: 400,
              lineHeight: "28.8px",
              fontFamily: "Lato, sans-serif",
              color: "white",
            }}
          >
            {/* {selectedDoctor?.degree} */}
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

          <div className="flex flex-row justify-center gap-8 w-[100%] mt-8">
            <span
              style={{
                width: "25px",
                height: "25px",
              }}
              // onClick={() => handleEditDoctor(selectedDoctor?._id)}
              dangerouslySetInnerHTML={{ __html: svg4 }}
            ></span>
            <span
              style={{
                width: "25px",
                height: "25px",
              }}
              // onClick={() => handleDeleteDoctor(selectedDoctor?._id)}
              dangerouslySetInnerHTML={{ __html: svg5 }}
            ></span>
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

            {/* <span className="flex">
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
                                        color: "white",
                                    }}
                                >
                                    (4.5 Ratings)
                                </text>
                            </span> */}
          </div>
        </div>
      </Modal>

      <div className="flex flex-col">
        {appointmentList?.map((appointment) => (
          <div className="bg-white w-full p-4 sm:px-5 px-1 mb-5">
            <div className="flex flex-row justify-start items-center">
              <div class="flex items-center gap-x-2">
                <img
                  class="object-cover sm:w-20 sm:h-20 w-10 h-10  rounded-full"
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100"
                  alt=""
                />

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
                    style={{ marginLeft: "8px", marginRight: "8px" }}
                  >
                    <p class="text-gray-500 sm:text-sm text-xs">
                      Patient's Name:<span className="ms-2"></span>
                    </p>
                    {appointment?.patientId?.name}
                  </h1>
                </div>

                <div style={{ textAlign: "center" }}>
                  <h1
                    class="font-semibold text-gray-700 sm:text-lg text-sm capitalize"
                    style={{ marginLeft: "8px", marginRight: "8px" }}
                  >
                    <p class="text-gray-500 sm:text-sm text-xs">
                      Date & Time:<span className="ms-2"></span>
                    </p>
                    {appointment?.appointmentDate?.date}
                    <br />
                    {appointment?.appointmentDate?.time}
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
                  }}
                >
                  <h1
                    class="font-semibold text-gray-700 sm:text-lg text-sm capitalize"
                    style={{ marginLeft: "8px", marginRight: "8px" }}
                  >
                    <p class="text-gray-500 sm:text-sm text-xs">
                      Appointment status:<span className="ms-2"></span>
                    </p>
                    {appointment?.appointmentStatus}
                  </h1>
                </div>
              </div>
              <div class="flex flex-row ms-auto gap-1 sm:gap-4">
                <button
                  class="rounded-full px-4 sm:px-6 py-1 sm:py-2 text-white bg-[#EF5F5F] text-xs sm:text-sm"
                  //   onClick={() => handleDeletePatient(patient._id)}
                >
                  Delete
                </button>
                <button
                  class="rounded-full px-6 sm:px-8 py-1 sm:py-2 text-white bg-[#08DA75] text-xs sm:text-sm"
                  //   onClick={() => handleBookAppointment(patient._id)}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
