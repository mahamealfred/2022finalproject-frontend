import axios from "axios";

import {
  STUDENTS_REQUEST,
  STUDENTS_SUCCESS,
  STUDENTS_FAILURE,
} from "../types/studentsTypes";

export  const getAllStudent = () => async (dispatch) => {
  try {
    dispatch(studentsRequest());
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
  
    const res = await axios.get(`http://localhost:8000/students`,
    {
      headers: headers,
    });
    const students = await res.data;
    dispatch(studentsSuccess(students.data ));
    console.log(students)

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
    type: STUDENTS_REQUEST,
  };
};

export const studentsSuccess = (students) => {
  return {
    type: STUDENTS_SUCCESS,
    payload: students,
  };
};
export const studentsFailure = (error) => {
  return {
    type: STUDENTS_FAILURE,
    payload: error,
  };
};