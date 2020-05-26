import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: {
    accessToken: null,
    userId: 0,
    secretMessage: null,
    errorMessage: null,
  },
};

export const user = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setAccessToken: (state, action) => {
      const { accessToken } = action.payload;
      console.log(`Access Token: ${accessToken}`);
      state.login.accessToken = accessToken;
    },
    setUserId: (state, action) => {
      const { userId } = action.payload;
      console.log(`User Id: ${userId}`);
      state.login.userId = userId;
    },
    setSecretMessage: (state, action) => {
      const { secretMessage } = action.payload;
      console.log(`Secret Message: ${secretMessage}`);
      state.login.secretMessage = secretMessage;
    },
    setErrorMessage: (state, action) => {
      const { errorMessage } = action.payload;
      console.log(`Secret Message: ${errorMessage}`);
      state.login.errorMessage = errorMessage;
    },
    clearErrorMessage: (state, action) => {
      state.login.errorMessage = null;
    },
  },
});

export const login = (name, password) => {
  const LOGIN_URL = "http://localhost:8080/sessions";
  return (dispatch) => {
    fetch(LOGIN_URL, {
      method: "POST",
      body: JSON.stringify({ name, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw "Unable to sign in.  Please check your username and password are correct";
      })
      .then((json) => {
        dispatch(user.actions.clearErrorMessage());

        // Save the login info
        dispatch(
          user.actions.setAccessToken({ accessToken: json.accessToken })
        );
        dispatch(user.actions.setUserId({ userId: json.userId }));
      })
      .catch((err) => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err }));

        // Clear login values
        dispatch(logout());
      });
  };
};

export const signup = (name, password) => {
  const SIGNUP_URL = "http://localhost:8080/users";
  return (dispatch) => {
    fetch(SIGNUP_URL, {
      method: "POST",
      body: JSON.stringify({ name, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw "Unable to signup.  Try another username.";
      })
      .then((json) => {
        dispatch(user.actions.clearErrorMessage());

        // Save the login info
        dispatch(
          user.actions.setAccessToken({ accessToken: json.accessToken })
        );
        dispatch(user.actions.setUserId({ userId: json.userId }));
      })
      .catch((err) => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err }));

        // Clear login values
        dispatch(logout());
      });
  };
};

export const getSecretMessage = () => {
  const USERS_URL = "http://localhost:8080/users";
  return (dispatch, getState) => {
    const accessToken = getState().user.login.accessToken;
    const userId = getState().user.login.userId;

    fetch(`${USERS_URL}/${userId}/secret`, {
      method: "GET",
      headers: { Authorization: accessToken },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw "Could not get information.  Make sure you are logged in and try again.";
      })
      .then((json) => {
        dispatch(
          user.actions.setSecretMessage({ secretMessage: JSON.stringify(json) })
        );
      })
      .catch((err) => {
        const errorMessage = JSON.stringify(err);
        dispatch(user.actions.setErrorMessage({ errorMessage }));
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(user.actions.setAccessToken({ accessToken: null }));
    dispatch(user.actions.setSecretMessage({ secretMessage: null }));
    dispatch(user.actions.setUserId({ userId: 0 }));
  };
};
