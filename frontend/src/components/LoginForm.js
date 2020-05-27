import React, { useState } from 'react';
import Profile from './Profile';
import { useDispatch, useSelector } from 'react-redux';
import { user, login } from '../reducers/user';
const SIGNUP_URL = 'http://localhost:8080/users';
const LOGIN_URL = 'http://localhost:8080/sessions';

export const LoginForm = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  // To sign up a user.
  const handleSignup = (event) => {
    event.preventDefault();

    fetch(SIGNUP_URL, {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (!res.ok) {
          throw 'Could not create account.  Try a different username.';
        }
        return res.json();
      })
      .then((json) => {
        // Save the login info
        dispatch(
          user.actions.setAccessToken({
            accessToken: json.accessToken,
          })
        );
        dispatch(user.actions.setUserId({ userId: json.userId }));
      })
      .catch((err) => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err }));
      });
  };

  // To sign in a user.
  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(login(name, password));
  };

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
          <button type="submit" onClick={handleSignup}>
            Sign-Up
          </button>
          <button type="submit" onClick={handleLogin}>
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
