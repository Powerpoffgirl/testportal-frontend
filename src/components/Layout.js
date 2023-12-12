import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toggle from "../assets/toogle.svg";
import { useMediaQuery } from "react-responsive";
import NavigationLinks from "./NavigationLinks";
import { IoIosSearch } from "react-icons/io";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// const navigate = useNavigate()
const handleLogout = () => {
  console.log("HELLO");
  localStorage.clear(); // or localStorage.removeItem('yourKey');
};

// -------------BASE URL SIDEBAR NAVIGATION--------------------------

const link1 = [
  { text: "User Login", to: "/userlogin" },
  { text: "Doctor Login", to: "/doctorlogin" },
  { text: "Support", to: "#" },
];

// -------------USER SIDEBAR NAVIGATION--------------------------

const link2 = [
  { text: "Member’s List", to: "/patientlistuser" },
  { text: "Doctor’s List", to: "/doctorlistuser" },
  { text: "Appointment’s List", to: "/appointmentlistuser" },
  { text: "Edit Profile", to: "/edituserform" },
  { text: "Support", to: "#" },
  { text: "Logout User", to: "/userlogin", onClick: handleLogout },
];

// -------------DOCTOR SIDEBAR NAVIGATION--------------------------

const link3 = [
  { text: "Patient’s List", to: "/patientlist" },
  { text: "Appointment List", to: "/appointmentlist" },
  { text: "Edit Profile", to: "/editdoctorform" },
  { text: "Support", to: "#" },
  { text: "Manage QR", to: "#" },
  { text: "Logout", to: "/doctorlogin", onClick: handleLogout },
];

// ------------- ADMIN SIDEBAR NAVIGATION--------------------------

const link4 = [
  { text: "Doctor’s List", to: "/doctorlistadmin" },
  { text: "Patient’s List", to: "/patientlistadmin" },
  { text: "Appointment List", to: "/appointmentlistadmin" },
  {
    text: "Edit Profile",
    to: "/editadminform",
  },
  { text: "Support", to: "#" },
  { text: "Manage QR", to: "#" },
  { text: "Logout", to: "/adminlogin", onClick: handleLogout },
];

// -------------SUPER ADMIN SIDEBAR NAVIGATION--------------------------
const link5 = [
  { text: "Admin’s List", to: "/superadminadminlist" },
  { text: "Doctor’s List", to: "/superadmindoctorlist" },
  { text: "User’s List", to: "/superadminuserlist" },
  { text: "Patient’s List", to: "/superadminpatientlist" },
  { text: "Appointment List", to: "/superadminappointmentlist" },
  { text: "Edit Profile", to: "/superadmineditform" },
  { text: "Support", to: "#" },
  { text: "Manage QR", to: "#" },
  { text: "Logout", to: "#", onClick: handleLogout },
];

export default function Layout({
  Component,
  type,
  headerTextTop,
  headerTextBottom,
  search,
  AddButton,
  // setSearchTerm,
}) {
  let isTab = useMediaQuery({ query: "(max-width: 768px)" });
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();
  const userContactNumber = localStorage.getItem("userContactNumber");
  const userName = localStorage.getItem("name");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const sidebarRef = useRef(null);
  const [pic, setPic] = useState();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebarOnOutsideClick = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    setPic(localStorage.getItem("pic"));
    document.addEventListener("click", closeSidebarOnOutsideClick);

    return () => {
      document.removeEventListener("click", closeSidebarOnOutsideClick);
    };
  }, []);

  const handleEditProfile = () => {
    if (type === "user") {
      navigate("/edituserform");
    } else if (type === "admin") {
      navigate("/edituserform");
    } else if (type === "superAdmin") {
      navigate("/superadminuserform");
    } else {
      navigate("/editdoctorform");
    }
  };

  const handleDoctorForm = () => {
    if (type === "user") {
      navigate("/patientform");
    } else if (type === "admin") {
      navigate("/doctorformadmin");
    } else if (type === "superAdmin") {
      console.log("hello");
      navigate("/superadminadminform");
    }
  };

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  console.log("SEARCH TERM", searchTerm);

  return (
    <>
      <div className="flex min-h-screen">
        <aside
          className={`fixed top-0 left-0 z-20 flex flex-col overflow-auto shadow-2xl w-72 h-screen px-4 py-8 bg-[#08DA75] border-r transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } ease-in-out transition-all duration-300 md:transform-none`}
        >
          <h1 className="font-bold text-2xl">
            Welcome! {type ? type : "Guest"}
          </h1>
          <div
            class="flex items-center gap-x-2 mt-3"
            onClick={handleEditProfile}
          >
            {pic ? (
              <img
                class="object-cover sm:w-20 sm:h-20 w-10 h-10  rounded-full"
                src={pic}
                alt={userName}
              />
            ) : (
              <AccountCircleIcon
                style={{ fontSize: "90px", color: "#A4A4A4" }}
              />
            )}

            <div>
              <h1 class="text-xl font-semibold text-white capitalize">
                {userName}
              </h1>

              <p class="text-base text-white">
                {userContactNumber ? userContactNumber : ""}
              </p>
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
          <nav
            ref={sidebarRef}
            className="fixed top-0 right-0 left-0 md:left-72 z-10 md:ml-4 bg-[#08DA75] flex flex-col h-32 justify-evenly px-4 rounded-br-[80px]"
          >
            <div className="flex justify-end">
              <img
                src={toggle}
                alt="toggle"
                className={`md:hidden z-50 w-10 h-10 text-black p-2 rounded focus:outline-none cursor-pointer`}
                onClick={toggleSidebar}
              />
            </div>

            <div style={{ marginBottom: -10 }} className="flex flex-col">
              <span className="text-4xl font-extrabold w-full">
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
                    marginTop: isTab ? 9 : null,
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
                          width: isTab ? "20px" : "25.58px",
                          height: isTab ? "8px" : "14.58px",
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
                            fontSize: isTab ? 20 : 30,
                            marginTop: -3,
                          }}
                        />
                      </span>{" "}
                      <span>
                        {" "}
                        <input
                          placeholder={`${isTab ? "" : "search"}`}
                          style={{
                            width: isTab ? "40px" : "100px",
                            marginRight: "30px",
                            backgroundColor: "#08DA75",
                            fontSize: isTab ? "13px" : "24px",
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
                          fontSize: isTab ? "17px" : "29px",
                          fontWeight: 800,
                          fontFamily: "Lato, sans-serif",
                          lineHeight: isTab ? "30px" : "34.8px",
                          color: "#08DA75",
                          backgroundColor: "white",
                          height: isTab ? "27px" : "38px",
                          width: isTab ? "90px" : "122px",
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
            <Component searchTerm={searchTerm} />
          </div>
        </div>
      </div>
    </>
  );
}
