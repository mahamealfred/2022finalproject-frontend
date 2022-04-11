import axios from "axios";
import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import {
    ADD_USER_REQUEST,
    ADD_USER_SUCCESS,
    ADD_USER_FAILURE,
  } from "../types/addUserTypes";
  

export const addUserAction = (data, history) => async (dispatch) => {
  try {
    dispatch(addUserRequest());
    const token = await localStorage.getItem("x-access-token");
    let headers;
    if (token) {
      headers = {
        "Content-Type": "application/json",
        token: `${token}`,
      };
    } else {
      headers = {
        "Content-Type": "application/json",
      };
    }

    console.log(headers);
    const res = await axios.post(
      `http://localhost:8000/auth/signup`,
      data,
      {
        headers: headers,
      }
    );
    const user = await res.data;
    console.log(data)
    dispatch(addUserSuccess({ data: user.data ,message:user.message}));
   alert('Account was successful created')
  } catch (err) {
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(addUserFailure(errorMessage));
    } else {
      dispatch(addUserFailure("Network  Error"));
    }
  }
};

export const addUserRequest = () => {
  return {
    type:  ADD_USER_REQUEST,
  };
};

export const addUserSuccess = (user) => {
  return {
    type:  ADD_USER_SUCCESS,
    payload: user,
  };
};
export const addUserFailure = (error) => {
  return {
    type:  ADD_USER_FAILURE,
    payload: error,
  };
};
