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

import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";

export default function PatientDescription()
{
  let isTab = useMediaQuery({ query: "(max-width: 768px)" });
  const navigate = useNavigate();
  const location = useLocation;
  const patientId = localStorage.getItem("patientId");

  console.log("patientId", patientId);

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const onOpenModal = () => setOpen(true);
  const onCloseModall = () => setOpen(false);
  const [userImage, setUserImage] = useState();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const [isHovered1, setIsHovered1] = useState(false);

  const [isHovered, setIsHovered] = useState(false);
  const [patientsHistory, setPatientsHistory] = useState(null);

  const [open, setOpen] = useState(false);
  const [patientDetails, setPatientDetails] = useState({
    medicineName: [],
    issues: [],
    diseases: [],
    labTests: [],
  });
  const [patient, setPatient] = useState({});
  useEffect(() =>
  {
    const fetchPatientDetails = async () =>
    {
      try
      {
        const token = localStorage.getItem("token");
        if (!token)
        {
          console.error("No token found in local storage");
          return;
        }
        const response = await fetch(
          `${baseUrl}/api/v1/doctor/get_patientHistoryById/${patientId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token, // Replace with your actual token from the previous session
            },
          }
        );

        const data = await response.json();

        console.log("DATA from response", data.data);
        setPatientsHistory(data?.data);
        setPatient(data?.data[0]);
      } catch (error)
      {
        console.error("There was an error verifying the OTP:", error);
      }
    };
    fetchPatientDetails();
  }, []);
  console.log("patientsHistory", patientsHistory);
  console.log("patient", patient);
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
        alert("Image uploaded successfully.");

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

  const onCloseModal = () =>
  {
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

  const handleChangeIssues = (values) =>
  {
    setPatientDetails((prevPatientDetails) => ({
      ...prevPatientDetails,
      issues: values,
    }));
  };

  const handleChangeDiseases = (values) =>
  {
    setPatientDetails((prevPatientDetails) => ({
      ...prevPatientDetails,
      diseases: values,
    }));
  };

  const handleChangeMedicine = (values) =>
  {
    setPatientDetails((prevPatientDetails) => ({
      ...prevPatientDetails,
      medicineName: values,
    }));
  };

  const handleChangeLabTests = (values) =>
  {
    setPatientDetails((prevPatientDetails) => ({
      ...prevPatientDetails,
      labTests: values,
    }));
  };

  console.log("PATIENT DETAILS", patientDetails);

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
    const appointmentId = localStorage.getItem("appointmentId");
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
    if (data.success === true)
    {
      localStorage.setItem("appointmentId", appointmentId);
      toast.success("Diagnosis saved.");
      setModalOpen(true);
    }
    console.log("DATA from response", data);
  };

  console.log("PATIENT DETAILS", patientDetails);

  return (
    <form
      className="flex flex-col gap-2 px-3 w-full relative overflow-hidden justify-center"
      onSubmit={(e) => e.preventDefault()}
    >
      <Modal
        open={modalOpen}
        onClose={onCloseModal}
        styles={{
          modal: {
            background: "transparent", // Makes modal background transparent
            boxShadow: "none", // Removes shadow or border effects
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
      </Modal>
      {/* <div className="grid grid-cols-1 w-full gap-4"> */}
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
                open={open}
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
            <label style={{ marginLeft: -17, marginTop: 5, fontWeight: "600" }}>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label
            className="mx-2 text-lg font-normal text-black font-lato"
            htmlFor="patientName"
          >
            Patient Name
          </label>
          {patientsHistory?.length > 0 ? (
            <input
              className="mx-2 px-2 border border-[#89CFF0] h-10 rounded-lg"
              name="doctorName"
              value={patient?.patientId?.name} // Value based on condition
            />
          ) : (
            <input
              className="mx-2 px-2 border border-[#89CFF0] h-10 rounded-lg"
              name="doctorName"
            />
          )}
        </div>

        <div className="flex flex-col">
          <label
            className="mx-2 text-lg font-normal text-black font-lato"
            htmlFor="doctorName"
          >
            Age & Body weight
          </label>
          <input
            className="mx-2 px-2  border border-[#89CFF0] h-10 rounded-lg"
            name="doctorName"
            value={
              patient?.patientId?.age +
              " yr" +
              " & " +
              patient?.patientId?.bodyWeight +
              " kg"
            } // Value based on condition
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label
          className="mx-2 text-lg font-normal text-black font-lato"
          htmlFor="issues"
        >
          Issues
        </label>
        <Select
          mode="multiple"
          className="mx-2 border border-[#89CFF0] rounded-lg"
          popupClassName="no-border-dropdown-menu" // Apply the custom class here
          id="issues"
          name="issues"
          onChange={handleChangeIssues}
          onInputKeyDown={(e) =>
          {
            // Handle custom value input
            if (e.key === "Enter")
            {
              e.preventDefault();
              let inputValue = e.target.value.trim();
              if (inputValue)
              {
                handleChangeIssues([...patientDetails.issues, inputValue]);
                setTimeout(() =>
                {
                  e.target.value = "";
                  inputValue = "";
                }, 0);
              }
            }
          }}
          value={patientDetails.issues}
          placeholder="Select Issues"
          style={{ overflowY: "auto" }}
          dropdownStyle={{ maxHeight: "300px", overflowY: "auto" }}
        >
          {issues.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div className="flex flex-col">
        <label
          className="mx-2 text-lg font-normal text-black font-lato"
          htmlFor="issues"
        >
          Disease
        </label>
        <Select
          mode="multiple"
          className="mx-2 border border-[#89CFF0] rounded-lg"
          popupClassName="no-border-dropdown-menu" // Apply the custom class here
          id="diesease"
          name="diesease"
          onChange={handleChangeDiseases}
          onInputKeyDown={(e) =>
          {
            // Handle custom value input
            if (e.key === "Enter")
            {
              e.preventDefault();
              let inputValue = e.target.value.trim();
              if (inputValue)
              {
                handleChangeDiseases([...patientDetails.diseases, inputValue]);
                setTimeout(() =>
                {
                  e.target.value = "";
                  inputValue = "";
                }, 0);
              }
            }
          }}
          value={patientDetails.diseases}
          placeholder="Select Diesease"
          style={{ overflowY: "auto" }}
          dropdownStyle={{ maxHeight: "300px", overflowY: "auto" }}
        >
          {diseases.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </div>
      {/* <div className="grid grid-cols-1 w-full gap-4"> */}
      <div className="flex flex-col">
        <label
          className="mx-2 text-lg font-normal text-black font-lato"
          htmlFor="issues"
        >
          Medicine Name
        </label>
        <Select
          mode="multiple"
          className="mx-2 border border-[#89CFF0] rounded-lg"
          popupClassName="no-border-dropdown-menu" // Apply the custom class here
          id="medicineName"
          name="medicineName"
          onChange={handleChangeMedicine}
          onInputKeyDown={(e) =>
          {
            // Handle custom value input
            if (e.key === "Enter")
            {
              e.preventDefault();
              let inputValue = e.target.value.trim();
              if (inputValue)
              {
                handleChangeMedicine([
                  ...patientDetails.medicineName,
                  inputValue,
                ]);
                setTimeout(() =>
                {
                  e.target.value = "";
                  inputValue = "";
                }, 0);
              }
            }
          }}
          value={patientDetails.medicineName}
          placeholder="Select Medicine"
          style={{ overflowY: "auto" }}
          dropdownStyle={{ maxHeight: "300px", overflowY: "auto" }}
        >
          {medicineName.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </div>
      {/* <div className="grid grid-cols-1 w-full gap-4"> */}
      <div className="flex flex-col">
        <label
          className="mx-2 text-lg font-normal text-black font-lato"
          htmlFor="issues"
        >
          Lab Tests
        </label>
        <Select
          mode="multiple"
          className="mx-2 border border-[#89CFF0] rounded-lg"
          popupClassName="no-border-dropdown-menu" // Apply the custom class here
          id="labTests"
          name="labTests"
          onChange={handleChangeLabTests}
          onInputKeyDown={(e) =>
          {
            // Handle custom value input
            if (e.key === "Enter")
            {
              e.preventDefault();
              let inputValue = e.target.value.trim();
              if (inputValue)
              {
                handleChangeLabTests([...patientDetails.labTests, inputValue]);
                setTimeout(() =>
                {
                  e.target.value = "";
                  inputValue = "";
                }, 0);
              }
            }
          }}
          value={patientDetails.labTests}
          placeholder="Select Lab Tests"
          style={{ overflowY: "auto" }}
          dropdownStyle={{ maxHeight: "300px", overflowY: "auto" }}
        >
          {labTests.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div className="flex justify-center my-5">
        <label
          className="mx-2 block text-black text-lg font-semibold"
        //   htmlFor="issues"
        >
          Medical History
        </label>
        {/* <button
          type="submit"
          className="w-40 h-11 bg-[#89CFF0] rounded-full text-white font-semibold text-xl leading-9 font-lato"
          onClick={handleRegister}
        >
          Process
        </button> */}
      </div>
      <div>
        <table
          style={{
            width: "100%",
            backgroundColor: "white",
            borderCollapse: "collapse",
            marginBottom: "40px",
          }}
        >
          <thead>
            <tr
              style={{
                color: "black",
                textAlign: "center",
                padding: "8px",
                border: "1px solid #89CFF0",
                borderRadius: "5px",
              }}
            >
              <th
                style={{
                  color: "black",
                  textAlign: "center", // Center text horizontally
                  padding: "8px",
                  paddingLeft: "10px",
                  border: "1px solid #89CFF0",
                  // alignItems: "center", This won't affect th elements directly
                }}
              >
                Dr. Name
              </th>
              <th
                style={{
                  color: "black",
                  textAlign: "center",
                  padding: "8px",
                  paddingLeft: "10px",
                  border: "1px solid #89CFF0",
                  // Border for table header cells
                }}
              >
                Date
              </th>
              <th
                style={{
                  color: "black",
                  textAlign: "center",
                  padding: "8px",
                  paddingLeft: "10px",
                  border: "1px solid #89CFF0",
                  // Border for table header cells
                }}
              >
                Time
              </th>
              <th
                style={{
                  color: "black",
                  textAlign: "center",
                  padding: "8px",
                  paddingLeft: "10px",
                  border: "1px solid #89CFF0",
                  // Border for table header cells
                }}
              >
                Issues
              </th>
              <th
                style={{
                  color: "black",
                  textAlign: "center",
                  padding: "8px",
                  paddingLeft: "10px",
                  border: "1px solid #89CFF0",
                  // Border for table header cells
                }}
              >
                Disease
              </th>
              <th
                style={{
                  color: "black",
                  textAlign: "center",
                  padding: "8px",
                  paddingLeft: "10px",
                  border: "1px solid #89CFF0",
                  // Border for table header cells
                }}
              >
                Medicine Name
              </th>
              <th
                style={{
                  color: "black",
                  textAlign: "center",
                  padding: "8px",
                  paddingLeft: "10px",
                  border: "1px solid #89CFF0",
                  // Border for table header cells
                }}
              >
                Lab Test
              </th>
            </tr>
          </thead>
          <tbody>
            {patientsHistory?.map((history, index) => (
              <tr
                key={index}
                style={{
                  color: "black",
                  textAlign: "center",
                  padding: "8px",
                  border: "1px solid #89CFF0",
                  borderRadius: "5px", // Border for table header cells
                }}
              >
                <td
                  style={{
                    color: "black",
                    textAlign: "center",
                    padding: "8px",
                    border: "1px solid #89CFF0",
                  }}
                >
                  {history?.doctorId?.name}
                </td>
                <td
                  style={{
                    color: "black",
                    textAlign: "center",
                    padding: "8px",
                    border: "1px solid #89CFF0",
                  }}
                >
                  {history?.appointmentDate?.date}
                </td>
                <td
                  style={{
                    color: "black",
                    textAlign: "center",
                    padding: "8px",
                    border: "1px solid #89CFF0",
                  }}
                >
                  {history?.appointmentDate?.time}
                </td>
                <td
                  style={{
                    color: "black",
                    textAlign: "center",
                    padding: "8px",
                    border: "1px solid #89CFF0",
                  }}
                >
                  {history?.issues}
                </td>
                <td
                  style={{
                    color: "black",
                    textAlign: "center",
                    padding: "8px",
                    border: "1px solid #89CFF0",
                  }}
                >
                  {history?.diseases}
                </td>
                <td
                  style={{
                    color: "black",
                    textAlign: "center",
                    padding: "8px",
                    border: "1px solid #89CFF0",
                  }}
                >
                  {history?.medicineName}
                </td>
                <td
                  style={{
                    color: "black",
                    textAlign: "center",
                    padding: "8px",
                    border: "1px solid #89CFF0",
                  }}
                >
                  {history?.labTests}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center my-5">
          <button
            type="submit"
            className="w-40 h-11 bg-[#89CFF0] rounded-full text-white font-semibold text-xl leading-9 font-lato"
            onClick={handleRegister}
          >
            Process
          </button>
        </div>
      </div>
      {/* </div> */}
    </form>
  );
}
