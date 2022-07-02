import axios from "axios";
import {
  DELETE_SCHOOL_REQUEST,
  DELETE_SCHOOL_SUCCESS,
  DELETE_SCHOOL_FAILURE,
} from "../types/deleteSchoolTypes";

export const deleteSchoolAction = (id) => async (dispatch) => {
  try {
    dispatch(deleteSchoolRequest());
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
 const res=   await axios.delete(`http://localhost:8000/schools/${id}`, {
      headers: headers,
    });
    const successMessage=await res.data.message
    console.log("success message",successMessage)
    dispatch(deleteSchoolSuccess(successMessage));
   
  } catch (err) {
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(deleteSchoolFailure(errorMessage));
    } else {
      dispatch(deleteSchoolFailure("Network  Error"));
    }
  }
};

export const deleteSchoolRequest = () => {
  return {
    type: DELETE_SCHOOL_REQUEST,
  };
};

export const deleteSchoolSuccess = (deleteSchool) => {
  return {
    type: DELETE_SCHOOL_SUCCESS,
    payload: deleteSchool,
  };
};
export const deleteSchoolFailure = (error) => {
  return {
    type: DELETE_SCHOOL_FAILURE,
    payload: error,
  };
};