import React from "react";
import "../App.css";

import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" width="786" height="679" viewBox="0 0 786 679" fill="none">
  <circle cx="514.5" cy="164.5" r="514.5" fill="#2BEA8E"/>
</svg>
`;
const svgContent2 = `<svg width="374" height="379" viewBox="0 0 374 379" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="93" cy="281" r="281" fill="#2BEA8E"/>
</svg>`;
const svgContent3 = `<svg width="157" height="197" viewBox="0 0 157 197" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="78.4502" cy="117.821" r="78.4502" fill="white"/>
<path d="M71.1591 165.051V80.6761H85.4773V165.051H71.1591ZM36.1307 130.023V115.705H120.506V130.023H36.1307Z" fill="#08DA75"/>
</svg>`;

const smallsvg1 = `<svg width="290" height="293" viewBox="0 0 290 293" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="188" cy="105" r="188" fill="#2BEA8E"/>
</svg>
`;
const smallsvg2 = `<svg width="225" height="194" viewBox="0 0 225 194" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="37" cy="188" r="188" fill="#2BEA8E"/>
</svg>
`;

const svgContent4 = `<svg width="237" height="28" viewBox="0 0 237 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.0400001 27V1.24H11.2C13.8133 1.24 16.0133 1.68 17.8 2.56C19.5867 3.41333 20.9467 4.8 21.88 6.72C22.8133 8.61333 23.28
11.1333 23.28 14.28C23.28 18.7067 22.2533 21.9333 20.2 23.96C18.1733 25.9867 15.1733 27 11.2 27H0.0400001ZM6.48 22.04H10.32C11.7067 
22.04 12.8667 21.84 13.8 21.44C14.76 21.0133 15.48 20.24 15.96 19.12C16.4667 18 16.72 16.3867 16.72 14.28C16.72 12.1467 16.4933 10.5067 
16.04 9.36C15.6133 8.18667 14.92 7.37333 13.96 6.92C13.0267 6.44 11.8133 6.2 10.32 6.2H6.48V22.04ZM36.4434 27.4C32.7901 27.4 30.0968
26.56 28.3634 24.88C26.6301 23.1733 25.7634 20.72 25.7634 17.52C25.7634 14.3467 26.6301 11.9067 28.3634 10.2C30.1234 8.49333 32.8168 
7.64 36.4434 7.64C40.0968 7.64 42.7901 8.49333 44.5234 10.2C46.2834 11.9067 47.1634 14.3467 47.1634 17.52C47.1634 20.72 46.2968 23.1733
 44.5634 24.88C42.8301 26.56 40.1234 27.4 36.4434 27.4ZM36.4434 22.36C37.9368 22.36 39.0034 21.9867 39.6434 21.24C40.2834 20.4933 
 40.6034 19.2533 40.6034 17.52C40.6034 15.7867 40.2834 14.5467 39.6434 13.8C39.0034 13.0533 37.9368 12.68 36.4434 12.68C34.9768 12.68 
 33.9234 13.0533 33.2834 13.8C32.6434 14.5467 32.3234 15.7867 32.3234 17.52C32.3234 19.2533 32.6434 20.4933 33.2834 21.24C33.9234 
 21.9867 34.9768 22.36 36.4434 22.36ZM60.4306 27.4C57.044 27.4 54.3906 26.5733 52.4706 24.92C50.5773 23.2667 49.6306 20.8 49.6306 
 17.52C49.6306 14.1867 50.6173 11.7067 52.5906 10.08C54.5906 8.45333 57.244 7.64 60.5506 7.64C61.9373 7.64 63.1373 7.74667 64.1506 
 7.96C65.1906 8.14667 66.1906 8.46667 67.1506 8.92V13.48C65.6573 12.76 63.9106 12.4 61.9106 12.4C60.044 12.4 58.6173 12.7733 57.6306 
 13.52C56.6706 14.2667 56.1906 15.6 56.1906 17.52C56.1906 19.3067 56.644 20.6133 57.5506 21.44C58.4573 22.24 59.8973 22.64 61.8706 
 22.64C63.8173 22.64 65.5906 22.24 67.1906 21.44V26.2C66.2306 26.6267 65.1906 26.9333 64.0706 27.12C62.9773 27.3067 61.764 27.4 60.4306 
