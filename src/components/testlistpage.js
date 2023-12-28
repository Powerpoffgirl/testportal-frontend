import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Navigate, useNavigate } from "react-router-dom";
import { Flex, Row, Select } from "antd";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
// import Modal from "react-responsive-modal";
import { ToastContainer, toast } from "react-toastify";

import { Table } from "./table";
import { Modal } from "./tableModal";

export default function TestListPage()
{
    let isTab = useMediaQuery({ query: "(max-width: 768px)" });
    const navigate = useNavigate()
    const baseUrl = process.env.REACT_APP_BASE_URL
    const [rowNumber, setRowNumber] = useState();
    // const [modalOpen, setModalOpen] = useState(false);
    // const [modalContent, setModalContent] = useState('');
    // const onOpenModal = () => setOpen(true);
    // const onCloseModall = () => setOpen(false);
    // const [open, setOpen] = useState(false);
    // const [test, setTest] = useState({
    //     testName: "",
    //     testCode: "",
    //     department: "",
    //     sampleType: "",
    //     costOfDiagnosticTest: "",
    //     patientId: ""
    // })
    // const [selectedMethod, setSelectedMethod] = useState(null);

    // const handleMethodClick = (method) =>
    // {
    //     setSelectedMethod(method);
    // };

    // // change data to tests ===> Plural test
    // const [data, setData] = useState([
    //     { id: 1, test: 'Viral Load', testCode: 'Hiv', department: 'Molucular Test', sampleType: 'serum', cost: '$50', isEditing: false },
    //     { id: 2, test: 'Vitamin D3', testCode: 'vitamin d3', department: 'Immuinio', sampleType: 'serum', cost: '$75', isEditing: false },
    //     { id: 3, test: 'Viral Load', testCode: 'Hiv', department: 'Molucular Test', sampleType: 'serum', cost: '$50', isEditing: false },
    //     { id: 4, test: 'Vitamin D3', testCode: 'vitamin d3', department: 'Immuinio', sampleType: 'serum', cost: '$75', isEditing: false },
    // ]);
    // const addRow = () =>
    // {
    //     setData((prevData) => [
    //         ...prevData,
    //         { id: Date.now(), test: '', testCode: '', department: '', sampleType: '', cost: '', isEditing: true },
    //     ]);
    // };

    // const editRow = (id) =>
    // {
    //     setData((prevData) =>
    //         prevData.map((row) =>
    //             row.id === id ? { ...row, isEditing: !row.isEditing } : row
    //         )
    //     );
    // };

    // const saveRow = (id, newData) =>
    // {
    //     setData((prevData) =>
    //         prevData.map((row) =>
    //             row.id === id ? { ...row, ...newData, isEditing: false } : row
    //         )
    //     );
    // }

    // const handleEditChange = (id, field, value) =>
    // {
    //     setData((prevData) =>
    //         prevData.map((row) =>
    //             row.id === id ? { ...row, [field]: value } : row
    //         )
    //     );
    // };

    //new table part start from here
    const [modalOpen, setModalOpen] = useState(false);
    const [rows, setRows] = useState([
        {
            _id: "empty",
            testName: "Empty",
            testCode: "Empty",
            department: "Empty",
            sampleType: "Empty",
            costOfDiagnosticTest: "$0",
        },

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
        setRowToEdit(null);
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

                        const lastItem = rows[rowNumber];


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
        submitDetails();
    };





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

            const lastItem = rows[rowNumber];

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
                            <div style={{ display: 'flex', alignItems: "center", justifyContent: 'center', marginTop: 50 }}>
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
