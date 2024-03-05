import React, { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import Modal from "react-responsive-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { HiOutlineUserAdd } from "react-icons/hi";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { Popconfirm } from "antd";
import delete_button from "../assets/delete_button.svg";

export default function SuperAdminAdminForm() {
  let isTab = useMediaQuery({ query: "(max-width: 768px)" });
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [selectedDoctor, setselectedDoctor] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [open1, setOpen1] = useState(false);
  const onOpenModal = () => setOpen1(true);
  const onCloseModal = () => setOpen1(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [action, setAction] = useState("");
  const [adminImage, setAdminImage] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);
  const [pinCodeError, setPinCodeError] = useState("");

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const token = localStorage.getItem("token");
      const doctorId = localStorage.getItem("doctorId");
      const formData = new FormData();
      formData.append("doctorPic", file);

      console.log("FORM DATA", formData);
      try {
        const response = await fetch(`${baseUrl}/api/v1/upload_image`, {
          method: "POST",
          headers: {
            "x-auth-token": token,
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Image uploaded successfully:", data);
        setAdminImage(data.profilePicImageUrl);
        toast.success("Image uploaded successfully.");

        // Reset the file input
        setSelectedFile(null);
        fileInputRef.current.value = "";
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Error uploading image. Please try again.");
      }
    }
  };

  const handleNewProfilePictureClick = async () => {
    // This will trigger the hidden file input to open the file dialog
    await fileInputRef.current.click();
  };

  const handleActionChange = (e) => {
    setAction(e.target.value);
  };

  const [adminDetails, setAdminDetails] = useState({
    name: "",
    email: "",
    contactNumber: "",
    permissions: {
      view: false,
      create: false,
      remove: false,
      edit: false,
    },
    address: {
      houseNo: "",
      area: "",
      pinCode: "",
      district: "",
      state: "",
    },
    adminPic: "",
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value ? "" : "Name is required.";
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Email is not valid.";
      case "contactNumber":
        return value.length > 0 && value.length === 10
          ? ""
          : "Contact number is required or Add valid 10 Digit Number.";
      case "degree":
        return value ? "" : "Degree is required  ";
      case "totalExperience":
        return value ? "" : "Total Experience is required  ";
      case "houseNo":
        return /^[a-zA-Z\s]+$/.test(value) && value
          ? ""
          : "houseNo is required  ";
      case "floor":
        return /^[a-zA-Z\s]+$/.test(value) && value ? "" : "floor is required";
      case "block":
        return /^[a-zA-Z\s]+$/.test(value) && value
          ? ""
          : "Block is required  ";
      case "area":
        return /^[a-zA-Z\s]+$/.test(value) && value
          ? ""
          : "Area is required and must be a string ";
      case "pinCode":
        return /^\d{6}$/.test(value) ? "" : "Pincode must be exactly 6 digits.";
      case "district":
        return /^[a-zA-Z\s]+$/.test(value) && value
          ? ""
          : "District is required and must be a string ";
      case "state":
        return /^[a-zA-Z\s]+$/.test(value) && value
          ? ""
          : "State is required and must be a string ";
      case "workHourFrom":
        // Assuming time in HH:MM format, adjust as needed
        return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)
          ? ""
          : "Invalid start time.";
      case "workHourTo":
        return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)
          ? ""
          : "Invalid end time.";
      // Add more cases as needed for other fields
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    console.log("E value", e);
    const { name, value, type, checked } = e.target;

    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });

    setAdminDetails((prevAdminDetails) => ({
      ...prevAdminDetails,
      adminPic: adminImage,
    }));

    if (type === "checkbox") {
      setAdminDetails({
        ...adminDetails,
        permissions: {
          ...adminDetails.permissions,
          [name]: checked,
        },
      });
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
    ) {
      setAdminDetails((prevAdminDetails) => ({
        ...prevAdminDetails,
        address: {
          ...prevAdminDetails.address,
          [name]: value,
        },
      }));
    } else {
      setAdminDetails((prevAdminDetails) => ({
        ...prevAdminDetails,
        [name]: value,
      }));
    }
    setIsEditing(true);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const isEmpty = Object.values(adminDetails).some((value) => value === "");

    if (isEmpty || isEditing === false) {
      toast.error("Please fill the fields or Update");
      setIsEditing(false);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in local storage");
      return;
    }

    const response = await fetch(`${baseUrl}/api/v1/superAdmin/create_admin`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify(adminDetails),
    });
    const data = await response.json();
    if (data.statusCode === 400) {
      toast.error("Please fill the details");
    }

    if (data.success === true) {
      // navigate("/otp")
      onOpenModal();
      localStorage.setItem("adminId", data.data._id);
      localStorage.setItem("contactNumber", data.data.contactNumber);
      navigate("/superadminotp");
    }
    console.log("DATA from response", data);
  };
  console.log("PATIENT DETAILS", adminDetails);

  return (
    <>
      <div className="flex flex-col -ml-7  lg:flex-row">
        {/* --------------left-------------- */}
        <div className="flex flex-col border bg-white lg:w-1/4 py-6 px-3  ml-5 my-5  ">
          <div
            className=" flex items-end justify-end w-100% "
            style={{ marginRight: -40, marginTop: -20 }}
          >
            <Popconfirm
              title="Delete the Profile"
              description="Are you sure to delete this Profile?"
              okText="Delete"
              okType="danger"
              cancelText="No"
              className="rounded-full px-4 sm:px-8 py-1 sm:py-2 text-white text-xs sm:text-sm"
              // onConfirm={handleDelete}
            >
              <button onClick={onCloseModal}>
                <img src={delete_button} alt="df" class="w-8 mb-1"></img>
              </button>
            </Popconfirm>
          </div>
          <div className="mx-auto my-2">
            <div className=" ">
              <div
                className=" border w-36 mx-auto rounded-full"
                style={{ backgroundColor: "#B1DAED" }}
              >
                {adminImage || adminDetails?.adminPic ? (
                  <div
                    aria-controls="profile-pic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <img
                      src={adminImage || adminDetails?.adminPic}
                      alt="Avatar"
                      style={{
                        borderRadius: "50%",
                        width: "145px",
                        height: "145px",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                ) : (
                  <PermIdentityOutlinedIcon
                    style={{
                      width: "auto",
                      height: "auto",
                      color: "white",
                      cursor: "pointer",
                    }}
                    aria-controls="profile-pic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  />
                )}
              </div>
            </div>

            <div className="flex flex-row mt-5 mb-3">
              <p className="block text-black text-lg font-semibold ">
                <input
                  id="files"
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleFileSelect}
                />
              </p>

              <p
                className="mt-2 ml-3"
                aria-controls="profile-pic-menu"
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                style={{
                  cursor: "pointer",
                }}
              >
                {/* <FaAngleDown /> */}
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
                    onClick={() => {
                      handleClose();
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    {" "}
                    <span style={{ marginRight: "8px" }}>
                      <HiOutlineUserAdd />
                    </span>
                    <label htmlFor="files">New profile picture</label>
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
            </div>
          </div>
          <hr />

          <div>
            <div className="flex flex-col mr-2 mt-2">
              <label
                style={{ marginRight: "10px" }}
                className="mx-2 text-lg font-semibold text-black font-lato"
                htmlFor="Permission"
              >
                Permissions
              </label>
            </div>
            <div
              className="flex flex-col flex-grow mx-2"
              style={{ justifyContent: "space-around" }}
            >
              <table>
                <tbody>
                  <tr>
                    <td>View</td>
                    <td>
                      <input
                        type="checkbox"
                        name="view"
                        onChange={handleChange}
                        checked={adminDetails?.permissions.view}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Create</td>
                    <td>
                      <input
                        type="checkbox"
                        name="create"
                        onChange={handleChange}
                        checked={adminDetails?.permissions.create}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Remove</td>
                    <td>
                      <input
                        type="checkbox"
                        name="remove"
                        onChange={handleChange}
                        checked={adminDetails?.permissions.remove}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Edit</td>
                    <td>
                      <input
                        type="checkbox"
                        name="edit"
                        onClick={handleChange}
                        checked={adminDetails?.permissions.edit}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ----------------------------------right---------------------------------- */}
        <div
          div
          className="border bg-white flex flex-col lg:w-3/4 p-6 my-5 mx-3"
        >
          <p className="text-3xl ">Personal Information</p>
          <hr className="border my-2 " />
          {/* -------name------- */}
          <div className="mt-3">
            <label
              for="name"
              className="block text-black text-lg font-semibold"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              value={adminDetails?.name}
              className="block  w-full placeholder-gray-400  rounded-lg border  bg-white px-5 py-2.5 text-gray-900  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>

          {/* -----------contact----------- */}
          <div className="mt-3">
            <label
              for="contact"
              className="block text-black text-lg font-semibold"
            >
              Contact Number
            </label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              onChange={handleChange}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              }}
              value={adminDetails?.contactNumber}
              className="block  w-full placeholder-gray-400  rounded-lg border  bg-white px-5 py-2.5 text-gray-900  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            />
            {errors.contactNumber && (
              <p className="text-red-500">{errors.contactNumber}</p>
            )}
          </div>

          {/* -----------email----------- */}
          <div className="mt-3">
            <label
              for="email"
              className="block text-black text-lg font-semibold"
            >
              email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={handleChange}
              value={adminDetails?.email}
              className="block  w-full placeholder-gray-400  rounded-lg border  bg-white px-5 py-2.5 text-gray-900  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
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
                  <div className="px-2 w-1/2 mt-3">
                    <input
                      type="text"
                      placeholder="House No./Floor/Block"
                      id="houseNo"
                      name="houseNo"
                      onChange={handleChange}
                      value={adminDetails?.address?.houseNo}
                      className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                  </div>

                  <div className="px-2 w-1/2 mt-3">
                    <input
                      type="text"
                      id="pinCode"
                      name="pinCode"
                      onChange={handleChange}
                      value={adminDetails?.address?.pinCode}
                      placeholder="Pin Code*"
                      className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, "");
                      }}
                    />
                    {pinCodeError && (
                      <p className="text-red-500">{pinCodeError}</p>
                    )}
                  </div>
                </div>

                {/* <div className="flex lg:flex-row flex-col">
                  <div class="flex flex-row ">
                    <div className="px-2 lg:w-1/2  mt-3">

                      <input
                        type="text"
                        placeholder="House No."
                        id="houseNo"
                        name="houseNo"
                        value={adminDetails?.address?.houseNo}
                        onChange={handleChange}
                        className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      />
                    </div>
                    <div className="px-2 lg:w-1/2 mt-3">
                      <input
                        type="text"
                        id="floor"
                        name="floor"
                        onChange={handleChange}
                        value={adminDetails?.address?.floor}
                        placeholder="Floor"
                        className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      />
                    </div>
                  </div>
                  <div class="flex flex-row">
                    <div className="px-2 lg:w-1/2 mt-3">
                      <input
                        type="text"
                        id="block"
                        name="block"
                        value={adminDetails?.address?.block}
                        onChange={handleChange}
                        placeholder="Block"
                        className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      />
                      {errors.block && (
                        <p className="text-red-500">{errors.block}</p>
                      )}
                    </div>
                    <div className="px-2 lg:w-1/2 mt-3">
                      <input
                        type="text"
                        id="pinCode"
                        name="pinCode"
                        value={adminDetails?.address?.pinCode}
                        onChange={handleChange}
                        onInput={(e) =>
                        {
                          e.target.value = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                        }}
                        placeholder="Pin Code"
                        className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      />
                      {pinCodeError && (
                        <p className="text-red-500">{pinCodeError}</p>
                      )}
                    </div>
                  </div>
                </div> */}
                {/* ----------------------------area/landmark---------------------------- */}
                <div className="px-2 w-full mt-3 ">
                  <input
                    type="text"
                    id="area"
                    name="area"
                    value={adminDetails?.address?.area}
                    onChange={handleChange}
                    placeholder="Area/Landmark"
                    className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                  />

                  {errors.area && <p className="text-red-500">{errors.area}</p>}
                </div>

                <div className="flex flex-row">
                  <div className="px-2 w-1/2 mt-3">
                    <input
                      type="text"
                      id="district"
                      name="district"
                      value={adminDetails?.address?.district}
                      onChange={handleChange}
                      placeholder="District"
                      className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />

                    {errors.district && (
                      <p className="text-red-500">{errors.district}</p>
                    )}
                  </div>

                  <div className="px-2 w-1/2 mt-3">
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={adminDetails?.address?.state}
                      onChange={handleChange}
                      placeholder="State"
                      className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                    {/* {errors.state && (
                      <p className="text-red-500">{errors.state}</p>
                    )} */}
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
              Process
            </button>
          </div>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}
