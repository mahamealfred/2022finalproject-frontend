import {
    UPDATE_SCHOOL_REQUEST,
    UPDATE_SCHOOL_SUCCESS,
    UPDATE_SCHOOL_FAILURE,
  } from "../types/updateSchoolTypes";
  
  const initialState = {
    loading: false,
    schools: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_SCHOOL_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case UPDATE_SCHOOL_SUCCESS:
        return {
          loading: false,
          schools: action.payload,
          error: "",
        };
      case UPDATE_SCHOOL_FAILURE:
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
  