import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import "./ApplyCandidature.css";

const ApplyCandidature = () => {
  const params = useParams();
  const [data, setData] = useState({
    education: "",
    employment: "",
    voterArea: "",
    voterState: "",
    candArea: "",
    candState: "",
    party: "",
    citizenship: "",
    contestedBefore: "",
    casePendingInCourt: "",
    guiltyForCrime: "",
    licensedWeapon: "",
  });
  const [accept, setAccept] = useState(false);
  const [areaData, setAreaData] = useState([]);
  const [states, setStates] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
    setError("");
  };

  const register = (e) => {
    e.preventDefault();

    const ls = JSON.parse(localStorage.getItem("election-data"));
    setData({ ...data, name: ls.name, electionId: params.electionId });
    console.log("Applying...", data);

    fetch("http://localhost:5000/candidate/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + ls.id,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log("Applied Successfully");
          setSuccess("Applied Successfully");
          setError("");
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
    <>
      <Navbar />
      <div className="main-cand">
        {error && <p>{error}</p>}
        {success && <p className="success">{success}</p>}
        <div className="navbar-cand">
          <p>Candidate Registration Form</p>
        </div>
        <form>
          {/* Personal Details */}
          <div className="form-per">
            <div className="head-cand">
              <p>Personal Details</p>
            </div>
            <br />
            <hr />
            <br />
            <div className="perDet">
              <div className="perDet-1">
                <label htmlFor="education">Educational Qualification : </label>
                <input
                  type="text"
                  name="education"
                  value={data.education}
                  placeholder="Enter Your Response Here"
                  onChange={handleChange}
                />
              </div>
              <div className="perDet-2">
                <label htmlFor="employment">
                  Current Employment &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;:{" "}
                </label>
                <input
                  type="text"
                  name="employment"
                  value={data.employment}
                  placeholder="Enter Your Response Here"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <br />
          <hr />
          {/* Constituency */}
          <div className="form-const">
            <div className="head-const">
              <p>Constiutency</p>
            </div>
            <br />
            <hr />
            <br />
            <div className="const">
              <div className="const-1">
                <p className="const-11">
                  Constituency where you are registered as voter &nbsp; &nbsp;
                  &nbsp;:{" "}
                </p>
                <select
                  id="voterState"
                  name="voterState"
                  onChange={handleChange}
                >
                  <option>Select State</option>
                  {states &&
                    states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                </select>
                <select name="voterArea" id="voterArea" onChange={handleChange}>
                  <option>Select City</option>
                  {areaData
                    .filter((area) => area.State === data.voterState)
                    .map(({ City }) => (
                      <option key={City} value={City}>
                        {City}
                      </option>
                    ))}
                </select>
              </div>
              <div className="const-2">
                <p className="const-21">
                  Constituency where you are applying as candidate :{" "}
                </p>
                <select id="candState" name="candState" onChange={handleChange}>
                  <option>Select State</option>
                  {states &&
                    states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                </select>
                <select name="candArea" id="candArea" onChange={handleChange}>
                  <option>Select City</option>
                  {areaData
                    .filter((area) => area.State === data.candState)
                    .map(({ City }) => (
                      <option key={City} value={City}>
                        {City}
                      </option>
                    ))}
                </select>
              </div>
              <div className="party">
                <label htmlFor="party">
                  Enter your Political Party &ensp; &ensp; &ensp; &ensp; &ensp;
                  &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; :{" "}
                </label>
                <input
                  type="text"
                  name="party"
                  value={data.party}
                  onChange={handleChange}
                  placeholder="Enter Your Response Here"
                />
              </div>
            </div>
          </div>
          <br />
          <hr />
          {/* Eligibility Details */}
          <div className="elig">
            <div className="head-elig">
              <p>Eligibility Details</p>
            </div>
            <br />
            <hr />
            <div className="elig-1">
              <div className="elig-11">
                <p>How you aquired Indian Citizenship?</p>
                <input
                  type="radio"
                  name="citizenship"
                  id="citi-1"
                  value="By Birth"
                  onChange={handleChange}
                />
                <label htmlFor="citi-1">By Birth</label>
                <input
                  type="radio"
                  name="citizenship"
                  id="citi-2"
                  value="Naturalized Citizen"
                  onChange={handleChange}
                />
                <label htmlFor="citi-2">Naturalized Citizen</label>
              </div>
              <div className="elig-12">
                <p>Have you ever contested in election before?</p>
                <input
                  type="radio"
                  name="contestedBefore"
                  id="cb-1"
                  value="No"
                  onChange={handleChange}
                />
                <label htmlFor="cb-1">No</label>
                <input
                  type="radio"
                  name="contestedBefore"
                  id="cb-2"
                  value="Yes"
                  onChange={handleChange}
                />
                <label htmlFor="cb-2">Yes</label>
              </div>
              <div className="elig-13">
                <p>
                  Is there any case pending against you in any public court of
                  india?
                </p>
                <input
                  type="radio"
                  name="casePendingInCourt"
                  id="cpc-1"
                  value="No"
                  onChange={handleChange}
                />
                <label htmlFor="cpc-1">No</label>
                <input
                  type="radio"
                  name="casePendingInCourt"
                  id="cpc-2"
                  value="Yes"
                  onChange={handleChange}
                />
                <label htmlFor="cpc-2">Yes</label>
              </div>
              <div className="elig-14">
                <p>Have you ever been found guilty of any crime?</p>
                <input
                  type="radio"
                  name="guiltyForCrime"
                  id="gfc-1"
                  value="No"
                  onChange={handleChange}
                />
                <label htmlFor="gfc-1">No</label>
                <input
                  type="radio"
                  name="guiltyForCrime"
                  id="gfc-2"
                  value="Yes"
                  onChange={handleChange}
                />
                <label htmlFor="gfc-2">Yes</label>
              </div>
              <div className="elig-15">
                <p>Do you posses a licenced weapon?</p>
                <input
                  type="radio"
                  name="licensedWeapon"
                  id="lw-1"
                  value="No"
                  onChange={handleChange}
                />
                <label htmlFor="lw-1">No</label>
                <input
                  type="radio"
                  name="licensedWeapon"
                  id="lw-2"
                  value="Yes"
                  onChange={handleChange}
                />
                <label htmlFor="lw-2">Yes</label>
              </div>
            </div>
          </div>
          <br />
          <hr />
          {/* Terms and Conditions */}
          <div className="terms">
            <input
              type="checkbox"
              name="accept"
              id="accept"
              value={accept}
              onChange={() => setAccept(!accept)}
            />
            <label htmlFor="accept">
              I've read and accept the <span>terms and conditions*</span>
            </label>
          </div>
          <button onClick={register} disabled={!accept} className="RegCandbtn">
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default ApplyCandidature;
