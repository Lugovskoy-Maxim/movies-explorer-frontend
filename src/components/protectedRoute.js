import React from 'react';
import { Navigate} from 'react-router-dom';


function ProtectedRoute (props){
  if (!props.user === true) {
    return <Navigate to="/" replace />;
  } else if (props.path === "/signin"){
    return <Navigate to="/" replace />;
  }
  else if (props.path === "/signup"){
    return <Navigate to="/" replace />;
  }
  return props.children;
};

export default ProtectedRoute;
