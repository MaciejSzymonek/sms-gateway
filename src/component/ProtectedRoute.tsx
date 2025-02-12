import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { verify } from "./ApiManager"; // Import your verification function

interface ProtectedRouteProps {
  element: JSX.Element;
  requiredRoles: string[]; // Allow multiple roles
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  requiredRoles,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await verify(); // Call your async verification function
        console.log(response);
        if (response.success) {
          setUserRole(response.role); // Set user role
          localStorage.setItem("AccessToken", response.token);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  // Show a loading state while verifying
  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Show a loading UI
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    console.log("User is not authenticated.");
    //window.location.replace("http://localhost:5173/access-denied");
    return <Navigate to="/access-denied" />;
  }

  // Check if user's role is in the allowed roles array
  if (!requiredRoles.includes(userRole!)) {
    console.log("Access denied for role:", userRole);
    //window.location.replace("http://localhost:5173/access-denied");
    return <Navigate to="/access-denied" />;
  }

  // Allow access if authenticated and role matches
  return element;
};

export default ProtectedRoute;
