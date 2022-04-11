import axios from "axios";
import {
    ADD_EXAMS_REQUEST,
    ADD_EXAMS_SUCCESS,
    ADD_EXAMS_FAILURE,
  } from "../types/addExamTypes";

export const addExamAction = (data, history) => async (dispatch) => {
  try {
    dispatch(examRequest());
    const token = await localStorage.getItem("x-access-token");
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
    const res = await axios.post(`http://localhost:8000/exams`,
    data,
     {
      headers: headers,
    });

    const exam = await res.data;
    console.log(exam)
    // localStorage.setItem('my-token', user.data.token);
     localStorage.setItem('exam-data', JSON.stringify(exam.data));
    dispatch(examSuccess ({ data: exam.data }));
    alert(" Exam Added successfully");
    history('/dashboard', { replace: true })
   
  } catch (err) {
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(examFailure(errorMessage));
    } else {
      dispatch(examFailure("Network Error"));
    }
  }
};

export const examRequest = () => {
  return {
    type: ADD_EXAMS_REQUEST,
  };
};

export const examSuccess = (exams) => {
  return {
    type: ADD_EXAMS_SUCCESS,
    payload: exams,
  };
};
export const examFailure = (error) => {
  return {
    type: ADD_EXAMS_FAILURE,
    payload: error,
  };
};