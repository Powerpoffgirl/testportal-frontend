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
import EditPatientForm from "./components/editPatientForm";

function App()
{
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout
            Component={DoctorList}
            headerTextTop={"Doctor's"}
            headerTextBottom={"List"}
            search={"true"}
          />
        }
      ></Route>
      <Route path="/adminlogin" element={<AdminLogin />}></Route>
      <Route path="/doctorlogin" element={<DoctorLogin />}></Route>
      <Route path="/userlogin" element={<UserLogin />}></Route>
      <Route path="/usersignup" element={<UserSignup />}></Route>
      <Route path="/admin" element={<Admin></Admin>}></Route>
      <Route path="/form" element={<Form></Form>}></Route>
      <Route path="/otp" element={<OTP />}></Route>
      <Route
        path="/userotp"
        element={<Layout Component={UserOTP} type="admin" />}
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
        element={<Layout Component={PatientDescription} type="doctor" headerTextTop={"Patients's"}
          headerTextBottom={"Description"} />}
      ></Route>
      <Route
        path="/viewpatientdescription/:id"
        element={<ViewPatientDescription></ViewPatientDescription>}
      ></Route>
      <Route path="/patientform" element={<Layout Component={PatientForm} type="user" headerTextTop={"Patients's"}
        headerTextBottom={"Form"} />}></Route>
      <Route
        path="/showpatientform"
        element={<ShowPatientForm></ShowPatientForm>}
      ></Route>
      <Route
        path="/bookappointment"
        element={<Layout Component={DocAppointment} type="user" headerTextTop={"Book"}
          headerTextBottom={"Appointment"} />}
      ></Route>
      <Route
        path="/editappointment"
        element={<Layout Component={EditAppointment} type="user" headerTextTop={"Edit"}
          headerTextBottom={"Appointment"} />}
      ></Route>
      <Route
        path="/doctorform"
        element={<Layout Component={DoctorForm} type="admin" />}
      ></Route>
      <Route
        path="/editdoctorform"
        element={
          <Layout
            Component={EditDoctorForm}
            type="doctor"
            headerTextTop={"Doctor's"}
            headerTextBottom={"Form"}
          />
        }
      ></Route>
      <Route
        path="/editadminform"
        element={
          <Layout
            Component={EditAdminForm}
            type="admin"
            headerTextTop={"Admin's"}
            headerTextBottom={"Form"}
          />
        }
      ></Route>
      <Route
        path="/edituserform"
        element={<Layout Component={EditUserForm} type="user" headerTextTop={"User's"}
          headerTextBottom={"Form"} />}
      ></Route>
      <Route
        path="/editpatientform"
        element={<Layout Component={EditPatientForm} type="user" headerTextTop={"Patient's"}
          headerTextBottom={"Form"} />}
      ></Route>
      <Route
        path="/patientlistadmin"
        element={
          <Layout
            Component={PatientListAdmin}
            type="admin"
            headerTextTop={"Patient's"}
            headerTextBottom={"List"}
            search={"true"}
            AddButton={"true"}
          />
        }
      ></Route>
      <Route
        path="/patientlist"
        element={
          <Layout
            Component={PatientList}
            type="doctor"
            headerTextTop={"Patient's"}
            headerTextBottom={"List"}
            search={"true"}
          />
        }
      ></Route>
      <Route
        path="/patientlistuser"
        element={
          <Layout
            Component={PatientListUser}
            type="user"
            headerTextTop={"Patient's"}
            headerTextBottom={"List"}
            search={"true"}
            AddButton={"true"}
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
            search={"true"}
          />
        }
      >
        {" "}
      </Route>
      <Route
        path="/doctorlistadmin"
        element={
          <Layout
            Component={DoctorListAdmin}
            type="admin"
            headerTextTop={"Doctor's"}
            headerTextBottom={"List"}
            search={"true"}
            AddButton={"true"}
          />
        }
      ></Route>
      <Route
        path="/appointmentlist"
        element={
          <Layout
            Component={AppointmentList}
            type="doctor"
            headerTextTop={"Appointment"}
            headerTextBottom={"List"}
            search={"true"}
          />
        }
      ></Route>
      <Route
        path="/appointmentlistuser"
        element={<Layout Component={AppointmentListUser} type="user" headerTextTop={"Appointment"}
          headerTextBottom={"List"}
          search={"true"} />}
      ></Route>
      <Route path="/tabel" element={<Table></Table>}></Route>
    </Routes>
  );
}

export default App;
