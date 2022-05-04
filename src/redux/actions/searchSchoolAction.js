import axios from "axios";
import {
    SEARCH_SCHOOL_REQUEST,
    SEARCH_SCHOOL_SUCCESS,
    SEARCH_SCHOOL_FAILURE,
  } from "../types/searchSchoolTypes";
export const searchSchoolAction = (keyWord) => async (dispatch) => {
  try {
    dispatch(searchSchoolRequest());
    const token = await localStorage.getItem("x-access-token");

    const headers = {
      "Content-Type": "application/json",
      token: `${token}`,
    };

  
    const res = await axios.get(`http://localhost:8000/schools/search?searchKey=${keyWord}`, {
      headers: headers,
    });
    const school= await res.data.found;
    console.log("found school:",school)
    dispatch(searchSchoolSuccess(school));
  } catch (err) {
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(searchSchoolFailure(errorMessage));
    } else {
      dispatch(searchSchoolFailure("Network  Error"));
    }
  }
};

export const searchSchoolRequest = () => {
  return {
    type: SEARCH_SCHOOL_REQUEST,
  };
};

export const searchSchoolSuccess = (schools) => {
  return {
    type: SEARCH_SCHOOL_SUCCESS,
    payload: schools,
  };
};
export const searchSchoolFailure = (error) => {
  return {
    type: SEARCH_SCHOOL_FAILURE,
    payload: error,
  };
};
