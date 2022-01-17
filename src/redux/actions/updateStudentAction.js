import axios from "axios";
import {
    UPDATE_STUDENT_REQUEST,
    UPDATE_STUDENT_SUCCESS,
    UPDATE_STUDENT_FAILURE,
  } from "../types/updateStudentTypes";

export const updateStudentAction = (data) => async (dispatch) => {
  try {
    dispatch(updateStudentRequest());
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
  
    const res = await axios.patch(`http://localhost:8000/students/${data.id}`,
    {
        
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        dob: data.dob,
        gender: data.gender,
        level:data.level,
        
       },
     {
      headers: headers,
    });

    const student = await res.data;
    localStorage.setItem('school-data', JSON.stringify(student.data));
    dispatch(updateStudentSuccess({ data: student.data }));
    
   
  } catch (err) {
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(updateStudentFailure(errorMessage));
    } else {
      dispatch(updateStudentFailure("Network  Error"));
    }
  }
};

export const updateStudentRequest = () => {
  return {
    type: UPDATE_STUDENT_REQUEST,
  };
};

export const updateStudentSuccess = (updateStudent) => {
  return {
    type: UPDATE_STUDENT_SUCCESS,
    payload: updateStudent,
  };
};
export const updateStudentFailure = (error) => {
  return {
    type: UPDATE_STUDENT_FAILURE,
    payload: error,
  };
};