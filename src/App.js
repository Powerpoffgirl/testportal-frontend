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

function App() {




  return (
    

      <Routes>
        <Route path='/' element={<Login></Login>}></Route>
        <Route path='/admin' element={<Admin></Admin>}></Route>
        <Route path='/form' element={<Form></Form>}></Route>
        <Route path='/otp' element={<OTP></OTP>}></Route>
        <Route path='/qr' element={<Qr></Qr>}></Route>
        <Route path='/userform' element={<UserForm></UserForm>}></Route>
        <Route path='/useradmin' element={<UserAdmin></UserAdmin>}></Route>
        <Route path='/doctordetail' element={<DoctorDetail></DoctorDetail>}></Route>
      </Routes>
    
   
  );
}

export default App;
