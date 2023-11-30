import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import toggle from "../assets/toogle.svg";
// import Table from "./Table";
// import DoctorForm_new from "./DoctorForm_new";
// import Doc_appointment from "./Doc_appointment";
// import Form_appoinment from "./Form_appoinment";
// import Table_2 from "./Table_2";
// import Table_delete from "./Table_delete";
import NavigationLinks from "./NavigationLinks";

// -------------BASE URL SIDEBAR NAVIGATION--------------------------

const link1 = [
    { text: 'User Login', to: '/userlogin' },
    { text: 'Doctor Login', to: '/doctorlogin' },
    { text: 'Support', to: '#' },
];

// -------------USER SIDEBAR NAVIGATION--------------------------

const link2 = [
    { text: 'Patient’s List', to: '/patientlistuser' },
    { text: 'Doctor’s List', to: '/doctorlistuser' },
    { text: 'Appointment’s List', to: '/appointmentlistuser' },
    { text: 'Edit Profile', to: '/edituserform' },
    { text: 'Support', to: '#' },
    { text: 'Logout', to: '/userlogin' },
];

// -------------DOCTOR SIDEBAR NAVIGATION--------------------------

const link3 = [
    { text: 'Patient’s List', to: '/patientlist' },
    { text: 'Appointment List', to: '/appointmentlist' },
    { text: 'Edit Profile', to: '/editdoctorform' },
    { text: 'Support', to: '#' },
    { text: 'Manage QR', to: '#' },
    { text: 'Logout', to: '/doctorlogin' },
];

// ------------- ADMIN SIDEBAR NAVIGATION--------------------------

const link4 = [
    { text: 'Doctor’s List', to: '/doctorlistadmin' },
    { text: 'Patient’s List', to: '/patientlistadmin' },
    { text: 'Appointment List', to: '/appointmentlist' },
    { text: 'Edit Profile', to: '#' },
    { text: 'Support', to: '#' },
    { text: 'Manage QR', to: '#' },
    { text: 'Logout', to: '/adminlogin' },
];

// -------------SUPER ADMIN SIDEBAR NAVIGATION--------------------------
const link5 = [
    { text: 'Admin’s List', to: '/adminlist' },
    { text: 'Patient’s List', to: '/patientlistadmin' },
    { text: 'Appointment List', to: '' },
    { text: 'Edit Profile', to: '#' },
    { text: 'Support', to: '#' },
    { text: 'Manage QR', to: '#' },
    { text: 'Logout', to: '#' },
];


export default function Layout({ Component, type })
{
    const location = useLocation();
    console.log(location);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () =>
    {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <>
            <div className="flex min-h-screen">
                <aside className={`fixed top-0 left-0 z-20 flex flex-col overflow-auto shadow-2xl w-72 h-screen px-4 py-8 bg-[#08DA75] border-r transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} ease-in-out transition-all duration-300 md:transform-none`}>
                    <h1 className="font-bold text-2xl">Welcome! {type}</h1>
                    <div class="flex items-center gap-x-2 mt-3">
                        <img class="object-cover w-16 h-16" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100" alt="avatar" />

                        <div>
                            <h1 class="text-xl font-semibold text-white capitalize">Mia John</h1>

                            <p class="text-base text-white">miajohn@merakiui.com</p>
                        </div>
                    </div>
                    <hr className="mt-3" />
                    {location.pathname === '/' &&
                        <NavigationLinks links={link1} />
                    }
                    {type === 'user' &&
                        <NavigationLinks links={link2} />
                    }
                    {type === 'doctor' &&
                        <NavigationLinks links={link3} />
                    }
                    {type === 'admin' &&
                        <NavigationLinks links={link4} />
                    }
                    {
                        type === 'superAdmin' &&
                        <NavigationLinks links={link5} />
                    }
                </aside>
                <div className="flex flex-col flex-grow md:pl-4 pr-2">
                    <nav className="fixed top-0 right-0 left-0 md:left-72 z-10 md:ml-4 bg-[#08DA75] flex flex-col h-32 justify-evenly px-4 rounded-br-[80px]">
                        <div className="flex justify-end">
                            <img src={toggle} alt="toggle"
                                className={`md:hidden z-50 w-10 h-10 text-black p-2 rounded focus:outline-none cursor-pointer`}
                                onClick={toggleSidebar}
                            />
                        </div>

                        <div className="flex flex-col mb-2">
                            <span className="text-4xl font-semibold w-full">Doctor's</span>
                            <span className="text-4xl font-semibold w-full">List</span>
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