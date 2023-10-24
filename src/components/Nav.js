// working nav bar

// import React from "react";
// import ReactDOM from "react-dom/client";
// import SCPlogo from "./assets/SCP logo.png";
// import { Link, useMatch, useResolvedPath } from "react-router-dom";
// import SubButton from "./SubButton";
// import "./Nav.css";
// import Home from "./pages/Home";
// import { Route, Routes } from "react-router-dom";
// import styles from "./styles.css";

// export default function Nav() {
//   return (
//     <nav className="navBar">
//       <img src={SCPlogo} id="scpLogo" alt="SCP logo" />
//       <Link to="/" className="site-title">
//         SCP Foundation
//       </Link>
//       <ul>
//         <NavLink to="/Scp049">SCP-049</NavLink>
//         <NavLink to="/Scp096">SCP-096</NavLink>
//         <NavLink to="/Scp106">SCP-106</NavLink>
//         <NavLink to="/Scp173">SCP-173</NavLink>
//         <NavLink to="/Scp682">SCP-682</NavLink>
//       </ul>
//     </nav>
//   );
// }

// function NavLink({ to, children, ...props }) {
//   const resolvedPath = useResolvedPath(to);
//   const isActive = useMatch({ path: resolvedPath.pathname, end: true });

//   return (
//     <li className={isActive ? "active" : ""}>
//       <Link to={to} {...props}>
//         {children}
//       </Link>
//     </li>
//   );
// }

import React, { useState } from "react";
import SCPlogo from "../assets/SCP logo.png";
// import { Link, NavLink, useMatch, useResolvedPath } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import "../styles/App.css";
import "../styles/Nav.css";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav>
        <img src={SCPlogo} id="scpLogo" alt="SCP logo" />

        <Link to="/" className="site-title">
          SCP Foundation
        </Link>

        <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <ul className={menuOpen ? "open" : ""}>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/CRUD">CRUD</NavLink>
          </li>
          <li>
            <NavLink to="/UploadJSON">Upload JSON</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

// function CustomLink({ to, children, ...props }) {
//   const resolvedPath = useResolvedPath(to);
//   const isActive = useMatch({ path: resolvedPath.pathname, end: true });

//   return (
//     <li className={isActive ? "active" : ""}>
//       <Link to={to} {...props}>
//         {children}
//       </Link>
//     </li>
//   );
// }
