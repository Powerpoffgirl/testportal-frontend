import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import { useMediaQuery } from "react-responsive";
import AdminSidebar from "./adminSidebar";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";

export default function Qr() {
  let isTab = useMediaQuery({ query: "(max-width: 768px)" });
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [name, setName] = useState("");
  const [userDetails, setUserDetails] = useState(null);

  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getQRCode = async () => {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `${baseUrl}/api/v1/admin/get_doctor/${id}`,
            {
              method: "GET",
              headers: {
                "x-auth-token": token,
              },
            }
          );
          const data = await response.json();
          setUserDetails(data.data);
          console.log("registered data", userDetails);
          console.log("address", userDetails.address.houseNo);
        } catch (error) {
          console.error("Error:", error);
        }
      };

      fetchData();

      try {
        const token = localStorage.getItem("token");
        const id = localStorage.getItem("id");
        if (!token) {
          console.error("No token found in local storage");
          return;
        }
        const response = await fetch(`${baseUrl}/api/v1/admin/list_doctors`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token, // Replace with your actual token from the previous session
          },
        });

        const data = await response.json();
        console.log("DATA from response", data.data);
        const doctorDetails = data.data.find((doctor) => doctor._id === id);
        console.log("DOCTOR DETAILS", doctorDetails.qrCodeUrl);
        setQrCodeUrl(doctorDetails.qrCodeUrl);
        setName(doctorDetails.name);
      } catch (error) {
        console.error("There was an error verifying the OTP:", error);
      }
    };
    getQRCode();
  }, []);

  const handleDownload = () => {
    // Create a new anchor element
    const element = document.createElement("a");
    element.href = `${qrCodeUrl}`;
    element.download = `${name}_QRCode`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  function abbreviateAndCombineDays(days) {
    const weekDays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const dayIndexes = days.map((day) => weekDays.indexOf(day));
    let combinedDays = [];
    let i = 0;

    while (i < dayIndexes.length) {
      let startDay = weekDays[dayIndexes[i]].substring(0, 3);
      let endDayIndex = i;

      while (
        endDayIndex < dayIndexes.length - 1 &&
        dayIndexes[endDayIndex + 1] === dayIndexes[endDayIndex] + 1
      ) {
        endDayIndex++;
      }

      let endDay = weekDays[dayIndexes[endDayIndex]].substring(0, 3);

      if (i === endDayIndex) {
        combinedDays.push(startDay);
      } else {
        combinedDays.push(`${startDay}-${endDay}`);
      }

      i = endDayIndex + 1;
    }

    return combinedDays.join(" ");
  }

  const workingDays =
    userDetails && userDetails.workingDays
      ? abbreviateAndCombineDays(userDetails.workingDays)
      : "";

  console.log("WORKING DAYS", workingDays);
  console.log(userDetails?.email?.length);
  return (
    <>
      <div>
        <div
          className=" bg-customGreen "
          style={{
            paddingRight: "3%",
          }}
        >
          <div className="flex flex-col lg:flex-row ">
            {/* --------------left-------------- */}
            <div className="flex flex-col border bg-white w-11/12 lg:w-11/12 p-6 my-5 mr-5">
              <div className="mx-auto my-2">
                <div className=" ">
                  <div
                    className=" border w-36 mx-auto rounded-full"
                    style={{ backgroundColor: "#B1DAED" }}
                  >
                    {userDetails?.doctorPic ? (
                      <img
                        src={userDetails?.doctorPic}
                        alt="Avatar"
                        style={{
                          borderRadius: "50%",
                          width: "130px",
                          height: "130px",
                        }}
                      />
                    ) : (
                      <PermIdentityOutlinedIcon
                        style={{
                          width: "auto",
                          height: "auto",
                          color: "white",
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* -------name------- */}
              <div className="mt-3 flex flex-row">
                <p className="block text-black text-lg font-semibold mr-1">
                  Name :
                </p>
                <p className="block text-black text-lg ">{userDetails?.name}</p>
              </div>

              {/* ------------email------------ */}
              <div className="mt-3 flex flex-row">
                <p className="block text-black text-lg font-semibold mr-1">
                  Email :
                </p>
                <p className="block text-black text-lg">
                  {/* {userDetails?.email.length > 26
                    ? userDetails?.email.slice(0, 26) + "..."
                    : userDetails?.email} */}
                  {userDetails?.email}
                </p>
              </div>
              {/* -----------contact----------- */}
              <div className="mt-3 flex flex-row">
                <p className="block text-black text-lg font-semibold mr-1">
                  Mobile Number :
                </p>
                <p className="block text-black text-lg ">
                  {" "}
                  {userDetails?.contactNumber}
                </p>
              </div>

              <div className="mt-3 flex flex-row">
                <p className="block text-black text-lg font-semibold mr-1">
                  Working Days :
                </p>
                <p className=" text-black text-lg flex flex-wrap">
                  {workingDays.split(" ").map((day) => (
                    <p className="mr-1">{day}</p>
                  ))}
                </p>
              </div>

              <div className="mt-3 flex flex-row">
                <p className="block text-black text-lg font-semibold mr-1">
                  Working Hours :
                </p>
                <p className="block text-black text-lg ">
                  {userDetails?.workingHours?.workHourFrom} -{" "}
                  {userDetails?.workingHours?.workHourTo}
                </p>
              </div>

              <div className=" mt-3 flex flex-row">
                <p className="block text-black text-lg font-semibold mr-1">
                  Total Experience :
                </p>
                <p className="block text-black text-lg ">
                  {userDetails?.totalExperience}
                </p>
              </div>

              {/* <div className="mt-3 flex flex-row">
                <p className="block text-black text-lg font-semibold mr-1">
                  Specialist:
                </p>
                <p className="block text-black text-lg ">
                  {userDetails?.speciality.map((sp) => (
                    <p>{sp}</p>
                  ))}
                </p>
              </div> */}

              {/* <div className="mt-3 flex flex-row">
                <p className="block text-black text-lg font-semibold mr-1">
                  Degree:
                </p>

                <p className=" text-black text-lg flex flex-row flex-wrap">
                  {userDetails?.degree.split(" ").map((item, index) => {
                    return (
                      <>
                        <p className="mr-3">{item}</p>
                      </>
                    );
                  })}
                </p>
              </div> */}

              {/* -----------address----------- */}
              <div className="mt-3 flex flex-row">
                <p className="block text-black text-lg font-semibold mr-1">
                  Address:
                </p>

                <div class="flex flex- overflow-hidden">
                  <p className=" text-black text-lg flex flex-wrap">
                    {userDetails?.address?.houseNo && (
                      <p>{userDetails?.address?.houseNo}</p>
                    )}
                    {userDetails?.address?.floor && (
                      <p>, {userDetails?.address?.floor}</p>
                    )}
                    {userDetails?.address?.block && (
                      <p>, {userDetails?.address?.block}</p>
                    )}
                    {userDetails?.address?.area && (
                      <p>, {userDetails?.address?.area}</p>
                    )}

                    {userDetails?.address?.district && (
                      <p>, {userDetails?.address?.district}</p>
                    )}
                    {userDetails?.ddress?.state && (
                      <p>, {userDetails?.ddress?.state}</p>
                    )}
                    {userDetails?.address?.pinCode && (
                      <p>, {userDetails?.address?.pinCode}</p>
                    )}

                    {/* {" "} {userDetails?.address?.houseNo} {userDetails?.address?.floor} {userDetails?.address?.block} {userDetails?.address?.pinCode}, {userDetails?.address?.area} ,{userDetails?.address?.district} ,{userDetails?.ddress?.state} */}
                  </p>
                </div>
              </div>
            </div>

            {/* ----------------------------------right---------------------------------- */}
            <div className=" bg-white flex flex-col w-11/12 lg:w-11/12 p-6 my-5  ">
              <div class="">
                <p class=" flex">
                  <text
                    className="  mx-auto text-center "
                    style={{
                      fontWeight: 600,
                      fontSize: isTab ? "20px" : "24px",
                      lineHeight: "28.8px",
                      fontFamily: "Lato, sans-serif",
                    }}
                  >
                    Generate Personal QR
                  </text>
                </p>
                <p class="flex mx-auto  ">
                  {qrCodeUrl && (
                    <img src={qrCodeUrl} class=" w-1/2 mx-auto" alt="QR Code" />
                  )}
                </p>
              </div>

              <div className="flex mx-auto mt-5 my-2 ">
                <button
                  className="btn btn-primary border py-3 px-4 rounded-3xl text-white"
                  style={{ backgroundColor: "#89CFF0" }}
                  onClick={handleDownload}
                >
                  {" "}
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
