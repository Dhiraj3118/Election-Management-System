import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./auth/Logo.png";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const [links, setLinks] = useState([]);

  useEffect(() => {
    let arr = [{ name: "Dashboard", href: "/u/dashboard" }];
    const role = JSON.parse(localStorage.getItem("election-data")).role;
    switch (role) {
      case 2:
        arr = [...arr, { name: "Voter's List", href: "/b" }];
        break;
      case 3:
        arr = [...arr, { name: "Candidates's List", href: "/r" }];
        break;
      case 4:
        arr = [...arr, { name: "Admin Dashboard", href: "/a" }];
        break;

      default:
        break;
    }

    setLinks(arr);
  }, []);

  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="navbar">
      <div className="navlogo">
        <img src={Logo} alt="Logo" />
        <p>Vote India</p>
      </div>
      <div className="links">
        {links.map((link) => (
          <Link key={link.href} to={link.href}>
            {link.name}
          </Link>
        ))}
      </div>
      <div className="logout">
        <button onClick={logOut}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
