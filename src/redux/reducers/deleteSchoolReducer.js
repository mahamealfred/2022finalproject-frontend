import {
    DELETE_SCHOOL_REQUEST,
    DELETE_SCHOOL_SUCCESS,
    DELETE_SCHOOL_FAILURE,
  } from "../types/deleteSchoolTypes";
  
  const initialState = {
    loading: false,
    schools: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case DELETE_SCHOOL_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case DELETE_SCHOOL_SUCCESS:
        return {
          loading: false,
          schools: action.payload,
          error: "",
        };
      case DELETE_SCHOOL_FAILURE:
        return {
          loading: false,
          schools: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  