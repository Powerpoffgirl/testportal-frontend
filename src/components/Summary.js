import React, { useState, useEffect, useContext, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { Navigate, useNavigate } from "react-router-dom";
import { Flex, Row, Select } from "antd";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
// import Modal from "react-responsive-modal";
import UserContext from './userContext';
import { ToastContainer, toast } from "react-toastify";
import "./Table.css";
import { Table } from "./table";
import { Modal } from "./tableModal";
import { useReactToPrint } from 'react-to-print'

export default function Summary()
{
    const componentPDF = useRef();
    const { updateUser, updateUserEmail, updateUserimage } = useContext(UserContext);
    let isTab = useMediaQuery({ query: "(max-width: 768px)" });
    let isTab1 = useMediaQuery({ query: "(max-width: 425px)" });
    const navigate = useNavigate()
    const fileInputRef = useRef(null);
    const baseUrl = process.env.REACT_APP_BASE_URL
    const [rowNumber, setRowNumber] = useState();
    const [userDetailsName, setUserDetailsName] = useState();
    const [userDetailsEmail, setUserDetailsEmail] = useState();
    const [userDetailsPic, setUserDetailsPic] = useState();



    const handleFileSelect = async (event) =>
    {
        const file = event.target.files[0];
        if (file)
        {
            const token = localStorage.getItem("token");
            const patientId = localStorage.getItem("selectedPatientId");
            const doctorId = localStorage.getItem("doctorId");
            const formData = new FormData();
            formData.append("patientReport", file);

            console.log("FORM DATA", formData);
            try
            {
                const response = await fetch(`${baseUrl}/api/v1/doctor/upload_report/${patientId}`, {
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

    const handleDeleteRow = async (index) =>
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

            const response = await fetch(`${baseUrl}/api/v1/doctor/delete_testBooking/${rows[index]._id}`, {
                method: "delete",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": token,
                },
            });

            const responseData = await response.json();
            console.log("DATA from response", responseData);
            setRows(rows.filter((_, idx) => idx !== index));


        } catch (error)
        {
            console.error("There was an error deleting details:", error);
        }


    };

    const handleEditRow = (idx) =>
    {
        setRowToEdit(idx);
        setModalOpen(true);
    };


    const handleSubmit = (newRow) =>
    {

        console.log("code working till now ")
        setRows((prevRows) =>
        {
            if (rowToEdit === null)
            {
                const updatedRows = [...prevRows, newRow];
                const newRowNumber = updatedRows.length - 1;
                setRowNumber(newRowNumber);

                return updatedRows;
            } else
            {
                const EditDetails = async () =>
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

                        const lastItem = rows[rowToEdit];


                        const response = await fetch(`${baseUrl}/api/v1/doctor/update_testBooking/${rows[rowToEdit]._id}`, {
                            method: "Put",
                            headers: {
                                "Content-Type": "application/json",
                                "x-auth-token": token,
                            },
                            body: JSON.stringify({
                                testName: lastItem.testName,
                                testCode: lastItem.testCode,
                                department: lastItem.department,
                                sampleType: lastItem.sampleType,
                                costOfDiagnosticTest: lastItem.costOfDiagnosticTest,
                                unit: lastItem.unit,
                                bioRefInterval: lastItem.bioRefInterval,
                                technology: lastItem.technology,
                                patientId: patientId,
                            }),
                        });

                        const responseData = await response.json();
                        console.log("DATA from response", responseData);
                        // Handle responseData as needed (maybe update state?)

                    } catch (error)
                    {
                        console.error("There was an error verifying the OTP:", error);
                    }
                };
                EditDetails();
                return prevRows.map((currRow, idx) =>
                    idx !== rowToEdit ? currRow : newRow
                );

            }
        });
        setRowToEdit(null);
        // window.location.reload();
    };





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

                const response = await fetch(`${baseUrl}/api/v1/doctor/getall_testBookingByPatientId/${patientId}`, {
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                        "x-auth-token": token,
                    },
                });

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
                        <div ref={componentPDF}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, marginTop: '10px' }}>Patient Report</div>
                            <div style={{ marginLeft: '20px', marginTop: "3px", display: 'flex', flexDirection: 'row', gap: '550px' }}>
                                <p style={{ fontWeight: 500, width: '100px', }}>Name:{localStorage?.getItem("name")}</p>
                                <p style={{ fontWeight: 500, marginLeft: '10px' }}>Home Collection:  {localStorage?.getItem("houseNo")},{localStorage?.getItem("floor")} , {localStorage?.getItem("block")}, {localStorage?.getItem("area")},{localStorage?.getItem("district")},{localStorage?.getItem("pincode")}</p>

                            </div>

                            <div style={{ marginLeft: '20px', display: 'flex', flexDirection: 'row', gap: '10px', marginBottom: '20px' }}>
                                <p style={{ color: "black", fontWeight: 500 }}>Ref By:- </p>
                                <p
                                    style={{
                                        color: "black",
                                        fontWeight: 500
                                    }}
                                >
                                    {localStorage.getItem("ref")}
                                </p>
                            </div>





                            <table className="text-sm rtl:text-right text-gray-500 w-full">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-3 py-3 text-black text-sm font-semibold lg:px-6">
                                            Test/package
                                        </th>
                                        <th scope="col" className="px-3 py-3 text-black text-sm font-semibold lg:px-6">
                                            testCode
                                        </th>
                                        <th scope="col" className="px-3 py-3 text-black text-sm font-semibold lg:px-6">
                                            Technology
                                        </th>
                                        <th scope="col" className="px-3 py-3 text-black text-sm font-semibold lg:px-6">
                                            Value
                                        </th>
                                        <th scope="col" className="px-3 py-3 text-black text-sm font-semibold lg:px-6">
                                            Units
                                        </th>
                                        <th scope="col" className="px-3 py-3 text-black text-sm font-semibold lg:px-6">
                                            Bio.Ref
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((row, idx) =>
                                    {
                                        const statusText = row.status
                                            ? row.status.charAt(0).toUpperCase() + row.status.slice(1)
                                            : '';

                                        return (
                                            <tr key={idx}>
                                                <td style={{ textAlign: 'center' }}>{row.testName}</td>
                                                <td style={{ textAlign: 'center' }}>{row.testCode}</td>
                                                <td style={{ textAlign: 'center' }}>{row.technology}</td>
                                                <td style={{ textAlign: 'center' }}>{row.value}</td>
                                                <td style={{ textAlign: 'center' }}>{row.unit}</td>
                                                <td style={{ textAlign: 'center' }}>{row.bioRefInterval}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>

                        </div>

                        <div style={{ display: "flex", flexDirection: 'row', gap: '10px', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
                            <button
                                onClick={generatePdf}
                                style={{
                                    height: "40px",
                                    width: "120px",
                                    backgroundColor: "#89CFF0",
                                    borderRadius: "10px",
                                    marginTop: "20px",
                                }}
                            >
                                Download PDF
                            </button>

                            <button

                                style={{
                                    height: "40px",
                                    width: "120px",
                                    backgroundColor: "#89CFF0",
                                    borderRadius: "10px",
                                    marginTop: "20px",
                                }}
                            >
                                <label htmlFor="files">Send To SMS</label>
                            </button>
                            <p className="block text-black text-lg font-semibold ">
                                <input
                                    id="files"
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                    accept="application/pdf"
                                    onChange={handleFileSelect}
                                />
                            </p>
                        </div>


                    </div>
                </div>
            </div>
        </>
    );
}
