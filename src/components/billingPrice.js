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
import "./printStyles.css";
import { FaCircleChevronRight } from "react-icons/fa6";
import { FaCircleChevronLeft } from "react-icons/fa6";
import { MdDownloadForOffline } from "react-icons/md";
import { BsFillSendFill } from "react-icons/bs";

export default function BillingPrice()
{
  const componentPDF = useRef();
  const { updateUser, updateUserEmail, updateUserimage } =
    useContext(UserContext);
  let isTab = useMediaQuery({ query: "(max-width: 768px)" });
  let isTab1 = useMediaQuery({ query: "(max-width: 425px)" });
  let isLg = useMediaQuery({ query: "(max-width: 1023px)" });
  const navigate = useNavigate();
  const location = useLocation();
  console.log("LOCATION============", location);
  const reportDate = location.state.reportDate;
  console.log("REPORT DATE", reportDate);
  const discountValue = location.state.discount;
  console.log("discount value is ", discountValue);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [rowNumber, setRowNumber] = useState();
  const [userDetailsName, setUserDetailsName] = useState();
  const [userDetailsEmail, setUserDetailsEmail] = useState();
  const [userDetailsPic, setUserDetailsPic] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const fileInputRef = useRef(null);

  const generatePdf = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "userReport",

    onBeforeGetContent: () =>
    {
      const sendToSMSButton = document.getElementById("sendToSMSButton");
      sendToSMSButton.disabled = false;
    },
    // onAfterPrint: () => alert("Data saved in PDF")
  });

  // const handleFileSelect = async (event) => {

  //     const response = generatePdf(); // This will trigger the print functionality
  //     console.log("PDF generation triggered", response);

  //     const file = event.target.files[0];
  //     if (file) {
  //         const token = localStorage.getItem("token");
  //         const patientId = localStorage.getItem("selectedPatientId");
  //         const doctorId = localStorage.getItem("doctorId");
  //         const formData = new FormData();
  //         formData.append("patientReport", file);

  //         console.log("FORM DATA", formData);
  //         try {
  //             const response = await fetch(
  //                 `${baseUrl}/api/v1/doctor/upload_report/${patientId}`,
  //                 {
  //                     method: "POST",
  //                     headers: {
  //                         "x-auth-token": token,
  //                     },
  //                     body: formData,
  //                 }
  //             );

  //             if (!response.ok) {
  //                 throw new Error(`HTTP error! status: ${response.status}`);
  //             }

  //             const data = await response.json();

  //             fileInputRef.current.value = "";
  //         } catch (error) {
  //             console.error("Error ", error);
  //             toast.error("Error uploading pdf. Please try again.");
  //         }
  //     }
  // };

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
        const response = await fetch(
          `${baseUrl}/api/v1/lab/upload_report/${patientId}`,
          {
            method: "POST",
            headers: {
              "x-auth-token": token,
            },
            body: formData,
          }
        );

        if (!response.ok)
        {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        toast.success("Report uploaded successfully!");

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
        const response = await fetch(`${baseUrl}/api/v1/lab/get_labDetails`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token, // Replace with your actual token from the previous session
          },
        });

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

      const response = await fetch(
        `${baseUrl}/api/v1/lab/delete_testBooking/${rows[index]._id}`,
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );

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
    console.log("code working till now ");
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

            const response = await fetch(
              `${baseUrl}/api/v1/lab/update_testBooking/${rows[rowToEdit]._id}`,
              {
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
              }
            );

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

        const response = await fetch(
          `${baseUrl}/api/v1/lab/get_labPatient/${patientId}`,
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

        const filteredData = responseData.data.testAsked.filter((item) =>
        {
          return item?.date?.includes(reportDate);
        });
        const amount = filteredData.reduce((acc, curr) =>
        {
          return acc + (curr?.id?.costOfDiagnosticTest || 0); // Use `0` as a fallback in case `curr.id.costOfDiagnosticTest` is undefined
        }, 0);

        console.log("Total Amount:", amount);
        setTotalPrice(amount);

        console.log("FILTERED DATA", filteredData);
        setRows(filteredData);
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
      <div
        style={{ margin: 0, minHeight: "100vh", width: "100%" }}
        class="md:max-w-[440px] lg:max-w-2xl xl:max-w-full 2xl:max-w-full  "
      >
        <div className="MainContainer " style={{ width: "100%" }}>
          <div
            className=" printContainer1 "
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
              class=""
              ref={componentPDF}
              style={{ marginLeft: "5%", marginRight: "5%" }}
            >
              <div
                class="mb-3  text-3xl "
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 600,
                  marginTop: "10px",
                }}
              >
                Lab Test(s) Bill
              </div>
              <div
                class=""
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "20px",
                }}
              >
                <div
                  class=""
                  style={{
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    marginRight: "20px",
                  }}
                >
                  <p style={{ fontWeight: 500, textTransform: "capitalize" }}>
                    Date: {reportDate?.split("-").reverse().join("-")}
                  </p>
                  <p style={{ fontWeight: 500, textTransform: "capitalize" }}>
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
                    <p
                      style={{
                        color: "black",
                        fontWeight: 500,
                        textTransform: "capitalize",
                      }}
                    >
                      {localStorage.getItem("ref")}
                    </p>
                  </div>
                </div>

                <div
                  class="flex flex-col"
                  style={{
                    display: isLg ? "none" : "",
                  }}
                >
                  <div clss="ml-auto">
                    <p style={{ fontWeight: 500 }}>Home Collection</p>
                    <p>
                      {localStorage?.getItem("houseNo")},{" "}
                      {localStorage?.getItem("floor")},{" "}
                      {localStorage?.getItem("block")},
                    </p>
                    <p>
                      {" "}
                      {localStorage?.getItem("area")},{" "}
                      {localStorage?.getItem("district")},{" "}
                      {localStorage?.getItem("pincode")}
                    </p>
                  </div>
                </div>
              </div>
              <div class=" overflow-x-auto xl:max-w-5xl 2xl:max-w-7xl lg:max-w-xl  md:max-w-full max-w-xs mx-auto overflow-y-auto h-[250px] sm:h-auto ">
                <table className="text-sm rtl:text-right text-black text-left border  border-[#89CFF0]  mx-auto">
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
                        Test/package
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
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, idx) =>
                    {
                      const statusText = row.status
                        ? row.status.charAt(0).toUpperCase() +
                        row.status.slice(1)
                        : "";

                      return (
                        <tr key={idx} class="">
                          <td
                            className="px-3  pt-4 lg:px-6  "
                            style={{ textAlign: "left", color: "black" }}
                          >
                            {row?.id?.testName}
                          </td>
                          <td
                            className="px-3 pt-4 lg:px-6 "
                            style={{ textAlign: "left", color: "black" }}
                          >
                            {row?.id?.testCode}
                          </td>
                          <td
                            className="px-3 pt-4 lg:px-6 "
                            style={{ textAlign: "left", color: "black" }}
                          >
                            {row?.id?.costOfDiagnosticTest}
                          </td>
                        </tr>
                      );
                    })}
                    <br />
                    <br />
                    <tr className=" border border-[#89CFF0]">
                      <td className="px-3 lg:px-6 ">Sub Total :</td>
                      <td></td>
                      <td className="px-3 lg:px-6 ">{totalPrice}</td>
                    </tr>
                    <tr className=" border border-[#89CFF0]">
                      <td className="px-3 lg:px-6 ">Discount Price :</td>
                      <td></td>
                      <td className="px-3 lg:px-6 ">{discountValue} %</td>
                    </tr>
                    <tr className=" border border-[#89CFF0]">
                      <td className="px-3 lg:px-6 ">Total Price :</td>
                      <td></td>
                      <td className="px-3 lg:px-6 ">
                        {totalPrice - (discountValue * totalPrice) / 100}
                      </td>
                    </tr>
                  </tbody>
                </table>
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
                class=""
                onClick={
                  reportDate
                    ? () =>
                      navigate(`/billing`, {
                        state: { reportDate: reportDate },
                      })
                    : () =>
                    {
                      toast.error("please select a date");
                    }
                }
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
              <button onClick={generatePdf}>
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

              <button>
                <label
                  htmlFor="files"
                  id="sendToSMSButton"
                  disabled
                  style={{ color: "white" }}
                >
                  <BsFillSendFill
                    style={{
                      color: "white",
                      backgroundColor: "#89CFF0",
                      borderRadius: "15px",
                      fontSize: "40px",
                      padding: "5px 10px 5px 10px ",
                    }}
                  />
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
