import React, { useState, useEffect, useContext, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { Navigate, useNavigate } from "react-router-dom";
import { Flex, Row, Select } from "antd";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
// import Modal from "react-responsive-modal";
import UserContext from "./userContext";
import { ToastContainer, toast } from "react-toastify";
import "./Table.css";
import { Table } from "./table";
import { Modal } from "./tableModal";
import { useReactToPrint } from "react-to-print";

export default function DescriptionSummary()
{
    const componentPDF = useRef();
    const { updateUser, updateUserEmail, updateUserimage } =
        useContext(UserContext);
    let isTab = useMediaQuery({ query: "(max-width: 768px)" });
    let isTab1 = useMediaQuery({ query: "(max-width: 425px)" });
    const navigate = useNavigate();
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
        // {
        //     _id: "empty",
        //     testName: "Empty",
        //     testCode: "Empty",
        //     department: "Empty",
        //     sampleType: "Empty",
        //     costOfDiagnosticTest: "$0",
        // },
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
            <div style={{ margin: 0, minHeight: "100vh", width: "100%" }}>
                <div className="MainContainer" style={{ width: "100%" }}>
                    <div
                        className="Right_side"
                        style={{
                            boxSizing: "border-box",
                            width: "100%",
                            height: "75vh",
                            float: "left",
                            backgroundColor: "white",
                            padding: "20px",
                            borderRadius: 20,
                        }}
                    >
                        <div
                            ref={componentPDF}
                            style={{ marginLeft: "5%", marginRight: "5%" }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: 600,
                                    marginTop: "10px",
                                    fontSize: "xx-large",
                                }}
                            >
                                Patient Report
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    marginBottom: "20px",
                                }}
                            >
                                <div
                                    style={{
                                        flex: "1",
                                        display: "flex",
                                        flexDirection: "column",
                                        marginRight: "20px",
                                    }}
                                >
                                    <p style={{ fontWeight: 500 }}>
                                        Name: {patient?.patientId?.name}
                                    </p>

                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            gap: "10px",
                                        }}
                                    >
                                        <p style={{ color: "black", fontWeight: 500 }}>Age: </p>
                                        <p style={{ color: "black", fontWeight: 500 }}>
                                            {patient?.patientId?.age + " yr"}
                                        </p>
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            gap: "10px",
                                        }}
                                    >
                                        <p style={{ color: "black", fontWeight: 500 }}>Weight: </p>
                                        <p style={{ color: "black", fontWeight: 500 }}>
                                            {patient?.patientId?.bodyWeight + " kg"}
                                        </p>
                                    </div>
                                </div>

                                <div
                                    style={{
                                        flex: "1",
                                        display: "flex",
                                        flexDirection: "column",
                                        marginLeft: "400px",
                                    }}
                                >
                                    <p style={{ fontWeight: 500 }}>Home Collection</p>
                                    <p>
                                        {localStorage?.getItem("houseNo")},{" "}
                                        {localStorage?.getItem("floor")},{" "}
                                        {localStorage?.getItem("block")},
                                    </p>
                                    <p>
                                        {" "}
                                        {localStorage?.getItem("area")},
                                        {localStorage?.getItem("district")},{" "}
                                        {localStorage?.getItem("pincode")}
                                    </p>
                                </div>
                            </div>

                            <div class=" flex flex-col ">

                                <div className=" overflow-x-auto xl:max-w-5xl 2xl:max-w-7xl lg:max-w-2xl  md:max-w-md max-w-xs mx-auto">
                                    <table className=" divide-y divide-gray-200 ">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-base font-medium text-black uppercase tracking-wider">Dr. Name</th>
                                                <th className="px-6 py-3 text-left text-base font-medium text-black uppercase tracking-wider">Date</th>
                                                <th className="px-6 py-3 text-left text-base font-medium text-black uppercase tracking-wider">Time</th>
                                                <th className="px-6 py-3 text-left text-base font-medium text-black uppercase tracking-wider">Issues</th>
                                                <th className="px-6 py-3 text-left text-base font-medium text-black uppercase tracking-wider">Disease</th>
                                                <th className="px-6 py-3 text-left text-base font-medium text-black uppercase tracking-wider">Medicine Name</th>
                                                <th className="px-6 py-3 text-left text-base font-medium text-black uppercase tracking-wider">Lab Test</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {patientsHistory?.map((history, index) => (
                                                <tr key={index}>
                                                    <td className=" px-6 py-4 whitespace-nowrap text-sm  text-gray-900">{history?.doctorId?.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black ">{history?.appointmentDate?.date}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{history?.appointmentDate?.time}</td>
                                                    <td
                                                        // className="w-52 px-6 py-4 whitespace-nowrap text-sm text-black"
                                                        className="w-[300px] px-6 py-4 whitespace-normal text-sm text-black break-words" style={{ wordWrap: 'break-word' }}
                                                    >{history?.issues?.join(', ')}</td>
                                                    <td
                                                        // className="w-52 px-6 py-4 whitespace-nowrap text-sm text-black"
                                                        className="w-[300px] px-6 py-4 whitespace-normal text-sm text-black break-words" style={{ wordWrap: 'break-word' }}>{history?.diseases?.join(', ')}</td>
                                                    <td
                                                        className="w-[300px] px-6 py-4 whitespace-normal text-sm text-black break-words" style={{ wordWrap: 'break-word' }}
                                                    // className="w-52 px-6 py-4 whitespace-nowrap text-sm text-black"
                                                    >{history?.medicineName?.join(', ')}</td>
                                                    <td
                                                        className="w-[300px] px-6 py-4 whitespace-normal text-sm text-black break-words" style={{ wordWrap: 'break-word' }}
                                                    // className="w-52 px-6 py-4 whitespace-nowrap text-sm text-black"
                                                    >{history?.labTests?.join(', ')}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>




                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: "center" }} className="flex mx-auto my-5 flex-col lg:flex-row gap-5 justify-center">

                            <button
                                className="w-40 h-11 bg-[#89CFF0] rounded-full text-white font-semibold text-xl leading-9 font-lato"
                                onClick={generatePdf}
                            // style={{
                            //   height: "40px",
                            //   width: "120px",
                            //   backgroundColor: "#89CFF0",
                            //   borderRadius: "10px",
                            //   marginTop: "20px",
                            // }}
                            >
                                Download PDF
                            </button>
                            <button
                                className="w-40 h-11 bg-[#89CFF0] rounded-full text-white font-semibold text-xl leading-9 font-lato"
                            // style={{
                            //   height: "40px",
                            //   width: "100px",
                            //   backgroundColor: "#89CFF0",
                            //   borderRadius: "10px",
                            //   marginTop: "20px",
                            // }}
                            >
                                <label htmlFor="files">Send To SMS</label>
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
            </div>
        </>
    );
}
