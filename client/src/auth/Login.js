import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
    setError("");
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
    <div>
      {error && <p>{error}</p>}
      <form>
        <input
          type="email"
          value={data.email}
          name="email"
          onChange={handleChange}
          placeholder="Enter your email"
        />
        <input
          type="password"
          value={data.password}
          name="password"
          onChange={handleChange}
          placeholder="Enter your password"
        />
        <button onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default Login;
