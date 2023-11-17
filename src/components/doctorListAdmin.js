import React, { useEffect, useState } from "react";
import Header from "./header";
import { useMediaQuery } from "react-responsive";
import AdminSidebar from "./adminSidebar";
import { Modal } from 'react-responsive-modal';
import { useNavigate } from "react-router-dom";


const svg1 = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.7778 10C17.7778 7.83333 17.0231 5.99537 15.5139 4.48611C14.0046 2.97685 12.1667 2.22222 10 2.22222V0C11.3889 0 12.6898 0.263889 13.9028 0.791667C15.1157 1.31944 16.1713 2.03241 17.0694 2.93056C17.9676 3.8287 18.6806 4.88426 19.2083 6.09722C19.7361 7.31019 20 8.61111 20 10H17.7778ZM13.3333 10C13.3333 9.07407 13.0093 8.28704 12.3611 7.63889C11.713 6.99074 10.9259 6.66667 10 6.66667V4.44444C11.537 4.44444 12.8472 4.98611 13.9306 6.06944C15.0139 7.15278 15.5556 8.46296 15.5556 10H13.3333ZM18.8333 20C16.5185 20 14.2315 19.4954 11.9722 18.4861C9.71296 17.4769 7.65741 16.0463 5.80556 14.1944C3.9537 12.3426 2.52315 10.287 1.51389 8.02778C0.50463 5.76852 0 3.48148 0 1.16667C0 0.833333 0.111111 0.555556 0.333333 0.333333C0.555556 0.111111 0.833333 0 1.16667 0H5.66667C5.92593 0 6.15741 0.087963 6.36111 0.263889C6.56482 0.439815 6.68519 0.648148 6.72222 0.888889L7.44444 4.77778C7.48148 5.07407 7.47222 5.32407 7.41667 5.52778C7.36111 5.73148 7.25926 5.90741 7.11111 6.05556L4.41667 8.77778C4.78704 9.46296 5.22685 10.125 5.73611 10.7639C6.24537 11.4028 6.80556 12.0185 7.41667 12.6111C7.99074 13.1852 8.59259 13.7176 9.22222 14.2083C9.85185 14.6991 10.5185 15.1481 11.2222 15.5556L13.8333 12.9444C14 12.7778 14.2176 12.6528 14.4861 12.5694C14.7546 12.4861 15.0185 12.463 15.2778 12.5L19.1111 13.2778C19.3704 13.3519 19.5833 13.4861 19.75 13.6806C19.9167 13.875 20 14.0926 20 14.3333V18.8333C20 19.1667 19.8889 19.4444 19.6667 19.6667C19.4444 19.8889 19.1667 20 18.8333 20ZM3.36111 6.66667L5.19444 4.83333L4.72222 2.22222H2.25C2.34259 2.98148 2.47222 3.73148 2.63889 4.47222C2.80556 5.21296 3.0463 5.94444 3.36111 6.66667ZM13.3056 16.6111C14.0278 16.9259 14.7639 17.1759 15.5139 17.3611C16.2639 17.5463 17.0185 17.6667 17.7778 17.7222V15.2778L15.1667 14.75L13.3056 16.6111Z" fill="#08DA75"/>
</svg>`;
const svg2 = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 12H12V10H4V12ZM4 9H16V7H4V9ZM4 6H16V4H4V6ZM0 20V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H4L0 20ZM3.15 14H18V2H2V15.125L3.15 14Z" fill="#08DA75"/>
</svg>`;

const svg3 = `<svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.5 0L15.3064 8.63729H24.3882L17.0409 13.9754L19.8473 22.6127L12.5 17.2746L5.15268 22.6127L7.95911 13.9754L0.611794 8.63729H9.69357L12.5 0Z" fill="#FFF500"/>
</svg>`;

const svg4 = `<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.2237 22.2222V20.243L8.6473 6.66664L6.66813 8.6458L20.2445 22.2222H22.2237ZM25.0015 25H19.0987L0.800076 6.66664C0.545446 6.38886 0.348687 6.08214 0.209798 5.7465C0.0709093 5.41085 0.00146484 5.05784 0.00146484 4.68747C0.00146484 4.3171 0.0709093 3.9583 0.209798 3.61108C0.348687 3.26386 0.55702 2.96293 0.834798 2.7083L2.77924 0.798582C3.03387 0.520803 3.3348 0.318256 3.68202 0.190942C4.02924 0.0636268 4.37646 -3.09348e-05 4.72369 -3.09348e-05C5.09406 -3.09348e-05 5.44707 0.0636268 5.78271 0.190942C6.11836 0.318256 6.42508 0.520803 6.70285 0.798582L25.0015 19.0972V25ZM7.67508 7.67358L6.66813 8.6458L8.6473 6.66664L7.67508 7.67358Z" fill="white"/>
</svg>`

