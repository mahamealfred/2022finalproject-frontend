import axios from "axios";

import {
    GET_AVAILABLEEXAMSDONE_REQUEST,
    GET_AVAILABLEEXAMSDONE_SUCCESS,
    GET_AVAILABLEEXAMSDONE_FAILURE,
  } from "../types/getAvailableExamsDoneTypes";

export const getAvailablePrimaryExamsDoneAction = () => async (dispatch) => {
  try {
    dispatch(examsRequest());
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

    const res = await axios.get(`http://localhost:8000/exams/primaryexams`, {
      headers: headers,
    });
    const exams = await res.data;
    dispatch(examsSuccess(exams.data));
    console.log(exams);
  } catch (err) {
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(examsFailure(errorMessage));
    } else {
      dispatch(examsFailure("Network  Error"));
    }
  }
};

export const examsRequest = () => {
  return {
    type: GET_AVAILABLEEXAMSDONE_REQUEST,
  };
};

export const examsSuccess = (exams) => {
  return {
    type: GET_AVAILABLEEXAMSDONE_SUCCESS,
    payload: exams,
  };
};
export const examsFailure = (error) => {
  return {
    type: GET_AVAILABLEEXAMSDONE_FAILURE,
    payload: error,
  };
};
