import './App.css';
import Login from './components/login';
import Admin from './components/admin';
import Sidebar from './components/sidebar';
import { Route, Routes } from "react-router-dom";

function App() {




  return (
    

      <Routes>
        <Route path='/' element={<Login></Login>}></Route>
        <Route path='/admin' element={<Sidebar></Sidebar>}></Route>
      </Routes>
    
   
  );
}

export default App;
