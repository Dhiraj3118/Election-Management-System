import React, { useEffect, useState } from "react";

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
      .then((data) => setCandidates(data.data))
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
    <div>
      {candidates.map((voter) => (
        <div key={voter.id}>
          <p>Name: {voter.name}</p>
          <p>Party: {voter.party}</p>
          <button onClick={() => approveCandidate(voter.id)}>
            Approve Candidate
          </button>
        </div>
      ))}
    </div>
  );
};

export default RO;
