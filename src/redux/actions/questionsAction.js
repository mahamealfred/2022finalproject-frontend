import axios from "axios";

import {
    QUESTIONS_REQUEST,
    QUESTIONS_SUCCESS,
    QUESTIONS_FAILURE,
  } from "../types/questionsTypes";

export const getAllQuestion= () => async (dispatch) => {
  try {
    dispatch(questionsRequest());
    const token = await localStorage.getItem("token");
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

    const res = await axios.get(`http://localhost:8000/questions`, {
      headers: headers,
    });
    const questions = await res.data;
    dispatch(questionsSuccess(questions.data));
    console.log(questions);
  } catch (err) {
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(questionsFailure(errorMessage));
    } else {
      dispatch(questionsFailure("Network  Error"));
    }
  }
};

export const questionsRequest = () => {
  return {
    type: QUESTIONS_REQUEST,
  };
};

export const questionsSuccess = (questions) => {
  return {
    type: QUESTIONS_SUCCESS,
    payload: questions,
  };
};
export const questionsFailure = (error) => {
  return {
    type: QUESTIONS_FAILURE,
    payload: error,
  };
};
