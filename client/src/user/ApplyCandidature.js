import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    console.log("Applying...");

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
    <div>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
      <form>
        {/* Personal Details */}
        <div>
          <div>Personal Details</div>
          <div>
            <input
              type="text"
              name="education"
              value={data.education}
              placeholder="Educational Qualification"
              onChange={handleChange}
            />
            <input
              type="text"
              name="employment"
              value={data.employment}
              placeholder="Current Employment"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Constituency */}
        <div>
          <div>Constiutency</div>
          <div>
            <p>Constituency where you are registered as voter</p>
            <select id="voterState" name="voterState" onChange={handleChange}>
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
          <div>
            <p>Constituency where you are applying as candidate</p>
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
          <div>
            <input
              type="text"
              name="party"
              value={data.party}
              onChange={handleChange}
              placeholder="Enter your Political Party"
            />
          </div>
        </div>

        {/* Eligibility Details */}
        <div>
          <div>Eligibility Details</div>
          <div>
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
          <div>
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
          <div>
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
          <div>
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
          <div>
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

        {/* Terms and Conditions */}
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

export default ApplyCandidature;
