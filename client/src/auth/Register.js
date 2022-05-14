import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div>
      {error && <p>{error}</p>}
      <form>
        <div>
          <div>Your Name</div>
          <div>
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
        <div>
          <div>Personal Details</div>
          <div>
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
        <div>
          <div>Identification</div>
          <div>
            <label htmlFor="date">Date of birth: </label>
            <input
              type="date"
              name="dob"
              value={data.dob}
              onChange={handleChange}
              id="date"
            />
            <label>Gender:</label>
            <input
              type="radio"
              name="gender"
              value="Male"
              id="male"
              onClick={handleChange}
            />
            <label htmlFor="male">Male</label>
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
        <div>
          <div>Address where you live</div>
          <div>
            <textarea
              name="address"
              value={data.address}
              onChange={handleChange}
              placeholder="Your Address"
            ></textarea>

            <input
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
        <div>
          <div>Authenticate Yourself</div>
          <div>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Your Email"
            />
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </div>
        </div>
        <div>
          <input
            type="checkbox"
            name="accept"
            id="accept"
            value={accept}
            onChange={() => setAccept(!accept)}
          />
          <label htmlFor="accept">
            I've read and accepted the terms and conditions*
          </label>
        </div>
        <button onClick={register} disabled={!accept}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
