import React, { useState, useEffect } from "react";
import { logout, getSecretMessage } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";

export const Profile = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const userId = useSelector((store) => store.user.login.userId);
  const secretMessage = useSelector((store) => store.user.login.secretMessage);
  const errorMessage = useSelector((store) => store.user.login.errorMessage);

  return (
    <div>
      <h1>Profile</h1>
      <h2>Status :</h2>
      {errorMessage && <p>Error Message: {`${errorMessage}`}</p>}
      {secretMessage && <p>Secret Message: {`${secretMessage}`}</p>}
      <h4>userId :</h4>
      <p> {`${userId}`}</p>
      <h4>accessToken :</h4>
      <p> {`${accessToken}`}</p>
      <input
        type="submit"
        onClick={(e) => dispatch(getSecretMessage())}
        value="Get Secret Message"
      />
      <input type="submit" onClick={(e) => dispatch(logout())} value="Logout" />
    </div>
  );
};
export default Profile;
