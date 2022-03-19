import axios from "axios";
import {
  GET_QUESTION_BYID_REQUEST,
  GET_QUESTION_BYID_SUCCESS,
  GET_QUESTION_BYID_FAILURE,
} from "../types/getQuestionByExamIdTypes";
export const getQuestionByExamIdAction = (id) => async (dispatch) => {
  try {
    dispatch(getQuestionRequest());
    const token = await localStorage.getItem("x-access-token");

    const headers = {
      "Content-Type": "application/json",
      token: `${token}`,
    };

    console.log("getQuestionByExamIdAction", id);
    const res = await axios.get(`http://localhost:8000/questions/${id}`, {
      headers: headers,
    });
    const questions = await res.data;
    dispatch(getQuestionSuccess(questions.data));
  } catch (err) {
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(getQuestionFailure(errorMessage));
    } else {
      dispatch(getQuestionFailure("Network  Error"));
    }
  }
};

export const getQuestionRequest = () => {
  return {
    type: GET_QUESTION_BYID_REQUEST,
  };
};

export const getQuestionSuccess = (questions) => {
  return {
    type: GET_QUESTION_BYID_SUCCESS,
    payload: questions,
  };
};
export const getQuestionFailure = (error) => {
  return {
    type: GET_QUESTION_BYID_FAILURE,
    payload: error,
  };
};
