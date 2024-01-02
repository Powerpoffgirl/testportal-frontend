import React, { useState, useEffect, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { Navigate, useNavigate } from "react-router-dom";
import { Flex, Row, Select } from "antd";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
// import Modal from "react-responsive-modal";
import UserContext from './userContext';
import { ToastContainer, toast } from "react-toastify";

import { Table } from "./table";
import { Modal } from "./tableModal";

export default function TestListPage()
{
    const { updateUser, updateUserEmail, updateUserimage } = useContext(UserContext);
    let isTab = useMediaQuery({ query: "(max-width: 768px)" });
    const navigate = useNavigate()
    const baseUrl = process.env.REACT_APP_BASE_URL
    const [rowNumber, setRowNumber] = useState();
    const [userDetailsName, setUserDetailsName] = useState();
    const [userDetailsEmail, setUserDetailsEmail] = useState();
    const [userDetailsPic, setUserDetailsPic] = useState();



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
                                testName: lastItem.test,
                                testCode: lastItem.testCode,
                                department: lastItem.department,
                                sampleType: lastItem.sampleType,
                                costOfDiagnosticTest: lastItem.cost,
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
        window.location.reload();
    };

    useEffect(() =>
    {

        const submitDetails = async () =>
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

                const lastItem = rows[rows.length - 1];

                console.log("last Item -------", lastItem)

                const response = await fetch(`${baseUrl}/api/v1/doctor/create_testBooking`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-auth-token": token,
                    },
                    body: JSON.stringify({
                        testName: lastItem.test,
                        testCode: lastItem.testCode,
                        department: lastItem.department,
                        sampleType: lastItem.sampleType,
                        costOfDiagnosticTest: lastItem.cost,
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

        submitDetails();

    }, [rows])




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

                const response = await fetch(`${baseUrl}/api/v1/doctor/getall_testBooking`, {
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
                        <div>
                            <Table
                                rows={rows}
                                deleteRow={handleDeleteRow}
                                editRow={handleEditRow}
                            />
                            <div style={{ display: 'flex', alignItems: "center", justifyContent: 'center', marginTop: 20 }}>
                                <button onClick={() => setModalOpen(true)} style={{ color: 'white', height: 30, width: 60, backgroundColor: "#89CFF0", borderRadius: 10 }}>
                                    Add
                                </button>
                            </div>

                            {modalOpen && (
                                <Modal
                                    closeModal={() =>
                                    {
                                        setModalOpen(false);
                                        setRowToEdit(null);
                                    }}
                                    onSubmit={handleSubmit}
                                    defaultValue={rowToEdit !== null && rows[rowToEdit]}
                                />
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
