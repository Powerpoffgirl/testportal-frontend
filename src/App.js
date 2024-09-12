import { Route, Routes } from "react-router-dom";
import "./App.css";
import UserLogin from './components/userLogin';
import UserProfile from "./components/userProfile";
import Dashboard from "./components/dashboard";
import Topics from "./components/topics";

function App()
{
  return (
    <>
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/usersignup" element={<UserProfile />} />
        {/* Dashboard Route */}
        <Route path="/dashboard" element={<Dashboard />}>
          {/* Dynamic route for chapter and topics */}
          <Route path=":chapterName/:topicName/:topicId" element={<Topics />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
