import React, { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { HiOutlineUserAdd } from "react-icons/hi";
import { FaRegTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdEdit } from "react-icons/md";

export default function SuperAdminEditForm()
{
  let isTab = useMediaQuery({ query: "(max-width: 768px)" });
  const navigate = useNavigate()
  const baseUrl = process.env.REACT_APP_BASE_URL
  const [selectedFile, setSelectedFile] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);
  const [adminImage, setAdminImage] = useState();


  // const validate = () =>
  // {
  //   let tempErrors = {};
  //   tempErrors.name = doctorDetails?.name ? "" : "Name is required.";
  //   tempErrors.email = /$^|.+@.+..+/.test(doctorDetails?.email) ? "" : "Email is not valid.";
  //   tempErrors.contactNumber = doctorDetails?.contactNumber.length > 0 ? "" : "Contact Number is required.";
  //   tempErrors.houseNo = doctorDetails?.address?.houseNo ? "" : "House Number is required.";
  //   tempErrors.floor = doctorDetails?.address?.floor ? "" : "Floor is required.";
  //   tempErrors.block = doctorDetails?.address?.block ? "" : "Block is required.";
  //   tempErrors.area = doctorDetails?.address?.area ? "" : "Area is required.";
  //   tempErrors.pinCode = doctorDetails?.address?.pinCode ? "" : "Pincode is required.";
  //   tempErrors.district = doctorDetails?.address?.district ? "" : "District is required.";
  //   tempErrors.state = doctorDetails?.address?.state ? "" : "State is required.";

  //   setErrors({ ...tempErrors });
  //   return Object.values(tempErrors).every(x => x === "");
  // }


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

  };

  const handleNewProfilePicture = async () =>
  {
    const token = localStorage.getItem('token');
    const doctorId = localStorage.getItem('doctorId');

    // if (!token || !doctorId)
    // {
    //     console.error('Token or doctor ID not found in local storage');
    //     return;
    // }

    const formData = new FormData();
    formData.append('adminPic', selectedFile);

    console.log("FORM DATA", formData)
    try
    {
      const response = await fetch(`${baseUrl}/api/v1/upload_image`, {
        method: 'POST',
        // headers: {
        //     'x-auth-token': token,
        // },
        body: formData,
      });

      if (!response.ok)
      {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Image uploaded successfully:', data);
      setAdminImage(data.profilePicImageUrl)
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
  const [doctorDetails, setDoctorDetails] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});


  useEffect(() =>
  {
    const fetchDoctorDetails = async () =>
    {
      try
      {
        const token = localStorage.getItem("token");
        const doctorId = localStorage.getItem("doctorId");
        if (!token)
        {
          console.error("No token found in local storage");
          return;
        }
        const response = await fetch(`${baseUrl}/api/v1/admin/get_profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token // Replace with your actual token from the previous session
          }
        });

        const data = await response.json();
        console.log("DATA from response", data?.data)
        setDoctorDetails(data?.data)

      } catch (error)
      {
        console.error('There was an error verifying the OTP:', error);
      }
    }
    fetchDoctorDetails()
  }, [])

  const handleClick = (event) =>
  {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () =>
  {
    setAnchorEl(null);
  };


  const handleToggleEdit = () =>
  {
    setIsEditing(!isEditing)
  }

  // Function to handle profile picture removal
  const handleRemoveProfilePicture = () =>
  {
    // Logic to handle removing the current profile picture
    handleClose();
  };

  const validateField = (name, value) =>
  {
    switch (name)
    {
      case "name":
        return value ? "" : "Name is required.";
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Email is not valid.";
      case "contactNumber":
        return value.length > 0 && value.length === 10 ? "" : "Contact number is required or Add valid 10 Digit Number.";
      case "houseNo":
        return value ? "" : "House number is required.";
      case "floor":
        return value ? "" : "Floor is required.";
      case "block":
        return value ? "" : "Block is required.";
      case "area":
        return value ? "" : "Area is required.";
      case "pinCode":
        return /^\d{5}(-\d{4})?$/.test(value) ? "" : "Pincode is not valid.";
      case "district":
        return value ? "" : "District is required.";
      case "state":
        return value ? "" : "State is required.";
      case "workHourFrom":
        // Assuming time in HH:MM format, adjust as needed
        return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value) ? "" : "Invalid start time.";
      case "workHourTo":
        return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value) ? "" : "Invalid end time.";
      // Add more cases as needed for other fields
      default:
        return "";
    }
  };



  const handleChange = (e) =>
  {
    const { name, value } = e.target;

    // Validate the field and update errors
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });

    // Update doctorDetails logic remains the same
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

    setIsEditing(true);
  };



  const handleUpdate = async (e) =>
  {
    e.preventDefault();

    if (!validateField())
    {
      toast.error('Please correct the errors before submitting.');
      return;
    }

    // Check if the token exists
    const newDoctorDetails = {
      name: doctorDetails?.name,
      // email: doctorDetails.email,
      // contactNumber: doctorDetails.contactNumber,
      totalExperience: doctorDetails?.totalExperience,
      speciality: doctorDetails?.speciality,
      degree: doctorDetails?.degree,
      address: {
        houseNo: doctorDetails?.address?.houseNo,
        floor: doctorDetails?.address?.floor,
        block: doctorDetails?.address?.block,
        area: doctorDetails?.address?.area,
        pinCode: doctorDetails?.address?.pinCode,
        district: doctorDetails?.address?.district,
        state: doctorDetails?.address?.state
      },
      adminPic: adminImage
    }

    const token = localStorage.getItem("token");
    const doctorId = localStorage.getItem('doctorId');
    const isEmpty = Object.values(newDoctorDetails).some(value => value === '');

    if (isEmpty || isEditing === false)
    {
      toast.error('Please fill the fields or Update');
      setIsEditing(false);
      return;
    }

    if (!isEmpty || isEditing === true)
    {

      toast.success('Form submitted successfully!');

    }

    if (!token)
    {
      console.error("No token found in local storage");
      return;
    }
    const response = await fetch(
      `${baseUrl}/api/v1/admin/update_profile`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(newDoctorDetails)
      }
    );
    const data = await response.json();

    if (data.statusCode === 400)
    {
      toast.error("Please fill the details");
    }

    if (data.success === true)
    {
      console.log("Doctor updated successfully.")
      // navigate("/otp")
      // localStorage.setItem("id", data.data._id)
    }
    console.log("DATA from response", data)
  }

  console.log("DOCTOR DETAILS", doctorDetails)

  return (
    <>
      <div className="flex flex-row">
        {/* <div className="md:fixed md:h-screen md:overflow-y-auto md:w-[337px]">

                </div> */}
        <div className=" w-full">

          <div className="mt-6 p-2">
            <div className="flex  flex-col items-center justify-center w-full">
              <div className="cursor-pointer">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#FFFFFF",
                      width: "90px",
                      height: "90px",
                      borderRadius: "50%",
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      color: "#A4A4A4",
                    }}
                  >
                    {adminImage || doctorDetails?.adminPic ? (
                      <img
                        src={adminImage || doctorDetails?.adminPic}
                        alt="Avatar"
                        style={{
                          borderRadius: "50%",
                        }}
                      />
                    ) : (

                      <PermIdentityOutlinedIcon
                        style={{ width: "70px", height: "70px" }}
                      />

                    )}
                  </div>
                  <p
                    aria-controls="profile-pic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    style={{ cursor: "pointer", marginLeft: 37, marginTop: -20 }}
                  >
                    <MdEdit />
                  </p>
                  <div style={{ backgroundColor: "#89CFF0" }}>
                    <Menu
                      id="profile-pic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "edit-profile-pic-text",
                        style: { backgroundColor: "#89CFF0" }, // Set background color for the whole menu
                      }}
                    >
                      <MenuItem
                        style={{
                          backgroundColor: "#89CFF0",
                          color: isHovered ? "red" : "white",
                        }}
                        onClick={handleNewProfilePictureClick}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                      >
                        {" "}
                        <span style={{ marginRight: "8px" }}>
                          <HiOutlineUserAdd />
                        </span>
                        <span>New profile picture</span>
                      </MenuItem>

                      <MenuItem
                        style={{
                          backgroundColor: "#89CFF0",
                          color: isHovered1 ? "red" : "white",
                        }}
                        // onClick={handleRemoveProfilePicture}
                        onMouseEnter={() => setIsHovered1(true)}
                        onMouseLeave={() => setIsHovered1(false)}
                      >
                        <span style={{ marginRight: "8px" }}>
                          <FaRegTrashAlt />
                        </span>
                        <span>Remove current picture</span>
                      </MenuItem>
                    </Menu>
                  </div>
                  <input
                    id="imageInput"
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handleFileSelect}
                  />
                </div>
                <button onClick={handleNewProfilePicture} style={{ marginLeft: 20, marginTop: 5 }}>Upload</button>
              </div>
            </div>
            <div class="grid grid-cols-1 w-full gap-4">
              <div>
                <label
                  for="name"
                  class="block text-black text-lg font-semibold"
                >
                  Name
                </label>
                <input
                  type="text"

                  id="name"
                  name="name"
                  onChange={handleChange}
                  value={doctorDetails?.name}
                  class="block mt-0 w-full placeholder-gray-400/70  rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}
              </div>
              <div>
                <label
                  for="email"
                  class="block text-black text-lg font-semibold"
                >
                  Email
                </label>
                <input
                  type="email"

                  id="email"
                  name="email"
                  onChange={handleChange}
                  value={doctorDetails?.email}
                  class="block mt-0 w-full placeholder-gray-400/70  rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>
              <div>
                <label
                  for="contact"
                  class="block text-black text-lg font-semibold"
                >
                  Contact Number
                </label>
                <input
                  type="number"

                  id="contactNumber"
                  name="contactNumber"
                  onChange={handleChange}
                  value={doctorDetails?.contactNumber}
                  class="block mt-0 w-full placeholder-gray-400/70  rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                />
                {errors.contactNumber && <p className="text-red-500">{errors.contactNumber}</p>}
              </div>




              <div class="p-3 pb-5 border border-[#89CFF0]">
                <div class="flex flex-col sm:flex-row sm:flex-wrap -mx-2">
                  <div class="px-2 w-full sm:w-1/3">
                    <label
                      for="houseNo"
                      class="block text-black text-lg font-semibold"
                    >
                      House No
                    </label>
                    <input
                      type="text"
                      id="houseNo"
                      name="houseNo"
                      onChange={handleChange}
                      placeholder="1234"
                      value={doctorDetails?.address?.houseNo}
                      class="block w-full rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                  </div>
                  <div class="px-2 w-full sm:w-1/3">
                    <label
                      for="floor"
                      class="block text-black text-lg font-semibold"
                    >
                      Floor
                    </label>
                    <input
                      type="text"
                      id="floor"
                      name="floor"
                      onChange={handleChange}
                      placeholder="2nd"
                      value={doctorDetails?.address?.floor}
                      class="block w-full rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                  </div>
                  <div class="px-2 w-full sm:w-1/3">
                    <label
                      for="block"
                      class="block text-black text-lg font-semibold"
                    >
                      Block
                    </label>
                    <input
                      type="text"
                      id="block"
                      name="block"
                      onChange={handleChange}
                      placeholder="A"
                      value={doctorDetails?.address?.block}
                      class="block w-full rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                  </div>
                  <div class="px-2 w-full sm:w-1/2">
                    <label
                      for="area"
                      class="block text-black text-lg font-semibold"
                    >
                      Area
                    </label>
                    <input
                      type="text"
                      id="area"
                      name="area"
                      onChange={handleChange}
                      value={doctorDetails?.address?.area}
                      placeholder="Green Park"
                      class="block w-full rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                    {errors.area && <p className="text-red-500">{errors.area}</p>}
                  </div>
                  <div class="px-2 w-full sm:w-1/2">
                    <label
                      for="pincode"
                      class="block text-black text-lg font-semibold"
                    >
                      Pincode
                    </label>
                    <input
                      type="text"
                      id="pinCode"
                      name="pinCode"
                      onChange={handleChange}
                      placeholder="110016"
                      value={doctorDetails?.address?.pinCode}
                      class="block w-full rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                    {errors.pinCode && <p className="text-red-500">{errors.pinCode}</p>}
                  </div>
                  <div class="px-2 w-full sm:w-1/2">
                    <label
                      for="district"
                      class="block text-black text-lg font-semibold"
                    >
                      District
                    </label>
                    <input
                      type="text"
                      id="district"
                      name="district"
                      onChange={handleChange}
                      placeholder="South Delhi"
                      value={doctorDetails?.address?.district}
                      class="block w-full rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                    {errors.district && <p className="text-red-500">{errors.district}</p>}
                  </div>
                  <div class="px-2 w-full sm:w-1/2">
                    <label
                      for="state"
                      class="block text-black text-lg font-semibold"
                    >
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      onChange={handleChange}
                      value={doctorDetails?.address?.state}
                      placeholder="Delhi"
                      class="block w-full rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                    {errors.state && <p className="text-red-500">{errors.state}</p>}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 w-100 items-center justify-center text-center">
              <button
                className="rounded-full justify-center px-9 py-2 bg-[#89CFF0] text-white"
                onClick={handleUpdate}
              >
                Process
              </button>
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}
