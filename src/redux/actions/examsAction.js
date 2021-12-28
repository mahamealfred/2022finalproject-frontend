import axios from "axios";

import {
  EXAMS_REQUEST,
  EXAMS_SUCCESS,
  EXAMS_FAILURE,
} from "../types/examsTypes";

export  const getAllExam = () => async (dispatch) => {
  try {
    dispatch(examsRequest());
    const token = await localStorage.getItem("token");
    let headers;
    if (token) {
      headers = {
        "Content-Type": "application/json",
        "token": `${token}`,
      };
    } else {
      headers = {
        "Content-Type": "application/json",
      };
    }
  
    const res = await axios.get(`http://localhost:8000/exams`,
    {
      headers: headers,
    });
    const exams = await res.data;
    dispatch(examsSuccess(exams.data ));
    console.log(exams)

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
    type: EXAMS_REQUEST,
  };
};

export const examsSuccess = (exams) => {
  return {
    type: EXAMS_SUCCESS,
    payload: exams,
  };
};
export const examsFailure = (error) => {
  return {
    type: EXAMS_FAILURE,
    payload: error,
  };
};