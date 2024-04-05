import React from "react";
import Nav from "./Nav";
import { Routes, Route } from "react-router-dom";
import "../styles/App.css";
import Home from "../pages/Home.js";
import CRUD from "../pages/CRUD.js";
import UploadJSON from "../pages/UploadJSON.js";
import Gallery from "../pages/Gallery.js";
import SignIn from "../pages/SignIn.js";
import SignUp from "../pages/SignUp.js";
import Profile from "../pages/Profile.js";
import "../styles/App.css";

function App() {
  return (
    <>
      <>
        <Nav />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/CRUD" element={<CRUD />} />
            <Route path="/UploadJSON" element={<UploadJSON />} />
            <Route path="/Gallery" element={<Gallery />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Profile" element={<Profile />} />
          </Routes>
        </div>
      </>
    </>
  );
}

export default App;
