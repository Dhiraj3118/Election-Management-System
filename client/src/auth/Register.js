import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import hide from "./hide.png";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    fname: "",
    mname: "",
    lname: "",
    fatherName: "",
    motherName: "",
    mobileNo: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    email: "",
    password: "",
  });

  const [accept, setAccept] = useState(false);
  const [error, setError] = useState("");
  const [areaData, setAreaData] = useState([]);
  const [states, setStates] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
    setError("");
  };

  const register = (e) => {
    e.preventDefault();

    console.log("Registering...");

    let body = data;
    body["name"] = data.fname + " " + data.mname + " " + data.lname;
    delete body["fname"];
    delete body["mname"];
    delete body["lname"];

    fetch("http://localhost:5000/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log("User Registered Successfully");

          navigate("/login");
        } else {
          setError(data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetch("http://localhost:5000/user/get-states")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAreaData(data.data);
          const statesArr = [...new Set(data.data.map((item) => item.State))];
          setStates(statesArr);
        } else {
          setError(data.msg);
        }
      });
  }, []);

  return (
    <div className="main-Reg">
      {error && <p>{error}</p>}
      <div className="regTitle">
        <p>Voter Registration Form</p>
      </div>
      <form>
        <div className="Name">
          <div className="Name-1-field">
            <p>Name</p>
            <p id="det-name">Giva a full name</p>
          </div>
          <div className="Name-2-field">
            <div>
              <p>1</p>
            </div>
          </div>
          <div className="Name-3-field">
            <input
              type="text"
              name="fname"
              value={data.fname}
              placeholder="First Name"
              onChange={handleChange}
            />
            <input
              type="text"
              name="mname"
              value={data.mname}
              placeholder="Middle Name"
              onChange={handleChange}
            />
            <input
              type="text"
              name="lname"
              value={data.lname}
              placeholder="Last Name"
              onChange={handleChange}
            />
          </div>
        </div>
        <br />
        <hr />
        <div className="Details">
          <div className="det-1-field">
            <p>
              Personal <br /> Details
            </p>
          </div>
          <div className="det-2-field">
            <p>2</p>
          </div>
          <div className="det-3-field">
            <input
              type="text"
              name="fatherName"
              value={data.fatherName}
              placeholder="Father's Name"
              onChange={handleChange}
            />
            <input
              type="text"
              name="motherName"
              value={data.motherName}
              placeholder="Mother's Name"
              onChange={handleChange}
            />
            <input
              type="number"
              name="mobileNo"
              value={data.mobileNo}
              placeholder="Mobile Number"
              onChange={handleChange}
            />
          </div>
        </div>
        <br />
        <hr />
        <div className="Identity">
          <div className="iden-1-field">
            <p>Identification</p>
            <p id="det-identity">
              provide your <br /> birthdate and <br /> gender
            </p>
          </div>
          <div className="iden-2-field">
            <p>3</p>
          </div>
          <div className="iden-3-field">
            <div className="dob">
              <label htmlFor="date" className="dob-1">
                Date of birth :{" "}
              </label>
              <input
                className="dob-2"
                type="date"
                name="dob"
                value={data.dob}
                onChange={handleChange}
                id="date"
              />
            </div>
            <div className="gender">
              <div className="gen-1">
                <label> Gender :</label>
              </div>
              <div className="gen-2">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  id="male"
                  onClick={handleChange}
                />
                <label htmlFor="male">Male</label>
              </div>
              <div className="gen-3">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  id="female"
                  onClick={handleChange}
                />
                <label htmlFor="female">Female</label>
              </div>
            </div>
          </div>
        </div>
        <br />
        <hr />
        <div className="Address">
          <div className="adr-1-field">
            <p>Address</p>
            <p id="det-adr">where you live</p>
          </div>
          <div className="adr-2-field">
            <p>4</p>
          </div>
          <div className="adr-3-field">
            <textarea
              className="adr-1"
              name="address"
              value={data.address}
              onChange={handleChange}
              placeholder="Your Address"
            ></textarea>

            <div className="adr-2">
              <input
                id="pin-code"
                type="number"
                name="pincode"
                value={data.pincode}
                onChange={handleChange}
                placeholder="Pincode"
              />

              <select id="state" name="state" onChange={handleChange}>
                <option>Select State</option>
                {states &&
                  states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
              </select>

              <select name="city" id="city" onChange={handleChange}>
                <option>Select City</option>
                {areaData
                  .filter((area) => area.State === data.state)
                  .map(({ City }) => (
                    <option key={City} value={City}>
                      {City}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
        <br />
        <hr />
        <div className="Auth">
          <div className="Auth-1-field">
            <p>
              Authenticate <br /> Yourself
            </p>
          </div>
          <div className="Auth-2-field">
            <p>5</p>
          </div>
          <div className="Auth-3-field">
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Your Email"
            />
            <input
              className="password"
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Password"
            />
            <span className="eye_form">
              <img src={hide} alt="eye" />
            </span>
          </div>
        </div>
        <br />
        <hr />
        <br />
        <div className="checkbox">
          <input
            className="check"
            type="checkbox"
            name="accept"
            id="accept"
            value={accept}
            onChange={() => setAccept(!accept)}
          />
          <label htmlFor="accept" style={{ margin: 0 }}>
            I've read and accepted the <span>terms and conditions*</span>
          </label>
        </div>
        <button onClick={register} disabled={!accept} className="Regbtn">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
