import React, { useState } from "react";
import Profile from "./Profile";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "../reducers/user";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {};

  if (!accessToken) {
    // If user is logged out, show login form
    return (
      <div>
        <Profile />
        <form>
          <h1>sign up</h1>
          <label>
            name
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <label>
            password
            <input
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              dispatch(signup(name, password));
            }}
          >
            Sign-Up
          </button>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              dispatch(login(name, password));
            }}
          >
            Login
          </button>
        </form>
      </div>
    );
  } else {
    // If user is logged in, show profile
    return <Profile />;
  }
};
export default LoginForm;
