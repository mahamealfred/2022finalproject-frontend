import axios from "axios";
import {
  ADD_RESULT_REQUEST,
  ADD_RESULT_SUCCESS,
  ADD_RESULT_FAILURE,
} from "../types/addResultTypes";
export const addResultAction = (data) => async (dispatch) => {
  try {
    dispatch(resultRequest());
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
    const res = await axios.post(`http://localhost:8000/results`, data, {
      headers: headers,
    });

    const result = await res.data;
    // localStorage.setItem('my-token', user.data.token);
    localStorage.setItem("exam-data", JSON.stringify(result.data));
    dispatch(resultSuccess({ data: result.data }));
  } catch (err) {
    console.log(err);
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(resultFailure(errorMessage));
    } else {
      dispatch(resultFailure("Network  Error"));
    }
  }
};

export const resultRequest = () => {
  return {
    type: ADD_RESULT_REQUEST,
  };
};

export const resultSuccess = (results) => {
  return {
    type: ADD_RESULT_SUCCESS,
    payload: results,
  };
};
export const resultFailure = (error) => {
  return {
    type: ADD_RESULT_FAILURE,
    payload: error,
  };
};
