import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './election.css'
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
          <div className = "cid" key={c.id}>
            <div className="nameparty">   
              <p className = "np">{c.name}</p>
              <p className = "np" id = "party">{c.party}</p>
            </div>
              <p className = "area">
                {c.candArea}, {c.candState}
              </p>
            <button className = "Button" onClick={(e) => voteCandidate(e, c.id)}>+ VOTE</button>
          </div>
        ))}
    </div>
  );
};

export default Election;
