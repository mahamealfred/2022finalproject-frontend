import axios from "axios";

import {
    GET_SCHOOLS_BYDISTRICTUSER_REQUEST,
    GET_SCHOOLS_BYDISTRICTUSER_SUCCESS,
    GET_SCHOOLS_BYDISTRICTUSER_FAILURE,
  } from "../types/getAllSchoolsByDistrictUserTypes";

export const getAllSchoolsByDistrictUserAction = () => async (dispatch) => {
  try {
    dispatch(schoolsRequest());
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

    const res = await axios.get(`http://localhost:8000/schools/schoolsinspecificdistrict`, {
      headers: headers,
    });
    const schools = await res.data;
    dispatch(schoolsSuccess(schools.data));
    console.log(schools);
  } catch (err) {
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(schoolsFailure(errorMessage));
    } else {
      dispatch(schoolsFailure("Network  Error"));
    }
  }
};

export const schoolsRequest = () => {
  return {
    type: GET_SCHOOLS_BYDISTRICTUSER_REQUEST,
  };
};

export const schoolsSuccess = (schools) => {
  return {
    type: GET_SCHOOLS_BYDISTRICTUSER_SUCCESS,
    payload: schools,
  };
};
export const schoolsFailure = (error) => {
  return {
    type: GET_SCHOOLS_BYDISTRICTUSER_FAILURE,
    payload: error,
  };
};
