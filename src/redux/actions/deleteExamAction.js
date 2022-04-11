import { AlarmTwoTone } from "@material-ui/icons";
import axios from "axios";
import {
    DELETE_EXAM_REQUEST,
    DELETE_EXAM_SUCCESS,
    DELETE_EXAM_FAILURE,
  } from "../types/deleteExamTypes";

export const deleteExamAction = (id) => async (dispatch) => {
  try {
    dispatch(deleteExamRequest());
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
    await axios.delete(`http://localhost:8000/exams/${id}`, {
      headers: headers,
    });
    dispatch(deleteExamSuccess());
   AlarmTwoTone('Deleted Successull')
  } catch (err) {
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(deleteExamFailure(errorMessage));
    } else {
      dispatch(deleteExamFailure("Network  Error"));
    }
  }
};

export const deleteExamRequest = () => {
  return {
    type: DELETE_EXAM_REQUEST,
  };
};

export const deleteExamSuccess = (deleteExam) => {
  return {
    type: DELETE_EXAM_SUCCESS,
    payload: deleteExam,
  };
};
export const deleteExamFailure = (error) => {
  return {
    type: DELETE_EXAM_FAILURE,
    payload: error,
  };
};