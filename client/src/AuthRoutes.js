import React from "react";
import { Navigate } from "react-router";

const UnauthRoute = function ({ children }) {
  const data = JSON.parse(localStorage.getItem("election-data"));

  return data ? <Navigate to="/u/dashboard" /> : children;
};

const UserRoute = ({ children }) => {
  const data = JSON.parse(localStorage.getItem("election-data"));

  return data ? children : <Navigate to="/login" />;
};

const CandidateRoute = ({ children }) => {
  const data = JSON.parse(localStorage.getItem("election-data"));

  return data.role === 1 ? children : <Navigate to="/u/dashboard" />;
};

const BLORoute = ({ children }) => {
  const data = JSON.parse(localStorage.getItem("election-data"));
  return data.role === 2 ? children : <Navigate to="/u/dashboard" />;
};

const RORoute = ({ children }) => {
  const data = JSON.parse(localStorage.getItem("election-data"));

  return data.role === 3 ? children : <Navigate to="/u/dashboard" />;
};

const AdminRoute = ({ children }) => {
  const data = JSON.parse(localStorage.getItem("election-data"));

  return data.role === 4 ? children : <Navigate to="/u/dashboard" />;
};

export {
  AdminRoute,
  BLORoute,
  CandidateRoute,
  RORoute,
  UnauthRoute,
  UserRoute,
};
