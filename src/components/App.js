import React from "react";
import Nav from "./Nav";
import { Routes, Route } from "react-router-dom";
import "../styles/App.css";
import Home from "../pages/Home.js";
import CRUD from "../pages/CRUD.js";
import UploadJSON from "../pages/UploadJSON.js";

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
          </Routes>
        </div>
      </>
    </>
  );
}

export default App;
