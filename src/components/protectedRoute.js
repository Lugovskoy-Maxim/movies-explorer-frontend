import React from 'react';
import {  Navigate } from 'react-router-dom';

function ProtectedRoute (props){
  if (!props.user) {
    return <Navigate to="/" replace />;
  }

  return props.children;
};

export default ProtectedRoute;
