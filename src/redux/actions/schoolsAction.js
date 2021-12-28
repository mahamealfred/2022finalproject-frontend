import axios from "axios";

import {
  SCHOOLS_REQUEST,
  SCHOOLS_SUCCESS,
  SCHOOLS_FAILURE,
} from "../types/schoolsTypes";

export  const getAllSchool = () => async (dispatch) => {
  try {
    dispatch(schoolsRequest());
    const token = await localStorage.getItem("token");
    let headers;
    if (token) {
      headers = {
        "Content-Type": "application/json",
        "token": `${token}`,
      };
    } else {
      headers = {
        "Content-Type": "application/json",
      };
    }
  
    const res = await axios.get(`http://localhost:8000/schools`,
    {
      headers: headers,
    });
    const schools = await res.data;
    dispatch(schoolsSuccess(schools.data ));
    console.log(schools)

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
    type:  SCHOOLS_REQUEST,
  };
};

export const schoolsSuccess = (schools) => {
  return {
    type:  SCHOOLS_SUCCESS,
    payload: schools,
  };
};
export const schoolsFailure = (error) => {
  return {
    type:  SCHOOLS_FAILURE,
    payload: error,
  };
};