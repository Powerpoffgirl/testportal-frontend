import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import Sidebar from "./sidebar";
import Header from "./header";
import { useNavigate } from "react-router-dom";
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function AdminForm()
{
    let isTab = useMediaQuery({ query: "(max-width: 768px)" });
    const navigate = useNavigate()
    const [doctorDetails, setDoctorDetails] = useState({
        name: "",
        email: "",
        contactNumber: "",
        workingDays: [],
        workingHours: {
            workHourFrom: "",
            workHourTo: ""
        },
        totalExperience: "",
        speciality: "",
        degree: "",
        address: {
            houseNo: "",
            floor: "",
            block: "",
            area: "",
            pinCode: "",
            district: "",
            state: ""
        }
    })

    const Daysdropdown = [
        { label: "Select Days", value: "" },
        { label: "Monday", value: "Monday" },
        { label: "Tuesday", value: "Tuesday" },
        { label: "Wednesday", value: "Wednesday" },
        { label: "Thursday", value: "Thursday" },
        { label: "Friday", value: "Friday" },
        { label: "Saturday", value: "Saturday" },
        { label: "Sunday", value: "Sunday" },
    ];

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) =>
    {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () =>
    {
        setAnchorEl(null);
    };

    // Function to handle profile picture change
    const handleNewProfilePicture = () =>
    {
        // Logic to handle adding a new profile picture
        handleClose();
    };

    // Function to handle profile picture removal
    const handleRemoveProfilePicture = () =>
    {
        // Logic to handle removing the current profile picture
        handleClose();
    };

    const handleChange = (e) =>
    {
        const { name, value } = e.target;

        if (name === "workingDays")
        {
            setDoctorDetails(prevDoctorDetails => ({
                ...prevDoctorDetails,
                workingDays: [...prevDoctorDetails.workingDays, value],
            }));
        } else if (name === "workHourFrom" || name === "workHourTo")
        {
            setDoctorDetails(prevDoctorDetails => ({
                ...prevDoctorDetails,
                workingHours: {
                    ...prevDoctorDetails.workingHours,
                    [name]: value,
                }
            }));
        } else if (["houseNo", "floor", "block", "area", "pinCode", "district", "state"].includes(name))
        {
            setDoctorDetails(prevDoctorDetails => ({
                ...prevDoctorDetails,
                address: {
                    ...prevDoctorDetails.address,
                    [name]: value
                }
            }));
        } else
        {
            setDoctorDetails(prevDoctorDetails => ({
                ...prevDoctorDetails,
                [name]: value
            }));
        }
    }



    const handleRegister = async (e) =>
    {
        e.preventDefault();
        // Check if the token exists
        const token = localStorage.getItem("token");
        if (!token)
        {
            console.error("No token found in local storage");
            return;
        }
        const response = await fetch(
            "https://dr.nixonbit.com/api/v1/admin/register_doctor",
            {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": token,
                },
                body: JSON.stringify(doctorDetails)
            }
        );
        const data = await response.json();
        if (data.success === true)
        {
            navigate("/otp")
            localStorage.setItem("id", data.data._id)
        }
        console.log("DATA from response", data)
    }

    console.log("DOCTOR DETAILS", doctorDetails)

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
                            <div>
                                <div style={{ backgroundColor: "#FFFFFF", width: "90px", height: "90px", borderRadius: "50%", alignItems: "center", display: "flex", flexDirection: "row", justifyContent: "space-evenly", color: "#A4A4A4" }}>
                                    <PermIdentityOutlinedIcon style={{ width: "70px", height: "70px" }} />
                                </div>
                                <p
                                    aria-controls="profile-pic-menu"
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    style={{ cursor: 'pointer' }} // Add a pointer cursor to indicate clickable
                                >
                                    Edit profile pic
                                </p>
                                <Menu
                                    id="profile-pic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'edit-profile-pic-text',
                                    }}
                                >
                                    <MenuItem onClick={handleNewProfilePicture}>New profile picture</MenuItem>
                                    <MenuItem onClick={handleRemoveProfilePicture}>Remove current profile picture</MenuItem>
                                </Menu>
                            </div>

                            {/* 1st Row */}

                            <label
                                className="mx-2"
                                htmlFor="name"
                                style={{
                                    fontWeight: 400,
                                    fontSize: "20px",
                                    fontFamily: "Lato, sans-serif",
                                }}
                            >
                                Dr. Name
                            </label>
                            <input
                                className="mx-2"
                                type="text"
                                id="name"
                                name="name"
                                onChange={handleChange}
                                style={{ border: "1px solid #08DA75", height: "40px" }}
                            />
                            {/* 1st Row */}

                            {/* 1st Row */}

                            <label
                                className="mx-2"
                                htmlFor="email"
                                style={{
                                    fontWeight: 400,
                                    fontSize: "20px",
                                    fontFamily: "Lato, sans-serif",
                                }}
                            >
                                Email
                            </label>
                            <input
                                className="mx-2"
                                type="text"
                                id="email"
                                name="email"
                                onChange={handleChange}
                                style={{ border: "1px solid #08DA75", height: "40px" }}
                            />
                            {/* 1st Row */}

                            {/* 1st Row */}

                            <label
                                className="mx-2"
                                htmlFor="contactNumber"
                                style={{
                                    fontWeight: 400,
                                    fontSize: "20px",
                                    fontFamily: "Lato, sans-serif",
                                }}
                            >
                                Contact Number
                            </label>
                            <input
                                className="mx-2"
                                type="text"
                                id="contactNumber"
                                name="contactNumber"
                                onChange={handleChange}
                                style={{ border: "1px solid #08DA75", height: "40px" }}
                            />
                            {/* 1st Row */}

                            {/* 2nd Row */}

                            <div className="flex flex-col md:flex-row justify-between">
                                <span className="flex flex-col w-[100%] md:w-[50%]">
                                    <label
                                        className="mx-2"
                                        htmlFor="workingDays"
                                        style={{
                                            fontWeight: 400,
                                            fontSize: "20px",
                                            fontFamily: "Lato, sans-serif",
                                        }}
                                    >
                                        Working Days
                                    </label>
                                    <span style={{ border: "1px solid #08DA75", height: "40px", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                        <div className="mx-5" style={{ display: "flex" }}>
                                            {
                                                doctorDetails?.workingDays.map((workingDay) => (
                                                    <div className="breadcrumb-chip" key={workingDay} style={{ margin: "5px 2px 5px 2px", backgroundColor: "#08DA75", borderRadius: "5%", padding: "2px 5px 0px 5px" }}>
                                                        {workingDay}
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <select
                                            className="mx-5"
                                            type="text"
                                            id="workingDays"
                                            name="workingDays"
                                            onChange={handleChange}

                                        >
                                            {Daysdropdown.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>

                                    </span>

                                </span>
                                <span className="flex flex-col w-[100%] md:w-[50%]">
                                    <label
                                        className="mx-2"
                                        htmlFor="workingHours"
                                        style={{
                                            fontWeight: 400,
                                            fontSize: "20px",
                                            fontFamily: "Lato, sans-serif",
                                        }}
                                    >
                                        Working Hours
                                    </label>
                                    <span style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                        <input
                                            className="mx-5"
                                            type="number"
                                            id="workingHours"
                                            name="workHourFrom"
                                            onChange={handleChange}
                                            style={{ border: "1px solid #08DA75", height: "40px" }}
                                        />
                                        <div div style={{
                                            fontWeight: 400,
                                            fontSize: "20px",
                                            fontFamily: "Lato, sans-serif",
                                        }}>To</div>
                                        <input
                                            className="mx-5"
                                            type="number"
                                            id="workingHours"
                                            name="workHourTo"
                                            onChange={handleChange}
                                            style={{ border: "1px solid #08DA75", height: "40px" }}
                                        />
                                    </span>

                                </span>
                            </div>

                            {/* 2nd Row */}

                            {/* 2nd Row */}

                            <div className="flex flex-col md:flex-row justify-between">
                                <span className="flex flex-col w-[100%] md:w-[50%]">
                                    <label
                                        className="mx-2"
                                        htmlFor="totalExperience"
                                        style={{
                                            fontWeight: 400,
                                            fontSize: "20px",
                                            fontFamily: "Lato, sans-serif",
                                        }}
                                    >
                                        Total Experience
                                    </label>
                                    <input
                                        className="mx-2"
                                        type="number"
                                        id="totalExperience"
                                        name="totalExperience"
                                        onChange={handleChange}
                                        style={{ border: "1px solid #08DA75", height: "40px" }}
                                    />
                                </span>
                                <span className="flex flex-col w-[100%] md:w-[50%]">
                                    <label
                                        className="mx-2"
                                        htmlFor="speciality"
                                        style={{
                                            fontWeight: 400,
                                            fontSize: "20px",
                                            fontFamily: "Lato, sans-serif",
                                        }}
                                    >
                                        speciality
                                    </label>
                                    <input
                                        className="mx-5"
                                        type="text"
                                        id="speciality"
                                        name="speciality"
                                        onChange={handleChange}
                                        style={{ border: "1px solid #08DA75", height: "40px" }}
                                    />
                                </span>
                            </div>

                            {/* 2nd Row */}

                            {/* 4th Row */}

                            <label
                                className="mx-2"
                                htmlFor="degree"
                                style={{
                                    fontWeight: 400,
                                    fontSize: "20px",
                                    fontFamily: "Lato, sans-serif",
                                }}
                            >
                                Degree
                            </label>
                            <input
                                className="mx-2"
                                type="text"
                                id="degree"
                                name="degree"
                                onChange={handleChange}
                                style={{ border: "1px solid #08DA75", height: "40px" }}
                            />
                            {/* 4th Row */}
                            {/* 5th Row */}

                            <label
                                className="mx-2"
                                htmlFor="address"
                                style={{
                                    fontWeight: 400,
                                    fontSize: "20px",
                                    fontFamily: "Lato, sans-serif",
                                }}
                            >
                                Address
                            </label>
                            <div className="mx-2 p-5" style={{ border: "1px solid #08DA75", height: "200px" }}>
                                {/* Row1 */}
                                <div className="display">
                                    <span>
                                        <label
                                            className="mx-2 mb-2"
                                            htmlFor="houseNo"
                                            style={{
                                                fontWeight: 400,
                                                fontSize: "20px",
                                                fontFamily: "Lato, sans-serif",
                                            }}
                                        >
                                            House No.
                                        </label>
                                        <input
                                            className="mx-2 mb-2"
                                            type="number"
                                            id="houseNo"
                                            name="houseNo"
                                            onChange={handleChange}
                                            style={{ border: "1px solid #08DA75", height: "40px" }}
                                        />
                                        <label
                                            className="mx-2 mb-2"
                                            htmlFor="floor"
                                            style={{
                                                fontWeight: 400,
                                                fontSize: "20px",
                                                fontFamily: "Lato, sans-serif",
                                            }}
                                        >
                                            Floor
                                        </label>
                                        <input
                                            className="mx-2 mb-2"
                                            type="text"
                                            id="floor"
                                            name="floor"
                                            onChange={handleChange}
                                            style={{ border: "1px solid #08DA75", height: "40px" }}
                                        />
                                        <label
                                            className="mx-2"
                                            htmlFor="block"
                                            style={{
                                                fontWeight: 400,
                                                fontSize: "20px",
                                                fontFamily: "Lato, sans-serif",
                                            }}
                                        >
                                            Block
                                        </label>
                                        <input
                                            className="mx-2"
                                            type="text"
                                            id="block"
                                            name="block"
                                            onChange={handleChange}
                                            style={{ border: "1px solid #08DA75", height: "40px" }}
                                        />
                                    </span>
                                </div>

                                <div>
                                    <span>
                                        <label
                                            className="mx-2"
                                            htmlFor="area"
                                            style={{
                                                fontWeight: 400,
                                                fontSize: "20px",
                                                fontFamily: "Lato, sans-serif",
                                            }}
                                        >
                                            Area
                                        </label>
                                        <input
                                            className="mx-2"
                                            type="text"
                                            id="area"
                                            name="area"
                                            onChange={handleChange}
                                            style={{ border: "1px solid #08DA75", height: "40px" }}
                                        />
                                        <label
                                            className="mx-2 mb-2"
                                            htmlFor="pinCode"
                                            style={{
                                                fontWeight: 400,
                                                fontSize: "20px",
                                                fontFamily: "Lato, sans-serif",
                                            }}
                                        >
                                            Pin Code
                                        </label>
                                        <input
                                            className="mx-2 mb-2"
                                            type="number"
                                            id="pinCode"
                                            name="pinCode"
                                            onChange={handleChange}
                                            style={{ border: "1px solid #08DA75", height: "40px" }}
                                        />
                                    </span>
                                </div>
                                <div>
                                    <span>
                                        <label
                                            className="mx-2 mb-2"
                                            htmlFor="district"
                                            style={{
                                                fontWeight: 400,
                                                fontSize: "20px",
                                                fontFamily: "Lato, sans-serif",
                                            }}
                                        >
                                            District
                                        </label>
                                        <input
                                            className="mx-2 mb-2"
                                            type="text"
                                            id="district"
                                            name="district"
                                            onChange={handleChange}
                                            style={{ border: "1px solid #08DA75", height: "40px" }}
                                        />
                                        <label
                                            className="mx-2 mb-2"
                                            htmlFor="state"
                                            style={{
                                                fontWeight: 400,
                                                fontSize: "20px",
                                                fontFamily: "Lato, sans-serif",
                                            }}
                                        >
                                            State
                                        </label>
                                        <input
                                            className="mx-2 mb-2"
                                            type="text"
                                            id="state"
                                            name="state"
                                            onChange={handleChange}
                                            style={{ border: "1px solid #08DA75", height: "40px" }}
                                        />
                                    </span>
                                </div>
                            </div>

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
                                    onClick={handleRegister}
                                >
                                    Process
                                </button>
                            </div>
                        </form>
                    </div>
                </div >
            </div >
        </>
    );
}
