import axios from "axios";
import {
    STUDENTS_LOGIN_REQUEST,
    STUDENTS_LOGIN_SUCCESS,
    STUDENTS_LOGIN_FAILURE,
  } from "../types/studentLoginTypes";
  
export const studentLoginAction = (student, history) => async (dispatch) => {
  try {
    dispatch(studentLoginRequest());

    const res = await axios.post(`http://localhost:8000/students/login`, student);

    const { data } = await res;
    console.log(data);
    localStorage.setItem("x-access-token", data.token);
    localStorage.setItem("student-data", JSON.stringify(data.student));

    history.push("/assessments/select");
  } catch (err) {
    console.log(err);
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(studentLoginFailure(errorMessage));
    } else {
      dispatch(studentLoginFailure("Network Error"+err.message));
    }
  }
};

export const studentLoginRequest = () => {
  return {
    type: STUDENTS_LOGIN_REQUEST,
  };
};

export const studentLoginSuccess = (login) => {
  return {
    type: STUDENTS_LOGIN_SUCCESS,
    payload: login,
  };
};
export const studentLoginFailure = (error) => {
  return {
    type: STUDENTS_LOGIN_FAILURE,
    payload: error,
  };
};
