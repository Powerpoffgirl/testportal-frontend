import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { Flex, Row, Select } from "antd";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import Modal from "react-responsive-modal";
import { ToastContainer, toast } from "react-toastify";

export default function BillingPage()
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
        { label: "Complete Blood Count (CBC)", value: "Complete Blood Count (CBC)" },
        { label: "Basic Metabolic Panel (BMP)", value: "Basic Metabolic Panel (BMP)" },
        { label: "Comprehensive Metabolic Panel (CMP)", value: "Comprehensive Metabolic Panel (CMP)" },
        { label: "Lipid Panel", value: "Lipid Panel" },
        { label: "Liver Function Tests (LFTs)", value: "Liver Function Tests (LFTs)" },
        { label: "Renal Function Panel", value: "Renal Function Panel" },
        { label: "Thyroid Function Tests (TFTs)", value: "Thyroid Function Tests (TFTs)" },
        { label: "Urinalysis", value: "Urinalysis" },
        { label: "Electrolyte Panel", value: "Electrolyte Panel" },
        { label: "Blood Glucose Tests", value: "Blood Glucose Tests" },
        { label: "Serum Iron Tests", value: "Serum Iron Tests" },
        { label: "Coagulation Panel", value: "Coagulation Panel" },
        { label: "C-reactive Protein (CRP) Test", value: "C-reactive Protein (CRP) Test" },
        { label: "Erythrocyte Sedimentation Rate (ESR) Test", value: "Erythrocyte Sedimentation Rate (ESR) Test" },
        { label: "HbA1c Test", value: "HbA1c Test" },
        { label: "Arterial Blood Gas (ABG) Test", value: "Arterial Blood Gas (ABG) Test" },
        { label: "Rheumatoid Factor (RF) Test", value: "Rheumatoid Factor (RF) Test" },
        { label: "Prothrombin Time (PT) Test", value: "Prothrombin Time (PT) Test" },
        { label: "Partial Thromboplastin Time (PTT) Test", value: "Partial Thromboplastin Time (PTT) Test" },
        { label: "D-dimer Test", value: "D-dimer Test" },
        { label: "Troponin Test", value: "Troponin Test" },
        { label: "Brain Natriuretic Peptide (BNP) Test", value: "Brain Natriuretic Peptide (BNP) Test" },
        { label: "Blood Culture Test", value: "Blood Culture Test" },
        { label: "Procalcitonin Test", value: "Procalcitonin Test" },
        { label: "Immunoglobulin E (IgE) Test", value: "Immunoglobulin E (IgE) Test" },
        { label: "Antinuclear Antibody (ANA) Test", value: "Antinuclear Antibody (ANA) Test" },
        { label: "Anti-DNA Antibody Test", value: "Anti-DNA Antibody Test" },
        { label: "Serum Protein Electrophoresis (SPEP) Test", value: "Serum Protein Electrophoresis (SPEP) Test" },
        { label: "Serum Immunofixation Electrophoresis (IFE) Test", value: "Serum Immunofixation Electrophoresis (IFE) Test" },
        { label: "Ferritin Test", value: "Ferritin Test" },
        { label: "Serum B12 Test", value: "Serum B12 Test" },
        { label: "Folate Test", value: "Folate Test" },
        { label: "Vitamin D Test", value: "Vitamin D Test" },
        { label: "H. pylori Test", value: "H. pylori Test" },
        { label: "Stool Culture Test", value: "Stool Culture Test" },
        { label: "Stool Ova and Parasites (O&P) Test", value: "Stool Ova and Parasites (O&P) Test" },
        { label: "Fecal Occult Blood Test (FOBT)", value: "Fecal Occult Blood Test (FOBT)" },
        { label: "Hepatitis Panel", value: "Hepatitis Panel" },
        { label: "HIV Test", value: "HIV Test" },
        { label: "Tuberculosis (TB) Test", value: "Tuberculosis (TB) Test" },
        { label: "Malaria Test", value: "Malaria Test" },
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
            toast.success("Diagnosis saved.")
            setModalOpen(true);
        }
        console.log("DATA from response", data)
    }

    console.log("PATIENT DETAILS", patientDetails)




    const [selectedMethod, setSelectedMethod] = useState(null);

    const handleMethodClick = (method) =>
    {
        setSelectedMethod(method);
    };

    return (
        <>
            <div style={{ margin: 0, minHeight: '100vh', width: '100%' }}>

                <div className="MainContainer" style={{ width: '100%' }}>

                    <div className="Right_side" style={{
                        boxSizing: 'border-box',
                        width: '25%',
                        height: '75vh',
                        float: 'left',
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: 20
                    }}>
                        <p style={{ textDecoration: 'underline', color: 'gray' }}>Patient Details</p>
                        <p style={{ color: 'black', fontWeight: 500, marginTop: '10px' }}>Vishal Patel</p>
                        <p style={{ color: 'black', fontWeight: 500, marginTop: '10px' }}>2312119001</p>

                        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
                            <div style={{ color: 'gray', fontWeight: 500, width: '45%' }}>Gender</div>
                            <div style={{ color: 'gray', fontWeight: 500, width: '45%' }}>Age</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '5px' }}>
                            <div style={{ color: 'black', fontWeight: 500, width: '45%' }}>male</div>
                            <div style={{ color: 'black', fontWeight: 500, width: '45%' }}>24</div>
                        </div>



                        <div style={{ marginTop: '5px' }}>
                            <p style={{ color: 'gray' }}>Contact number</p>
                            <p style={{ color: 'black', fontWeight: 500, marginTop: '5px', marginBottom: '10px' }}>+914234234324</p>
                        </div>

                        <hr />
                        <hr />

                        <div>
                            <p style={{ color: 'gray', marginTop: '15px' }}>Billing Date</p>
                            <input
                                className="px-2 border h-10 rounded-lg"
                                type="date"
                                id="appointmentDate"
                                name="date"
                            />
                        </div>

                        <div style={{ marginTop: '15px' }}>
                            <p style={{ color: 'gray' }}>Sample collector</p>
                            <p style={{ color: 'black' }}>-</p>
                        </div>

                        <div style={{ marginTop: '15px' }}>
                            <p style={{ color: 'gray' }}>Collected At</p>
                            <p style={{ color: 'black' }}>-</p>
                        </div>

                        <div style={{ marginTop: '15px' }}>
                            <p style={{ color: 'gray' }}>Organisation</p>
                            <p style={{ color: 'black' }}>Self</p>
                        </div>
                    </div>


                    <div className="Left_side" style={{ boxSizing: 'border-box', width: '72%', height: '75vh', float: 'right', borderRadius: 20, backgroundColor: 'white', padding: '20px' }}>


                        <div class="relative overflow-x-auto">
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            Test/package
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Price
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            -
                                        </th>
                                        <td class="px-6 py-4">
                                            -
                                        </td>
                                        <td class="px-6 py-4">
                                            -
                                        </td>

                                    </tr>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            -
                                        </th>
                                        <td class="px-6 py-4">
                                            -
                                        </td>
                                        <td class="px-6 py-4">
                                            -
                                        </td>

                                    </tr>
                                    <tr class="bg-white dark:bg-gray-800">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            -
                                        </th>
                                        <td class="px-6 py-4">
                                            -
                                        </td>
                                        <td class="px-6 py-4">
                                            -
                                        </td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>


                        <form>
                            <div class="flex mt-2 mb-3">
                                <label for="search-dropdown" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-900">Your Email</label>
                                <button id="dropdown-button" data-dropdown-toggle="dropdown" class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">All categories <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                </svg></button>
                                <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                                        <li>
                                            <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mockups</button>
                                        </li>
                                        <li>
                                            <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Templates</button>
                                        </li>
                                        <li>
                                            <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Design</button>
                                        </li>
                                        <li>
                                            <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logos</button>
                                        </li>
                                    </ul>
                                </div>
                                <div class="relative w-full">
                                    <input type="search" id="search-dropdown" class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Mockups, Logos, Design Templates..." required />
                                    <button type="submit" class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-gray-900 bg-gray-50 rounded-e-lg border border-gray-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                        <span class="sr-only">Search</span>
                                    </button>
                                </div>
                            </div>
                        </form>


                        <div className="Absolute_left" style={{ width: '35%', float: 'left', borderRight: '0.5px solid #D3D3D3' }}>
                            <div style={{ width: '45%', float: 'left', marginRight: '5px' }}>
                                <label style={{ fontSize: 12 }}>Discount (%) (optional)</label>
                                <input type="text" style={{ border: '1px solid gray', width: '80%' }} />
                            </div>

                            <div style={{ width: '45%', float: 'right', marginLeft: '5px' }}>
                                <label style={{ fontSize: 12 }}>Discount (%) (optional)</label>
                                <input type="text" style={{ border: '1px solid gray', width: '80%' }} />
                            </div>


                            <div style={{ marginTop: '60px', display: 'flex', flexDirection: 'row' }}>
                                <p style={{ color: 'gray', marginRight: '160px' }}>Amount</p>
                                <p style={{ color: 'black' }}>0</p>
                            </div>

                            <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'row' }}>
                                <p style={{ color: 'gray', marginRight: '155px' }}>Discount</p>
                                <p style={{ color: 'black' }}>0</p>
                            </div>

                            <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'row' }}>
                                <p style={{ color: 'black', marginRight: '120px', fontWeight: 500 }}>Total Amount</p>
                                <p style={{ color: 'black' }}>0</p>
                            </div>







                        </div>





                        <div className="middle" style={{ width: '35%', float: 'left', borderRight: '0.5px solid #D3D3D3' }}>
                            <div style={{ width: '100%', marginleft: '50px' }}>
                                <input type="checkbox" />
                                <label >Due Payment</label>

                            </div>

                            <div style={{ marginTop: '15px' }}>
                                <p style={{ color: 'gray', marginRight: '100px' }}>Paid Amount</p>
                                <input type="text" style={{ border: '1px solid gray', width: '80%' }} />
                            </div>

                            <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'row' }}>
                                <p style={{ color: 'black', marginRight: '80px', fontWeight: 500 }}>Due Amount</p>
                                <p style={{ color: 'black' }}>0</p>

                            </div>
                            <hr />








                        </div>







                        <div className="Absolute_Right">
                            <div style={{ margin: '20px', marginBottom: '10px' }}>
                                <label>Payment Method</label>
                            </div>

                            <div style={{ width: '25%', float: 'left', marginLeft: '20px' }}>
                                <div
                                    style={{
                                        marginBottom: '10px',
                                        padding: '8px 12px',
                                        border: '1px solid #ccc',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.3s',
                                        backgroundColor: selectedMethod === 'cash' ? '#f0f0f0' : 'white',
                                    }}
                                    onClick={() => handleMethodClick('cash')}
                                >
                                    Cash
                                </div>

                                <div
                                    style={{
                                        marginBottom: '10px',
                                        padding: '8px 12px',
                                        border: '1px solid #ccc',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.3s',
                                        backgroundColor: selectedMethod === 'UPI' ? '#f0f0f0' : 'white',
                                    }}
                                    onClick={() => handleMethodClick('UPI')}
                                >
                                    UPI
                                </div>

                                <div
                                    style={{
                                        padding: '8px 12px',
                                        border: '1px solid #ccc',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.3s',
                                        backgroundColor: selectedMethod === 'Card' ? '#f0f0f0' : 'white',
                                    }}
                                    onClick={() => handleMethodClick('Card')}
                                >
                                    Card
                                </div>
                            </div>
                        </div>








                    </div>

                </div>

            </div>








        </>

    );
}
