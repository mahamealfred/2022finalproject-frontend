import {
    SEARCH_SCHOOL_REQUEST,
    SEARCH_SCHOOL_SUCCESS,
    SEARCH_SCHOOL_FAILURE,
  } from "../types/searchSchoolTypes";
  
  const initialState = {
    loading: false,
    data: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case  SEARCH_SCHOOL_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case  SEARCH_SCHOOL_SUCCESS:
        return {
          loading: false,
          data: action.payload,
          error: "",
        };
      case  SEARCH_SCHOOL_FAILURE:
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
  