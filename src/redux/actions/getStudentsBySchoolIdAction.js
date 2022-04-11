import axios from "axios";
import {
    GET_STUDENT_BYSCHOOLID_REQUEST,
    GET_STUDENT_BYSCHOOLID_SUCCESS,
    GET_STUDENT_BYSCHOOLID_FAILURE,
  } from "../types/getStudentsBySchoolIdTypes";
export const getStudentsBySchoolIdAction = (id) => async (dispatch) => {
  try {
    dispatch(getStudentsRequest());
    const token = await localStorage.getItem("x-access-token");

    const headers = {
      "Content-Type": "application/json",
      token: `${token}`,
    };

    console.log("school id", id);
    const res = await axios.get(`http://localhost:8000/students/schoolId/${id}`, {
      headers: headers,
    });
    const questions = await res.data;
    dispatch(getStudentsSuccess(questions.data));
  } catch (err) {
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(getStudentsFailure(errorMessage));
    } else {
      dispatch(getStudentsFailure("Network  Error"));
    }
  }
};

export const getStudentsRequest = () => {
  return {
    type: GET_STUDENT_BYSCHOOLID_REQUEST,
  };
};

export const getStudentsSuccess = (students) => {
  return {
    type: GET_STUDENT_BYSCHOOLID_SUCCESS,
    payload: students,
  };
};
export const getStudentsFailure = (error) => {
  return {
    type: GET_STUDENT_BYSCHOOLID_FAILURE,
    payload: error,
  };
};
