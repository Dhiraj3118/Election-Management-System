import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./user/Dashboard";
import { BLORoute, UnauthRoute, UserRoute } from "./AuthRoutes";
import Home from "./Home";
import ApplyCandidature from "./user/ApplyCandidature";
import ErrorPage from "./ErrorPage";
import Election from "./user/Election";
import BLO from "./Officers/BLO";
import RO from "./Officers/RO";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />

        {/* Unauthenticated routes */}
        <Route
          path="/login"
          exact
          element={
            <UnauthRoute>
              <Login />
            </UnauthRoute>
          }
        />
        <Route
          path="/register"
          element={
            <UnauthRoute>
              <Register />
            </UnauthRoute>
          }
          exact
        />

        {/* User Routes */}
        <Route
          path="/u/dashboard"
          element={
            <UserRoute>
              <Dashboard />
            </UserRoute>
          }
          exact
        />

        {/* Apply Candidate Page */}
        <Route
          path="/u/apply/:electionId"
          element={
            <UserRoute>
              <ApplyCandidature />
            </UserRoute>
          }
          exact
        />

        {/* Election Pages */}
        <Route
          path="/e/:electionId"
          element={
            <UserRoute>
              <Election />
            </UserRoute>
          }
          exact
        />

        {/* BLO Page */}
        <Route
          path="/b"
          element={
            <BLORoute>
              <BLO />
            </BLORoute>
          }
          exact
        />
        {/* RO Page */}
        <Route
          path="/r"
          element={
            <BLORoute>
              <RO />
            </BLORoute>
          }
          exact
        />

        {/* Error Page */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
