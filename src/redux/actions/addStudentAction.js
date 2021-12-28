import axios from "axios";
import { ADD_STUDENTS_REQUEST, ADD_STUDENTS_SUCCESS,ADD_STUDENTS_FAILURE } from '../types/addStudentTypes';

export const addStudentAction = (data,navigate) => async (dispatch) => {
  try {
    dispatch(studentsRequest());
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
    const res = await axios.post(`http://localhost:8000/students/newStudent`,
    data,
     {
      headers: headers,
    });

    const students = await res.data;
    //localStorage.setItem('token', user.data.token);
    localStorage.setItem('students-data', JSON.stringify(students.data));
    //dispatch(loginUserSuccess({ data: students.data }));
    navigate('/dashboard', { replace: true })
   
  } catch (err) {
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(studentsFailure(errorMessage));
    } else {
      dispatch(studentsFailure("Network n Error"));
    }
  }
};

export const studentsRequest = () => {
  return {
    type: ADD_STUDENTS_REQUEST,
  };
};

export const studentsSuccess = (students) => {
  return {
    type: ADD_STUDENTS_SUCCESS,
    payload: students,
  };
};
export const studentsFailure = (error) => {
  return {
    type: ADD_STUDENTS_FAILURE,
    payload: error,
  };
};