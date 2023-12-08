import React, { useEffect, useState } from "react";
import design from "../assets/design.svg";
import FormAppoinment from "./formAppointment";
import { useLocation } from "react-router-dom";

export default function DocAppointment()
{
    const location = useLocation()
    const selectedDoctor = {
        name: location?.state?.doctor?.name,
        email: location?.state?.doctor?.email,
    }
    console.log("my selected doctor", selectedDoctor)
    const [dataFromChild, setDataFromChild] = React.useState("");
    const [doctorId, setDoctorId] = useState()
    const [doctorName, setDoctorName] = useState()
    const [doctorEmail, setDoctorEmail] = useState()

    const handleChildData = (data) =>
    {
        setDataFromChild(data);
    };

    useEffect(() =>
    {
        setDoctorId(localStorage.getItem("doctorId"))
        setDoctorName(localStorage.getItem("doctorName"))
        setDoctorEmail(localStorage.getItem("doctorEmail"))
    }, [])

    return (
        <>
            <div className="p-3 h-32">
                <div className="flex h-16 flex-row justify-between bg-[#08DA75] w-full rounded-full px-10 pr-0">
                    <div class="flex items-center gap-x-2">
                        <img class="object-cover w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100" alt="" />
                        <div>
                            <h1 class="text-xl font-semibold text-white capitalize">
                                Dr. {doctorName ? doctorName : `${dataFromChild}`}
                            </h1>
                            <p class="text-base text-white">
                                {doctorEmail ? doctorEmail : selectedDoctor.email}
                            </p>

                        </div>
                    </div>
                    <img className="h-16 hidden sm:block md:hidden lg:block" src={design} alt="design" />
                </div>
            </div>
            <FormAppoinment onDataFromChild={handleChildData} />
        </>
    );
}