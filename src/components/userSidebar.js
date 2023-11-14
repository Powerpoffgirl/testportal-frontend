import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { openSidebar, closeSidebar } from "../slices/sidebar/toggleSlice";
import { useNavigate } from "react-router-dom";


function UserSidebar()
{

    let isTab = useMediaQuery({ query: "(max-width: 768px)" });

    const isOpen = useSelector((state) => state.sidebar.isOpen)

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const baseUrl = process.env.REACT_APP_BASE_URL




    const sidebar_animation = isTab
        ? //Mobile
        {
            open: {
                x: 0,
                width: "18rem",
                transition: {
                    damping: 40,
                },
            },
            closed: {
                x: -20,
                width: 0,
                transition: {
                    damping: 40,
                    delay: 0.15,
                },
                border: "0px",
                padding: "0px",
            },
        }
        : //desktop
        {
            open: {
                width: "20rem",
                transition: {
                    damping: 40,
                },
            },
        };

    useEffect(() =>
    {
        if (isTab)
        {
            dispatch(closeSidebar());
        } else
        {
            dispatch(openSidebar());
        }
    }, [isTab]);

    const handlelogout = async () =>
    {
        const token = localStorage.getItem("token");

        // Check if the token exists
        if (!token)
        {
            console.error("No token found in local storage");
            return;
        }
        const response = await fetch(
            `${baseUrl}/api/v1/user/logout_user`,
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
            navigate("/userlogin");
            localStorage.removeItem("token");
        }
    }

    return (
        <>

            <motion.div
                variants={sidebar_animation}
                animate={isOpen ? "open" : "closed"}

                className={`${!isTab ? 'bg-customRed' : 'bg-customGreen'} text-gray shadow-xl z-[999]   w-[20rem] 
            overflow-hidden fixed md:relative min-h-screen`}
            >
                <div
                    style={{
                        fontFamily: "kanit, sans-serif",
                        fontWeight: 600,
                        fontSize: "28px",
                        lineHeight: "39px",
                        marginTop: "2rem",
                        marginLeft: "2rem",
                    }}
                >
                    Welcome!
                </div>
                <div className="flex border-b py-4">
                    <div
                        style={{
                            width: "81px",
                            height: "68px",
                            backgroundColor: "#D9D9D9",
                            marginLeft: "2rem",
                            marginTop: "1rem",
                            marginRight: "1rem",
                        }}
                    ></div>
                    <div className="flex flex-col mt-10">
                        <text style={{ fontSize: "12px", color: !isTab ? "white" : "black", fontWeight: 400 }}>
                            aashisr0@gmail.com
                        </text>
                        <text style={{ fontSize: "20px", color: !isTab ? "white" : "black", fontWeight: 600 }}>
                            Arnab
                        </text>
                    </div>
                </div>
                <div className="flex flex-col  h-full">
                    <ul
                        className="whitespace-pre px-5 text-[0.9rem] py-5 flex flex-col gap-10  overflow-x-hidden scrollbar-thin scrollbar-track-white 
            scrollbar-thumb-slate-100   md:h-[68%] h-[70%]"
                        style={{
                            color: !isTab ? "white" : "black",
                            margin: "2rem",
                            fontWeight: 700,
                            fontSize: "26px",
                            fontFamily: "Lato, sans-serif",
                        }}
                    >

                        <li>
                            <NavLink to="/patientlistuser">Patient’s List</NavLink>
                        </li>
                        <li>
                            <NavLink to="/doctorlistuser">Doctor's List</NavLink>
                        </li>
                        <li>
                            <NavLink to="/appointmentlistuser">Appointment's List</NavLink>
                        </li>
                        <li>
                            <NavLink to="/edituserform">Edit Profile</NavLink>
                        </li>
                        <li>
                            <NavLink to="/">Support</NavLink>
                        </li>
                        <li>
                            <div onClick={handlelogout}>Logout</div>
                        </li>
                    </ul>
                </div>
            </motion.div>
            {/* sidebar */}
        </>

    );
}

export default UserSidebar;