</svg>`;

export default function UserLogin()
{
    let isTab = useMediaQuery({ query: "(max-width: 640px)" });
    const navigate = useNavigate();
    const baseUrl = process.env.REACT_APP_BASE_URL


    const [isDoctor, setIsDoctor] = useState(true);

    const [contactNumber, setContactNumber] = useState("");

    const [password, setPassword] = useState("");

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        if (isDoctor)
        {
            const response = await fetch(
                `${baseUrl}/api/v1/user/login_user`,
                {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        contactNumber: contactNumber,
                        password: password,
                    }),
                }
            );
            const data = await response.json();
            if (data.success === true)
            {
                if (data.token)
                {
                    localStorage.setItem("token", data.token);
                    navigate("/doctorlistuser");
                }
            }
            if (data.success === false)
            {
                toast.error("Wrong Credentials", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else
            {
                toast.error("Validation failed", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }
    };

    return (
        <>
            <div className="bg-customRed min-h-screen relative overflow-hidden">
                {!isTab ? (
                    <>
                        <div
                            className="absolute sm:top-[-400px] sm:right-[-400px] md:top-[-200px] md:right-[-200px] lg:top-0 lg:right-0"
                            dangerouslySetInnerHTML={{ __html: svgContent }}
                        ></div>

                        <div
                            className="absolute bottom-0 left-0 sm:bottom-[-200px] sm:left-[-0px] md:bottom-[-150px] md:left-[-150px] lg:bottom-0 lg:left-0"
                            dangerouslySetInnerHTML={{ __html: svgContent2 }}
                        ></div>
                    </>
                ) : (
                    <>
                        <div
                            className="absolute top-0 right-0"
                            dangerouslySetInnerHTML={{ __html: smallsvg1 }}
                        ></div>
                        <div
                            className="absolute bottom-0 left-0"
                            dangerouslySetInnerHTML={{ __html: smallsvg2 }}
                        ></div>
                    </>
                )}

                <div
                    className="absolute z-10 flex flex-col justify-center items-center "
                    style={{ right: 0, left: 0, margin: "0 auto" }}
                >
                    <div dangerouslySetInnerHTML={{ __html: svgContent3 }}></div>
                    <div
                        className="my-4"
                        dangerouslySetInnerHTML={{ __html: svgContent4 }}
                    ></div>

                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />

                    <div
                        className="rounded-full flex flex-row p-2 m-3 md:w-400 sm:w-300"
                        style={{ backgroundColor: "white", display: "flex", justifyContent: "space-evenly", alignItems: "center" }}
                    >
                        <span
                            className={`rounded - full p - 2 pl - 10 font - bold cursor - pointer text - sm md: text - base bg-customRed text-white`}
                            style={{ width: "90%", height: "40px", borderRadius: "25px", display: "flex", justifyContent: "space-evenly", alignItems: "center" }}
                        >
                            User's Login
                        </span>
                    </div>
                    <form className="flex flex-col ">
                        <div className="flex flex-col items-center">
                            <input
                                className="outline-none border-b-2 m-4 text-white  placeholder-white md:w-413 sm:w-300"
                                style={{
                                    height: "29px",
                                    backgroundColor: "transparent",
                                    fontFamily: "Lato, sans-serif",
                                    fontWeight: 400,
                                    fontSize: "24px",
                                    lineHeight: "31.2px",
                                }}
                                placeholder={"Mobile No."}
                                value={contactNumber}
                                onChange={(e) =>
                                {
                                    setContactNumber(e.target.value);
                                }}
                            ></input>
                            <input
                                className="outline-none border-b-2 m-4 text-white  placeholder-white md:w-413 sm:w-300"
                                style={{
                                    height: "29px",
                                    backgroundColor: "transparent",
                                    fontFamily: "Lato, sans-serif",
                                    fontWeight: 400,
                                    fontSize: "24px",
                                    lineHeight: "31.2px",
                                }}
                                placeholder="Password"
                                value={password}
                                onChange={(e) =>
                                {
                                    setPassword(e.target.value);
                                }}
                            ></input>
                        </div>
                        <div className="flex justify-end m-3 md:w-413 sm:w-300">
                            <button
                                className="text-white cursor-pointer text-right font-bold"
                                style={{
                                    width: "180px",
                                    fontFamily: "Lato, sans-serif",
                                    fontWeight: 400,
                                    fontSize: "22px",
                                    lineHeight: "26.4px",
                                }}
                            >
                                Forget Password?
                            </button>
                        </div>
                        <div className="flex overflow-hidden md:w-413 sm:w-300">
                            <input
                                type="checkbox"
                                className="form-checkbox mr-2 w-6 h-6 cursor-pointer"
                                style={{
                                    marginRight: "10px",
                                }}
                                id="myCheckbox"
                            />
                            <label
                                className="text-white cursor-pointer"
                                style={{ alignItems: "flex-start" }}
                                htmlFor="myCheckbox"
                            >
                                <span
                                    style={{
                                        fontFamily: "Lato, sans-serif",
                                        fontWeight: 400,
                                        fontSize: "24px",
                                        lineHeight: "28.8px",
                                    }}
                                >
                                    Remember Me
                                </span>
                            </label>
                        </div>
                        <div className="flex justify-center">
                            <button
                                className="rounded-full mt-4 text-customRed"
                                type="submit"
                                style={{
                                    backgroundColor: "white",
                                    width: "198px",
                                    height: "45px",
                                }}
                                onClick={handleSubmit}
                            >
                                Sign In
                            </button>
                        </div>
                        <div className="flex justify-center text-white font-bold text-lg gap-2 mt-4">
                            <p
                                style={{
                                    fontFamily: "Lato, sans-serif",
                                    fontWeight: 400,
                                    fontSize: "20px",
                                    lineHeight: "24px",
                                }}
                            >
                                Need An Account?
                            </p>
                            <button
                                type="submit"
                                style={{
                                    fontFamily: "Lato, sans-serif",
                                    fontWeight: 900,
                                    fontSize: "20px",
                                    lineHeight: "24px",
                                }}
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </>
    );
}
