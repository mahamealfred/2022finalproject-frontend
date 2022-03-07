import axios from "axios";

import {
    GET_EXAMS_BYID_REQUEST,
    GET_EXAMS_BYID_SUCCESS,
    GET_EXAMS_BYID_FAILURE,
  } from "../types/getExamAndQuestionByIdTypes";
export const getExamsAndQuestionByLevel = (id) => async (dispatch) => {
  try {
    dispatch(getExamsRequest());
    const token = await localStorage.getItem("x-access-token");

     const headers = {
        "Content-Type": "application/json",
        token: `${token}`,
      };


    const res = await axios.get(`http://localhost:8000/exams/examsbylevel/${id}`, {
      headers: headers,
    });
    const exams = await res.data;
    dispatch(getExamsSuccess(exams.data));
  } catch (err) {
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(getExamsFailure(errorMessage));
    } else {
      dispatch(getExamsFailure("Network h Error"));
    }
  }
};

export const getExamsRequest = () => {
  return {
    type: GET_EXAMS_BYID_REQUEST,
  };
};

export const getExamsSuccess = (exams) => {
  return {
    type: GET_EXAMS_BYID_SUCCESS,
    payload: exams,
  };
};
export const getExamsFailure = (error) => {
  return {
    type: GET_EXAMS_BYID_FAILURE,
    payload: error,
  };
};
