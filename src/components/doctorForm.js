import React, { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Sidebar from "./sidebar";
import Header from "./header";
import AdminHeader from "./adminHeader"
import { useNavigate } from "react-router-dom";
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DoctorSidebar from "./doctorSidebar";
import AdminSidebar from "./adminSidebar";

export default function DoctorForm()
{
  let isTab = useMediaQuery({ query: "(max-width: 768px)" });
  let isTab2 = useMediaQuery({ query: "(max-width: 425px)" });
  const navigate = useNavigate()
  const baseUrl = process.env.REACT_APP_BASE_URL
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const submitRef = useRef(null)
  const [doctorDetails, setDoctorDetails] = useState({
    name: "",
    email: "",
    contactNumber: "",
    workingDays: [],
    workingHours: {
      workHourFrom: "",
      workHourTo: ""
    },
    totalExperience: "",
    speciality: "",
    degree: "",
    address: {
      houseNo: "",
      floor: "",
      block: "",
      area: "",
      pinCode: "",
      district: "",
      state: ""
    },
    doctorPic: ""
  })

  // const handleFileSelect = async (event) =>
  // {
  //     const file = event.target.files[0];

  //     console.log("FILE", file)
  //     const response = await fetch(
  //         `${baseUrl}/api/v1/upload_image`,
  //         {
  //             method: "post",
  //             headers: {
  //                 "Content-Type": "form-data",
  //             },
  //             body: file
  //         }
  //     );


  //     const data = await response.json();
  //     console.log("DATA", data)

  // };

  const Daysdropdown = [
    { label: "Select Days", value: "" },
    { label: "Monday", value: "Monday" },
    { label: "Tuesday", value: "Tuesday" },
    { label: "Wednesday", value: "Wednesday" },
    { label: "Thursday", value: "Thursday" },
    { label: "Friday", value: "Friday" },
    { label: "Saturday", value: "Saturday" },
    { label: "Sunday", value: "Sunday" },
  ];

  const IndianDoctorSpecialties = [
    "General Medicine",
    "Cardiology",
    "Dermatology",
    "Endocrinology",
    "Gastroenterology",
    "Nephrology",
    "Neurology",
    "Oncology",
    "Pediatrics",
    "Psychiatry",
    "Pulmonology",
    "Rheumatology",
    "General Surgery",
    "Orthopedic Surgery",
    "Cardiothoracic Surgery",
    "Neurosurgery",
    "Plastic Surgery",
    "Urology",
    "Vascular Surgery",
    "Gynecology",
    "Obstetrics",
    "Ophthalmology",
    "ENT (Ear, Nose, and Throat)",
    "Dental Surgery",
    "Anesthesiology",
    "Radiology",
    "Pathology",
    "Hematology",
    "Ayurveda",
    "Homeopathy",
    "Physical Medicine and Rehabilitation",
    "Sports Medicine",
    "Diabetology",
    "Infectious Disease",
    "Geriatrics",
    "Pain Management",
    "Critical Care Medicine",
    "Emergency Medicine",
    "Occupational Medicine",
    "Preventive Medicine",
    "Family Medicine",
    "Pediatric Surgery",
    "Gastrointestinal Surgery",
    "Laparoscopic Surgery",
    "Transplant Surgery",
    "Nuclear Medicine",
    "Reproductive Medicine",
    "Neonatology",
    "Allergy and Immunology",
    "Audiology and Speech Therapy"
  ];

  const SpecialtiesDropdown = IndianDoctorSpecialties.map(specialty => ({
    label: specialty,
    value: specialty
  }));


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

  const handleFileSelect = (event) =>
  {
    const file = event.target.files[0];
    if (file)
    {
      setSelectedFile(file);
    }
  };

  const handleNewProfilePictureClick = async () =>
  {
    // This will trigger the hidden file input to open the file dialog
    await fileInputRef.current.click();
    handleNewProfilePicture()
  };

  const handleNewProfilePicture = async () =>
  {
    const token = localStorage.getItem('token');
    const doctorId = localStorage.getItem('doctorId');

    if (!token || !doctorId)
    {
      console.error('Token or doctor ID not found in local storage');
      return;
    }

    const formData = new FormData();
    formData.append('doctorPic', selectedFile);

    console.log("FORM DATA", formData)
    try
    {
      const response = await fetch(`${baseUrl}/api/v1/upload_image`, {
        method: 'POST',
        headers: {
          'x-auth-token': token,
        },
        body: formData,
      });

      if (!response.ok)
      {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Image uploaded successfully:', data);
      setDoctorDetails(prevDoctorDetails => ({
        ...prevDoctorDetails,
        doctorPic: data.profilePicImageUrl
      }));

      alert('Image uploaded successfully.');

      // Reset the file input
      setSelectedFile(null);
      fileInputRef.current.value = '';
    } catch (error)
    {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    }
  };

  // Function to handle profile picture removal
  const handleRemoveProfilePicture = () =>
  {
    // Logic to handle removing the current profile picture
    handleClose();
  };


  const TimeDropdown = [
    { label: "Select Time", value: "" },
    ...Array.from({ length: 24 }, (v, i) =>
    {
      const hour = i.toString().padStart(2, '0');
      return { label: `${hour}:00`, value: `${hour}:00` };
    })
  ];

  const handleChange = (e) =>
  {
    const { name, value } = e.target;

    if (name === "workingDays")
    {
      setDoctorDetails(prevDoctorDetails => ({
        ...prevDoctorDetails,
        workingDays: [...prevDoctorDetails.workingDays, value],
      }));
    } else if (name === "workHourFrom" || name === "workHourTo")
    {
      setDoctorDetails(prevDoctorDetails => ({
        ...prevDoctorDetails,
        workingHours: {
          ...prevDoctorDetails.workingHours,
          [name]: value,
        }
      }));
    } else if (["houseNo", "floor", "block", "area", "pinCode", "district", "state"].includes(name))
    {
      setDoctorDetails(prevDoctorDetails => ({
        ...prevDoctorDetails,
        address: {
          ...prevDoctorDetails.address,
          [name]: value
        }
      }));
    } else
    {
      setDoctorDetails(prevDoctorDetails => ({
        ...prevDoctorDetails,
        [name]: value
      }));
    }
  }



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
    const response = await fetch(
      `${baseUrl}/api/v1/admin/register_doctor`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(doctorDetails)
      }
    );
    const data = await response.json();
    if (data.success === true)
    {
      navigate("/otp", {
        state: { contactNumber: doctorDetails.contactNumber }
      })
      localStorage.setItem("id", data.data._id)
    }
    console.log("DATA from response", data)
  }

  const handleDelete = (workingDay) =>
  {
    console.log("delete", workingDay);
    const days = doctorDetails.workingDays.filter(doctorDetail => doctorDetail !== workingDay);

    // Assuming you want to update the doctorDetails state after filtering
    setDoctorDetails({
      ...doctorDetails,
      workingDays: days
    });
  }

  console.log("DOCTOR DETAILS", doctorDetails)

  return (
    <>
      <div
        className="flex min-h-screen relative overflow-auto 
    box-border"
      >
        <AdminSidebar></AdminSidebar>
        <div
          className="flex flex-col bg-customGreen"
          style={{
            width: isTab ? "100%" : "77%",
          }}
        >
          <AdminHeader line1="Doctor’s" line2="Detail"></AdminHeader>

          <div
            className="scrollable-content"
            style={{
              overflow: isTab ? "auto" : "auto",
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

              <div style={{ display: "flex", flexDirection: "column", marginLeft: "40%" }}>
                <div style={{ backgroundColor: "#FFFFFF", width: "90px", height: "90px", borderRadius: "50%", alignItems: "center", display: "flex", flexDirection: "row", justifyContent: "space-evenly", color: "#A4A4A4" }}>
                  {
                    doctorDetails?.doctorPic ? (
                      <img
                        src={doctorDetails.doctorPic}
                        alt="Avatar"
                        style={{
                          borderRadius: "50%",
                          height: isTab ? "40px" : "81px",
                          width: isTab ? "40px" : "81px",
                        }}
                      />
                    ) : (
                      <PermIdentityOutlinedIcon style={{ width: "70px", height: "70px" }} />
                    )
                  }

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
                  <MenuItem onClick={handleNewProfilePictureClick}>New profile picture</MenuItem>
                  <MenuItem onClick={handleRemoveProfilePicture}>Remove current profile picture</MenuItem>
                </Menu>
                <input
                  id="imageInput"
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  accept="image/*"
                  onChange={handleFileSelect}
                />

              </div>



              {/* 1st Row */}

              <label
                className="mx-2"
                htmlFor="name"
                style={{
                  fontWeight: 400,
                  fontSize: "20px",
                  fontFamily: "Lato, sans-serif",
                }}
              >
                Dr. Name
              </label>
              <input
                className="mx-2"
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                style={{ border: "1px solid #08DA75", height: "40px", paddingLeft: "1.5%" }}
              />
              {/* 1st Row */}

              {/* 1st Row */}

              <label
                className="mx-2"
                htmlFor="email"
                style={{
                  fontWeight: 400,
                  fontSize: "20px",
                  fontFamily: "Lato, sans-serif",
                }}
              >
                Email
              </label>
              <input
                className="mx-2"
                type="text"
                id="email"
                name="email"
                onChange={handleChange}
                style={{ border: "1px solid #08DA75", height: "40px", paddingLeft: "1.5%" }}
              />
              {/* 1st Row */}

              {/* 1st Row */}

              <label
                className="mx-2"
                htmlFor="contactNumber"
                style={{
                  fontWeight: 400,
                  fontSize: "20px",
                  fontFamily: "Lato, sans-serif",
                }}
              >
                Contact Number
              </label>
              <input
                className="mx-2"
                type="text"
                id="contactNumber"
                name="contactNumber"
                onChange={handleChange}
                style={{ border: "1px solid #08DA75", height: "40px", paddingLeft: "1.5%" }}
              />
              {/* 1st Row */}

              {/* 2nd Row */}

              <div className="flex flex-col md:flex-row justify-between">
                <span className="flex flex-col w-[100%] md:w-[50%]">
                  <label
                    className="mx-2"
                    htmlFor="workingDays"
                    style={{
                      fontWeight: 400,
                      fontSize: "20px",
                      fontFamily: "Lato, sans-serif",
                    }}
                  >
                    Working Days
                  </label>
                  <div style={{ border: "1px solid #08DA75", height: "40px", display: "flex", flexDirection: "row", justifyContent: "space-between", marginLeft: "1.5%", marginRight: "1.5%", backgroundColor: "white" }}>
                    <span style={{ display: "flex", margin: "5px 2px 5px 10px", padding: "2px 5px 5px 5px" }}>
                      {
                        doctorDetails?.workingDays.map((workingDay) => (
                          <div className="breadcrumb-chip" key={workingDay} style={{ marginRight: "8px", height: "26px", padding: "0px 5px 0px 5px", backgroundColor: "#E4FFF2", borderRadius: "5%", }} onClick={() => handleDelete(workingDay)}>
                            {workingDay.slice(0, 3) + " X "}
                          </div>
                        ))
                      }

                    </span>
                    <select
                      className="mx-5"
                      type="text"
                      id="workingDays"
                      name="workingDays"
                      onChange={handleChange}
                      style={{ backgroundColor: "#E4FFF2", height: "30px", alignItems: "center", marginTop: "1%", marginBottom: "1%" }}
                    >
                      {Daysdropdown.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>

                  </div>
                </span>

                <span className="flex flex-col w-[100%] md:w-[50%]" style={{ marginLeft: "6%" }}>
                  <label
                    className="mx-2"
                    htmlFor="workingHours"
                    style={{
                      fontWeight: 400,
                      fontSize: "20px",
                      fontFamily: "Lato, sans-serif",
                      marginLeft: isTab2 ? -10 : null
                    }}
                  >
                    Working Hours
                  </label>
                  <span style={{ display: "flex", flexDirection: "row", alignItems: 'center', gap: "4%" }}>
                    <select
                      className="mx-2"
                      name="workHourFrom"
                      onChange={handleChange}
                      style={{ border: "1px solid #08DA75", height: "40px", paddingLeft: isTab2 ? "5.5%" : "10.5%", paddingRight: "10.5%", marginLeft: isTab2 ? -18 : null }}
                    >
                      {TimeDropdown.map(time => (
                        <option key={time.value} value={time.value}>{time.label}</option>
                      ))}
                    </select>
                    <div style={{
                      fontWeight: 400,
                      fontSize: "20px",
                      fontFamily: "Lato, sans-serif",
                    }}>To</div>
                    <select
                      className="mx-2"
                      name="workHourTo"
                      onChange={handleChange}
                      style={{ border: "1px solid #08DA75", height: "40px", paddingLeft: isTab2 ? "5.5%" : "10.5%", paddingRight: "10.5%", marginLeft: isTab2 ? -5 : null, width: isTab2 ? '35%' : null }}
                    >
                      {TimeDropdown.map(time => (
                        <option key={time.value} value={time.value}>{time.label}</option>
                      ))}
                    </select>
                  </span>
                </span>

              </div>

              {/* 2nd Row */}

              {/* 2nd Row */}

              <div className="flex flex-col md:flex-row justify-between">
                <span className="flex flex-col w-[100%] md:w-[50%]">
                  <label
                    className="mx-2"
                    htmlFor="totalExperience"
                    style={{
                      fontWeight: 400,
                      fontSize: "20px",
                      fontFamily: "Lato, sans-serif",
                    }}
                  >
                    Total Experience
                  </label>
                  <input
                    className="mx-2"
                    type="number"
                    id="totalExperience"
                    name="totalExperience"
                    onChange={handleChange}
                    style={{ border: "1px solid #08DA75", height: "40px", paddingLeft: "1.5%", marginRight: 2 }}
                  />
                </span>
                <span className="flex flex-col w-[100%] md:w-[50%]" style={{ marginLeft: "7%" }}>
                  <label
                    className="mx-2"
                    htmlFor="speciality"
                    style={{
                      fontWeight: 400,
                      fontSize: "20px",
                      fontFamily: "Lato, sans-serif",
                      marginLeft: isTab2 ? -13 : null
                    }}
                  >
                    Specialty
                  </label>
                  <select
                    id="speciality"
                    name="speciality"
                    onChange={handleChange}
                    style={{ border: "1px solid #08DA75", height: "40px", paddingLeft: "1.5%", marginRight: 5, marginLeft: isTab2 ? -16 : null, width: isTab2 ? '97%' : null }}
                  >
                    {SpecialtiesDropdown.map(({ label, value }) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </span>

              </div>

              {/* 2nd Row */}

              {/* 4th Row */}

              <label
                className="mx-2"
                htmlFor="degree"
                style={{
                  fontWeight: 400,
                  fontSize: "20px",
                  fontFamily: "Lato, sans-serif",
                }}
              >
                Degree
              </label>
              <input
                className="mx-2"
                type="text"
                id="degree"
                name="degree"
                onChange={handleChange}
                style={{ border: "1px solid #08DA75", height: "40px", paddingLeft: "1.5%" }}
              />
              {/* 4th Row */}
              {/* 5th Row */}

              <label
                className="mx-2"
                htmlFor="address"
                style={{
                  fontWeight: 400,
                  fontSize: "20px",
                  fontFamily: "Lato, sans-serif",
                }}
              >
                Address
              </label>
              <div className="mx-2 p-5" style={{ border: "1px solid #08DA75", height: "20%" }}>
                {/* Row1 */}

                <div className="display">

                  <div style={{ display: "flex", flexDirection: "row" }}>


                    <span style={{ width: '35%', marginRight: 30 }}>
                      <label
                        className="mx-2 mb-2"
                        htmlFor="houseNo"
                        style={{
                          fontWeight: 400,
                          fontSize: isTab ? "15px" : "20px",
                          fontFamily: "Lato, sans-serif",
                        }}
                      >
                        House No.
                      </label>
                      <input
                        className="mx-2 mb-2"
                        type="number"
                        id="houseNo"
                        name="houseNo"
                        onChange={handleChange}
                        style={{ border: "1px solid #08DA75", height: "40px", paddingLeft: "1.5%", width: isTab2 ? '30%' : '60%' }}
                      />
                    </span>

                    <span style={{ width: '40%', marginRight: 10 }}>
                      <label
                        className="mx-2 mb-2"
                        htmlFor="floor"
                        style={{
                          fontWeight: 400,
                          fontSize: isTab ? "15px" : "20px",
                          fontFamily: "Lato, sans-serif",
                          marginRight: isTab2 ? 58 : null
                        }}
                      >
                        Floor
                      </label>
                      <input
                        className="mx-2 mb-2"
                        type="text"
                        id="floor"
                        name="floor"
                        onChange={handleChange}
                        style={{
                          border: "1px solid #08DA75", height: "40px", paddingLeft: "1.5%", width: isTab2 ? '30%' : '70%'
                        }}
                      />
                    </span>


                    <span style={{ width: '35%' }}>
                      <label
                        className="mx-2"
                        htmlFor="block"
                        style={{
                          fontWeight: 400,
                          fontSize: isTab ? "15px" : "20px",
                          fontFamily: "Lato, sans-serif",

                        }}
                      >
                        Block
                      </label>
                      <input
                        className="mx-2 mb-2"
                        type="text"
                        id="block"
                        name="block"
                        onChange={handleChange}
                        style={{ border: "1px solid #08DA75", height: "40px", paddingLeft: "1.5%", width: isTab2 ? '30%' : '70%' }}
                      />

                    </span>


                  </div>


                  <div style={{ display: "flex", flexDirection: "row" }}>

                    <span style={{ width: "100%" }}>
                      <label
                        className="mx-2"
                        htmlFor="area"
                        style={{
                          fontWeight: 400,
                          fontSize: isTab ? "15px" : "20px",
                          fontFamily: "Lato, sans-serif",
                          marginRight: isTab ? 10 : 60
                        }}
                      >
                        Area
                      </label>
                      <input
                        className="mx-2 mb-2"
                        type="text"
                        id="area"
                        name="area"
                        onChange={handleChange}
                        style={{ border: "1px solid #08DA75", height: "40px", paddingLeft: "1%", width: '35%' }}
                      />


                      <label
                        className="mx-2 mb-2"
                        htmlFor="pinCode"
                        style={{
                          fontWeight: 400,
                          fontSize: isTab ? "15px" : "20px",
                          fontFamily: "Lato, sans-serif",
                          marginRight: isTab ? 5 : 25,
                          marginLeft: isTab ? 10 : 50,
                        }}
                      >
                        Pin Code
                      </label>
                      <input
                        className="mx-2 mb-2"
                        type="number"
                        id="pinCode"
                        name="pinCode"
                        onChange={handleChange}
                        style={{ border: "1px solid #08DA75", height: "40px", paddingLeft: "1.5%", width: isTab ? '22%' : '35%' }}
                      />

                    </span>

                  </div>


                </div>

                <div>
                  <span style={{ width: '100%', display: "flex", flexDirection: "row" }}>
                    <label
                      className="mx-2 mb-2"
                      htmlFor="district"
                      style={{
                        fontWeight: 400,
                        fontSize: isTab ? "15px" : "20px",
                        fontFamily: "Lato, sans-serif",
                        marginRight: isTab ? 10 : 42
                      }}
                    >
                      District
                    </label>
                    <input
                      className="mx-2 mb-2"
                      type="text"
                      id="district"
                      name="district"
                      onChange={handleChange}
                      style={{ border: "1px solid #08DA75", height: "40px", paddingLeft: "1.5%", width: isTab2 ? "31%" : "35%" }}
                    />
                    <label
                      className="mx-2 mb-2"
                      htmlFor="state"
                      style={{
                        fontWeight: 400,
                        fontSize: isTab ? "15px" : "20px",
                        fontFamily: "Lato, sans-serif",
                        marginRight: isTab ? 10 : 60,
                        marginLeft: isTab2 ? 7 : 50,
                      }}
                    >
                      State
                    </label>
                    <input
                      className="mx-2 mb-2"
                      type="text"
                      id="state"
                      name="state"
                      onChange={handleChange}
                      style={{ border: "1px solid #08DA75", height: "40px", paddingLeft: "1.5%", width: '35%' }}
                    />
                  </span>
                </div>
              </div>

              {/* 5th Row */}

              <div className="flex justify-center my-5">
                <button
                  type="submit"
                  style={{
                    width: "159px",
                    height: "45px",
                    backgroundColor: "#08DA75",
                    borderRadius: "43px",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "24px",
                    lineHeight: "28.8px",
                    fontFamily: "Lato, sans-serif",
                  }}
                  onClick={handleRegister}
                >
                  Process
                </button>
              </div>
            </form>
          </div>
        </div >
      </div >
    </>
  );
}
