import React from "react";
import { useMediaQuery } from "react-responsive";
import Sidebar from "./sidebar";
import Header from "./header";

export default function UserForm() {
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
          <Header line1="Doctor’s" line2="Detail"></Header>
          <div
            className="scrollable-content"
            style={{
              overflow: isTab ? "auto" : "hidden",
              maxHeight: "calc(100vh - 100px)", // Adjust the value as needed
              padding: "10px",
            }}
          >
            <form
              className="flex flex-col gap-2 px-3 w-full"
              style={{
                top: "4%",
                left: "2%",
                position: "relative",
                overflow: "hidden",
                justifyContent: "center",
              }}
            >
              {/* 1st Row */}

              <label
                className="mx-2"
                htmlFor="username"
                style={{
                  fontWeight: 400,
                  fontSize: "20px",
                  fontFamily: "Lato, sans-serif",
                }}
              >
                Patient Name
              </label>
              <input
                className="mx-2"
                type="text"
                id="username"
                name="username"
                style={{ border: "1px solid #08DA75", height: "40px" }}
              />
              {/* 1st Row */}

              {/* 2nd Row */}

              <div className="flex flex-col md:flex-row justify-between">
                <span className="flex flex-col w-[100%] md:w-[50%]">
                  <label
                    className="mx-2"
                    htmlFor="username"
                    style={{
                      fontWeight: 400,
                      fontSize: "20px",
                      fontFamily: "Lato, sans-serif",
                    }}
                  >
                    Mobile No.
                  </label>
                  <input
                    className="mx-2"
                    type="number"
                    id="username"
                    name="username"
                    style={{ border: "1px solid #08DA75", height: "40px" }}
                  />
                </span>
                <span className="flex flex-col w-[100%] md:w-[50%]">
                  <label
                    className="mx-2"
                    htmlFor="username"
                    style={{
                      fontWeight: 400,
                      fontSize: "20px",
                      fontFamily: "Lato, sans-serif",
                    }}
                  >
                    Age
                  </label>
                  <input
                    className="mx-2"
                    type="number"
                    id="username"
                    name="username"
                    style={{ border: "1px solid #08DA75", height: "40px" }}
                  />
                </span>
              </div>

              {/* 2nd Row */}

              {/* 4th Row */}

              <label
                className="mx-2"
                htmlFor="username"
                style={{
                  fontWeight: 400,
                  fontSize: "20px",
                  fontFamily: "Lato, sans-serif",
                }}
              >
                Issue
              </label>
              <input
                className="mx-2"
                type="number"
                id="username"
                name="username"
                style={{ border: "1px solid #08DA75", height: "40px" }}
              />
              {/* 4th Row */}

              {/* 5th Row */}

              <label
                className="mx-2"
                htmlFor="username"
                style={{
                  fontWeight: 400,
                  fontSize: "20px",
                  fontFamily: "Lato, sans-serif",
                }}
              >
                Address
              </label>
              <input
                className="mx-2"
                type="number"
                id="username"
                name="username"
                style={{ border: "1px solid #08DA75", height: "60px" }}
              />
              {/* 5th Row */}

              <div className="flex justify-center my-5">
                <button
                  type="submit"
                  style={{
                    width: "159px",
                    height: "45px",
                    backgroundColor: "#08DA75",
                    borderRadius: "43px",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "24px",
                    lineHeight: "28.8px",
                    fontFamily: "Lato, sans-serif",
                  }}
                >
                  Process
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
