import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/api/use-auth";
import { isAuthRoute } from './common/routePaths';
import HomepageSkeleton from "../components/skeleton-loaders/homepage-skeleton";

const AuthRoute = () => {
  const location = useLocation();
  const { data: authData, isLoading } = useAuth();
  const user = authData?.user;

  const _isAuthRoute = isAuthRoute(location.pathname);

  // Only show the homepage skeleton while loading if we're on an auth-only route.
  if (isLoading && _isAuthRoute) return <HomepageSkeleton />;

  // If a user exists, send them to the public home page — include state so
  // the home page can optionally enable extra features for authenticated users.
  if (user)
    return (
      <Navigate to="/" replace state={{ fromAuthRedirect: true }} />
    );

  return <Outlet />;
};

export default AuthRoute;