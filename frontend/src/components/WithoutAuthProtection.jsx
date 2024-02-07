import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

export function WithoutAuthProtection(WrappedComponent, redirectTo = "/") {
  return (props) => {
    const isAuthenticated = useAuthStore((state) => state.user);

    if (isAuthenticated) {
      return <Navigate to={redirectTo} />;
    }

    // Make sure WrappedComponent is a valid React component
    // and you're passing the correct props to it
    if (
      typeof WrappedComponent === "function" ||
      (WrappedComponent.prototype &&
        WrappedComponent.prototype.isReactComponent)
    ) {
      return <WrappedComponent {...props} />;
    } else {
      console.error("WrappedComponent is not a valid React component");
      return null;
    }
  };
}
