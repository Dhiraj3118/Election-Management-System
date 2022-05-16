import React, { useEffect, useState } from "react";
import './BLO.css'
const BLO = () => {
  const [voters, setVoters] = useState([]);

  useEffect(() => {
    const ls = JSON.parse(localStorage.getItem("election-data"));
    console.log("Getting Voters List...");

    fetch("http://localhost:5000/blo/get-voters", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + ls.id,
      },
    })
      .then((res) => res.json())
      .then((data) => setVoters(data.data))
      .catch((error) => console.log(error));
  }, []);

  const verifyVoter = (id) => {
    const ls = JSON.parse(localStorage.getItem("election-data"));
    console.log("Verifying Voter...");

    const body = { userId: id };

    fetch("http://localhost:5000/blo/verify-voter", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + ls.id,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then(
        (data) => data.success && console.log("Voter Verified Successfully")
      )
      .catch((error) => console.log(error));
  };
  return (
    <div className="voterbg">
      <div className = "votertitle"> <p>Verify Voter</p> </div>
      <div className = "voterAllDetails">
          {voters.map((voter) => (
            <div className = "voterDetail" key={voter.id}>
              <p className="vname">Name: {voter.name}</p>
              <p className="vaddress">Address: {voter.address}</p>
              <button className = "voteButton"onClick={() => verifyVoter(voter.id)}>Verify Voter</button>
            </div>
          ))}
      </div>
      
    </div>
  );
};

export default BLO;
