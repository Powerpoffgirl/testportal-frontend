import React, { useState, useEffect, useContext, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Flex, Row, Select } from "antd";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
// import Modal from "react-responsive-modal";
import UserContext from "./userContext";
import { ToastContainer, toast } from "react-toastify";
import "./Table.css";
import { Table } from "./table";
import { Modal } from "./tableModal";
import { useReactToPrint } from "react-to-print";
import './printStyles.css'
import { MdDownloadForOffline } from "react-icons/md";
import { BsFillSendFill } from "react-icons/bs";
import { FaCircleChevronLeft } from "react-icons/fa6";

export default function DescriptionSummary()
{
    const componentPDF = useRef();
    const { updateUser, updateUserEmail, updateUserimage } =
        useContext(UserContext);
    let isTab = useMediaQuery({ query: "(max-width: 768px)" });
    let isTab1 = useMediaQuery({ query: "(max-width: 425px)" });
    let isLg = useMediaQuery({ query: "(max-width: 1023px)" });
    const navigate = useNavigate();
    const location = useLocation()
    console.log("LOCATION", location.state)
    const appointment = location.state.appointment
    const fileInputRef = useRef(null);
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [rowNumber, setRowNumber] = useState();
    const [userDetailsName, setUserDetailsName] = useState();
    const [userDetailsEmail, setUserDetailsEmail] = useState();
    const [userDetailsPic, setUserDetailsPic] = useState();
    const [outRange, setOutRange] = useState(false);
    const [patientsHistory, setPatientsHistory] = useState(null);
    const [patient, setPatient] = useState({});

    const handleFileSelect1 = async (event) =>
    {
        const file = event.target.files[0];
        if (file)
        {
            const token = localStorage.getItem("token");
            const patientId = localStorage.getItem("patientId");
            const doctorId = localStorage.getItem("doctorId");
            const formData = new FormData();
            formData.append("patientReport", file);

            console.log("FORM DATA", formData);
            try
            {
                const response = await fetch(`${baseUrl}/api/v1/doctor/upload_patient_report/${patientId}`, {
                    method: "POST",
                    headers: {
                        "x-auth-token": token,
                    },
                    body: formData,
                });

                if (!response.ok)
                {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                fileInputRef.current.value = "";
            } catch (error)
            {
                console.error("Error ", error);
                toast.error("Error uploading pdf. Please try again.");
            }
        }
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
                const patientId = localStorage.getItem("patientId");
                const response = await fetch(
                    `${baseUrl}/api/v1/doctor/get_patientHistoryById/${patientId}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "x-auth-token": token, // Replace with your actual token from the previous session
                        },
                    }
                );

                const data = await response.json();

                console.log("DATA from response", data.data);
                setPatientsHistory(data?.data);
                setPatient(data?.data[0]);

            } catch (error)
            {
                console.error("There was an error verifying the OTP:", error);
            }
        };
        fetchPatientDetails();
    }, []);

    const generatePdf = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "userReport",
        // onAfterPrint: () => alert("Data saved in PDF")
    });

    const [modalOpen, setModalOpen] = useState(false);
    const [rows, setRows] = useState([

    ]);
    const [rowToEdit, setRowToEdit] = useState(null);


    useEffect(() =>
    {
        const fetchTestDetails = async () =>
        {
            try
            {
                const token = localStorage.getItem("token");
                const patientId = localStorage.getItem("selectedPatientId");

                if (!token)
                {
                    console.error("No token found in local storage");
                    return;
                }

                const response = await fetch(
                    `${baseUrl}/api/v1/doctor/getall_testBookingByPatientId/${patientId}`,
                    {
                        method: "get",
                        headers: {
                            "Content-Type": "application/json",
                            "x-auth-token": token,
                        },
                    }
                );

                const responseData = await response.json();
                console.log("DATA from response", responseData);

                setRows(responseData.data || []);
            } catch (error)
            {
                console.error("There was an error fetching test details:", error);
            }
        };

        fetchTestDetails();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    updateUser(userDetailsName);
    updateUserEmail(userDetailsEmail);
    updateUserimage(userDetailsPic);

    return (
        <>
            <div style={{ margin: 0, minHeight: "100vh", width: "100%" }} class="md:max-w-[440px] lg:max-w-2xl xl:max-w-full 2xl:max-w-full">
                <div className="MainContainer" style={{ width: "100%" }}>
                    <div
                        className="Right_side"
                        style={{
                            boxSizing: "border-box",
                            width: "100%",
                            height: "99vh",
                            float: "left",
                            backgroundColor: "white",
                            padding: "20px",
                            borderRadius: 20,
                        }}
                    >
                        <div class=""
                            ref={componentPDF}
                            style={{ marginLeft: "5%", marginRight: "5%" }}
                        >
                            <div class="mb-3  text-3xl"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: 600,
                                    marginTop: "10px",
                                    // fontSize: "xx-large",
                                }}
                            >
                                Patient Medical Report
                            </div>
                            <div class=" flex flex-row justify-content-between "
                                style={{
                                    // display: "flex",
                                    // flexDirection: "row",
                                    marginBottom: "20px",
                                }}
                            >
                                <div class="   flex flex-col "
                                    style={{
                                        // flex: "1",
                                        // display: "flex",
                                        // flexDirection: "column",
                                        // marginRight: "20px",
                                    }}
                                >
                                    <div class="">

                                        <p style={{ fontWeight: 500 }}>Appointmment Details</p>
                                        <div class="flex flex-col ">
                                            <div class="flex flex-row space-x-2">
                                                <p>{appointment?.appointmentDate?.date.split('-').reverse().join('/')}</p>
                                                <p> {appointment?.appointmentDate?.time} </p>
                                            </div>
                                            <div class="">
                                                <p class="capitalize">Dr. {appointment?.doctorId?.name}</p>
                                            </div>
                                            <div class="">
                                                <p class="flex flex-wrap space-x-1 w-64" >
                                                    <p>
                                                        {appointment?.doctorId?.address?.houseNo}
                                                    </p>
                                                    <p>
                                                        {appointment?.doctorId?.address?.floor}
                                                    </p>
                                                    <p>
                                                        {appointment?.doctorId?.address?.block}
                                                    </p>
                                                    <p>
                                                        {appointment?.doctorId?.address?.area}
                                                    </p>
                                                    <p>
                                                        {appointment?.doctorId?.address?.district}
                                                    </p>
                                                    <p>
                                                        {appointment?.doctorId?.address?.state}
                                                    </p>
                                                    <p>
                                                        {appointment?.doctorId?.address?.pinCode}
                                                    </p>

                                                </p>
                                            </div>
                                        </div>




                                    </div>
                                </div>

                                <div class=" address flex flex-col"
                                    style={{
                                        flex: "1",
                                        display: isLg ? "none" : "",
                                    }}
                                >
                                    <div class="ml-auto ">
                                        <p style={{ fontWeight: 500 }}>Patient Details</p>
                                        <div class="flex flex-wrap space-x-1">
                                            <p>{patient?.patientId?.name}, </p>
                                            <p>{patient?.patientId?.age} yr,</p>
                                            <p>{patient?.patientId?.bodyWeight} kg</p>
                                        </div>
                                        <p>
                                            {patient?.patientId?.address?.houseNo},{" "}
                                            {patient?.patientId?.address?.block},{" "}
                                            {patient?.patientId?.address?.area},
                                        </p>
                                        <p>
                                            {" "}
                                            {patient?.patientId?.address?.district},
                                            {" "}
                                            {patient?.patientId?.address?.state},
                                            {" "}
                                            {patient?.patientId?.address?.pinCode}

                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class=" flex flex-col ">

                                <div className="overflow-y-auto h-72  printContainer overflow-x-auto xl:max-w-5xl 2xl:max-w-7xl lg:max-w-xl  md:max-w-full max-w-screen-xysview mx-auto">
                                    <table className=" divide-y divide-gray-200 border border-[#89CFF0]">
                                        <thead className="bg-[#89CFF0]">
                                            <tr>
                                                {/* <th className="px-2 py-3 text-left text-base font-medium text-white uppercase tracking-wider">Dr. Name</th> */}
                                                {/* <th className="px-2 py-3 text-left text-base font-medium text-white uppercase tracking-wider">Date</th>
                                                <th className="px-2 py-3 text-left text-base font-medium text-white uppercase tracking-wider">Time</th> */}
                                                <th className="px-2 py-3 text-left text-base font-medium text-white uppercase tracking-wider">Issues</th>
                                                <th className="px-2 py-3 text-left text-base font-medium text-white uppercase tracking-wider">Disease</th>
                                                <th className="px-2 py-3 text-left text-base font-medium text-white uppercase tracking-wider">Medicine Name</th>
                                                <th className="px-2 py-3 text-left text-base font-medium text-white uppercase tracking-wider">Lab Test</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {/* <td className="w-[300px] px-2 whitespace-normal text-sm text-black break-words">{appointment?.doctorId?.name}</td> */}
                                            {/* <td className="w-[300px] px-2 whitespace-normal text-sm text-black break-words">{appointment?.appointmentDate?.date}</td>
                                            <td className="w-[300px] px-2 whitespace-normal text-sm text-black break-words">{appointment?.appointmentDate?.time}</td> */}
                                            <td className="w-[300px] px-2 py-4 whitespace-normal text-sm text-black break-words">{appointment?.issues.join(", ")}</td>
                                            <td className="w-[300px] px-2 py-4 whitespace-normal text-sm text-black break-words">{appointment?.diseases.join(", ")}</td>
                                            <td className="w-[300px] px-2 py-4 whitespace-normal text-sm text-black break-words">{appointment?.medicineName.join(", ")}</td>
                                            <td className="w-[300px] px-2 py-4 whitespace-normal text-sm text-black break-words">{appointment?.labTests?.join(", ")}</td>
                                        </tbody>
                                    </table>
                                </div>




                            </div>
                        </div>
                        <div
                            class=" justify-content-center flex flex-col sm:flex-row"
                            style={{
                                gap: "10px",
                                alignItems: "center",
                                justifyContent: "center",
                                marginTop: "20px",
                            }}
                        >
                            <button
                                onClick={() => navigate(`/patientdescription/${appointment?._id}`, { state: { appointment: appointment } })}
                            >
                                <FaCircleChevronLeft
                                    style={{
                                        color: "white",
                                        backgroundColor: "#89CFF0",
                                        borderRadius: "15px",
                                        fontSize: "40px",
                                        padding: "5px 10px 5px 10px ",
                                    }}
                                />
                            </button>
                            <button>
                                <BsFillSendFill
                                    style={{
                                        color: "white",
                                        backgroundColor: "#89CFF0",
                                        borderRadius: "15px",
                                        fontSize: "40px",
                                        padding: "5px 10px 5px 10px ",
                                    }}
                                /> </button>
                            <button
                                onClick={generatePdf}
                            >
                                <MdDownloadForOffline
                                    style={{
                                        color: "white",
                                        backgroundColor: "#89CFF0",
                                        borderRadius: "15px",
                                        fontSize: "40px",
                                        padding: "5px 10px 5px 10px ",
                                    }}
                                />
                            </button>

                            <p className="block text-black text-lg font-semibold">
                                <input
                                    id="files"
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                    accept="application/pdf"
                                    onChange={handleFileSelect1}
                                />
                            </p>
                        </div>

                    </div>
                </div>
            </div >
        </>
    );
}
