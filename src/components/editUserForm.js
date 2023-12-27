import React, { useEffect, useRef, useState, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { HiOutlineUserAdd } from "react-icons/hi";
import { FaRegTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdEdit } from "react-icons/md";
import UserContext from "./userContext";
import { Select } from "antd";

export default function EditUserForm()
{
  const { updateUser, updateUserEmail, updateUserimage } =
    useContext(UserContext);

  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [selectedFile, setSelectedFile] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);
  const [open1, setOpen1] = useState(false);

  const [userImage, setUserImage] = useState();
  const [errors, setErrors] = useState({});
  const [doctorDetails, setDoctorDetails] = useState(null);
  const onOpenModal = () => setOpen1(true);
  const appointmentDate = localStorage.getItem("appointment_date")
  const appointmentTime = localStorage.getItem("appointment_time")
  const [userDetails, setUserDetails] = useState({ name: "" });
  const [floorError, setFloorError] = useState("");

  const [patientDetails, setPatientDetails] = useState({
    name: "",
    age: "",
    bodyWeight: "",
    address: {
      houseNo: "",
      floor: "",
      block: "",
      area: "",
      pinCode: "",
      district: "",
      state: "",
    },
    patientPic: "",
  });


  console.log("DATE TIME", appointmentDate, appointmentTime)
  const handleNewProfilePictureClick = async () =>
  {
    // This will trigger the hidden file input to open the file dialog
    await fileInputRef.current.click();
  };

  const handleFileSelect = async (event) =>
  {
    const file = event.target.files[0];
    if (file)
    {
      const token = localStorage.getItem("token");
      const doctorId = localStorage.getItem("doctorId");
      const formData = new FormData();
      formData.append("doctorPic", file);

      console.log("FORM DATA", formData);
      try
      {
        const response = await fetch(`${baseUrl}/api/v1/upload_image`, {
          method: "POST",
          headers: {
            "x-auth-token": token,
          },
          body: formData,
        });

        if (!response.ok)
        {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Image uploaded successfully:", data);
        setUserImage(data.profilePicImageUrl);
        toast.success("Image uploaded successfully");

        // Reset the file input
        setSelectedFile(null);
        fileInputRef.current.value = "";
      } catch (error)
      {
        console.error("Error uploading image:", error);
        toast.error("Error uploading image. Please try again.");
      }
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() =>
  {
    const fetchUserDetails = async () =>
    {
      try
      {
        const token = localStorage.getItem("token");
        const patientId = localStorage.getItem("patientId");
        if (!token)
        {
          console.error("No token found in local storage");
          return;
        }
        const response = await fetch(`${baseUrl}/api/v1/user/get_userDetails`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token, // Replace with your actual token from the previous session
          },
        });

        const data = await response.json();
        console.log("DATA from response", data);
        setUserDetails(data?.data);
        console.log("usser name$$$$$$$", data?.data.name);
      } catch (error)
      {
        console.error("There was an error verifying the OTP:", error);
      }
    };
    fetchUserDetails();
  }, []);

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
    setIsEditing(!isEditing);
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
      const hour = i.toString().padStart(2, "0");
      return { label: `${hour}:00`, value: `${hour}:00` };
    }),
  ];

  const handleChange2 = (e) =>
  {
    setDoctorDetails((prevDoctorDetails) => ({
      ...prevDoctorDetails,
      // workingDays: e,
      speciality: e,
    }));
  };

  const handleChange1 = (e) =>
  {
    setDoctorDetails((prevDoctorDetails) => ({
      ...prevDoctorDetails,
      workingDays: e,
      // speciality: e,
    }));
  };

  const handleChange = (e) =>
  {
    const { name, value } = e.target;

    // const error = validateField(name, value);
    // setErrors({ ...errors, [name]: error });

    if (name === "workingDays")
    {
      setUserDetails((prevUserDetails) => ({
        ...prevUserDetails,
        workingDays: [...prevUserDetails.workingDays, value],
      }));
    } else if (name === "workHourFrom" || name === "workHourTo")
    {
      setUserDetails((prevUserDetails) => ({
        ...prevUserDetails,
        workingHours: {
          ...prevUserDetails.workingHours,
          [name]: value,
        },
      }));
    } else if (
      [
        "houseNo",
        "floor",
        "block",
        "area",
        "pinCode",
        "district",
        "state",
      ].includes(name)
    )
    {
      setUserDetails((prevUserDetails) => ({
        ...prevUserDetails,
        address: {
          ...prevUserDetails.address,
          [name]: value,
        },
      }));
    } else
    {
      setUserDetails((prevUserDetails) => ({
        ...prevUserDetails,
        [name]: value,
      }));
    }

    setIsEditing(true);
  };

  const handleUpdate = async (e) =>
  {
    e.preventDefault();
    const newUserDetails = {
      name: userDetails?.name,
      contactNumber: userDetails.contactNumber,
      email: userDetails.email,
      address: {
        houseNo: userDetails?.address?.houseNo,
        floor: userDetails?.address?.floor,
        block: userDetails?.address?.block,
        area: userDetails?.address?.area,
        pinCode: userDetails?.address?.pinCode,
        district: userDetails?.address?.district,
        state: userDetails?.address?.state,
      },
      userPic: userImage,
    };
    if (newUserDetails.name === "")
    {
      toast.error("Please write name");
    } else if (newUserDetails.email === "")
    {
      toast.error("Please write email");
    } else if (newUserDetails.contactNumber === "")
    {
      toast.error("Please write contact number");
    } else if (newUserDetails.address?.pinCode === "")
    {
      toast.error("Please write Pincode");
    } else if (newUserDetails.address?.district === "")
    {
      toast.error("Please write district");
    } else if (newUserDetails.address?.state === "")
    {
      toast.error("Please write state");
    } else
    {
      const token = localStorage.getItem("token");
      const doctorId = localStorage.getItem("doctorId");
      if (!token)
      {
        console.error("No token found in local storage");
        localStorage.clear();
        navigate("/userlogin");
      }
      const response = await fetch(`${baseUrl}/api/v1/user/update_user`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(newUserDetails),
      });
      const data = await response.json();

      if (data.statusCode === 400)
      {
        toast.error("Please fill the details");
      }

      if (data.success === true)
      {
        console.log("Doctor updated successfully.");
        navigate("/doctorlistuser");
      }
      console.log("DATA from response", data);
    }
  };

  const AgeType = [
    { label: "Year", value: "Year" },
    { label: "Month", value: "Month" },
    { label: "Day", value: "Day" },
  ];

  const Gender = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ];

  const handleRegister = async (e) =>
  {
    e.preventDefault();

    const newPatientDetails = {
      name: patientDetails?.name,
      age: patientDetails?.age,
      bodyWeight: patientDetails?.bodyWeight,
      address: {
        houseNo: patientDetails?.address?.houseNo,
        floor: patientDetails?.address?.floor,
        block: patientDetails?.address?.block,
        area: patientDetails?.address?.area,
        pinCode: patientDetails?.address?.pinCode,
        district: patientDetails?.address?.district,
        state: patientDetails?.address?.state,
      },
      patientPic: userImage,
    };
    if (newPatientDetails.name === "")
    {
      toast.error("Please write name");
    } else if (newPatientDetails.age === "")
    {
      toast.error("Please write age");
    } else if (newPatientDetails.bodyWeight === "")
    {
      toast.error("Please write body weight");
    } else if (newPatientDetails.address?.pinCode === "")
    {
      toast.error("Please write Pincode");
    } else if (newPatientDetails.address?.district === "")
    {
      toast.error("Please write district");
    } else if (newPatientDetails.address?.state === "")
    {
      toast.error("Please write state");
    } else
    {
      const doctorId = localStorage.getItem("doctorId");
      const token = localStorage.getItem("token");
      if (!token)
      {
        console.error("No token found in local storage");
        localStorage.clear();
        navigate(`/userlogin`);
      }
      const response = await fetch(`${baseUrl}/api/v1/user/register_patient`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(newPatientDetails),
      });
      const data = await response.json();
      if (data.success === true)
      {
        // navigate("/otp")
        onOpenModal();
        localStorage.setItem("patientId", data.data._id);
      }
      console.log("DATA from response", data);
    }
  };

  console.log("User DETAILS", userDetails);
  updateUser(userDetails.name);
  updateUserEmail(userDetails.email);
  updateUserimage(userDetails?.userPic);

  return (
    <>
      <div className="flex justify-center">
        <div className="border bg-white flex flex-col w-full sm:w p-6 my-5 me-3">
          {" "}
          <p className="text-3xl ">Appointment Details</p>
          <hr className="border my-2 " />
          {/* -------name------- */}
          <div className="flex flex-row">
            <div className="w-1/2 pr-2">
              <div className="mt-3">
                <label
                  htmlFor="name"
                  className="block text-black text-lg font-semibold"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  value={userDetails?.name}
                  className="block w-full placeholder-gray-400 rounded-lg border bg-white px-5 py-2.5 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}
              </div>
            </div>

            {/* ------------email------------ */}
            <div className="w-1/2 pl-2">
              <div className="flex flex-row justify-between">
                <div className="w-full sm:w-1/3 px-2 ">
                  <div className="mt-3">
                    <label
                      htmlFor="age"
                      className="block text-black text-lg font-semibold "
                    >
                      Age
                    </label>
                    <input
                      type="text"
                      id="age"
                      name="age"
                      value={userDetails?.age}
                      onChange={handleChange}
                      className="block w-full placeholder-gray-400 rounded-lg border bg-white px-5 py-2.5 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                    {floorError && (
                      <p className="text-red-500 text-sm mt-1">{floorError}</p>
                    )}
                  </div>
                </div>
                <div className="w-full sm:w-1/3 px-2">
                  <div className="flex flex-col ">
                    <div className="mt-3">
                      <label
                        className="block text-lg font-semibold text-black font-lato"
                        htmlFor="ageType"
                      >
                        Age Type
                      </label>
                      <Select
                        // mode="multiple"
                        className="border border-[#89CFF0] rounded-lg h-11"
                        popupClassName="no-border-dropdown-menu"
                        id="ageType"
                        name="ageType"
                        value={patientDetails?.ageType}
                        onChange={handleChange2}
                        placeholder="Select Age Type"
                        style={{ overflowY: "auto" }}
                        dropdownStyle={{
                          maxHeight: "300px",
                          overflowY: "auto",
                        }}
                      >
                        {AgeType.map((option) => (
                          <Select.Option
                            key={option.value}
                            value={option.value}
                          >
                            {option.label}
                          </Select.Option>
                        ))}
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="w-full sm:w-1/3 px-2">
                  <div className="flex flex-col ">
                    <div className="mt-3">
                      <label
                        className="block text-lg font-semibold text-black font-lato"
                        htmlFor="gender"
                      >
                        Gender
                      </label>
                      <Select
                        // mode="multiple"
                        className="border border-[#89CFF0] rounded-lg h-11"
                        popupClassName="no-border-dropdown-menu"
                        id="gender"
                        name="gender"
                        value={userDetails?.gender}
                        onChange={handleChange1}
                        placeholder="Select Gender Type"
                        style={{ overflowY: "auto" }}
                        dropdownStyle={{
                          maxHeight: "300px",
                          overflowY: "auto",
                        }}
                      >
                        {Gender.map((option) => (
                          <Select.Option
                            key={option.value}
                            value={option.value}
                          >
                            {option.label}
                          </Select.Option>
                        ))}
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ------------email------------ */}
          <div className="flex flex-row justify-between">
            <div className="w-full sm:w-1/3 pr-2">
              <div className="mt-5">
                <label
                  htmlFor="email1"
                  className="block text-black text-lg font-semibold"
                >
                  Body Weight
                </label>
                <input
                  type="number"
                  id="body"
                  name="body"
                  onChange={handleChange}
                  value={userDetails?.bodyWeight}
                  className="block w-full placeholder-gray-400 rounded-lg border bg-white px-5 py-2.5 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>
            </div>
            <div className="w-full sm:w-1/3 pr-2">
              <div className="mt-5">
                <label
                  htmlFor="email2"
                  className="block text-black text-lg font-semibold"
                >
                  Appointment Date
                </label>
                <input
                  type="text"
                  id="appointmentDate"
                  name="appointmentDate"
                  onChange={handleChange}
                  value={appointmentDate}
                  className="block w-full placeholder-gray-400 rounded-lg border bg-white px-5 py-2.5 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>
            </div>
            <div className="w-full sm:w-1/3">
              <div className="mt-5">
                <label
                  htmlFor="email3"
                  className="block text-black text-lg font-semibold"
                >
                  Appointment Time
                </label>
                <input
                  type="text"
                  id="appointmentTime"
                  name="appointmentTime"
                  onChange={handleChange}
                  value={appointmentTime}
                  className="block w-full placeholder-gray-400 rounded-lg border bg-white px-5 py-2.5 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>
            </div>
          </div>
          {/* -----------contact----------- */}
          <div className="flex flex-row">
            <div className="w-full sm:w-1/2 pr-2">
              <div className="mt-3">
                <label
                  htmlFor="contact"
                  className="block text-black text-lg font-semibold"
                >
                  Issues
                </label>
                <input
                  type="text"
                  id="issue"
                  name="issues"
                  onChange={handleChange}
                  className="block w-full placeholder-gray-400 rounded-lg border bg-white px-5 py-2.5 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                />
                {errors.contactNumber && (
                  <p className="text-red-500">{errors.contactNumber}</p>
                )}
              </div>
            </div>
            <div className="w-full sm:w-1/2 pl-2">
              <div className="mt-3">
                <label
                  htmlFor="contact"
                  className="block text-black text-lg font-semibold"
                >
                  Disease
                </label>
                <input
                  type="text"
                  id="disease"
                  name="disease"
                  onChange={handleChange}
                  className="block w-full placeholder-gray-400 rounded-lg border bg-white px-5 py-2.5 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                />
                {errors.contactNumber && (
                  <p className="text-red-500">{errors.contactNumber}</p>
                )}
              </div>

              {/* Add the second input field here */}
            </div>
          </div>
          {/* -----------address----------- */}
          <div className="mt-3">
            <label
              for="houseNo"
              className="block text-black text-lg font-semibold"
            >
              Address
            </label>
            <div className="p-3 pb-5 border shadow-lg rounded-md">
              <div className="flex flex-col ">
                <div className="flex flex-row">
                  <div className="px-2 w-full sm:w-1/3 mt-3">
                    <input
                      type="text"
                      placeholder="House No."
                      id="houseNo"
                      name="houseNo"
                      onChange={handleChange}
                      value={userDetails?.address?.houseNo}
                      className="block w-full rounded-lg border  bg-gray-300 placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                  </div>
                  <div className="px-2 w-full sm:w-1/3 mt-3">
                    <input
                      type="text"
                      id="floor"
                      name="floor"
                      onChange={handleChange}
                      value={userDetails?.address?.floor}
                      placeholder="Floor"
                      className="block w-full rounded-lg border  bg-gray-300 placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                  </div>
                  <div className="px-2 w-full sm:w-1/3 mt-3">
                    <input
                      type="text"
                      id="block"
                      name="block"
                      onChange={handleChange}
                      value={userDetails?.address?.block}
                      placeholder="Block"
                      className="block w-full rounded-lg border  bg-gray-300 placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                    {errors.block && (
                      <p className="text-red-500">{errors.block}</p>
                    )}
                  </div>
                  <div className="px-2 w-full sm:w-1/2 mt-3">
                    <input
                      type="text"
                      id="pinCode"
                      name="pinCode"
                      onChange={handleChange}
                      value={userDetails?.address?.pinCode}
                      placeholder="Pin Code"
                      className="block w-full rounded-lg border  bg-gray-300 placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                    {errors.pinCode && (
                      <p className="text-red-500">{errors.pinCode}</p>
                    )}
                  </div>
                </div>

                <div className="px-2 w-full mt-3 ">
                  <input
                    type="text"
                    id="area"
                    name="area"
                    onChange={handleChange}
                    value={userDetails?.address?.area}
                    placeholder="Area/Landmark"
                    className="block w-full rounded-lg border  bg-gray-300 placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                  />
                  {errors.area && <p className="text-red-500">{errors.area}</p>}
                </div>

                <div className="flex flex-row">
                  <div className="px-2 w-full sm:w-1/2 mt-3">
                    <input
                      type="text"
                      id="district"
                      name="district"
                      onChange={handleChange}
                      value={userDetails?.address?.district}
                      placeholder="District"
                      className="block w-full rounded-lg border  bg-gray-300 placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                    {errors.district && (
                      <p className="text-red-500">{errors.district}</p>
                    )}
                  </div>

                  <div className="px-2 w-full sm:w-1/2 mt-3">
                    <input
                      type="text"
                      id="state"
                      name="state"
                      onChange={handleChange}
                      value={userDetails?.address?.state}
                      placeholder="State"
                      className="block w-full rounded-lg border  bg-gray-300 placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                    {errors.state && (
                      <p className="text-red-500">{errors.state}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row-reverse mt-5 my-2">
            <button
              className="btn btn-primary border py-3 px-4 rounded-3xl text-white"
              style={{
                backgroundColor: "#89CFF0",
              }}
              onClick={handleRegister}
            >
              Continue...
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
