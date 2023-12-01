import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Header from "./header";
import DoctorSidebar from "./doctorSidebar";
import { useNavigate } from "react-router-dom";
import UserSidebar from "./userSidebar";
import PatientHeader from "./patientHeader";
import AdminSidebar from "./adminSidebar";
import AdminHeader from "./adminHeader";

export default function PatientListAdmin()
{
    let isTab = useMediaQuery({ query: "(max-width: 768px)" });
    const baseUrl = process.env.REACT_APP_BASE_URL
    const [patientsList, setPatientsList] = useState([])
    const navigate = useNavigate()

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
                const response = await fetch(`${baseUrl}/api/v1/admin/list_patients`, {
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
        fetchPatientDetails()
    }, [])

    const handleDeletePatient = async (patientId) =>
    {
        try
        {
            const token = localStorage.getItem("token");
            if (!token)
            {
                console.error("No token found in local storage");
                return;
            }
            const response = await fetch(`${baseUrl}/api/v1/admin/delete_patient/${patientId}`, {
                method: 'DELETE', // Use DELETE method
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token // Use the stored token
                }
            });

            const data = await response.json();

            if (response.ok)
            {
                console.log("Patient deleted successfully", data);
                // Update the list in the UI by removing the deleted doctor
                setPatientsList(prevPatientsList => prevPatientsList.filter(patient => patient._id !== patientId));
            } else
            {
                console.error("Failed to delete the doctor", data?.message);
            }

        } catch (error)
        {
            console.error('There was an error deleting the doctor:', error);
        }
    }

    const handleBookAppointment = (patientId) =>
    {
        localStorage.setItem("patientId", patientId)
        navigate("/editappointment")
    }
    console.log("PATIENT LISTS", patientsList)

    return (
        <>
            <div className="flex flex-col">
                {
                    patientsList?.map((patient) => (
                        <div className="bg-white w-full p-4 sm:px-5 px-1 mb-5">
                            <div className="flex flex-row justify-start items-center">
                                <div class="flex items-center gap-x-2">
                                    <img class="object-cover sm:w-20 sm:h-20 w-10 h-10  rounded-full" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100" alt="" />

                                    <div>
                                        <h1 class=" font-semibold text-gray-700 sm:text-lg text-sm capitalize">{patient.name}</h1>
                                        {/* <p class="text-gray-500 sm:text-sm text-xs">Wednesday<span className="ms-2">15:00</span></p> */}
                                    </div>
                                </div>
                                <div class="flex flex-row ms-auto gap-1 sm:gap-4">
                                    <button class="rounded-full px-4 sm:px-6 py-1 sm:py-2 text-white bg-[#EF5F5F] text-xs sm:text-sm" onClick={() => handleDeletePatient(patient._id)}>Delete</button>
                                    <button class="rounded-full px-6 sm:px-8 py-1 sm:py-2 text-white bg-[#08DA75] text-xs sm:text-sm" onClick={() => handleBookAppointment(patient._id)}>Edit</button>
                                </div>

                            </div>

                        </div>
                    ))
                }


            </div>
        </>
    );
}
