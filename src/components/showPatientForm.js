import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { Modal } from 'react-responsive-modal';
import UserSidebar from "./userSidebar";
import AdminHeader from "./adminHeader";

const svg1 = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.7778 10C17.7778 7.83333 17.0231 5.99537 15.5139 4.48611C14.0046 2.97685 12.1667 2.22222 10 2.22222V0C11.3889 0 12.6898 0.263889 13.9028 0.791667C15.1157 1.31944 16.1713 2.03241 17.0694 2.93056C17.9676 3.8287 18.6806 4.88426 19.2083 6.09722C19.7361 7.31019 20 8.61111 20 10H17.7778ZM13.3333 10C13.3333 9.07407 13.0093 8.28704 12.3611 7.63889C11.713 6.99074 10.9259 6.66667 10 6.66667V4.44444C11.537 4.44444 12.8472 4.98611 13.9306 6.06944C15.0139 7.15278 15.5556 8.46296 15.5556 10H13.3333ZM18.8333 20C16.5185 20 14.2315 19.4954 11.9722 18.4861C9.71296 17.4769 7.65741 16.0463 5.80556 14.1944C3.9537 12.3426 2.52315 10.287 1.51389 8.02778C0.50463 5.76852 0 3.48148 0 1.16667C0 0.833333 0.111111 0.555556 0.333333 0.333333C0.555556 0.111111 0.833333 0 1.16667 0H5.66667C5.92593 0 6.15741 0.087963 6.36111 0.263889C6.56482 0.439815 6.68519 0.648148 6.72222 0.888889L7.44444 4.77778C7.48148 5.07407 7.47222 5.32407 7.41667 5.52778C7.36111 5.73148 7.25926 5.90741 7.11111 6.05556L4.41667 8.77778C4.78704 9.46296 5.22685 10.125 5.73611 10.7639C6.24537 11.4028 6.80556 12.0185 7.41667 12.6111C7.99074 13.1852 8.59259 13.7176 9.22222 14.2083C9.85185 14.6991 10.5185 15.1481 11.2222 15.5556L13.8333 12.9444C14 12.7778 14.2176 12.6528 14.4861 12.5694C14.7546 12.4861 15.0185 12.463 15.2778 12.5L19.1111 13.2778C19.3704 13.3519 19.5833 13.4861 19.75 13.6806C19.9167 13.875 20 14.0926 20 14.3333V18.8333C20 19.1667 19.8889 19.4444 19.6667 19.6667C19.4444 19.8889 19.1667 20 18.8333 20ZM3.36111 6.66667L5.19444 4.83333L4.72222 2.22222H2.25C2.34259 2.98148 2.47222 3.73148 2.63889 4.47222C2.80556 5.21296 3.0463 5.94444 3.36111 6.66667ZM13.3056 16.6111C14.0278 16.9259 14.7639 17.1759 15.5139 17.3611C16.2639 17.5463 17.0185 17.6667 17.7778 17.7222V15.2778L15.1667 14.75L13.3056 16.6111Z" fill="#08DA75"/>
</svg>`;
const svg2 = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 12H12V10H4V12ZM4 9H16V7H4V9ZM4 6H16V4H4V6ZM0 20V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H4L0 20ZM3.15 14H18V2H2V15.125L3.15 14Z" fill="#08DA75"/>
</svg>`;

const svg3 = `<svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.5 0L15.3064 8.63729H24.3882L17.0409 13.9754L19.8473 22.6127L12.5 17.2746L5.15268 22.6127L7.95911 13.9754L0.611794 8.63729H9.69357L12.5 0Z" fill="#FFF500"/>
</svg>`;


