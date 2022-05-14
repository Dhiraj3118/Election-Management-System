import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      Error 404. Back to <Link to="/u/dashboard">Home</Link>
    </div>
  );
};

export default ErrorPage;
