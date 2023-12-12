import React, { useEffect, useState } from 'react';
import Modal from 'react-responsive-modal';
import { useLocation, useNavigate } from 'react-router-dom';
import { Select, Space } from 'antd';
import "../App.css"


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



const EditFormAppoinment = ({ appointmentDetails }) =>
{
    const baseUrl = process.env.REACT_APP_BASE_URL
    const [selectedDoctor, setSelectedDoctor] = useState();
    const navigate = useNavigate()
    const location = useLocation();
    const [patientsList, setPatientsList] = useState([])
    const [doctorsList, setDoctorsList] = useState([])
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const [newAppointmentDetails, setNewAppointmentDetails] = useState({
        doctorId: appointmentDetails?.doctorId?._id,
        patientId: appointmentDetails?.patientId?._id,
        appointmentDate: {
            date: appointmentDetails?.appointmentDate?.date,
            time: appointmentDetails?.appointmentDate?.time
        },
        issues: appointmentDetails?.issues,
        diseases: appointmentDetails?.diseases,

    })
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
    }, [])

    const handleChange = (e) =>
    {
        const { name, value } = e.target;

        // Assuming 'patientsList' is an array of patient objects with '_id' and 'name'
        const selectedPatient = patientsList.find(patient => patient.name === value);
        const selectedDoctor = doctorsList.find(doctor => doctor.name === value);

        if (name === "patientName")
        {
            setNewAppointmentDetails(prevPatientDetails => ({
                ...prevPatientDetails,
                patientId: selectedPatient?._id,
                [name]: value,
            }));
        }
        else if (name === "doctorName")
        {
            setNewAppointmentDetails(prevPatientDetails => ({
                ...prevPatientDetails,
                doctorId: selectedDoctor?._id,
                [name]: value,
            }));
        }
        else if (name === "date" || name === "time")
        {
            setNewAppointmentDetails(prevPatientDetails => ({
                ...prevPatientDetails,
                appointmentDate: {
                    ...prevPatientDetails.appointmentDate,
                    [name]: value,
                }
            }));
        } else
        {
            setNewAppointmentDetails(prevPatientDetails => ({
                ...prevPatientDetails,
                [name]: value
            }));
        }
    };
    useEffect(() =>
    {
        setNewAppointmentDetails({
            ...newAppointmentDetails,
            issues: appointmentDetails?.issues || [],
            diseases: appointmentDetails?.diseases || [],
            appointmentDate: {
                date: appointmentDetails?.appointmentDate?.date || '',
                time: appointmentDetails?.appointmentDate?.time || ''
            }
        });
    }, [appointmentDetails]);

    // Handle changes in issues
    const handleChangeIssues = (selectedIssues) =>
    {
        setNewAppointmentDetails(prevAppointmentDetails => ({
            ...prevAppointmentDetails,
            issues: selectedIssues
        }));
    };

    // Handle changes in diseases
    const handleChangeDiseases = (selectedDiseases) =>
    {
        setNewAppointmentDetails(prevAppointmentDetails => ({
            ...prevAppointmentDetails,
            diseases: selectedDiseases
        }));
    };


    const handleUpdate = async (e) =>
    {
        e.preventDefault();
        // Check if the token exists
        const token = localStorage.getItem("token");
        if (!token)
        {
            console.error("No token found in local storage");
            return;
        }
        const appointmentId = appointmentDetails?._id

        const response = await fetch(
            `${baseUrl}/api/v1/user/update_appointmentById/${appointmentId}`,
            {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": token,
                },
                body: JSON.stringify(newAppointmentDetails)
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
    };

    console.log("PATIENT LIST", patientsList)
    console.log("DOCTORS LIST", doctorsList)
    console.log("APPOINTMENT DETAILS", appointmentDetails)
    return (
        <form
            className="flex flex-col gap-2 px-3 w-full relative overflow-hidden justify-center"
            onSubmit={(e) => e.preventDefault()}
        >

            <Modal open={open}
                onClose={onCloseModal}
                center
                doctor={selectedDoctor}
                styles={{
                    modal: {
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
                            // fontSize: isTab ? "12px" : "20px",
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
                            // fontSize: isTab ? "16px" : "24px",
                            fontWeight: 400,
                            lineHeight: "28.8px",
                            fontFamily: "Lato, sans-serif",
                            color: "white",
                        }}
                    >
                        Your Appointment Has Been Updated.<br />
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
                        className="mx-2 text-lg font-normal text-black font-lato"
                        htmlFor="patientName"
                    >
                        Patient Name
                    </label>
                    <select
                        className="mx-2 px-2 border border-green-500 h-10 rounded-lg"
                        name="patientName"
                        onChange={handleChange}
                        value={appointmentDetails?.patientId?.name}
                    >
                        {appointmentDetails?.patientId?.name ? (
                            <option value={appointmentDetails?.patientId?.name}>{appointmentDetails?.patientId?.name}</option>
                        ) : (patientsList?.map((patient) => (
                            <option key={patient._id} value={patient?.name}>
                                {patient.name}
                            </option>
                        )))}
                    </select>
                </div>

                <div className="flex flex-col">
                    <label
                        className="mx-2 text-lg font-normal text-black font-lato"
                        htmlFor="doctorName"
                    >
                        Doctor Name
                    </label>
                    <select
                        className="mx-2 px-2 border border-green-500 h-10 rounded-lg"
                        name="doctorName"
                        onChange={handleChange}
                    >
                        {appointmentDetails?.doctorId?.name ? (
                            <option value={appointmentDetails?.doctorId?.name}>{appointmentDetails?.doctorId?.name}</option>
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
                        className="mx-2 text-lg font-normal text-black font-lato"
                        htmlFor="appointmentDate"
                    >
                        Appointment Date
                    </label>
                    <input
                        className="mx-2 px-2 border border-green-500 h-10 rounded-lg"
                        type="date"
                        id="appointmentDate"
                        name="date"
                        onChange={handleChange}
                        value={newAppointmentDetails?.appointmentDate?.date}
                    />
                </div>

                <div className="flex flex-col">
                    <label
                        className="mx-2 text-lg font-normal text-black font-lato"
                        htmlFor="appointmentTime"
                    >
                        Appointment Time
                    </label>
                    <input
                        className="mx-2 px-2 border border-green-500 h-10 rounded-lg"
                        type="time"
                        id="appointmentTime"
                        name="time"
                        onChange={handleChange}
                        value={newAppointmentDetails?.appointmentDate?.time}
                    />
                </div>
            </div>

            {/* <div className="grid grid-cols-1 w-full gap-4"> */}
            <div className="flex flex-col">
                <label className="mx-2 text-lg font-normal text-black font-lato" htmlFor="issues">
                    Issues
                </label>
                <Select
                    mode="multiple"
                    className="mx-2 border border-green-500 h-10 rounded-lg"
                    id="issues"
                    name="issues"
                    onChange={handleChangeIssues}
                    value={newAppointmentDetails.issues}
                    placeholder="Select Issues"
                    style={{ overflowY: 'auto' }}
                >
                    {SymptomsDropdown.map((option) => (
                        <Select.Option key={option.value} value={option.value}>
                            {option.label}
                        </Select.Option>
                    ))}
                </Select>
            </div>

            <div className="flex flex-col">
                <label className="mx-2 text-lg font-normal text-black font-lato" htmlFor="issues">
                    Disease
                </label>
                <Select
                    mode="multiple"
                    className="mx-2 border border-green-500 h-10 rounded-lg"
                    id="diseases"
                    name="diseases"
                    onChange={handleChangeDiseases}
                    value={newAppointmentDetails.diseases}
                    placeholder="Select Diseases"
                    style={{ overflowY: 'auto' }}
                >
                    {DiseasesDropdown.map((option) => (
                        <Select.Option key={option.value} value={option.value}>
                            {option.label}
                        </Select.Option>
                    ))}
                </Select>
            </div>
            {/* </div> */}

            <div className="flex justify-center my-5">
                <button
                    type="submit"
                    className="w-40 h-11 bg-green-500 rounded-full text-white font-semibold text-xl leading-9 font-lato"
                    onClick={handleUpdate}
                >
                    Process
                </button>
            </div>
        </form>

    );
};

export default EditFormAppoinment;