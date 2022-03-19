import axios from "axios";
import {
    ADD_QUESTION_REQUEST,
    ADD_QUESTION_SUCCESS,
    ADD_QUESTION_FAILURE,
  } from "../types/addQuestionTypes";

export const addQuestionAction = (data, history) => async (dispatch) => {
  try {
    dispatch(questionRequest());
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
    const res = await axios.post(`http://localhost:8000/questions`,
    data,
     {
      headers: headers,
    });

    const question = await res.data;
    console.log(question)
    // localStorage.setItem('my-token', user.data.token);
     localStorage.setItem('question-data', JSON.stringify(question.data));
    dispatch(questionSuccess ({ data: question.data }));
    history('/dashboard', { replace: true })
   
  } catch (err) {
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(questionFailure(errorMessage));
    } else {
      dispatch(questionFailure("Network  Error"));
    }
  }
};

export const questionRequest = () => {
  return {
    type: ADD_QUESTION_REQUEST,
  };
};

export const questionSuccess = (questions) => {
  return {
    type: ADD_QUESTION_SUCCESS,
    payload: questions,
  };
};
export const questionFailure = (error) => {
  return {
    type: ADD_QUESTION_FAILURE,
    payload: error,
  };
};