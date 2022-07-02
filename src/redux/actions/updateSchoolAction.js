import axios from "axios";
import {
  UPDATE_SCHOOL_REQUEST,
  UPDATE_SCHOOL_SUCCESS,
  UPDATE_SCHOOL_FAILURE,
} from "../types/updateSchoolTypes";

export const updateSchoolAction = (data) => async (dispatch) => {
  try {
    dispatch(updateSchoolRequest());
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
  
    const res = await axios.patch(`http://localhost:8000/schools/${data.id}`,
    {
        
        name: data.name,
        province: data.province,
        district: data.district,
        sector: data.sector,
        cell: data.cell,
        level:[data.level]
        
       },
     {
      headers: headers,
    });

    const school = await res.data;
    const successMessage=await res.data.message
    console.log("success message",successMessage)
    localStorage.setItem('school-data', JSON.stringify(school.data));
    dispatch(updateSchoolSuccess(successMessage));
    
   
  } catch (err) {
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(updateSchoolFailure(errorMessage));
    } else {
      dispatch(updateSchoolFailure("Network  Error"));
    }
  }
};

export const updateSchoolRequest = () => {
  return {
    type: UPDATE_SCHOOL_REQUEST,
  };
};

export const updateSchoolSuccess = (updateSchool) => {
  return {
    type: UPDATE_SCHOOL_SUCCESS,
    payload: updateSchool,
  };
};
export const updateSchoolFailure = (error) => {
  return {
    type: UPDATE_SCHOOL_FAILURE,
    payload: error,
  };
};