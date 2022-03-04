import {
    GET_PRIMARY_STUDENTS_REQUEST,
    GET_PRIMARY_STUDENTS_SUCCESS,
    GET_PRIMARY_STUDENTS_FAILURE,
  } from "../types/getPrimaryStudentTypes";
  
  const initialState = {
    loading: false,
    students: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_PRIMARY_STUDENTS_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case GET_PRIMARY_STUDENTS_SUCCESS:
        return {
          loading: false,
          students: action.payload,
          error: "",
        };
      case GET_PRIMARY_STUDENTS_FAILURE:
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
  