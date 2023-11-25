import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Sidebar from "./sidebar";
import Header from "./header";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal } from 'react-responsive-modal';
import UserSidebar from "./userSidebar";
import UserHeader from "./userHeader";


export default function BookAppointment()
{
    let isTab = useMediaQuery({ query: "(max-width: 768px)" });
    const baseUrl = process.env.REACT_APP_BASE_URL
    const [selectedDoctor, setSelectedDoctor] = useState();
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const navigate = useNavigate()
    const location = useLocation();
    const [patientDetails, setPatientDetails] = useState({
        doctorId: localStorage.getItem("doctorId"),
        patientId: localStorage.getItem("patientId"),
        appointmentDate: {
            date: "",
            time: ""
        },
        issues: [],
        diseases: [],

    })

    useEffect(() =>
    {
        const doctor = location?.state
        setSelectedDoctor(doctor?.doctor)
        console.log("SELECTED DOCTOR", selectedDoctor)
    }, [selectedDoctor])

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

        if (name === "date" || name === "time")
        {
            setPatientDetails(prevPatientDetails => ({
                ...prevPatientDetails,
                appointmentDate: {
                    ...prevPatientDetails.appointmentDate,
                    [name]: value,
                }
            }))
        }
        if (["issues"].includes(name))
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
            `${baseUrl}/api/v1/user/create_appointment`,
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
                            Congratulations
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
                            Your Appointment Has Been Booked.<br />
                            Please wait for Confirmation.<br />

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
                        width: isTab ? "100%" : "77%"
                    }}
                >
                    <UserHeader line1="Patient’s Appointment Booking" line2=""></UserHeader>
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

                            <div className="flex flex-col md:flex-row justify-between">
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
                                        name="date"
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
                                        name="time"
                                        style={{ border: "1px solid #08DA75", height: "40px" }}
                                        onChange={handleChange}
                                    />
                                </span>
                            </div>

                            <div className="flex flex-col md:flex-row justify-between">
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
                                        <select
                                            className="mx-5"
                                            type="text"
                                            id="issues"
                                            name="issues"
                                            onChange={handleChange}

                                        >
                                            {SymptomsDropdown?.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                        {/* <div className="autocomplete-container mx-5">
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
                                        </div> */}
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
                                    Process
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
