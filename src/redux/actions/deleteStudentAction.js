import axios from "axios";
import {
    DELETE_STUDENT_REQUEST,
    DELETE_STUDENT_SUCCESS,
    DELETE_STUDENT_FAILURE,
  } from "../types/deleteStudentTypes";

export const deleteStudentAction = (id) => async (dispatch) => {
  try {
    dispatch(deleteStudentRequest());
    const token = await localStorage.getItem("token");
    let headers;
    if (token) {
      headers = {
        "Content-Type": "application/json",
        "my-token": `${token}`,
      };
    } else {
      headers = {
        "Content-Type": "application/json",
      };
    }
    const res=await axios.delete(`http://localhost:8000/students/${id}`,{
      headers: headers,
    });
    const successMessage=await res.data.message
    console.log("success message",successMessage)
    dispatch(deleteStudentSuccess(successMessage));
   
  } catch (err) {
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(deleteStudentFailure(errorMessage));
    } else {
      dispatch(deleteStudentFailure("Network  Error"));
    }
  }
};

export const deleteStudentRequest = () => {
  return {
    type: DELETE_STUDENT_REQUEST,
  };
};

export const deleteStudentSuccess = (deleteStudent) => {
  return {
    type: DELETE_STUDENT_SUCCESS,
    payload: deleteStudent,
  };
};
export const deleteStudentFailure = (error) => {
  return {
    type: DELETE_STUDENT_FAILURE,
    payload: error,
  };
};