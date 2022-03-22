import axios from "axios";
import {
    GET_STUDENTSNUMBERS_REQUEST,
    GET_STUDENTSNUMBERS_SUCCESS,
    GET_STUDENTSNUMBERS_FAILURE,
  } from "../types/getAllStudentNumbersTypes";

export const getAllStudentNumbersAction = () => async (dispatch) => {
  try {
    dispatch(studentsRequest());
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

    const res = await axios.get(`http://localhost:8000/students/studentnumbers`, {
      headers: headers,
    });
    const students = await res.data;
    dispatch(studentsSuccess(students.data));
    console.log(students);
  } catch (err) {
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(studentsFailure(errorMessage));
    } else {
      dispatch(studentsFailure("Network Error"));
    }
  }
};

export const studentsRequest = () => {
  return {
    type: GET_STUDENTSNUMBERS_REQUEST,
  };
};

export const studentsSuccess = (students) => {
  return {
    type: GET_STUDENTSNUMBERS_SUCCESS,
    payload: students,
  };
};
export const studentsFailure = (error) => {
  return {
    type: GET_STUDENTSNUMBERS_FAILURE,
    payload: error,
  };
};
