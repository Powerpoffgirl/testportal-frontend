import "./App.css";
// import Login from './components/login';
import Admin from "./components/admin";
import Form from "./components/Form";
import { Route, Routes } from "react-router-dom";
import OTP from "./components/Otp";
import Qr from "./components/Qr";
import UserForm from "./components/userForm";
import UserAdmin from "./components/userAdmin";
import DoctorDetail from "./components/doctorDetail";
import PatientForm from "./components/patientForm";
import DoctorForm from "./components/doctorForm";
import PatientList from "./components/patientList";
import DoctorList from "./components/doctorList";
import DoctorLogin from "./components/doctorLogin";
import AdminLogin from "./components/adminLogin";
import UserLogin from "./components/userLogin";
import DoctorListAdmin from "./components/doctorListAdmin";
import AdminForm from "./components/adminForm";
import EditDoctorForm from "./components/editDoctorForm";
import EditAdminForm from "./components/editAdminForm";
import UserOTP from "./components/userOtp";
import PatientListUser from "./components/patientListUser";
import DoctorListUser from "./components/doctorListUser";
import AppointmentListUser from "./components/appointmentListUser";
import EditUserForm from "./components/editUserForm";
import AppointmentList from "./components/appointmentList";
import PatientDescription from "./components/patientDescription";
import PatientListAdmin from "./components/patientListAdmin";
import UserList from "./components/userList";
import ShowPatientForm from "./components/showPatientForm";
import EditAppointment from "./components/editAppointment";
import ViewPatientDescription from "./components/viewPatientDescription";
import UserSignup from "./components/userSignup";
import DocAppointment from "./components/docAppointment";
import Table from "./components/tabel";
// import Sidebar2 from './components/Sidebar2';
import Layout from "./components/Layout";
import Table2 from "./components/table2";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout Component={DoctorList} />}></Route>
      <Route path="/adminlogin" element={<AdminLogin />}></Route>
      <Route path="/doctorlogin" element={<DoctorLogin />}></Route>
      <Route path="/userlogin" element={<UserLogin />}></Route>
      <Route path="/usersignup" element={<UserSignup />}></Route>
      <Route path="/admin" element={<Admin></Admin>}></Route>
      <Route path="/form" element={<Form></Form>}></Route>
      <Route path="/otp" element={<OTP />}></Route>
      <Route
        path="/userotp"
        element={
          <Layout
            Component={UserOTP}
            type="admin"
            headerTextTop={"Verify"}
            headerTextBottom={"OTP"}
          />
        }
      ></Route>
      <Route
        path="/qr"
        element={<Layout Component={Qr} type="admin" />}
      ></Route>
      <Route
        path="/userform"
        element={<Layout Component={UserForm} type="user" />}
      ></Route>
      <Route
        path="/adminform"
        element={<Layout Component={AdminForm} type="admin" />}
      ></Route>
      <Route
        path="/useradmin"
        element={<Layout Component={UserAdmin} type="admin" />}
      ></Route>
      <Route
        path="/doctordetail/:id"
        element={<Layout Component={DoctorDetail} type="doctor" />}
      ></Route>
      <Route
        path="/patientdescription/:id"
        element={<PatientDescription></PatientDescription>}
      ></Route>
      <Route
        path="/viewpatientdescription/:id"
        element={<ViewPatientDescription></ViewPatientDescription>}
      ></Route>
      <Route path="/patientform" element={<PatientForm></PatientForm>}></Route>
      <Route
        path="/showpatientform"
        element={<ShowPatientForm></ShowPatientForm>}
      ></Route>
      <Route
        path="/bookappointment"
        element={<Layout Component={DocAppointment} type="user" />}
      ></Route>
      <Route
        path="/editappointment"
        element={<Layout Component={EditAppointment} type="user" />}
      ></Route>
      <Route
        path="/doctorform"
        element={<Layout Component={DoctorForm} type="admin" />}
      ></Route>
      <Route
        path="/editdoctorform"
        element={<Layout Component={EditDoctorForm} type="doctor" />}
      ></Route>
      <Route
        path="/editadminform"
        element={<EditAdminForm></EditAdminForm>}
      ></Route>
      <Route
        path="/edituserform"
        element={
          <Layout
            Component={EditUserForm}
            type="user"
            headerTextTop={"User's"}
            headerTextBottom={"Form"}
          />
        }
      ></Route>
      <Route
        path="/patientlistadmin"
        element={
          <Layout
            Component={PatientListAdmin}
            type="admin"
            headerTextTop={"Patient's"}
            headerTextBottom={"List"}
          />
        }
      ></Route>
      <Route
        path="/patientlist"
        element={<Layout Component={PatientList} type="doctor" />}
      ></Route>
      <Route
        path="/patientlistuser"
        element={
          <Layout
            Component={PatientListUser}
            type="user"
            headerTextTop={"Patient's"}
            headerTextBottom={"List"}
          />
        }
      ></Route>
      <Route path="/doctorlist" element={<DoctorList />}></Route>
      <Route path="/userlistadmin" element={<UserList></UserList>}></Route>
      <Route
        path="/doctorlistuser"
        element={
          <Layout
            Component={DoctorListUser}
            type="user"
            headerTextTop={"Doctor's"}
            headerTextBottom={"List"}
          />
        }
      >
        {" "}
      </Route>
      <Route
        path="/doctorlistadmin"
        element={<Layout Component={DoctorListAdmin} type="admin" />}
      ></Route>
      <Route
        path="/appointmentlist"
        element={<Layout Component={AppointmentList} type="doctor" />}
      ></Route>
      <Route
        path="/appointmentlistuser"
        element={
          <Layout
            Component={AppointmentListUser}
            type="user"
            headerTextTop={"Appointment's"}
            headerTextBottom={"List"}
          />
        }
      ></Route>
      <Route path="/tabel" element={<Table></Table>}></Route>
    </Routes>
  );
}

export default App;
