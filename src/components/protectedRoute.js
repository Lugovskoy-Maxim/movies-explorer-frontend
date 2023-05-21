import React from "react";
import { useNavigate } from "react-router-dom";

// function ProtectedRoute({ user, path, children }) {
//   console.log(user, path, children);
//   const navigate = useNavigate();

//   if (!user) {
//     if (path === '/signin' || path === '/signup') {
//       return navigate('/');
//     } else {
//       return children;
//     }
//   } else {
//     return navigate('/');
//   }
// }

// export default ProtectedRoute;

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
  }  else if (!props.user) { // пользователь не залогинен
    return navigate("/");
  } else return props.children;
}

export default ProtectedRoute;



