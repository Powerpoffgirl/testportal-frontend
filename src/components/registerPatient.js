import React, { useRef, useState, useEffect, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import Modal from "react-responsive-modal";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { ToastContainer, toast } from "react-toastify";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "react-toastify/dist/ReactToastify.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { HiOutlineUserAdd } from "react-icons/hi";
import { Flex, Select } from "antd";
import { DatePicker, Space } from "antd";
import { IoIosSearch } from "react-icons/io";
import UserContext from "./userContext";
import DoctorList from "./doctorList";

export default function PatientForm()
{
  const { updateUser, updateUserEmail, updateUserimage } =
    useContext(UserContext);
  let isTab = useMediaQuery({ query: "(max-width: 768px)" });
  let isTab1 = useMediaQuery({ query: "(max-width: 425px)" });
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [selectedDoctor, setselectedDoctor] = useState();
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [doctorsList, setDoctorsList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [open1, setOpen1] = useState(false);
  const onOpenModal = () => setOpen1(true);
  const onCloseModal = () => setOpen1(false);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [age, setAge] = useState("");
  const [ageError, setAgeError] = useState("");
  const [bodyWeight, setBodyWeight] = useState("");
  const [bodyWeightError, setBodyWeightError] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [houseNoError, setHouseNoError] = useState("");
  const [floor, setFloor] = useState("");
  const [floorError, setFloorError] = useState("");
  const [block, setBlock] = useState("");
  const [blockError, setBlockError] = useState("");
  const [area, setArea] = useState("");
  const [areaError, setAreaError] = useState("");
  const [patientsList, setPatientsList] = useState([]);
  const [showQrCode, setShowQrCode] = useState(false);
  const [pinCode, setPinCode] = useState("");
  const [pinCodeError, setPinCodeError] = useState("");
  const [district, setDistrict] = useState("");
  const [districtError, setDistrictError] = useState("");
  const [state, setState] = useState("");
  const [stateError, setStateError] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [patientImage, setPatientImage] = useState();
  const fileInputRef = useRef(null);
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [errors, setErrors] = useState({});
  const [userImage, setUserImage] = useState();
  const [userDetails, setUserDetails] = useState({ name: "" });
  const [newPatientDetails, setNewPatientDetails] = useState({});
  const [apiHitCounter, setApiHitCounter] = useState(1);
  const [userDetailsName, setUserDetailsName] = useState();
  const [userDetailsEmail, setUserDetailsEmail] = useState();
  const [userDetailsPic, setUserDetailsPic] = useState();
  const [registrationId, setRegistrationId] = useState(240301000);

  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [mobileNumberError, setmobileNumberError] = useState("");
  const [phoneNo, setphoneNo] = useState(null);
  const [patientDetails, setPatientDetails] = useState({
    name: "",
    age: "",
    ageType: "",
    bodyWeight: "",
    phoneNo: "",
    email: "",
    registrationNo: "",
    refBy: "",
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

  const [Ref, setRef] = useState([{ label: "Self", value: "Self" }]);

  useEffect(() =>
  {
    const fetchDoctorDetails = async () =>
    {
      try
      {
        const response = await fetch(`${baseUrl}/api/v1/list_doctors`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log("DATA from response", data);
        const verifiedDoctors = data.data.filter(
          (doctor) => doctor.accountVerified.isVerified
        );
        setDoctorsList(verifiedDoctors);
        console.log("total list ============", DoctorList);

        const doctorNames = verifiedDoctors.map((doctor) => ({
          label: doctor.name, // Change this to the property that contains the doctor's name
          value: doctor.name,   // Change this to the property that contains the doctor's unique identifier
        }));
        setRef((prevRef) => [...prevRef, ...doctorNames]);
      } catch (error)
      {
        console.error("There was an error verifying the OTP:", error);
      }
    };
    fetchDoctorDetails();
  }, []);


  useEffect(() =>
  {
    const fetchData = async () =>
    {
      try
      {
        const response = await fetch(
          `https://api.postalpincode.in/pincode/${patientDetails?.address?.pinCode}`,
          {
            method: "GET",
          }
        );

        if (!response.ok)
        {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const district = data[0]?.PostOffice[0]?.District;
        const state = data[0]?.PostOffice[0]?.State; // Corrected to "State" with a capital "S"
        console.log("District:", district);
        console.log("State:", state);

        setPatientDetails((prevDetails) => ({
          ...prevDetails,
          address: {
            ...prevDetails.address,
            district: district,
            state: state,
          },
        }));
      } catch (error)
      {
        console.error("Error fetching data:", error);
      }
    };

    if (patientDetails?.address?.pinCode)
    {
      fetchData();
    }
  }, [patientDetails?.address?.pinCode]);

  const handleSearch = (event) =>
  {
    const searchTerm = event?.target?.value?.toLowerCase();

    setSearchTerm(searchTerm);

    const filtered = patients?.filter((patient) =>
      patient?.name.toLowerCase().includes(searchTerm)
    );

    setFilteredPatients(filtered);
  };

  const handlepatientDetails = (patientId) =>
  {
    localStorage.setItem("selectedPatientId", patientId);
    window.location.reload();
  };

  const handleClearStorage = (patientId) =>
  {
    localStorage.removeItem("selectedPatientId");
    window.location.reload();
  };

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
        const response = await fetch(
          `${baseUrl}/api/v1/doctor/get_doctorDetails`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token, // Replace with your actual token from the previous session
            },
          }
        );

        const data = await response.json();
        console.log("DATA from response", data);
        setUserDetailsName(data?.data.name);
        setUserDetailsEmail(data?.data.email);
        setUserDetailsPic(data?.data.patientPic);
        console.log("usser name$$$$$$$", data?.data.name);
        setQrCodeUrl(data.data.qrCodeUrl)
      } catch (error)
      {
        console.error("There was an error verifying the OTP:", error);
      }
    };
    fetchUserDetails();
  }, []);

  useEffect(() =>
  {
    const fetchPatientDetails = async () =>
    {
      try
      {
        const token = localStorage.getItem("token");
        const patientId = localStorage.getItem("selectedPatientId");
        if (!token)
        {
          console.error("No token found in local storage");
          return;
        }
        const response = await fetch(
          `${baseUrl}/api/v1/doctor/get_labPatient/${patientId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token, // Replace with your actual token from the previous session
            },
          }
        );

        const data = await response.json();
        console.log("DATA from response", data);
        setPatientDetails(data?.data);
      } catch (error)
      {
        console.error("There was an error verifying the OTP:", error);
      }
    };
    fetchPatientDetails();
  }, []);

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
          localStorage.clear();
          navigate(`/doctorlogin`);
        }
        const response = await fetch(
          `${baseUrl}/api/v1/doctor/list_labPatient`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token, // Replace with your actual token from the previous session
            },
          }
        );

        const data = await response.json();
        console.log(
          "DATA from USE EFFECT response List Lab Patient",
          data?.data
        );
        setPatients(data?.data);
        const registrationIds = data?.data[0].registrationNo;
        setRegistrationId(data?.data[0].registrationNo);
        console.log("regis id ++++++++++++++++++++++++++", registrationId);
      } catch (error)
      {
        console.error("There was an error verifying the OTP:", error);
      }
    };
    fetchPatientDetails();
  }, []);

  const handleFileSelect = async (event) =>
  {
    const file = event.target.files[0];
    if (file)
    {
      const token = localStorage.getItem("token");
      const doctorId = localStorage.getItem("doctorId");
      const formData = new FormData();
      formData.append("patientPic", file);

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

  let counter = 0;

  const generatePatientId = () =>
  {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().substring(2);
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const incrementedCounter = counter++;
    let patientId = `${year}${month}${day}${incrementedCounter}`;
    return patientId;
  };
  const toggleQrCode = () =>
  {
    setShowQrCode(!showQrCode);
  };
  const onChange = (date, dateString) =>
  {
    console.log(date, dateString);

    localStorage.setItem("dateString", dateString);
  };

  const handleClick = (event) =>
  {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () =>
  {
    setAnchorEl(null);
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


  const handleChange1 = (e) =>
  {
    setPatientDetails((prevDoctorDetails) => ({
      ...prevDoctorDetails,
      gender: e,
    }));
  };

  const handleChange5 = (e) =>
  {
    setPatientDetails((prevDoctorDetails) => ({
      ...prevDoctorDetails,
      refBy: e,
    }));
  };

  const handleChange2 = (e) =>
  {
    setPatientDetails((prevDoctorDetails) => ({
      ...prevDoctorDetails,
      ageType: e,
    }));
  };

  const handleChange = (e) =>
  {
    const { name, value } = e.target;

    if (name === "pinCode")
    {
      if (/^\d{6}$/.test(value) && !/[A-Za-z]/.test(value))
      {
        setPinCodeError(""); // Clear the error message if it's a valid 6-digit number without alphabetic characters
      } else
      {
        setPinCodeError("Please enter a valid Pincode");
      }
    }

    if (name === "phoneNo")
    {
      if (/^\d{10}$/.test(value) && !/[A-Za-z]/.test(value))
      {
        setmobileNumberError("");
      } else
      {
        setmobileNumberError("Please enter a valid Number");
      }
    }

    // const error = validateField(name, value);
    // setErrors({ ...errors, [name]: error });
    if (name === "gender")
    {
      setPatientDetails((prevPatientDetails) => ({
        ...prevPatientDetails.gender,

        [name]: value,
      }));
    } else if (name === "ageType")
    {
      setPatientDetails((prevPatientDetails) => ({
        ...prevPatientDetails.ageType,
        [name]: value,
      }));
    } else
    {
      setPatientDetails((prevPatientDetails) => ({
        ...prevPatientDetails,
        [name]: value,
      }));
    }

    setPatientDetails((prevPatientDetails) => ({
      ...prevPatientDetails,
      patientPic: patientImage,
      ...([
        "houseNo",
        "floor",
        "block",
        "area",
        "pinCode",
        "district",
        "state",
      ].includes(name)
        ? {
          address: {
            ...prevPatientDetails.address,
            [name]: value,
          },
        }
        : { [name]: value }),
    }));

    if (
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
      setPatientDetails((prevPatientDetails) => ({
        ...prevPatientDetails,
        address: {
          ...prevPatientDetails.address,
          [name]: value,
        },
      }));
    } else
    {
      setPatientDetails((prevPatientDetails) => ({
        ...prevPatientDetails,
        [name]: value,
      }));
    }
    setIsEditing(true);
  };

  const handleRegister = async (e) =>
  {
    e.preventDefault();
    const doctorId = localStorage.getItem("doctorId");

    const newPatientDetails = {
      name: patientDetails?.name,
      age: patientDetails?.age?.toString(),
      ageType: patientDetails?.ageType,
      gender: patientDetails?.gender,
      email: patientDetails?.email,
      phoneNo: patientDetails?.phoneNo?.toString(),
      registrationNo: incrementedId?.toString(),
      refBy: patientDetails?.refBy,
      address: {
        houseNo: patientDetails?.address?.houseNo,
        floor: patientDetails?.address?.floor,
        block: patientDetails?.address?.block,
        area: patientDetails?.address?.area,
        pinCode: patientDetails?.address?.pinCode,
        district: patientDetails?.address?.district,
        state: patientDetails?.address?.state,
      },
      // patientId: JSON.stringify(generatePatientId()),
      doctorId: JSON.stringify(doctorId),
      // patientPic: userImage,
    };
    if (!newPatientDetails?.gender)
    {
      toast.error("Please write gender");
    } else if (!newPatientDetails?.age)
    {
      toast.error("Please write age");
    } else if (!newPatientDetails?.ageType)
    {
      toast.error("Please write age type");
    } else if (!newPatientDetails?.name)
    {
      toast.error("Please write name");
    } else if (!newPatientDetails?.phoneNo)
    {
      toast.error("Please write contact number");
    } else if (!newPatientDetails?.email)
    {
      toast.error("Please write email");
    } else if (!newPatientDetails.address?.pinCode)
    {
      toast.error("Please write Pincode");
    } else if (!/^\d{6}$/.test(newPatientDetails?.address?.pinCode))
    {
      toast.error("Please enter a valid 6-digit PIN code");
    } else if (!newPatientDetails.address?.district)
    {
      toast.error("Please write district");
    } else if (!newPatientDetails.address?.state)
    {
      toast.error("Please write state");
    }
    else if (!newPatientDetails?.refBy)
    {
      toast.error("Please Select Ref By");
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
      const patient = patients?.filter(
        (patient) =>
          patient?.name
            ?.toLowerCase()
            .includes(newPatientDetails?.name?.toLowerCase() ?? "") &&
          patient?.phoneNo == newPatientDetails?.phoneNo
      );

      if (patient.length > 0)
      {
        // toast.error("Patient with this name and phone no already exists");
        localStorage.setItem("selectedPatientId", patient[0]._id);
        localStorage.setItem("name", patient[0].name);
        localStorage.setItem("registrationNo", patient[0].registrationNo);
        localStorage.setItem("phoneNo", patient[0].phoneNo);
        localStorage.setItem("gender", patient[0].gender);
        localStorage.setItem("age", patient[0].age);
        localStorage.setItem("ref", patientDetails.refBy);
        // localStorage.setItem("ref", patient[0].refBy);
        localStorage.setItem("houseNo", patient[0].address.houseNo);
        localStorage.setItem("floor", patient[0].address.floor);
        localStorage.setItem("block", patient[0].address.block);
        localStorage.setItem("area", patient[0].address.area);
        localStorage.setItem("district", patient[0].address.district);
        localStorage.setItem("state", patient[0].address.state);
        localStorage.setItem("pincode", patient[0].address.pinCode);

        navigate("/billing");
      } else
      {
        const response = await fetch(
          `${baseUrl}/api/v1/doctor/create_labPatient`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token,
            },
            body: JSON.stringify(newPatientDetails),
          }
        );
        const data = await response.json();
        if (data.success === true)
        {
          onOpenModal();
          localStorage.setItem("selectedPatientId", data.data._id);
          localStorage.setItem("name", newPatientDetails.name);
          localStorage.setItem(
            "registrationNo",
            newPatientDetails.registrationNo
          );
          localStorage.setItem("phoneNo", newPatientDetails.phoneNo);
          localStorage.setItem("gender", newPatientDetails.gender);
          localStorage.setItem("age", newPatientDetails.age);
          localStorage.setItem("ref", newPatientDetails.refBy);
          localStorage.setItem("houseNo", newPatientDetails.address.houseNo);
          localStorage.setItem("floor", newPatientDetails.address.floor);
          localStorage.setItem("block", newPatientDetails.address.block);
          localStorage.setItem("area", newPatientDetails.address.area);
          localStorage.setItem("district", newPatientDetails.address.district);
          localStorage.setItem("state", newPatientDetails.address.state);
          localStorage.setItem("pincode", newPatientDetails.address.pinCode);

          navigate("/billing");
          console.log("DATA from response", data);
        }
      }
    }
  };

  console.log("PATIENT DETAILS", patientDetails);

  updateUser(userDetailsName);
  updateUserEmail(userDetailsEmail);
  updateUserimage(userDetailsPic);

  const incrementedId = parseInt(registrationId, 10) + 1;

  return (
    <>
      <div className="flex flex-col -ml-7  lg:flex-row">
        {/* --------------left-------------- */}
        <div className="flex flex-col border bg-white lg:w-1/4 py-6 px-3  ml-5 my-5  ">
          <div className="mx-auto my-2">
            <div className=" ">
              <div
                className=" border w-36 mx-auto rounded-full"
                style={{ backgroundColor: "#B1DAED" }}
              >
                {userImage || userDetails?.userPic ? (
                  <div
                    aria-controls="profile-pic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <img
                      src={userDetails?.userPic || userImage}
                      alt={userDetails?.name}
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
                    onClick={() =>
                    {
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

          <div className=" mt-3 relative">
            <div
              class=""
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: 2,
              }}
            >
              <label
                for="total-experience"
                className="block text-black text-lg font-semibold"
              >
                Search
              </label>
              <button
                className="btn btn-primary border py-1 ml-auto px-4 rounded-3xl text-white mb-2"
                style={{
                  backgroundColor: "#89CFF0",
                }}
                onClick={handleClearStorage}
              // className="block text-black text-sm font-semibold"
              >
                Clear
              </button>
            </div>
            <input
              value={searchTerm}
              onChange={handleSearch}
              type="search"
              id="default-search"
              className="block w-full mt-0 placeholder-gray-400/70 rounded-lg border  bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            />
            <ul
              style={{
                width: "100%",
                zIndex: 9999,
                position: "absolute",
              }}
              className="divide-y divide-gray-200 bg-white whitespace-normal"
            >
              {filteredPatients?.map((patient) => (
                <li key={patient.id} className="p-4">
                  <div onClick={() => handlepatientDetails(patient._id)}>
                    <div className="font-bold">{patient.name}</div>
                    <div className="text-sm">
                      <span className="ml-2">Email: {patient.email}</span>
                      <span className="ml-2">
                        Phone Number: {patient.phoneNo}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className=" mt-3 relative">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 170,
                marginBottom: 2,
              }}
            >
              <label
                for="refBy"
                className="block text-black text-lg font-semibold"
              >
                Ref by<span className="text-red-500">*</span>{" "}
              </label>
            </div>
            {/* <input
              value={patientDetails?.refBy}
              onChange={handleChange}
              type="text"
              name="refBy"
              id="refBy"
              className="block w-full mt-0 placeholder-gray-400/70 rounded-lg border  bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            /> */}

            <Select
              className="border rounded-lg h-11 block w-full mt-0 placeholder-gray-400/70   bg-white  text-gray-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              popupClassName="no-border-dropdown-menu"
              name="refBy"
              id="refBy"
              value={patientDetails?.refBy}
              onChange={handleChange5}
              placeholder="Select Ref"
              style={{ overflowY: "auto" }}
              dropdownStyle={{
                maxHeight: "300px",
                overflowY: "auto",
              }}
            >
              {Ref.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </div>

          {/* <div className=" mt-3 relative">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 170,
                marginBottom: 2,
              }}
            >
              <label
                for="test"
                className="block text-black text-lg font-semibold"
              >
                Test Asked
              </label>
            </div>
            <input
              // value={searchTerm}
              // onChange={handleSearch}
              type="text"
              id="test"
              className="block w-full mt-0 placeholder-gray-400/70 rounded-lg border  bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            />

          </div> */}

          <div className=" mt-3">
            <label
              for="total-experience"
              className="block text-black text-lg font-semibold"
            >
              Gender<span className="text-red-500">*</span>{" "}
            </label>
            <Select
              className="border rounded-lg h-11 block w-full mt-0 placeholder-gray-400/70   bg-white  text-gray-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              popupClassName="no-border-dropdown-menu"
              id="gender"
              name="gender"
              value={patientDetails?.gender}
              onChange={handleChange1}
              placeholder="Select Gender"
              style={{ overflowY: "auto" }}
              dropdownStyle={{
                maxHeight: "300px",
                overflowY: "auto",
              }}
            >
              {Gender.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
            {errors.totalExperience && (
              <p className="text-red-500">{errors.totalExperience}</p>
            )}
          </div>

          <div className="flex flex-row gap-2">
            <div className="mt-3 flex flex-col w-1/2">
              <label
                for="degree"
                className="block text-black text-lg font-semibold"
              >
                Age<span className="text-red-500">*</span>{" "}
              </label>
              <input
                type="text"
                id="age"
                name="age"
                onChange={handleChange}
                value={patientDetails?.age}
                className="block mt-0 w-full placeholder-gray-400/70  rounded-lg border  bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              />
              {errors.degree && <p className="text-red-500">{errors.degree}</p>}
            </div>
            <div className="mt-3 flex flex-col w-1/2">
              <label
                for="degree"
                className="block text-black text-lg font-semibold"
              >
                Age Type<span className="text-red-500">*</span>{" "}
              </label>
              <Select
                className="border rounded-lg h-11"
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
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
              {errors.degree && <p className="text-red-500">{errors.degree}</p>}
            </div>
          </div>
          <div className="mt-3 flex flex-col w-full">
            <label
              for="degree"
              className="block text-black text-lg font-semibold"
            >
              Date
            </label>
            <Space direction="vertical">
              <DatePicker onChange={onChange} />
            </Space>

          </div>

          {
            showQrCode && (<p class="mx-auto ">
              {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" />}
            </p>)
          }

        </div>

        {/* ----------------------------------right---------------------------------- */}
        <div
          div
          className="border bg-white flex flex-col lg:w-3/4 p-6 my-5 mx-3"
        >
          {/* <div style={{ display: 'flex', flexDirection: 'row', gap: 400 }}> */}
          <p className="text-3xl ">Personal Information</p>
          <p className="mt-2">
            Patient Id:{" "}
            {patientDetails?.registrationNo
              ? patientDetails?.registrationNo
              : incrementedId}
          </p>
          {/* </div> */}
          <hr className="border my-2 " />
          {/* -------name------- */}
          <div className="mt-3">
            <label
              for="name"
              className="block text-black text-lg font-semibold"
            >
              Name<span className="text-red-500">*</span>{" "}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={patientDetails?.name}
              onChange={handleChange}
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
              Contact Number<span className="text-red-500">*</span>{" "}
            </label>
            <input
              type="text"
              id="phoneNo"
              name="phoneNo"
              onChange={handleChange}
              value={patientDetails?.phoneNo}
              onInput={(e) =>
              {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              }}
              className="block  w-full placeholder-gray-400  rounded-lg border  bg-white px-5 py-2.5 text-gray-900  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            />
            {/* {errors.phoneNo && ( */}
            <p class=" text-red-500 ">{mobileNumberError}</p>
            {/* )} */}
          </div>

          {/* -----------Email----------- */}
          <div className="mt-3">
            <label
              for="email"
              className="block text-black text-lg font-semibold"
            >
              Email<span className="text-red-500">*</span>{" "}
            </label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={handleChange}
              value={patientDetails?.email}
              className="block  w-full placeholder-gray-400  rounded-lg border  bg-white px-5 py-2.5 text-gray-900  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            />
            {errors.phoneNo && <p className="text-red-500">{errors.phoneNo}</p>}
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
                <div className="flex lg:flex-row flex-col">
                  <div class="flex flex-row ">
                    <div className="px-2 lg:w-1/2  mt-3">
                      {patientsList?.length === 0 ||
                        userDetails?.newUser === true ? (
                        <input
                          type="text"
                          placeholder="House No."
                          id="houseNo"
                          name="houseNo"
                          onChange={handleChange}
                          value={patientDetails?.address?.houseNo}
                          className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                        />
                      ) : (
                        <input
                          type="text"
                          placeholder="House No."
                          id="houseNo"
                          name="houseNo"
                          value={patientDetails?.address?.houseNo}
                          className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                        />
                      )}
                    </div>
                    <div className="px-2 lg:w-1/2 mt-3">
                      {patientsList?.length === 0 ||
                        userDetails?.newUser === true ? (
                        <input
                          type="text"
                          id="floor"
                          name="floor"
                          onChange={handleChange}
                          value={patientDetails?.address?.floor}
                          placeholder="Floor"
                          className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                        />
                      ) : (
                        <input
                          type="text"
                          id="floor"
                          name="floor"
                          value={patientDetails?.address?.floor}
                          placeholder="Floor"
                          className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                        />
                      )}
                    </div>
                  </div>
                  <div class="flex flex-row">
                    <div className="px-2 lg:w-1/2 mt-3">
                      {patientsList?.length === 0 ||
                        userDetails?.newUser === true ? (
                        <input
                          type="text"
                          id="block"
                          name="block"
                          onChange={handleChange}
                          value={patientDetails?.address?.block}
                          placeholder="Block"
                          className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                        />
                      ) : (
                        <input
                          type="text"
                          id="block"
                          name="block"
                          value={patientDetails?.address?.block}
                          placeholder="Block"
                          className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                        />
                      )}

                      {errors.block && (
                        <p className="text-red-500">{errors.block}</p>
                      )}
                    </div>
                    <div className="px-2 lg:w-1/2 mt-3">
                      {patientsList?.length === 0 ||
                        userDetails?.newUser === true ? (
                        <input
                          type="text"
                          id="pinCode"
                          name="pinCode"
                          onChange={handleChange}
                          value={patientDetails?.address?.pinCode}
                          placeholder="Pin Code*"
                          className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                          onInput={(e) =>
                          {
                            e.target.value = e.target.value.replace(
                              /[^0-9]/g,
                              ""
                            );
                          }}
                        />
                      ) : (
                        <input
                          type="text"
                          id="pinCode"
                          name="pinCode"
                          value={patientDetails?.address?.pinCode}
                          placeholder="Pin Code*"
                          className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                        />
                      )}

                      {pinCodeError && (
                        <p className="text-red-500">{pinCodeError}</p>
                      )}
                    </div>
                  </div>
                </div>
                {/* ----------------------------area/landmark---------------------------- */}
                <div className="px-2 w-full mt-3 ">
                  {patientsList?.length === 0 ||
                    userDetails?.newUser === true ? (
                    <input
                      type="text"
                      id="area"
                      name="area"
                      onChange={handleChange}
                      value={patientDetails?.address?.area}
                      placeholder="Area/Landmark"
                      className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                  ) : (
                    <input
                      type="text"
                      id="area"
                      name="area"
                      value={patientDetails?.address?.area}
                      placeholder="Area/Landmark"
                      className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                  )}

                  {errors.area && <p className="text-red-500">{errors.area}</p>}
                </div>

                <div className="flex flex-row">
                  <div className="px-2 w-1/2 mt-3">
                    {patientsList?.length === 0 ||
                      userDetails?.newUser === true ? (
                      <input
                        type="text"
                        id="district"
                        name="district"
                        onChange={handleChange}
                        value={patientDetails?.address?.district}
                        placeholder="District"
                        className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      />
                    ) : (
                      <input
                        type="text"
                        id="district"
                        name="district"
                        value={patientDetails?.address?.district}
                        placeholder="District"
                        className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      />
                    )}

                    {errors.district && (
                      <p className="text-red-500">{errors.district}</p>
                    )}
                  </div>

                  <div className="px-2 w-1/2 mt-3">
                    {patientsList?.length === 0 ||
                      userDetails?.newUser === true ? (
                      <input
                        type="text"
                        id="state"
                        name="state"
                        onChange={handleChange}
                        value={patientDetails?.address?.state}
                        placeholder="State"
                        className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      />
                    ) : (
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={patientDetails?.address?.state}
                        placeholder="State"
                        className="block w-full rounded-lg border  bg-[#EAEAEA] placeholder-gray-500 font-medium px-5 py-2.5 text-gray-700 focus:border-[#89CFF0] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      />
                    )}

                    {errors.state && (
                      <p className="text-red-500">{errors.state}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row-reverse mt-5 my-2 gap-4">
            {/* <button
              className="btn btn-primary border py-3 px-4 rounded-3xl text-white"
              style={{
                backgroundColor: "#89CFF0",
              }}
              onClick={toggleQrCode}
            >
              Show Qr
            </button> */}
            <button
              className="btn btn-primary border py-3 px-6 rounded-3xl text-white"
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
