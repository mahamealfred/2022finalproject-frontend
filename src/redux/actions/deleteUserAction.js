import axios from "axios";
import {
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE,
  } from "../types/deleteUserTypes";

export const deleteUserAction = (id) => async (dispatch) => {
  try {
    dispatch(deleteUserRequest());
    const token = await localStorage.getItem("token");
    let headers;
    if (token) {
      headers = {
        "Content-Type": "application/json",
        "my-token": `${token}`,
      };
    } else {
      headers = {
        "Content-Type": "application/json",
      };
    }
    await axios.delete(`http://localhost:8000/auth/${id}`, {
      headers: headers,
    });
    dispatch(deleteUserSuccess());
   
  } catch (err) {
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(deleteUserFailure(errorMessage));
    } else {
      dispatch(deleteUserFailure("Network  Error"));
    }
  }
};

export const deleteUserRequest = () => {
  return {
    type: DELETE_USER_REQUEST,
  };
};

export const deleteUserSuccess = (deleteUser) => {
  return {
    type: DELETE_USER_SUCCESS,
    payload: deleteUser,
  };
};
export const deleteUserFailure = (error) => {
  return {
    type: DELETE_USER_FAILURE,
    payload: error,
  };
};