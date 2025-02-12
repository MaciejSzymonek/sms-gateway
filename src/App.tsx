// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./component/ProtectedRoute";
import { AccessDenied } from "./pages/accessDenied";
import HomePage from "./pages/homePage";
import Tables from "./pages/Tables";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Public route */}
        <Route path="/login" element={<Login />} /> {/* Public route */}
        <Route path="/register" element={<Register />} /> {/* Public route */}
        <Route path="/access-denied" element={<AccessDenied />} />{" "}
        {/* Public route */}
        {/* Protected routes */}
        <Route
          path="/tables"
          element={<Home />}
          /* element={
            <ProtectedRoute
              element={<Tables />}
              requiredRoles={["user", "admin"]}
            /> // Protect /tables route
          } */
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute element={<Tables />} requiredRoles={["admin"]} />
          } // Example: Admin role access
        />
      </Routes>
    </Router>
  );
};

export default App;
