import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import { useMediaQuery } from "react-responsive";
import AdminSidebar from "./adminSidebar";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";

export default function Qr()
{
  let isTab = useMediaQuery({ query: "(max-width: 768px)" });
  const baseUrl = process.env.REACT_APP_BASE_URL
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [name, setName] = useState("")
  const [userDetails, setUserDetails] = useState(null);

  const id = localStorage.getItem('id')
  const token = localStorage.getItem('token')

  useEffect(() =>
  {
    const getQRCode = async () =>
    {

      const fetchData = async () =>
      {
        try
        {
          const response = await fetch(`${baseUrl}/api/v1/admin/get_doctor/${id}`, {
            method: "GET",
            headers: {
              "x-auth-token": token,
            },
            // body: JSON.stringify(doctorDetails),
          });
          const data = await response.json();
          setUserDetails(data.data);
          console.log("registered data", userDetails)
          console.log("address", userDetails.address.houseNo)
        } catch (error)
        {
          console.error('Error:', error);
        }
      };

      fetchData();


      try
      {
        const token = localStorage.getItem("token");
        const id = localStorage.getItem("id")
        if (!token)
        {
          console.error("No token found in local storage");
          return;
        }
        const response = await fetch(`${baseUrl}/api/v1/admin/list_doctors`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token // Replace with your actual token from the previous session
          }
        });

        const data = await response.json();
        console.log("DATA from response", data.data)
        const doctorDetails = data.data.find(doctor => doctor._id === id);
        console.log("DOCTOR DETAILS", doctorDetails.qrCodeUrl)
        setQrCodeUrl(doctorDetails.qrCodeUrl)
        setName(doctorDetails.name)
      } catch (error)
      {
        console.error('There was an error verifying the OTP:', error);
      }
    }
    getQRCode()
  }, [])

  const handleDownload = () =>
  {
    // Create a new anchor element
    const element = document.createElement("a");
    element.href = `${qrCodeUrl}`;
    element.download = `${name}_QRCode`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <>
      <div
      >
        <div
          className=" bg-customGreen "
          style={{

          }}
        >


          <div className="flex flex-col lg:flex-row ">
            {/* --------------left-------------- */}
            <div className="flex flex-col border bg-white w-2/3 lg:w-1/3 p-6 my-5 mr-5">



              <div className="mx-auto my-2">
                <div className=" " >
                  <div className=" border w-36 mx-auto rounded-full" style={{ backgroundColor: '#B1DAED' }}>
                    {userDetails?.doctorPic ? (
                      <img
                        src={userDetails?.doctorPic}
                        alt="Avatar"
                        style={{
                          borderRadius: "50%",
                          width: '130px',
                          height: '130px'
                        }}
                      />
                    ) : (
                      <PermIdentityOutlinedIcon
                        style={{ width: "auto", height: 'auto', color: 'white' }}
                      />
                    )}
                  </div>
                </div>


              </div>

              {/* -------name------- */}
              <div className="mt-3 flex flex-row">
                <p
                  className="block text-black text-lg font-semibold"
                >
                  Name :
                </p>
                <p className="block text-black text-lg "> {userDetails?.name}</p>
              </div>

              {/* ------------email------------ */}
              <div className="mt-3 flex flex-row">
                <p
                  className="block text-black text-lg font-semibold"
                >
                  Email :
                </p>
                <p className="block text-black text-lg "> {userDetails?.email}</p>
              </div>
              {/* -----------contact----------- */}
              <div className="mt-3 flex flex-row">
                <p
                  className="block text-black text-lg font-semibold"
                >
                  Mobile Number :
                </p>
                <p className="block text-black text-lg "> {userDetails?.contactNumber}</p>
              </div>

              <div className="mt-3 flex flex-row">
                <p className="block text-black text-lg font-semibold" >Working Days :</p>
                <p className=" text-black text-lg flex flex-wrap">
                  {userDetails?.workingDays.map((item, index) =>
                  {
                    return (
                      <div key={index}>
                        {item},
                      </div>
                    )
                  })}
                </p>

              </div>

              <div className="mt-3 flex flex-row">
                <p className="block text-black text-lg font-semibold">Working Hours :</p>
                <p className="block text-black text-lg ">
                  {userDetails?.workingHours?.workHourFrom} - {userDetails?.workingHours?.workHourTo}

                </p>

              </div>

              <div className=" mt-3 flex flex-row">
                <p
                  className="block text-black text-lg font-semibold"
                >
                  Total Experience :
                </p>
                <p className="block text-black text-lg ">{userDetails?.totalExperience}</p>
              </div>

              <div className="mt-3 flex flex-row" >
                <p
                  className="block text-black text-lg font-semibold"
                >
                  Specialist:
                </p>
                <p className="block text-black text-lg ">{userDetails?.speciality}</p>
              </div>

              <div className="mt-3 flex flex-row">
                <p
                  className="block text-black text-lg font-semibold"
                >
                  Degree:
                </p>

                <p className="block text-black text-lg ">{userDetails?.degree}</p>
              </div>

              {/* -----------address----------- */}
              <div className="mt-3 flex flex-row ">

                <p className="block text-black text-lg font-semibold">
                  Address:
                </p>

                <div class="flex flex- overflow-hidden">
                  <p className=" text-black text-lg  " >{userDetails?.address?.houseNo}, {userDetails?.address?.floor}, {userDetails?.address?.block}, {userDetails?.address?.pinCode}, {userDetails?.address?.area} ,{userDetails?.address?.district} ,{userDetails?.address?.state}
                  </p>
                </div>
              </div>
            </div>

            {/* ----------------------------------right---------------------------------- */}
            <div className="border bg-white flex flex-col w-2/3 lg:w-1/3 p-6 my-5  ">
              <text
                className="text-center"
                style={{
                  fontWeight: 600,
                  fontSize: "24px",
                  lineHeight: "28.8px",
                  fontFamily: "Lato, sans-serif",
                }}
              >
                Generate Personal QR
              </text>
              <p class="mx-auto ">
                {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" />}
              </p>


              <div className="flex mx-auto mt-5 my-2">
                <button className="btn btn-primary border py-3 px-4 rounded-3xl text-white" style={{ backgroundColor: '#89CFF0' }} onClick={handleDownload}>                   Download
                </button>
              </div>
            </div>

          </div>
        </div >
      </div >
    </>
  );
}
