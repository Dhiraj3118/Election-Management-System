import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Election = () => {
  const params = useParams();
  const electionId = params.electionId;
  // const [electionData, setElectionData] = useState({});
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(
      `http://localhost:5000/election/election-candidates?electionId=${electionId}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // console.log(data.data);
          setCandidates(data.data);
        } else {
          setError(data.msg);
        }
      });
    setLoading(false);
  }, [electionId]);

  const voteCandidate = (e, candId) => {
    e.preventDefault();

    const ls = JSON.parse(localStorage.getItem("election-data"));
    const data = {
      electionId: electionId,
      candidateId: candId,
    };
    console.log("Casting Vote...");

    fetch("http://localhost:5000/election/cast-vote", {
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
          console.log("Voted to ", candId);
        } else {
          console.log(data.error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
      {candidates &&
        candidates.map((c) => (
          <div key={c.id}>
            <p>{c.name}</p>
            <p>{c.party}</p>
            <p>
              {c.candArea}, {c.candState}
            </p>
            <button onClick={(e) => voteCandidate(e, c.id)}>Vote</button>
          </div>
        ))}
    </div>
  );
};

export default Election;
