import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { openSidebar, closeSidebar } from "../slices/sidebar/toggleSlice";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-responsive-modal";

function AdminSidebar()
{

    let isTab = useMediaQuery({ query: "(max-width: 768px)" });

    const isOpen = useSelector((state) => state.sidebar.isOpen)

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const baseUrl = process.env.REACT_APP_BASE_URL


    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);


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
            `${baseUrl}/api/v1/admin/logout`,
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
            navigate("/adminlogin");
            localStorage.removeItem("token");
        }
    }

    const navigateToEditPage = () =>
    {
        navigate("/editadminform")
    }

    return (
        <>
            <Modal
                open={open}
                onClose={onCloseModal}
                center
                styles={{
                    modal: {
                        // Set your custom width here (e.g., '70%')
                        width: isTab ? "80%" : "40%",
                        backgroundColor: "#08DA75",
                        alignContent: "center",
                        padding: "2%",
                    },
                }}
            >
                <div
                    className="flex flex-col bg-customRedp-2  items-center w-[100%] md:w-[100%]  mt-[2%]"
                    style={{ borderRadius: "5px" }}
                >
                    <div className="flex flex-row w-[100%] justify-center">
                        <img
                            src="data:image/png;base64,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"
                            alt="Avatar"
                            style={{
                                borderRadius: "50%",
                                height: isTab ? "40px" : "123px",
                                width: isTab ? "40px" : "123px",
                            }}
                        ></img>
                    </div>
                    <text
                        className="ml-4 text-center mt-4"
                        style={{
                            fontSize: isTab ? "18px" : "26px",
                            fontWeight: 600,
                            lineHeight: "28.8px",
                            fontFamily: "Lato, sans-serif",
                        }}
                    >
                        Aashi Srivastava
                    </text>
                    <text
                        className="ml-4 text-center mt-4"
                        style={{
                            fontSize: isTab ? "12px" : "20px",
                            fontWeight: 400,
                            lineHeight: "24px",
                            fontFamily: "Lato, sans-serif",
                            color: "#FFFFFF",
                            marginBottom: "2%",
                        }}
                    >
                        kanchanohra1234@gmail.com
                    </text>
                    <text
                        className="ml-4 text-center"
                        style={{
                            fontSize: isTab ? "12px" : "20px",
                            fontWeight: 400,
                            lineHeight: "28.8px",
                            fontFamily: "Lato, sans-serif",
                            color: "white",
                        }}
                    >
                        +91-8603678862
                    </text>

                    <text
                        className="ml-4 text-center mt-2"
                        style={{
                            fontSize: isTab ? "14px" : "20px",
                            fontWeight: 400,
                            lineHeight: "28.8px",
                            fontFamily: "Lato, sans-serif",
                            color: "#FFFFFF",
                        }}
                    >
                        Aggarwa Motihari, East Champaran
                    </text>
                    <button style={{
                        width: '103px',

                        border: '1px solid white',
                        borderRadius: '37px',
                        padding: '1%',
                        fontSize: '16px',
                        fontWeight: 600,
                        color: 'white',
                        marginTop: '4%',
                        outline: 'none'
                    }}
                        onClick={navigateToEditPage}
                    >Edit Profile</button>
                </div>
            </Modal>

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
                        onClick={onOpenModal}
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
                            <NavLink to="/patientlist">Patient’s List</NavLink>
                        </li>
                        <li>
                            <NavLink to="/doctorlistadmin">Doctor's List</NavLink>
                        </li>
                        <li>
                            <NavLink to="/userlist">User's List</NavLink>
                        </li>
                        <li>
                            <NavLink to="/adminForm">Edit Profile</NavLink>
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

export default AdminSidebar;
