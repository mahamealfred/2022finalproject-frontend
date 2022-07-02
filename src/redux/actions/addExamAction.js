import axios from "axios";
import {
    ADD_EXAMS_REQUEST,
    ADD_EXAMS_SUCCESS,
    ADD_EXAMS_FAILURE,
  } from "../types/addExamTypes";

export const addExamAction = (data, history) => async (dispatch) => {
  try {
    dispatch(addexamRequest());
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
    const res = await axios.post(`http://localhost:8000/exams`,
    data,
     {
      headers: headers,
    });

    const exam = await res.data;
    const successMessage=await res.data.message
    console.log("success message",successMessage)
   
    // localStorage.setItem('my-token', user.data.token);
     //localStorage.setItem('exam-data', JSON.stringify(exam.data));
    //  dispatch(addexamSuccess({ data: exam.message }));
    dispatch(addexamSuccess (successMessage));
    // alert(" Exam Added successfully");
   // history('/dashboard', { replace: true })
  } catch (err) {
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(addexamFailure(errorMessage));
    } else {
      dispatch(addexamFailure("Network Error"));
    }
  }
};
export const addexamRequest = () => {
  return {
    type: ADD_EXAMS_REQUEST,
  };
};

export const addexamSuccess = (exams) => {
  return {
    type: ADD_EXAMS_SUCCESS,
    payload: exams,
  };
};
export const addexamFailure = (error) => {
  return {
    type: ADD_EXAMS_FAILURE,
    payload: error,
  };
};