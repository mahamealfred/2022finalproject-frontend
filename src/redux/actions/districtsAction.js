import axios from "axios";

import {
    DISTRICTS_REQUEST,
    DISTRICTS_SUCCESS,
    DISTRICTS_FAILURE,
  } from "../types/districtsTypes";
export const getAllDistrict = () => async (dispatch) => {
  try {
    dispatch(districtsRequest());
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

    const res = await axios.get(`http://localhost:8000/districts`, {
      headers: headers,
    });
    const districts = await res.data;
    dispatch(districtsSuccess(districts.data));
    console.log(districts);
  } catch (err) {
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(districtsFailure(errorMessage));
    } else {
      dispatch(districtsFailure("Network  Error"));
    }
  }
};

export const districtsRequest = () => {
  return {
    type: DISTRICTS_REQUEST,
  };
};

export const districtsSuccess = (districts) => {
  return {
    type: DISTRICTS_SUCCESS,
    payload: districts,
  };
};
export const districtsFailure = (error) => {
  return {
    type: DISTRICTS_FAILURE,
    payload: error,
  };
};
