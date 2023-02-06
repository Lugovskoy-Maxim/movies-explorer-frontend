import React from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute(props) {
  const navigate = useNavigate();

  if (props.user === true && props.path === "/signup") {
    return navigate("/");
  }  else if (props.user === true && props.path === "/signin") {
    return navigate("/");
  } else if (!props.user && props.path === "/signin" ) {
    return props.children;
  } else if (!props.user && props.path === "/signup") {
    return props.children;
  } else return props.children;
}

export default ProtectedRoute;
