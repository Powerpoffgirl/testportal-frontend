import React from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import { useMediaQuery } from "react-responsive";

export default function Qr() {
  let isTab = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <>
      <div
        className="flex min-h-screen relative overflow-auto 
    box-border"
      >
        <Sidebar></Sidebar>
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
            <span
              className="text-center"
              style={{ width: "30%", backgroundColor: "red", height: "300px" }}
            >
              QR
            </span>
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
              >
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