const svg5 = `<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.6875 24.9999C3.82812 24.9999 3.09245 24.7279 2.48047 24.1839C1.86849 23.6399 1.5625 22.986 1.5625 22.2221V4.16654H0V1.38877H7.8125V-0.00012207H17.1875V1.38877H25V4.16654H23.4375V22.2221C23.4375 22.986 23.1315 23.6399 22.5195 24.1839C21.9076 24.7279 21.1719 24.9999 20.3125 24.9999H4.6875ZM20.3125 4.16654H4.6875V22.2221H20.3125V4.16654ZM7.8125 19.4443H10.9375V6.94432H7.8125V19.4443ZM14.0625 19.4443H17.1875V6.94432H14.0625V19.4443Z" fill="white"/>
</svg>`

export default function DoctorListAdmin()
{
    let isTab = useMediaQuery({ query: "(max-width: 768px)" });
    const [doctorsList, setDoctorsList] = useState([])
    const [selectedDoctor, setselectedDoctor] = useState();
    const [isEditDoctorModalVisible, setEditDoctorModalVisible] = useState(false)
    const [editDoctorId, setEditDoctorId] = useState(null)
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const [searchTerm, setSearchTerm] = useState('');


    const baseUrl = process.env.REACT_APP_BASE_URL

    const categories = [
        { name: "All", value: "1" },
        { name: "Cardiologist", value: "2" },
        { name: "Therapist", value: "3" },
        { name: "Pediatrician", value: "4" },
        { name: "Neurologist", value: "5" },
        { name: "Physiotherapist", value: "6" },
    ];

    useEffect(() =>
    {
        const fetchDoctors = async () =>
        {
            try
            {
                const token = localStorage.getItem("token");
                if (!token)
                {
                    console.error("No token found in local storage");
                    return;
                }
                const response = await fetch(`${baseUrl}/api/v1/admin/list_doctors`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': token // Replace with your actual token from the previous session
                    }
                });

                const data = await response.json();
                console.log("DATA from response", data?.data)
                const verifiedDoctors = data.data.filter(doctor => doctor.accountVerified.isVerified);
                setDoctorsList(verifiedDoctors);

            } catch (error)
            {
                console.error('There was an error verifying the OTP:', error);
            }
        }
        fetchDoctors()
    }, [])

    useEffect(() =>
    {
        const filteredDoctors = doctorsList.filter(doctor =>
            doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setDoctorsList(filteredDoctors);
    }, [searchTerm,]);

    const handleEditDoctor = (doctorId) =>
    {
        localStorage.setItem("doctorId", doctorId);
        navigate("/editdoctorform")
        console.log("Edit function")
    }

    const handleDeleteDoctor = async (doctorId) =>
    {
        try
        {
            const token = localStorage.getItem("token");
            if (!token)
            {
                console.error("No token found in local storage");
                return;
            }
            const response = await fetch(`${baseUrl}/api/v1/admin/delete_doctor/${doctorId}`, {
                method: 'DELETE', // Use DELETE method
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token // Use the stored token
                }
            });

            const data = await response.json();

            if (response.ok)
            {
                console.log("Doctor deleted successfully", data);
                // Update the list in the UI by removing the deleted doctor
                setDoctorsList(prevDoctorsList => prevDoctorsList.filter(doctor => doctor._id !== doctorId));
            } else
            {
                console.error("Failed to delete the doctor", data?.message);
            }

        } catch (error)
        {
            console.error('There was an error deleting the doctor:', error);
        }
    };

    const findSelectedDoctor = async (doctorId) =>
    {
        console.log("DOCTOR ID", doctorId)
        // Assuming doctorsList is an array of doctor objects and each doctor has an _id field.
        const doctor = doctorsList?.find((doc) => doc._id === doctorId);
        setselectedDoctor(doctor); // This will return the doctor object if found, otherwise undefined
        onOpenModal()
    };

    console.log("SEARCH TERM IN PARENT COMPONENT", searchTerm)

    return (
        <>
            <div
                className="flex min-h-screen relative overflow-auto 
    box-border"
            >
                <AdminSidebar></AdminSidebar>

                <Modal open={open}
                    onClose={onCloseModal}
                    center
                    doctor={selectedDoctor}
                    styles={{
                        modal: {
                            // Set your custom width here (e.g., '70%')
                            width: isTab ? '80%' : '70%',
                            backgroundColor: '#08DA75',
                            alignContent: 'center'
                        },
                    }}
                >
                    <div
                        className="flex flex-col bg-customRedp-2  items-center w-[100%] md:w-[100%]  mt-[2%]"
                    >
                        <div className="flex flex-row w-[100%] justify-between"
                        >
                            <span className="flex flex-col justify-start">
                                <text style={{
                                    fontWeight: 400,
                                    fontSize: !isTab ? '20px' : '16px',
                                    fontFamily: "Lato, sans-serif",
                                    color: 'white'
                                }}>{selectedDoctor?.workingDays?.map((day) => (
                                    <span key={day}>{day.slice(0, 3)} </span>
                                ))}</text>
                                <text style={{
                                    fontWeight: 400,
                                    fontSize: !isTab ? '20px' : '16px',
                                    fontFamily: "Lato, sans-serif",
                                    color: 'white'
                                }}>{selectedDoctor?.workingHours?.workHourFrom}:00 To {selectedDoctor?.workingHours?.workHourTo}:00</text>
                            </span>

                            <img
                                src="data:image/png;base64,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"
                                alt="Avatar"
                                style={{
                                    borderRadius: "50%",
                                    height: isTab ? "40px" : "123px",
                                    width: isTab ? "40px" : "123px",
                                }}
                            ></img>


                            <span className="flex flex-col justify-start">
                                <text style={{ color: "#08DA75" }}>Mon-Fri</text>
                                <text style={{ color: "#08DA75" }}>10:00am-6:00pm</text>
                            </span>
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
                            Dr. {selectedDoctor?.name}
                        </text>
                        <text
                            className="ml-4 text-center mt-4"
                            style={{
                                fontSize: isTab ? "12px" : "20px",
                                fontWeight: 400,
                                lineHeight: "24px",
                                fontFamily: "Lato, sans-serif",
                                color: '#FFFFFF',
                                marginBottom: "2%"
                            }}
                        >
                            {selectedDoctor?.email}
                        </text>
                        <text
                            className="ml-4 text-center mt-2"
                            style={{
                                fontSize: isTab ? "16px" : "24px",
                                fontWeight: 400,
                                lineHeight: "28.8px",
                                fontFamily: "Lato, sans-serif",
                                color: "white",
                            }}
                        >
                            {selectedDoctor?.speciality}
                        </text>
                        <text
                            className="ml-4 text-center mt-2"
                            style={{
                                fontSize: isTab ? "14px" : "22px",
                                fontWeight: 400,
                                lineHeight: "28.8px",
                                fontFamily: "Lato, sans-serif",
                                color: "white",
                            }}
                        >
                            {selectedDoctor?.totalExperience
                            } Years Experience
                        </text>
                        <text
                            className="ml-4 text-center mt-2"
                            style={{
                                fontSize: isTab ? "14px" : "20px",
                                fontWeight: 400,
                                lineHeight: "28.8px",
                                fontFamily: "Lato, sans-serif",
                                color: "white",
                            }}
                        >
                            {selectedDoctor?.degree}
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
                            {selectedDoctor?.address?.houseNo + " " + selectedDoctor?.address?.block + " " + selectedDoctor?.address?.area + ", " + selectedDoctor?.address?.district + ", " + selectedDoctor?.address?.state + " " + selectedDoctor?.address?.pinCode}
                        </text>

                        <div className="flex flex-row justify-center gap-8 w-[100%] mt-8">
                            <span
                                style={{
                                    width: '25px',
                                    height: '25px',
                                }}
                                onClick={() => handleEditDoctor(selectedDoctor?._id)}
                                dangerouslySetInnerHTML={{ __html: svg4 }}
                            ></span>
                            <span
                                style={{
                                    width: '25px',
                                    height: '25px',
                                }}
                                onClick={() => handleDeleteDoctor(selectedDoctor?._id)}
                                dangerouslySetInnerHTML={{ __html: svg5 }}
                            >
                            </span>
                        </div>
                        <div className="flex flex-row justify-between gap-3 mt-10 w-[95%]">
                            <span className="flex">
                                <span
                                    className="mr-8"
                                    style={{ width: "8px", height: "20px" }}
                                    dangerouslySetInnerHTML={{ __html: svg1 }}
                                ></span>
                                <span
                                    style={{ width: "8px", height: "20px" }}
                                    dangerouslySetInnerHTML={{ __html: svg2 }}
                                ></span>
                            </span>

                            <span className="flex">
                                <span
                                    className="mr-8"
                                    style={{ width: "8px", height: "20px" }}
                                    dangerouslySetInnerHTML={{ __html: svg3 }}
                                ></span>
                                <text
                                    style={{
                                        fontWeight: 400,
                                        fontSize: isTab ? "14px" : "20px",
                                        fontFamily: "Lato, sans-serif",
                                        color: "white",
                                    }}
                                >
                                    (4.5 Ratings)
                                </text>
                            </span>
                        </div>
                    </div>
                </Modal>




                <div
                    className="flex flex-col bg-customGreen"
                    style={{
                        width: isTab ? "100%" : "77%",
                    }}
                >
                    <Header line1="Find" line2="Doctors" isAdd='true' searchTerm={searchTerm} setSearchTerm={setSearchTerm}></Header>

                    <div
                        className="flex flex-col gap-2 px-3 w-full"
                        style={{
                            top: "4%",
                            left: "2%",
                            position: "relative",

                            // overflowY:"hidden",
                            justifyContent: "center",
                        }}
                    >
                        <div
                            className="divWithHiddenScrollbar flex flex-row gap-4 "
                            style={{
                                overflowX: 'auto',
                                position: 'relative',
                                msOverflowStyle: 'none',  // IE and Edge
                                scrollbarWidth: 'none',  // Firefox
                            }}
                        >

                            {categories.map((items) => (
                                <span
                                    className="bg-#E4FFF2; cursor-pointer px-8 hover:bg-customRed"
                                    style={{
                                        left: "2%",
                                        height: "29px",
                                        border: "1px solid #08DA75",
                                        borderRadius: "5px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        fontFamily: "Lato, sans-serif",
                                        fontWeight: 400,
                                        fontSize: "20px",
                                        lineHeight: "28.8px",
                                        color: "#595959"
                                    }}
                                    key={items.value}
                                >
                                    {items.name}
                                </span>
                            ))}
                        </div>

                        {/* Doctors Array Start */}

                        <div style={{ marginTop: "10px" }}>
                            {
                                doctorsList?.map((doctor, index) =>
                                (
                                    <div
                                        key={doctor._id ? doctor._id : index} // Using a combination of _id and index
                                        className="flex flex-col bg-white"
                                        style={{ borderRadius: "5px", marginBottom: "10px" }}
                                    >
                                        <div className="flex flex-row p-4 md:flex-row justify-between"
                                            onClick={() => { findSelectedDoctor(doctor?._id) }}

                                        >
                                            <span className="flex flex-row items-center">
                                                <img
                                                    src="data:image/png;base64,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"
                                                    alt="Avatar"
                                                    style={{
                                                        borderRadius: "50%",
                                                        height: isTab ? "40px" : "81px",
                                                        width: isTab ? "40px" : "81px",
                                                    }}
                                                ></img>
                                                <span className="flex flex-col ml-4">
                                                    <text
                                                        style={{
                                                            fontSize: isTab ? "18px" : "22px",
                                                            fontWeight: 400,
                                                            lineHeight: "28.8px",
                                                            fontFamily: "Lato, sans-serif",
                                                        }}
                                                    >
                                                        Dr. {doctor.name}
                                                    </text>
                                                    <text
                                                        style={{
                                                            fontSize: isTab ? "15px" : "20px",
                                                            fontWeight: 400,
                                                            lineHeight: "28.8px",
                                                            fontFamily: "Lato, sans-serif",
                                                            color: '#A4A4A4'
                                                        }}
                                                    >
                                                        {doctor.speciality
                                                        }
                                                    </text>
                                                    <text
                                                        style={{
                                                            fontSize: isTab ? "14px" : "18px",
                                                            fontWeight: 400,
                                                            lineHeight: "28.8px",
                                                            fontFamily: "Lato, sans-serif",
                                                            color: '#A4A4A4'
                                                        }}
                                                    >
                                                        {doctor.totalExperience} Years Experience
                                                    </text>
                                                </span>
                                            </span>
                                            <span className="flex flex-col pr-4">
                                                <span className="flex gap-8">
                                                    <span
                                                        style={{ width: "8px", height: "20px" }}
                                                        dangerouslySetInnerHTML={{ __html: svg1 }}
                                                    ></span>
                                                    <span
                                                        style={{ width: "8px", height: "20px" }}
                                                        dangerouslySetInnerHTML={{ __html: svg2 }}
                                                    ></span>
                                                </span>
                                            </span>
                                        </div>
                                        <div className="flex flex-row justify-end p-2 mt-[-3%]">
                                            <span className="flex">
                                                <span
                                                    className="mr-8"
                                                    style={{ width: "8px", height: "20px", }}
                                                    dangerouslySetInnerHTML={{ __html: svg3 }}
                                                ></span>
                                                <text
                                                    style={{
                                                        fontWeight: 400,
                                                        fontSize: "20px",
                                                        fontFamily: "Lato, sans-serif",
                                                        color: "#A4A4A4",
                                                    }}
                                                >
                                                    (4.5 Ratings)
                                                </text>
                                            </span>
                                        </div>


                                    </div>
                                ))
                            }
                        </div>




                    </div>
                </div>
            </div>
        </>
    );
}
