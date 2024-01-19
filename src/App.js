import "./App.css";
// import Login from './components/login';
import Admin from "./components/admin";
import Form from "./components/Form";
import { Route, Routes } from "react-router-dom";
import OTP from "./components/Otp";
import Qr from "./components/Qr";
import BillingPage from "./components/billingPage";
import BillingPrice from "./components/billingPrice";
import Summary from "./components/Summary";
import TestListPage from "./components/testlistpage";
import UserForm from "./components/userForm";
import UserAdmin from "./components/userAdmin";
import DoctorDetail from "./components/doctorDetail";
import PatientForm from "./components/patientForm";
import DoctorForm from "./components/doctorForm";
import DoctorFormAdmin from "./components/doctorFormAdmin";
import PatientList from "./components/patientList";
import DoctorList from "./components/doctorList";
import DoctorLogin from "./components/doctorLogin";
import AdminLogin from "./components/adminLogin";
import UserLogin from "./components/userLogin";
import DoctorListAdmin from "./components/doctorListAdmin";
import TermsOfServices from "./components/TermsOfServices";
import PrivacyPolicy from "./components/privacyPolicy";
import RegisterPatient from "./components/registerPatient";
// import AdminForm from "./components/adminForm";
import EditDoctorForm from "./components/editDoctorForm";
import EditAdminlistform from "./components/editAdminlistform";
import EditDoctorFormAdmin from "./components/editDoctorFormAdmin";
import EditAdminForm from "./components/editAdminForm";
import UserOTP from "./components/userOtp";
import PatientListUser from "./components/patientListUser";
import DoctorListUser from "./components/doctorListUser";
import AppointmentListUser from "./components/appointmentListUser";
import AppointmentListAdmin from "./components/AppointmentListAdmin";
import EditUserForm from "./components/editUserForm";
import EditPatientFormAdmin from "./components/editPatientFormAdmin";
import AppointmentList from "./components/appointmentList";
import PatientDescription from "./components/patientDescription";
import DescriptionSummary from "./components/descriptionSummary";
import PatientListAdmin from "./components/patientListAdmin";
import UserList from "./components/userList";
import ShowPatientForm from "./components/showPatientForm";
import EditAppointment from "./components/editAppointment";
import EditAppointmentAdmin from "./components/editAppointmentAdmin";
import ViewPatientDescription from "./components/viewPatientDescription";
import UserSignup from "./components/userSignup";
import DocAppointment from "./components/docAppointment";
import Table from "./components/tabel";
// import Sidebar2 from './components/Sidebar2';
import Layout from "./components/Layout";
// import Table2 from "./components/table2";
import EditPatientForm from "./components/editPatientForm";
import ForgetPassword from "./components/forgetpassword";
import OtpVerify from "./components/otpverify";
import SuperAdminLogin from "./components/superadminLogin";
import EditAppointmentSuperAdmin from "./components/editAppointmentSuperAdmin";
import SuperAdminEditForm from "./components/superadmineditform";
import SuperAdminEditList from "./components/superadmineditlist";
import SuperAdminAdminList from "./components/superadminadminlist";
import SuperAdminUserForm from "./components/superadminuserform";
import SuperAdminUserList from "./components/superadminuserlist";
import SuperAdminPatientForm from "./components/superadminpatientform";
import SuperAdminAppointmentList from "./components/superadminappointmentlist";
import SuperAdminDoctorForm from "./components/superadmindoctorform";
import SuperAdminDoctorList from "./components/superadmindoctorlist";
import SuperAdminPatientList from "./components/superadminpatientlist";
import SuperAdminAdminForm from "./components/superadminadminform";
import SuperAdminDoctorEditForm from "./components/superadmindoctoreditform";
import SuperAdminAdminEditForm from "./components/superadminadmineditform";
import SuperAdminPatientEditForm from "./components/superadminpatienteditform";
import SuperAdminUserEditForm from "./components/superadminusereditform";
import SuperAdminDoctorOtpPage from "./components/superadmindoctorotppage";
import SuperAdminOtp from "./components/superadminotp";
import Pagenotfound from "./components/pagenotfound";
import { ToastContainer } from "react-toastify";
import UserProfile from "./components/userProfile";

