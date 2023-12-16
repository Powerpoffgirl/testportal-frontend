import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Sidebar from "./sidebar";
import Header from "./header";
import { useNavigate } from "react-router-dom";
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DoctorSidebar from "./doctorSidebar";

export default function ViewPatientDescription()
{
    let isTab = useMediaQuery({ query: "(max-width: 768px)" });
    const navigate = useNavigate()
    const baseUrl = process.env.REACT_APP_BASE_URL
    const [patientDetails, setPatientDetails] = useState({
        medicineName: [],
        issues: [],
        diseases: [],
        labTests: []
    })


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
        { label: "Crocin", value: "Fever" },
        { label: "Combiflam", value: "Pain and Inflammation" },
        { label: "Dolo", value: "Fever and Pain" },
        { label: "Pantocid", value: "Acid Reflux" },
        { label: "Rantac", value: "Acid Reflux" },
        { label: "Zifi", value: "Antibiotic" },
        { label: "Metformin", value: "Diabetes" },
        { label: "Metronidazole", value: "Infections" },
        { label: "Atorvastatin", value: "Cholesterol" },
        { label: "Loratadine", value: "Allergies" },
        { label: "Azithromycin", value: "Antibiotic" },
        { label: "Diclofenac", value: "Pain and Inflammation" },
        { label: "Amoxicillin", value: "Antibiotic" },
        { label: "Ciprofloxacin", value: "Antibiotic" },
        { label: "Esomeprazole", value: "Acid Reflux" },
        { label: "Sertraline", value: "Antidepressant" },
        { label: "Levofloxacin", value: "Antibiotic" },
        { label: "Amlodipine", value: "Hypertension" },
        { label: "Clopidogrel", value: "Blood Thinner" },
        { label: "Diazepam", value: "Anxiety" },
        { label: "Lisinopril", value: "Hypertension" },
        { label: "Hydrochlorothiazide", value: "Hypertension" },
        { label: "Metoprolol", value: "Hypertension" },
        { label: "Omeprazole", value: "Acid Reflux" },
        { label: "Amitriptyline", value: "Antidepressant" },
        { label: "Furosemide", value: "Diuretic" },
        { label: "Warfarin", value: "Blood Thinner" },
        { label: "Ibuprofen", value: "Pain and Inflammation" },
        { label: "Paracetamol", value: "Fever and Pain" },
        { label: "Folic Acid", value: "Vitamin Supplement" },
        { label: "Aspirin", value: "Blood Thinner" },
        { label: "Simvastatin", value: "Cholesterol" },
        { label: "Dexamethasone", value: "Anti-Inflammatory" },
        { label: "Alprazolam", value: "Anxiety" },
        { label: "Gliclazide", value: "Diabetes" },
        { label: "Cefixime", value: "Antibiotic" },
        { label: "Gabapentin", value: "Neuropathic Pain" },
        { label: "Pregabalin", value: "Neuropathic Pain" },
        { label: "Telmisartan", value: "Hypertension" },
        { label: "Candesartan", value: "Hypertension" },
        { label: "Rosuvastatin", value: "Cholesterol" },
        { label: "Fenofibrate", value: "Cholesterol" },
        { label: "Duloxetine", value: "Depression" },
        { label: "Levothyroxine", value: "Thyroid Disorder" },
        { label: "Carbamazepine", value: "Seizures" },
        { label: "Sildenafil", value: "Erectile Dysfunction" },
        { label: "Losartan", value: "Hypertension" },
        { label: "Glimipiride", value: "Diabetes" },
        { label: "Sitagliptin", value: "Diabetes" },
        { label: "Rabeprazole", value: "Acid Reflux" },
        { label: "Ezetimibe", value: "Cholesterol" },
        { label: "Cilnidipine", value: "Hypertension" },
        { label: "Dexorange", value: "Iron Deficiency" },
        { label: "Loperamide", value: "Diarrhea" },
        { label: "Hydroxychloroquine", value: "Malaria and Rheumatoid Arthritis" },
        { label: "Montelukast", value: "Asthma and Allergies" },
        { label: "Clotrimazole", value: "Fungal Infections" },
        { label: "Naproxen", value: "Pain and Inflammation" },
        { label: "Methotrexate", value: "Rheumatoid Arthritis" },
        { label: "Metoclopramide", value: "Nausea and Vomiting" },
        { label: "Hyoscine Butylbromide", value: "Stomach Cramps" },
        { label: "Nifedipine", value: "Hypertension" },
        { label: "Pheniramine Maleate", value: "Allergies" },
        { label: "Methylprednisolone", value: "Anti-Inflammatory" },
        { label: "Domperidone", value: "Nausea and Vomiting" },
        { label: "Ondansetron", value: "Nausea and Vomiting" },
        { label: "Itraconazole", value: "Fungal Infections" },
        { label: "Moxifloxacin", value: "Antibiotic" },
        { label: "Ampicillin", value: "Antibiotic" },
        { label: "Cetirizine", value: "Allergies" },
        { label: "Levocetirizine", value: "Allergies" },
        { label: "Budesonide", value: "Asthma and Allergies" },
        { label: "Acyclovir", value: "Antiviral" },
        { label: "Cyclosporine", value: "Immunosuppressant" },
        { label: "Tacrolimus", value: "Immunosuppressant" },
        { label: "Ranitidine", value: "Acid Reflux" },
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
        { label: "Pregnancy Symptoms", value: "Pregnancy Symptoms" }
    ];


    const labTests = [
        { label: "Complete Blood Count (CBC)", value: "Entry Level" },
        { label: "Basic Metabolic Panel (BMP)", value: "Intermediate Level" },
        {
            label: "Comprehensive Metabolic Panel (CMP)",
            value: "Intermediate Level",
        },
        { label: "Lipid Panel", value: "Intermediate Level" },
        { label: "Liver Function Tests (LFTs)", value: "Intermediate Level" },
        { label: "Renal Function Panel", value: "Intermediate Level" },
        { label: "Thyroid Function Tests (TFTs)", value: "Intermediate Level" },
        { label: "Urinalysis", value: "Intermediate Level" },
        { label: "Electrolyte Panel", value: "Advanced Level" },
        { label: "Blood Glucose Tests", value: "Advanced Level" },
        { label: "Serum Iron Tests", value: "Advanced Level" },
        { label: "Coagulation Panel", value: "Advanced Level" },
        { label: "C-reactive Protein (CRP) Test", value: "Advanced Level" },
        {
            label: "Erythrocyte Sedimentation Rate (ESR) Test",
            value: "Advanced Level",
        },
        { label: "HbA1c Test", value: "Advanced Level" },
        { label: "Arterial Blood Gas (ABG) Test", value: "Advanced Level" },
        { label: "Rheumatoid Factor (RF) Test", value: "Advanced Level" },
        { label: "Prothrombin Time (PT) Test", value: "Advanced Level" },
        {
            label: "Partial Thromboplastin Time (PTT) Test",
            value: "Advanced Level",
        },
        { label: "D-dimer Test", value: "Advanced Level" },
        { label: "Troponin Test", value: "Advanced Level" },
        { label: "Brain Natriuretic Peptide (BNP) Test", value: "Advanced Level" },
        { label: "Blood Culture Test", value: "Advanced Level" },
        { label: "Procalcitonin Test", value: "Advanced Level" },
        { label: "Immunoglobulin E (IgE) Test", value: "Advanced Level" },
        { label: "Antinuclear Antibody (ANA) Test", value: "Advanced Level" },
        { label: "Anti-DNA Antibody Test", value: "Advanced Level" },
        {
            label: "Serum Protein Electrophoresis (SPEP) Test",
            value: "Advanced Level",
        },
        {
            label: "Serum Immunofixation Electrophoresis (IFE) Test",
            value: "Advanced Level",
        },
        { label: "Ferritin Test", value: "Advanced Level" },
        { label: "Serum B12 Test", value: "Advanced Level" },
        { label: "Folate Test", value: "Advanced Level" },
        { label: "Vitamin D Test", value: "Advanced Level" },
        { label: "H. pylori Test", value: "Advanced Level" },
        { label: "Stool Culture Test", value: "Advanced Level" },
        { label: "Stool Ova and Parasites (O&P) Test", value: "Advanced Level" },
        { label: "Fecal Occult Blood Test (FOBT)", value: "Advanced Level" },
        { label: "Hepatitis Panel", value: "Advanced Level" },
        { label: "HIV Test", value: "Advanced Level" },
        { label: "Tuberculosis (TB) Test", value: "Advanced Level" },
        { label: "Malaria Test", value: "Advanced Level" },
        { label: "Dengue Test", value: "Advanced Level" },
        { label: "Chikungunya Test", value: "Advanced Level" },
        { label: "Leptospirosis Test", value: "Advanced Level" },
        { label: "Typhoid Test", value: "Advanced Level" },
        { label: "Dengue NS1 Antigen Test", value: "Advanced Level" },
        { label: "Dengue IgM Antibody Test", value: "Advanced Level" },
        { label: "Dengue IgG Antibody Test", value: "Advanced Level" },
        { label: "Chikungunya IgM Antibody Test", value: "Advanced Level" },
        { label: "Chikungunya IgG Antibody Test", value: "Advanced Level" },
        { label: "Leptospira IgM Antibody Test", value: "Advanced Level" },
        { label: "Leptospira IgG Antibody Test", value: "Advanced Level" },
        { label: "Typhoid IgM Antibody Test", value: "Advanced Level" },
        { label: "Typhoid IgG Antibody Test", value: "Advanced Level" },
        { label: "Blood Type Test", value: "Advanced Level" },
        { label: "Rh Factor Test", value: "Advanced Level" },
        { label: "Crossmatch Test", value: "Advanced Level" },
        { label: "ECG (Electrocardiogram)", value: "Advanced Level" },
        { label: "Echocardiogram", value: "Advanced Level" },
        { label: "Stress Test", value: "Advanced Level" },
        { label: "Holter Monitor Test", value: "Advanced Level" },
        { label: "Sleep Study Test", value: "Advanced Level" },
        { label: "Pulmonary Function Tests (PFTs)", value: "Advanced Level" },
        { label: "Spirometry Test", value: "Advanced Level" },
        { label: "Peak Flow Test", value: "Advanced Level" },
        { label: "Allergy Tests", value: "Advanced Level" },
        { label: "Skin Prick Test", value: "Advanced Level" },
        { label: "Patch Test", value: "Advanced Level" },
        {
            label: "Imaging Tests (X-rays, Ultrasounds, CT Scans, MRI)",
            value: "Advanced Level",
        },
        { label: "Bone Density Test", value: "Advanced Level" },
        { label: "Endoscopy", value: "Advanced Level" },
        { label: "Colonoscopy", value: "Advanced Level" },
        { label: "Cystoscopy", value: "Advanced Level" },
        { label: "Biopsy Tests", value: "Advanced Level" },
        { label: "Pap Smear Test", value: "Advanced Level" },
        { label: "Mammogram", value: "Advanced Level" },
        { label: "PSA (Prostate-Specific Antigen) Test", value: "Advanced Level" },
        { label: "Semen Analysis", value: "Advanced Level" },
        { label: "Hormone Tests", value: "Advanced Level" },
        {
            label: "Thyroid Stimulating Hormone (TSH) Test",
            value: "Advanced Level",
        },
        {
            label: "Follicle-Stimulating Hormone (FSH) Test",
            value: "Advanced Level",
        },
        { label: "Luteinizing Hormone (LH) Test", value: "Advanced Level" },
        { label: "Testosterone Test", value: "Advanced Level" },
        { label: "Progesterone Test", value: "Advanced Level" },
        { label: "Estradiol Test", value: "Advanced Level" },
        { label: "Prolactin Test", value: "Advanced Level" },
        { label: "Anti-Mullerian Hormone (AMH) Test", value: "Advanced Level" },
        { label: "Aldosterone Test", value: "Advanced Level" },
        { label: "Cortisol Test", value: "Advanced Level" },
        {
            label: "ACTH (Adrenocorticotropic Hormone) Test",
            value: "Advanced Level",
        },
        { label: "Insulin Test", value: "Advanced Level" },
        { label: "Growth Hormone Test", value: "Advanced Level" },
        { label: "Catecholamines Test", value: "Advanced Level" },
        { label: "Serotonin Test", value: "Advanced Level" },
        { label: "Dopamine Test", value: "Advanced Level" },
        { label: "Bile Acid Test", value: "Advanced Level" },
        { label: "Gastrin Test", value: "Advanced Level" },
        { label: "Secretin Test", value: "Advanced Level" },
        { label: "Trypsin Test", value: "Advanced Level" },
        { label: "Amylase Test", value: "Advanced Level" },
    ];

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

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

    const handleChange = (e) =>
    {
        const { name, value } = e.target;

        if (name === "issues")
        {
            setPatientDetails(prevPatientDetails => ({
                ...prevPatientDetails,
                issues: [...prevPatientDetails.issues, value],
            }));
        }

        else if (name === "diseases")
        {
            setPatientDetails(prevPatientDetails => ({
                ...prevPatientDetails,
                diseases: [
                    ...prevPatientDetails.diseases, value
                ]
            }));
        }
        else if (name === "medicineName")
        {
            setPatientDetails(prevPatientDetails => ({
                ...prevPatientDetails,
                medicineName: [
                    ...prevPatientDetails.medicineName, value
                ]
            }));
        }

        else if (name === "labTests")
        {
            setPatientDetails(prevPatientDetails => ({
                ...prevPatientDetails,
                labTests: [
                    ...prevPatientDetails.labTests, value
                ]
            }));
        }

        else
        {
            setPatientDetails(prevPatientDetails => ({
                ...prevPatientDetails,
                [name]: value
            }));
        }
    }

    useEffect(() =>
    {
        const fetchPatientDescriptions = async () =>
        {
            const token = localStorage.getItem("token");
            if (!token)
            {
                console.error("No token found in local storage");
                return;
            }
            const appointmentId = localStorage.getItem("appointmentId");

            try
            {
                const response = await fetch(
                    `${baseUrl}/api/v1/doctor/get_appointement_details/${appointmentId}`,
                    {
                        method: "get",
                        headers: {
                            "Content-Type": "application/json",
                            "x-auth-token": token,
                        },
                    }
                );

                if (!response.ok)
                {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                if (data.success === true)
                {
                    console.log("VIEW PATIENT DESCRIPTION", data);
                } else
                {
                    console.log("Error in response", data);
                }
            } catch (error)
            {
                console.error("Fetch error:", error.message);
            }
        };

        fetchPatientDescriptions();
    }, []);




    console.log("PATIENT DETAILS", patientDetails)

    return (
        <>
            <div
                className="flex min-h-screen relative overflow-auto 
    box-border"
            >
                <DoctorSidebar></DoctorSidebar>
                <div
                    className="flex flex-col bg-customGreen"
                    style={{
                        width: isTab ? "100%" : "77%",
                    }}
                >
                    <Header line1="Patient’s" line2="Description"></Header>

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
                                    <PermIdentityOutlinedIcon style={{ width: "70px", height: "70px" }} />
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
                                <Menu
                                    id="profile-pic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'edit-profile-pic-text',
                                    }}
                                >
                                    <MenuItem onClick={handleNewProfilePicture}>New profile picture</MenuItem>
                                    <MenuItem onClick={handleRemoveProfilePicture}>Remove current profile picture</MenuItem>
                                </Menu>
                            </div>


                            {/* 1st Row */}
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
                                        Patient's Description:
                                    </label>
                                    <div className="mx-5" style={{ display: "flex" }}>
                                        {
                                            patientDetails?.issues?.map((issue) => (
                                                <div className="breadcrumb-chip" key={issue} style={{ margin: "5px 2px 5px 2px", backgroundColor: "#89CFF0", borderRadius: "5%", padding: "2px 5px 0px 5px" }}>
                                                    {issue}
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <select
                                        className="mx-2"
                                        type="text"
                                        id="issues"
                                        name="issues"
                                        onChange={handleChange}
                                        style={{ border: "1px solid #89CFF0", height: "40px" }}
                                    >
                                        {issues?.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </span>
                            </div>


                            {/* 1st Row */}
                            <div className="flex flex-col md:flex-row justify-between">
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
                                        Diseases:
                                    </label>
                                    <div className="mx-5" style={{ display: "flex" }}>
                                        {
                                            patientDetails?.diseases?.map((disease) => (
                                                <div className="breadcrumb-chip" key={disease} style={{ margin: "5px 2px 5px 2px", backgroundColor: "#89CFF0", borderRadius: "5%", padding: "2px 5px 0px 5px" }}>
                                                    {disease}
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <select
                                        className="mx-2"
                                        type="text"
                                        id="diseases"
                                        name="diseases"
                                        onChange={handleChange}
                                        style={{ border: "1px solid #89CFF0", height: "40px" }}
                                    >
                                        {diseases?.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </span>
                            </div>
                            {/* 1st Row */}

                            {/* 1st Row */}
                            <div className="flex flex-col md:flex-row justify-between">
                                <span className="flex flex-col w-[100%] md:w-[50%]">
                                    <label
                                        className="mx-2"
                                        htmlFor="medicineName"
                                        style={{
                                            fontWeight: 400,
                                            fontSize: "20px",
                                            fontFamily: "Lato, sans-serif",
                                        }}
                                    >
                                        Medicine Names:
                                    </label>
                                    <div className="mx-5" style={{ display: "flex" }}>
                                        {
                                            patientDetails?.medicineName?.map((medicineName) => (
                                                <div className="breadcrumb-chip" key={medicineName} style={{ margin: "5px 2px 5px 2px", backgroundColor: "#89CFF0", borderRadius: "5%", padding: "2px 5px 0px 5px" }}>
                                                    {medicineName}
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <select
                                        className="mx-2"
                                        type="text"
                                        id="medicineName"
                                        name="medicineName"
                                        onChange={handleChange}
                                        style={{ border: "1px solid #89CFF0", height: "40px" }}
                                    >
                                        {medicineName?.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </span>
                            </div>
                            {/* 1st Row */}

                            {/* 1st Row */}
                            <div className="flex flex-col md:flex-row justify-between">
                                <span className="flex flex-col w-[100%] md:w-[50%]">
                                    <label
                                        className="mx-2"
                                        htmlFor="labTests"
                                        style={{
                                            fontWeight: 400,
                                            fontSize: "20px",
                                            fontFamily: "Lato, sans-serif",
                                        }}
                                    >
                                        Lab Tests:
                                    </label>
                                    <div className="mx-5" style={{ display: "flex" }}>
                                        {
                                            patientDetails?.labTests?.map((labTest) => (
                                                <div className="breadcrumb-chip" key={labTest} style={{ margin: "5px 2px 5px 2px", backgroundColor: "#89CFF0", borderRadius: "5%", padding: "2px 5px 0px 5px" }}>
                                                    {labTest}
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <select
                                        className="mx-2"
                                        type="text"
                                        id="labTests"
                                        name="labTests"
                                        onChange={handleChange}
                                        style={{ border: "1px solid #89CFF0", height: "40px" }}
                                    >
                                        {labTests?.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </span>
                            </div>
                            {/* 1st Row */}








                            {/* <div className="flex justify-center my-5">
                                <button
                                    type="submit"
                                    style={{
                                        width: "159px",
                                        height: "45px",
                                        backgroundColor: "#89CFF0",
                                        borderRadius: "43px",
                                        color: "white",
                                        fontWeight: 600,
                                        fontSize: "24px",
                                        lineHeight: "28.8px",
                                        fontFamily: "Lato, sans-serif",
                                    }}
                                >
                                    Process
                                </button>
                            </div> */}
                        </form>
                    </div>
                </div >
            </div >
        </>
    );
}
