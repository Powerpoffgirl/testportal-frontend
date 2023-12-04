import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toggle from "../assets/toogle.svg";
// import Table from "./Table";
// import DoctorForm_new from "./DoctorForm_new";
// import Doc_appointment from "./Doc_appointment";
// import Form_appoinment from "./Form_appoinment";
// import Table_2 from "./Table_2";
// import Table_delete from "./Table_delete";
import NavigationLinks from "./NavigationLinks";
import { IoIosSearch } from "react-icons/io";

// -------------BASE URL SIDEBAR NAVIGATION--------------------------

const link1 = [
  { text: "User Login", to: "/userlogin" },
  { text: "Doctor Login", to: "/doctorlogin" },
  { text: "Support", to: "#" },
];

// -------------USER SIDEBAR NAVIGATION--------------------------

const link2 = [
  { text: "Patient’s List", to: "/patientlistuser" },
  { text: "Doctor’s List", to: "/doctorlistuser" },
  { text: "Appointment’s List", to: "/appointmentlistuser" },
  { text: "Edit Profile", to: "/edituserform" },
  { text: "Support", to: "#" },
  { text: "Logout", to: "/userlogin" },
];

// -------------DOCTOR SIDEBAR NAVIGATION--------------------------

const link3 = [
  { text: "Patient’s List", to: "/patientlist" },
  { text: "Appointment List", to: "/appointmentlist" },
  { text: "Edit Profile", to: "/editdoctorform" },
  { text: "Support", to: "#" },
  { text: "Manage QR", to: "#" },
  { text: "Logout", to: "/doctorlogin" },
];

// ------------- ADMIN SIDEBAR NAVIGATION--------------------------

const link4 = [
  { text: "Doctor’s List", to: "/doctorlistadmin" },
  { text: "Patient’s List", to: "/patientlistadmin" },
  { text: "Appointment List", to: "/appointmentlist" },
  {
    text: "Edit Profile",
    to: "/editadminform",
  },
  { text: "Support", to: "#" },
  { text: "Manage QR", to: "#" },
  { text: "Logout", to: "/adminlogin" },
];

// -------------SUPER ADMIN SIDEBAR NAVIGATION--------------------------
const link5 = [
  { text: "Admin’s List", to: "/adminlist" },
  { text: "Patient’s List", to: "/patientlistadmin" },
  { text: "Appointment List", to: "" },
  { text: "Edit Profile", to: "#" },
  { text: "Support", to: "#" },
  { text: "Manage QR", to: "#" },
  { text: "Logout", to: "#" },
];

export default function Layout({
  Component,
  type,
  headerTextTop,
  headerTextBottom,
  search,
  AddButton,
  setSearchTerm,
}) {
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();
  const userContactNumber = localStorage.getItem("userContactNumber");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleEditProfile = () => {
    navigate("/edituserform");
  };

  const handleDoctorForm = () => {
    navigate("/doctorform");
  };

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="flex min-h-screen">
        <aside
          className={`fixed top-0 left-0 z-20 flex flex-col overflow-auto shadow-2xl w-72 h-screen px-4 py-8 bg-[#08DA75] border-r transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } ease-in-out transition-all duration-300 md:transform-none`}
        >
          <h1 className="font-bold text-2xl">Welcome! {type}</h1>
          <div
            class="flex items-center gap-x-2 mt-3"
            onClick={handleEditProfile}
          >
            <img
              class="object-cover w-16 h-16"
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100"
              alt="avatar"
            />

            <div>
              <h1 class="text-xl font-semibold text-white capitalize">
                Mia John
              </h1>

              <p class="text-base text-white">{userContactNumber}</p>
            </div>
          </div>
          <hr className="mt-3" />
          {location.pathname === "/" && <NavigationLinks links={link1} />}
          {type === "user" && <NavigationLinks links={link2} />}
          {type === "doctor" && <NavigationLinks links={link3} />}
          {type === "admin" && <NavigationLinks links={link4} />}
          {type === "superAdmin" && <NavigationLinks links={link5} />}
        </aside>
        <div className="flex flex-col flex-grow md:pl-4 pr-2">
          <nav className="fixed top-0 right-0 left-0 md:left-72 z-10 md:ml-4 bg-[#08DA75] flex flex-col h-32 justify-evenly px-4 rounded-br-[80px]">
            <div className="flex justify-end">
              <img
                src={toggle}
                alt="toggle"
                className={`md:hidden z-50 w-10 h-10 text-black p-2 rounded focus:outline-none cursor-pointer`}
                onClick={toggleSidebar}
              />
            </div>

            <div style={{ marginBottom: -10 }} className="flex flex-col">
              <span className="text-4xl font-semibold w-full">
                {headerTextTop}
              </span>
            </div>

            <div className="flex flex-row mb-2">
              <span className="text-4xl font-semibold w-full">
                {headerTextBottom}
              </span>
              {search === "true" ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginRight: 20,
                  }}
                >
                  <div className="header-Right-top">
                    <span
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        border: "2px solid white",
                        borderRadius: 50,
                      }}
                    >
                      <span
                        style={{
                          width: "25.58px",
                          height: "14.58px",
                          marginTop: 7,
                          marginLeft: "3%",
                          marginRight: "4%",
                          marginBottom: "8%",
                          alignContent: "center",
                        }}
                      >
                        <IoIosSearch
                          style={{
                            color: "white",
                            fontSize: 30,
                            marginTop: -3,
                          }}
                        />
                      </span>{" "}
                      <span>
                        {" "}
                        <input
                          placeholder={`${"search"}`}
                          style={{
                            width: "100px",
                            marginRight: "30px",

                            backgroundColor: "#08DA75",
                            fontSize: "24px",
                            color: "white",
                            fontWeight: 600,
                            outline: "none",
                            marginLeft: "4%",
                          }}
                          onChange={(e) => handleSearchTerm(e)}
                        />{" "}
                      </span>{" "}
                    </span>
                  </div>
                  {AddButton === "true" ? (
                    <div className="header-Right-bottom">
                      <button
                        style={{
                          display: "inline",
                          fontSize: "29px",
                          fontWeight: 800,
                          fontFamily: "Lato, sans-serif",
                          lineHeight: "34.8px",
                          color: "#08DA75",
                          backgroundColor: "white",
                          height: "38px",
                          width: "122px",
                          borderRadius: "43px",
                          marginLeft: 5,
                        }}
                        onClick={handleDoctorForm}
                      >
                        Add +
                      </button>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </nav>
          <div className="mt-36 md:ml-72 pl-2">
            <Component />
          </div>
        </div>
      </div>
    </>
  );
}