export default function ShowPatientForm()
{
    let isTab = useMediaQuery({ query: "(max-width: 768px)" });
    const baseUrl = process.env.REACT_APP_BASE_URL
    const [selectedDoctor, setselectedDoctor] = useState();
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const navigate = useNavigate()
    const [patientDetails, setPatientDetails] = useState({
        name: "",
        // appointmentDate: "",
        // appointmentTime: "",
        age: "",
        bodyWeight: "",
        // issues: [],
        // diseases: [],
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


    const SymptomsDropdown = [
        { label: "Select Symptom", value: "" },
        { label: "Fever", value: "Fever" },
        { label: "Cough", value: "Cough" },
        { label: "Shortness of Breath", value: "Shortness of Breath" },
        { label: "Fatigue", value: "Fatigue" },
        { label: "Headache", value: "Headache" },
        { label: "Muscle or Body Aches", value: "Muscle or Body Aches" },
        { label: "Sore Throat", value: "Sore Throat" },
        { label: "Congestion or Runny Nose", value: "Congestion or Runny Nose" },
        { label: "Nausea or Vomiting", value: "Nausea or Vomiting" },
        { label: "Diarrhea", value: "Diarrhea" },
        { label: "Chills", value: "Chills" },
        { label: "Chest Pain", value: "Chest Pain" },
        { label: "Dizziness", value: "Dizziness" },
        { label: "Abdominal Pain", value: "Abdominal Pain" },
        { label: "Loss of Appetite", value: "Loss of Appetite" },
        { label: "Rapid Heartbeat", value: "Rapid Heartbeat" },
        { label: "Dehydration", value: "Dehydration" },
        { label: "Skin Rash", value: "Skin Rash" },
        { label: "Weight Loss", value: "Weight Loss" },
        { label: "Swelling", value: "Swelling" },
        { label: "Bruising", value: "Bruising" },
        { label: "Bleeding", value: "Bleeding" },
        { label: "Constipation", value: "Constipation" },
        { label: "Insomnia", value: "Insomnia" },
        { label: "Anxiety", value: "Anxiety" },
        { label: "Depression", value: "Depression" },
        { label: "Palpitations", value: "Palpitations" },
        { label: "Blurred Vision", value: "Blurred Vision" },
        { label: "Hearing Loss", value: "Hearing Loss" },
        { label: "Tinnitus", value: "Tinnitus" },
        { label: "Hair Loss", value: "Hair Loss" },
        { label: "Frequent Urination", value: "Frequent Urination" },
        { label: "Urinary Incontinence", value: "Urinary Incontinence" },
        { label: "Back Pain", value: "Back Pain" },
        { label: "Joint Pain", value: "Joint Pain" },
        { label: "Memory Loss", value: "Memory Loss" },
        { label: "Difficulty Concentrating", value: "Difficulty Concentrating" },
        { label: "Stiffness", value: "Stiffness" },
        { label: "Tremors", value: "Tremors" },
        { label: "Numbness or Tingling", value: "Numbness or Tingling" },
        { label: "Weakness", value: "Weakness" },
        { label: "Change in Vision", value: "Change in Vision" },
        { label: "Difficulty Swallowing", value: "Difficulty Swallowing" },
        { label: "Excessive Thirst", value: "Excessive Thirst" },
        { label: "Excessive Hunger", value: "Excessive Hunger" },
        { label: "Night Sweats", value: "Night Sweats" },
        { label: "Hot Flashes", value: "Hot Flashes" },
        { label: "Mood Swings", value: "Mood Swings" },
        { label: "Snoring", value: "Snoring" }
    ];

    const [input, setInput] = useState('');
    const [filteredSymptoms, setFilteredSymptoms] = useState(SymptomsDropdown);

    const handleInputChange = (e) =>
    {
        const userInput = e.target.value;
        setInput(userInput);
        filterSymptoms(userInput);
    };

    const filterSymptoms = (userInput) =>
    {
        if (!userInput)
        {
            setFilteredSymptoms(SymptomsDropdown);
        } else
        {
            const filtered = SymptomsDropdown.filter(symptom =>
                symptom.label.toLowerCase().includes(userInput.toLowerCase())
            );
            setFilteredSymptoms(filtered);
        }
    };

    const handleOptionSelect = (selectedValue) =>
    {
        // Check if the selected issue is already in the list
        if (!patientDetails.issues.includes(selectedValue))
        {
            // If not, add it to the list
            setPatientDetails(prevDetails => ({
                ...prevDetails,
                issues: [...prevDetails.issues, selectedValue]
            }));
        }

        // Optionally, clear the input after selection
        setInput('');
    };

    const handleKeyPress = (e) =>
    {
        if (e.key === 'Enter')
        {
            e.preventDefault(); // Prevent form submission only for Enter key
            if (filteredSymptoms.length > 0)
            {
                handleOptionSelect(filteredSymptoms[0].value);
            }
        }
    };


    const DiseasesDropdown = [
        { label: "Select Disease", value: "" },
        { label: "Common Cold", value: "Common Cold" },
        { label: "Influenza", value: "Influenza" },
        { label: "Asthma", value: "Asthma" },
        { label: "Diabetes Mellitus", value: "Diabetes Mellitus" },
        { label: "Hypertension", value: "Hypertension" },
        { label: "Arthritis", value: "Arthritis" },
        { label: "Depression", value: "Depression" },
        { label: "Anxiety Disorders", value: "Anxiety Disorders" },
        { label: "Allergic Rhinitis", value: "Allergic Rhinitis" },
        { label: "Reflux Esophagitis", value: "Reflux Esophagitis" },
        { label: "Chronic Obstructive Pulmonary Disease", value: "Chronic Obstructive Pulmonary Disease" },
        { label: "Migraine", value: "Migraine" },
        { label: "Chronic Kidney Disease", value: "Chronic Kidney Disease" },
        { label: "Heart Failure", value: "Heart Failure" },
        { label: "Anemia", value: "Anemia" },
        { label: "Coronary Artery Disease", value: "Coronary Artery Disease" },
        { label: "Hyperlipidemia", value: "Hyperlipidemia" },
        { label: "Osteoporosis", value: "Osteoporosis" },
        { label: "Gastroenteritis", value: "Gastroenteritis" },
        { label: "Bronchitis", value: "Bronchitis" },
        { label: "Pneumonia", value: "Pneumonia" },
        { label: "Urinary Tract Infection", value: "Urinary Tract Infection" },
        { label: "Skin Infections", value: "Skin Infections" },
        { label: "Sinusitis", value: "Sinusitis" },
        { label: "Tuberculosis", value: "Tuberculosis" },
        { label: "Hepatitis", value: "Hepatitis" },
        { label: "HIV/AIDS", value: "HIV/AIDS" },
        { label: "Dengue Fever", value: "Dengue Fever" },
        { label: "Typhoid Fever", value: "Typhoid Fever" },
        { label: "Malaria", value: "Malaria" },
        { label: "Chickenpox", value: "Chickenpox" },
        { label: "Measles", value: "Measles" },
        { label: "Peptic Ulcer Disease", value: "Peptic Ulcer Disease" },
        { label: "Pancreatitis", value: "Pancreatitis" },
        { label: "Irritable Bowel Syndrome", value: "Irritable Bowel Syndrome" },
        { label: "Crohn's Disease", value: "Crohn's Disease" },
        { label: "Rheumatoid Arthritis", value: "Rheumatoid Arthritis" },
        { label: "Psoriasis", value: "Psoriasis" },
        { label: "Eczema", value: "Eczema" },
        { label: "Lyme Disease", value: "Lyme Disease" },
        { label: "Sepsis", value: "Sepsis" },
        { label: "Osteoarthritis", value: "Osteoarthritis" },
        { label: "Thyroid Disorders", value: "Thyroid Disorders" },
        { label: "Epilepsy", value: "Epilepsy" },
        { label: "Parkinson's Disease", value: "Parkinson's Disease" },
        { label: "Alzheimer's Disease", value: "Alzheimer's Disease" },
        { label: "Multiple Sclerosis", value: "Multiple Sclerosis" },
        { label: "Cancer", value: "Cancer" }
    ];


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
        if (!token)
        {
            console.error("No token found in local storage");
            return;
        }
        const response = await fetch(
            `${baseUrl}/api/v1/user/register_patient`,
            {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": token,
                },
                body: JSON.stringify(patientDetails)
            }
        );
        const data = await response.json();
        if (data.success === true)
        {
            // navigate("/otp")
            onOpenModal()
            localStorage.setItem("id", data.data._id)
        }
        console.log("DATA from response", data)
    }
    console.log("PATIENT DETAILS", patientDetails)


    return (
        <>
            <div
                className="flex min-h-screen relative overflow-auto 
    box-border"
            >
                <UserSidebar></UserSidebar>

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
                        style={{ borderRadius: "5px" }}
                    >

                        <text
                            className="ml-4 text-center mt-4"
                            style={{
                                fontSize: isTab ? "18px" : "26px",
                                fontWeight: 600,
                                lineHeight: "28.8px",
                                fontFamily: "Lato, sans-serif",
                                color: '#FFFFFF',
                            }}
                        >
                            Patient details saved.
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
                            <svg1 />
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
                            To book appointment. <br />
                            Navigate to patients list.<br />

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
                            <b> Thank You</b>

                        </text>
                    </div>
                </Modal>

                <div
                    className="flex flex-col bg-customGreen"
                    style={{
                        width: isTab ? "100%" : "77%",
                    }}
                >
                    <AdminHeader line1="Patient’s" line2="Detail"></AdminHeader>
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
                            onSubmit={(e) => e.preventDefault()}
                        >
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
                                Patient Name
                            </label>
                            <input
                                className="mx-2"
                                type="text"
                                id="name"
                                name="name"
                                style={{ border: "1px solid #08DA75", height: "40px" }}
                                onChange={handleChange}
                            />
                            {/* 1st Row */}

                            {/* 2nd Row */}

                            {/* <div className="flex flex-col md:flex-row justify-between">
                                <span className="flex flex-col w-[100%] md:w-[50%]">
                                    <label
                                        className="mx-2"
                                        htmlFor="appointmentDate"
                                        style={{
                                            fontWeight: 400,
                                            fontSize: "20px",
                                            fontFamily: "Lato, sans-serif",
                                        }}
                                    >
                                        Appointment Date
                                    </label>
                                    <input
                                        className="mx-2"
                                        type="date"
                                        id="appointmentDate"
                                        name="appointmentDate"
                                        style={{ border: "1px solid #08DA75", height: "40px" }}
                                        onChange={handleChange}
                                    />
                                </span>
                                <span className="flex flex-col w-[100%] md:w-[50%]">
                                    <label
                                        className="mx-2"
                                        htmlFor="appointmentTime"
                                        style={{
                                            fontWeight: 400,
                                            fontSize: "20px",
                                            fontFamily: "Lato, sans-serif",
                                        }}
                                    >
                                        Appointment Time
                                    </label>
                                    <input
                                        className="mx-2"
                                        type="time"
                                        id="appointmentTime"
                                        name="appointmentTime"
                                        style={{ border: "1px solid #08DA75", height: "40px" }}
                                        onChange={handleChange}
                                    />
                                </span>
                            </div> */}

                            {/* 2nd Row */}

                            <div className="flex flex-col md:flex-row justify-between">
                                <span className="flex flex-col w-[100%] md:w-[50%]">
                                    <label
                                        className="mx-2"
                                        htmlFor="age"
                                        style={{
                                            fontWeight: 400,
                                            fontSize: "20px",
                                            fontFamily: "Lato, sans-serif",
                                        }}
                                    >
                                        Age
                                    </label>
                                    <input
                                        className="mx-2"
                                        type="number"
                                        id="age"
                                        name="age"
                                        style={{ border: "1px solid #08DA75", height: "40px" }}
                                        onChange={handleChange}
                                    />
                                </span>
                                <span className="flex flex-col w-[100%] md:w-[50%]">
                                    <label
                                        className="mx-2"
                                        htmlFor="bodyWeight"
                                        style={{
                                            fontWeight: 400,
                                            fontSize: "20px",
                                            fontFamily: "Lato, sans-serif",
                                        }}
                                    >
                                        Body Weight
                                    </label>
                                    <input
                                        className="mx-2"
                                        type="number"
                                        id="bodyWeight"
                                        name="bodyWeight"
                                        style={{ border: "1px solid #08DA75", height: "40px" }}
                                        onChange={handleChange}
                                    />
                                </span>
                            </div>
                            {/* <div className="flex flex-col md:flex-row justify-between">
                                <span className="flex flex-col w-[100%] md:w-[50%]">
                                    <label
                                        className="mx-2"
                                        htmlFor="issues"
                                        style={{
                                            fontWeight: 400,
                                            fontSize: "20px",
                                            fontFamily: "Lato, sans-serif",
                                        }}
                                    >
                                        Issues
                                    </label>
                                    <span style={{ border: "1px solid #08DA75", height: "40px", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                        <div className="mx-5" style={{ display: "flex" }}>
                                            {
                                                patientDetails?.issues?.map((issue) => (
                                                    <div className="breadcrumb-chip" key={issue} style={{ margin: "5px 2px 5px 2px", backgroundColor: "#08DA75", borderRadius: "5%", padding: "2px 5px 0px 5px" }}>
                                                        {issue}
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <div className="autocomplete-container mx-5">
                                            <input
                                                type="text"
                                                id="issues"
                                                name="issues"
                                                placeholder="Search issues..."
                                                value={input}
                                                onChange={handleInputChange}
                                                onKeyPress={handleKeyPress}
                                                style={{ width: '100%', padding: '8px' }}
                                            />
                                            {input && (
                                                <div className="autocomplete-results" style={{ position: 'absolute', zIndex: 1000, backgroundColor: '#fff', width: '100%', border: '1px solid #ddd', borderTop: 'none' }}>
                                                    {filteredSymptoms?.map((option) => (
                                                        <div
                                                            key={option.value}
                                                            className="autocomplete-option"
                                                            onClick={() => handleOptionSelect(option.value)}
                                                            style={{ padding: '8px', cursor: 'pointer' }}
                                                        >
                                                            {option.label}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </span>
                                </span>

                                <span className="flex flex-col w-[100%] md:w-[50%]">
                                    <label
                                        className="mx-2"
                                        htmlFor="diseases"
                                        style={{
                                            fontWeight: 400,
                                            fontSize: "20px",
                                            fontFamily: "Lato, sans-serif",
                                        }}
                                    >
                                        Diseases
                                    </label>
                                    <span style={{ border: "1px solid #08DA75", height: "40px", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                        <div className="mx-5" style={{ display: "flex" }}>
                                            {
                                                patientDetails?.diseases?.map((disease) => (
                                                    <div className="breadcrumb-chip" key={disease} style={{ margin: "5px 2px 5px 2px", backgroundColor: "#08DA75", borderRadius: "5%", padding: "2px 5px 0px 5px" }}>
                                                        {disease}
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <select
                                            className="mx-5"
                                            type="text"
                                            id="diseases"
                                            name="diseases"
                                            onChange={handleChange}

                                        >
                                            {DiseasesDropdown?.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>

                                    </span>
                                </span>
                            </div> */}

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
                            <div className="mx-2 p-5" style={{ border: "1px solid #08DA75", height: "20%" }}>
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
                                    Edit
                                </button>
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
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
