import {
    GET_SPECIFICNUMBERSTUDENTS_REQUEST,
    GET_SPECIFICNUMBERSTUDENTS_SUCCESS,
    GET_SPECIFICNUMBERSTUDENTS_FAILURE,
  } from "../types/getSpecificStudentNumberInSchoolTypes";
  
  const initialState = {
    loading: false,
    students: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_SPECIFICNUMBERSTUDENTS_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case GET_SPECIFICNUMBERSTUDENTS_SUCCESS:
        return {
          loading: false,
          students: action.payload,
          error: "",
        };
      case GET_SPECIFICNUMBERSTUDENTS_FAILURE:
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
  