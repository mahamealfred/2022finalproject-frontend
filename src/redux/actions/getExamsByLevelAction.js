import axios from "axios";

import {
    GET_EXAMS_BYLEVEL_REQUEST,
    GET_EXAMS_BYLEVEL_SUCCESS,
    GET_EXAMS_BYLEVEL_FAILURE,
  } from "../types/getExamsByLevelTypes";

export const getExamsByLevel = () => async (dispatch) => {
  try {
    dispatch(getExamsRequest());
    const token = await localStorage.getItem("x-access-token");

     const headers = {
        "Content-Type": "application/json",
        token: `${token}`,
      };


    const res = await axios.get(`http://localhost:8000/exams/examsbylevel`, {
      headers: headers,
    });
    const exams = await res.data;
    dispatch(getExamsSuccess(exams.data));
  } catch (err) {
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(getExamsFailure(errorMessage));
    } else {
      dispatch(getExamsFailure("Network  Error"));
    }
  }
};

export const getExamsRequest = () => {
  return {
    type: GET_EXAMS_BYLEVEL_REQUEST,
  };
};

export const getExamsSuccess = (exams) => {
  return {
    type: GET_EXAMS_BYLEVEL_SUCCESS,
    payload: exams,
  };
};
export const getExamsFailure = (error) => {
  return {
    type: GET_EXAMS_BYLEVEL_FAILURE,
    payload: error,
  };
};
