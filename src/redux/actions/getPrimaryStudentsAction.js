import axios from "axios";

import {
    GET_PRIMARY_STUDENTS_REQUEST,
    GET_PRIMARY_STUDENTS_SUCCESS,
    GET_PRIMARY_STUDENTS_FAILURE,
  } from "../types/getPrimaryStudentTypes";

export const getAllPrimaryStudents = () => async (dispatch) => {
  try {
    dispatch(primaryStudentsRequest());
    const token = await localStorage.getItem("token");
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

    const res = await axios.get(`http://localhost:8000/students/primary`, {
      headers: headers,
    });
    const students = await res.data;
    dispatch(primaryStudentsSuccess(students.data));
    console.log(students);
  } catch (err) {
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(primaryStudentsFailure(errorMessage));
    } else {
      dispatch(primaryStudentsFailure("Network  Error"));
    }
  }
};

export const primaryStudentsRequest = () => {
  return {
    type:  GET_PRIMARY_STUDENTS_REQUEST,
  };
};

export const primaryStudentsSuccess = (students) => {
  return {
    type:  GET_PRIMARY_STUDENTS_SUCCESS,
    payload: students,
  };
};
export const primaryStudentsFailure = (error) => {
  return {
    type:  GET_PRIMARY_STUDENTS_FAILURE,
    payload: error,
  };
};
