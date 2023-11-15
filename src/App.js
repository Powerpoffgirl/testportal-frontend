import './App.css';
// import Login from './components/login';
import Admin from './components/admin';
import Form from './components/Form';
import { Route, Routes } from "react-router-dom";
import OTP from './components/Otp';
import Qr from './components/Qr'
import UserForm from './components/userForm';
import UserAdmin from './components/userAdmin';
import DoctorDetail from './components/doctorDetail';
import PatientForm from './components/patientForm';
import DoctorForm from './components/doctorForm';
import PatientList from './components/patientList';
import DoctorList from './components/doctorList';
import DoctorLogin from './components/doctorLogin';
import AdminLogin from './components/adminLogin';
import UserLogin from './components/userLogin';
import DoctorListAdmin from './components/doctorListAdmin';
import AdminForm from './components/adminForm';
import EditDoctorForm from './components/editDoctorForm';
import EditAdminForm from './components/editAdminForm';
import UserOTP from './components/userOtp';
import PatientListUser from './components/patientListUser';
import BookAppointment from './components/bookAppointment';
import DoctorListUser from './components/doctorListUser';
import AppointmentListUser from './components/appointmentListUser';
import EditUserForm from './components/editUserForm';
import AppointmentList from './components/appointmentList';
import PatientDescription from './components/patientDescription';
import PatientListAdmin from './components/patientListAdmin';
import UserList from './components/userList';

function App()
{




  return (
    <Routes>
      <Route path='/' element={<DoctorList></DoctorList>}></Route>
      <Route path='/adminlogin' element={<AdminLogin></AdminLogin>}></Route>
      <Route path='/doctorlogin' element={<DoctorLogin></DoctorLogin>}></Route>
      <Route path='/userlogin' element={<UserLogin></UserLogin>}></Route>
      <Route path='/admin' element={<Admin></Admin>}></Route>
      <Route path='/form' element={<Form></Form>}></Route>
      <Route path='/otp' element={<OTP></OTP>}></Route>
      <Route path='/userotp' element={<UserOTP></UserOTP>}></Route>
      <Route path='/qr' element={<Qr></Qr>}></Route>
      <Route path='/userform' element={<UserForm></UserForm>}></Route>
      <Route path='/adminform' element={<AdminForm></AdminForm>}></Route>
      <Route path='/useradmin' element={<UserAdmin></UserAdmin>}></Route>
      <Route path='/doctordetail/:id' element={<DoctorDetail></DoctorDetail>}></Route>
      <Route path='/patientdescription/:id' element={<PatientDescription></PatientDescription>}></Route>
      <Route path='/patientform' element={<PatientForm></PatientForm>}></Route>
      <Route path='/bookappointment' element={<BookAppointment></BookAppointment>}></Route>
      <Route path='/doctorform' element={<DoctorForm></DoctorForm>}></Route>
      <Route path='/editdoctorform' element={<EditDoctorForm></EditDoctorForm>}></Route>
      <Route path='/editadminform' element={<EditAdminForm></EditAdminForm>}></Route>
      <Route path='/edituserform' element={<EditUserForm></EditUserForm>}></Route>
      <Route path='/patientlistadmin' element={<PatientListAdmin></PatientListAdmin>}></Route>
      <Route path='/patientlist' element={<PatientList></PatientList>}></Route>
      <Route path='/patientlistuser' element={<PatientListUser></PatientListUser>}></Route>
      <Route path='/doctorlist' element={<DoctorList></DoctorList>}></Route>
      <Route path='/userlistadmin' element={<UserList></UserList>}></Route>
      <Route path='/doctorlistuser' element={<DoctorListUser></DoctorListUser>}></Route>
      <Route path='/doctorlistadmin' element={<DoctorListAdmin></DoctorListAdmin>}></Route>
      <Route path='/appointmentlist' element={<AppointmentList></AppointmentList>}></Route>
      <Route path='/appointmentlistuser' element={<AppointmentListUser></AppointmentListUser>}></Route>

    </Routes>


  );
}

export default App;
