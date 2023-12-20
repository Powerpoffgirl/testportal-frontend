import React, { useEffect, useState, useRef, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toggle from "../assets/toogle.svg";
import { useMediaQuery } from "react-responsive";
import NavigationLinks from "./NavigationLinks";
import { IoIosSearch } from "react-icons/io";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UserContext from './userContext';


export default function Layout({
  Component,
  type,
  headerTextTop,
  headerTextBottom,
  search,
  AddButton,
  filter
})
{
  const baseUrl = process.env.REACT_APP_BASE_URL
  console.log("TYPE=================", type)
  const userType = type?.toLowerCase();
  const handleLogout = async () =>
  {
    const token = localStorage.getItem("token");

    if (!token)
    {
      console.error("No token found in local storage");
      localStorage.clear()
      navigate(`/${userType}login`)
      // return;
    }
    const response = await fetch(
      `${baseUrl}/api/v1/${type}/logout`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,  // Add the token to the request headers
        },
        body: JSON.stringify({})
      }
    );
    const data = await response.json();
    if (data.success === true)
    {
      // navigate("/");
      localStorage.removeItem("token");
      localStorage.clear()
    }
  }

  let isTab = useMediaQuery({ query: "(max-width: 768px)" });
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();
  const userContactNumber = localStorage.getItem("userContactNumber");
  // const userName = localStorage.getItem("name");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const sidebarRef = useRef(null);
  const [pic, setPic] = useState();
  const [user, setUser] = useState()
  const { userName, userEmail, userPic } = useContext(UserContext);
  const [userDetails, setUserDetails] = useState();



  useEffect(() =>
  {
    if (type === "doctor" || "admin" || "user")
    {
      // const nameParts = userName.split(' '); // Split the string by spaces
      // const firstName = nameParts[0]; // Get the first part, which is the first name
      setUser("Dr. " + userName);
      setPic(userPic)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, userName]); // Include dependencies in the dependency array

  //     // if (type === "doctor")
  //     // {
  //     //   setUser("Dr. " + firstName); // Set the user with "Dr." and the first name
  //     // } else
  //     if (type === "admin")
  //     {
  //       setUser(firstName); // Set the user with only the first name
  //     }
  //   }
  //   else
  //   {
  //     navigate("/")
  //   }

  // }, [type, userName]); // Include dependencies in the dependency array


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
    { text: "Profile", to: "/edituserform" },
    { text: "Support", to: "#" },
    { text: "Logout User", to: "/userlogin", onClick: handleLogout },
  ];

  // -------------DOCTOR SIDEBAR NAVIGATION--------------------------

  const link3 = [
    { text: "Patient’s List", to: "/patientlist" },
    { text: "Appointment List", to: "/appointmentlist" },
    { text: "Profile", to: "/editdoctorform" },
    { text: "Support", to: "#" },
    { text: "Logout", to: "/doctorlogin", onClick: handleLogout },
  ];

  // ------------- ADMIN SIDEBAR NAVIGATION--------------------------

  const link4 = [
    { text: "Doctor’s List", to: "/doctorlistadmin" },
    { text: "Patient’s List", to: "/patientlistadmin" },
    { text: "Appointment List", to: "/appointmentlistadmin" },
    { text: "Profile", to: "/editadminform" },
    { text: "Support", to: "#" },
    { text: "Logout", to: "/adminlogin", onClick: handleLogout },
  ];

  // -------------SUPER ADMIN SIDEBAR NAVIGATION--------------------------
  const link5 = [
    { text: "Admin’s List", to: "/superadminadminlist" },
    { text: "Doctor’s List", to: "/superadmindoctorlist" },
    { text: "User’s List", to: "/superadminuserlist" },
    { text: "Patient’s List", to: "/superadminpatientlist" },
    { text: "Appointment List", to: "/superadminappointmentlist" },
    { text: "Profile", to: "/superadmineditform" },
    { text: "Support", to: "#" },
    { text: "Logout", to: "/superadminlogin", onClick: handleLogout },
  ];


  const toggleSidebar = () =>
  {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebarOnOutsideClick = (e) =>
  {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target))
    {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() =>
  {
    setPic(localStorage.getItem("pic"));
    document.addEventListener("click", closeSidebarOnOutsideClick);

    return () =>
    {
      document.removeEventListener("click", closeSidebarOnOutsideClick);
    };
  }, []);

  const handleEditProfile = () =>
  {
    if (type === "user")
    {
      navigate("/edituserform");
    } else if (type === "admin")
    {
      navigate("/edituserform");
    } else if (type === "superAdmin")
    {
      navigate("/superadminuserform");
    } else
    {
      navigate("/editdoctorform");
    }
  };

  const handleDoctorForm = () =>
  {
    if (type === "user")
    {
      navigate("/patientform");
    } else if (type === "admin")
    {
      navigate("/doctorformadmin");
    } else if (type === "superAdmin")
    {
      console.log("hello");
      navigate("/superadminadminform");
    }
  };

  const handleSearchTerm = (e) =>
  {
    setSearchTerm(e.target.value);
  };

  console.log("SEARCH TERM", searchTerm);

  return (
    <>
      <div className="flex min-h-screen">
        <aside
          className={`fixed top-0 left-0 z-20 flex flex-col overflow-auto shadow-2xl w-72 h-screen px-4 py-8 bg-[#89CFF0] border-r transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } ease-in-out transition-all duration-300 md:transform-none`}
        >
          <h1 className="font-bold text-2xl" style={{ color: "white" }}>
            Welcome! {type ? type.charAt(0).toUpperCase() + type.slice(1) : "Guest"}
          </h1>
          <div
            class="flex items-center gap-x-2 mt-3"
            onClick={handleEditProfile}
          >
            {userPic ? (
              <img
                class="object-cover sm:w-20 sm:h-20 w-10 h-10  rounded-full"
                src={userPic}
                alt={userName}
              />
            ) : (
              <AccountCircleIcon
                style={{ fontSize: "90px", color: "#E3F6FF" }}
              />
            )}

            <div>
              <h1 class="text-xl font-semibold text-white capitalize">
                {type === "doctor" ? "Dr. " + userName : userName}
              </h1>

              <p class="text-base text-white">
                {/* {userContactNumber ? userContactNumber : ""} */}
                {userEmail}
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
            className="fixed top-0 right-0 left-0 md:left-72 z-10 md:ml-4 bg-[#89CFF0] flex flex-col h-32 justify-evenly px-4 rounded-br-[80px]"
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
                            backgroundColor: "#89CFF0",
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
                          color: "#89CFF0",
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
