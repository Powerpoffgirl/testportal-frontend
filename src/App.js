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
import AppointmentListAdmin from "./components/AppointmentListAdmin";
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
import ForgetPassword from "./components/forgetpassword";
import OtpVerify from "./components/otpverify";
import SuperAdminLogin from "./components/superadminLogin";
import SuperAdminEditForm from "./components/superadmineditform";
import SuperAdminEditList from "./components/superadmineditlist";
import SuperAdminAdminList from "./components/superadminadminlist";
import SuperAdminUserForm from "./components/superadminuserform";
import SuperAdminUserList from "./components/superadminuserlist";
import SuperAdminPatientForm from "./components/superadminpatientform";
import SuperAdminAppointmentList from "./components/superadminappointmentlist";
import SuperAdminAppointmentForm from "./components/superadminappointmentform";
import SuperAdminDoctorForm from "./components/superadmindoctorform";
import SuperAdminDoctorList from "./components/superadmindoctorlist";
import SuperAdminPatientList from "./components/superadminpatientlist";
import SuperAdminAdminForm from "./components/superadminadminform";

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
      <Route path="/forgetpassword" element={<ForgetPassword />} />
      <Route path="/otpverify" element={<OtpVerify />} />
      <Route path="/superadminlogin" element={<SuperAdminLogin />} />
      <Route
        path="/superadmineditform"
        element={
          <Layout
            Component={SuperAdminEditForm}
            headerTextTop={"Super Admin"}
            headerTextBottom={"Edit Form"}
          />
        }
      />

      <Route
        path="/superadmineditlist"
        element={
          <Layout
            Component={SuperAdminEditList}
            headerTextTop={"Super Admin"}
            headerTextBottom={"Edit List"}
            search={"true"}
            AddButton={"true"}
          />
        }
      />

      <Route
        path="/superadminadminlist"
        element={
          <Layout
            Component={SuperAdminAdminList}
            headerTextTop={"Super Admin"}
            headerTextBottom={"Admin List"}
            search={"true"}
            AddButton={"true"}
          />
        }
      />

      <Route
        path="/superadminadminform"
        element={
          <Layout
            Component={SuperAdminAdminForm}
            headerTextTop={"Super Admin"}
            headerTextBottom={"Admin Form"}
          />
        }
      />

      <Route
        path="/superadminuserform"
        element={
          <Layout
            Component={SuperAdminUserForm}
            headerTextTop={"Super Admin"}
            headerTextBottom={"User Form"}
          />
        }
      />

      <Route
        path="/superadminuserlist"
        element={
          <Layout
            Component={SuperAdminUserList}
            headerTextTop={"Super Admin"}
            headerTextBottom={"User List"}
            search={"true"}
            AddButton={"true"}
          />
        }
      />

      <Route
        path="/superadminpatientform"
        element={
          <Layout
            Component={SuperAdminPatientForm}
            headerTextTop={"Super Admin"}
            headerTextBottom={"Patient Form"}
          />
        }
      />

      <Route
        path="/superadminpatientlist"
        element={
          <Layout
            Component={SuperAdminPatientList}
            headerTextTop={"Super Admin"}
            headerTextBottom={"Patient List"}
            search={"true"}
            AddButton={"true"}
          />
        }
      />

      <Route
        path="/superadminappointmentlist"
        element={
          <Layout
            Component={SuperAdminAppointmentList}
            headerTextTop={"Super Admin"}
            headerTextBottom={"Appointment List"}
            search={"true"}
            AddButton={"true"}
          />
        }
      />

      <Route
        path="/superadminappointmentform"
        element={
          <Layout
            Component={SuperAdminAppointmentList}
            headerTextTop={"Super Admin"}
            headerTextBottom={"Appointment form"}
          />
        }
      />

      <Route
        path="/superadmindoctorform"
        element={
          <Layout
            Component={SuperAdminDoctorForm}
            headerTextTop={"Super Admin"}
            headerTextBottom={"Doctor Form"}
          />
        }
      />

      <Route
        path="/superadmindoctorlist"
        element={
          <Layout
            Component={SuperAdminDoctorList}
            headerTextTop={"Super Admin"}
            headerTextBottom={"Doctor List"}
            search={"true"}
            AddButton={"true"}
          />
        }
      />

      <Route
        path="/userotp"
        element={
          <Layout
            Component={UserOTP}
            headerTextTop={"Verify"}
            headerTextBottom={"OTP"}
          />
        }
      ></Route>
      <Route
        path="/qr"
        element={<Layout Component={Qr} type="admin" headerTextTop={"Doctor's"}
          headerTextBottom={"QR Code"} />}
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
        element={
          <Layout
            Component={PatientDescription}
            type="doctor"
            headerTextTop={"Patients's"}
            headerTextBottom={"Description"}
          />
        }
      ></Route>
      <Route
        path="/viewpatientdescription/:id"
        element={<ViewPatientDescription></ViewPatientDescription>}
      ></Route>
      <Route
        path="/patientform"
        element={
          <Layout
            Component={PatientForm}
            type="user"
            headerTextTop={"Member's"}
            headerTextBottom={"Form"}
          />
        }
      ></Route>
      <Route
        path="/showpatientform"
        element={<ShowPatientForm></ShowPatientForm>}
      ></Route>
      <Route
        path="/bookappointment"
        element={
          <Layout
            Component={DocAppointment}
            type="user"
            headerTextTop={"Book"}
            headerTextBottom={"Appointment"}
          />
        }
      ></Route>
      <Route
        path="/editappointment"
        element={
          <Layout
            Component={EditAppointment}
            type="user"
            headerTextTop={"Edit"}
            headerTextBottom={"Appointment"}
          />
        }
      ></Route>
      <Route
        path="/doctorform"
        element={<Layout Component={DoctorForm} type="admin" headerTextTop={"Doctor's"}
          headerTextBottom={"Form"} />}
      ></Route>
      <Route
        path="/editdoctorform"
        element={
          <Layout
            Component={EditDoctorForm}
            type="doctor"
            headerTextTop={"Edit Doctor's"}
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
        element={
          <Layout
            Component={EditUserForm}
            type="user"
            headerTextTop={"Edit User's"}
            headerTextBottom={"Form"}
          />
        }
      ></Route>
      <Route
        path="/editpatientform"
        element={
          <Layout
            Component={EditPatientForm}
            type="user"
            headerTextTop={"Edit Member's"}
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
            headerTextTop={"Member's"}
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
        element={
          <Layout
            Component={AppointmentListUser}
            type="user"
            headerTextTop={"Appointment"}
            headerTextBottom={"List"}
            search={"true"}
          />
        }
      ></Route>
      <Route
        path="/appointmentlistadmin"
        element={
          <Layout
            Component={AppointmentListAdmin}
            type="admin"
            headerTextTop={"Appointment"}
            headerTextBottom={"List"}
            search={"true"}
          />
        }
      ></Route>
      <Route path="/tabel" element={<Table></Table>}></Route>
    </Routes>
  );
}

export default App;
