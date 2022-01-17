import {
    UPDATE_STUDENT_REQUEST,
    UPDATE_STUDENT_SUCCESS,
    UPDATE_STUDENT_FAILURE,
  } from "../types/updateStudentTypes";
  
  const initialState = {
    loading: false,
    students: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_STUDENT_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case UPDATE_STUDENT_SUCCESS:
        return {
          loading: false,
          students: action.payload,
          error: "",
        };
      case UPDATE_STUDENT_FAILURE:
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
  