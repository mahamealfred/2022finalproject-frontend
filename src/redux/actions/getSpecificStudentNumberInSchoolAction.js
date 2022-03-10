import axios from "axios";
import {
    GET_SPECIFICNUMBERSTUDENTS_REQUEST,
    GET_SPECIFICNUMBERSTUDENTS_SUCCESS,
    GET_SPECIFICNUMBERSTUDENTS_FAILURE,
  } from "../types/getSpecificStudentNumberInSchoolTypes";

export const getSpecificStudentNumberInSchoolAction = () => async (dispatch) => {
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

    const res = await axios.get(`http://localhost:8000/students/numbers`, {
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
      dispatch(studentsFailure("Network  Error"));
    }
  }
};

export const studentsRequest = () => {
  return {
    type: GET_SPECIFICNUMBERSTUDENTS_REQUEST,
  };
};

export const studentsSuccess = (students) => {
  return {
    type: GET_SPECIFICNUMBERSTUDENTS_SUCCESS,
    payload: students,
  };
};
export const studentsFailure = (error) => {
  return {
    type: GET_SPECIFICNUMBERSTUDENTS_FAILURE,
    payload: error,
  };
};
