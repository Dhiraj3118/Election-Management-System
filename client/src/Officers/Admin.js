import React, { useState } from "react";
import Navbar from "../Navbar";
import "./Admin.css";
const Admin = () => {
  const [election, setElection] = useState({
    startDate: Date.now(),
    endDate: Date.now(),
    name: "",
    state: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setElection({ ...election, [name]: value });
  };

  const createElection = (e) => {
    e.preventDefault();
    const ls = JSON.parse(localStorage.getItem("election-data"));
    console.log("Creating Election...");

    fetch("http://localhost:5000/admin/create-election", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + ls.id,
      },
      body: JSON.stringify(election),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log("Election created successfully");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Navbar />
      <div className="electionPage">
        <div className="createDiv">
          <h1>Create Election</h1>
          <form className="electionForm">
            <div>
              <label htmlFor="name">Election Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={election.name}
                onChange={handleChange}
                placeholder="Election Name"
              />
            </div>

            <div>
              <label htmlFor="start">Start Date</label>
              <input
                type="date"
                name="startDate"
                id="start"
                value={election.startDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="end">End Date</label>
              <input
                type="date"
                name="endDate"
                id="end"
                value={election.endDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                name="state"
                value={election.state}
                onChange={handleChange}
                placeholder="State"
              />
            </div>
            <button className="loginBtn" onClick={createElection}>
              Create Election
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Admin;
