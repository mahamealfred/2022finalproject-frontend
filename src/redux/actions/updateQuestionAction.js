import axios from "axios";
import {
    UPDATE_QUESTION_REQUEST,
    UPDATE_QUESTION_SUCCESS,
    UPDATE_QUESTION_FAILURE,
  } from "../types/updateQuestionTypes";
  

export const updateQuestionAction = (data) => async (dispatch) => {
  try {
    dispatch(updateQuestionRequest());
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
  const res=  await axios.put(`http://localhost:8000/questions/${data.id}`,
    
    {
      question: data.question,
      correct_answer: data.correct_answer,
      incorrect_answer: [data.incorrect_answer]
    },
    {
      headers: headers,
    });
    const question = await res.data;
    localStorage.setItem('question-data', JSON.stringify(question.data));
    dispatch(updateQuestionSuccess({ data: question.data }));
    
  } catch (err) {
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(updateQuestionFailure(errorMessage));
    } else {
      dispatch(updateQuestionFailure("Network  Error"));
    }
  }
};

export const updateQuestionRequest = () => {
  return {
    type:  UPDATE_QUESTION_REQUEST,
  };
};

export const updateQuestionSuccess = (updateQuestion) => {
  return {
    type: UPDATE_QUESTION_SUCCESS,
    payload: updateQuestion,
  };
};
export const updateQuestionFailure = (error) => {
  return {
    type:  UPDATE_QUESTION_FAILURE,
    payload: error,
  };
};