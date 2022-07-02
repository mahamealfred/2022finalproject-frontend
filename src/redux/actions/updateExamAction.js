import axios from "axios";
import {
    UPDATE_EXAM_REQUEST,
    UPDATE_EXAM_SUCCESS,
    UPDATE_EXAM_FAILURE,
  } from "../types/updateExamTypes";
  

export const updateExamAction = (data) => async (dispatch) => {
  try {
    dispatch(updateExamRequest());
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
  
    const res = await axios.put(`http://localhost:8000/exams/${data.id}`,
    {
        
        name: data.name,
        subject: data.subject,
        startDate: data.startDate
        
       },
     {
      headers: headers,
    });

    const exam = await res.data;
    const successMessage=await res.data.message
    console.log("success message",successMessage)
    localStorage.setItem('exam-data', JSON.stringify(exam.data));
    dispatch(updateExamSuccess(successMessage));
    
   
  } catch (err) {
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(updateExamFailure(errorMessage));
    } else {
      dispatch(updateExamFailure("Network  Error"));
    }
  }
};

export const updateExamRequest = () => {
  return {
    type: UPDATE_EXAM_REQUEST,
  };
};

export const updateExamSuccess = (updateExam) => {
  return {
    type: UPDATE_EXAM_SUCCESS,
    payload: updateExam,
  };
};
export const updateExamFailure = (error) => {
  return {
    type: UPDATE_EXAM_FAILURE,
    payload: error,
  };
};