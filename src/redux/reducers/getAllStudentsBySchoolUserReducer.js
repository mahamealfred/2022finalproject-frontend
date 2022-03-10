import {
    GET_STUDENTS_BYSCHOOLUSER_REQUEST,
    GET_STUDENTS_BYSCHOOLUSER_SUCCESS,
    GET_STUDENTS_BYSCHOOLUSER_FAILURE,
  } from "../types/getAllStudentsBySchoolUserTypes";
  
  const initialState = {
    loading: false,
    students: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_STUDENTS_BYSCHOOLUSER_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case GET_STUDENTS_BYSCHOOLUSER_SUCCESS:
        return {
          loading: false,
          students: action.payload,
          error: "",
        };
      case GET_STUDENTS_BYSCHOOLUSER_FAILURE:
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
  