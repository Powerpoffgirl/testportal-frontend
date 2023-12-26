import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Sidebar from "./sidebar";
import Header from "./header";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-responsive-modal";
import UserSidebar from "./userSidebar";
import AdminSidebar from "./adminSidebar";
import FormAppoinment from "./formAppointment";
import design from "../assets/design.svg";
import EditFormAppoinment from "./editFormAppointment";

export default function EditAppointmentSuperAdmin() {
  let isTab = useMediaQuery({ query: "(max-width: 768px)" });
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [selectedDoctor, setSelectedDoctor] = useState({
    name: "",
    email: "",
  });
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const navigate = useNavigate();
  const [appointmentDetails, setAppointmentDetails] = useState(null);

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
    { label: "Snoring", value: "Snoring" },
  ];

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const appointmentId = localStorage.getItem("appointmentId");
        if (!token) {
          console.error("No token found in local storage");
          return;
        }
        const response = await fetch(
          `${baseUrl}/api/v1/superAdmin/get_appointment/${appointmentId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token, // Replace with your actual token from the previous session
            },
          }
        );

        const data = await response.json();
        console.log("DATA from USE EFFECT response", data?.data);
        setSelectedDoctor({
          name: data?.data?.doctorId?.name,
          email: data?.data?.doctorId?.email,
        });
        setAppointmentDetails(data?.data);
      } catch (error) {
        console.error("There was an error verifying the OTP:", error);
      }
    };
    fetchAppointmentDetails();
  }, []);

  const [input, setInput] = useState("");
  const [filteredSymptoms, setFilteredSymptoms] = useState(SymptomsDropdown);

  const handleInputChange = (e) => {
    const userInput = e.target.value;
    setInput(userInput);
    filterSymptoms(userInput);
  };

  const filterSymptoms = (userInput) => {
    if (!userInput) {
      setFilteredSymptoms(SymptomsDropdown);
    } else {
      const filtered = SymptomsDropdown.filter((symptom) =>
        symptom.label.toLowerCase().includes(userInput.toLowerCase())
      );
      setFilteredSymptoms(filtered);
    }
  };

  const handleOptionSelect = (selectedValue) => {
    // Check if the selected issue is already in the list
    if (!appointmentDetails.issues.includes(selectedValue)) {
      // If not, add it to the list
      setAppointmentDetails((prevDetails) => ({
        ...prevDetails,
        issues: [...prevDetails.issues, selectedValue],
      }));
    }

    // Optionally, clear the input after selection
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission only for Enter key
      if (filteredSymptoms.length > 0) {
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
    {
      label: "Chronic Obstructive Pulmonary Disease",
      value: "Chronic Obstructive Pulmonary Disease",
    },
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
    { label: "Cancer", value: "Cancer" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "date" || name === "time") {
      setAppointmentDetails((prevPatientDetails) => ({
        ...prevPatientDetails,
        appointmentDate: {
          ...prevPatientDetails.appointmentDate,
          [name]: value,
        },
      }));
    }
    if (["issues"].includes(name)) {
      // Assuming the value is an array or a string to be added to the array
      setAppointmentDetails((prevPatientDetails) => ({
        ...prevPatientDetails,
        [name]: Array.isArray(value)
          ? value
          : [...prevPatientDetails[name], value],
      }));
    } else if (["diseases"].includes(name)) {
      // Assuming the value is an array or a string to be added to the array
      setAppointmentDetails((prevPatientDetails) => ({
        ...prevPatientDetails,
        [name]: Array.isArray(value)
          ? value
          : [...prevPatientDetails[name], value],
      }));
    } else {
      setAppointmentDetails((prevPatientDetails) => ({
        ...prevPatientDetails,
        [name]: value,
      }));
    }
  };

  console.log("APPOINTMENT DETAILS", appointmentDetails);
  const handleRegister = async (e) => {
    e.preventDefault();
    // Check if the token exists
    const newAppointmentDetails = {
      doctorId: appointmentDetails?.doctorId,
      patientId: appointmentDetails?.patientId,
      appointmentDate: {
        date: appointmentDetails?.appointmentDate.date,
        time: appointmentDetails?.appointmentDate.time,
      },
      issues: appointmentDetails?.issues,
      diseases: appointmentDetails?.diseases,
    };
    const token = localStorage.getItem("token");
    const appointmentId = localStorage.getItem("appointmentId");
    if (!token) {
      console.error("No token found in local storage");
      return;
    }

    const response = await fetch(
      `${baseUrl}/api/v1/user/update_appointmentById/${appointmentId}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(newAppointmentDetails),
      }
    );
    const data = await response.json();
    if (data.success === true) {
      // navigate("/otp")
      onOpenModal();
      localStorage.setItem("id", data.data._id);
    }
    console.log("DATA from response", data);
  };

  return (
    <>
      <div className="p-3 h-32">
        <div className="flex h-16 flex-row justify-between bg-[#89CFF0] w-full rounded-full px-10 pr-0">
          <div class="flex items-center gap-x-2">
            <img
              class="object-cover w-12 h-12 rounded-full"
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100"
              alt=""
            />
            <div>
              <h1 class="text-xl font-semibold text-white capitalize">
                {selectedDoctor.name}
              </h1>
              <p class="text-base text-white">{selectedDoctor.email}</p>
            </div>
          </div>
          <img
            className="h-16 hidden sm:block md:hidden lg:block"
            src={design}
            alt="design"
          />
        </div>
      </div>
      <EditFormAppoinment appointmentDetails={appointmentDetails} />
    </>
  );
}
