import axios from "axios";
import {
  ADD_SCHOOLS_REQUEST,
  ADD_SCHOOLS_SUCCESS,
  ADD_SCHOOLS_FAILURE,
} from "../types/addSchoolTypes";

export const addSchoolAction = (data, navigate) => async (dispatch) => {
  try {
    dispatch(schoolsRequest());
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
    const res = await axios.post(
      `http://localhost:8000/schools/newSchool/`,
      data,
      {
        headers: headers,
      }
    );

    const school=await res.data;
    
    localStorage.setItem('school-data', JSON.stringify(school.data));
    dispatch(schoolsSuccess ({ data: school.data }));
    navigate("/dashboard", { replace: true });
  } catch (err) {
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(schoolsFailure(errorMessage));
    } else {
      dispatch(schoolsFailure("Network n Error"));
    }
  }
};

export const schoolsRequest = () => {
  return {
    type: ADD_SCHOOLS_REQUEST,
  };
};

export const schoolsSuccess = (schools) => {
  return {
    type: ADD_SCHOOLS_SUCCESS,
    payload: schools,
  };
};
export const schoolsFailure = (error) => {
  return {
    type: ADD_SCHOOLS_FAILURE,
    payload: error,
  };
};
