import React, { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Sidebar from "./sidebar";
import Header from "./header";
import { useNavigate } from "react-router-dom";
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button } from "flowbite-react";
import UserSidebar from "./userSidebar";

export default function EditUserForm()
{
    let isTab = useMediaQuery({ query: "(max-width: 768px)" });
    const navigate = useNavigate()
    const baseUrl = process.env.REACT_APP_BASE_URL
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileSelect = (event) =>
    {
        const file = event.target.files[0];
        if (file)
        {
            setSelectedFile(file);
        }
    };

    const handleNewProfilePictureClick = () =>
    {
        // This will trigger the hidden file input to open the file dialog
        fileInputRef.current.click();
        handleNewProfilePicture()
    };

    const handleNewProfilePicture = async () =>
    {
        const token = localStorage.getItem('token');
        const doctorId = localStorage.getItem('doctorId');

        if (!token || !doctorId)
        {
            console.error('Token or doctor ID not found in local storage');
            return;
        }

        const formData = new FormData();
        formData.append('doctorPic', selectedFile);

        try
        {
            const response = await fetch(`${baseUrl}/api/v1/admin/upload_image/${doctorId}`, {
                method: 'POST',
                headers: {
                    'x-auth-token': token,
                    // Content-Type should not be manually set for FormData; the browser will set it with the proper boundary.
                },
                body: formData,
            });

            if (!response.ok)
            {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Image uploaded successfully:', data);
            alert('Image uploaded successfully.');

            // Reset the file input
            setSelectedFile(null);
            fileInputRef.current.value = '';
        } catch (error)
        {
            console.error('Error uploading image:', error);
            alert('Error uploading image. Please try again.');
        }
    };



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
    const [doctorDetails, setDoctorDetails] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const fileInputRef = useRef(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() =>
    {
        const fetchDoctorDetails = async () =>
        {
            try
            {
                const token = localStorage.getItem("token");
                const doctorId = localStorage.getItem("doctorId");
                if (!token)
                {
                    console.error("No token found in local storage");
                    return;
                }
                const response = await fetch(`${baseUrl}/api/v1/admin/get_doctor/${doctorId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': token // Replace with your actual token from the previous session
                    }
                });

                const data = await response.json();
                console.log("DATA from response", data?.data)
                setDoctorDetails(data?.data)

            } catch (error)
            {
                console.error('There was an error verifying the OTP:', error);
            }
        }
        fetchDoctorDetails()
    }, [])

    const handleClick = (event) =>
    {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () =>
    {
        setAnchorEl(null);
    };


    const handleToggleEdit = () =>
    {
        setIsEditing(!isEditing)
    }

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



    const handleUpdate = async (e) =>
    {
        e.preventDefault();
        // Check if the token exists
        const newDoctorDetails = {
            name: doctorDetails?.name,
            // email: doctorDetails.email,
            // contactNumber: doctorDetails.contactNumber,
            workingDays: doctorDetails?.workingDays,
            workingHours: {
                workHourFrom: doctorDetails?.workingHours?.workHourFrom,
                workHourTo: doctorDetails?.workingHours?.workHourTo
            },
            totalExperience: doctorDetails?.totalExperience,
            speciality: doctorDetails?.speciality,
            degree: doctorDetails?.degree,
            address: {
                houseNo: doctorDetails?.address?.houseNo,
                floor: doctorDetails?.address?.floor,
                block: doctorDetails?.address?.block,
                area: doctorDetails?.address?.area,
                pinCode: doctorDetails?.address?.pinCode,
                district: doctorDetails?.address?.district,
                state: doctorDetails?.address?.state
            }
        }

        const token = localStorage.getItem("token");
        const doctorId = localStorage.getItem('doctorId');
        if (!token)
        {
            console.error("No token found in local storage");
            return;
        }
        const response = await fetch(
            `${baseUrl}/api/v1/admin/update_doctor/${doctorId}`,
            {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": token,
                },
                body: JSON.stringify(newDoctorDetails)
            }
        );
        const data = await response.json();
        if (data.success === true)
        {
            console.log("Doctor updated successfully.")
            // navigate("/otp")
            // localStorage.setItem("id", data.data._id)
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
                <UserSidebar></UserSidebar>
                <div
                    className="flex flex-col bg-customGreen"
                    style={{
                        width: isTab ? "100%" : "77%",
                    }}
                >
                    <Header line1="User’s" line2="Detail"></Header>

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
                                    {doctorDetails && doctorDetails?.doctorPic ? (
                                        <img
                                            src={doctorDetails?.doctorPic}
                                            alt="Doctor's Profile"
                                            style={{ width: "70px", height: "70px" }}
                                        />
                                    ) : (
                                        <PermIdentityOutlinedIcon style={{ width: "70px", height: "70px" }} />
                                    )}
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
                                <>
                                    <Menu
                                        id="profile-pic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'edit-profile-pic-text',
                                        }}
                                    >
                                        <MenuItem onClick={handleNewProfilePictureClick}>
                                            New profile picture
                                        </MenuItem>
                                        <MenuItem onClick={handleRemoveProfilePicture}>
                                            Remove current profile picture
                                        </MenuItem>
                                    </Menu>

                                    {/* Hidden file input */}
                                    <input
                                        id="imageInput"
                                        type="file"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        accept="image/*"
                                        onChange={handleFileSelect}
                                    />
                                </>
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
                            {
                                isEditing ? (
                                    <input
                                        className="mx-2"
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={doctorDetails?.name}
                                        onChange={handleChange}
                                        style={{ border: "1px solid #08DA75", height: "40px" }}
                                    />
                                ) : (
                                    <p>{doctorDetails?.name}</p>
                                )
                            }

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
                                value={doctorDetails?.email}
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
                                value={doctorDetails?.contactNumber}
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
                                            value={doctorDetails?.workingHours?.workHourFrom}
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
                                            value={doctorDetails?.workingHours?.workHourTo}
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
                                        value={doctorDetails?.totalExperience}
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
                                        value={doctorDetails?.speciality}
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
                                value={doctorDetails?.degree}
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
                                            value={doctorDetails?.address?.houseNo}
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
                                            value={doctorDetails?.address?.floor}
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
                                            value={doctorDetails?.address?.block}
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
                                            value={doctorDetails?.address?.area}
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
                                            value={doctorDetails?.address?.pinCode}
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
                                            value={doctorDetails?.address?.district}
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
                                            value={doctorDetails?.address?.state}
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
                                    onClick={handleUpdate}
                                >
                                    Process
                                </button>
                                {!isEditing && (
                                    <Button variant="primary" onClick={handleToggleEdit}>
                                        Edit
                                    </Button>
                                )}
                            </div>
                        </form>
                    </div>
                </div >
            </div >
        </>
    );
}
