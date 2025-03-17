import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Splash from "./components/splash";
import Home from "./pages/Home";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import UploadNotice from "./components/uploadnotice";
import Profile from "./pages/Profile";
import Teacher_List from "./pages/Teacher_List";
import Student_List from "./pages/Student_List";
import ShowNotices from "./components/shownotices";
import MyNotice from "./pages/MyNotice";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Splash} />
          <Route path="/home" Component={Home} />
          <Route path="/signup" Component={SignUp} />
          <Route path="/login" Component={Login} />
          <Route path="/uploadNotice" Component={UploadNotice} />
          <Route path="/profile" Component={Profile} />
          <Route path="/studentlist" Component={Student_List} />
          <Route path="/teacherList" Component={Teacher_List} />
          <Route path="/notices" Component={ShowNotices} />
          <Route path="/myNotices" Component={MyNotice} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
