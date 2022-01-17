import axios from "axios";

import {
  ADD_SCHOOL_REQUEST,
  ADD_SCHOOL_SUCCESS,
  ADD_SCHOOL_FAILURE,
} from "../types/addSchoolTypes";
  

export const addSchoolAction = (data, history) => async (dispatch) => {
  try {
    dispatch(addSchoolRequest());
    const token = await localStorage.getItem("token");
    let headers;
    if (token) {
      headers = {
        "Content-Type": "application/json",
        "my-token": `${token}`,
      };
    } else {
      headers = {
        "Content-Type": "application/json",
      };
    }

    console.log(headers);
    const res = await axios.post(
      `http://localhost:8000/schools/newSchool`,
      data,
      {
        headers: headers,
      }
    );
    const school = await res.data;
    dispatch(addSchoolSuccess({ data: school.data }));
    alert("Your school has been added successfully");
  } catch (err) {
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(addSchoolFailure(errorMessage));
    } else {
      dispatch(addSchoolFailure("Network  Error"));
    }
  }
};

export const addSchoolRequest = () => {
  return {
    type:  ADD_SCHOOL_REQUEST,
  };
};

export const addSchoolSuccess = (school) => {
  return {
    type:  ADD_SCHOOL_SUCCESS,
    payload: school,
  };
};
export const addSchoolFailure = (error) => {
  return {
    type:  ADD_SCHOOL_FAILURE,
    payload: error,
  };
};
