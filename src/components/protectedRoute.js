import React from 'react';
import {  Navigate } from 'react-router-dom';

function ProtectedRoute (props){
  if (!props.user) {
    return <Navigate to="/" replace />;
  }

  return props.children;
};

export default ProtectedRoute;

// <Route
//   path="/profile"
//   element={<Profile
//     onSignOut={signOut}
//     updateUserInfo={updateUserInfo}
//   />}
// />

// <ProtectedRoute
//   loggedIn={loggedIn}
//   exact
//   path="/"
//   component={Main}
//   onEditProfile={handleEditProfileClick}
//   onEditAvatar={handleEditAvatarClick}
//   onAddPlace={handleAddPlaceClick}
//   cards={cards}
//   onCardLike={handleCardLike}
//   handlePreviewPopupClick={handlePreviewPopupClick}
//   onCardDelete={handleCardDeleteClick}
// />