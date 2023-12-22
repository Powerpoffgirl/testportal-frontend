import React, { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import Modal from "react-responsive-modal";
import { Menu, MenuItem } from "@mui/material";
import { MdEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { HiOutlineUserAdd } from "react-icons/hi";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";


const svg1 = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.7778 10C17.7778 7.83333 17.0231 5.99537 15.5139 4.48611C14.0046 2.97685 12.1667 2.22222 10 2.22222V0C11.3889 0 12.6898 0.263889 13.9028 0.791667C15.1157 1.31944 16.1713 2.03241 17.0694 2.93056C17.9676 3.8287 18.6806 4.88426 19.2083 6.09722C19.7361 7.31019 20 8.61111 20 10H17.7778ZM13.3333 10C13.3333 9.07407 13.0093 8.28704 12.3611 7.63889C11.713 6.99074 10.9259 6.66667 10 6.66667V4.44444C11.537 4.44444 12.8472 4.98611 13.9306 6.06944C15.0139 7.15278 15.5556 8.46296 15.5556 10H13.3333ZM18.8333 20C16.5185 20 14.2315 19.4954 11.9722 18.4861C9.71296 17.4769 7.65741 16.0463 5.80556 14.1944C3.9537 12.3426 2.52315 10.287 1.51389 8.02778C0.50463 5.76852 0 3.48148 0 1.16667C0 0.833333 0.111111 0.555556 0.333333 0.333333C0.555556 0.111111 0.833333 0 1.16667 0H5.66667C5.92593 0 6.15741 0.087963 6.36111 0.263889C6.56482 0.439815 6.68519 0.648148 6.72222 0.888889L7.44444 4.77778C7.48148 5.07407 7.47222 5.32407 7.41667 5.52778C7.36111 5.73148 7.25926 5.90741 7.11111 6.05556L4.41667 8.77778C4.78704 9.46296 5.22685 10.125 5.73611 10.7639C6.24537 11.4028 6.80556 12.0185 7.41667 12.6111C7.99074 13.1852 8.59259 13.7176 9.22222 14.2083C9.85185 14.6991 10.5185 15.1481 11.2222 15.5556L13.8333 12.9444C14 12.7778 14.2176 12.6528 14.4861 12.5694C14.7546 12.4861 15.0185 12.463 15.2778 12.5L19.1111 13.2778C19.3704 13.3519 19.5833 13.4861 19.75 13.6806C19.9167 13.875 20 14.0926 20 14.3333V18.8333C20 19.1667 19.8889 19.4444 19.6667 19.6667C19.4444 19.8889 19.1667 20 18.8333 20ZM3.36111 6.66667L5.19444 4.83333L4.72222 2.22222H2.25C2.34259 2.98148 2.47222 3.73148 2.63889 4.47222C2.80556 5.21296 3.0463 5.94444 3.36111 6.66667ZM13.3056 16.6111C14.0278 16.9259 14.7639 17.1759 15.5139 17.3611C16.2639 17.5463 17.0185 17.6667 17.7778 17.7222V15.2778L15.1667 14.75L13.3056 16.6111Z" fill="#89CFF0"/>
</svg>`;
const svg2 = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 12H12V10H4V12ZM4 9H16V7H4V9ZM4 6H16V4H4V6ZM0 20V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H4L0 20ZM3.15 14H18V2H2V15.125L3.15 14Z" fill="#89CFF0"/>
</svg>`;

const svg3 = `<svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.5 0L15.3064 8.63729H24.3882L17.0409 13.9754L19.8473 22.6127L12.5 17.2746L5.15268 22.6127L7.95911 13.9754L0.611794 8.63729H9.69357L12.5 0Z" fill="#FFF500"/>
</svg>`;


export default function EditPatientForm()
{
    let isTab = useMediaQuery({ query: "(max-width: 768px)" });
    const baseUrl = process.env.REACT_APP_BASE_URL
    const [selectedDoctor, setselectedDoctor] = useState();
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isHovered1, setIsHovered1] = useState(false);
    const [userImage, setUserImage] = useState();
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);
    const open1 = Boolean(anchorEl);
    const fileInputRef = useRef(null);
    const [isEditing, setIsEditing] = useState(false);

    const [patientDetails, setPatientDetails] = useState({
        name: "",
        age: "",
        bodyWeight: "",
        address: {
            houseNo: "",
            floor: "",
            block: "",
            area: "",
            pinCode: "",
            district: "",
            state: ""
        },
        patientPic: "",
    })

    useEffect(() =>
    {
        const fetchPatientDetails = async () =>
        {
            try
            {
                const token = localStorage.getItem("token");
                const patientId = localStorage.getItem("patientId")
                if (!token)
                {
                    console.error("No token found in local storage");
                    return;
                }
                const response = await fetch(`${baseUrl}/api/v1/user/get_patientDetails/${patientId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': token // Replace with your actual token from the previous session
                    }
                });

                const data = await response.json();
                console.log("DATA from response", data)
                setPatientDetails(data?.data)
            } catch (error)
            {
                console.error('There was an error verifying the OTP:', error);
            }
        }
        fetchPatientDetails()
    }, [])

    const handleFileSelect = async (event) =>
    {
        const file = event.target.files[0];
        if (file)
        {
            const token = localStorage.getItem("token");
            const doctorId = localStorage.getItem("doctorId");
            const formData = new FormData();
            formData.append("doctorPic", file);

            console.log("FORM DATA", formData);
            try
            {
                const response = await fetch(`${baseUrl}/api/v1/upload_image`, {
                    method: "POST",
                    headers: {
                        "x-auth-token": token,
                    },
                    body: formData,
                });

                if (!response.ok)
                {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Image uploaded successfully:", data);
                setUserImage(data.profilePicImageUrl);
                alert("Image uploaded successfully");

                // Reset the file input
                setSelectedFile(null);
                fileInputRef.current.value = "";
            } catch (error)
            {
                console.error("Error uploading image:", error);
                alert("Error uploading image. Please try again.");
            }
        }
    };

    const handleNewProfilePictureClick = async () =>
    {
        // This will trigger the hidden file input to open the file dialog
        await fileInputRef.current.click();
    };



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
        setIsEditing(!isEditing);
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

        if (["houseNo", "floor", "block", "area", "pinCode", "district", "state"].includes(name))
        {
            setPatientDetails(prevPatientDetails => ({
                ...prevPatientDetails,
                address: {
                    ...prevPatientDetails.address,
                    [name]: value
                }
            }));
        } else if (["issues"].includes(name))
        {
            // Assuming the value is an array or a string to be added to the array
            setPatientDetails(prevPatientDetails => ({
                ...prevPatientDetails,
                [name]: Array.isArray(value) ? value : [...prevPatientDetails[name], value]
            }));
        } else if (["diseases"].includes(name))
        {
            // Assuming the value is an array or a string to be added to the array
            setPatientDetails(prevPatientDetails => ({
                ...prevPatientDetails,
                [name]: Array.isArray(value) ? value : [...prevPatientDetails[name], value]
            }));
        }
        else
        {
            setPatientDetails(prevPatientDetails => ({
                ...prevPatientDetails,
                [name]: value
            }));
        }
    };

    const handleRegister = async (e) =>
    {
        e.preventDefault();
        // Check if the token exists
        const token = localStorage.getItem("token");
        const patientId = localStorage.getItem("patientId");
        if (!token)
        {
            console.error("No token found in local storage");
            localStorage.clear()
            navigate(`/userlogin`)
        }
        const response = await fetch(
            `${baseUrl}/api/v1/user/update_patient/${patientId}`,
            {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": token,
                },
                body: JSON.stringify({
                    age: patientDetails.age,
                    bodyWeight: patientDetails.bodyWeight,
                    name: patientDetails.name,
                    address: patientDetails.address,
                    patientPic: userImage,
                })
            }
        );
        const data = await response.json();
        if (data.success === true)
        {
            onOpenModal();
            localStorage.setItem("id", data.data._id);
        }
        console.log("DATA from response", data);
    }

    console.log("PATIENT DETAILS", patientDetails)


    return (
        <>
            <Modal open={open}
                onClose={onCloseModal}
                center
                doctor={selectedDoctor}
                styles={{
                    modal: {
                        // Set your custom width here (e.g., '70%')
                        width: isTab ? '80%' : '70%',
                        backgroundColor: '#89CFF0',
                        alignContent: 'center'
                    },
                }}
            >
                <div
                    className="flex flex-col bg-customRedp-2  items-center w-[100%] md:w-[100%]  mt-[2%]"
                >

                    <text
                        className="text-center mt-4 mb-4"
                        style={{
                            fontSize: isTab ? "14px" : "20px",
                            fontWeight: 600,
                            lineHeight: "28.8px",
                            fontFamily: "Lato, sans-serif",
                            color: "#FFFFFF"
                        }}
                    >
                        Patient's Details is Saved.<br />
                        Go to Patient's list to book an Appointment.
                    </text>
                </div>
            </Modal>

            <div className="flex flex-row">

                <div className=" w-full">

                    <div className="mt-6 p-2">
                        <div className="flex  flex-col items-center justify-center w-full">
                            <div className="cursor-pointer">
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <div
                                        style={{
                                            backgroundColor: "#FFFFFF",
                                            width: "90px",
                                            height: "90px",
                                            borderRadius: "50%",
                                            alignItems: "center",
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-evenly",
                                            color: "#A4A4A4",
                                        }}
                                    >
                                        {userImage || patientDetails?.patientPic ? (
                                            <img
                                                src={userImage || patientDetails?.patientPic}
                                                alt="Avatar"
                                                style={{
                                                    borderRadius: "50%",
                                                }}
                                            />
                                        ) : (
                                            <PermIdentityOutlinedIcon
                                                style={{ width: "70px", height: "70px" }}
                                            />
                                        )}
                                    </div>
                                    <p
                                        aria-controls="profile-pic-menu"
                                        aria-haspopup="true"
                                        aria-expanded={open ? "true" : undefined}
                                        onClick={handleClick}
                                        style={{
                                            cursor: "pointer",
                                            marginLeft: 37,
                                            marginTop: -20,
                                        }}
                                    >
                                        <MdEdit />
                                    </p>
                                    <div style={{ backgroundColor: "#89CFF0" }}>
                                        <Menu
                                            id="profile-pic-menu"
                                            anchorEl={anchorEl}
                                            open={open1}
                                            onClose={handleClose}
                                            MenuListProps={{
                                                "aria-labelledby": "edit-profile-pic-text",
                                                style: { backgroundColor: "#89CFF0" }, // Set background color for the whole menu
                                            }}
                                        >
                                            <MenuItem
                                                style={{
                                                    backgroundColor: "#89CFF0",
                                                    color: isHovered ? "red" : "white",
                                                }}

                                                onMouseEnter={() => setIsHovered(true)}
                                                onMouseLeave={() => setIsHovered(false)}
                                            >
                                                {" "}
                                                <span style={{ marginRight: "8px" }}>
                                                    <HiOutlineUserAdd />
                                                </span>
                                                <label htmlFor="files">New profile picture</label>
                                            </MenuItem>

                                            <MenuItem
                                                style={{
                                                    backgroundColor: "#89CFF0",
                                                    color: isHovered1 ? "red" : "white",
                                                }}
                                                onClick={handleRemoveProfilePicture}
                                                onMouseEnter={() => setIsHovered1(true)}
                                                onMouseLeave={() => setIsHovered1(false)}
                                            >
                                                <span style={{ marginRight: "8px" }}>
                                                    <FaRegTrashAlt />
                                                </span>
                                                <span>Remove current picture</span>
                                            </MenuItem>
                                        </Menu>
                                    </div>
                                    <label
                                        style={{ marginLeft: -17, marginTop: 5, fontWeight: "600" }}
                                    >
                                        Edit Profile Picture
                                    </label>
                                    <input
                                        id="files"
                                        type="file"
                                        ref={fileInputRef}
                                        style={{ display: "none" }}
                                        accept="image/*"
                                        onChange={handleFileSelect}
                                    />
                                </div>

                            </div>
                        </div>
                        <div class="grid grid-cols-1 w-full gap-4">
                            <div>
                                <label
                                    for="name"
                                    class="block text-black text-lg font-semibold"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Smita Singh"
                                    id="name"
                                    name="name"
                                    onChange={handleChange}
                                    value={patientDetails.name}
                                    class="block mt-0 w-full placeholder-gray-400/70  rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <div className="flex flex-col">
                                    <label
                                        class="block text-black text-lg font-semibold"
                                        htmlFor="age"
                                    >
                                        Age
                                    </label>
                                    <input
                                        class="block mt-0 w-full placeholder-gray-400/70  rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                        type="text"
                                        id="age"
                                        name="age"
                                        onChange={handleChange}
                                        value={patientDetails.age}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label
                                        class="block text-black text-lg font-semibold" htmlFor="bodyWeight"
                                    >
                                        Body Weight
                                    </label>
                                    <input
                                        class="block mt-0 w-full placeholder-gray-400/70  rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                        type="text"
                                        id="bodyWeight"
                                        name="bodyWeight"
                                        onChange={handleChange}
                                        value={patientDetails.bodyWeight}
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    for="houseNo"
                                    class="block text-black text-lg font-semibold"
                                >
                                    Address
                                </label>
                                <div class="p-3 pb-5 border border-[#89CFF0]">
                                    <div class="flex flex-col sm:flex-row sm:flex-wrap -mx-2">
                                        <div class="px-2 w-full sm:w-1/3">
                                            <label
                                                for="houseNo"
                                                class="block text-black text-lg font-semibold"
                                            >
                                                House No
                                            </label>
                                            <input
                                                type="text"
                                                id="houseNo"
                                                name="houseNo"
                                                onChange={handleChange}
                                                placeholder="1234"
                                                class="block w-full rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                                value={patientDetails.address.houseNo}
                                            />
                                        </div>
                                        <div class="px-2 w-full sm:w-1/3">
                                            <label
                                                for="floor"
                                                class="block text-black text-lg font-semibold"
                                            >
                                                Floor
                                            </label>
                                            <input
                                                type="text"
                                                id="floor"
                                                name="floor"
                                                onChange={handleChange}
                                                placeholder="2nd"
                                                class="block w-full rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                                value={patientDetails.address.floor}
                                            />
                                        </div>
                                        <div class="px-2 w-full sm:w-1/3">
                                            <label
                                                for="block"
                                                class="block text-black text-lg font-semibold"
                                            >
                                                Block
                                            </label>
                                            <input
                                                type="text"
                                                id="block"
                                                name="block"
                                                onChange={handleChange}
                                                placeholder="A"
                                                class="block w-full rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                                value={patientDetails.address.block}
                                            />
                                        </div>
                                        <div class="px-2 w-full sm:w-1/2">
                                            <label
                                                for="area"
                                                class="block text-black text-lg font-semibold"
                                            >
                                                Area
                                            </label>
                                            <input
                                                type="text"
                                                id="area"
                                                name="area"
                                                onChange={handleChange}
                                                placeholder="Green Park"
                                                class="block w-full rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                                value={patientDetails.address.area}
                                            />
                                        </div>
                                        <div class="px-2 w-full sm:w-1/2">
                                            <label
                                                for="pincode"
                                                class="block text-black text-lg font-semibold"
                                            >
                                                Pincode
                                            </label>
                                            <input
                                                type="text"
                                                id="pinCode"
                                                name="pinCode"
                                                onChange={handleChange}
                                                placeholder="110016"
                                                class="block w-full rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                                value={patientDetails.address.pinCode}
                                            />
                                        </div>
                                        <div class="px-2 w-full sm:w-1/2">
                                            <label
                                                for="district"
                                                class="block text-black text-lg font-semibold"
                                            >
                                                District
                                            </label>
                                            <input
                                                type="text"
                                                id="district"
                                                name="district"
                                                onChange={handleChange}
                                                placeholder="South Delhi"
                                                class="block w-full rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                                value={patientDetails.address.district}
                                            />
                                        </div>
                                        <div class="px-2 w-full sm:w-1/2">
                                            <label
                                                for="state"
                                                class="block text-black text-lg font-semibold"
                                            >
                                                State
                                            </label>
                                            <input
                                                type="text"
                                                id="state"
                                                name="state"
                                                onChange={handleChange}
                                                placeholder="Delhi"
                                                class="block w-full rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                                value={patientDetails.address.state}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="mt-10 w-100 items-center justify-center text-center">
                            <button
                                className="rounded-full justify-center px-9 py-2 bg-[#89CFF0] text-white"
                                onClick={handleRegister}
                            >
                                Process
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
