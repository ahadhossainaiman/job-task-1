/* eslint-disable react/prop-types */
import { useContext } from "react";
import { UserContext } from "../provider/AuthProviders";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  if (loading) {
    return <span className="loading loading-ring loading-lg mx-auto"></span>;
  }
  if (user) {
    return children;
  } else {
    return <Navigate to="/login" replace={true} />;
  }
};

export default PrivateRoutes;
