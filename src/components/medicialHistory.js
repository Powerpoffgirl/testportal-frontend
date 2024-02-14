import React, { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation, useNavigate } from "react-router-dom";
import { Select } from "antd";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import Modal from "react-responsive-modal";
import { ToastContainer, toast } from "react-toastify";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { HiOutlineUserAdd } from "react-icons/hi";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import { useReactToPrint } from "react-to-print";

import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";

export default function MedicialHistory() {
  let isTab = useMediaQuery({ query: "(max-width: 768px)" });
  const navigate = useNavigate();
  const location = useLocation();
  const [diagonisSaved, setDiagnosisSaved] = useState(false);
  const patientId = localStorage.getItem("patientId");
  // const appointment = location.state.appointment
  console.log("patientId", patientId);
  const componentPDF = useRef();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const onOpenModal = () => setOpen(true);
  const onCloseModall = () => setOpen(false);
  const [userImage, setUserImage] = useState();
  const [appointmentList, setAppointmentList] = useState([]);

  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const [isHovered1, setIsHovered1] = useState(false);

  const [isHovered, setIsHovered] = useState(false);
  const [patientsHistory, setPatientsHistory] = useState(null);
  const [appointment, setAppointment] = useState({});
  const [open, setOpen] = useState(false);
  const handleButtonClick = (appointment) => {
    console.log("appointment", appointment);

    const reportUrl = appointment.appointmentReport[0]; // Assuming this is the URL of the report
    const link = document.createElement("a");
    link.href = reportUrl;
    link.setAttribute("download", "report.pdf"); // Change 'report.pdf' to whatever name you want the downloaded file to have
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Add your click handling logic here
  };

  const [patientDetails, setPatientDetails] = useState({
    medicineName: [],
    issues: [],
    diseases: [],
    labTests: [],
  });
  const [patient, setPatient] = useState({});
  const generatePdf = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "userReport",
    // onAfterPrint: () => alert("Data saved in PDF")
  });

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in local storage");
          return;
        }
        const response = await fetch(
          `${baseUrl}/api/v1/user/get_all_appointments`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token, // Replace with your actual token from the previous session
            },
          }
        );
        const data = await response.json();
        console.log("DATA from response", data);
        if (data.message === "Invalid or expired token") {
          toast.error("Invalid or expired token");
          navigate("/userlogin");
          localStorage.clear();
        }
        setAppointmentList(data?.data);
      } catch (error) {
        console.error("There was an error verifying the OTP:", error);
      }
    };
    fetchPatientDetails();
  }, []);

  //   useEffect(() => {
  //     const fetchPatientDetails = async () => {
  //       try {
  //         const token = localStorage.getItem("token");
  //         if (!token) {
  //           console.error("No token found in local storage");
  //           return;
  //         }
  //         const response = await fetch(
  //           `${baseUrl}/api/v1/doctor/get_patientHistoryById/${patientId}`,
  //           {
  //             method: "GET",
  //             headers: {
  //               "Content-Type": "application/json",
  //               "x-auth-token": token, // Replace with your actual token from the previous session
  //             },
  //           }
  //         );

  //         const data = await response.json();

  //         console.log("DATA from response", data.data);
  //         setPatientsHistory(data?.data);
  //         setPatient(data?.data[0]);
  //       } catch (error) {
  //         console.error("There was an error verifying the OTP:", error);
  //       }
  //     };
  //     fetchPatientDetails();
  //   },

  //   [appointment]);
  console.log("appointmentlist", appointmentList);

  console.log("patientsHistory", patientsHistory);
  console.log("patient", patient);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const token = localStorage.getItem("token");
      const doctorId = localStorage.getItem("doctorId");
      const formData = new FormData();
      formData.append("doctorPic", file);

      console.log("FORM DATA", formData);
      try {
        const response = await fetch(`${baseUrl}/api/v1/upload_image`, {
          method: "POST",
          headers: {
            "x-auth-token": token,
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Image uploaded successfully:", data);
        setUserImage(data.profilePicImageUrl);
        toast.success("Image uploaded successfully.");

        // Reset the file input
        setSelectedFile(null);
        fileInputRef.current.value = "";
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Error uploading image. Please try again.");
      }
    }
  };

  const onCloseModal = () => {
    setModalOpen(false);
    setModalContent("");
    navigate(`/appointmentlist`);
  };

  const diseases = [
    { label: "Influenza", value: "Influenza" },
    { label: "Hypertension", value: "Hypertension" },
    { label: "Diabetes mellitus", value: "Diabetes mellitus" },
    { label: "Asthma", value: "Asthma" },
    { label: "Pneumonia", value: "Pneumonia" },
    {
      label: "Chronic obstructive pulmonary disease (COPD)",
      value: "Chronic obstructive pulmonary disease (COPD)",
    },
    { label: "Arthritis", value: "Arthritis" },
    { label: "Osteoporosis", value: "Osteoporosis" },
    { label: "Migraine", value: "Migraine" },
    { label: "Depression", value: "Depression" },
    { label: "Anxiety disorders", value: "Anxiety disorders" },
    { label: "Schizophrenia", value: "Schizophrenia" },
    { label: "Bipolar disorder", value: "Bipolar disorder" },
    {
      label: "Attention deficit hyperactivity disorder (ADHD)",
      value: "Attention deficit hyperactivity disorder (ADHD)",
    },
    {
      label: "Autism spectrum disorder (ASD)",
      value: "Autism spectrum disorder (ASD)",
    },
    { label: "Alzheimer's disease", value: "Alzheimer's disease" },
    { label: "Parkinson's disease", value: "Parkinson's disease" },
    { label: "Multiple sclerosis", value: "Multiple sclerosis" },
    {
      label: "Irritable bowel syndrome (IBS)",
      value: "Irritable bowel syndrome (IBS)",
    },
    {
      label: "Gastroesophageal reflux disease (GERD)",
      value: "Gastroesophageal reflux disease (GERD)",
    },
    { label: "Peptic ulcer disease", value: "Peptic ulcer disease" },
    { label: "Crohn's disease", value: "Crohn's disease" },
    { label: "Ulcerative colitis", value: "Ulcerative colitis" },
    { label: "Chronic kidney disease", value: "Chronic kidney disease" },
    {
      label: "Urinary tract infection (UTI)",
      value: "Urinary tract infection (UTI)",
    },
    { label: "Glaucoma", value: "Glaucoma" },
    { label: "Cataracts", value: "Cataracts" },
    { label: "Myopia", value: "Myopia" },
    { label: "Hyperopia", value: "Hyperopia" },
    { label: "Conjunctivitis", value: "Conjunctivitis" },
    { label: "Otitis media", value: "Otitis media" },
    { label: "Tinnitus", value: "Tinnitus" },
    { label: "Dementia", value: "Dementia" },
    { label: "Stroke", value: "Stroke" },
    { label: "Myocardial infarction", value: "Myocardial infarction" },
    { label: "Congestive heart failure", value: "Congestive heart failure" },
    { label: "Atherosclerosis", value: "Atherosclerosis" },
    { label: "Anemia", value: "Anemia" },
    { label: "Leukemia", value: "Leukemia" },
    { label: "Lymphoma", value: "Lymphoma" },
    // Add more items as needed...
  ];

  const medicineName = [
    { label: "Crocin", value: "Crocin" },
    { label: "Combiflam", value: "Combiflam" },
    { label: "Dolo", value: "Dolo" },
    { label: "Pantocid", value: "Pantocid" },
    { label: "Rantac", value: "Rantac" },
    { label: "Zifi", value: "Zifi" },
    { label: "Metformin", value: "Metformin" },
    { label: "Metronidazole", value: "Metronidazole" },
    { label: "Atorvastatin", value: "Atorvastatin" },
    { label: "Loratadine", value: "Loratadine" },
    { label: "Azithromycin", value: "Azithromycin" },
    { label: "Diclofenac", value: "Diclofenac" },
    { label: "Amoxicillin", value: "Amoxicillin" },
    { label: "Ciprofloxacin", value: "Ciprofloxacin" },
    { label: "Esomeprazole", value: "Esomeprazole" },
    { label: "Sertraline", value: "Sertraline" },
    { label: "Levofloxacin", value: "Levofloxacin" },
    { label: "Amlodipine", value: "Amlodipine" },
    { label: "Clopidogrel", value: "Clopidogrel" },
    { label: "Diazepam", value: "Diazepam" },
    { label: "Lisinopril", value: "Lisinopril" },
    { label: "Hydrochlorothiazide", value: "Hydrochlorothiazide" },
    { label: "Metoprolol", value: "Metoprolol" },
    { label: "Omeprazole", value: "Omeprazole" },
    { label: "Amitriptyline", value: "Amitriptyline" },
    { label: "Furosemide", value: "Furosemide" },
    { label: "Warfarin", value: "Warfarin" },
    { label: "Ibuprofen", value: "Ibuprofen" },
    { label: "Paracetamol", value: "Paracetamol" },
    { label: "Folic Acid", value: "Folic Acid" },
    { label: "Aspirin", value: "Aspirin" },
    { label: "Simvastatin", value: "Simvastatin" },
    { label: "Dexamethasone", value: "Dexamethasone" },
    { label: "Alprazolam", value: "Alprazolam" },
    { label: "Gliclazide", value: "Gliclazide" },
    { label: "Cefixime", value: "Cefixime" },
    { label: "Gabapentin", value: "Gabapentin" },
    { label: "Pregabalin", value: "Pregabalin" },
    { label: "Telmisartan", value: "Telmisartan" },
    { label: "Candesartan", value: "Candesartan" },
    { label: "Rosuvastatin", value: "Rosuvastatin" },
    { label: "Fenofibrate", value: "Fenofibrate" },
    { label: "Duloxetine", value: "Duloxetine" },
    { label: "Levothyroxine", value: "Levothyroxine" },
    { label: "Carbamazepine", value: "Carbamazepine" },
    { label: "Sildenafil", value: "Sildenafil" },
    { label: "Losartan", value: "Losartan" },
    { label: "Glimipiride", value: "Glimipiride" },
    { label: "Sitagliptin", value: "Sitagliptin" },
    { label: "Rabeprazole", value: "Rabeprazole" },
    { label: "Ezetimibe", value: "Ezetimibe" },
    { label: "Cilnidipine", value: "Cilnidipine" },
    { label: "Dexorange", value: "Dexorange" },
    { label: "Loperamide", value: "Loperamide" },
    { label: "Hydroxychloroquine", value: "Hydroxychloroquine" },
    { label: "Montelukast", value: "Montelukast" },
    { label: "Clotrimazole", value: "Clotrimazole" },
    { label: "Naproxen", value: "Naproxen" },
    { label: "Methotrexate", value: "Methotrexate" },
    { label: "Metoclopramide", value: "Metoclopramide" },
    { label: "Hyoscine Butylbromide", value: "Hyoscine Butylbromide" },
    { label: "Nifedipine", value: "Nifedipine" },
    { label: "Pheniramine Maleate", value: "Pheniramine Maleate" },
    { label: "Methylprednisolone", value: "Methylprednisolone" },
    { label: "Domperidone", value: "Domperidone" },
    { label: "Ondansetron", value: "Ondansetron" },
    { label: "Itraconazole", value: "Itraconazole" },
    { label: "Moxifloxacin", value: "Moxifloxacin" },
    { label: "Ampicillin", value: "Ampicillin" },
    { label: "Cetirizine", value: "Cetirizine" },
    { label: "Levocetirizine", value: "Levocetirizine" },
    { label: "Budesonide", value: "Budesonide" },
    { label: "Acyclovir", value: "Acyclovir" },
    { label: "Cyclosporine", value: "Cyclosporine" },
    { label: "Tacrolimus", value: "Tacrolimus" },
    { label: "Ranitidine", value: "Ranitidine" },
  ];

  const issues = [
    { label: "Fever", value: "Fever" },
    { label: "Cough", value: "Cough" },
    { label: "Fatigue", value: "Fatigue" },
    { label: "Headache", value: "Headache" },
    { label: "Muscle Pain", value: "Muscle Pain" },
    { label: "Sore Throat", value: "Sore Throat" },
    { label: "Runny Nose", value: "Runny Nose" },
    { label: "Shortness of Breath", value: "Shortness of Breath" },
    { label: "Chest Pain", value: "Chest Pain" },
    { label: "Abdominal Pain", value: "Abdominal Pain" },
    { label: "Nausea", value: "Nausea" },
    { label: "Vomiting", value: "Vomiting" },
    { label: "Diarrhea", value: "Diarrhea" },
    { label: "Constipation", value: "Constipation" },
    { label: "Dizziness", value: "Dizziness" },
    { label: "Weakness", value: "Weakness" },
    { label: "Loss of Appetite", value: "Loss of Appetite" },
    { label: "Weight Loss", value: "Weight Loss" },
    { label: "Dehydration", value: "Dehydration" },
    { label: "Sweating", value: "Sweating" },
    { label: "Insomnia", value: "Insomnia" },
    { label: "Anxiety", value: "Anxiety" },
    { label: "Depression", value: "Depression" },
    { label: "Palpitations", value: "Palpitations" },
    { label: "Blurred Vision", value: "Blurred Vision" },
    { label: "Hearing Loss", value: "Hearing Loss" },
    { label: "Tinnitus", value: "Tinnitus" },
    { label: "Earache", value: "Earache" },
    { label: "Nosebleed", value: "Nosebleed" },
    { label: "Sneezing", value: "Sneezing" },
    { label: "Skin Rash", value: "Skin Rash" },
    { label: "Itching", value: "Itching" },
    { label: "Hives", value: "Hives" },
    { label: "Swelling", value: "Swelling" },
    { label: "Bruising", value: "Bruising" },
    { label: "Joint Pain", value: "Joint Pain" },
    { label: "Back Pain", value: "Back Pain" },
    { label: "Neck Pain", value: "Neck Pain" },
    { label: "Eye Redness", value: "Eye Redness" },
    { label: "Vision Loss", value: "Vision Loss" },
    { label: "Dry Mouth", value: "Dry Mouth" },
    { label: "Sore Gums", value: "Sore Gums" },
    { label: "Toothache", value: "Toothache" },
    { label: "Bad Breath", value: "Bad Breath" },
    { label: "Thirst", value: "Thirst" },
    { label: "Frequent Urination", value: "Frequent Urination" },
    { label: "Urinary Incontinence", value: "Urinary Incontinence" },
    { label: "Blood in Urine", value: "Blood in Urine" },
    { label: "Menstrual Cramps", value: "Menstrual Cramps" },
    { label: "Impotence", value: "Impotence" },
    { label: "Infertility", value: "Infertility" },
    { label: "Pregnancy Symptoms", value: "Pregnancy Symptoms" },
  ];

  const labTests = [
    {
      label: "Complete Blood Count (CBC)",
      value: "Complete Blood Count (CBC)",
    },
    {
      label: "Basic Metabolic Panel (BMP)",
      value: "Basic Metabolic Panel (BMP)",
    },
    {
      label: "Comprehensive Metabolic Panel (CMP)",
      value: "Comprehensive Metabolic Panel (CMP)",
    },
    { label: "Lipid Panel", value: "Lipid Panel" },
    {
      label: "Liver Function Tests (LFTs)",
      value: "Liver Function Tests (LFTs)",
    },
    { label: "Renal Function Panel", value: "Renal Function Panel" },
    {
      label: "Thyroid Function Tests (TFTs)",
      value: "Thyroid Function Tests (TFTs)",
    },
    { label: "Urinalysis", value: "Urinalysis" },
    { label: "Electrolyte Panel", value: "Electrolyte Panel" },
    { label: "Blood Glucose Tests", value: "Blood Glucose Tests" },
    { label: "Serum Iron Tests", value: "Serum Iron Tests" },
    { label: "Coagulation Panel", value: "Coagulation Panel" },
    {
      label: "C-reactive Protein (CRP) Test",
      value: "C-reactive Protein (CRP) Test",
    },
    {
      label: "Erythrocyte Sedimentation Rate (ESR) Test",
      value: "Erythrocyte Sedimentation Rate (ESR) Test",
    },
    { label: "HbA1c Test", value: "HbA1c Test" },
    {
      label: "Arterial Blood Gas (ABG) Test",
      value: "Arterial Blood Gas (ABG) Test",
    },
    {
      label: "Rheumatoid Factor (RF) Test",
      value: "Rheumatoid Factor (RF) Test",
    },
    {
      label: "Prothrombin Time (PT) Test",
      value: "Prothrombin Time (PT) Test",
    },
    {
      label: "Partial Thromboplastin Time (PTT) Test",
      value: "Partial Thromboplastin Time (PTT) Test",
    },
    { label: "D-dimer Test", value: "D-dimer Test" },
    { label: "Troponin Test", value: "Troponin Test" },
    {
      label: "Brain Natriuretic Peptide (BNP) Test",
      value: "Brain Natriuretic Peptide (BNP) Test",
    },
    { label: "Blood Culture Test", value: "Blood Culture Test" },
    { label: "Procalcitonin Test", value: "Procalcitonin Test" },
    {
      label: "Immunoglobulin E (IgE) Test",
      value: "Immunoglobulin E (IgE) Test",
    },
    {
      label: "Antinuclear Antibody (ANA) Test",
      value: "Antinuclear Antibody (ANA) Test",
    },
    { label: "Anti-DNA Antibody Test", value: "Anti-DNA Antibody Test" },
    {
      label: "Serum Protein Electrophoresis (SPEP) Test",
      value: "Serum Protein Electrophoresis (SPEP) Test",
    },
    {
      label: "Serum Immunofixation Electrophoresis (IFE) Test",
      value: "Serum Immunofixation Electrophoresis (IFE) Test",
    },
    { label: "Ferritin Test", value: "Ferritin Test" },
    { label: "Serum B12 Test", value: "Serum B12 Test" },
    { label: "Folate Test", value: "Folate Test" },
    { label: "Vitamin D Test", value: "Vitamin D Test" },
    { label: "H. pylori Test", value: "H. pylori Test" },
    { label: "Stool Culture Test", value: "Stool Culture Test" },
    {
      label: "Stool Ova and Parasites (O&P) Test",
      value: "Stool Ova and Parasites (O&P) Test",
    },
    {
      label: "Fecal Occult Blood Test (FOBT)",
      value: "Fecal Occult Blood Test (FOBT)",
    },
    { label: "Hepatitis Panel", value: "Hepatitis Panel" },
    { label: "HIV Test", value: "HIV Test" },
    { label: "Tuberculosis (TB) Test", value: "Tuberculosis (TB) Test" },
    { label: "Malaria Test", value: "Malaria Test" },
  ];

  const updatedLabTests = labTests.map((test) => ({
    ...test,
    value: test.label,
  }));

  const [anchorEl, setAnchorEl] = useState(null);
  // const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Function to handle profile picture change
  const handleNewProfilePicture = () => {
    // Logic to handle adding a new profile picture
    handleClose();
  };

  // Function to handle profile picture removal
  const handleRemoveProfilePicture = () => {
    // Logic to handle removing the current profile picture
    handleClose();
  };

  // bp & temp
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientDetails((prevPatientDetails) => ({
      ...prevPatientDetails,
      [name]: value,
    }));
  };

  const handleChangeIssues = (values) => {
    setPatientDetails((prevPatientDetails) => ({
      ...prevPatientDetails,
      issues: values,
    }));
  };

  const handleChangeDiseases = (values) => {
    setPatientDetails((prevPatientDetails) => ({
      ...prevPatientDetails,
      diseases: values,
    }));
  };

  const handleChangeMedicine = (values) => {
    setPatientDetails((prevPatientDetails) => ({
      ...prevPatientDetails,
      medicineName: values,
    }));
  };

  const handleChangeLabTests = (values) => {
    setPatientDetails((prevPatientDetails) => ({
      ...prevPatientDetails,
      labTests: values,
    }));
  };

  console.log("PATIENT DETAILS", patientDetails);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Check if the token exists
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in local storage");
      return;
    }
    const appointmentId = localStorage.getItem("appointmentId");
    console.log("patient details ===================", patientDetails);
    const response = await fetch(
      `${baseUrl}/api/v1/doctor/doctor_diagnosis/${appointmentId}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(patientDetails),
      }
    );
    const data = await response.json();
    if (data.success === true) {
      // setModalOpen(true);
      localStorage.setItem("appointmentId", appointmentId);
      toast.success("Diagnosis saved.");
      setAppointment(data.data);
      setDiagnosisSaved(true);
    }
    console.log("DATA from response", data);
  };

  console.log("PATIENT DETAILS1  ", patientDetails);
  const handleFileSelect1 = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const token = localStorage.getItem("token");
      const patientId = localStorage.getItem("patientId");
      const doctorId = localStorage.getItem("doctorId");
      const formData = new FormData();
      formData.append("patientReport", file);

      console.log("FORM DATA", formData);
      try {
        const response = await fetch(
          `${baseUrl}/api/v1/doctor/upload_patient_report/${patientId}`,
          {
            method: "POST",
            headers: {
              "x-auth-token": token,
            },
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        fileInputRef.current.value = "";
      } catch (error) {
        console.error("Error ", error);
        toast.error("Error uploading pdf. Please try again.");
      }
    }
  };

  return (
    <>
      <form
        ref={componentPDF}
        className="flex flex-col overflow-hidden justify-center "
        onSubmit={(e) => e.preventDefault()}
      >
        {/* <Modal
          open={modalOpen}
          onClose={onCloseModal}
          styles={{
            modal: {
              background: "transparent", // Makes modal background transparent
              boxShadow: "none", // Removes shadow or border effects
              display: "none",
              // Any other styles to override default modal styles
            },
          }}
          center
        >
          <div
            className="flex flex-col items-center w-[100%] md:w-[100%]"
            style={{
              border: "none",
              borderRadius: "5px",
              backgroundColor: "#89CFF0",
            }}
          >
            <text
              className="ml-4 text-center mt-4"
              style={{
                marginBottom: -20,
                fontSize: "40px",
                fontWeight: 700,
                lineHeight: "28.8px",
                fontFamily: "Lato, sans-serif",
                color: "#FFFFFF",
                height: "100px",
                width: "370px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Diagnosis saved.
            </text>
            <text
              className="ml-4 text-center"
              style={{
                fontSize: "60px",
                fontWeight: 800,
                lineHeight: "24px",
                fontFamily: "Lato, sans-serif",
                color: "#FFFFFF",
                marginBottom: "7%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {<IoIosCheckmarkCircleOutline />}
            </text>
          </div>
        </Modal> */}
        <ToastContainer />

        {/* <div className="grid grid-cols-1 w-full gap-4"> */}

        <div class="flex flex-col ">
          <div className="flex justify-center my-5 ">
            <label
              className="mx-2 block text-black text-lg font-semibold"
              //   htmlFor="issues"
            >
              {/* Medical History */}
            </label>

            {/* <button
          type="submit"
          className="w-40 h-11 bg-[#89CFF0] rounded-full text-white font-semibold text-xl leading-9 font-lato"
          onClick={handleRegister}
        >
          Process
        </button> */}
          </div>
          <div class=" flex flex-col ">
            <div className=" overflow-x-auto xl:max-w-5xl 2xl:max-w-7xl lg:max-w-2xl  md:max-w-md max-w-xs mx-auto">
              <table className=" divide-y divide-gray-200 ">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-base font-medium text-black uppercase tracking-wider">
                      Dr. Name
                    </th>
                    <th className="px-6 py-3 text-left text-base font-medium text-black uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-base font-medium text-black uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-base font-medium text-black uppercase tracking-wider">
                      Issues
                    </th>
                    <th className="px-6 py-3 text-left text-base font-medium text-black uppercase tracking-wider">
                      Disease
                    </th>
                    <th className="px-6 py-3 text-left text-base font-medium text-black uppercase tracking-wider">
                      Medicine Name
                    </th>
                    <th className="px-6 py-3 text-left text-base font-medium text-black uppercase tracking-wider">
                      Lab Test
                    </th>
                    <th className="px-6 py-3 text-left text-base font-medium text-black uppercase tracking-wider">
                      Download
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appointmentList?.map((history, index) => (
                    <tr key={index}>
                      <td className=" px-6 py-4 whitespace-nowrap text-sm  text-gray-900">
                        {history?.doctorId?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black ">
                        {history?.appointmentDate?.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                        {history?.appointmentDate?.time}
                      </td>
                      <td
                        // className="w-52 px-6 py-4 whitespace-nowrap text-sm text-black"
                        className="w-[300px] px-6 py-4 whitespace-normal text-sm text-black break-words"
                        style={{ wordWrap: "break-word" }}
                      >
                        {history?.issues?.join(", ")}
                      </td>
                      <td
                        // className="w-52 px-6 py-4 whitespace-nowrap text-sm text-black"
                        className="w-[300px] px-6 py-4 whitespace-normal text-sm text-black break-words"
                        style={{ wordWrap: "break-word" }}
                      >
                        {history?.diseases?.join(", ")}
                      </td>
                      <td
                        className="w-[300px] px-6 py-4 whitespace-normal text-sm text-black break-words"
                        style={{ wordWrap: "break-word" }}
                        // className="w-52 px-6 py-4 whitespace-nowrap text-sm text-black"
                      >
                        {history?.medicineName?.join(", ")}
                      </td>
                      <td
                        className="w-[300px] px-6 py-4 whitespace-normal text-sm text-black break-words"
                        style={{ wordWrap: "break-word" }}
                        // className="w-52 px-6 py-4 whitespace-nowrap text-sm text-black"
                      >
                        {history?.labTests?.join(", ")}
                      </td>
                      <td
                        className="w-[300px] px-6 py-4 whitespace-normal text-sm text-black break-words"
                        style={{ wordWrap: "break-word" }}
                      >
                        {/* Uncomment this if you want to display history.labTests */}
                        {/* {history?.labTests?.join(", ")} */}

                        {/* Centered Button */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%", // Ensure the div takes the full height of the table cell
                          }}
                        >
                          <button
                            className="w-40 h-11 bg-[#89CFF0] rounded-full text-white font-semibold text-xl leading-9 font-lato"
                            onClick={() => handleButtonClick(history)}
                          >
                            Click Here
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* <div className="flex mx-auto my-5 flex-col lg:flex-row gap-5 ">
              <button
                type="submit"
                className="w-40 h-11 bg-[#89CFF0] rounded-full text-white font-semibold text-xl leading-9 font-lato"
                onClick={handleRegister}
              >
                Process
              </button>
              {diagonisSaved ? (
                <button
                  className="w-60 h-11 bg-[#89CFF0] rounded-full text-white font-semibold text-xl leading-9 font-lato"
                  onClick={() =>
                    navigate(`/descriptionsummary`, {
                      state: { appointment: patientsHistory[0] },
                    })
                  }
                >
                  Go to Patient Report
                </button>
              ) : (
                ""
              )}
            </div> */}
          </div>
        </div>
      </form>
    </>
  );
}
