import axios from "axios";

import {
  RESULTS_REQUEST,
  RESULTS_SUCCESS,
  RESULTS_FAILURE,
} from "../types/resultsTypes";

export const getAllResult = () => async (dispatch) => {
  try {
    dispatch(resultsRequest());
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

    const res = await axios.get(`http://localhost:8000/results`, {
      headers: headers,
    });
    const results = await res.data;
    dispatch(resultsSuccess(results.data));
    console.log(results);
  } catch (err) {
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(resultsFailure(errorMessage));
    } else {
      dispatch(resultsFailure("Network  Error"));
    }
  }
};

export const resultsRequest = () => {
  return {
    type: RESULTS_REQUEST,
  };
};

export const resultsSuccess = (results) => {
  return {
    type: RESULTS_SUCCESS,
    payload: results,
  };
};
export const resultsFailure = (error) => {
  return {
    type: RESULTS_FAILURE,
    payload: error,
  };
};
