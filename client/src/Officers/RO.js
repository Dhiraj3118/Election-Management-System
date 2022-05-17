import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import "./RO.css";
const RO = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const ls = JSON.parse(localStorage.getItem("election-data"));
    console.log("Getting Candidates List...");

    fetch("http://localhost:5000/ro/candidates-list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + ls.id,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCandidates(data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const approveCandidate = (id) => {
    const ls = JSON.parse(localStorage.getItem("election-data"));
    console.log("Approving Candidate...");

    const body = { candidateId: id };

    fetch("http://localhost:5000/ro/approve-candidate", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + ls.id,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then(
        (data) => data.success && console.log("Candidate Approved Successfully")
      )
      .catch((error) => console.log(error));
  };
  return (
    <>
      <Navbar />
      <div className="canbg">
        <div className="cantitle">
          {" "}
          <p>Approve Candidate</p>{" "}
        </div>
        <div className="Alldetails">
          {candidates.map((cand) => (
            <div className="canDetails" key={cand.id}>
              <p className="canName">Name: {cand.name}</p>
              <p className="canParty">Party: {cand.party}</p>
              <p className="canArea">
                {" "}
                Area: {cand.candCity} , {cand.candState}
              </p>
              <button
                className="AprCan"
                onClick={() => approveCandidate(cand.id)}
              >
                Approve Candidate
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RO;
