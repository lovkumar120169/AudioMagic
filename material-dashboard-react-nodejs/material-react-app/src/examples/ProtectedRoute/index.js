import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, redirectPath = "/authentication/sign-in", children }) => {

  if (!isAuthenticated) {
    return <Navigate to={"/authentication/sign-in"} replace />;
  }

  return children;
};

export default ProtectedRoute;
