import React, { useState, useEffect, useRef, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { Flex, Row, Select } from "antd";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import Modal from "react-responsive-modal";
import { ToastContainer, toast } from "react-toastify";
import { MdOutlineDelete } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { useReactToPrint } from "react-to-print";
import { Tooltip } from "antd";
import UserContext from "./userContext";

export default function BillingPage({ name, contactNo, gender, age })
{
  const componentPDF = useRef();
  const { updateUser, updateUserEmail, updateUserimage } =
    useContext(UserContext);
  let isTab = useMediaQuery({ query: "(max-width: 768px)" });
  let xsview = useMediaQuery({ query: "(max-width: 375px)" });
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [searchTerm, setSearchTerm] = useState("");
  const [isListOpen, setIsListOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const onOpenModal = () => setOpen(true);
  const onCloseModall = () => setOpen(false);
  const [open, setOpen] = useState(false);
  const [tests, setTests] = useState([]);
  const [filteredTest, setFilteredtest] = useState([]);
  const [value, setValue] = useState("");
  const [userDetailsName, setUserDetailsName] = useState();
  const [userDetailsEmail, setUserDetailsEmail] = useState();
  const [userDetailsPic, setUserDetailsPic] = useState();
  // const [index, setIndex] = useState(0);
  const [patientReport, setPatientReport] = useState({
    testName: "",
    testCode: "",
    department: "",
    sampleType: "",
    costOfDiagnosticTest: "",
    unit: "",
    bioRefInterval: "",
    technology: "",
    patientId: "",
  });
  const [patientDetails, setPatientDetails] = useState({
    medicineName: [],
    issues: [],
    diseases: [],
    labTests: [],
  });

  const [selectedMethod, setSelectedMethod] = useState(null);

  const handleMethodClick = (method) =>
  {
    setSelectedMethod(method);
  };

  const handleSearch = (event) =>
  {
    const searchTerm = event?.target?.value?.toLowerCase();

    setSearchTerm(searchTerm);

    console.log("all tests =======", tests);

    const filtered = tests?.filter((tests) =>
      tests?.testName?.toLowerCase().includes(searchTerm)
    );
    setFilteredtest(filtered);
    console.log("filtered value", filteredTest);
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
        setUserDetailsPic(data?.data.patientPic);
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
          localStorage.clear();
          navigate(`/doctorlogin`);
        }
        const response = await fetch(
          `${baseUrl}/api/v1/doctor/getall_testBooking`,
          {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token,
            },
          }
        );

        const data = await response.json();
        console.log(
          "DATA from USE EFFECT response List Lab Patient",
          data?.data
        );
        const testData = data?.data;
        console.log("=========TEST DATA============", testData);
        const testList = testData?.filter((test) => test.value == null);
        console.log("=============TESTS===========COIMING", testList);
        setTests(testList);
      } catch (error)
      {
        console.error("There was an error verifying the OTP:", error);
      }
    };
    fetchPatientDetails();
  }, []);

  const [tableData, setTableData] = useState([]);

  const [updatedData, setupdatedData] = useState([]);

  const [inputValues, setInputValues] = useState(
    Array(tableData.length).fill("")
  );

  const handleTestAdd =
    (
      testId,
      cost,
      bioRef,
      units,
      technology,
      testcode,
      department,
      sampleType
    ) =>
      () =>
      {
        const testToAdd = {
          testPackage: testId,
          price: cost,
          technology: technology,
          units: units,
          bio: bioRef,
          testCode: testcode,
          sampleType: sampleType,
          department: department,
          Delete: <MdOutlineDelete />,
          Save: <GiConfirmed />,
        };
        setTableData([testToAdd]);

        setSearchTerm("");

        setIsListOpen(false);
      };

  const deleteRow = (index) =>
  {
    const updatedTableData = [...tableData];

    updatedTableData.splice(index, 1);

    setTableData(updatedTableData);
  };

  const addRow = () =>
  {
    setTableData([
      ...tableData,
      {
        testPackage: "-",
        price: "-",
        technology: "-",
        Units: "-",
        BioRef: "-",
        delete: "-",
        save: "-",
      },
    ]);
  };

  const calculateTotalPrice = () =>
  {
    let totalPrice = 0;

    tableData.forEach((row) =>
    {
      // Assuming price is a number, you might need to parse it if it's a string
      totalPrice += row.price;
    });

    localStorage.setItem("totalPrice", totalPrice);

    return totalPrice;
  };

  const getTestNames = () =>
  {
    return tableData?.map((row) => row.testPackage).join(", ");
  };

  const currentDate = new Date();

  // Format the date as YYYY-MM-DD
  const formattedDate =
    currentDate.getFullYear() +
    "-" +
    ("0" + (currentDate.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + currentDate.getDate()).slice(-2);

  // State to manage the date

  const [appointmentDate, setAppointmentDate] = useState(formattedDate);

  const Toggle = (e) =>
  {
    e.preventDefault();

    setIsListOpen(true);
  };

  const generatePdf = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "userReport",
    // onAfterPrint: () => alert("Data saved in PDF")
  });

  const handleInputFocus = () =>
  {
    setIsListOpen(true);
  };

  const handleChange = async (e, index) =>
  {
    const { name, value } = e.target;
    const patientId = localStorage.getItem("selectedPatientId");

    const newInputValues = [...inputValues];
    newInputValues[index] = e.target.value;
    setInputValues(newInputValues);

    if (name === "value")
    {
      setValue(e.target.value);
      setPatientReport((prevPatientReport) => ({
        ...prevPatientReport,
        value: e.target.value,
        testName: tableData[index]?.testPackage,
        testCode: tableData[index]?.testCode,
        department: tableData[index]?.department,
        sampleType: tableData[index]?.sampleType,
        costOfDiagnosticTest: tableData[index]?.price,
        unit: tableData[index]?.units,
        bioRefInterval: tableData[index]?.bio,
        technology: tableData[index]?.technology,
        patientId: patientId,
      }));
    } else
    {
      setPatientReport((prevPatientReport) => ({
        ...prevPatientReport,
        [name]: value,
      }));
    }
  };

  const handleSave = async (e) =>
  {
    try
    {

      console.log("consoling value", patientReport);
      if (patientReport.value == null)
      {
        toast.error("Value can't be empty");
        return;
      } else
      {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${baseUrl}/api/v1/doctor/create_testBooking`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token,
            },
            body: JSON.stringify(patientReport),
          }
        );

        const responseData = await response.json();
        console.log("DATA from response", responseData);

        toast.success("Saved");
        // window.location.reload();
        e.target.value = "";
      }


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

        const response = await fetch(
          `${baseUrl}/api/v1/doctor/getall_testBooking`,
          {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token,
            },
          }
        );

        const responseData = await response.json();
        console.log("DATA from response from table ", responseData);
      } catch (error)
      {
        console.error("There was an error fetching test details:", error);
      }
    };

    fetchTestDetails();
  }, []);

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
        console.log("DATA from response getAll_testBooking ", responseData);

        setupdatedData(responseData.data || []);
      } catch (error)
      {
        console.error("There was an error fetching test details:", error);
      }
    };

    fetchTestDetails();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          `${baseUrl}/api/v1/doctor/upload_report/${patientId}`,
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

        const data = await response.json();

        fileInputRef.current.value = "";
      } catch (error)
      {
        console.error("Error ", error);
        toast.error("Error uploading pdf. Please try again.");
      }
    }
  };

  updateUser(userDetailsName);
  updateUserEmail(userDetailsEmail);
  updateUserimage(userDetailsPic);


  console.log("row =====", tableData);
  console.log("patient Report ====", patientReport);

  return (
    <>
      <div class="flex" ref={componentPDF}>
        <div className="MainContainer flex lg:flex-row flex-col w-full sm:ml-0">
          {/* --------------------left side-------------------- */}
          <div
            className={` mb-3 flex flex-col w-5/12 lg:min-h-3/4 lg:w-3/12 p-6  bg-white md:w-1/2  sm:w-1/2 md:ml-5 ${xsview ? "" : "ml-10"
              }  `}
            style={{
              // height: "75vh",
              // float: "left",
              borderRadius: 20,
            }}
          >
            <p style={{ textDecoration: "underline", color: "gray" }}>
              Patient Details
            </p>
            <p style={{ color: "black", fontWeight: 500, marginTop: "10px" }}>
              {localStorage.getItem("name")}
            </p>
            <p style={{ color: "black", fontWeight: 500, marginTop: "10px" }}>
              {localStorage.getItem("registrationNo")}
            </p>

            <div class="flex flex-row mt-3 space-x-5">
              <div>
                <div style={{ color: "gray", fontWeight: 500 }}>Gender</div>
                <div style={{ color: "black", fontWeight: 500 }}>
                  {localStorage.getItem("gender")}
                </div>
              </div>
              <div>
                <div style={{ color: "gray", fontWeight: 500 }}>Age</div>
                <div style={{ color: "black", fontWeight: 500 }}>
                  {localStorage.getItem("age")}
                </div>
              </div>
            </div>

            <div style={{ marginTop: "5px" }}>
              <p style={{ color: "gray" }}>Contact number</p>
              <p
                style={{
                  color: "black",
                  fontWeight: 500,
                  marginTop: "5px",
                  marginBottom: "10px",
                }}
              >
                {localStorage.getItem("phoneNo")}
              </p>
            </div>

            <div style={{ marginTop: "3px" }}>
              <p style={{ color: "gray" }}>Ref By</p>
              <p
                style={{
                  color: "black",
                  fontWeight: 500,
                  marginTop: "5px",
                  marginBottom: "10px",
                }}
              >
                {localStorage.getItem("ref")}
              </p>
            </div>

            <hr />
            <hr />

            <div>
              <p style={{ color: "gray", marginTop: "15px" }}>Billing Date</p>
              <input
                className="px-2 border h-10 rounded-lg w-50"
                type="date"
                id="appointmentDate"
                name="date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
              />
            </div>
            {/* <div style={{ display: "flex", flexDirection: 'row', gap: '10px' }}>
              <button
                onClick={generatePdf}
                style={{
                  height: "40px",
                  width: "100%",
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
                  width: "100%",
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
            </div> */}

            {/* <div style={{ marginTop: "15px" }}>
              <p style={{ color: "gray" }}>Summary</p>
            </div> */}

            {/* <div style={{ marginTop: "15px" }}>
              <p style={{ color: "gray" }}>Sample collector</p>
              <p style={{ color: "black" }}>-</p>
            </div>

            <div style={{ marginTop: "15px" }}>
              <p style={{ color: "gray" }}>Collected At</p>
              <p style={{ color: "black" }}>-</p>
            </div>

            <div style={{ marginTop: "15px" }}>
              <p style={{ color: "gray" }}>Organisation</p>
              <p style={{ color: "black" }}>Self</p>
            </div> */}
          </div>

          {/* --------------------right side-------------------- */}
          <div
            className={` lg:w-4/12 p-6 md:w-1/2 xl:w-8/12 pr-8 bg-white lg:min-h-3/4 w-5/12 md:ml-5 ${xsview ? "" : "ml-10"
              }  `}
            style={{
              boxSizing: "border-box ",
              // height: "75vh",
              // float: "right",
              borderRadius: 20,
              // backgroundColor: "white",
            }}
          >
            {/* table */}

            <form>
              <div class="flex mt-2 mb-3">
                <label
                  for="search-dropdown"
                  class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-900"
                >
                  Your Email
                </label>
                <button
                  id="dropdown-button"
                  data-dropdown-toggle="dropdown"
                  class="flex-shrink-0 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
                  type="button"
                >
                  Tests{" "}
                  <svg
                    class="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  id="dropdown"
                  class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
                >
                  <ul
                    class="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdown-button"
                  >
                    <li>
                      <button
                        type="button"
                        class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Mockups
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Templates
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Design
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Logos
                      </button>
                    </li>
                  </ul>
                </div>
                <div class="relative w-full ">
                  <input
                    value={searchTerm}
                    onChange={handleSearch}
                    onFocus={handleInputFocus}
                    type="search"
                    id="search-dropdown"
                    className="block p-2.5 w-full z-20 placeholder-gray-400 text-sm text-gray-900 bg-gray-50 rounded-lg border-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search test by name or code..."
                    required
                  />

                  <button class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-gray-900 bg-gray-50 rounded-e-lg border border-gray-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                    <svg
                      class="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                    <span class="sr-only">Search</span>
                  </button>
                  <div style={{ zIndex: 9999 }}>
                    {isListOpen && (
                      <ul
                        style={{ width: "80%" }}
                        className=" absolute divide-y divide-gray-200 bg-white"
                      >
                        {filteredTest?.map((test) => (
                          <li key={test?.id} className="p-4">
                            <div
                              onClick={handleTestAdd(
                                test?.testName,
                                test?.costOfDiagnosticTest,
                                test?.bioRefInterval,
                                test?.unit,
                                test?.technology,
                                test?.testCode,
                                test?.department,
                                test?.sampleType,
                                test?.patientId
                              )}
                              className="font-bold"
                            >
                              {test?.testName}
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </form>

            <div className="flex flex-wrap ">
              <div
                className="overflow-x-auto overflow-y-auto "
                style={{ height: "300px" }}
              >
                <table className="text-sm text-left rtl:text-right text-gray-500 ">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-3 py-3 text-black text-sm font-semibold lg:px-6"
                      >
                        Test/package
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3 text-black text-sm font-semibold lg:px-6"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3 text-black text-sm font-semibold lg:px-6"
                      >
                        Technology
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3 text-black text-sm font-semibold lg:px-6"
                      >
                        Value
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3 text-black text-sm font-semibold lg:px-6"
                      >
                        Units
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3 text-black text-sm font-semibold lg:px-6"
                      >
                        Bio.Ref
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-black text-sm font-semibold"
                      >
                        {/* Delete */}
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-black text-sm font-semibold"
                      >
                        {/* Save */}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="overflow-y-auto">
                    {tableData.map((row, index) => (
                      <tr key={index} className="bg-white border-b  ">
                        <th
                          scope="row"
                          className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap "
                          value={patientReport.testName}
                          name="testName"
                        >
                          {row.testPackage}
                        </th>
                        <td
                          className="px-6 py-4 text-sm"
                          value={patientReport.price}
                          name="price"
                        >
                          {row.price}
                        </td>
                        <td
                          className="px-6 py-4 text-sm"
                          value={patientReport.technology}
                          name="technology"
                        >
                          {row.technology}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <Tooltip placement="top" title="Enter Value">
                            <input
                              type="text"
                              className="w-14 border border-black rounded-lg placeholder-gray-300 pl-1"
                              onChange={(e) => handleChange(e, index)}
                              value={inputValues[index]}
                              name="value"
                            />
                          </Tooltip>
                        </td>
                        <td
                          className="px-6 py-4 text-sm "
                          value={patientReport.unit}
                          name="unit"
                        >
                          {row.units}
                        </td>
                        <td
                          className="px-6 py-4 text-sm"
                          value={patientReport.bioRefInterval}
                          name="price"
                        >
                          {row.bio}
                        </td>
                        <td className="px-6 py-4">
                          <button onClick={() => deleteRow(index)}>
                            <MdOutlineDelete size={25} color="red" />
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <button onClick={handleSave}>
                            <GiConfirmed size={25} color="green" />
                          </button>
                        </td>
                      </tr>
                    ))}

                    {updatedData.map((row, index) => (
                      <tr key={index} className="bg-white border-b ">
                        <th
                          scope="row"
                          className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap "
                          value={row.testName}
                          name="testName"
                        >
                          {row.testName}
                        </th>
                        <td
                          className="px-6 py-4 text-sm"
                          value={row.costOfDiagnosticTest}
                          name="price"
                        >
                          {row.costOfDiagnosticTest}
                        </td>
                        <td
                          className="px-6 py-4 text-sm"
                          value={patientReport.technology}
                          name="technology"
                        >
                          {row.technology}
                        </td>
                        <td className="px-6 py-4 text-sm " name="unit">
                          {row.value}
                        </td>
                        <td
                          className="px-6 py-4 text-sm "
                          value={patientReport.unit}
                          name="unit"
                        >
                          {row.unit}
                        </td>
                        <td
                          className="px-6 py-4 text-sm"
                          value={patientReport.bioRefInterval}
                          name="price"
                        >
                          {row.bioRefInterval}
                        </td>
                        {/* <td className="px-6 py-4">
                          <button onClick={() => deleteRow(index)}><MdOutlineDelete size={25} color="red" /></button>
                        </td> */}
                        {/* <td className="px-6 py-4">
                          <button onClick={handleSave}><GiConfirmed size={25} color="green" /></button>
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div
                style={{ gap: "", marginTop: "10px" }}
                class=" flex flex-row-reverse  w-full  "
              >
                <button
                  class="mx-4"
                  style={{
                    backgroundColor: "#89CFF0",
                    borderRadius: "23px",
                    padding: "2px 9px 2px 9px",
                    color: "white",
                  }}
                  onClick={() => navigate(`/billingprice`)}
                >
                  Go To Billing
                </button>
                <button
                  class="mx-4"
                  style={{
                    backgroundColor: "#89CFF0",
                    borderRadius: "23px",
                    padding: "2px 9px 2px 9px",
                    color: "white",
                  }}
                  onClick={() => navigate(`/summary`)}
                >
                  Lab Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
