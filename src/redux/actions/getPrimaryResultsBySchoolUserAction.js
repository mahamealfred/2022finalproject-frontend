import axios from "axios";

import {
  GET_PRIMARYRESULTS_BYSCHOOLUSER_REQUEST,
  GET_PRIMARYRESULTS_BYSCHOOLUSER_SUCCESS,
  GET_PRIMARYRESULTS_BYSCHOOLUSER_FAILURE,
} from "../types/getPrimaryResultsBySchoolUserTypes";


export const getPrimaryResultsBySchoolUserAction = (id) => async (dispatch) => {
  try {
    dispatch(resultsRequest());
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

    const res = await axios.get(`http://localhost:8000/results/primaryresults/${id}`, {
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
    type: GET_PRIMARYRESULTS_BYSCHOOLUSER_REQUEST,
  };
};

export const resultsSuccess = (results) => {
  return {
    type: GET_PRIMARYRESULTS_BYSCHOOLUSER_SUCCESS,
    payload: results,
  };
};
export const resultsFailure = (error) => {
  return {
    type: GET_PRIMARYRESULTS_BYSCHOOLUSER_FAILURE,
    payload: error,
  };
};
