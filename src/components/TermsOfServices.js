import React from 'react'
import { useNavigate } from 'react-router-dom'

const TermsOfServices = () =>
{
    const navigate = useNavigate()
    return (
        <div>
            <h1 style={{ fontSize: "40px", fontFamily: 'popins', display: 'flex', alignItems: 'center', justifyContent: 'space-around', marginTop: "2%" }}>Terms of Service for Nandi HealthCare</h1>
            <ol style={{ fontSize: "15px", fontFamily: 'popins', display: 'flex', flexDirection: "column", padding: "2vw 20vw 0vw 20vw", gap: "10px" }}>
                <li> 1. Acceptance of Terms
                    By accessing and using NandiHealthCare, a service provided by Nixonbit Private Limited, you agree to be bound by these Terms of Service ("Terms") and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                </li>
                <li>2. Description of Service
                    NandiHealthCare provides an online platform for scheduling appointments with healthcare professionals. The service allows users to find, schedule, and manage appointments with doctors.
                </li>
                <li>
                    3. User Responsibilities
                    3.1 Account Creation: You must provide accurate and complete information when creating an account.
                    3.2 Use of Service: You agree to use the service for lawful purposes only and comply with all applicable laws and regulations.
                    3.3 Appointment Cancellations: You are responsible for adhering to the cancellation policy of each healthcare professional.
                </li>
                <li>
                    4. Limitations of Service
                    NandiHealthCare does not provide medical advice, diagnosis, or treatment. The service is designed to facilitate appointments with healthcare professionals, who are solely responsible for the medical services they provide.
                </li>
                <li>
                    5. Intellectual Property
                    The content, features, and functionality of the service are and will remain the exclusive property of NandiHealthCare and its licensors, under Nixonbit Private Limited.
                </li>
                <li>
                    6. Termination
                    We may terminate or suspend access to our service immediately, without prior notice, for any reason whatsoever, including without limitation if you breach the Terms.
                </li>
                <li>
                    7. Limitation of Liability
                    In no event will NandiHealthCare, Nixonbit Private Limited, nor their directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
                </li>
                <li>
                    8. Changes to Terms
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time.
                </li>
            </ol>
            <button
                className="rounded-full justify-center px-9 py-2 bg-[#89CFF0] text-white" style={{ marginLeft: "48%", marginTop: "2%" }}
                onClick={() => navigate("/userlogin")}>
                Back
            </button>
        </div>
    )
}

export default TermsOfServices
