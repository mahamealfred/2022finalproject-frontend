import axios from "axios";
import {
    STUDENTS_SINGUP_REQUEST,
    STUDENTS_SINGUP_SUCCESS,
    STUDENTS_SINGUP_FAILURE,
  } from "../types/studentSingupTypes";
export const studentSingupAction = (data, history) => async (dispatch) => {

  try {
    dispatch(studentSingupRequest());
    const token = await localStorage.getItem("x-access-token");
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


    const res = await axios.post(
      `http://localhost:8000/students/singup`,
      { ...data },
      {
        headers: headers,
      }
    );
    const student = await res.data;
    dispatch(studentSingupSuccess({ data: student.data }));
    alert("Your account created successfully");
  } catch (err) {
    console.log(err);
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(studentSingupFailure(errorMessage));
    } else {
      dispatch(studentSingupFailure("Network  Error"));
    }
  }
};

export const studentSingupRequest = () => {
  return {
    type: STUDENTS_SINGUP_REQUEST,
  };
};

export const studentSingupSuccess = (student) => {
  return {
    type: STUDENTS_SINGUP_SUCCESS,
    payload: student,
  };
};
export const studentSingupFailure = (error) => {
  return {
    type: STUDENTS_SINGUP_FAILURE,
    payload: error,
  };
};