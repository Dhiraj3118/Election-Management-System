import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import "./Dashboard.css";
const Dashboard = () => {
  const [electionList, setElectionList] = useState([]);
  const [role, setRole] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const ls = JSON.parse(localStorage.getItem("election-data"));
    setRole(ls.role);
    fetch("http://localhost:5000/election/list", {
      headers: {
        Authorization: "Bearer " + ls.id,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setElectionList(data.data);
          setLoading(false);
        } else {
          setError(data.msg);
          setLoading(false);
        }
      });
  }, []);

  const declareResults = (e, electionId) => {
    const ls = JSON.parse(localStorage.getItem("election-data"));
    const body = { electionId };
    console.log(body);
    fetch(
      "http://localhost:5000/admin/declare-results?electionId=" + electionId,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + ls.id,
        },
        body: JSON.stringify(body),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log("Results Declared");
          e.target.textContent = "Declared";
        } else {
          setError(data.msg);
          setLoading(false);
        }
      });
  };
  return (
    <>
      <Navbar />
      <div className="dashboard">
        <h1 className="title">Current Elections List</h1>
        <div id="bg">
          {error && <p>{error}</p>}
          {loading && <p className="success">Loading...</p>}
          {!loading && electionList.length === 0 && (
            <p className="noElection">Currently no elections are going on</p>
          )}
          {!loading &&
            electionList &&
            electionList.map((election) => (
              <div className="detail" key={election.id}>
                <p className="ename"> Election name: {election.name}</p>
                <p className="date"> Date: {election.startDate}</p>
                <div>
                  <button className="button">
                    <Link className="link" to={"/e/" + election.id}>
                      View
                    </Link>
                  </button>
                  <button className="button">
                    <Link className="link" to={"/u/apply/" + election.id}>
                      Apply as Candidate
                    </Link>
                  </button>
                  {role == 4 && (
                    <button
                      className="button"
                      onClick={(e) => declareResults(e, election.id)}
                    >
                      {election.declared ? "Declared" : "Declare Results"}
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
