import React from 'react'
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () =>
{
    const navigate = useNavigate()
    return (
        <div>
            <h1 style={{ fontSize: "40px", fontFamily: 'popins', display: 'flex', alignItems: 'center', justifyContent: 'space-around', marginTop: "2%" }}>Privacy Policy for Nandi HealthCare</h1>
            <ol style={{ fontSize: "15px", fontFamily: 'popins', display: 'flex', flexDirection: "column", padding: "2vw 20vw 0vw 20vw", gap: "10px" }}>
                <li>1. Introduction
                    Your privacy is important to us. This Privacy Policy explains how we, Nandi HealthCare, a service by Nixonbit Private Limited, collect, use, disclose, and safeguard your information when you visit our website.
                </li>
                <li>2. Information Collection and Use
                    2.1 Personal Information: We collect information that personally identifies you, such as your name, email address, and health-related information when you book an appointment.
                    2.2 Usage Data: We may also collect information on how the service is accessed and used.</li>
                <li>3. Data Protection
                    We adopt appropriate data collection, storage, processing practices, and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information.
                </li>
                <li> 4. Sharing Your Information
                    We do not sell, trade, or rent users' personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates, and advertisers for the purposes outlined above.
                </li>
                <li> 5. Compliance with Laws
                    We will disclose your personal information where required to do so by law or subpoena.
                </li>
                <li> 6. Changes to This Privacy Policy
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                </li>
                <li>7. Contact Us
                    If you have any questions about this Privacy Policy, please contact us.</li>

            </ol>
            <button
                className="rounded-full justify-center px-9 py-2 bg-[#89CFF0] text-white" style={{ marginLeft: "48%", marginTop: "7%" }}
                onClick={() => navigate("/userlogin")}>
                Back
            </button>
        </div>
    )
}

export default PrivacyPolicy;