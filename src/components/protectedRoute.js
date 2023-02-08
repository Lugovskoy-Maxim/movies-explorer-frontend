import React from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute(props) {
  const navigate = useNavigate();

  if (props.user === true && props.path === "/signup") { // пользователь залогинен
    return navigate("/");
  }  else if (props.user === true && props.path === "/signin") { // пользователь залогинен
    return navigate("/");
  } else if (!props.user && props.path === "/signin" ) { // пользователь не залогинен
    return props.children
  } else if (!props.user && props.path === "/signup") { // пользователь не залогинен
    return props.children
  }  else if (!props.user && props.path === "/profile") { // пользователь не залогинен
    return navigate("/");
  } else return props.children;
}

export default ProtectedRoute;
