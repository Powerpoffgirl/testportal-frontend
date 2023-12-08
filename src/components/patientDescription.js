import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import Sidebar from "./sidebar";
import Header from "./header";
import { useNavigate } from "react-router-dom";
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DoctorSidebar from "./doctorSidebar";
import { Select } from "antd";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import Modal from "react-responsive-modal";

export default function PatientDescription()
{
    let isTab = useMediaQuery({ query: "(max-width: 768px)" });
    const navigate = useNavigate()
    const baseUrl = process.env.REACT_APP_BASE_URL
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const onOpenModal = () => setOpen(true);
    const onCloseModall = () => setOpen(false);
    const [open, setOpen] = useState(false);
    const [patientDetails, setPatientDetails] = useState({
        medicineName: [],
        issues: [],
        diseases: [],
        labTests: []
    })

    const onCloseModal = () =>
    {
        setModalOpen(false);
        setModalContent('');
        navigate(`/appointmentlist`)
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
        { "label": "Crocin", "value": "Crocin" },
        { "label": "Combiflam", "value": "Combiflam" },
        { "label": "Dolo", "value": "Dolo" },
        { "label": "Pantocid", "value": "Pantocid" },
        { "label": "Rantac", "value": "Rantac" },
        { "label": "Zifi", "value": "Zifi" },
        { "label": "Metformin", "value": "Metformin" },
        { "label": "Metronidazole", "value": "Metronidazole" },
        { "label": "Atorvastatin", "value": "Atorvastatin" },
        { "label": "Loratadine", "value": "Loratadine" },
        { "label": "Azithromycin", "value": "Azithromycin" },
        { "label": "Diclofenac", "value": "Diclofenac" },
        { "label": "Amoxicillin", "value": "Amoxicillin" },
        { "label": "Ciprofloxacin", "value": "Ciprofloxacin" },
        { "label": "Esomeprazole", "value": "Esomeprazole" },
        { "label": "Sertraline", "value": "Sertraline" },
        { "label": "Levofloxacin", "value": "Levofloxacin" },
        { "label": "Amlodipine", "value": "Amlodipine" },
        { "label": "Clopidogrel", "value": "Clopidogrel" },
        { "label": "Diazepam", "value": "Diazepam" },
        { "label": "Lisinopril", "value": "Lisinopril" },
        { "label": "Hydrochlorothiazide", "value": "Hydrochlorothiazide" },
        { "label": "Metoprolol", "value": "Metoprolol" },
        { "label": "Omeprazole", "value": "Omeprazole" },
        { "label": "Amitriptyline", "value": "Amitriptyline" },
        { "label": "Furosemide", "value": "Furosemide" },
        { "label": "Warfarin", "value": "Warfarin" },
        { "label": "Ibuprofen", "value": "Ibuprofen" },
        { "label": "Paracetamol", "value": "Paracetamol" },
        { "label": "Folic Acid", "value": "Folic Acid" },
        { "label": "Aspirin", "value": "Aspirin" },
        { "label": "Simvastatin", "value": "Simvastatin" },
        { "label": "Dexamethasone", "value": "Dexamethasone" },
        { "label": "Alprazolam", "value": "Alprazolam" },
        { "label": "Gliclazide", "value": "Gliclazide" },
        { "label": "Cefixime", "value": "Cefixime" },
        { "label": "Gabapentin", "value": "Gabapentin" },
        { "label": "Pregabalin", "value": "Pregabalin" },
        { "label": "Telmisartan", "value": "Telmisartan" },
        { "label": "Candesartan", "value": "Candesartan" },
        { "label": "Rosuvastatin", "value": "Rosuvastatin" },
        { "label": "Fenofibrate", "value": "Fenofibrate" },
        { "label": "Duloxetine", "value": "Duloxetine" },
        { "label": "Levothyroxine", "value": "Levothyroxine" },
        { "label": "Carbamazepine", "value": "Carbamazepine" },
        { "label": "Sildenafil", "value": "Sildenafil" },
        { "label": "Losartan", "value": "Losartan" },
        { "label": "Glimipiride", "value": "Glimipiride" },
        { "label": "Sitagliptin", "value": "Sitagliptin" },
        { "label": "Rabeprazole", "value": "Rabeprazole" },
        { "label": "Ezetimibe", "value": "Ezetimibe" },
        { "label": "Cilnidipine", "value": "Cilnidipine" },
        { "label": "Dexorange", "value": "Dexorange" },
        { "label": "Loperamide", "value": "Loperamide" },
        { "label": "Hydroxychloroquine", "value": "Hydroxychloroquine" },
        { "label": "Montelukast", "value": "Montelukast" },
        { "label": "Clotrimazole", "value": "Clotrimazole" },
        { "label": "Naproxen", "value": "Naproxen" },
        { "label": "Methotrexate", "value": "Methotrexate" },
        { "label": "Metoclopramide", "value": "Metoclopramide" },
        { "label": "Hyoscine Butylbromide", "value": "Hyoscine Butylbromide" },
        { "label": "Nifedipine", "value": "Nifedipine" },
        { "label": "Pheniramine Maleate", "value": "Pheniramine Maleate" },
        { "label": "Methylprednisolone", "value": "Methylprednisolone" },
        { "label": "Domperidone", "value": "Domperidone" },
        { "label": "Ondansetron", "value": "Ondansetron" },
        { "label": "Itraconazole", "value": "Itraconazole" },
        { "label": "Moxifloxacin", "value": "Moxifloxacin" },
        { "label": "Ampicillin", "value": "Ampicillin" },
        { "label": "Cetirizine", "value": "Cetirizine" },
        { "label": "Levocetirizine", "value": "Levocetirizine" },
        { "label": "Budesonide", "value": "Budesonide" },
        { "label": "Acyclovir", "value": "Acyclovir" },
        { "label": "Cyclosporine", "value": "Cyclosporine" },
        { "label": "Tacrolimus", "value": "Tacrolimus" },
        { "label": "Ranitidine", "value": "Ranitidine" }
    ]


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

    const updatedLabTests = labTests.map(test => ({
        ...test,
        value: test.label
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

    const handleChangeMedicine = (values) =>
    {
        setPatientDetails(prevPatientDetails => ({
            ...prevPatientDetails,
            medicineName: values
        }));
    };

    const handleChangeLabTests = (values) =>
    {
        setPatientDetails(prevPatientDetails => ({
            ...prevPatientDetails,
            labTests: values
        }));
    };


    console.log("PATIENT DETAILS", patientDetails)

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
        const appointmentId = localStorage.getItem("appointmentId")
        const response = await fetch(
            `${baseUrl}/api/v1/doctor/doctor_diagnosis/${appointmentId}`,
            {
                method: "put",
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
            localStorage.setItem("appointmentId", appointmentId)
            setModalOpen(true);
            // navigate(`/appointmentlist`)
        }
        console.log("DATA from response", data)
    }

    console.log("PATIENT DETAILS", patientDetails)

    return (
        <form
            className="flex flex-col gap-2 px-3 w-full relative overflow-hidden justify-center"
            onSubmit={(e) => e.preventDefault()}
        >

            <Modal open={modalOpen} onClose={onCloseModal} styles={{
                modal: {
                    background: 'transparent', // Makes modal background transparent
                    boxShadow: 'none',        // Removes shadow or border effects
                    // Any other styles to override default modal styles
                }
            }} center>
                <div className="flex flex-col items-center w-[100%] md:w-[100%]" style={{ border: 'none', borderRadius: "5px", backgroundColor: '#08DA75' }}>
                    <text className="ml-4 text-center mt-4" style={{ marginBottom: -20, fontSize: "40px", fontWeight: 700, lineHeight: "28.8px", fontFamily: "Lato, sans-serif", color: '#FFFFFF', height: '100px', width: '370px', display: "flex", alignItems: "center", justifyContent: "center" }}>
                        Confirmed !
                    </text>
                    <text className="ml-4 text-center" style={{ fontSize: "60px", fontWeight: 800, lineHeight: "24px", fontFamily: "Lato, sans-serif", color: '#FFFFFF', marginBottom: "7%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {<IoIosCheckmarkCircleOutline />}
                    </text>
                    {/* <div className="flex justify-center">
                        <button
                            className="rounded-full mt-4 text-customRed"
                            type="submit"
                            style={{
                                backgroundColor: "white",
                                width: isTab ? "150px" : "198px",
                                height: isTab ? "35px" : "45px",
                                boxShadow: " 0 10px 5px -3px rgb(0 0 0 / 0.3)",
                            }}
                        // onClick={navigate(`/appointmentlist`)}
                        >
                            Appointment List
                        </button>
                    </div> */}
                </div>
            </Modal>

            {/* <Modal open={open}
                // onClose={onCloseModal}
                center
                // doctor={selectedDoctor}
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
            </Modal> */}
            {/* <div className="grid grid-cols-1 w-full gap-4"> */}
            <div className="flex flex-col">
                <label className="mx-2 text-lg font-normal text-black font-lato" htmlFor="issues">
                    Issues
                </label>
                <Select
                    mode="multiple"
                    className="mx-2 border border-green-500 rounded-lg"
                    popupClassName="no-border-dropdown-menu" // Apply the custom class here
                    id="issues"
                    name="issues"
                    onChange={handleChangeIssues}
                    value={patientDetails.issues}
                    placeholder="Select Issues"
                    style={{ overflowY: 'auto' }}
                    dropdownStyle={{ maxHeight: '300px', overflowY: 'auto' }}
                >
                    {issues.map((option) => (
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
                    className="mx-2 border border-green-500 rounded-lg"
                    popupClassName="no-border-dropdown-menu" // Apply the custom class here
                    id="diesease"
                    name="diesease"
                    onChange={handleChangeDiseases}
                    value={patientDetails.diseases}
                    placeholder="Select Diesease"
                    style={{ overflowY: 'auto' }}
                    dropdownStyle={{ maxHeight: '300px', overflowY: 'auto' }}
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
                <label className="mx-2 text-lg font-normal text-black font-lato" htmlFor="issues">
                    Medicine Name
                </label>
                <Select
                    mode="multiple"
                    className="mx-2 border border-green-500 rounded-lg"
                    popupClassName="no-border-dropdown-menu" // Apply the custom class here
                    id="medicineName"
                    name="medicineName"
                    onChange={handleChangeMedicine}
                    value={patientDetails.medicineName}
                    placeholder="Select Medicine"
                    style={{ overflowY: 'auto' }}
                    dropdownStyle={{ maxHeight: '300px', overflowY: 'auto' }}
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
                <label className="mx-2 text-lg font-normal text-black font-lato" htmlFor="issues">
                    Lab Tests
                </label>
                <Select
                    mode="multiple"
                    className="mx-2 border border-green-500 rounded-lg"
                    popupClassName="no-border-dropdown-menu" // Apply the custom class here
                    id="labTests"
                    name="labTests"
                    onChange={handleChangeLabTests}
                    value={patientDetails.labTests}
                    placeholder="Select Lab Tests"
                    style={{ overflowY: 'auto' }}
                    dropdownStyle={{ maxHeight: '300px', overflowY: 'auto' }}
                >
                    {labTests.map((option) => (
                        <Select.Option key={option.value} value={option.value}>
                            {option.label}
                        </Select.Option>
                    ))}
                </Select>
            </div>

            <div className="flex justify-center my-5">
                <button
                    type="submit"
                    className="w-40 h-11 bg-green-500 rounded-full text-white font-semibold text-xl leading-9 font-lato"
                    onClick={handleRegister}
                >
                    Process
                </button>
            </div>
        </form>
    );
}
