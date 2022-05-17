import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import Logo from "./Logo.png";
import hide from "./hide.png";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [pswd, setPswd] = useState("password");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
    setError("");
  };

  const showPassword = (e) => {
    e.preventDefault();
    if (pswd == "password") setPswd("text");
    else setPswd("password");
  };

  const handleLogin = (e) => {
    e.preventDefault();

    console.log("Logging IN...");

    fetch("http://localhost:5000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data);
          console.log("Login Successful");
          localStorage.setItem(
            "election-data",
            JSON.stringify({
              email: data.data.email,
              area: data.data.area,
              name: data.data.name,
              id: data.data.id,
              role: data.data.role,
              state: data.data.state,
            })
          );

          navigate("/u/dashboard");
        } else {
          setError(data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className="main">
      <div className="inner">
        <div>
          <img src={Logo} alt="Logo" />
        </div>
        <div className="right-form">
          {error && <p>{error}</p>}
          <form className="">
            <h1>Login</h1>
            <input
              type="email"
              value={data.email}
              name="email"
              onChange={handleChange}
              placeholder="Enter your email"
            />
            <div className="inputDiv">
              <input
                type={pswd}
                value={data.password}
                name="password"
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <span className="eye" onClick={(e) => showPassword(e)}>
                <img src={hide} alt="eye" />
              </span>
            </div>
            <Link to="/login">Forgot password ?</Link>
            <button className="loginBtn" onClick={handleLogin}>
              Login
            </button>
            <p>
              Don't have an account?
              <Link to="/register">Create an account</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
