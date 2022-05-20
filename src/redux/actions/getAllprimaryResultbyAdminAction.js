import axios from "axios";
import {
    GET_PRIMARYRESULTBY_ADMIN_REQUEST,
    GET_PRIMARYRESULTBY_ADMIN_SUCCESS,
    GET_PRIMARYRESULTBY_ADMIN_FAILURE,
  } from "../types/getAllprimaryResultbyAdminTypes";

export const getAllprimaryResultbyAdminAction = () => async (dispatch) => {
  try {
    dispatch(studentsresultRequest());
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

    const res = await axios.get(`http://localhost:8000/results/getprimarylevelstudentsresults`, {
      headers: headers,
    });
    const results = await res.data;
    dispatch(studentsresultSuccess(results.data));
  } catch (err) {
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(studentsresultFailure(errorMessage));
    } else {
      dispatch(studentsresultFailure("Network Error"));
    }
  }
};

export const studentsresultRequest = () => {
  return {
    type: GET_PRIMARYRESULTBY_ADMIN_REQUEST,
  };
};

export const studentsresultSuccess = (students) => {
  return {
    type: GET_PRIMARYRESULTBY_ADMIN_SUCCESS,
    payload: students,
  };
};
export const studentsresultFailure = (error) => {
  return {
    type: GET_PRIMARYRESULTBY_ADMIN_FAILURE,
    payload: error,
  };
};
