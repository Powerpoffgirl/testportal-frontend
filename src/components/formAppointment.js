import React, { useEffect, useState } from 'react';
import Modal from 'react-responsive-modal';
import { useLocation, useNavigate } from 'react-router-dom';
import { DatePicker, Select, Space, TimePicker } from 'antd';
import "../App.css"
import celebrate from "../assets/celebrate.png"
import 'react-datepicker/dist/react-datepicker.module.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const DiseasesDropdown = [
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
const SymptomsDropdown = [
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


const FormAppoinment = ({ onDataFromChild }) =>
{
    const baseUrl = process.env.REACT_APP_BASE_URL
    const [selectedDoctor, setSelectedDoctor] = useState();
    const navigate = useNavigate()
    const location = useLocation();
    const [patientsList, setPatientsList] = useState([])
    const [doctorsList, setDoctorsList] = useState([])
    const [dataToSend, setDataToSend] = useState('');
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
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
    const [doctorId, setDoctorId] = useState()
    const [doctorName, setDoctorName] = useState()
    const [doctorEmail, setDoctorEmail] = useState()
    const [patientId, setPatientId] = useState()
    const [patientName, setPatientName] = useState()
    useEffect(() =>
    {
        const doctor = location?.state
        setSelectedDoctor(doctor?.doctor)
        console.log("SELECTED DOCTOR", selectedDoctor)
    }, [selectedDoctor])


    useEffect(() =>
    {
        const fetchPatientList = async () =>
        {
            try
            {
                const token = localStorage.getItem("token");
                if (!token)
                {
                    console.error("No token found in local storage");
                    return;
                }
                const response = await fetch(`${baseUrl}/api/v1/user/get_patientsList`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': token // Replace with your actual token from the previous session
                    }
                });

                const data = await response.json();
                console.log("DATA from response", data)
                setPatientsList(data?.data)
            } catch (error)
            {
                console.error('There was an error verifying the OTP:', error);
            }
        }

        const fetchDoctorList = async () =>
        {
            try
            {
                const token = localStorage.getItem("token");
                if (!token)
                {
                    console.error("No token found in local storage");
                    return;
                }
                const response = await fetch(`${baseUrl}/api/v1/list_doctors`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'x-auth-token': token // Replace with your actual token from the previous session
                    }
                });

                const data = await response.json();
                console.log("DATA from response", data)
                setDoctorsList(data?.data)
            } catch (error)
            {
                console.error('There was an error verifying the OTP:', error);
            }
        }

        fetchPatientList()
        fetchDoctorList()
        setDoctorId(localStorage.getItem("doctorId"))
        setDoctorName(localStorage.getItem("doctorName"))
        setDoctorEmail(localStorage.getItem("doctorEmail"))
        setPatientId(localStorage.getItem("patientId"))
        setPatientName(localStorage.getItem("patientName"))
    }, [])

    const handleChange = (e) =>
    {

        const { name, value } = e.target;
        // Assuming 'patientsList' is an array of patient objects with '_id' and 'name'
        const selectedPatient = patientsList.find(patient => patient.name === value);
        const selectedDoctor = doctorsList.find(doctor => doctor.name === value);

        // onDataFromChild(selectedDoctor);

        if (name === "patientName")
        {
            setPatientDetails(prevPatientDetails => ({
                ...prevPatientDetails,
                patientId: selectedPatient?._id,
                [name]: value,
            }));
        }
        else if (name === "doctorName")
        {
            setPatientDetails(prevPatientDetails => ({
                ...prevPatientDetails,
                doctorId: selectedDoctor?._id,
                [name]: value,
            }));
            setDataToSend(value);
            onDataFromChild(value);
        }
        else if (name === "time")
        {
            setPatientDetails(prevPatientDetails => ({
                ...prevPatientDetails,
                appointmentDate: {
                    ...prevPatientDetails.appointmentDate,
                    [name]: value,
                }
            }));
        } else
        {
            setPatientDetails(prevPatientDetails => ({
                ...prevPatientDetails,
                [name]: value
            }));
        }

    };

    const handleChangeIssues = (values) =>
    {
        setPatientDetails(prevPatientDetails => ({
            ...prevPatientDetails,
            issues: values
        }));
    };

    const handleChangeDiseases = (values) =>
    {
        setPatientDetails(prevPatientDetails => ({
            ...prevPatientDetails,
            diseases: values
        }));
    };


    const handleRegister = async (e) =>
    {
        e.preventDefault();
        if (patientDetails.patientId === null)
        {
            toast.error("Please select a member!")
        }
        else if (patientDetails.doctorId === null)
        {
            toast.error("Please select a doctor!")
        }
        else if (patientDetails.appointmentDate.date === null || patientDetails.appointmentDate.date === '')
        {
            toast.error("Please select date!")
        }
        else if (patientDetails.appointmentDate.time === null || patientDetails.appointmentDate.time === '')
        {
            toast.error("Please select time!")
        }
        else if (Array.isArray(patientDetails.issues) && patientDetails.issues.length === 0)
        {
            toast.error("Please select issues!");
        }
        else
        {
            const token = localStorage.getItem("token");
            if (!token)
            {
                console.error("No token found in local storage");
                localStorage.clear()
                navigate("/userlogin")
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
                onOpenModal()
                localStorage.setItem("id", data.data._id)
            }
            console.log("DATA from response", data)
        }

    };

    console.log("PATIENT DETAILS", patientDetails)
    console.log("PATIENT LIST", patientsList)
    console.log("DOCTORS LIST", doctorsList)
    return (
        <form
            className="flex flex-col gap-2 px-3 w-full relative overflow-hidden justify-center"
            onSubmit={(e) => e.preventDefault()}
        >
            <ToastContainer />
            <Modal open={open}
                onClose={onCloseModal}
                center
                doctor={selectedDoctor}
                styles={{
                    modal: {
                        backgroundColor: '#89CFF0',
                        alignContent: 'center',
                        width: "30%"
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
                            // fontSize: isTab ? "18px" : "26px",
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
                            fontSize: "40px",
                            fontWeight: 400,
                            lineHeight: "24px",
                            fontFamily: "Lato, sans-serif",
                            color: '#FFFFFF',
                            marginBottom: "2%"
                        }}
                    >
                        <img src={celebrate} alt='Congratulations' />
                    </text>

                    <text
                        className="ml-4 text-center mt-2"
                        style={{
                            // fontSize: isTab ? "16px" : "24px",
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
                            // fontSize: isTab ? "16px" : "24px",
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="flex flex-col">
                    <label
                        className="mx-2 block text-black text-lg font-semibold"
                        htmlFor="patientName"
                    >
                        Patient Name
                    </label>
                    <select
                        className="mx-2 px-2 border border-[#89CFF0] h-10 rounded-lg"
                        name="patientName"
                        onChange={handleChange}
                    >
                        {
                            patientName ? (
                                <option value={patientName}>{patientName}</option>
                            ) : (
                                patientsList?.map((patient) => (
                                    <option key={patient._id} value={patient.name}>
                                        {patient.name}
                                    </option>
                                ))
                            )
                        }


                    </select>
                </div>

                <div className="flex flex-col">
                    <label
                        className="mx-2 block text-black text-lg font-semibold"
                        htmlFor="doctorName"
                    >
                        Doctor Name
                    </label>
                    <select
                        className="mx-2 px-2  border border-[#89CFF0] h-10 rounded-lg"
                        name="doctorName"
                        onChange={handleChange}
                    >
                        {doctorName ? (
                            <option value={doctorName}>{doctorName}</option>
                        ) : (
                            doctorsList?.map((doctor) => (
                                <option key={doctor._id} value={doctor.name}>
                                    {doctor.name}
                                </option>
                            ))
                        )}
                    </select>

                </div>
            </div>
            {/* 1st Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="flex flex-col">
                    <label
                        className="mx-2 block text-black text-lg font-semibold"
                        htmlFor="appointmentDate"
                    >
                        Appointment Date
                    </label>
                    <DatePicker
                        className="mx-2 px-2 border border-[#89CFF0] h-10 rounded-lg"
                        type="date"
                        id="appointmentDate"
                        name="date"
                        onChange={(date) =>
                        {
                            if (date && date.isValid())
                            {
                                const formattedDate = date.format('DD-MM-YYYY'); // Format the date
                                setPatientDetails(prevPatientDetails => ({
                                    ...prevPatientDetails,
                                    appointmentDate: {
                                        ...prevPatientDetails.appointmentDate,
                                        date: formattedDate // Update state with the formatted date
                                    }
                                }));
                            }
                        }}
                    />
                </div>

                <div className="flex flex-col">
                    <label
                        className="mx-2 block text-black text-lg font-semibold"
                        htmlFor="appointmentTime"
                    >
                        Appointment Time
                    </label>
                    <TimePicker
                        className="mx-2 px-2 border border-[#89CFF0] h-10 rounded-lg"
                        format="HH:mm:ss"
                        id="appointmentTime"
                        name="time"
                        onChange={(time) =>
                        {
                            if (time && time.isValid())
                            {
                                const formattedTime = time.format('HH:mm:ss'); // Format the time
                                setPatientDetails(prevPatientDetails => ({
                                    ...prevPatientDetails,
                                    appointmentDate: {
                                        ...prevPatientDetails.appointmentDate,
                                        time: formattedTime // Update state with the formatted time
                                    }
                                }));
                            }
                        }}
                    />

                </div>
            </div>

            {/* <div className="grid grid-cols-1 w-full gap-4"> */}
            <div className="flex flex-col">
                <label className="mx-2 block text-black text-lg font-semibold" htmlFor="issues">
                    Issues
                </label>
                <Select
                    mode="multiple"
                    className="mx-2 border border-[#89CFF0] rounded-lg"
                    popupClassName="no-border-dropdown-menu"
                    id="issues"
                    name="issues"
                    onChange={handleChangeIssues}
                    value={patientDetails.issues}
                    placeholder="Select Issues"
                    style={{ overflowY: 'auto' }}
                    dropdownStyle={{ maxHeight: '300px', overflowY: 'auto' }} // Set a maximum height for the dropdown
                >
                    {SymptomsDropdown.map((option) => (
                        <Select.Option key={option.value} value={option.value}>
                            {option.label}
                        </Select.Option>
                    ))}
                </Select>
            </div>

            <div className="flex flex-col">
                <label
                    className="mx-2 block text-black text-lg font-semibold"
                    htmlFor="diseases">
                    Disease
                </label>
                <Select
                    mode="multiple"
                    className="mx-2 border border-[#89CFF0] rounded-lg"
                    popupClassName="no-border-dropdown-menu" // Apply the custom class here
                    id="diseases"
                    name="diseases"
                    onChange={handleChangeDiseases}
                    value={patientDetails.diseases}
                    placeholder="Select Disease"
                    style={{ overflowY: 'auto' }}
                    dropdownStyle={{ maxHeight: '300px', overflowY: 'auto' }}
                >
                    {DiseasesDropdown.map((option) => (
                        <Select.Option key={option.value} value={option.value}>
                            {option.label}
                        </Select.Option>
                    ))}
                </Select>
            </div>

            <div className="flex justify-center my-5">
                <button
                    type="submit"
                    className="w-40 h-11 bg-[#89CFF0] rounded-full text-white font-semibold text-xl leading-9 font-lato"
                    onClick={handleRegister}
                >
                    Process
                </button>
            </div>
        </form>

    );
};

export default FormAppoinment;