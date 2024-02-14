import React, { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useReactToPrint } from "react-to-print";

export default function MedicialHistory()
{
  let isTab = useMediaQuery({ query: "(max-width: 768px)" });
  const navigate = useNavigate();
  const location = useLocation();
  console.log("LOCATION STATE", location.state)
  const patientId = location?.state?.patientId
  const componentPDF = useRef();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [appointmentList, setAppointmentList] = useState([]);
  const [filteredAppointmentList, setFilteredAppointmentList] = useState([appointmentList]);

  const handleButtonClick = (appointment) =>
  {
    console.log("appointment", appointment);

    const reportUrl = appointment.appointmentReport[0]; // Assuming this is the URL of the report
    const link = document.createElement("a");
    link.href = reportUrl;
    link.setAttribute("download", "report.pdf"); // Change 'report.pdf' to whatever name you want the downloaded file to have
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  const [patient, setPatient] = useState({});
  const generatePdf = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "userReport",
  });

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
          return;
        }
        const response = await fetch(
          `${baseUrl}/api/v1/user/get_all_appointments`,
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
        if (data.success)
        {
          console.log("PATIENT ID", patientId)
          const filteredAppointments = data?.data.filter((appointment) =>
          {
            return appointment.patientId._id == patientId;
          });

          setAppointmentList(data?.data);
          setFilteredAppointmentList(filteredAppointments)
        }
        else if (data.message === "Invalid or expired token")
        {
          toast.error("Invalid or expired token");
          navigate("/userlogin");
          localStorage.clear();
        }


      } catch (error)
      {
        console.error("There was an error verifying the OTP:", error);
      }
    };
    fetchPatientDetails();
  }, []);

  console.log("appointmentlist", appointmentList);
  console.log("FILTERED APPOINTMENT LIST", filteredAppointmentList)
  console.log("patient", patient);



  return (
    <>
      <ToastContainer />
      <div class=" flex flex-col ">
        <div className=" overflow-x-auto xl:max-w-6xl 2xl:w-full lg:max-w-2xl  md:max-w-md max-w-xs mx-auto lg:mx-0 mb-10 mt-5">
          <table className=" divide-y divide-gray-200 ">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-base font-medium text-black uppercase tracking-wider">
                  Dr. Name
                </th>
                <th className="px-6 py-3 text-left text-base font-medium text-black uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-base font-medium text-black uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-base font-medium text-black uppercase tracking-wider">
                  Issues
                </th>
                <th className="px-6 py-3 text-left text-base font-medium text-black uppercase tracking-wider">
                  Disease
                </th>
                <th className="px-6 py-3 text-left text-base font-medium text-black uppercase tracking-wider">
                  Medicine Name
                </th>
                <th className="px-6 py-3 text-left text-base font-medium text-black uppercase tracking-wider">
                  Lab Test
                </th>
                <th className="px-6 py-3 text-left text-base font-medium text-black uppercase tracking-wider">
                  Report
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAppointmentList?.map((history, index) => (
                <tr key={index}>
                  <td className=" px-6 py-4 whitespace-nowrap text-sm  text-gray-900">
                    {history?.doctorId?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black ">
                    {history?.appointmentDate?.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    {history?.appointmentDate?.time}
                  </td>
                  <td
                    // className="w-52 px-6 py-4 whitespace-nowrap text-sm text-black"
                    className="w-[300px] px-6 py-4 whitespace-normal text-sm text-black break-words"
                    style={{ wordWrap: "break-word" }}
                  >
                    {history?.issues?.join(", ")}
                  </td>
                  <td
                    // className="w-52 px-6 py-4 whitespace-nowrap text-sm text-black"
                    className="w-[300px] px-6 py-4 whitespace-normal text-sm text-black break-words"
                    style={{ wordWrap: "break-word" }}
                  >
                    {history?.diseases?.join(", ")}
                  </td>
                  <td
                    className="w-[300px] px-6 py-4 whitespace-normal text-sm text-black break-words"
                    style={{ wordWrap: "break-word" }}
                  // className="w-52 px-6 py-4 whitespace-nowrap text-sm text-black"
                  >
                    {history?.medicineName?.join(", ")}
                  </td>
                  <td
                    className="w-[300px] px-6 py-4 whitespace-normal text-sm text-black break-words"
                    style={{ wordWrap: "break-word" }}
                  // className="w-52 px-6 py-4 whitespace-nowrap text-sm text-black"
                  >
                    {history?.labTests?.join(", ")}
                  </td>
                  <td
                    className="w-[300px] px-6 py-4 whitespace-normal text-sm text-black break-words"
                    style={{ wordWrap: "break-word" }}
                  >
                    {/* Uncomment this if you want to display history.labTests */}
                    {/* {history?.labTests?.join(", ")} */}

                    {/* Centered Button */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%", // Ensure the div takes the full height of the table cell
                      }}
                    >
                      <button
                        class="align-items-left rounded-full px-4 sm:px-6 py-1 sm:py-2 text-[#89CFF0] border border-[#89CFF0] text-xs sm:text-sm hover:bg-[#89CFF0] hover:text-white"
                        onClick={() => handleButtonClick(history)}
                      >
                        Download
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
