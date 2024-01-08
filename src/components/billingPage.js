import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { Flex, Row, Select } from "antd";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import Modal from "react-responsive-modal";
import { ToastContainer, toast } from "react-toastify";
import { MdOutlineDelete } from "react-icons/md";

export default function BillingPage({ name, contactNo, gender, age })
{
  let isTab = useMediaQuery({ query: "(max-width: 768px)" });
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [searchTerm, setSearchTerm] = useState('');
  const [isListOpen, setIsListOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const onOpenModal = () => setOpen(true);
  const onCloseModall = () => setOpen(false);
  const [open, setOpen] = useState(false);
  const [tests, setTests] = useState([]);
  const [filteredTest, setFilteredtest] = useState([]);
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

    console.log("all tests =======", tests)

    const filtered = tests.filter((tests) =>
      tests?.testName?.toLowerCase().includes(searchTerm)
    );
    setFilteredtest(filtered);
    console.log("filtered value", filteredTest);
  };


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
          localStorage.clear()
          navigate(`/doctorlogin`)
        }
        const response = await fetch(`${baseUrl}/api/v1/doctor/getall_testBooking`, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        });

        const data = await response.json();
        console.log("DATA from USE EFFECT response List Lab Patient", data?.data)
        setTests(data?.data);

      } catch (error)
      {
        console.error('There was an error verifying the OTP:', error);
      }
    }
    fetchPatientDetails()
  }, [])

  const [tableData, setTableData] = useState([

  ]);




  const handleTestAdd = (testId, cost) => () =>
  {

    const testToAdd = {
      testPackage: testId,
      price: cost,
      action: <MdOutlineDelete />,
    };

    setTableData([...tableData, testToAdd]);


    setSearchTerm('');

    setIsListOpen(false)

  };




  const deleteRow = (index) =>
  {

    const updatedTableData = [...tableData];

    updatedTableData.splice(index, 1);


    setTableData(updatedTableData);
  }
  const addRow = () =>
  {
    setTableData([...tableData, { testPackage: '-', price: '-', action: '-' }]);
  };

  const calculateTotalPrice = () =>
  {
    let totalPrice = 0;

    tableData.forEach((row) =>
    {
      // Assuming price is a number, you might need to parse it if it's a string
      totalPrice += row.price
    });

    return totalPrice;
  };

  const getTestNames = () =>
  {
    return tableData.map((row) => row.testPackage).join(', ');
  };


  const currentDate = new Date();

  // Format the date as YYYY-MM-DD
  const formattedDate =
    currentDate.getFullYear() +
    '-' +
    ('0' + (currentDate.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + currentDate.getDate()).slice(-2);

  // State to manage the date

  const [appointmentDate, setAppointmentDate] = useState(formattedDate);



  const Toggle = (e) =>
  {

    e.preventDefault();

    setIsListOpen(true);
  }





  return (
    <>
      <div class="flex">
        <div className="MainContainer flex lg:flex-row flex-col w-full" >
          {/* --------------------left side-------------------- */}
          <div className=" mb-3 flex flex-col w-full lg:min-h-3/4 lg:w-3/12 p-6 mr-5 bg-white "
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
              2312119001
            </p>

            <div class="flex flex-row mt-3 space-x-5" >
              <div>
                <div style={{ color: "gray", fontWeight: 500, }}>
                  Gender
                </div>
                <div style={{ color: "black", fontWeight: 500 }}>
                  {localStorage.getItem("gender")}
                </div>
              </div>
              <div>
                <div style={{ color: "gray", fontWeight: 500, }}>
                  Age
                </div>
                <div style={{ color: "black", fontWeight: 500 }}>
                  {localStorage.getItem("age")}
                </div>
              </div>
            </div>
            {/* <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "5px",
              }}
            >
              <div style={{ color: "black", fontWeight: 500 }}>
                {localStorage.getItem("gender")}
              </div>
              <div style={{ color: "black", fontWeight: 500 }}>
                {localStorage.getItem("age")}
              </div>
            </div> */}

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
          <div className=" lg:w-8/12 p-6 w-full bg-white lg:min-h-3/4"
            style={{
              boxSizing: "border-box ",
              // height: "75vh",
              // float: "right",
              borderRadius: 20,
              // backgroundColor: "white",
            }}
          >
            {/* table */}
            <div style={{ overflowY: 'auto' }}>
              <div className=" overflow-x-auto mb-10">
                <table className=" text-sm text-left rtl:text-right text-gray-500 w-full">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-black text-sm font-semibold">
                        Test/package
                      </th>
                      <th scope="col" className="px-6 py-3 text-black text-sm font-semibold">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-black text-sm font-semibold">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row, index) => (
                      <tr key={index} className="bg-white border-b ">
                        <th
                          scope="row"
                          className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap "
                        >
                          {row.testPackage}
                        </th>
                        <td className="px-6 py-4 text-sm">{row.price}</td>
                        <td className="px-6 py-4">
                          <button onClick={() => deleteRow(index)}><MdOutlineDelete size={25} color="red" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

              </div>

            </div>

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
                  class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
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
                    type="search"
                    id="search-dropdown"
                    class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search by TestName or TestCode..."
                    required
                  />
                  <button
                    onClick={Toggle}
                    class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-gray-900 bg-gray-50 rounded-e-lg border border-gray-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
                  >
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
                      <ul style={{ width: '80%' }} className=" absolute divide-y divide-gray-200 bg-white">
                        {filteredTest.map((test) => (
                          <li key={test.id} className="p-4">
                            <div onClick={handleTestAdd(test.testName, test.costOfDiagnosticTest)} className="font-bold">
                              {test.testName}
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}

                  </div>

                </div>
              </div>
            </form>
            <div class="flex xl:flex-row flex-col">
              {/* ------------1st------------ */}
              <div className="xl:w-1/3 w-full  xl:border-r border-gray-300"
              // style={{
              //   overflowY: 'auto'
              // }}
              >

                <p style={{ color: "gray" }}>Summary</p>

                <div style={{ marginRight: 10 }}  >

                  <table style={{ borderCollapse: 'collapse' }} className="border-collapse w-full">
                    <thead>
                      <tr>
                        <th style={{ border: '1px solid #ddd' }} className="border p-2 text-left">Test </th>
                        <th style={{ border: '1px solid #ddd' }} className="border p-2  text-left">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((row, index) => (
                        <tr key={index}>
                          <td style={{ border: '1px solid #ddd' }} className="border p-2  text-left">{row.testPackage}</td>
                          <td style={{ border: '1px solid #ddd' }} className="border p-2 text-left">{row.price}</td>
                        </tr>
                      ))}
                      <tr >
                        <td style={{ border: '1px solid #ddd' }} className="border p-2 font-bold  text-left">Total Price</td>
                        <td style={{ border: '1px solid #ddd' }} className="border p-2 font-bold  text-left">{calculateTotalPrice()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>
              {/* ------------2nd------------ */}
              <div className="Absolute_left xl:w-1/3 w-full mt-3 xl:border-r border-gray-300"
                style={{
                  padding: '10px'

                }}
              >
                <table style={{ borderCollapse: 'collapse' }} className="border-collapse w-full">
                  <thead>
                    <tr>
                      <th style={{ border: '1px solid #ddd' }} className="border p-2 text-left">Discount (%)  </th>
                      <th style={{ border: '1px solid #ddd' }} className="border p-2  text-left">Discount (%) </th>
                    </tr>
                  </thead>
                  <tbody>

                    <tr>
                      <td style={{ border: '1px solid #ddd' }} className="border p-2  text-left">Amount</td>
                      <td style={{ border: '1px solid #ddd' }} className="border p-2 text-left">{calculateTotalPrice()}</td>
                    </tr>
                    <tr>
                      <td style={{ border: '1px solid #ddd' }} className="border p-2  text-left">Discount</td>
                      <td style={{ border: '1px solid #ddd' }} className="border p-2 text-left">0</td>
                    </tr>

                    <tr >
                      <td style={{ border: '1px solid #ddd' }} className="border p-2 font-bold  text-left">Total Amount</td>
                      <td style={{ border: '1px solid #ddd' }} className="border p-2 font-bold  text-left">{calculateTotalPrice()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* ------------3rd------------ */}
              <div className="middle xl:w-1/3 w-full"
                style={{
                  // width: "30%",
                  height: "30vh",
                  // float: "left",
                  // borderRight: "0.5px solid #D3D3D3",
                }}
              >
                <div style={{ width: "100%", marginLeft: "30px", marginTop: 20 }}>
                  <input type="checkbox" disabled={true}
                    checked={true} />
                  <label>Due Payment</label>
                </div>

                <div style={{ marginTop: "15px" }}>
                  <p
                    style={{
                      color: "gray",
                      marginRight: "100px",
                      marginLeft: "20px",
                    }}
                  >
                    Paid Amount
                  </p>
                  <input
                    type="text"
                    style={{
                      border: "1px solid gray",
                      width: "50%",
                      marginLeft: "20px",
                      textAlign: "center"
                    }}
                    disabled={true}
                    value={0}
                  />
                </div>

                <div
                  style={{
                    marginTop: "15px",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <p
                    style={{
                      color: "black",
                      marginRight: "20%",
                      fontWeight: 500,
                      marginLeft: "20px",
                      marginTop: '33px'

                    }}
                  >
                    Due Amount
                  </p>
                  <p style={{ color: "black", marginTop: '33px' }}>{calculateTotalPrice()}</p>
                </div>
              </div>
            </div>
            {/* <div className="Absolute_Right">
              <div style={{ margin: "20px", marginBottom: "10px" }}>
                <label style={{ marginLeft: "20px" }}>Payment Method</label>
              </div>

              <div style={{ width: "25%", float: "left", marginLeft: "20px" }}>
                <div
                  style={{
                    marginBottom: "10px",
                    padding: "8px 12px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                    backgroundColor:
                      selectedMethod === "cash" ? "#f0f0f0" : "white",
                  }}
                  onClick={() => handleMethodClick("cash")}
                >
                  Cash
                </div>

                <div
                  style={{
                    marginBottom: "10px",
                    padding: "8px 12px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                    backgroundColor:
                      selectedMethod === "UPI" ? "#f0f0f0" : "white",
                  }}
                  onClick={() => handleMethodClick("UPI")}
                >
                  UPI
                </div>

                <div
                  style={{
                    padding: "8px 12px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                    backgroundColor:
                      selectedMethod === "Card" ? "#f0f0f0" : "white",
                  }}
                  onClick={() => handleMethodClick("Card")}
                >
                  Card
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
