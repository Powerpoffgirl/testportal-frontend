import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import { useMediaQuery } from "react-responsive";
import AdminSidebar from "./adminSidebar";

export default function Qr()
{
  let isTab = useMediaQuery({ query: "(max-width: 768px)" });
  const baseUrl = process.env.REACT_APP_BASE_URL
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [name, setName] = useState("")

  useEffect(() =>
  {
    const getQRCode = async () =>
    {
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
        className="flex min-h-screen relative overflow-auto 
    box-border"
      >
        <AdminSidebar></AdminSidebar>
        <div
          className="flex flex-col bg-customGreen"
          style={{
            width: isTab ? "100%" : "77%",
          }}
        >
          <Header line1="Find" line2="Doctors"></Header>
          <div
            className="flex flex-col gap-2 px-3 w-full"
            style={{
              top: "4%",
              left: "2%",
              position: "relative",
              overflow: "hidden",
              // justifyContent: "center",
              alignItems: "center",
            }}
          >
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
            <p>
              {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" />}
            </p>
            QR

            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                className="mt-4 bg-customRed w-40"
                style={{
                  display: "inline",
                  height: "45px",
                  borderRadius: "43px",
                  color: "white",
                  fontSize: "24px",
                  fontWeight: 600,
                  lineHeight: "28.8px",
                }}
                onClick={handleDownload}
              >
                Download
              </button>
            </div>
          </div>
        </div>
      </div >
    </>
  );
}
