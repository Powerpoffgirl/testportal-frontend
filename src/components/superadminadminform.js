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

const svg1 = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.7778 10C17.7778 7.83333 17.0231 5.99537 15.5139 4.48611C14.0046 2.97685 12.1667 2.22222 10 2.22222V0C11.3889 0 12.6898 0.263889 13.9028 0.791667C15.1157 1.31944 16.1713 2.03241 17.0694 2.93056C17.9676 3.8287 18.6806 4.88426 19.2083 6.09722C19.7361 7.31019 20 8.61111 20 10H17.7778ZM13.3333 10C13.3333 9.07407 13.0093 8.28704 12.3611 7.63889C11.713 6.99074 10.9259 6.66667 10 6.66667V4.44444C11.537 4.44444 12.8472 4.98611 13.9306 6.06944C15.0139 7.15278 15.5556 8.46296 15.5556 10H13.3333ZM18.8333 20C16.5185 20 14.2315 19.4954 11.9722 18.4861C9.71296 17.4769 7.65741 16.0463 5.80556 14.1944C3.9537 12.3426 2.52315 10.287 1.51389 8.02778C0.50463 5.76852 0 3.48148 0 1.16667C0 0.833333 0.111111 0.555556 0.333333 0.333333C0.555556 0.111111 0.833333 0 1.16667 0H5.66667C5.92593 0 6.15741 0.087963 6.36111 0.263889C6.56482 0.439815 6.68519 0.648148 6.72222 0.888889L7.44444 4.77778C7.48148 5.07407 7.47222 5.32407 7.41667 5.52778C7.36111 5.73148 7.25926 5.90741 7.11111 6.05556L4.41667 8.77778C4.78704 9.46296 5.22685 10.125 5.73611 10.7639C6.24537 11.4028 6.80556 12.0185 7.41667 12.6111C7.99074 13.1852 8.59259 13.7176 9.22222 14.2083C9.85185 14.6991 10.5185 15.1481 11.2222 15.5556L13.8333 12.9444C14 12.7778 14.2176 12.6528 14.4861 12.5694C14.7546 12.4861 15.0185 12.463 15.2778 12.5L19.1111 13.2778C19.3704 13.3519 19.5833 13.4861 19.75 13.6806C19.9167 13.875 20 14.0926 20 14.3333V18.8333C20 19.1667 19.8889 19.4444 19.6667 19.6667C19.4444 19.8889 19.1667 20 18.8333 20ZM3.36111 6.66667L5.19444 4.83333L4.72222 2.22222H2.25C2.34259 2.98148 2.47222 3.73148 2.63889 4.47222C2.80556 5.21296 3.0463 5.94444 3.36111 6.66667ZM13.3056 16.6111C14.0278 16.9259 14.7639 17.1759 15.5139 17.3611C16.2639 17.5463 17.0185 17.6667 17.7778 17.7222V15.2778L15.1667 14.75L13.3056 16.6111Z" fill="#89CFF0"/>
</svg>`;
const svg2 = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 12H12V10H4V12ZM4 9H16V7H4V9ZM4 6H16V4H4V6ZM0 20V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H4L0 20ZM3.15 14H18V2H2V15.125L3.15 14Z" fill="#89CFF0"/>
</svg>`;

const svg3 = `<svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.5 0L15.3064 8.63729H24.3882L17.0409 13.9754L19.8473 22.6127L12.5 17.2746L5.15268 22.6127L7.95911 13.9754L0.611794 8.63729H9.69357L12.5 0Z" fill="#FFF500"/>
</svg>`;

