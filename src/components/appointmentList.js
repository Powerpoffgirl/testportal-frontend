import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Header from "./header";
import DoctorSidebar from "./doctorSidebar";
import { Modal } from 'react-responsive-modal';
import { useNavigate } from "react-router-dom";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { ImCancelCircle } from "react-icons/im";


export default function AppointmentList()
{
    let isTab = useMediaQuery({ query: "(max-width: 768px)" });
    const baseUrl = process.env.REACT_APP_BASE_URL
    const [patientsList, setPatientsList] = useState([])
    const [appointmentList, setAppointmentList] = useState([])
    const [selectedPatient, setSelectedPatient] = useState();
    const navigate = useNavigate()
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const onCloseModal = () =>
    {
        setModalOpen(false);
        setModalContent('');
    };
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
                const response = await fetch(`${baseUrl}/api/v1/doctor/get_patientsList`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': token // Replace with your actual token from the previous session
                    }
                });

                const data = await response.json();
                console.log("DATA from response", data)
                setPatientsList(data?.data)
            } catch (error)
            {
                console.error('There was an error verifying the OTP:', error);
            }
        }
        fetchPatientDetails()
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
                const response = await fetch(`${baseUrl}/api/v1/doctor/get_all_appointments`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': token // Replace with your actual token from the previous session
                    }
                });

                const data = await response.json();
                console.log("DATA from response", data)
                setAppointmentList(data?.data)
            } catch (error)
            {
                console.error('There was an error verifying the OTP:', error);
            }
        }
        fetchAppointmentDetails()
    }, [])

    const handleAppointmentStatus = async (patientId, status) =>
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
            const appointmentStatus = status === 'accept' ? "Confirm" : "Decline";
            const response = await fetch(`${baseUrl}/api/v1/doctor/accept_appointment/${patientId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token // Replace with your actual token from the previous session
                },
                body: JSON.stringify({ appointmentStatus })
            });

            const data = await response.json();
            console.log("DATA from response", data);
            if (data.status === 200)
            {
                setModalContent(status === 'accept' ? 'Accepted' : 'Declined');
                setModalOpen(true);
            }
        } catch (error)
        {
            console.error('There was an error:', error);
        }
    };


    const handleConsult = (appointmentId) =>
    {
        localStorage.setItem("appointmentId", appointmentId)
        navigate(`/patientdescription/${appointmentId}`)
    }

    console.log("PATIENT LISTS", patientsList)
    console.log("APPOINTMENT LIST", appointmentList)

    return (
        <>
            <Modal open={modalOpen} onClose={onCloseModal} styles={{
                modal: {
                    background: 'transparent', // Makes modal background transparent
                    boxShadow: 'none',        // Removes shadow or border effects
                    // Any other styles to override default modal styles
                }
            }} center>
                <div className="flex flex-col items-center w-[100%] md:w-[100%]" style={{ border: 'none', borderRadius: "5px", backgroundColor: '#08DA75' }}>
                    <text className="ml-4 text-center mt-4" style={{ marginBottom: -20, fontSize: "40px", fontWeight: 700, lineHeight: "28.8px", fontFamily: "Lato, sans-serif", color: '#FFFFFF', height: '100px', width: '370px', display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {modalContent} {selectedPatient}
                    </text>
                    <text className="ml-4 text-center" style={{ fontSize: "60px", fontWeight: 800, lineHeight: "24px", fontFamily: "Lato, sans-serif", color: '#FFFFFF', marginBottom: "7%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {modalContent === 'Accepted' ? <IoIosCheckmarkCircleOutline /> : <ImCancelCircle />}
                    </text>
                </div>
            </Modal>
            <div className="flex flex-col">
                {
                    appointmentList?.map((appointment) => (
                        <div
                            className="flex flex-row bg-white p-2 md:flex-row justify-between"
                            style={{ borderRadius: "5px", marginBottom: "10px" }}
                            key={appointment._id}
                        >
                            <span className="flex flex-row items-center">
                                <img
                                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100"
                                    alt="Avatar"
                                    style={{
                                        borderRadius: "50%",
                                        height: isTab ? "40px" : "81px",
                                        width: isTab ? "40px" : "81px",
                                    }}
                                ></img>

                                <text
                                    className="ml-4"
                                    style={{
                                        fontSize: isTab ? "16px" : "24px",
                                        fontWeight: 400,
                                        lineHeight: "28.8px",
                                        fontFamily: "Lato, sans-serif",
                                    }}
                                >
                                    {appointment?.patientId?.name}<br />
                                    <span style={{
                                        fontSize: isTab ? "12px" : "20px",
                                        fontWeight: 400,
                                        color: "#A4A4A4",
                                        display: "flex",
                                        gap: "20px"
                                    }}>
                                        <span >   {appointment?.appointmentDate?.date}
                                        </span>
                                        <span >
                                            {appointment?.appointmentDate?.time}</span>
                                    </span>

                                </text>
                                <text
                                    className="ml-4"
                                    style={{
                                        fontSize: isTab ? "16px" : "24px",
                                        fontWeight: 400,
                                        lineHeight: "28.8px",
                                        fontFamily: "Lato, sans-serif",
                                    }}
                                >

                                </text>
                            </span>
                            {
                                appointment.appointmentStatus === "Confirm" ? (
                                    <button style={{
                                        width: !isTab ? "111px" : "73px",
                                        height: "45px",
                                        borderRadius: "35px",
                                        backgroundColor: "white",
                                        border: "1px solid #08DA75",
                                        color: "#08DA75",
                                        fontWeight: 400,
                                        fontSize: isTab ? "11px" : "24px",
                                        lineHeight: "28.8px",
                                        fontFamily: "Lato, sans-serif",
                                    }}
                                        onClick={() => handleConsult(appointment._id)}
                                    >Consult</button>
                                ) : appointment.appointmentStatus === "Decline" ? (
                                    <span style={{
                                        color: "#EF5F5F",
                                        fontWeight: 400,
                                        // borderRadius: "35px",
                                        // border: "1px solid #EF5F5F",
                                        fontSize: isTab ? "11px" : "24px",
                                        lineHeight: "28.8px",
                                        fontFamily: "Lato, sans-serif",
                                    }}>Declined</span>
                                ) : (
                                    <span className="flex flex-row gap-2 items-center">
                                        <button
                                            style={{
                                                width: !isTab ? "111px" : "73px",
                                                height: "45px",
                                                borderRadius: "35px",
                                                backgroundColor: "#EF5F5F",
                                                color: "white",
                                                fontWeight: 400,
                                                fontSize: isTab ? "11px" : "24px",
                                                lineHeight: "28.8px",
                                                fontFamily: "Lato, sans-serif",
                                            }}
                                            onClick={() => handleAppointmentStatus(appointment?._id, 'decline')}
                                        >
                                            Decline
                                        </button>
                                        <button
                                            style={{
                                                width: !isTab ? "111px" : "73px",
                                                height: "45px",
                                                borderRadius: "35px",
                                                backgroundColor: "#08DA75",
                                                color: "white",
                                                fontWeight: 400,
                                                fontSize: isTab ? "11px" : "24px",
                                                lineHeight: "28.8px",
                                                fontFamily: "Lato, sans-serif",
                                            }}
                                            onClick={() => handleAppointmentStatus(appointment?._id, 'accept')}
                                        >
                                            Accept
                                        </button>
                                    </span>
                                )
                            }


                        </div>
                    ))
                }
            </div>
        </>
    );
}
