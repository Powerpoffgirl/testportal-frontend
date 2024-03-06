import React, { useState, useEffect, useRef, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { MdOutlineDelete } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { useReactToPrint } from "react-to-print";
import { Tooltip } from "antd";
import UserContext from "./userContext";
import { TiTick } from "react-icons/ti";

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
  const dateString = localStorage.getItem("dateString");
  const [userDetailsPic, setUserDetailsPic] = useState();
  // const [index, setIndex] = useState(0);
  const [appointmentDate, setAppointmentDate] = useState(getCurrentDate());
  const location = useLocation();
  const { patient } = location.state || {}; // Defaulting to an empty object if state is undefined
  const [testlist, setTestlist] = useState([]);
  const [patientReport, setPatientReport] = useState({
    testAsked: [],
    // patientId: "",
  });
  const [patientDetails, setPatientDetails] = useState({
    medicineName: [],
    issues: [],
    diseases: [],
    labTests: [],
  });
  const [testAdded, setTestAdded] = useState([]);

  const [selectedMethod, setSelectedMethod] = useState(null);

  const handleMethodClick = (method) =>
  {
    setSelectedMethod(method);
  };

  const handleSearch = (event) =>
  {
    event.preventDefault()
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
          `${baseUrl}/api/v1/lab/getall_testBooking`,
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
      id,
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
          id: id,
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
        setTableData([...tableData, testToAdd]);

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

  useEffect(() =>
  {
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

    calculateTotalPrice();
  }, []);

  const getTestNames = () =>
  {
    return tableData?.map((row) => row.testPackage).join(", ");
  };

  const currentDate = new Date();

  // Format the date as YYYY-MM-DD
  const formattedDate =
    currentDate.getFullYear() +
    "-" +
    ("0" + (currentDate.getMonth() + 1))?.slice(-2) +
    "-" +
    ("0" + currentDate.getDate())?.slice(-2);

  // State to manage the date

  // const [appointmentDate, setAppointmentDate] = useState(dateString);

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

  const handleChange = (e, index) =>
  {
    const { name, value, key } = e.target;

    if (key === "Enter" && name === "value")
    {
      const newInputValues = [...inputValues];
      newInputValues[index] = value;

      setInputValues(newInputValues);

      console.log("value is been setted", inputValues);
    }
  };

  const handleBlur = (e, index) =>
  {
    const patientId = localStorage.getItem("selectedPatientId");
    const { value } = e.target;
    const newInputValues = [...inputValues];
    console.log("INPUT VALUES=====", inputValues);
    newInputValues[index] = value;
    setInputValues(inputValues);

    const testId = tableData[index]?.id;

    setPatientReport((prevPatientReport) =>
    {
      return {
        ...prevPatientReport,
        testAsked: [
          ...prevPatientReport.testAsked,
          { id: testId, value: value, date: appointmentDate },
        ],
      };
    });
  };

  const handleSave = async (e) =>
  {
    try
    {
      const patientId = localStorage.getItem("selectedPatientId");
      console.log("consoling value", patientReport);
      console.log("consoling value AFTER POP", patientReport);

      const token = localStorage.getItem("token");
      const response = await fetch(
        `${baseUrl}/api/v1/lab/update_labPatient/${patient?._id}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
          body: JSON.stringify(patientReport),
        }
      );

      const responseData = await response.json();
      console.log("DATA from response", responseData);
      setTestAdded(responseData.testAsked);
      setTestlist(responseData?.data?.testAsked);
      e.target.value = "";
      if (appointmentDate)
      {
        toast.success("Saved");
        navigate(`/summary`, {
          state: {
            reportDate: appointmentDate,
            patient: patient,
            testAsked: patientReport,
            responseData: responseData,
          },
        });
      } else
      {
        toast.error("please select a date");
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
          `${baseUrl}/api/v1/lab/getall_testBooking`,
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

    const fetchPatientHistory = async () =>
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
          `${baseUrl}/api/v1/lab/get_labPatient/${patient?._id}`,
          {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token,
            },
          }
        );

        const responseData = await response.json();
        if (responseData.success)
        {
          setupdatedData(responseData?.data?.testAsked)
        }
        console.log("DATA from response from table ", responseData);
      } catch (error)
      {
        console.error("There was an error fetching test details:", error);
      }
    };

    fetchTestDetails();
    fetchPatientHistory();
  }, []);


  updateUser(userDetailsName);
  updateUserEmail(userDetailsEmail);
  updateUserimage(userDetailsPic);

  console.log("row =====", tableData);
  console.log("patient Report ====", patientReport);

  // Function to get the current date in the format 'YYYY-MM-DD'
  function getCurrentDate()
  {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  console.log("APPOINTMENT DATE", appointmentDate);

  const [discountValue, setDiscountValue] = useState("");

  const handleInputChange = (e) =>
  {
    setDiscountValue(e.target.value);
  };

  const handleSubmit = (e) =>
  {
    e.preventDefault();
    toast.success("Discount applied");
    console.log("Discount value:", discountValue);
  };

  return (
    <>
      <div class="flex" ref={componentPDF}>
        <div className="MainContainer flex lg:flex-row flex-col w-full sm:ml-0">
          {/* --------------------left side-------------------- */}
          <div
            className={` mb-3 flex flex-col w-5/12 lg:min-h-3/4 lg:w-3/12 p-6  bg-white md:w-1/2  sm:w-1/2 md:ml-5 ${xsview ? "" : "ml-10"
              }  `}
            style={{
              borderRadius: 20,
            }}
          >
            <p style={{ textDecoration: "underline", color: "gray" }}>
              Patient Details
            </p>
            <p style={{ color: "black", fontWeight: 500, marginTop: "10px" }}>
              {patient?.name}
            </p>
            <p style={{ color: "black", fontWeight: 500, marginTop: "10px" }}>
              {patient?.registrationNo}
            </p>

            <div class="flex flex-row mt-3 space-x-5">
              <div>
                <div style={{ color: "gray", fontWeight: 500 }}>Gender</div>
                <div style={{ color: "black", fontWeight: 500 }}>
                  {patient?.gender}
                </div>
              </div>
              <div>
                <div style={{ color: "gray", fontWeight: 500 }}>Age</div>
                <div style={{ color: "black", fontWeight: 500 }}>
                  {patient?.age}
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
                {patient?.phoneNo}
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
                {patient?.refBy}
              </p>
            </div>

            <hr />
            <hr />

            <div>
              <p style={{ color: "gray", marginTop: "15px" }}>Lab Tests Date</p>
              <input
                className="px-2 border h-10 rounded-lg w-50"
                type="date"
                id="appointmentDate"
                name="date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
              />
            </div>
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

                  <button class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-gray-900 bg-gray-50 rounded-e-lg border border-gray-300 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                    <svg
                      class="w-4 h-4"
                      style={{ color: "black" }}
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
                        style={{
                          width: "95%",
                          height: "150px",
                          overflowY: "auto",
                        }}
                        className=" absolute divide-y divide-gray-200 bg-white shadow-md"
                      >
                        {filteredTest?.map((test) => (
                          <li key={test?.id} className="p-2 border border-1">
                            <div
                              onClick={handleTestAdd(
                                test?._id,
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
                              className="text-sm font-medium text-gray-900"
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
                className="flex flex-col overflow-x-auto overflow-y-auto "
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
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-black text-sm font-semibold"
                      >
                        {/* Delete */}
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
                              onBlur={(e) => handleBlur(e, index)}
                              value={inputValues[index]}
                              name="value"
                              onKeyDown={(e) => handleChange(e, index)}
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
                        {/* <td className="px-6 py-4">
                          <button onClick={handleSave}>
                            <GiConfirmed size={25} color="green" />
                          </button>
                        </td> */}
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
                          {row?.id?.testName}
                        </th>
                        <td
                          className="px-6 py-4 text-sm"
                          value={row.costOfDiagnosticTest}
                          name="price"
                        >
                          {row?.id?.costOfDiagnosticTest}
                        </td>
                        <td
                          className="px-6 py-4 text-sm"
                          value={patientReport.technology}
                          name="technology"
                        >
                          {row?.id?.technology}
                        </td>
                        <td className="px-6 py-4 text-sm " name="unit">
                          {row?.value}
                        </td>
                        <td
                          className="px-6 py-4 text-sm "
                          value={patientReport.unit}
                          name="unit"
                        >
                          {row?.id?.unit}
                        </td>
                        <td
                          className="px-6 py-4 text-sm"
                          value={patientReport.bioRefInterval}
                          name="price"
                        >
                          {row?.id?.bioRefInterval}
                        </td>
                        <td className="px-6 py-4">
                          {row?.date
                            ?.slice(0, 10)
                            .split("-")
                            .reverse()
                            .join("-")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div class="mt-3  ">
                <form onSubmit={handleSubmit}>
                  <label>
                    Discount(%) :
                    <input
                      type="number"
                      value={discountValue}
                      onChange={handleInputChange}
                      className="w-52 h-10 border border-gray-300 rounded-lg pl-2 text-center placeholder-gray-300 mx-3 text-sm"
                      style={{ maxWidth: "110px" }}
                      placeholder="Enter discount"
                    />
                  </label>
                  <Tooltip title="Discount">
                    <button
                      type="submit"
                      style={{
                        border: "none",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                      }}
                    >
                      <TiTick
                        style={{
                          height: "40px",
                          width: "40px",
                          backgroundColor: "#89CFF0",
                          borderRadius: "20px",
                          marginTop: "20px",
                          marginBottom: "-15px",
                          padding: "2px",
                          color: "white",
                        }}
                      />
                    </button>
                  </Tooltip>
                </form>
              </div>
              <div
                style={{ gap: "", marginTop: "10px" }}
                class=" flex flex-row-reverse  w-full  "
              >

                <button
                  class="mx-4"
                  style={{
                    height: "40px",
                    width: "120px",
                    backgroundColor: "#89CFF0",
                    borderRadius: "20px",
                    marginTop: "20px",
                    padding: "2px",
                    color: "white",
                  }}
                  onClick={handleSave}
                >
                  Process
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