export default function SuperAdminAdminForm()
{
  let isTab = useMediaQuery({ query: "(max-width: 768px)" });
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [selectedDoctor, setselectedDoctor] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [open1, setOpen1] = useState(false);
  const onOpenModal = () => setOpen1(true);
  const onCloseModal = () => setOpen1(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  // // const [name, setName] = useState("");
  // const [emailError, setEmailError] = useState("");
  // const [email, setEmail] = useState("");
  // const [nameError, setNameError] = useState("");
  // const [contact, setContact] = useState("");
  // const [contactError, setContactError] = useState("");
  // const [age, setAge] = useState("");
  // const [ageError, setAgeError] = useState("");
  // const [bodyWeight, setBodyWeight] = useState("");
  // const [bodyWeightError, setBodyWeightError] = useState("");
  // const [houseNo, setHouseNo] = useState("");
  // const [houseNoError, setHouseNoError] = useState("");
  // const [floor, setFloor] = useState("");
  // const [floorError, setFloorError] = useState("");
  // const [block, setBlock] = useState("");
  // const [blockError, setBlockError] = useState("");
  // const [area, setArea] = useState("");
  // const [areaError, setAreaError] = useState("");
  // const [pinCode, setPinCode] = useState("");
  // const [pinCodeError, setPinCodeError] = useState("");
  // const [district, setDistrict] = useState("");
  // const [districtError, setDistrictError] = useState("");
  // const [state, setState] = useState("");
  // const [stateError, setStateError] = useState("");
  const [action, setAction] = useState("");
  const [adminImage, setAdminImage] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);

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
        setAdminImage(data.profilePicImageUrl);
        alert("Image uploaded successfully.");

        // Reset the file input
        setSelectedFile(null);
        fileInputRef.current.value = "";
      } catch (error)
      {
        console.error("Error uploading image:", error);
        alert("Error uploading image. Please try again.");
      }

    }

  };

  const handleNewProfilePictureClick = async () =>
  {
    // This will trigger the hidden file input to open the file dialog
    await fileInputRef.current.click();
  };



  const handleActionChange = (e) =>
  {
    setAction(e.target.value);
  };

  // const handleNameChange = (e) =>
  // {
  //   const enteredName = e.target.value;
  //   setName(enteredName);

  //   // Validation logic
  //   if (!enteredName.trim())
  //   {
  //     setNameError("Name is required");
  //   } else if (!/^[a-zA-Z\s-]+$/.test(enteredName))
  //   {
  //     setNameError("Invalid name format");
  //   } else if (enteredName.length < 2 || enteredName.length > 50)
  //   {
  //     setNameError("Name length should be between 2 and 50 characters");
  //   } else
  //   {
  //     setNameError("");
  //   }
  // };

  // const handleEmailChange = (e) =>
  // {
  //   const enteredEmail = e.target.value;
  //   setEmail(enteredEmail);

  //   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //   if (!enteredEmail.trim())
  //   {
  //     setEmailError("Email is required");
  //   } else if (!emailPattern.test(enteredEmail))
  //   {
  //     setEmailError("Invalid email format");
  //   } else
  //   {
  //     setEmailError("");
  //   }
  // };

  // const handleContactChange = (e) =>
  // {
  //   const enteredContact = e.target.value;
  //   setContact(enteredContact);

  //   const contactPattern = /^\d{10}$/;

  //   if (!enteredContact.trim())
  //   {
  //     setContactError("Contact number is required");
  //   } else if (!contactPattern.test(enteredContact))
  //   {
  //     setContactError("Invalid contact format. Please enter a 10-digit number");
  //   } else
  //   {
  //     setContactError("");
  //   }
  // };

  // const handleAgeChange = (e) =>
  // {
  //   const enteredAge = e.target.value;
  //   setAge(enteredAge);

  //   // Validation logic
  //   const ageRegex = /^\d+$/;
  //   if (!enteredAge.trim())
  //   {
  //     setAgeError("Age is required");
  //   } else if (!ageRegex.test(enteredAge))
  //   {
  //     setAgeError("Age should be a number");
  //   } else if (enteredAge < 0 || enteredAge > 120)
  //   {
  //     setAgeError("Age should be between 0 and 120");
  //   } else
  //   {
  //     setAgeError("");
  //   }
  // };

  // const handleBodyWeightChange = (e) =>
  // {
  //   const enteredBodyWeight = e.target.value;
  //   setBodyWeight(enteredBodyWeight);

  //   // Validation logic
  //   const bodyWeightRegex = /^\d+(\.\d{1,2})?$/; // Allows positive numbers with up to 2 decimal places

  //   if (!enteredBodyWeight.trim())
  //   {
  //     setBodyWeightError("Body weight is required");
  //   } else if (!bodyWeightRegex.test(enteredBodyWeight))
  //   {
  //     setBodyWeightError("Invalid body weight format");
  //   } else if (enteredBodyWeight <= 0)
  //   {
  //     setBodyWeightError("Body weight should be greater than 0");
  //   } else
  //   {
  //     setBodyWeightError("");
  //   }
  // };

  // const handleHouseNoChange = (e) =>
  // {
  //   const enteredHouseNo = e.target.value;
  //   setHouseNo(enteredHouseNo);

  //   // Validation logic
  //   const houseNoRegex = /^\d+$/; // Allows only positive whole numbers

  //   if (!enteredHouseNo.trim())
  //   {
  //     setHouseNoError("");
  //   } else if (!houseNoRegex.test(enteredHouseNo))
  //   {
  //     setHouseNoError("");
  //   } else
  //   {
  //     setHouseNoError("");
  //   }
  // };

  // const handleFloorChange = (e) =>
  // {
  //   const enteredFloor = e.target.value;
  //   setFloor(enteredFloor);

  //   // Validation logic
  //   const alphabeticRegex = /^[a-zA-Z\s-]+$/; // Allows alphabetic characters, spaces, and hyphens
  //   const formatRegex =
  //     /^(?=.*\b\d{1,3}(st|nd|rd|th)\b)\b\d{1,3}(st|nd|rd|th)?\b$/i; // Allows 1st, 2nd, 3rd, etc.

  //   if (!enteredFloor.trim())
  //   {
  //     setFloorError("");
  //   } else if (
  //     !alphabeticRegex.test(enteredFloor) &&
  //     !formatRegex.test(enteredFloor)
  //   )
  //   {
  //     setFloorError("");
  //   } else
  //   {
  //     setFloorError("");
  //   }
  // };

  // const handleBlockChange = (e) =>
  // {
  //   const enteredBlock = e.target.value;
  //   setBlock(enteredBlock);

  //   // Validation logic
  //   const blockRegex = /^[A-Za-z0-9]+$/; // Allows alphanumeric characters

  //   if (!enteredBlock.trim())
  //   {
  //     setBlockError("Block is required");
  //   } else if (!blockRegex.test(enteredBlock))
  //   {
  //     setBlockError("Invalid block format");
  //   } else
  //   {
  //     setBlockError("");
  //   }
  // };

  // const handleAreaChange = (e) =>
  // {
  //   const enteredArea = e.target.value;
  //   setArea(enteredArea);

  //   // Validation logic
  //   const areaRegex = /^[A-Za-z\s-]+$/; // Allows alphabetic characters, spaces, and hyphens

  //   if (!enteredArea.trim())
  //   {
  //     setAreaError("Area is required");
  //   } else if (!areaRegex.test(enteredArea))
  //   {
  //     setAreaError("Invalid area format");
  //   } else
  //   {
  //     setAreaError("");
  //   }
  // };

  // const handleDistrictChange = (e) =>
  // {
  //   const enteredDistrict = e.target.value;
  //   setDistrict(enteredDistrict);

  //   // Validation logic
  //   const districtRegex = /^[A-Za-z\s-]+$/; // Allows alphabetic characters, spaces, and hyphens

  //   if (!enteredDistrict.trim())
  //   {
  //     setDistrictError("District is required");
  //   } else if (!districtRegex.test(enteredDistrict))
  //   {
  //     setDistrictError("Invalid district format");
  //   } else
  //   {
  //     setDistrictError("");
  //   }
  // };

  // const handleStateChange = (e) =>
  // {
  //   const enteredState = e.target.value;
  //   setState(enteredState);

  //   // Validation logic
  //   const stateRegex = /^[A-Za-z\s-]+$/; // Allows alphabetic characters, spaces, and hyphens

  //   if (!enteredState.trim())
  //   {
  //     setStateError("State is required");
  //   } else if (!stateRegex.test(enteredState))
  //   {
  //     setStateError("Invalid state format");
  //   } else
  //   {
  //     setStateError("");
  //   }
  // };
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
      floor: "",
      block: "",
      area: "",
      pinCode: "",
      district: "",
      state: "",
    },
    adminPic: "",
  });

  const handleClick = (event) =>
  {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () =>
  {
    setAnchorEl(null);
  };

  // const handlePincodeChange = (e) =>
  // {
  //   const enteredPinCode = e.target.value;
  //   setPinCode(enteredPinCode);

  //   // Validation logic
  //   const pinCodeRegex = /^\d{6}$/; // Allows exactly 6 digits

  //   if (!enteredPinCode.trim())
  //   {
  //     setPinCodeError("Pincode is required");
  //   } else if (!pinCodeRegex.test(enteredPinCode))
  //   {
  //     setPinCodeError("Invalid pincode format (should be 6 digits)");
  //   } else
  //   {
  //     setPinCodeError("");
  //   }
  // };

  const validateField = (name, value) =>
  {
    switch (name)
    {
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
        return /^[a-zA-Z\s]+$/.test(value) && value ? "" : "houseNo is required  ";
      case "floor":
        return /^[a-zA-Z\s]+$/.test(value) && value ? "" : "floor is required";
      case "block":
        return /^[a-zA-Z\s]+$/.test(value) && value ? "" : "Block is required  ";
      case "area":
        return /^[a-zA-Z\s]+$/.test(value) && value ? "" : "Area is required and must be a string ";
      case "pinCode":
        return /^\d{6}$/.test(value) ? "" : "Pincode must be exactly 6 digits.";
      case "district":
        return /^[a-zA-Z\s]+$/.test(value) && value ? "" : "District is required and must be a string ";
      case "state":
        return /^[a-zA-Z\s]+$/.test(value) && value ? "" : "State is required and must be a string ";
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


  const handleChange = (e) =>
  {
    console.log("E value", e);
    const { name, value, type, checked } = e.target;

    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });

    setAdminDetails((prevAdminDetails) => ({
      ...prevAdminDetails,
      adminPic: adminImage,
    }));

    if (type === "checkbox")
    {
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
    )
    {
      setAdminDetails((prevAdminDetails) => ({
        ...prevAdminDetails,
        address: {
          ...prevAdminDetails.address,
          [name]: value,
        },
      }));
    } else
    {
      setAdminDetails((prevAdminDetails) => ({
        ...prevAdminDetails,
        [name]: value,
      }));
    }
    setIsEditing(true);
  };

  const handleRegister = async (e) =>
  {
    e.preventDefault();

    const isEmpty = Object.values(adminDetails).some(value => value === '');

    if (isEmpty || isEditing === false)
    {
      toast.error('Please fill the fields or Update');
      setIsEditing(false);
      return;
    }

    // if (isEmpty || isEditing === false)
    // {
    //   toast.error("Please fill the fields");
    //   setIsEditing(false);
    //   return;
    // }

    // if (!isEmpty || isEditing === true)
    // {
    //   toast.success("Form submitted successfully!");
    // }
    // Check if the token exists
    const token = localStorage.getItem("token");
    if (!token)
    {
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
    if (data.statusCode === 400)
    {
      toast.error("Please fill the details");
    }

    if (data.success === true)
    {
      // navigate("/otp")
      onOpenModal();
      localStorage.setItem("adminId", data.data._id);
      localStorage.setItem("contactNumber", data.data.contactNumber);
      navigate("/superadminotp");
    }
    console.log("DATA from response", data);
  };
  console.log("PATIENT DETAILS", adminDetails);

  // const handleActionChange = (value) =>
  // {
  //   const index = selectedActions.indexOf(value);

  //   if (index === -1)
  //   {
  //     // If the value is not present in the array, add it
  //     setSelectedActions([...selectedActions, value]);
  //   } else
  //   {
  //     // If the value is present in the array, remove it
  //     const updatedActions = [...selectedActions];
  //     updatedActions.splice(index, 1);
  //     setSelectedActions(updatedActions);
  //   }
  // };

  return (
    <>
      <Modal
        open={open1}
        onClose={onCloseModal}
        center
        doctor={selectedDoctor}
        styles={{
          modal: {
            // Set your custom width here (e.g., '70%')
            width: isTab ? "80%" : "70%",
            backgroundColor: "#89CFF0",
            alignContent: "center",
          },
        }}
      >
        <div className="flex flex-col bg-customRedp-2  items-center w-[100%] md:w-[100%]  mt-[2%]">
          <text
            className="text-center mt-4 mb-4"
            style={{
              fontSize: isTab ? "14px" : "20px",
              fontWeight: 600,
              lineHeight: "28.8px",
              fontFamily: "Lato, sans-serif",
              color: "#FFFFFF",
            }}
          >
            Admin is Created.
            <br />
            Go to Admin's list and Check.
          </text>
        </div>
      </Modal>

      <div className="flex flex-row">
        <ToastContainer />
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
                    {adminImage || adminDetails?.adminPic ? (
                      <img
                        src={adminImage || adminDetails?.adminPic}
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
                    style={{
                      cursor: "pointer",
                      marginLeft: 37,
                      marginTop: -20,
                    }}
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
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                      >
                        {" "}
                        <span style={{ marginRight: "8px" }}>
                          <HiOutlineUserAdd />
                        </span>
                        <label htmlFor="files" >New profile picture</label>
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
                  <label style={{ marginLeft: -17, marginTop: 5, fontWeight: "600" }}>
                    Edit Profile Picture
                  </label>
                  <input
                    id="files"
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleFileSelect}
                  />
                </div>
              </div>
            </div>
            <div class="grid grid-cols-1 w-full gap-4">
              <div>
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
                  value={adminDetails.name}
                  onChange={handleChange}
                  className={`block mt-0 w-full placeholder-gray-400/70 rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 `}
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-black text-lg font-semibold"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={adminDetails.email}
                  onChange={handleChange}
                  className={`block mt-0 w-full placeholder-gray-400/70 rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 `}
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="contact"
                  className="block text-black text-lg font-semibold"
                >
                  Contact Number
                </label>
                <input
                  type="number"
                  id="contactNumber"
                  name="contactNumber"
                  value={adminDetails.contactNumber}
                  onChange={handleChange}
                  className={`block mt-0 w-full placeholder-gray-400/70 rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 `}
                />
                {errors.contactNumber && (
                  <p className="text-red-500">{errors.contactNumber}</p>
                )}
              </div>

              <div className="flex flex-row items-start pt-4 gap-4">
                <div className="flex flex-col mr-2 ">
                  <label
                    style={{ marginRight: '10px' }}
                    className="mx-2 text-lg font-normal text-black font-lato font-semibold"
                    htmlFor="Permission"
                  >
                    Permission
                  </label>
                  {/* Input for Age */}
                  {/* ... */}
                </div>

                <div
                  className="flex flex-row flex-grow "
                  style={{ justifyContent: "space-around" }}
                >
                  {/* Permissions */}
                  <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                    <label style={{ marginRight: '15px' }}>View:</label>
                    <input
                      type="checkbox"
                      name="view"
                      checked={adminDetails.permissions.view}
                      onChange={handleChange}
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                    <label style={{ marginRight: '15px' }}>Create:</label>
                    <input
                      type="checkbox"
                      name="create"
                      checked={adminDetails.permissions.create}
                      onChange={handleChange}
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                    <label style={{ marginRight: '15px' }}>Remove:</label>
                    <input
                      type="checkbox"
                      name="remove"
                      checked={adminDetails.permissions.remove}
                      onChange={handleChange}
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                    <label style={{ marginRight: '15px' }}>Edit:</label>
                    <input
                      type="checkbox"
                      name="edit"
                      checked={adminDetails.permissions.edit}
                      onChange={handleChange}
                    />
                  </div>
                  {/* Error handling or displaying selected action */}
                  {/* {action && <p>Selected Action: {action}</p>} */}
                </div>
              </div>


              <div>
                <label
                  htmlFor="state"
                  className="block text-black text-lg font-semibold"
                >
                  Address
                </label>
                <div class="p-3 pb-5 border border-[#89CFF0]">
                  <div class="flex flex-col sm:flex-row sm:flex-wrap -mx-2">
                    <div className="px-2 w-full sm:w-1/3">
                      <label
                        htmlFor="houseNo"
                        className="block text-black text-lg font-semibold"
                      >
                        House No
                      </label>
                      <input
                        type="text"
                        id="houseNo"
                        name="houseNo"
                        value={adminDetails.address.houseNo}
                        onChange={handleChange}
                        placeholder="1234"
                        className={`block w-full rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 `}
                      />
                      {/* {houseNoError && (
                      <p className="text-red-500 text-sm mt-1">
                        {houseNoError}
                      </p>
                    )} */}
                    </div>{" "}
                    <div className="px-2 w-full sm:w-1/3">
                      <label
                        htmlFor="floor"
                        className="block text-black text-lg font-semibold"
                      >
                        Floor
                      </label>
                      <input
                        type="text"
                        id="floor"
                        name="floor"
                        value={adminDetails.address.floor}
                        onChange={handleChange}
                        placeholder="First Floor or 2nd"
                        className={`block w-full rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 `}
                      />
                      {/* {floorError && (
                      <p className="text-red-500 text-sm mt-1">{floorError}</p>
                    )} */}
                    </div>{" "}
                    <div className="px-2 w-full sm:w-1/3">
                      <label
                        htmlFor="block"
                        className="block text-black text-lg font-semibold"
                      >
                        Block
                      </label>
                      <input
                        type="text"
                        id="block"
                        name="block"
                        value={adminDetails.address.block}
                        onChange={handleChange}
                        placeholder="A"
                        className={`block w-full rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 `}
                      />
                      {/* {blockError && (
                      <p className="text-red-500 text-sm mt-1">{blockError}</p>
                    )} */}
                    </div>{" "}
                    <div className="px-2 w-full sm:w-1/2">
                      <label
                        htmlFor="area"
                        className="block text-black text-lg font-semibold"
                      >
                        Area
                      </label>
                      <input
                        type="text"
                        id="area"
                        name="area"
                        value={adminDetails.address.area}
                        onChange={handleChange}
                        placeholder="Green Park"
                        className={`block w-full rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40`}
                      />
                      {errors.area && (
                        <p className="text-red-500">{errors.area}</p>
                      )}
                    </div>{" "}
                    <div className="px-2 w-full sm:w-1/2">
                      <label
                        htmlFor="pinCode"
                        className="block text-black text-lg font-semibold"
                      >
                        Pincode
                      </label>
                      <input
                        type="text"
                        id="pinCode"
                        name="pinCode"
                        value={adminDetails.address.pinCode}
                        onChange={handleChange}
                        placeholder="110016"
                        className={`block w-full rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 `}
                      />
                      {errors.pinCode && (
                        <p className="text-red-500">{errors.pinCode}</p>
                      )}
                    </div>
                    <div className="px-2 w-full sm:w-1/2">
                      <label
                        htmlFor="district"
                        className="block text-black text-lg font-semibold"
                      >
                        District
                      </label>
                      <input
                        type="text"
                        id="district"
                        name="district"
                        value={adminDetails.address.district}
                        onChange={handleChange}
                        placeholder="South Delhi"
                        className={`block w-full rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 `}
                      />
                      {errors.district && (
                        <p className="text-red-500">{errors.district}</p>
                      )}
                    </div>
                    <div className="px-2 w-full sm:w-1/2">
                      <label
                        htmlFor="state"
                        className="block text-black text-lg font-semibold"
                      >
                        State
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={adminDetails.address.state}
                        onChange={handleChange}
                        placeholder="Delhi"
                        className={`block w-full rounded-lg border border-[#89CFF0] bg-white px-5 py-2.5 text-gray-700 focus:border-[#08DA73] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 `}
                      />
                      {errors.state && (
                        <p className="text-red-500">{errors.state}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>


            </div>
            <div className="mt-10 w-100 items-center justify-center text-center">
              <button
                className="rounded-full justify-center px-9 py-2 bg-[#89CFF0] text-white"
                onClick={handleRegister}
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
