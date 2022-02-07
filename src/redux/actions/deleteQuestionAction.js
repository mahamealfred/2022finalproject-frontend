import axios from "axios";
import {
    DELETE_QUESTION_REQUEST,
    DELETE_QUESTION_SUCCESS,
    DELETE_QUESTION_FAILURE,
  } from "../types/deleteQuestionTypes";
  

export const deleteQuestionAction = (id) => async (dispatch) => {
  try {
    dispatch(deleteQuestionRequest());
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
    await axios.delete(`http://localhost:8000/questions/${id}`, {
      headers: headers,
    });
    dispatch(deleteQuestionSuccess());
   
  } catch (err) {
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(deleteQuestionFailure(errorMessage));
    } else {
      dispatch(deleteQuestionFailure("Network  Error"));
    }
  }
};

export const deleteQuestionRequest = () => {
  return {
    type: DELETE_QUESTION_REQUEST,
  };
};

export const deleteQuestionSuccess = (deleteQuestion) => {
  return {
    type: DELETE_QUESTION_SUCCESS,
    payload: deleteQuestion,
  };
};
export const deleteQuestionFailure = (error) => {
  return {
    type: DELETE_QUESTION_FAILURE,
    payload: error,
  };
};