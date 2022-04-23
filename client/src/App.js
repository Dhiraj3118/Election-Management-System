import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./user/Dashboard";
import { UnauthRoute, UserRoute } from "./AuthRoutes";
import Home from "./Home";
import ApplyCandidature from "./user/ApplyCandidature";

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
        <Route
          path="/u/dashboard"
          element={
            <UserRoute>
              <ApplyCandidature />
            </UserRoute>
          }
          exact
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
