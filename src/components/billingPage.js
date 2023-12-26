import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { Flex, Row, Select } from "antd";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import Modal from "react-responsive-modal";
import { ToastContainer, toast } from "react-toastify";

export default function BillingPage({ name, contactNo, gender, age })
{
  let isTab = useMediaQuery({ query: "(max-width: 768px)" });
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const onOpenModal = () => setOpen(true);
  const onCloseModall = () => setOpen(false);
  const [open, setOpen] = useState(false);
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

  return (
    <>
      <div style={{ margin: 0, minHeight: "100vh", width: "100%" }}>
        <div className="MainContainer" style={{ width: "100%" }}>
          <div
            className="Right_side"
            style={{
              boxSizing: "border-box",
              width: "25%",
              height: "75vh",
              float: "left",
              backgroundColor: "white",
              padding: "20px",
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

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "10px",
              }}
            >
              <div style={{ color: "gray", fontWeight: 500, width: "45%" }}>
                Gender
              </div>
              <div style={{ color: "gray", fontWeight: 500, width: "45%" }}>
                Age
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "5px",
              }}
            >
              <div style={{ color: "black", fontWeight: 500, width: "45%" }}>
                {localStorage.getItem("gender")}
              </div>
              <div style={{ color: "black", fontWeight: 500, width: "45%" }}>
                {localStorage.getItem("age")}
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

            <hr />
            <hr />

            <div>
              <p style={{ color: "gray", marginTop: "15px" }}>Billing Date</p>
              <input
                className="px-2 border h-10 rounded-lg"
                type="date"
                id="appointmentDate"
                name="date"
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

          <div
            className="Left_side"
            style={{
              boxSizing: "border-box",
              width: "72%",
              height: "75vh",
              float: "right",
              borderRadius: 20,
              backgroundColor: "white",
              padding: "20px",
            }}
          >
            <div class="relative overflow-x-auto">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Test/package
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      -
                    </th>
                    <td class="px-6 py-4">-</td>
                    <td class="px-6 py-4">-</td>
                  </tr>
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      -
                    </th>
                    <td class="px-6 py-4">-</td>
                    <td class="px-6 py-4">-</td>
                  </tr>
                  <tr class="bg-white dark:bg-gray-800">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      -
                    </th>
                    <td class="px-6 py-4">-</td>
                    <td class="px-6 py-4">-</td>
                  </tr>
                </tbody>
              </table>
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
                  class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                  type="button"
                >
                  All categories{" "}
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
                  class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
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
                <div class="relative w-full">
                  <input
                    type="search"
                    id="search-dropdown"
                    class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    placeholder="Search Mockups, Logos, Design Templates..."
                    required
                  />
                  <button
                    type="submit"
                    class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-gray-900 bg-gray-50 rounded-e-lg border border-gray-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                </div>
              </div>
            </form>

            <div
              className="Absolute_left"
              style={{
                width: "30%",
                float: "left",
                height: "30vh",
                borderRight: "0.5px solid #D3D3D3",
              }}
            >

              <p style={{ color: "gray" }}>Summary</p>


            </div>

            <div
              className="Absolute_left"
              style={{
                width: "35%",
                float: "left",
                height: "30vh",
                borderRight: "0.5px solid #D3D3D3",
                padding: '10px'

              }}
            >
              <div style={{ width: "50%", float: "left", display: 'flex', flexDirection: 'column', }}>
                <label style={{ fontSize: 12 }}>Discount (%) </label>
                <input
                  type="text"
                  style={{ border: "1px solid gray", width: "60%" }}
                />
              </div>

              <div style={{ width: "50%", float: "right", display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: 12 }}>Discount (%) </label>
                <input
                  type="text"
                  style={{ border: "1px solid gray", width: "60%" }}
                />
              </div>

              <div
                style={{
                  marginTop: "60px",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <p style={{ color: "gray", marginRight: "160px" }}>Amount</p>
                <p style={{ color: "black" }}>0</p>
              </div>

              <div
                style={{
                  marginTop: "15px",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <p style={{ color: "gray", marginRight: "155px" }}>Discount</p>
                <p style={{ color: "black" }}>0</p>
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
                    marginRight: "120px",
                    fontWeight: 500,
                  }}
                >
                  Total Amount
                </p>
                <p style={{ color: "black" }}>0</p>
              </div>
            </div>

            <div

              className="middle"
              style={{
                width: "30%",
                height: "30vh",
                float: "left",
                // borderRight: "0.5px solid #D3D3D3",
              }}
            >
              <div style={{ width: "100%", marginLeft: "30px" }}>
                <input type="checkbox" />
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
                  }}
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
                    marginRight: "80px",
                    fontWeight: 500,
                    marginLeft: "20px",
                  }}
                >
                  Due Amount
                </p>
                <p style={{ color: "black" }}>0</p>
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
