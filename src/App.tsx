// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";

import ProtectedRoute from "./component/ProtectedRoute";
import { AccessDenied } from "./pages/accessDenied";
import HomePage from "./pages/homePage";
import UserTables from "./pages/userTable";
import Tables from "./pages/Tables";
import Login from "./pages/Login";
import CustomerTable from "./pages/customerTable";
import TokenTable from "./pages/tokenTable";

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
          element={
            <ProtectedRoute
              element={<Tables />}
              requiredRoles={["user", "admin"]}
            /> // Protect /tables route
          }
        />
        <Route
          path="/userTable"
          element={
            <ProtectedRoute
              element={<UserTables />}
              requiredRoles={["user", "admin"]}
            /> // Protect /tables route
          }
        />
        <Route
          path="/customerTable"
          element={
            <ProtectedRoute
              element={<CustomerTable />}
              requiredRoles={["user", "admin"]}
            /> // Protect /tables route
          }
        />
        <Route
          path="/tokenTable"
          element={
            <ProtectedRoute
              element={<TokenTable />}
              requiredRoles={["user", "admin"]}
            /> // Protect /tables route
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              element={<UserTables />}
              requiredRoles={["admin"]}
            />
          } // Example: Admin role access
        />
      </Routes>
    </Router>
  );
};

export default App;
