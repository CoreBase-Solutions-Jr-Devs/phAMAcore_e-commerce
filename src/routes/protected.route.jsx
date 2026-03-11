import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/api/use-auth";
import HomepageSkeleton from "../components/skeleton-loaders/homepage-skeleton";

const ProtectedRoute = () => {
  const { data: authData, isLoading } = useAuth();
  const user = authData;

  if (isLoading) {
    return <HomepageSkeleton />;
  }

  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;