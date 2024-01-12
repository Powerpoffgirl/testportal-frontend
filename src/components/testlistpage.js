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
    let isTab1 = useMediaQuery({ query: "(max-width: 425px)" });
    const navigate = useNavigate()
    const baseUrl = process.env.REACT_APP_BASE_URL
    const [rowNumber, setRowNumber] = useState();
    const [userDetailsName, setUserDetailsName] = useState();
    const [userDetailsEmail, setUserDetailsEmail] = useState();
    const [userDetailsPic, setUserDetailsPic] = useState();
    const [submittoggle, setSubmitToggle] = useState(false);



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

        const test = rows?.filter((row) =>
            row?.testName?.toLowerCase().includes(newRow?.testName.toLowerCase()) &&
            row?.testCode?.toLowerCase().includes(newRow?.testCode.toLowerCase())
        );
        console.log("==================TEST===========================", test)

        if (test.length > 0)
        {
            toast.error("Test ")
            return
        } else
        {
            setRows((prevRows) =>
            {
                if (rowToEdit === null)
                {

                    const updatedRows = [...prevRows, newRow];
                    const newRowNumber = updatedRows.length - 1;
                    setRowNumber(newRowNumber);
                    setSubmitToggle(true);
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
                    return prevRows?.map((currRow, idx) =>
                        idx !== rowToEdit ? currRow : newRow
                    );

                }
            });
        }
        setRowToEdit(null);
        // window.location.reload();
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

                const test = rows?.filter((row) =>
                    row?.testName?.toLowerCase().includes(lastItem?.testName.toLowerCase()) &&
                    row?.testCode?.toLowerCase().includes(lastItem?.testCode.toLowerCase())
                );
                console.log("==================TEST===========================", test)
                // if (test.length > 0)
                // {
                //     toast.error("Test with this name and code already exists.")
                //     return
                // } else
                // {
                const response = await fetch(`${baseUrl}/api/v1/doctor/create_testBooking`, {
                    method: "POST",
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
                        // patientId: patientId,
                    }),
                });

                const responseData = await response.json();
                console.log("DATA from response", responseData);
                // }



            } catch (error)
            {
                console.error("There was an error verifying the OTP:", error);
            }
        };

        if (submittoggle)
        {

            submitDetails();
        }



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

                const testList = responseData.data?.filter(test => test.value == null);
                console.log("=============TESTS===========COIMING", testList)

                setRows(testList || []);
                setSubmitToggle(false);
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
            <div style={{ minHeight: "100vh" }} class={`  md:max-w-xl lg:max-w-2xl xl:max-w-5xl 2xl:max-w-full max-w-[400px] `}>
                <div className="MainContainer" style={{}}>
                    <div
                        className="Right_side  pt-5 pl-5 pr-5"
                        style={{
                            boxSizing: "border-box",
                            width: "100%",
                            height: "75vh",
                            // float: "left",
                            backgroundColor: "white",
                            // padding: "20px",
                            borderRadius: 20,
                            // width:issm? "":""
                        }}
                    >
                        <div>
                            <Table class="overflow-auto  "
                                rows={rows}
                                deleteRow={handleDeleteRow}
                                editRow={handleEditRow}
                            />
                            <div style={{ display: 'flex', alignItems: "center", justifyContent: 'center', marginTop: 20 }}>
                                <button onClick={() => setModalOpen(true)} className="w-40 h-11 bg-[#89CFF0] rounded-full text-white font-semibold text-xl leading-9 font-lato">
                                    ADD
                                </button>
                            </div>
                            <div style={{ zIndex: '9999', position: 'absolute' }}>

                                {modalOpen && (
                                    <Modal class="flex flex-col  border border-black "
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
            </div>
        </>
    );
}