function App()
{
  return (
    <>
      <ToastContainer />
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
              type="superAdmin"
              headerTextTop={"Super Admin"}
              headerTextBottom={"Edit Form"}
            />
          }
        />
        <Route path="/termsofservices" element={<TermsOfServices />}></Route>
        <Route path="/privacypolicy" element={<PrivacyPolicy />}></Route>
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
              type="superAdmin"
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
              type="superAdmin"
              headerTextTop={"Super Admin"}
              headerTextBottom={"Admin Form"}
            />
          }
        />
        <Route
          path="/superadminadmineditform"
          element={
            <Layout
              Component={SuperAdminAdminEditForm}
              headerTextTop={"Super Admin Admin"}
              headerTextBottom={"Edit Form"}
            />
          }
        />
        <Route
          path="/superadmindoctoreditform"
          element={
            <Layout
              type="superAdmin"
              Component={SuperAdminDoctorEditForm}
              headerTextTop={"Super Admin"}
              headerTextBottom={"Edit Doctor Form"}
            />
          }
        />
        <Route
          path="/superadminuserlist"
          element={
            <Layout
              Component={SuperAdminUserList}
              type="superAdmin"
              headerTextTop={"Super Admin"}
              headerTextBottom={"User List"}
              search={"true"}
            // AddButton={"true"}
            />
          }
        />
        <Route
          path="/superadminusereditform"
          element={
            <Layout
              type="superAdmin"
              Component={SuperAdminUserEditForm}
              headerTextTop={"Super Admin User"}
              headerTextBottom={"Edit Form"}
            />
          }
        />
        <Route
          path="/superadminpatientlist"
          element={
            <Layout
              Component={SuperAdminPatientList}
              type="superAdmin"
              headerTextTop={"Super Admin"}
              headerTextBottom={"Patient List"}
              search={"true"}
            // AddButton={"true"}
            />
          }
        />
        <Route
          path="/superadminappointmentlist"
          element={
            <Layout
              Component={SuperAdminAppointmentList}
              type="superAdmin"
              headerTextTop={"Super Admin"}
              headerTextBottom={"Appointment List"}
              search={"true"}
            // AddButton={"true"}
            />
          }
        />
        <Route
          path="/superadminpatientform"
          element={
            <Layout
              type="superAdmin"
              Component={SuperAdminPatientForm}
              headerTextTop={"Super Admin"}
              headerTextBottom={"Patient Form"}
            />
          }
        />
        <Route
          path="/superadmindoctorlist"
          element={
            <Layout
              Component={SuperAdminDoctorList}
              type="superAdmin"
              headerTextTop={"Super Admin"}
              headerTextBottom={"Doctor List"}
              search={"true"}
            // AddButton={"true"}
            />
          }
        />
        <Route
          path="/superadminappointmentlist"
          element={
            <Layout
              Component={SuperAdminAppointmentList}
              type="superAdmin"
              headerTextTop={"Super Admin"}
              headerTextBottom={"Appointment List"}
              search={"true"}
            // AddButton={"true"}
            />
          }
        />
        <Route
          path="/superadmindoctorform"
          element={
            <Layout
              Component={SuperAdminDoctorForm}
              type="superAdmin"
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
              type="superAdmin"
              headerTextTop={"Super Admin"}
              headerTextBottom={"Doctor List"}
              search={"true"}
            // AddButton={"true"}
            />
          }
        />
        {/* <Route
        path="/superadmindoctorotppage"
        element={
          <Layout
            Component={SuperAdminDoctorOtpPage}
            headerTextTop={"Super Admin"}
            headerTextBottom={"Doctor Otp"}
          />
        }
      /> */}
        <Route
          path="/superadminotp"
          element={
            <Layout
              Component={SuperAdminOtp}
              headerTextTop={"Super Admin"}
              headerTextBottom={"Otp"}
            />
          }
        />
        <Route path="/userotp" element={<UserOTP />}></Route>
        <Route
          path="/qr"
          element={
            <Layout
              Component={Qr}
              type="admin"
              headerTextTop={"Doctor's"}
              headerTextBottom={"QR Code"}
            />
          }
        ></Route>
        <Route
          path="/userform"
          element={<Layout Component={UserForm} type="user" />}
        ></Route>
        <Route
          path="/useradmin"
          element={<Layout Component={UserAdmin} type="admin" />}
        ></Route>
        <Route
          path="/doctordetail/:id"
          element={<Layout Component={DoctorDetail} />}
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
          path="/descriptionsummary"
          element={
            <Layout
              Component={DescriptionSummary}
              type="doctor"
              headerTextTop={"Patients's"}
              headerTextBottom={"Description"}
            />
          }
        ></Route>
        '
        <Route
          path="/registerpatient"
          element={
            <Layout
              Component={RegisterPatient}
              type="doctor"
              headerTextTop={"Lab Patient"}
              headerTextBottom={"Registration"}
            />
          }
        ></Route>
        <Route
          path="/billing"
          element={
            <Layout
              Component={BillingPage}
              type="doctor"
              headerTextTop={"Patients's"}
              headerTextBottom={"Billing"}
            />
          }
        ></Route>
        <Route
          path="/billingPrice"
          element={
            <Layout
              Component={BillingPrice}
              type="doctor"
              headerTextTop={"Patients's"}
              headerTextBottom={"Billing"}
            />
          }
        ></Route>
        <Route
          path="/summary"
          element={
            <Layout
              Component={Summary}
              type="doctor"
              headerTextTop={"Patients's"}
              headerTextBottom={"Summary"}
            />
          }
        ></Route>
        <Route
          path="/testlist"
          element={
            <Layout
              Component={TestListPage}
              type="doctor"
              headerTextTop={"Lab Test"}
              headerTextBottom={"List"}
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
          path="/editadminlistform"
          element={
            <Layout
              Component={EditAdminlistform}
              type="superAdmin"
              headerTextTop={"Edit"}
              headerTextBottom={"Admin Form"}
            />
          }
        ></Route>
        <Route
          path="/editappointmentadmin"
          element={
            <Layout
              Component={EditAppointmentAdmin}
              type="admin"
              headerTextTop={"Edit"}
              headerTextBottom={"Appointment"}
            />
          }
        ></Route>
        <Route
          path="/doctorform"
          element={
            <Layout
              Component={DoctorForm}
              type="admin"
              headerTextTop={"Doctor's"}
              headerTextBottom={"Form"}
            />
          }
        ></Route>
        <Route
          path="/doctorformadmin"
          element={
            <Layout
              Component={DoctorFormAdmin}
              type="admin"
              headerTextTop={"Doctor's"}
              headerTextBottom={"Form"}
            />
          }
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
          path="/editdoctorformadmin"
          element={
            <Layout
              Component={EditDoctorFormAdmin}
              type="admin"
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
              headerTextTop={"Book"}
              headerTextBottom={"Appointment"}
            />
          }
        ></Route>
        <Route
          path="/userprofile"
          element={
            <Layout
              Component={UserProfile}
              type="user"
              headerTextTop={"User"}
              headerTextBottom={"Profile"}
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
          path="/editpatientformadmin"
          element={
            <Layout
              Component={EditPatientFormAdmin}
              type="admin"
              headerTextTop={"Edit Patient's"}
              headerTextBottom={"Form"}
            />
          }
        ></Route>
        <Route
          path="/editappointmentsuperadmin"
          element={
            <Layout
              Component={EditAppointmentSuperAdmin}
              type="superAdmin"
              headerTextTop={"Edit Appointment"}
              headerTextBottom={"Super Admin"}
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
        <Route
          path="/doctorlist"
          element={
            <Layout
              Component={DoctorList}
              type="user"
              headerTextTop={"Doctor's"}
              headerTextBottom={"List"}
            />
          }
        ></Route>
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
        <Route path="*" element={<Pagenotfound></Pagenotfound>}></Route>
      </Routes>
    </>
  );
}

export default App;
