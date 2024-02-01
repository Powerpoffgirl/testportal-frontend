import React, { useState, useEffect, useContext, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import UserContext from "./userContext";
import { ToastContainer, toast } from "react-toastify";
import "./Table.css";
import { useReactToPrint } from "react-to-print";

export default function Summary() {
    const componentPDF = useRef();
    const { updateUser, updateUserEmail, updateUserimage } =
        useContext(UserContext);
    let isLg = useMediaQuery({ query: "(max-width: 1023px)" });
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [rowNumber, setRowNumber] = useState();
    const [userDetailsName, setUserDetailsName] = useState();
    const [userDetailsEmail, setUserDetailsEmail] = useState();
    const [userDetailsPic, setUserDetailsPic] = useState();
    const [outRange, setOutRange] = useState(false);
    const location = useLocation()
    console.log("LOCATION============", location)
    const reportDate = location.state.reportDate

    const handleFileSelect = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const token = localStorage.getItem("token");
            const patientId = localStorage.getItem("selectedPatientId");
            const doctorId = localStorage.getItem("doctorId");
            const formData = new FormData();
            formData.append("patientReport", file);

            console.log("FORM DATA", formData);
            try {
                const response = await fetch(
                    `${baseUrl}/api/v1/doctor/upload_report/${patientId}`,
                    {
                        method: "POST",
                        headers: {
                            "x-auth-token": token,
                        },
                        body: formData,
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                fileInputRef.current.value = "";
            } catch (error) {
                console.error("Error ", error);
                toast.error("Error uploading pdf. Please try again.");
            }
        }
    };

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem("token");
                const patientId = localStorage.getItem("patientId");
                if (!token) {
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
            } catch (error) {
                console.error("There was an error verifying the OTP:", error);
            }
        };
        fetchUserDetails();
    }, []);

    const generatePdf = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "userReport",

        onBeforeGetContent: () => {
            // This is called before getting the content for printing
            // You can enable the "Send To SMS" button here
            const sendToSMSButton = document.getElementById('sendToSMSButton');
            sendToSMSButton.disabled = false;
        },
        // onAfterPrint: () => alert("Data saved in PDF")
    });

    const [rows, setRows] = useState([]);


    useEffect(() => {
        const fetchTestDetails = async () => {
            try {
                const token = localStorage.getItem("token");
                const patientId = localStorage.getItem("selectedPatientId");

                if (!token) {
                    console.error("No token found in local storage");
                    return;
                }

                const response = await fetch(
                    `${baseUrl}/api/v1/doctor/get_labPatient/${patientId}`,
                    {
                        method: "get",
                        headers: {
                            "Content-Type": "application/json",
                            "x-auth-token": token,
                        },
                    }
                );

                const responseData = await response.json();
                console.log("DATA from response", responseData.data.testAsked);
                const filteredData = responseData?.data?.testAsked?.filter((item) => {
                    console.log(item?.date?.slice(0, 10), "DATE &&", reportDate);
                    if (item?.date?.slice(0, 10) === reportDate) {
                        return item;
                    }
                });

                console.log("FILTERED DATA", filteredData);
                setRows(filteredData);
            } catch (error) {
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
                            height: "80vh",
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
                            <div class="mb-3  text-3xl "
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: 600,
                                    marginTop: "10px",
                                    // fontSize: "xx-large",
                                }}
                            >
                                Lab Patient Report
                            </div>
                            <div class=""
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    marginBottom: "20px",
                                }}
                            >
                                <div class=""
                                    style={{
                                        flex: "1",
                                        display: "flex",
                                        flexDirection: "column",
                                        marginRight: "20px",
                                    }}
                                >
                                    <p style={{ fontWeight: 500, textTransform: 'capitalize' }}>
                                        Date: {reportDate.split('-').reverse().join('-')}

                                    </p>
                                    <p style={{ fontWeight: 500, textTransform: 'capitalize' }}>
                                        Name: {localStorage?.getItem("name")}
                                    </p>

                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            gap: "10px",

                                        }}
                                    >
                                        <p style={{ color: "black", fontWeight: 500 }}>Ref By: </p>
                                        <p style={{ color: "black", fontWeight: 500, textTransform: 'capitalize' }}>
                                            {localStorage.getItem("ref")}
                                        </p>
                                    </div>
                                </div>

                                <div class="flex flex-col"
                                    style={{
                                        display: isLg ? "none" : "",
                                    }}
                                >
                                    <div clss="ml-auto">
                                        <p style={{ fontWeight: 500 }}>Home Collection</p>
                                        <p>
                                            {localStorage?.getItem("houseNo") == undefined ? "" : localStorage?.getItem("houseNo")},{" "}
                                            {localStorage?.getItem("floor") == undefined ? "" : localStorage?.getItem("floor")},{" "}
                                            {localStorage?.getItem("block") == undefined ? "" : localStorage?.getItem("block")},
                                        </p>
                                        <p>
                                            {" "}
                                            {localStorage?.getItem("area") == undefined ? "" : localStorage?.getItem("area")},{" "}
                                            {localStorage?.getItem("district") == undefined ? "" : localStorage?.getItem("district")},{" "}
                                            {localStorage?.getItem("pincode") == undefined ? "" : localStorage?.getItem("pincode")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="printContainer overflow-x-auto xl:max-w-5xl 2xl:max-w-7xl lg:max-w-xl  md:max-w-full max-w-xs mx-auto ">
                                <table className="text-sm rtl:text-right text-black text-left border border-[#89CFF0]  mx-auto">
                                    <thead
                                        style={{ backgroundColor: "#89CFF0" }}
                                        className="text-xs text-gray-700 text-left uppercase overflow-x-auto "
                                    >
                                        <tr>
                                            <th
                                                style={{ textAlign: "left" }}
                                                scope="col"
                                                className="px-3 py-3 text-white text-sm font-semibold lg:px-6"
                                            >
                                                Test/ package
                                            </th>
                                            <th
                                                style={{ textAlign: "left" }}
                                                scope="col"
                                                className="px-3 py-3 text-white text-sm font-semibold lg:px-6"
                                            >
                                                Test Code
                                            </th>
                                            <th
                                                style={{ textAlign: "left" }}
                                                scope="col"
                                                className="px-3 py-3 text-white text-sm font-semibold lg:px-6"
                                            >
                                                Technology
                                            </th>
                                            <th
                                                style={{ textAlign: "left" }}
                                                scope="col"
                                                className="px-3 py-3 text-white text-sm font-semibold lg:px-6"
                                            >
                                                Value
                                            </th>
                                            <th
                                                style={{ textAlign: "left" }}
                                                scope="col"
                                                className="px-3 py-3 text-white text-sm font-semibold lg:px-6"
                                            >
                                                Units
                                            </th>
                                            <th
                                                style={{ textAlign: "left" }}
                                                scope="col"
                                                className="px-3 py-3 text-white text-sm font-semibold lg:px-6"
                                            >
                                                Bio. Ref
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows.map((row, idx) => {
                                            const statusText = row.status
                                                ? row.status.charAt(0).toUpperCase() + row.status.slice(1)
                                                : "";

                                            return (
                                                <tr key={idx} class="">
                                                    <td
                                                        className="px-3 lg:px-6 pt-4 "
                                                        style={{
                                                            textAlign: "left",
                                                            fontWeight:
                                                                Number(row?.value) > Number(row?.id?.bioRefInterval?.split("-")[1]) ||
                                                                    Number(row?.value) < Number(row?.id?.bioRefInterval?.split("-")[0])
                                                                    ? "bolder"
                                                                    : "normal",
                                                        }}
                                                    >
                                                        {row?.id?.testName}
                                                    </td>
                                                    <td
                                                        className="px-3 lg:px-6 pt-4"
                                                        style={{
                                                            textAlign: "left",
                                                            fontWeight:
                                                                Number(row?.value) > Number(row?.id?.bioRefInterval?.split("-")[1]) ||
                                                                    Number(row?.value) < Number(row?.id?.bioRefInterval?.split("-")[0])
                                                                    ? "bolder"
                                                                    : "normal",
                                                        }}
                                                    >
                                                        {row?.id?.testCode}
                                                    </td>
                                                    <td
                                                        className="px-3 lg:px-6 pt-4"
                                                        style={{
                                                            textAlign: "left",
                                                            fontWeight:
                                                                Number(row?.value) > Number(row?.id?.bioRefInterval?.split("-")[1]) ||
                                                                    Number(row?.value) < Number(row?.id?.bioRefInterval?.split("-")[0])
                                                                    ? "bolder"
                                                                    : "normal",
                                                        }}
                                                    >
                                                        {row?.id?.technology}
                                                    </td>
                                                    <td
                                                        className="px-3 lg:px-6 pt-4"
                                                        style={{
                                                            textAlign: "left",
                                                            fontWeight:
                                                                Number(row?.value) > Number(row?.id?.bioRefInterval?.split("-")[1]) ||
                                                                    Number(row?.value) < Number(row?.id?.bioRefInterval?.split("-")[0])
                                                                    ? "bolder"
                                                                    : "normal",
                                                        }}
                                                    >
                                                        {row.value}
                                                    </td>
                                                    <td
                                                        className="px-3 lg:px-6 pt-4"
                                                        style={{
                                                            textAlign: "left",
                                                            fontWeight:
                                                                Number(row?.value) > Number(row?.id?.bioRefInterval?.split("-")[1]) ||
                                                                    Number(row?.value) < Number(row?.id?.bioRefInterval?.split("-")[0])
                                                                    ? "bolder"
                                                                    : "normal",
                                                        }}
                                                    >
                                                        {row?.id?.unit}
                                                    </td>
                                                    <td
                                                        className="px-3 lg:px-6 pt-4"
                                                        style={{
                                                            textAlign: "left",
                                                            fontWeight:
                                                                Number(row?.value) > Number(row?.id?.bioRefInterval?.split("-")[1]) ||
                                                                    Number(row?.value) < Number(row?.id?.bioRefInterval?.split("-")[0])
                                                                    ? "bolder"
                                                                    : "normal",
                                                        }}
                                                    >
                                                        {row?.id?.bioRefInterval}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        <br />
                                        <tr
                                            class=""
                                            style={{
                                                borderTop: "1px solid #89CFF0",
                                                borderBottom: "1px solid #89CFF0",
                                            }}
                                        >
                                            <td style={{ paddingLeft: "25px" }} class="py-1">Remarks: </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class=" justify-content-center flex flex-col sm:flex-row"
                            style={{
                                gap: "10px",
                                alignItems: "center",
                                justifyContent: "center",
                                marginTop: "20px",
                            }}
                        >
                            <button
                                onClick={generatePdf}
                                style={{
                                    height: "40px",
                                    width: "140px",
                                    backgroundColor: "#89CFF0",
                                    borderRadius: "20px",
                                    marginTop: "20px",
                                    padding: "2px",
                                    color: "white",
                                }}
                            >
                                Download PDF
                            </button>

                            <button

                                style={{
                                    height: "40px",
                                    width: "120px",
                                    backgroundColor: "#89CFF0",
                                    borderRadius: "20px",
                                    marginTop: "20px",
                                    padding: "2px",
                                }}
                            >
                                <label htmlFor="files" id="sendToSMSButton" disabled style={{ color: "white" }}>
                                    Send To SMS
                                </label>
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
