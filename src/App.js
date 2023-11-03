import './App.css';
import Login from './components/login';
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

function App()
{




  return (

    <Routes>
      <Route path='/' element={<Login></Login>}></Route>
      <Route path='/doctorlogin' element={<DoctorLogin></DoctorLogin>}></Route>
      <Route path='/admin' element={<Admin></Admin>}></Route>
      <Route path='/form' element={<Form></Form>}></Route>
      <Route path='/otp' element={<OTP></OTP>}></Route>
      <Route path='/qr' element={<Qr></Qr>}></Route>
      <Route path='/userform' element={<UserForm></UserForm>}></Route>
      <Route path='/useradmin' element={<UserAdmin></UserAdmin>}></Route>
      <Route path='/doctordetail' element={<DoctorDetail></DoctorDetail>}></Route>
      <Route path='/patientform' element={<PatientForm></PatientForm>}></Route>
      <Route path='/doctorform' element={<DoctorForm></DoctorForm>}></Route>
      <Route path='/patientlist' element={<PatientList></PatientList>}></Route>
      <Route path='/doctorlist' element={<DoctorList></DoctorList>}></Route>
    </Routes>


  );
}

export default App;
