import axios from "axios";
import {
  ADD_STUDENTS_REQUEST,
  ADD_STUDENTS_SUCCESS,
  ADD_STUDENTS_FAILURE,
} from "../types/addStudentTypes";

export const addStudentAction = (data, navigate) => async (dispatch) => {
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
    const res = await axios.post(
      `http://localhost:8000/students/newStudent/`,
      data,
      {
        headers: headers,
      }
    );

    const students = await res.data;
   const successMessage=await res.data.message
    console.log("success message",successMessage)
  dispatch(studentsSuccess(successMessage));
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
    type: ADD_STUDENTS_REQUEST,
  };
};

export const studentsSuccess = (students) => {
  return {
    type: ADD_STUDENTS_SUCCESS,
    payload: students,
  };
};
export const studentsFailure = (error) => {
  return {
    type: ADD_STUDENTS_FAILURE,
    payload: error,
  };
};
