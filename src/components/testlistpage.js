import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Navigate, useNavigate } from "react-router-dom";
import { Flex, Row, Select } from "antd";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import Modal from "react-responsive-modal";
import { ToastContainer, toast } from "react-toastify";

export default function TestListPage()
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



    const [selectedMethod, setSelectedMethod] = useState(null);

    const handleMethodClick = (method) =>
    {
        setSelectedMethod(method);
    };

    const [data, setData] = useState([
        { id: 1, test: 'Viral Load', testCode: 'Hiv', department: 'Molucular Test', sampleType: 'serum', cost: '$50', isEditing: false },
        { id: 2, test: 'Vitamin D3', testCode: 'vitamin d3', department: 'Immuinio', sampleType: 'serum', cost: '$75', isEditing: false },
        { id: 3, test: 'Viral Load', testCode: 'Hiv', department: 'Molucular Test', sampleType: 'serum', cost: '$50', isEditing: false },
        { id: 4, test: 'Vitamin D3', testCode: 'vitamin d3', department: 'Immuinio', sampleType: 'serum', cost: '$75', isEditing: false },
    ]);

    const addRow = () =>
    {
        setData((prevData) => [
            ...prevData,
            { id: Date.now(), test: '', testCode: '', department: '', sampleType: '', cost: '', isEditing: true },
        ]);
    };

    const editRow = (id) =>
    {
        setData((prevData) =>
            prevData.map((row) =>
                row.id === id ? { ...row, isEditing: !row.isEditing } : row
            )
        );
    };

    const handleEditChange = (id, field, value) =>
    {
        setData((prevData) =>
            prevData.map((row) =>
                row.id === id ? { ...row, [field]: value } : row
            )
        );
    };

    return (
        <>
            <div style={{ margin: 0, minHeight: '100vh', width: '100%' }}>

                <div className="MainContainer" style={{ width: '100%' }}>

                    <div className="Right_side" style={{
                        boxSizing: 'border-box',
                        width: '100%',
                        height: '75vh',
                        float: 'left',
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: 20
                    }}>

                        <div>
                            <lable style={{ marginRight: '50px' }}>Test List</lable>
                            <button onClick={addRow} style={{ marginBottom: '10px', height: '30px', width: '80px', backgroundColor: '#89CFF0', color: 'white', borderRadius: '10px' }}>
                                Add Row
                            </button>
                            <div style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #ddd' }}>
                                    <div style={{ flexBasis: '15%' }}>Test</div>
                                    <div style={{ flexBasis: '15%' }}>Test Code</div>
                                    <div style={{ flexBasis: '15%' }}>Department</div>
                                    <div style={{ flexBasis: '15%' }}>Sample Type</div>
                                    <div style={{ flexBasis: '15%' }}>Cost</div>
                                    <div style={{ flexBasis: '15%' }}>Edit Test</div>
                                </div>
                                {data.map((row) => (
                                    <div key={row.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #ddd' }}>
                                        <div
                                            contentEditable={row.isEditing}
                                            onBlur={(e) => handleEditChange(row.id, 'test', e.currentTarget.textContent)}
                                            style={{ flexBasis: '15%', textAlign: 'left' }}
                                        >
                                            {row.test}
                                        </div>
                                        <div
                                            contentEditable={row.isEditing}
                                            onBlur={(e) => handleEditChange(row.id, 'testCode', e.currentTarget.textContent)}
                                            style={{ flexBasis: '15%', textAlign: 'left' }}
                                        >
                                            {row.testCode}
                                        </div>
                                        <div
                                            contentEditable={row.isEditing}
                                            onBlur={(e) => handleEditChange(row.id, 'department', e.currentTarget.textContent)}
                                            style={{ flexBasis: '15%', textAlign: 'left' }}
                                        >
                                            {row.department}
                                        </div>
                                        <div
                                            contentEditable={row.isEditing}
                                            onBlur={(e) => handleEditChange(row.id, 'sampleType', e.currentTarget.textContent)}
                                            style={{ flexBasis: '15%', textAlign: 'left' }}
                                        >
                                            {row.sampleType}
                                        </div>
                                        <div
                                            contentEditable={row.isEditing}
                                            onBlur={(e) => handleEditChange(row.id, 'cost', e.currentTarget.textContent)}
                                            style={{ flexBasis: '15%', textAlign: 'left' }}
                                        >
                                            {row.cost}
                                        </div>
                                        <div style={{ flexBasis: '15%' }}>
                                            <button style={{ height: '30px', width: '50px', backgroundColor: '#89CFF0', color: 'white', borderRadius: '10px' }} onClick={() => editRow(row.id)}>
                                                {row.isEditing ? 'Save' : 'Edit'}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                            <button onClick={() => navigate(`/billing`)} style={{ height: '30px', width: '80px', backgroundColor: '#89CFF0', color: 'white', borderRadius: '10px' }}>
                                Process
                            </button>
                        </div>
                    </div>

                </div>

            </div>








        </>

    );
}
