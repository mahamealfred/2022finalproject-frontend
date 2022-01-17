import {
    DELETE_STUDENT_REQUEST,
    DELETE_STUDENT_SUCCESS,
    DELETE_STUDENT_FAILURE,
  } from "../types/deleteStudentTypes";
  
  const initialState = {
    loading: false,
    students: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case DELETE_STUDENT_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case DELETE_STUDENT_SUCCESS:
        return {
          loading: false,
          students: action.payload,
          error: "",
        };
      case DELETE_STUDENT_FAILURE:
        return {
          loading: false,
          students: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  