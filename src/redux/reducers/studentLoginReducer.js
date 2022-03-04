import {
    STUDENTS_LOGIN_REQUEST,
    STUDENTS_LOGIN_SUCCESS,
    STUDENTS_LOGIN_FAILURE,
  } from "../types/studentLoginTypes";
  
  const initialState = {
    loading: false,
    data: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case  STUDENTS_LOGIN_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case  STUDENTS_LOGIN_SUCCESS:
        return {
          loading: false,
          data: action.payload,
          error: "",
        };
      case  STUDENTS_LOGIN_FAILURE:
        return {
          loading: false,
          data: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  