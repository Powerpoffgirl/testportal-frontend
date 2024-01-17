import React, { useState, useEffect, useContext } from "react";
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

export default function BillingPrice()
{

    const { updateUser, updateUserEmail, updateUserimage } = useContext(UserContext);
    let isTab = useMediaQuery({ query: "(max-width: 768px)" });
    let isTab1 = useMediaQuery({ query: "(max-width: 425px)" });
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

                const response = await fetch(`${baseUrl}/api/v1/doctor/get_labPatient/${patientId}`, {
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                        "x-auth-token": token,
                    },
                });

                const responseData = await response.json();
                console.log("DATA from response", responseData);


                setRows(responseData?.data?.testAsked || []);

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
                        <table className="text-sm text-left text-gray-500 w-full">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className=" text-left text-black text-sm font-semibold ">
                                        Test/package
                                    </th>
                                    <th scope="col" className="py-3 text-left text-black text-sm font-semibold ">
                                        Test Code
                                    </th>
                                    <th scope="col" className=" py-3 text-left text-black text-sm font-semibold ">
                                        Price
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
                                            <td style={{ textAlign: 'left', color: 'black' }}>{row?.id?.testName}</td>
                                            <td style={{ textAlign: 'left', color: 'black' }}>{row?.id?.testCode}</td>
                                            <td style={{ textAlign: 'left', color: 'black' }}>{row?.id?.costOfDiagnosticTest}</td>

                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        <div>
                            <p>Total Price : {localStorage.getItem("totalPrice")}</p>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '100px' }}>
                            <button
                                class="mx-4"
                                style={{
                                    backgroundColor: "#89CFF0",
                                    borderRadius: "23px",
                                    padding: "8px 15px 8px 15px",
                                    color: "white",

                                }}
                                onClick={() => navigate(`/summary`)}
                            >
                                Go To Summary
                            </button>
                        </div>


                    </div>
                </div>
            </div>
        </>
    );
}
