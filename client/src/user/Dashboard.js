import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [electionList, setElectionList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const ls = JSON.parse(localStorage.getItem("election-data"));
    fetch("http://localhost:5000/election/list", {
      headers: {
        Authorization: "Bearer " + ls.id,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data.data);
          setElectionList(data.data);
        } else {
          setError(data.msg);
        }
      });
    setLoading(false);
  }, []);
  return (
    <div>
      <h1>Current Elections List</h1>
      <div>
        {error && <p>{error}</p>}
        {loading && <p>Loading...</p>}
        {!loading && electionList === [] && (
          <p>Currently no elections are going on</p>
        )}
        {!loading &&
          electionList &&
          electionList.map((election) => (
            <div key={election.id}>
              <p>{election.name}</p>
              <p>Date: {election.startDate}</p>
              <Link to={"/e/" + election.id}>View</Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
